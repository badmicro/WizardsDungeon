import Phaser from "phaser"

//Import Map Sprites
import dungeonTiles from '../../assets/tiles/dungeon_tiles.png'
import dungeonMap from '../../assets/tiles/dungeon-01.json'
//Import Player Sprite
import playerJSON from '../../assets/character/player.json'
import playerPNG from '../../assets/character/player.png'
//Import Player UI
import UIemptyHeart from '../../assets/ui/ui_heart_empty.png'
import UIhalfHeart from '../../assets/ui/ui_heart_half.png'
import UIfullHeart from '../../assets/ui/ui_heart_full.png'
//Import Player Spell Assets
import magicMissle from '../../assets/spells/arrow.png'
import fireballPNG from '../../assets/spells/fireball.png'
import fireballJSON from '../../assets/spells/fireball.json'
//Import Health Potion
import healthPotion from '../../assets/items/flask_big_red.png'
//Import Enemy Sprite
import slimeJSON from '../../assets/enemies/slime.json'
import slimePNG from '../../assets/enemies/slime.png'

//Import Title Scene Background
import titleIMG from '../../assets/tiles/Wizards-Dungeon.png'
//Import Title Scene Button
import startButtonIMG from '../../assets/ui/start_button.png'

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super('preloader')
    }
    preload()
    {
        //Title Scene Background
        this.load.image('background', titleIMG)
        //Title Scene Button
        this.load.image('start-button', startButtonIMG)

        //Walls and Floor
        this.load.image('tiles', dungeonTiles)
        this.load.tilemapTiledJSON('dungeon', dungeonMap)
        //Player
        this.load.atlas('player', playerPNG, playerJSON)
        //Player Spells
        this.load.image('magicMissle', magicMissle)
        this.load.atlas('fireball', fireballPNG, fireballJSON)
        //UI
        this.load.image('ui-heart-empty', UIemptyHeart)
        this.load.image('ui-heart-half', UIhalfHeart)
        this.load.image('ui-heart-full', UIfullHeart)
        //Health Potion
        this.load.image('health-potion', healthPotion)
        //Enemy
        this.load.atlas('slime', slimePNG, slimeJSON)
    }

    create()
    {
        this.scene.start('title', { title: 'Wizards Dungeon' })
    }
}