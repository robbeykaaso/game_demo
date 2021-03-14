import Sprite from '../base/sprite'
import DataBus from '../databus'

const BALL_IMG_SRC = 'images/ball.jpg'
const BALL_WIDTH = 20
const BALL_HEIGHT = 20

const __ = {
  speed: Symbol('speed')
}

const databus = new DataBus()

export default class ball extends Sprite {
  constructor() {
    super(BALL_IMG_SRC, BALL_WIDTH, BALL_HEIGHT)
  }

  init(x, y, speed, player) {
    this.x = x
    this.y = y

    this[__.speed] = speed

    this.player = player
    this.visible = true
    this.direction = [0, 0]
  }

  // 每一帧更新子弹位置
  update() {
    //this.y -= this[__.speed]

    // 超出屏幕外回收自身
    //if (this.y < -this.height) databus.removeBullets(this)
  }
}
