import Phaser from "phaser"

//import utility
import {debugDraw} from '../../utils/debug'
//import anims
import { createPlayerAnims } from '../animations/PlayerAnims'
import { createSlimeAnims } from '../animations/EnemyAnims'
//import character classes
import  "../characters/Wizard"
import Slime from "../enemies/Slime"
import Wizard from "../characters/Wizard"
//import events
import { sceneEvents } from '../events/EventCenter'

export default class Game extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private player!: Wizard

    constructor()
    {
        super('game')
    }

    preload()
    {
        //Initialize Keyboard Input
        this.cursors = this.input.keyboard.createCursorKeys()
    }//end preload

    create()
    {
        this.scene.run('game-ui')

        const map = this.make.tilemap({ key: 'dungeon' })
        const tileset = map.addTilesetImage('dungeon', 'tiles')

        map.createLayer('Ground', tileset)
        const wallsLayer = map.createLayer('Walls', tileset)

        wallsLayer.setCollisionByProperty({ collides: true })

        // abstracted Debug filter
        debugDraw(wallsLayer, this)


        ////// PLAYER
        // Player Animations
        createPlayerAnims(this.anims)
        // Player Initialization
        this.player = this.add.wizard(128, 140, 'wizard')
        
        // Player Camera
        this.cameras.main.startFollow(this.player, true)

        ////// ENEMY SLIME
        // Enemy Animations
        createSlimeAnims(this.anims)
        // Enemy Initialization
        const slimes = this.physics.add.group({
            classType: Slime,
            createCallback: (gameObj) => {
                const slimeGameObj = gameObj as Slime
                slimeGameObj.body.onCollide = true
            }
        })
        slimes.get(156, 56, 'slime')

        ////// PHYSICS
        // Player and Walls
        this.physics.add.collider(this.player, wallsLayer)
        // Enemy and Walls
        this.physics.add.collider(slimes, wallsLayer)
        // Player and Enemy
        this.physics.add.collider(slimes, this.player, this.handlePlayerSlimeCollision, undefined, this)
    }//end create

    private handlePlayerSlimeCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    {
        // console.dir(obj1)
        // console.dir(obj2)
        const slime = obj2 as Slime

        const dx = this.player.x - slime.x
        const dy = this.player.y - slime.y

        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

        this.player.handleDamage(dir)

        sceneEvents.emit('player-health-changed', this.player.health)
    }

    update(t: number, dt: number)
    {
        if(this.player)
        {
            this.player.update(this.cursors)
        }
    }//end update
}