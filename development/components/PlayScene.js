export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Cat character
        const playerGraphics = this.make.graphics();
        playerGraphics.fillStyle(0xFF5733);
        playerGraphics.fillRect(2, 32, 28, 14);
        playerGraphics.fillRect(8, 22, 16, 10);
        playerGraphics.fillRect(12, 16, 8, 6);
        playerGraphics.fillRect(14, 10, 4, 6);
        playerGraphics.fillRect(12, 44, 8, 4);
        playerGraphics.fillRect(4, 44, 4, 4);
        playerGraphics.fillRect(24, 44, 4, 4);
        playerGraphics.generateTexture('player_placeholder', 32, 48);
        playerGraphics.destroy();

        // Ground placeholder
        const groundGraphics = this.make.graphics({ fillStyle: { color: 0x66FF66 } });
        groundGraphics.fillRect(0, 0, 4000, 32);
        groundGraphics.generateTexture('ground_placeholder', 4000, 32);
        groundGraphics.destroy();

        // Obstacle placeholder
        const obstacleGraphics = this.make.graphics({ fillStyle: { color: 0xFF0000 } });
        obstacleGraphics.fillRect(0, 0, 32, 64);
        obstacleGraphics.generateTexture('obstacle_placeholder', 32, 64);
        obstacleGraphics.destroy();
    }

    create() {
        // Player setup
        this.player = this.physics.add.sprite(100, 100, 'player_placeholder');
        this.player.setVelocityX(150);
        this.player.setCollideWorldBounds(true);

        // Ground setup
        const ground = this.physics.add.staticSprite(2000, 584, 'ground_placeholder');
        this.physics.add.collider(this.player, ground);

        // Obstacle setup
        this.obstacles = this.physics.add.staticGroup();
        this.obstacles.create(600, 552, 'obstacle_placeholder');
        this.obstacles.create(950, 552, 'obstacle_placeholder');
        this.obstacles.create(1400, 552, 'obstacle_placeholder');
        this.obstacles.create(1800, 552, 'obstacle_placeholder');
        this.physics.add.collider(this.player, this.obstacles, this.hitObstacle, null, this);

        // World and Camera setup
        this.physics.world.setBounds(0, 0, 4000, 600);
        this.cameras.main.setBounds(0, 0, 4000, 600);
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
