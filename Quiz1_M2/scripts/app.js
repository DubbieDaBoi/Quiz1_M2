import MainMenu from './main_menu.js';
import Game from './game.js';
import GameOver from './gameover.js';
import Credit from './credit.js';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: [MainMenu, Game, GameOver, Credit]
};

var game = new Phaser.Game(config);
