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
            font: '48px "Press Start 2P", Courier, monospace',
            fill: '#ff0000'
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2, `Score: ${this.finalScore}\nDistance: ${Math.floor(this.finalDistance)}px`, {
            font: '24px "Press Start 2P", Courier, monospace',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        const retryButton = this.add.text(width / 2, height / 2 + 120, 'TRY AGAIN', {
            font: '32px "Press Start 2P", Courier, monospace',
            fill: '#FFD700'
        }).setOrigin(0.5).setInteractive();

        retryButton.on('pointerdown', () => {
            // QA Fix: Prevent button spam while the scene transitions
            retryButton.disableInteractive();
            // MainScene clears all properties intrinsically in its init() block
            this.scene.start('MainScene');
        });

        retryButton.on('pointerover', () => {
            retryButton.setStyle({ fill: '#ffffff' });
        });

        retryButton.on('pointerout', () => {
            retryButton.setStyle({ fill: '#FFD700' });
        });
    }
}
