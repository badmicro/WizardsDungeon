import Phaser from "phaser"

declare global
{
    namespace Phaser.GameObjects
    {
        interface GameObjectFactory
        {
            wizard(x: number, y: number, texture: string, frame?: string | number): Wizard
        }
    }
}

enum HealthState
{
    IDLE,
    DAMAGE,
    DEAD
}
enum FireballState
{
    ONCOOLDOWN,
    OFFCOOLDOWN
}
enum Facing
{
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export default class Wizard extends Phaser.Physics.Arcade.Sprite
{
    private healthState = HealthState.IDLE
    private damageTime = 0
    private facing = Facing.RIGHT
    private fireballState = FireballState.OFFCOOLDOWN
    private fireballCD = 0

    //underscore is a convention for private vars
    //use method to handle get
    private _health = 3

    private magicMissles?: Phaser.Physics.Arcade.Group
    private fireball?: Phaser.Physics.Arcade.Group

    get health()
    {
        return this._health
    }

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number)
    {
        super(scene, x, y, texture, frame)

        this.anims.play('player-idle')
    }

    setMagicMissles(magicMissles: Phaser.Physics.Arcade.Group)
    {
        this.magicMissles = magicMissles
    }

    setFireball(fireball: Phaser.Physics.Arcade.Group)
    {
        this.fireball = fireball
    }

    handleDamage(dir: Phaser.Math.Vector2)
    {
        if(this._health <= 0)
        {
            return
        }
        if(this.healthState === HealthState.DAMAGE)
        {
            return
        }

        --this._health

        if(this.health <= 0)
        {
            //TODO: die
            this.healthState = HealthState.DEAD
            this.setTint(0x8a0303)
            this.play('player-hit')

            this.setVelocity(0, 0)
        }
        else
        {
            this.setVelocity(dir.x, dir.y)

            this.setTint(0xff0000)
            this.play('player-hit')

            this.healthState = HealthState.DAMAGE
            this.damageTime = 0
        }
    }

    handleHealthPotion()
    {
        if(this._health < 3)
        {
            ++this._health
        }
    }

    private castMagicMissles()
    {
        if(!this.magicMissles)
        {
            return
        }

        const direction = this.facing
        const vec = new Phaser.Math.Vector2(0, 0)

        switch(direction)
        {
            case Facing.UP:
                vec.y = -1
                break
            case Facing.DOWN:
                vec.y = 1
                break
            case Facing.LEFT:
                vec.x = -1
                break
            default:
            case Facing.RIGHT:
                vec.x = 1
                break
        }

        const angle = vec.angle()
        const magicMissle = this.magicMissles.get(this.x, this.y, 'magicMissle') as Phaser.Physics.Arcade.Image

        magicMissle.setActive(true)
        magicMissle.setVisible(true)

        magicMissle.setRotation(angle)
        magicMissle.body.setSize(magicMissle.width * 0.5, magicMissle.height * 0.5)

        magicMissle.x += vec.x * 16
        magicMissle.y += vec.y * 16
        magicMissle.setVelocity(vec.x *300, vec.y * 300)
        magicMissle.setTint(0x6AEB2B)

        this.scene.sound.play('arrow', { volume: 0.35 })
    }

    private castFireball()
    {
        if(!this.fireball
            || this.fireballState === FireballState.ONCOOLDOWN)
        {
            return
        }

        const direction = this.facing
        const vec = new Phaser.Math.Vector2(0, 0)

        switch(direction)
        {
            case Facing.UP:
                vec.y = -1
                break
            case Facing.DOWN:
                vec.y = 1
                break
            case Facing.LEFT:
                vec.x = -1
                break
            default:
            case Facing.RIGHT:
                vec.x = 1
                break
        }

        const angle = vec.angle()
        const fireball = this.fireball.get(this.x, this.y, 'fireball') as Phaser.Physics.Arcade.Sprite

        fireball.setActive(true)
        fireball.setVisible(true)

        fireball.setRotation(angle)
        fireball.body.setSize(fireball.width * 0.5, fireball.height * 0.5)

        fireball.x += vec.x * 16
        fireball.y += vec.y * 16

        fireball.setBounce(0, 0)
        fireball.setImmovable(true)

        fireball.setVelocity(vec.x *300, vec.y * 300)
        
        this.fireballState = FireballState.ONCOOLDOWN
        this.scene.sound.play('fireball', { volume: 0.35 })
    }

    preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta)
        switch(this.healthState)
        {
            case HealthState.IDLE:
                break

            case HealthState.DAMAGE:
                this.damageTime += delta
                if(this.damageTime >= 250)
                {
                    this.healthState = HealthState.IDLE
                    this.setTint(0xffffff)
                    this.damageTime = 0
                }
                break
        }
        switch(this.fireballState)
        {
            case FireballState.OFFCOOLDOWN:
                break
            case FireballState.ONCOOLDOWN:
                this.fireballCD += delta
                if(this.fireballCD >= 3000)
                {
                    this.fireballState = FireballState.OFFCOOLDOWN
                    this.fireballCD = 0
                }
        }
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys)
    {
        if(this.healthState === HealthState.DAMAGE
            || this.healthState === HealthState.DEAD)
        {
            return
        }
        if(!cursors)
        {
            return
        }
        
        if(Phaser.Input.Keyboard.JustDown(cursors.space!))
        {
            this.castMagicMissles()
            return
        }
        if(Phaser.Input.Keyboard.JustDown(cursors.shift!))
        {
            this.castFireball()
            return
        }
        
        const speed = 100

        if(cursors.left?.isDown)
        {
            this.anims.play('player-move', true)
            this.setVelocity(-speed, 0)
            this.facing = Facing.LEFT

            this.flipX = true
        }
        else if(cursors.right?.isDown)
        {
            this.anims.play('player-move', true)
            this.setVelocity(speed, 0)
            this.facing = Facing.RIGHT

            this.flipX = false
        }
        else if(cursors.up?.isDown)
        {
            this.anims.play('player-move', true)
            this.setVelocity(0, -speed)
            this.facing = Facing.UP
        }
        else if(cursors.down?.isDown)
        {
            this.anims.play('player-move', true)
            this.setVelocity(0, speed)
            this.facing = Facing.DOWN
        }
        else
        {
            this.anims.play('player-idle', true)
            this.setVelocity(0, 0)
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('wizard', function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number)
{
    var sprite = new Wizard(this.scene, x, y, texture, frame)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    sprite.body.setSize(sprite.width, sprite.height * 0.75)
    sprite.body.setOffset(0, 8)

    return sprite
})
