// This file will contain the main game logic for Junni's Escape.

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    create() {
        console.log('BootScene is active. Starting PlayScene...');
        this.scene.start('PlayScene');
    }
}

class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Player placeholder
        const playerGraphics = this.make.graphics({ fillStyle: { color: 0xff0000 } });
        playerGraphics.fillRect(0, 0, 32, 48);
        playerGraphics.generateTexture('player_placeholder', 32, 48);
        playerGraphics.destroy();

        // Ground placeholder
        const groundGraphics = this.make.graphics({ fillStyle: { color: 0x00ff00 } });
        groundGraphics.fillRect(0, 0, 4000, 32);
        groundGraphics.generateTexture('ground_placeholder', 4000, 32);
        groundGraphics.destroy();

        // Obstacle placeholder
        const obstacleGraphics = this.make.graphics({ fillStyle: { color: 0x0000ff } });
        obstacleGraphics.fillRect(0, 0, 32, 64);
        obstacleGraphics.generateTexture('obstacle_placeholder', 32, 64);
        obstacleGraphics.destroy();
    }

    create() {
        // Player setup
        this.player = this.physics.add.sprite(100, 100, 'player_placeholder');
        this.player.setVelocityX(150);
        this.player.setCollideWorldBounds(true);

        // Ground setup
        const ground = this.physics.add.staticSprite(2000, 584, 'ground_placeholder');
        this.physics.add.collider(this.player, ground);

        // Obstacle setup
        this.obstacles = this.physics.add.staticGroup();
        this.obstacles.create(600, 552, 'obstacle_placeholder');
        this.obstacles.create(950, 552, 'obstacle_placeholder');
        this.obstacles.create(1400, 552, 'obstacle_placeholder');
        this.obstacles.create(1800, 552, 'obstacle_placeholder');
        this.physics.add.collider(this.player, this.obstacles, this.hitObstacle, null, this);

        // World and Camera setup
        this.physics.world.setBounds(0, 0, 4000, 600);
        this.cameras.main.setBounds(0, 0, 4000, 600);
        this.cameras.main.startFollow(this.player);

        // Input setup
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // Jump mechanic
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && this.player.body.touching.down) {
            this.player.setVelocityY(-300);
        }
    }

    hitObstacle(player, obstacle) {
        // When the player hits an obstacle, restart the scene
        this.scene.restart();
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [BootScene, PlayScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
