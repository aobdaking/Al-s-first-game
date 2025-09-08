export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }


    create() {
        // Player setup
        this.player = this.physics.add.sprite(100, 600, 'player');
        this.player.setVelocityX(150);
        this.player.setCollideWorldBounds(true);

        // Ground setup
        const ground = this.physics.add.staticSprite(2000, 688, 'ground');
        this.physics.add.collider(this.player, ground);

        // Obstacle setup
        this.obstacles = this.physics.add.staticGroup();
        this.obstacles.create(600, 640, 'obstacle');
        this.obstacles.create(950, 640, 'obstacle');
        this.obstacles.create(1400, 640, 'obstacle');
        this.obstacles.create(1800, 640, 'obstacle');
        this.physics.add.collider(this.player, this.obstacles, this.hitObstacle, null, this);

        // World and Camera setup
        this.physics.world.setBounds(0, 0, 4000, 720);
        this.cameras.main.setBounds(0, 0, 4000, 720);
        this.cameras.main.setBackgroundColor(0xD3D3D3);
        this.cameras.main.startFollow(this.player);

        // Input setup
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Score setup
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFFFFF' });
        this.scoreText.setScrollFactor(0); // Make the score text stick to the camera
    }

    update() {
        // Jump mechanic
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && this.player.body.touching.down) {
            this.player.setVelocityY(-450); // Apply a snappier vertical velocity upwards
        }

        // Score update
        // Score is based on the player's horizontal position
        this.score = Math.floor(this.player.x / 10);
        this.scoreText.setText('Score: ' + this.score);
    }

    hitObstacle(player, obstacle) {
        // When the player hits an obstacle, restart the scene
        this.scene.restart();
    }
}
