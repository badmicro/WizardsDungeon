import Phaser from "phaser"

enum Direction
{
    UP,
    DOWN,
    LEFT,
    RIGHT
}

const randomDirection = (exclude: Direction) => {
    let newDirection = Phaser.Math.Between(0, 3)
    while(newDirection === exclude)
    {
        newDirection = Phaser.Math.Between(0, 3)
    }
    return newDirection
}

export default class Slime extends Phaser.Physics.Arcade.Sprite
{
    private direction = Direction.RIGHT
    private moveEvent: Phaser.Time.TimerEvent
    private speed = 50

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number)
    {
        super(scene, x, y, texture, frame)

        this.anims.play('slime-idle')

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this)

        this.moveEvent = scene.time.addEvent({
            delay: 2000,
            callback: () => {
                this.direction = randomDirection(this.direction)
            },
            loop: true
        })
    }

    destroy(fromScene?: boolean)
    {
        this.moveEvent.destroy()
        super.destroy(fromScene)
    }

    private handleTileCollision(gameObj: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile)
    {
        if(gameObj !== this)
        {
            return
        }
        this.direction = randomDirection(this.direction)
    }

    protected preUpdate(t: number, dt: number)
    {
        super.preUpdate(t, dt)

        const speed = this.speed
        switch(this.direction)
        {
            case Direction.UP:
                this.setVelocity(0, -speed)
                break

            case Direction.DOWN:
                this.setVelocity(0, speed)
                break

            case Direction.LEFT:
                this.setVelocity(-speed, 0)
                break

            case Direction.RIGHT:
                this.setVelocity(speed, 0)
                break
        }
    }
}