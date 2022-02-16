import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import GameUI from './scenes/GameUI'

import Title from './scenes/Title'
import GameOver from './scenes/GameOver'
import Controls from './scenes/Controls'


export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 400,
    height: 250,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [Preloader, Game, GameUI, GameOver, Title, Controls],
    scale: {
        zoom: 2
    }
})