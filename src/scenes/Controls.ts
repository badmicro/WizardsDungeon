import Phaser from "phaser"

export default class Controls extends Phaser.Scene
{
    private back_button!: Phaser.GameObjects.Sprite

    constructor()
    {
        super('controls')
    }

    create()
    {
        let background = this.add.sprite(0, 0, 'controlsBG')
        background.setOrigin(0, 0)
        background.setDisplaySize(400, 250)

        const { width, height } = this.scale

        let titleText = this.add.text(width * 0.5, height * 0.25, 'Controls', {
            fontSize: '38px',
			color: '#FFFFFF',
			padding: { left: 10, right: 10, bottom: 10, top: 10 }
        })
        titleText.setOrigin(0.5, 0.5)

        let moveText = this.add.text(width * 0.25, height * 0.4, 'Movement:', {
            fontSize: '18px',
			color: '#FFFFFF',
        })
        moveText.setOrigin(0.5, 0.5)

        this.add.sprite(moveText.x, moveText.y + 30, 'up-key')
        this.add.sprite(moveText.x, moveText.y + 65, 'down-key')
        this.add.sprite(moveText.x - 35, moveText.y + 47, 'left-key')
        this.add.sprite(moveText.x + 35, moveText.y + 47, 'right-key')

        this.back_button = this.add.sprite(width * 0.5, height * 0.9, 'back-button').setInteractive()
        this.back_button.scale = 0.15

        let spellText = this.add.text(width * 0.75, height * 0.4, "Actions:", {
            fontSize: '18px',
			color: '#FFFFFF',
        })
        spellText.setOrigin(0.5, 0.5)

        this.add.sprite(spellText.x - 35, spellText.y + 30, 'space-key')
        this.add.sprite(spellText.x + 55, spellText.y + 30, 'magicMissle').scale = 1.5

        this.add.sprite(spellText.x - 35, spellText.y + 75, 'shift-key').scale = 1.25
        this.add.sprite(spellText.x + 55, spellText.y + 75, 'fireball')

        this.back_button.on('pointerdown', () => {
            this.scene.start('title')
        })
    }

    update()
    {
        if(!this.back_button)
        {
            return
        }

        this.back_button.on('pointerover', () => {
            this.back_button.setTint(0x8a0303)
        })
        this.back_button.on('pointerout', () => {
            this.back_button.setTint(0xffffff)
        })
    }
}