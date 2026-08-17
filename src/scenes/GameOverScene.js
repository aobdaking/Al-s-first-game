import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.finalDistance = data.distanceTraveled || 0;
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Centered Modal with high-contrast borders
        this.add.rectangle(width / 2, height / 2, 600, 400, 0x000000, 0.9)
            .setStrokeStyle(6, 0xff0000); 

        this.add.text(width / 2, height / 2 - 120, 'GAME OVER', {
            fontFamily: '"Press Start 2P", Courier, monospace',
            fontSize: '40px',
            fill: '#ff0000'
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 - 20, `Score: ${this.finalScore}\nDistance: ${Math.floor(this.finalDistance)}px`, {
            fontFamily: '"Press Start 2P", Courier, monospace',
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        const retryButton = this.add.text(width / 2, height / 2 + 80, 'TRY AGAIN', {
            fontFamily: '"Press Start 2P", Courier, monospace',
            fontSize: '28px',
            fill: '#FFD700',
            padding: { x: 20, y: 15 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        const promptText = this.add.text(width / 2, height / 2 + 140, 'PRESS SPACE OR CLICK TO RETRY', {
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

        let restarted = false;
        const restartGame = () => {
            if (restarted) return;
            restarted = true;
            this.scene.start('MainScene');
        };

        retryButton.once('pointerdown', restartGame);
        this.input.once('pointerdown', restartGame);

        if (this.input.keyboard) {
            this.input.keyboard.once('keydown-SPACE', restartGame);
            this.input.keyboard.once('keydown-ENTER', restartGame);
        }

        retryButton.on('pointerover', () => {
            retryButton.setStyle({ fill: '#ffffff' });
        });

        retryButton.on('pointerout', () => {
            retryButton.setStyle({ fill: '#FFD700' });
        });
    }
}

