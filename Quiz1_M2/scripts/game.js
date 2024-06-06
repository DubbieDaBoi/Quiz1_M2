class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    preload() {
        this.load.image('sky', 'assets/images/Sky.png');
        this.load.image('Ground', 'assets/images/platform.png');
        this.load.image('cat', 'assets/images/cat.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.image('catcher', 'assets/images/catcher.png');
    }

    create() {
        var sky = this.add.image(0, 0, 'sky');
        sky.setOrigin(0, 0);
        sky.setScale(this.scale.width / sky.width, this.scale.height / sky.height);

        var platforms = this.physics.add.staticGroup();
        platforms.create(400, 580, 'Ground').setScale(2).refreshBody();

        this.player = this.physics.add.sprite(100, 400, 'catcher');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.3);

        this.cats = this.physics.add.group({
            key: 'cat',
            repeat: 0,
            setXY: { x: Phaser.Math.Between(50, 750), y: 0 }
        });

        this.cats.children.iterate(function (child) {
            child.setScale(0.3);
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(this.cats, platforms);
        this.physics.add.collider(this.player, platforms);

        this.physics.add.overlap(this.player, this.cats, this.collectCat, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        this.score = 0;
        this.catsCollected = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        this.catsCollectedText = this.add.text(600, 16, 'Cats: 0', { fontSize: '32px', fill: '#000' });

        this.gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#000' });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.setVisible(false);
    }

    collectCat(player, cat) {
        cat.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        this.catsCollected++;
        this.catsCollectedText.setText('Cats: ' + this.catsCollected);

        var x = Phaser.Math.Between(50, 750);
        var y = Phaser.Math.Between(50, 300);
        var newCat = this.cats.create(x, y, 'cat');
        newCat.setScale(0.3);
        newCat.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        var bombX = Phaser.Math.Between(0, 800);
        var bomb = this.bombs.create(bombX, 16, 'bomb');
        bomb.setScale(0.3);
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    hitBomb(player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);
        player.setVisible(false);

        this.gameOverText.setVisible(true);

        this.registry.set('score', this.score);
        this.scene.start('GameOver');
    }
    

    update() {
        if (!this.player || this.gameOver) return;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}

export default Game;
