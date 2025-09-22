import BootScene from './components/BootScene.js';
import PlayScene from './components/PlayScene.js';


const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    scene: [BootScene, PlayScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 }, // Apply stronger vertical gravity
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
