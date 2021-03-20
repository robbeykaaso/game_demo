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

  inWidthRange(aBallX, aPlayerX){
    return aBallX + this.width > aPlayerX && aBallX < aPlayerX + this.player.width
  }

  inHeightRange(aBallY, aPlayerY){
    return aBallY + this.height > aPlayerY && aBallY < aPlayerY + this.player.height
  }

  init(speed, aPlayer) {
    this.player = aPlayer
    aPlayer.ball = this
    
    this.act = {
      top: ()=>{
        this.stick = true
      },
      left: (aDelX)=>{
        if (this.direction.x > 0)
          this.direction.x *= - 1
        else
          this.x += aDelX
      },
      right: (aDelX)=>{
        if (this.direction.x < 0)
          this.direction.x *= - 1
        else
          this.x += aDelX
      },
      bottom: (aDelY)=>{
        if (this.direction.y < 0)
          this.direction.y *= - 1
        else
          this.y += aDelY 
      }
    }
    this.player.playerMoved = (e)=>{
      const dt = e
      if (!this.stick){
        do{
          if (dt.y > this.y + this.height && dt.ny < this.y + this.height){
            let alpha = (dt.y - this.y - this.height) / (dt.y - dt.ny)
            let ax = this.player.x + alpha * (dt.nx - dt.x)
            if (this.inWidthRange(this.x, ax)){
              this.act.top()
              break
            }
          }
          if (dt.y + this.player.height < this.y && dt.ny + this.player.height > this.y){
            let alpha = (dt.y + this.player.height - this.y) / (dt.y - dt.ny)
            let ax = this.player.x + alpha * (dt.nx - dt.x)
            if (this.inWidthRange(this.x, ax)){
              this.act.bottom(dt.ny - dt.y)
              break
            }
          }
          if (dt.x > this.x + this.width && dt.nx < this.x + this.width){
            let alpha = (dt.x - this.x - this.width) / (dt.x - dt.nx)
            let ay = this.player.y + alpha * (dt.ny - dt.y)
            if (this.inWidthRange(this.y, ay)){
              this.act.left(dt.nx - dt.x)
              break
            }
          }
          if (dt.x + this.player.width < this.x && dt.nx + this.player.width > this.x){
            let alpha = (dt.x + this.player.width - this.x) / (dt.x - dt.nx)
            let ay = this.player.y + alpha * (dt.ny - dt.y)
            if (this.inWidthRange(this.y, ay)){
              this.act.right(dt.nx - dt.x)
              break
            }
          }
        }while(0)
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

      do{
        if (this.y + this.height < this.player.y && this.y + this.height + dely >= this.player.y){
          let alpha = (this.player.y - this.y - this.height) / dely
          let ax = this.x + alpha * delx
          if (this.inWidthRange(ax, this.player.x)){
            this.act.top()
            break
          }
        }
        if (this.y > this.player.y + this.player.height && this.y + dely < this.player.y + this.player.height){
          let alpha = (this.player.y + this.player.height - this.y) / dely
          let ax = this.x + alpha * delx
          if (this.inWidthRange(ax, this.player.x)){
            this.act.bottom()
            break
          }
        }
        if (this.x + this.width < this.player.x && this.x + this.width + delx > this.player.x){
          let alpha = (this.player.x - this.x - this.width) / delx
          let ay = this.y + alpha * dely
          if (this.inHeightRange(ay, this.player.y)){
            this.act.left()
            break
          }
        }
        if (this.x > this.player.x + this.player.width && this.x + delx < this.player.x + this.player.width){
          let alpha = (this.player.x + this.player.width - this.x) / delx
          let ay = this.y + alpha * dely
          if (this.inHeightRange(ay, this.player.y)){
            this.act.right()
            break
          }
        }
      }while(0)
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





