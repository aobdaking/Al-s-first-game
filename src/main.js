import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import MainScene from './scenes/MainScene';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 }, // Setting standard gravity for a 2D platformer
            debug: false         // Can be toggled on later for testing by Robbie
        }
    },
    scene: [
        PreloadScene,
        MainScene
    ]
};

const game = new Phaser.Game(config);

export default game;
