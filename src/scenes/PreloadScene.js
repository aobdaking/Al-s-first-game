import Phaser from 'phaser';
import { createGameTextures } from '../utils/SpriteGenerator';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: 'Loading Assets...',
            style: {
                font: '20px Courier',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        // Generate custom procedural pixel art textures for Cat, Mouse, Bird, and Hazards
        createGameTextures(this);
    }

    create() {
        // Wait for custom web fonts to be fully loaded before starting MenuScene
        if (document.fonts) {
            document.fonts.ready.then(() => {
                this.scene.start('MenuScene');
            });
        } else {
            this.scene.start('MenuScene');
        }
    }
}
