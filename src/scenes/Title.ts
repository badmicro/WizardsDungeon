import Phaser from "phaser"

export default class Title extends Phaser.Scene
{

    private button!: Phaser.GameObjects.Sprite

    constructor()
    {
        super('title')
    }

    create(data: { title: string })
    {
        let background = this.add.sprite(0, 0, 'background')
        background.setOrigin(0, 0)
        background.setDisplaySize(400, 250)

        const { width, height } = this.scale

        let titleText = this.add.text(width * 0.5, height * 0.25, data.title, {
            fontSize: '38px',
			color: '#FFFFFF',
			padding: { left: 10, right: 10, bottom: 10, top: 10 }
        })
        titleText.setOrigin(0.5, 0.5)

        this.button = this.add.sprite(width * 0.5, height * 0.75, 'start-button').setInteractive()
        this.button.scale = 0.25

        this.button.on('pointerdown', () => {
            this.scene.start('game')
        })
    }

    update()
    {
        if(!this.button)
        {
            return
        }

        this.button.on('pointerover', () => {
            this.button.setTint(0x8a0303)
        })
        this.button.on('pointerout', () => {
            this.button.setTint(0xffffff)
        })
    }

}