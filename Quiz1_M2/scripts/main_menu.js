import Credit from './credit.js';

class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.image('sky', 'assets/images/Sky.png');
        this.load.image('playButton', 'assets/images/play.png');
        this.load.image('creditButton', 'assets/images/credit.png');
        this.load.image('title', 'assets/images/Kat.png');
        this.load.image('quitButton', 'assets/images/quit.png');
    }

    create() {
        var sky = this.add.image(0, 0, 'sky').setOrigin(0, 0);
        sky.setScale(this.scale.width / sky.width, this.scale.height / sky.height);

        var title = this.add.image(400, 100, 'title').setOrigin(0.5);
        title.setScale(0.5);

        var playButton = this.add.image(this.scale.width / 2, this.scale.height / 2 - 50, 'playButton').setInteractive();
        playButton.setScale(0.3);

        playButton.on('pointerdown', function () {
            this.scene.start('Game');
        }, this);

        var creditButton = this.add.image(100, this.scale.height - 50, 'creditButton').setInteractive();
        creditButton.setScale(0.3);

        creditButton.on('pointerdown', function () {
            this.scene.start('Credit');
        }, this);

        var quitButton = this.add.image(this.scale.width - 100, this.scale.height - 50, 'quitButton').setInteractive();
        quitButton.setScale(0.3);

        quitButton.on('pointerdown', function () {
            alert('You exited the game.');
        });
    }
}

export default MainMenu;
