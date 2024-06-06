class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    preload() {
        this.load.image('sky', 'assets/images/Sky.png');
        this.load.image('retryButton', 'assets/images/Restart.png');
        this.load.image('mainMenuButton', 'assets/images/MainMenu.png'); 
    }

    create() {
        var sky = this.add.image(0, 0, 'sky').setOrigin(0, 0);
        sky.setScale(this.scale.width / sky.width, this.scale.height / sky.height);

        this.add.text(400, 200, 'Game Over', { fontSize: '64px', fill: '#000000' }).setOrigin(0.5);

        var retryButton = this.add.image(this.scale.width / 2, this.scale.height / 2, 'retryButton').setInteractive();
        retryButton.setScale(0.1);

        retryButton.on('pointerdown', function () {
            this.scene.start('Game');
        }, this);

        var mainMenuButton = this.add.image(this.scale.width / 2, this.scale.height / 2 + 100, 'mainMenuButton').setInteractive();
        mainMenuButton.setScale(0.8);

        mainMenuButton.on('pointerdown', function () {
            this.scene.start('MainMenu');
        }, this);
    }
}

export default GameOver;
