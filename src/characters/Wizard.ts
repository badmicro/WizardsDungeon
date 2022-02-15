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
    DAMAGE
}

export default class Wizard extends Phaser.Physics.Arcade.Sprite
{
    private healthState = HealthState.IDLE
    private damageTime = 0

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number)
    {
        super(scene, x, y, texture, frame)

        this.anims.play('player-idle')
    }

    handleDamage(dir: Phaser.Math.Vector2)
    {
        if(this.healthState === HealthState.DAMAGE)
        {
            return
        }

        this.setVelocity(dir.x, dir.y)

        this.setTint(0xff0000)

        this.healthState = HealthState.DAMAGE
        this.damageTime = 0
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
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys)
    {
        if(this.healthState === HealthState.DAMAGE)
        {
            return
        }
        if(!cursors)
        {
            return
        }
        
        const speed = 100

        if(cursors.left?.isDown)
        {
            this.anims.play('player-move', true)
            this.setVelocity(-speed, 0)

            this.flipX = true
        }
        else if(cursors.right?.isDown)
        {
            this.anims.play('player-move', true)
            this.setVelocity(speed, 0)

            this.flipX = false
        }
        else if(cursors.up?.isDown)
        {
            this.anims.play('player-move', true)
            this.setVelocity(0, -speed)
        }
        else if(cursors.down?.isDown)
        {
            this.anims.play('player-move', true)
            this.setVelocity(0, speed)
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
