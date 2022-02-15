import Phaser from 'phaser'

const createSlimeAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'slime-idle',
        repeat: -1,
        frameRate: 8,
        frames: anims.generateFrameNames('slime', {start: 0, end: 3, prefix: 'swampy_idle_anim_f', suffix: '.png'})
    })
    anims.create({
        key: 'slime-move',
        repeat: -1,
        frameRate: 8,
        frames: anims.generateFrameNames('slime', {start: 0, end: 3, prefix: 'swampy_run_anim_f', suffix: '.png'})
    })
}

export {
    createSlimeAnims
}