export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }


    create() {
        // Animation setup
        this.anims.create({
            key: 'run',
            frames: [
                { key: 'run1' },
            ],
            frameRate: 27,
            repeat: -1
        });

        // Player setup
        this.player = this.physics.add.sprite(100, 450, 'run1');
        this.player.setOrigin(0.5, 1);
        this.player.setScale(0.5);
        this.player.setVelocityX(150);
        this.player.setCollideWorldBounds(true);
        this.player.anims.play('run', true);

        // Ground setup
        const ground = this.add.tileSprite(0, 1080, 4000, 128, 'ground');
        ground.setOrigin(0, 1);
        this.physics.add.existing(ground, true);
        this.physics.add.collider(this.player, ground);

        // Obstacle setup
        this.obstacles = this.physics.add.staticGroup();
        // A little helper function to create obstacles
        const createObstacle = (x) => {
            const obstacle = this.obstacles.create(x, 952, 'obstacle');
            obstacle.setOrigin(0.5, 1);
            obstacle.setScale(0.5);
            obstacle.body.setCircle(obstacle.width / 2);
            obstacle.refreshBody();
        };

        createObstacle(600);
        createObstacle(950);
        createObstacle(1400);
        createObstacle(1800);

        this.physics.add.collider(this.player, this.obstacles, this.hitObstacle, null, this);

        // World and Camera setup
        this.physics.world.setBounds(0, 0, 4000, 1080);
        this.cameras.main.setBounds(0, 0, 4000, 1080);
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
