import Scene from './scene'
import BackGround from '../runtime/background'
import Player from '../object/ball/slider'
import Ball from '../object/ball/ball'

export default class trainScene extends Scene {
  constructor(aParent) {
    super(aParent)
    this.bg = new BackGround.playing()
    this.player = new Player()
    this.ball = new Ball()
    this.player.ball = this.ball
    this.enemy = new Player()
    this.enemy.ball = this.ball
  }
  update(){
    if (!this.eventInit){
      this.eventInit = true
      this.player.addEvents()
      //this.enemy.addEvents()
    }
    //this.bg.update()
    this.ball.update([this.player, this.enemy])
    if (this.enemy.orbit)
      this.enemy.orbit()
  }
  render(ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx)    
    this.player.drawToCanvas(ctx)
    this.ball.drawToCanvas(ctx) 
    this.enemy.drawToCanvas(ctx)
  }

  enter(){
    this.player.init({left: this.ball.width * 1.5, 
          top: window.innerHeight * 0.5 + this.ball.height,
          right: window.innerWidth - this.ball.width * 1.5, 
          bottom: window.innerHeight - this.ball.height * 1.5},
        (window.innerWidth - this.player.width) * 0.5,
        window.innerHeight - this.player.height - 60)
    this.ball.init(this.player)

    this.enemy_dir = - 1
    this.enemy.init({left: this.ball.width * 1.5,
      top: this.ball.height * 1.5,
      right: window.innerWidth - this.ball.width * 1.5,
      bottom: window.innerHeight * 0.5 - this.ball.height},
      (window.innerWidth - this.enemy.width) * 0.5,
      60, e=>{
        if (this.enemy.x == this.ball.width * 1.5 || this.enemy.x + this.enemy.width == window.innerWidth - this.ball.width * 1.5)
          this.enemy_dir *= - 1
        this.enemy.moveTo(this.enemy.x + this.enemy.width * 0.5 + this.enemy_dir,  this.enemy.y + this.enemy.height * 0.5)
      })
  }

  leave(){
    this.player.removeEvents()
   // this.enemy.removeEvents()
  }
}