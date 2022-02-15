import Phaser from "phaser"

//Import Map Sprites
import dungeonTiles from '../../assets/tiles/dungeon_tiles.png'
import dungeonMap from '../../assets/tiles/dungeon-01.json'
//Import Player Sprite
import playerJSON from '../../assets/character/player.json'
import playerPNG from '../../assets/character/player.png'

import UIemptyHeart from '../../assets/ui/ui_heart_empty.png'
import UIhalfHeart from '../../assets/ui/ui_heart_half.png'
import UIfullHeart from '../../assets/ui/ui_heart_full.png'
//Import Enemy Sprite
import slimeJSON from '../../assets/enemies/slime.json'
import slimePNG from '../../assets/enemies/slime.png'


export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super('preloader')
    }
    preload()
    {
        //Walls and Floor
        this.load.image('tiles', dungeonTiles)
        this.load.tilemapTiledJSON('dungeon', dungeonMap)
        //Player
        this.load.atlas('player', playerPNG, playerJSON)
        //UI
        this.load.image('ui-heart-empty', UIemptyHeart)
        this.load.image('ui-heart-half', UIhalfHeart)
        this.load.image('ui-heart-full', UIfullHeart)
        //Enemy
        this.load.atlas('slime', slimePNG, slimeJSON)
    }

    create()
    {
        this.scene.start('game')
    }
}