import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.add.text(width / 2, height / 2 - 100, "AL'S FIRST GAME", {
            font: '48px "Press Start 2P", Courier, monospace',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Art requested Retro Mint #00FA9A
        const startButton = this.add.text(width / 2, height / 2 + 50, 'START', {
            font: '32px "Press Start 2P", Courier, monospace',
            fill: '#00FA9A' 
        }).setOrigin(0.5).setInteractive();

        startButton.on('pointerdown', () => {
            // QA Fix: Prevent button spam while the scene transitions
            startButton.disableInteractive();
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
