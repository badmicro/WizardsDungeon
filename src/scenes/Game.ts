import Phaser from "phaser"

//import utility
import {debugDraw} from '../../utils/debug'
//import anims
import { createPlayerAnims } from '../animations/PlayerAnims'
import { createSlimeAnims } from '../animations/EnemyAnims'
//character classes
import Slime from "../enemies/Slime"

export default class Game extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private player!: Phaser.Physics.Arcade.Sprite

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
        this.player = this.physics.add.sprite(128, 128, 'player', 'wizzard_m_idle_anim_f1.png')
        this.player.body.setSize(this.player.width, this.player.height * 0.75)
        this.player.body.setOffset(0, 8)
        
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
        this.physics.add.collider(this.player, slimes)
        // this.physics.add.collider(slimes, this.player, this.handlePlayerSlimeCollision, undefined, this)
    }//end create

    // private handlePlayerSlimeCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    // {
    //     const lizard = obj2 as Lizard
    //     const dx = this.player.x - lizard.x
    //     const dy  = this.player.y = lizard.y

    //     const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

    //     this.player.setVelocity(dir.x, dir.y)
    //     //console.dir(obj1)
    //     //console.dir(obj2)
    // }

    update(t: number, dt: number)
    {
        if(!this.cursors || !this.player)
        {
            return
        }

        ////PLAYER CONTROLS
        const speed = 100

        if(this.cursors.left?.isDown)
        {
            this.player.anims.play('player-move', true)
            this.player.setVelocity(-speed, 0)

            this.player.flipX = true
        }
        else if(this.cursors.right?.isDown)
        {
            this.player.anims.play('player-move', true)
            this.player.setVelocity(speed, 0)

            this.player.flipX = false
        }
        else if(this.cursors.up?.isDown)
        {
            this.player.anims.play('player-move', true)
            this.player.setVelocity(0, -speed)
        }
        else if(this.cursors.down?.isDown)
        {
            this.player.anims.play('player-move', true)
            this.player.setVelocity(0, speed)
        }
        else
        {
            this.player.anims.play('player-idle', true)
            this.player.setVelocity(0, 0)
        }
    }//end update
}