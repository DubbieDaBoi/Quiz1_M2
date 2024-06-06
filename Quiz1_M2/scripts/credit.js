class Credit extends Phaser.Scene {
    constructor() {
        super({ key: 'Credit' });
    }

    preload() {
        // Preload any assets needed for the credit scene
        this.load.image('background', 'assets/images/sky.png'); // Load the background image
        this.load.image('mainMenuButton', 'assets/images/MainMenu.png'); // Load the main menu button image
    }

    create() {
        // Display background
        var background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        background.setScale(this.scale.width / background.width, this.scale.height / background.height);

        // Display title
        this.add.text(400, 100, 'Credits', { fontSize: '48px', fill: '#000000' }).setOrigin(0.5);

        // Display your name, school section, and school program with custom color
        this.add.text(400, 300, 'Your Name\nSchool Section\nSchool Program', { fontSize: '32px', fill: '#000000' }).setOrigin(0.5);

        // Add main menu button
        var mainMenuButton = this.add.image(50, 50, 'mainMenuButton').setInteractive();
        mainMenuButton.setScale(0.8);

        // Set up event listener for main menu button
        mainMenuButton.on('pointerdown', function () {
            this.scene.start('MainMenu');
        }, this);
    }
}

export default Credit;
