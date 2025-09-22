export default class TestScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TestScene' });
    }
    create() {
        this.add.text(100, 100, 'Test Scene Loaded!', { fontSize: '32px', fill: '#0f0' });
    }
}
