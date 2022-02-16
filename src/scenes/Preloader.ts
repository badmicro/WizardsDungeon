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
//Import Title Scene Buttons
import startButtonIMG from '../../assets/ui/start_button.png'
import controlsButtonIMG from '../../assets/ui/controls_button.png'

// Import Controls Scene Background
import controlsBackgroundIMG from '../../assets/tiles/Controls.png'
// Import Controls Scene Button
import backButtonIMG from '../../assets/ui/back_button.png'
// Import Controls Scene Layout images
import upKeyIMG from '../../assets/ui/up.png'
import downKeyIMG from '../../assets/ui/down.png'
import rightKeyIMG from '../../assets/ui/right.png'
import leftKeyIMG from '../../assets/ui/left.png'
import spaceKeyIMG from '../../assets/ui/space.png'
import shiftKeyIMG from '../../assets/ui/shift.png'

// Import Audio
import ambientAudio from '../../assets/sounds/dungeon_ambient_1.mp3'

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
        //Title Scene Buttons
        this.load.image('start-button', startButtonIMG)
        this.load.image('controls-button', controlsButtonIMG)

        //Controls Scene Background
        this.load.image('controlsBG', controlsBackgroundIMG)
        //Controls Scene Button
        this.load.image('back-button', backButtonIMG)
        //Controls Scene Layout
        this.load.image('up-key', upKeyIMG)
        this.load.image('down-key', downKeyIMG)
        this.load.image('right-key', rightKeyIMG)
        this.load.image('left-key', leftKeyIMG)
        this.load.image('space-key', spaceKeyIMG)
        this.load.image('shift-key', shiftKeyIMG)

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


        //Audio
        this.load.audio('ambient', ambientAudio)
    }

    create()
    {
        this.scene.start('title', { title: 'Wizards Dungeon' })
    }
}