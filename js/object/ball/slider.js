import Sprite from '../../base/sprite'

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/ball/panel.png'
const PLAYER_WIDTH = 50
const PLAYER_HEIGHT = 50

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    this.PLAYER_WIDTH = PLAYER_WIDTH
    this.PLAYER_HEIGHT = PLAYER_HEIGHT
    
    this.bindTouchStart = this.touchStart.bind(this)
    this.bindTouchMove = this.touchMove.bind(this)
    this.bindTouchEnd = this.touchEnd.bind(this)
  }

  init(aMoveRange, aX, aY, aOrbit){
    this.x = aX
    this.y = aY
    this.move_range = aMoveRange
    this.orbit = aOrbit
  }

  inBoundBox(x, y) {
    const deviation = 0

    return !!(x >= this.x - deviation
              && y >= this.y - deviation
              && x <= this.x + this.width + deviation
              && y <= this.y + this.height + deviation)
  }

  moveBall(dt) {
    if (!this.ball.stick){
      do{
        if (dt.y > this.ball.y + this.ball.height && dt.ny < this.ball.y + this.ball.height){
          let alpha = (dt.y - this.ball.y - this.ball.height) / (dt.y - dt.ny)
          let ax = this.x + alpha * (dt.nx - dt.x)
          if (this.ball.inWidthRange(this.ball.x, ax, this)){
            this.ball.act.top(dt.ny - dt.y)
            break
          }
        }
        if (dt.y + this.height < this.ball.y && dt.ny + this.height > this.ball.y){
          let alpha = (dt.y + this.height - this.ball.y) / (dt.y - dt.ny)
          let ax = this.x + alpha * (dt.nx - dt.x)
          if (this.ball.inWidthRange(this.ball.x, ax, this)){
            this.ball.act.bottom(dt.ny - dt.y)
            break
          }
        }
        if (dt.x > this.ball.x + this.ball.width && dt.nx < this.ball.x + this.ball.width){
          let alpha = (dt.x - this.ball.x - this.ball.width) / (dt.x - dt.nx)
          let ay = this.y + alpha * (dt.ny - dt.y)
          if (this.ball.inWidthRange(this.ball.y, ay, this)){
            this.ball.act.left(dt.nx - dt.x)
            break
          }
        }
        if (dt.x + this.width < this.ball.x && dt.nx + this.width > this.ball.x){
          let alpha = (dt.x + this.width - this.ball.x) / (dt.x - dt.nx)
          let ay = this.y + alpha * (dt.ny - dt.y)
          if (this.ball.inWidthRange(this.ball.y, ay, this)){
            this.ball.act.right(dt.nx - dt.x)
            break
          }
        }
      }while(0)
    }else if (this.ball.stick == this){
      this.ball.x += dt.nx - dt.x
      this.ball.y += dt.ny - dt.y
    }
  }

  moveTo(x, y) {
    let disX = x - this.width / 2
    let disY = y - this.height / 2

    if (disX < this.move_range.left) disX = this.move_range.left

    else if (disX > this.move_range.right - this.width) disX = this.move_range.right - this.width

    if (disY < this.move_range.top) disY = this.move_range.top

    else if (disY > this.move_range.bottom - this.height) disY = this.move_range.bottom - this.height

    this.moveBall({x: this.x, y: this.y, nx: disX, ny: disY})
    this.x = disX
    this.y = disY
  }

  touchStart(e){
    e.preventDefault()
    const x = e.touches[0].clientX
    const y = e.touches[0].clientY

    //
    if (this.inBoundBox(x, y)) {
      this.touched = true

      this.moveTo(x, y)
    }else{
      if (this.ball)
        this.ball.startMove(x, y)
    }
  }

  touchMove(e){
    e.preventDefault()

    const x = e.touches[0].clientX
    const y = e.touches[0].clientY

    if (this.touched) this.moveTo(x, y)
  }

  touchEnd(e){
    e.preventDefault()
    this.touched = false
  }

  addEvents() {
    this.touched = false
    canvas.addEventListener('touchstart', this.bindTouchStart)
    canvas.addEventListener('touchmove', this.bindTouchMove)
    canvas.addEventListener('touchend', this.bindTouchEnd)
  }

  removeEvents(){
    canvas.removeEventListener('touchstart', this.bindTouchStart)
    canvas.removeEventListener('touchmove', this.bindTouchMove)
    canvas.removeEventListener('touchend', this.bindTouchEnd)
  }
}
