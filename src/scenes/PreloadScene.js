import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Loading bar or loading text could go here
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: 'Loading...',
            style: {
                font: '20px Courier',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        // TODO: Load visual assets and CSS guidelines from Art
        // example: this.load.image('player', 'assets/player.png');
    }

    create() {
        // Proceed to the MainScene once assets are loaded
        this.scene.start('MainScene');
    }
}
