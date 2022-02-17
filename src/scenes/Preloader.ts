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

// Import Sounds
import ambient from 'url:../../assets/sounds/Dungeon.mp3'

import slime1 from 'url:../../assets/sounds/slime/slime1.wav'
import slime2 from 'url:../../assets/sounds/slime/slime2.wav'
import slime3 from 'url:../../assets/sounds/slime/slime3.wav'
import slime4 from 'url:../../assets/sounds/slime/slime4.wav'

import potion from 'url:../../assets/sounds/bubble.wav'

import arrow from 'url:../../assets/sounds/swing3.wav'
import fireball from 'url:../../assets/sounds/Explosion_003.wav'

import injure from 'url:../../assets/sounds/injure.wav'
import death from 'url:../../assets/sounds/death.wav'

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

        //Sounds
        this.load.audio('ambient', ambient)

        this.load.audio('slime1', slime1)
        this.load.audio('slime2', slime2)
        this.load.audio('slime3', slime3)
        this.load.audio('slime4', slime4)

        this.load.audio('potion', potion)

        this.load.audio('arrow', arrow)
        this.load.audio('fireball', fireball)

        this.load.audio('injure', injure)
        this.load.audio('death', death)
    }

    create()
    {
        this.scene.start('title', { title: 'Wizards Dungeon' })
    }
}