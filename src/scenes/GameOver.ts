import Phaser from "phaser"

export default class GameOver extends Phaser.Scene
{

    private deathGreave = 0
    private text!: Phaser.GameObjects.Text

    constructor()
    {
        super('game-over')
    }

    create(data: { title: string })
    {
        const { width, height } = this.scale

        this.text = this.add.text(width * 0.5, height * 0.5, data.title, {
            fontSize: '48px',
			color: '#000000',
			backgroundColor: '#AD1010',
			padding: { left: 10, right: 10, bottom: 10, top: 10 }
        })
        .setOrigin(0.5, 0.5)
    }

    update(time: number, delta: number)
    {
        this.deathGreave += delta
        if(this.deathGreave >= 3000)
        {
            this.deathGreave = 0
            if(this.text.text === 'Game Over')
            {
                this.scene.start('title')
            }
            else
            {
                this.scene.start('game')
            }
        }
    }
}