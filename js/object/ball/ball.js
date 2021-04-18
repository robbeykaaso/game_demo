import Sprite from '../../base/sprite'

const BALL_IMG_SRC = 'images/ball/ball.png'
const BALL_WIDTH = 30
const BALL_HEIGHT = 30

const __ = {
  speed: Symbol('speed')
}

export default class Ball extends Sprite {
  constructor() {
    super(BALL_IMG_SRC, BALL_WIDTH, BALL_HEIGHT)

  }

  inWidthRange(aBallX, aPlayerX, aObject){
    return aBallX + this.width > aPlayerX && aBallX < aPlayerX + aObject.width
  }

  inHeightRange(aBallY, aPlayerY, aObject){
    return aBallY + this.height > aPlayerY && aBallY < aPlayerY + aObject.height
  }

  init(aOwner) {    
    this.act = {
      top: (aDelY)=>{
        //this.stick = true
        if (this.direction.y > 0)
          this.direction.y *= - 1
        if (aDelY){
          this.y += aDelY
          this[__.speed].y += Math.abs(aDelY) * 0.2
        }
      },
      left: (aDelX)=>{
        if (this.direction.x > 0)
          this.direction.x *= - 1
        if (aDelX){
          this.x += aDelX
          this[__.speed].x += Math.abs(aDelX) * 0.2
        }
      },
      right: (aDelX)=>{
        if (this.direction.x < 0)
          this.direction.x *= - 1
        if (aDelX){
          this.x += aDelX
          this[__.speed].x += Math.abs(aDelX) * 0.2
        }
      },
      bottom: (aDelY)=>{
        if (this.direction.y < 0)
          this.direction.y *= - 1
        if (aDelY){
          this.y += aDelY
          this[__.speed].y += Math.abs(aDelY) * 0.2
        } 
      }
    }

    this.stick = aOwner
    if (aOwner){
      this.x = aOwner.x + (aOwner.width - this.width) * 0.5
      this.y = aOwner.y - this.height
    }
    
    this.direction = {x: 0, y: 0}
    this[__.speed] = {x: 5, y: 5}

  }

  collided(aObject, aDelX, aDelY){
    if (this.y + this.height < aObject.y && this.y + this.height + aDelY >= aObject.y){
      let alpha = (aObject.y - this.y - this.height) / aDelY
      let ax = this.x + alpha * aDelX
      if (this.inWidthRange(ax, aObject.x, aObject)){
        this.act.top()
        return true
      }
    }
    if (this.y > aObject.y + aObject.height && this.y + aDelY < aObject.y + aObject.height){
      let alpha = (aObject.y + aObject.height - this.y) / aDelY
      let ax = this.x + alpha * aDelX
      if (this.inWidthRange(ax, aObject.x, aObject)){
        this.act.bottom()
        return true
      }
    }
    if (this.x + this.width < aObject.x && this.x + this.width + aDelX > aObject.x){
      let alpha = (aObject.x - this.x - this.width) / aDelX
      let ay = this.y + alpha * aDelY
      if (this.inHeightRange(ay, aObject.y, aObject)){
        this.act.left()
        return true
      }
    }
    if (this.x > aObject.x + aObject.width && this.x + aDelX < aObject.x + aObject.width){
      let alpha = (aObject.x + aObject.width - this.x) / aDelX
      let ay = this.y + alpha * aDelY
      if (this.inHeightRange(ay, aObject.y, aObject)){
        this.act.right()
        return true
      }
    }
  }

  update(aPlayers) {
    if (!this.stick){
      if (this[__.speed].x > 5){
        this[__.speed].x -= 0.05
      }
      if (this[__.speed].y > 5){
        this[__.speed].y -= 0.05
      }

      let delx = this.direction.x * this[__.speed].x
      let dely = this.direction.y * this[__.speed].y

      for (let i in aPlayers)
        if (this.collided(aPlayers[i], delx, dely))
          break
      this.x += delx
      this.y += dely

      if (!this.stick){
        if (this.y + this.height > window.innerHeight){
          this.y = window.innerHeight - this.height
          this.direction.y = - this.direction.y
        }else if (this.y < 0){
          this.y = 0
          this.direction.y = - this.direction.y
        }
        if (this.x + this.width > window.innerWidth){
          this.x = window.innerWidth - this.width
          this.direction.x = - this.direction.x
        }else if (this.x < 0){
          this.x = 0
          this.direction.x = - this.direction.x
        }
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
        this.stick = null
        const len = Math.sqrt(ct.x * ct.x + ct.y * ct.y)
        this.direction = {x: ct.x / len, y: ct.y / len}
      }
  }

}





