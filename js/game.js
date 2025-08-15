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
        const graphics = this.make.graphics({ fillStyle: { color: 0xff0000 } }); // Red rectangle
        graphics.fillRect(0, 0, 32, 48);
        graphics.generateTexture('player_placeholder', 32, 48);
        graphics.destroy();
        console.log('Player placeholder texture created.');
    }

    create() {
        // Add the player sprite to the scene, centered
        this.player = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'player_placeholder');
        console.log('PlayScene created and player added.');
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
            gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);
