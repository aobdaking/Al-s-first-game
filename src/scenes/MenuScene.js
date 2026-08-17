import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.add.text(width / 2, height / 2 - 120, "AL'S FIRST GAME", {
            fontFamily: '"Press Start 2P", Courier, monospace',
            fontSize: '36px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Art requested Retro Mint #00FA9A
        const startButton = this.add.text(width / 2, height / 2 + 20, 'START GAME', {
            fontFamily: '"Press Start 2P", Courier, monospace',
            fontSize: '28px',
            fill: '#00FA9A',
            padding: { x: 20, y: 15 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        const promptText = this.add.text(width / 2, height / 2 + 100, 'PRESS SPACE OR CLICK TO START', {
            fontFamily: '"Press Start 2P", Courier, monospace',
            fontSize: '14px',
            fill: '#aaaaaa'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: promptText,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        let started = false;
        const startGame = () => {
            if (started) return;
            started = true;
            this.scene.start('MainScene');
        };

        startButton.once('pointerdown', startGame);
        this.input.once('pointerdown', startGame);

        if (this.input.keyboard) {
            this.input.keyboard.once('keydown-SPACE', startGame);
            this.input.keyboard.once('keydown-ENTER', startGame);
        }

        startButton.on('pointerover', () => {
            startButton.setStyle({ fill: '#ffffff' });
        });

        startButton.on('pointerout', () => {
            startButton.setStyle({ fill: '#00FA9A' });
        });
    }
}

