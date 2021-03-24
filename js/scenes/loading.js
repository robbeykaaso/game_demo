import Scene from './scene'
import BackGround from '../runtime/background'

export default class LoadingScene extends Scene {
  constructor(aParent) {
    super(aParent)
    this.bg = new BackGround.loading()
  }
  enter(){
    setTimeout(e=>{this.parent.switchScene("train")},1000)
  }
  update(){
    // this.bg.update(ctx)
  }
  render(ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx)
  }
}