export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load assets
        for (let i = 1; i <= 9; i++) {
            this.load.image(`run${i}`, `assets/Sprites/Characters/Run${i}.png`);
        }
        this.load.image('ground', 'assets/Sprites/Tiles/double/terrain_grass_block.png');
        this.load.image('obstacle', 'assets/Sprites/Enemies/double/saw_rest.png');
    }

    create() {
        console.log('BootScene is active. Starting PlayScene...');
        this.scene.start('PlayScene');
    }
}
