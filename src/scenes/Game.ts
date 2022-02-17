import Phaser, { Physics } from "phaser"

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

    private magicMissles!: Phaser.Physics.Arcade.Group
    private fireball!: Phaser.Physics.Arcade.Group

    private slimes!: Phaser.Physics.Arcade.Group
    private playerSlimesCollider?: Phaser.Physics.Arcade.Collider

    private healthPotions!: Phaser.Physics.Arcade.Group
    private playerHealthPotionsCollider?: Phaser.Physics.Arcade.Collider

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
        //create UI layer
        this.scene.run('game-ui')

        //create dungeon layer
        const map = this.make.tilemap({ key: 'dungeon' })
        const tileset = map.addTilesetImage('dungeon', 'tiles')

        map.createLayer('Ground', tileset)
        const wallsLayer = map.createLayer('Walls', tileset)

        wallsLayer.setCollisionByProperty({ collides: true })

        // abstracted Debug filter
        //debugDraw(wallsLayer, this)


        ////// PLAYER
        // Player Animations
        createPlayerAnims(this.anims)
        // Player Initialization
        this.player = this.add.wizard(128, 140, 'wizard')
        
        // Player Camera
        this.cameras.main.startFollow(this.player, true)

        //Player Spells
        this.magicMissles = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image
        })
        this.player.setMagicMissles(this.magicMissles)

        this.fireball = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite
        })
        this.player.setFireball(this.fireball)

        //Handle Potion realm
        this.healthPotions = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image
        })

        ////// ENEMY SLIME
        // Enemy Animations
        createSlimeAnims(this.anims)
        // Enemy Initialization
        this.slimes = this.physics.add.group({
            classType: Slime,
            createCallback: (gameObj) => {
                const slimeGameObj = gameObj as Slime
                slimeGameObj.body.onCollide = true
            }
        })

        const slimesLayer = map.getObjectLayer('Slimes')
        slimesLayer.objects.forEach(slimeObj => {
            this.slimes.get(slimeObj.x! + slimeObj.width! * 0.5, slimeObj.y! + slimeObj.height! * 0.5, 'slime')
        })
        


        ////// PHYSICS
        // Player and Walls
        this.physics.add.collider(this.player, wallsLayer)
        // Enemy and Walls
        this.physics.add.collider(this.slimes, wallsLayer)
        // Magic Missles and Walls
        this.physics.add.collider(this.magicMissles, wallsLayer, this.handleMagicMisslesWallCollision, undefined, this)
        // Magic Missles and Slimes
        this.physics.add.collider(this.magicMissles, this.slimes, this.handleMagicSlimeCollision, undefined, this)
        // Fireball and Slimes
        this.physics.add.collider(this.fireball, this.slimes, this.handleFireballSlimeCollision, undefined, this)
        // Fireball and Health Potions
        this.physics.add.collider(this.fireball, this.healthPotions, this.handleFireballHealthPotionCollision, undefined, this)
        // Player and Enemy
        this.playerSlimesCollider = this.physics.add.collider(this.slimes, this.player, this.handlePlayerSlimeCollision, undefined, this)
        // Player and Health Potion
        this.playerHealthPotionsCollider = this.physics.add.collider(this.healthPotions, this.player, this.handlePlayerHealthPotionCollision, undefined, this)
    }//end create

    private handleMagicMisslesWallCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    {
        this.magicMissles.killAndHide(obj1)
        obj1.destroy()
    }

    private handleMagicSlimeCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    {
        this.magicMissles.killAndHide(obj1)
        this.slimes.killAndHide(obj2)
        const x = obj2.body.position.x
        const y = obj2.body.position.y
        obj1.destroy()
        obj2.destroy()
        this.healthPotions.get(x, y, 'health-potion') as Phaser.Physics.Arcade.Image
        this.sound.play("slime3")
    }

    private handleFireballSlimeCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    {
        this.slimes.killAndHide(obj2)
        obj2.destroy()
        this.sound.play("slime1")
    }

    private handlePlayerHealthPotionCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    {
        obj2.destroy()
        this.player.handleHealthPotion()
        sceneEvents.emit('player-health-changed', this.player.health)

        if(this.player.health <= 0)
        {
            this.playerSlimesCollider?.destroy()
            this.playerHealthPotionsCollider?.destroy()
        }
        this.sound.play('potion')
    }

    private handleFireballHealthPotionCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    {
        obj2.destroy()
    }

    private handlePlayerSlimeCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
    {
        const slime = obj2 as Slime

        const dx = this.player.x - slime.x
        const dy = this.player.y - slime.y

        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

        this.player.handleDamage(dir)

        sceneEvents.emit('player-health-changed', this.player.health)

        if(this.player.health <= 0)
        {
            this.playerSlimesCollider?.destroy()
            this.playerHealthPotionsCollider?.destroy()
        }
        else
        {
            this.sound.play('injure')
        }

        this.sound.play("slime2")
    }

    update(t: number, dt: number)
    {
        if(this.player)
        {
            this.player.update(this.cursors)
        }
        //Lose Condition
        if(this.player.health <= 0)
        {
            this.sound.play('death')
            this.scene.start('game-over', { title: 'Game Over' })
            return
        }
        //Win Condition?
        if(this.slimes.countActive() <= 0)
        {
            this.scene.start('game-over', { title: 'Deeper Still'})
        }

    }//end update
}