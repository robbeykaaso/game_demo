import Animation from '../base/animation'
import DataBus from '../databus'

const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH = 40
const ENEMY_HEIGHT = 40

const __ = {
  speed: Symbol('speed'),
}

const databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)

    this.initExplosionAnimation()
  }

  init(speed) {
    this.x = rnd(0, window.innerWidth - ENEMY_WIDTH)
    this.y = rnd(0, window.innerHeight / 2 - this.height) 
    this.alpha = 200

    this[__.speed] = speed

    this.visible = true
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    const frames = []

    const EXPLO_IMG_PREFIX = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
      frames.push(`${EXPLO_IMG_PREFIX + (i + 1)}.png`)
    }

    this.initFrames(frames)
  }

  drawToCanvas(ctx) {
    if (!this.visible) return

    //this.drawImage(ctx, this.img, this.x, this.y, this.alpha / 100)
    let tmp = ctx.globalAlpha
    ctx.globalAlpha = 1 - Math.abs(this.alpha - 100) / 100
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
    ctx.globalAlpha = tmp
  }

  // 每一帧更新子弹位置
  update() {
    //this.y += this[__.speed]
   this.alpha--
    // 对象回收
    //if (this.y > window.innerHeight + this.height) databus.removeEnemey(this)
    if (!this.alpha){
      databus.removeEnemey(this);
    }
  }
}
