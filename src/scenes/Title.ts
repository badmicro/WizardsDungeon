import Phaser from "phaser"

export default class Title extends Phaser.Scene
{

    private start_button!: Phaser.GameObjects.Sprite
    private controls_button!: Phaser.GameObjects.Sprite

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

        this.start_button = this.add.sprite(width * 0.25, height * 0.65, 'start-button').setInteractive()
        this.start_button.scale = 0.2

        this.start_button.on('pointerdown', () => {
            this.scene.start('game')
        })

        this.controls_button = this.add.sprite(width * 0.75, height * .65, 'controls-button').setInteractive()
        this.controls_button.scale = 0.2

        this.controls_button.on('pointerdown', () => {
            this.scene.start('controls')
        })
    }

    update()
    {
        if(!this.start_button)
        {
            return
        }

        this.start_button.on('pointerover', () => {
            this.start_button.setTint(0x8a0303)
        })
        this.start_button.on('pointerout', () => {
            this.start_button.setTint(0xffffff)
        })

        if(!this.controls_button)
        {
            return
        }

        this.controls_button.on('pointerover', () => {
            this.controls_button.setTint(0x8a0303)
        })
        this.controls_button.on('pointerout', () => {
            this.controls_button.setTint(0xffffff)
        })
    }

}