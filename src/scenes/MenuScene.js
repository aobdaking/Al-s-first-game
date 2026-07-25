import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.add.text(width / 2, height / 2 - 100, "AL'S FIRST GAME", {
            fontFamily: '"Press Start 2P", Courier, monospace',
            fontSize: '36px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Art requested Retro Mint #00FA9A
        const startButton = this.add.text(width / 2, height / 2 + 50, 'START GAME', {
            fontFamily: '"Press Start 2P", Courier, monospace',
            fontSize: '28px',
            fill: '#00FA9A',
            padding: { x: 20, y: 15 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        startButton.on('pointerdown', () => {
            this.scene.start('MainScene');
        });

        startButton.on('pointerover', () => {
            startButton.setStyle({ fill: '#ffffff' });
        });

        startButton.on('pointerout', () => {
            startButton.setStyle({ fill: '#00FA9A' });
        });
    }
}
