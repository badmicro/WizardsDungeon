import Phaser from "phaser"

const createPlayerAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'player-idle',
        repeat: -1,
        frameRate: 8,
        frames: anims.generateFrameNames('player', {start: 0, end: 3, prefix: 'wizzard_m_idle_anim_f', suffix: '.png'})
    })
    anims.create({
        key: 'player-move',
        repeat: -1,
        frameRate: 8,
        frames: anims.generateFrameNames('player', {start: 0, end: 3, prefix: 'wizzard_m_run_anim_f', suffix: '.png'})
    })
    anims.create({
        key: 'player-hit',
        frameRate: 8,
        frames: anims.generateFrameNames('player', {start: 0, end: 0, prefix: 'wizzard_m_hit_anim_f', suffix: '.png'})
    })
    anims.create({
        key: 'fireball',
        repeat: -1,
        frameRate: 15,
        frames: anims.generateFrameNames('fireball', {start: 1, end: 60, prefix: '', suffix: '.png'})
    })
}

export {
    createPlayerAnims
}