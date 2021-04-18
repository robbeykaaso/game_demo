import Scene from './scene'
import BackGround from '../runtime/background'
import Player from '../object/swing/player'

export default class swingScene extends Scene {
  constructor(aParent) {
    super(aParent)
    this.bg = new BackGround.swinging()
    this.player = new Player()
  }
  update(){
    if (!this.eventInit){
      this.eventInit = true

      //this.enemy.addEvents()
    }
    const disx = this.player.update()
    this.bg.update(disx)

  }
  render(ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx)    
    this.player.drawToCanvas(ctx)
  }

  enter(){
    this.player.init((window.innerWidth - this.player.width) * 0.5, 
    (window.innerHeight - this.player.height) * 0.5)
  }

  leave(){

  }
}