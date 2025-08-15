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

        // Create a placeholder for the ground
        const groundGraphics = this.make.graphics({ fillStyle: { color: 0x00ff00 } }); // Green rectangle
        groundGraphics.fillRect(0, 0, 800, 32);
        groundGraphics.generateTexture('ground_placeholder', 800, 32);
        groundGraphics.destroy();
        console.log('Ground placeholder texture created.');
    }

    create() {
        // Add the player sprite to the scene, near the top, to see it fall
        this.player = this.physics.add.sprite(this.cameras.main.width / 2, 100, 'player_placeholder');

        // Prevent the player from going off-screen
        this.player.setCollideWorldBounds(true);

        // Create the ground platform as a static physics object
        const ground = this.physics.add.staticSprite(400, 584, 'ground_placeholder');

        // Add a collider between the player and the ground
        this.physics.add.collider(this.player, ground);

        // Set up keyboard input for the Spacebar
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        console.log('PlayScene created with player, ground, collision, and input.');
    }

    update() {
        // Simple jump mechanic:
        // The player can only jump if they are on the ground.
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && this.player.body.touching.down) {
            this.player.setVelocityY(-300); // Apply a vertical velocity upwards
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
            gravity: { y: 300 }, // Apply vertical gravity
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
