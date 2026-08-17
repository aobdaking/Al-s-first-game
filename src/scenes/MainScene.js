import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    init() {
        this.coyoteTime = 0;
        this.jumpDuration = 0;
        this.isJumping = false;

        this.distanceTraveled = 0;
        this.maxLevelDistance = 10000;
        this.score = 0;
        this.gameWon = false;
        
        // Phase 3: Heath state
        this.health = 3;
    }

    create() {
        // Setup the physical world bounds
        this.physics.world.setBounds(0, 0, this.maxLevelDistance, 600);

        // Cozy Dark Kitchen Background Theme
        this.cameras.main.setBackgroundColor('#241A2F');
        this.add.rectangle(this.maxLevelDistance / 2, 280, this.maxLevelDistance, 560, 0x2A1D35, 1);

        // Map layout: Static platforms
        this.platforms = this.physics.add.staticGroup();
        
        // Kitchen floor
        const floor = this.add.rectangle(this.maxLevelDistance / 2, 580, this.maxLevelDistance, 40, 0x4E342E, 1).setStrokeStyle(3, 0x6D4C41);
        this.physics.add.existing(floor, true);
        this.platforms.add(floor);
        
        // Main counter
        const counter = this.add.rectangle(600, 400, 300, 20, 0x3E2723, 1).setStrokeStyle(2, 0x00FFFF);
        this.physics.add.existing(counter, true);
        this.platforms.add(counter);

        // Additional Kitchen Countertop Platforms throughout level
        for (let x = 1400; x < this.maxLevelDistance - 800; x += 850) {
            const y = Phaser.Math.Between(320, 440);
            const w = Phaser.Math.Between(220, 340);
            const p = this.add.rectangle(x, y, w, 20, 0x3E2723, 1).setStrokeStyle(2, 0x00FFFF);
            this.physics.add.existing(p, true);
            this.platforms.add(p);
        }

        // Player configuration - Animated Pixel Art Cat Sprite
        this.player = this.physics.add.sprite(100, 450, 'cat_idle');
        this.player.setScale(1.5);
        this.player.body.setBounce(0.0);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(24, 28);
        this.player.body.setOffset(4, 4);
        
        // Advanced Movement Physics
        this.player.body.setMaxVelocity(300, 800); 
        this.player.body.setDragX(1500); 

        // Define Cat Walk Animation
        if (!this.anims.exists('cat_walk')) {
            this.anims.create({
                key: 'cat_walk',
                frames: [{ key: 'cat_walk1' }, { key: 'cat_walk2' }],
                frameRate: 8,
                repeat: -1
            });
        }

        // Player State tracking
        this.player.state = 'normal';
        this.player.isInvulnerable = false;

        // Input Setup - Support Arrow Keys, WASD, and Space
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // UI Overlay Setup 
        this.scoreText = this.add.text(10, 40, 'Score: 0', { font: '24px Arial', fill: '#FFD700', fontStyle: 'bold' }).setScrollFactor(0);
        
        // Health visualizer
        this.healthText = this.add.text(10, 70, 'Health: 3', { font: '24px Arial', fill: '#ff0000', fontStyle: 'bold' }).setScrollFactor(0);

        // Control Guide
        this.add.text(10, 100, 'Controls: ARROWS / WASD / SPACE', {
            fontFamily: '"Press Start 2P", Courier, monospace',
            fontSize: '12px',
            fill: '#888888'
        }).setScrollFactor(0);

        this.add.text(400, 15, 'Level Progress', { font: '14px Arial', fill: '#ffffff' }).setOrigin(0.5).setScrollFactor(0);
        this.progressOutline = this.add.rectangle(400, 35, 400, 20).setStrokeStyle(2, 0xffffff).setScrollFactor(0);
        this.progressFill = this.add.rectangle(200, 35, 0, 20, 0x00FFFF).setOrigin(0, 0.5).setScrollFactor(0);
        this.catHeadTracker = this.add.rectangle(200, 35, 16, 16, 0x00FFFF).setScrollFactor(0);

        // Hazards Setup
        this.hazards = this.physics.add.group();
        
        const testSpike = this.add.rectangle(700, 550, 40, 40, 0xffa500, 1).setStrokeStyle(2, 0xFF4500);
        this.physics.add.existing(testSpike);
        testSpike.body.setImmovable(true);
        testSpike.body.setAllowGravity(false);
        this.hazards.add(testSpike);

        // Phase 2: Mouse Enemy Sprite (Spawner)
        this.mouse = this.add.sprite(1200, 150, 'mouse');
        this.mouse.setScale(1.3);
        
        this.mouseSpawnerTimer = this.time.addEvent({
            delay: 1500, 
            callback: this.spawnProjectile,
            callbackScope: this,
            loop: true
        });

        // Phase 3: Bonus Birds
        this.bonusGroup = this.physics.add.group();
        this.bonusTimer = this.time.addEvent({
            delay: 3500,
            callback: this.spawnBonus,
            callbackScope: this,
            loop: true
        });

        // Colliders
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.hazards, this.platforms, this.hitFloor, null, this);
        this.physics.add.collider(this.player, this.hazards, this.hitHazard, null, this);
        this.physics.add.overlap(this.player, this.bonusGroup, this.collectBonus, null, this);

        // Camera Tracking
        this.cameras.main.setBounds(0, 0, this.maxLevelDistance, 600);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }

    update(time, delta) {
        if (this.gameWon || this.health <= 0) return; 

        if (!this.player || !this.player.body) return;

        if (this.player.x > this.distanceTraveled) {
            this.distanceTraveled = this.player.x;
        }

        let progress = Math.min(this.distanceTraveled / this.maxLevelDistance, 1);
        this.progressFill.width = 400 * progress;
        this.catHeadTracker.x = 200 + (400 * progress);

        this.mouse.x = this.cameras.main.scrollX + 700;

        if (progress >= 1 && !this.gameWon) {
            this.triggerWin();
        }

        const body = this.player.body;
        const accel = 1500;
        const jumpVelocity = -350; 
        const variableJumpPower = -8; 

        const isGrounded = body.blocked.down || body.touching.down;
        if (isGrounded) {
            this.coyoteTime = 100; 
        } else {
            this.coyoteTime -= delta;
        }

        if (this.player.state !== 'hurt') {
            const moveLeft = (this.cursors.left && this.cursors.left.isDown) || (this.wasd.left && this.wasd.left.isDown);
            const moveRight = (this.cursors.right && this.cursors.right.isDown) || (this.wasd.right && this.wasd.right.isDown);

            if (moveLeft) {
                body.setAccelerationX(-accel);
            } else if (moveRight) {
                body.setAccelerationX(accel);
            } else {
                body.setAccelerationX(0);
            }

            const jumpKey = (this.cursors.up && this.cursors.up.isDown) || 
                            (this.cursors.space && this.cursors.space.isDown) || 
                            (this.wasd.up && this.wasd.up.isDown);
            
            if (jumpKey && this.coyoteTime > 0 && !this.isJumping) {
                body.setVelocityY(jumpVelocity);
                this.isJumping = true;
                this.jumpDuration = 200; 
                this.coyoteTime = 0; 
            }
            
            if (jumpKey && this.isJumping && this.jumpDuration > 0) {
                body.velocity.y += (variableJumpPower * (delta / 16.6)); 
                this.jumpDuration -= delta;
            }

            if (!jumpKey) {
                this.isJumping = false;
                this.jumpDuration = 0;
            }
        }

        const activeHazards = this.hazards.getChildren();
        for (let i = activeHazards.length - 1; i >= 0; i--) {
            const h = activeHazards[i];
            if (h.name === 'projectile' && (h.y > 650 || h.x < this.cameras.main.scrollX - 200 || h.x > this.cameras.main.scrollX + 1000)) {
                h.destroy();
            }
        }

        const activeBirds = this.bonusGroup.getChildren();
        for (let i = activeBirds.length - 1; i >= 0; i--) {
            const b = activeBirds[i];
            if (b.x < this.cameras.main.scrollX - 100) {
                b.destroy();
            }
        }
    }

    triggerGameOver() {
        this.physics.pause();
        this.mouseSpawnerTimer.remove();
        this.bonusTimer.remove();
        // Transition to GameOverScene and pass payload
        this.scene.start('GameOverScene', {
            score: this.score,
            distanceTraveled: this.distanceTraveled
        });
    }

    triggerWin() {
        this.gameWon = true;
        this.player.isInvulnerable = true; 
        this.physics.pause();
        this.mouseSpawnerTimer.remove();
        this.bonusTimer.remove();
        
        this.add.text(this.cameras.main.scrollX + 400, 300, 'LEVEL COMPLETE!', {
            font: '64px Arial',
            fill: '#00FFFF',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);
    }

    spawnBonus() {
        if (this.gameWon || !this.player) return;
        
        const spawnX = this.cameras.main.scrollX + 900;
        const spawnY = Phaser.Math.Between(200, 450); 
        
        const bird = this.physics.add.sprite(spawnX, spawnY, 'bird');
        bird.setScale(1.2);
        this.bonusGroup.add(bird);

        bird.body.setAllowGravity(false);
        bird.body.setVelocityX(Phaser.Math.Between(-150, -250)); 
    }

    collectBonus(player, bird) {
        bird.destroy();
        this.score += 500;
        this.scoreText.setText('Score: ' + this.score);

        const popup = this.add.text(player.x, player.y - 40, '+500!', {
            font: '20px Arial', fill: '#FFD700', fontStyle: 'bold', stroke: '#000', strokeThickness: 3
        });
        
        this.tweens.add({
            targets: popup,
            y: popup.y - 60,
            alpha: 0,
            duration: 1000,
            onComplete: () => popup.destroy()
        });
    }

    hitFloor(hazard, platform) {
        if (hazard.name === 'projectile') {
            hazard.destroy();
        }
    }

    spawnProjectile() {
        if (!this.player || !this.mouse) return;
        
        const projectile = this.physics.add.sprite(this.mouse.x, this.mouse.y, 'projectile_plate');
        this.hazards.add(projectile);
        projectile.name = 'projectile';
        
        projectile.body.setCircle(12);
        projectile.body.setAngularVelocity(Phaser.Math.Between(-400, 400));
        
        const dx = this.player.x - this.mouse.x;
        const throwVx = (dx * 0.4) + Phaser.Math.Between(-60, 60);
        projectile.body.setVelocity(throwVx, Phaser.Math.Between(-200, -50));
        projectile.body.setBounce(0.4); 
    }

    hitHazard(player, hazard) {
        if (this.player.isInvulnerable) return;

        this.player.isInvulnerable = true;
        this.player.state = 'hurt';
        this.player.setTexture('cat_hurt');

        // Health Reduction
        this.health -= 1;
        this.healthText.setText('Health: ' + this.health);

        if (this.health <= 0) {
            this.triggerGameOver();
            return;
        }

        const knockbackDir = this.player.x < hazard.x ? -1 : 1;
        this.player.body.setVelocity(250 * knockbackDir, -300);
        this.player.body.setAccelerationX(0);

        this.time.delayedCall(300, () => {
            this.player.state = 'normal';
        });

        this.tweens.add({
            targets: this.player,
            alpha: 0.2,
            duration: 150,
            yoyo: true,
            repeat: 5, 
            onComplete: () => {
                if (this.health > 0) {
                    this.player.alpha = 1;
                    this.player.isInvulnerable = false;
                    this.player.setTexture('cat_idle');
                }
            }
        });
    }
}
