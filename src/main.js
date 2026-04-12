import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import MenuScene from './scenes/MenuScene';
import MainScene from './scenes/MainScene';
import GameOverScene from './scenes/GameOverScene';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 }, 
            debug: false         
        }
    },
    scene: [
        PreloadScene,
        MenuScene,
        MainScene,
        GameOverScene
    ]
};

const game = new Phaser.Game(config);

export default game;
