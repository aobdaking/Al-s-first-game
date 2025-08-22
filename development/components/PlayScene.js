export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
        this.SCROLL_SPEED = 2; // Speed of the auto-scroll
    }

    preload() {
        // Player placeholder
        const playerGraphics = this.make.graphics({ fillStyle: { color: 0xff0000 } });
        playerGraphics.fillRect(0, 0, 32, 48);
        playerGraphics.generateTexture('player_placeholder', 32, 48);
        playerGraphics.destroy();

        // Ground placeholder
        const groundGraphics = this.make.graphics({ fillStyle: { color: 0x00ff00 } });
        groundGraphics.fillRect(0, 0, 400000, 32);
        groundGraphics.generateTexture('ground_placeholder', 400000, 32);
        groundGraphics.destroy();

        // Obstacle placeholder
        const obstacleGraphics = this.make.graphics({ fillStyle: { color: 0x0000ff } });
        obstacleGraphics.fillRect(0, 0, 32, 64);
        obstacleGraphics.generateTexture('obstacle_placeholder', 32, 64);
        obstacleGraphics.destroy();
    }

    create() {
        // Player setup
        this.player = this.physics.add.sprite(100, 100, 'player_placeholder');

        // Ground setup
        const ground = this.physics.add.staticSprite(200000, 584, 'ground_placeholder');
        this.physics.add.collider(this.player, ground);

        // Obstacle setup
        this.obstacles = this.physics.add.group({ allowGravity: false });
        this.obstacles.create(600, 552, 'obstacle_placeholder');
        this.obstacles.create(950, 552, 'obstacle_placeholder');
        this.obstacles.create(1400, 552, 'obstacle_placeholder');
        this.obstacles.create(1800, 552, 'obstacle_placeholder');
        this.physics.add.collider(this.player, this.obstacles, this.hitObstacle, null, this);

        // World and Camera setup
        this.physics.world.setBounds(0, 0, 400000, 600);
        this.cameras.main.setBounds(0, 0, 400000, 600);

        // Input setup
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Score setup
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFFFFF' });
        this.scoreText.setScrollFactor(0); // Make the score text stick to the camera
    }

    update() {
        // Auto-scroll the camera
        this.cameras.main.scrollX += this.SCROLL_SPEED;

        // Keep player aligned with the camera scroll
        this.player.x = this.cameras.main.scrollX + 100;

        // Obstacle Recycling
        this.obstacles.getChildren().forEach(obstacle => {
            // If an obstacle is off-screen to the left
            if (obstacle.getBounds().right < this.cameras.main.scrollX) {
                // Find the rightmost obstacle's position
                let rightmostX = 0;
                this.obstacles.getChildren().forEach(child => {
                    if (child.x > rightmostX) {
                        rightmostX = child.x;
                    }
                });
                // Move the obstacle to the right of the rightmost one, with random spacing and height
                const newX = rightmostX + Phaser.Math.Between(350, 550);
                const newY = Phaser.Math.Between(500, 552);
                obstacle.body.reset(newX, newY);
            }
        });

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
