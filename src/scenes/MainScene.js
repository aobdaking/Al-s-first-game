import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    init() {
        this.coyoteTime = 0;
        this.jumpDuration = 0;
        this.isJumping = false;

        // Phase 3 logic
        this.distanceTraveled = 0;
        this.maxLevelDistance = 10000;
        this.score = 0;
        this.gameWon = false;
    }

    create() {
        // Setup the physical world bounds
        this.physics.world.setBounds(0, 0, this.maxLevelDistance, 600);

        // Map layout: Static platforms
        this.platforms = this.physics.add.staticGroup();
        
        const floor = this.add.rectangle(this.maxLevelDistance / 2, 580, this.maxLevelDistance, 40, 0x555555, 1);
        this.physics.add.existing(floor, true);
        this.platforms.add(floor);
        
        const counter = this.add.rectangle(600, 400, 300, 20, 0x888888, 1);
        this.physics.add.existing(counter, true);
        this.platforms.add(counter);

        // Player configuration
        this.player = this.add.rectangle(100, 450, 48, 48, 0x000000, 1);
        this.physics.add.existing(this.player);
        this.player.body.setBounce(0.0);
        this.player.body.setCollideWorldBounds(true);
        
        // Advanced Movement Physics
        this.player.body.setMaxVelocity(300, 800); 
        this.player.body.setDragX(1500); 

        // Player State tracking
        this.player.state = 'normal';
        this.player.isInvulnerable = false;

        // Input Setup
        this.cursors = this.input.keyboard.createCursorKeys();

        // UI Overlay Setup (Scroll factor 0 means it stays locked to screen)
        this.scoreText = this.add.text(10, 40, 'Score: 0', { font: '24px Arial', fill: '#FFD700', fontStyle: 'bold' }).setScrollFactor(0);
        
        this.add.text(400, 15, 'Level Progress', { font: '14px Arial', fill: '#ffffff' }).setOrigin(0.5).setScrollFactor(0);
        this.progressOutline = this.add.rectangle(400, 35, 400, 20).setStrokeStyle(2, 0xffffff).setScrollFactor(0);
        // Electric Cyan #00FFFF fill
        this.progressFill = this.add.rectangle(200, 35, 0, 20, 0x00FFFF).setOrigin(0, 0.5).setScrollFactor(0);
        // 16x16px cat head tracker
        this.catHeadTracker = this.add.rectangle(200, 35, 16, 16, 0x000000).setScrollFactor(0);

        // Hazards Setup
        this.hazards = this.physics.add.group();
        
        const testSpike = this.add.rectangle(700, 550, 40, 40, 0xffa500, 1);
        this.physics.add.existing(testSpike, true);
        this.hazards.add(testSpike);

        // Phase 2: Mouse Enemy (Spawner)
        this.mouse = this.add.rectangle(1200, 150, 32, 32, 0xffffff, 1);
        
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
        
        // Bonus Overlaps 
        this.physics.add.overlap(this.player, this.bonusGroup, this.collectBonus, null, this);

        // Camera Tracking
        this.cameras.main.setBounds(0, 0, this.maxLevelDistance, 600);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        this.add.text(10, 10, 'Main Scene - Phase 3 UI & Scoring Active', {
            font: '20px Arial', 
            fill: '#00ff00'
        }).setScrollFactor(0);
    }

    update(time, delta) {
        if (this.gameWon) return; // Prevent movement when level complete

        if (!this.player || !this.player.body) return;

        // Phase 3: Progress and Win Tracking
        if (this.player.x > this.distanceTraveled) {
            this.distanceTraveled = this.player.x;
        }

        let progress = Math.min(this.distanceTraveled / this.maxLevelDistance, 1);
        // Map 0 -> 1 progress to the 400 pixel width of our UI bar
        this.progressFill.width = 400 * progress;
        this.catHeadTracker.x = 200 + (400 * progress);

        // Keep the Mouse hovering slightly ahead of the camera view
        this.mouse.x = this.cameras.main.scrollX + 700;

        if (progress >= 1) {
            this.triggerWin();
        }

        const body = this.player.body;
        const accel = 1500;
        const jumpVelocity = -350; 
        const variableJumpPower = -8; 

        // 1. Coyote Time tracking
        const isGrounded = body.blocked.down || body.touching.down;
        if (isGrounded) {
            this.coyoteTime = 100; 
        } else {
            this.coyoteTime -= delta;
        }

        if (this.player.state === 'hurt') {
            return;
        }

        // 2. Horizontal Movement logic (Acceleration & Friction)
        if (this.cursors.left.isDown) {
            body.setAccelerationX(-accel);
        } else if (this.cursors.right.isDown) {
            body.setAccelerationX(accel);
        } else {
            body.setAccelerationX(0);
        }

        // 3. Jump Logic (Variable Heights)
        const jumpKey = this.cursors.up.isDown || this.cursors.space.isDown;
        
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

        // 4. Memory Leak Protection (Garbage Collection)
        const activeHazards = this.hazards.getChildren();
        for (let i = activeHazards.length - 1; i >= 0; i--) {
            const h = activeHazards[i];
            if (h.name === 'projectile' && (h.y > 650 || h.x < this.cameras.main.scrollX - 200 || h.x > this.cameras.main.scrollX + 1000)) {
                h.destroy();
            }
        }

        // Clean up birds that fly entirely off screen
        const activeBirds = this.bonusGroup.getChildren();
        for (let i = activeBirds.length - 1; i >= 0; i--) {
            const b = activeBirds[i];
            if (b.x < this.cameras.main.scrollX - 100) {
                b.destroy();
            }
        }
    }

    triggerWin() {
        this.gameWon = true;
        this.player.isInvulnerable = true; // QA Fix: Ensure absolute safety upon winning
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
        
        // Spawn birds on the right edge flying left
        const spawnX = this.cameras.main.scrollX + 900;
        const spawnY = Phaser.Math.Between(200, 450); 
        
        // Starlight Gold #FFD700, 24x24px
        const bird = this.add.rectangle(spawnX, spawnY, 24, 24, 0xFFD700, 1);
        this.physics.add.existing(bird);
        this.bonusGroup.add(bird);

        bird.body.setAllowGravity(false);
        bird.body.setVelocityX(Phaser.Math.Between(-150, -250)); 
    }

    collectBonus(player, bird) {
        bird.destroy();
        this.score += 500;
        this.scoreText.setText('Score: ' + this.score);

        // Visual pop-up
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
        
        const size = Phaser.Math.Between(16, 24);
        const projectile = this.add.rectangle(this.mouse.x, this.mouse.y, size, size, 0xFF8C00, 1);
        
        this.physics.add.existing(projectile);
        this.hazards.add(projectile);
        projectile.name = 'projectile';
        
        projectile.body.setCircle(size / 2);
        
        projectile.body.setAngularVelocity(Phaser.Math.Between(-400, 400));
        
        const dx = this.player.x - this.mouse.x;
        const throwVx = (dx * 0.4) + Phaser.Math.Between(-60, 60);
        projectile.body.setVelocity(throwVx, Phaser.Math.Between(-200, -50));
        projectile.body.setBounce(0.4); 
    }

    hitHazard(player, hazard) {
        if (player.isInvulnerable) return;

        player.isInvulnerable = true;
        player.state = 'hurt';
        player.fillColor = 0xff0000;

        const knockbackDir = player.x < hazard.x ? -1 : 1;
        player.body.setVelocity(250 * knockbackDir, -300);
        player.body.setAccelerationX(0);

        this.time.delayedCall(300, () => {
            player.state = 'normal';
        });

        this.tweens.add({
            targets: player,
            alpha: 0.2,
            duration: 150,
            yoyo: true,
            repeat: 5, 
            onComplete: () => {
                player.alpha = 1;
                player.isInvulnerable = false;
                player.fillColor = 0x000000;
            }
        });
    }
}
