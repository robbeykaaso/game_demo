import Sprite from '../base/sprite'

const BALL_IMG_SRC = 'images/ball.png'
const BALL_WIDTH = 30
const BALL_HEIGHT = 30

const __ = {
  speed: Symbol('speed')
}

export default class Ball extends Sprite {
  constructor() {
    super(BALL_IMG_SRC, BALL_WIDTH, BALL_HEIGHT)

  }
  init(speed, aPlayer) {
    this.player = aPlayer
    aPlayer.ball = this
    
    this.player.playerMoved = (e)=>{
      const dt = e
      if (!this.stick){
        if (dt.y > this.y + this.height && dt.ny < this.y + this.height){
          let alpha = (dt.y - this.y - this.height) / (dt.y - dt.ny)
          let ax = this.player.x + alpha * (dt.nx - dt.x)
          if (this.x + this.width > ax && this.x < ax + this.player.width){
            this.stick = true
          }
        }
      }else{
        this.x += dt.nx - dt.x
        this.y += dt.ny - dt.y
      }
    }

    this.stick = true

    this.x = this.player.x + (this.player.width - this.width) * 0.5
    this.y = this.player.y - this.height
    
    this.direction = {x: 0, y: 0}
    this[__.speed] = speed

  }

  update() {
    if (!this.stick){
      let delx = this.direction.x * this[__.speed]
      let dely = this.direction.y * this[__.speed]

      if (this.y + this.height < this.player.y && this.y + this.height + dely >= this.player.y){
        let alpha = (this.player.y - this.y - this.height) / dely
        let ax = this.x + alpha * delx
        if (ax + this.width > this.player.x && ax < this.player.x + this.player.width){
          this.stick = true
        }
      }
      this.x += delx
      this.y += dely

      if (!this.stick){
        if (this.y + this.height > window.innerHeight || this.y <0)
          this.direction.y = - this.direction.y
        if (this.x + this.width > window.innerWidth || this.x < 0)
          this.direction.x = - this.direction.x
      }
    }
  }

  startMove(x,y){
      if (!this.stick)
        return
      let ct = {x: this.x + this.width * 0.5, y: this.y + this.height * 0.5}
      ct.x = x - ct.x
      ct.y = y - ct.y
      if (ct.x && ct.y){
        this.stick = false
        const len = Math.sqrt(ct.x * ct.x + ct.y * ct.y)
        this.direction = {x: ct.x / len, y: ct.y / len}
      }
  }

}





