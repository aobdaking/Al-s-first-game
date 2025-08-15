// This file will contain the main game logic for Junni's Escape.

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    create() {
        // This scene runs first. It can be used to load assets for a preloader.
        // For now, we'll just confirm it's working and show a black screen.
        console.log('BootScene is active.');
        this.cameras.main.setBackgroundColor('#000000');
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [BootScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);
