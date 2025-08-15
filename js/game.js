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
        // Create a placeholder texture for the player
        const playerGraphics = this.make.graphics({ fillStyle: { color: 0xff0000 } }); // Red rectangle
        playerGraphics.fillRect(0, 0, 32, 48);
        playerGraphics.generateTexture('player_placeholder', 32, 48);
        playerGraphics.destroy();
        console.log('Player placeholder texture created.');

        // Create a wider placeholder for the ground for scrolling
        const groundGraphics = this.make.graphics({ fillStyle: { color: 0x00ff00 } }); // Green rectangle
        groundGraphics.fillRect(0, 0, 4000, 32);
        groundGraphics.generateTexture('ground_placeholder', 4000, 32);
        groundGraphics.destroy();
        console.log('Ground placeholder texture created.');
    }

    create() {
        // Add the player sprite to the scene, near the start of the level
        this.player = this.physics.add.sprite(100, 100, 'player_placeholder');

        // Give the player a constant forward velocity
        this.player.setVelocityX(150);

        // Create the ground platform
        const ground = this.physics.add.staticSprite(2000, 584, 'ground_placeholder');

        // Add a collider between the player and the ground
        this.physics.add.collider(this.player, ground);

        // --- WORLD AND CAMERA SETUP ---
        // Set the world bounds to be the size of our ground
        this.physics.world.setBounds(0, 0, 4000, 600);
        // Make the camera follow the player
        this.cameras.main.setBounds(0, 0, 4000, 600);
        this.cameras.main.startFollow(this.player);

        // The player should still collide with the world bounds
        this.player.setCollideWorldBounds(true);

        // Set up keyboard input for the Spacebar
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        console.log('PlayScene created with auto-scrolling.');
    }

    update() {
        // Simple jump mechanic
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && this.player.body.touching.down) {
            this.player.setVelocityY(-300);
        }
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
