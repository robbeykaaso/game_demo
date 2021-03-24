import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import Scene from './scenes/index'
import util from './base/util'
//import Test from './interface/interface'

const ctx = canvas.getContext('2d')

export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.scenes = {start: new Scene.Starting(this), 
                   train: new Scene.Training(this),
                   loading: new Scene.Loading(this)
                  }
    
    this.gameinfo = new GameInfo()
    this.music = new Music()

    this.bindLoop = this.loop.bind(this)
    this.switchScene("start")
  }

  switchScene(aScene){
    if (this.current_scene){
      window.cancelAnimationFrame(this.aniId)
      this.scenes[this.current_scene].leave()
    }
    this.current_scene = aScene
    this.scenes[this.current_scene].enter()
    this.nextloop()
  }

  nextloop(){
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  loop() {
    const sc = this.scenes[this.current_scene]
    sc.update()
    sc.render(ctx)
    this.nextloop()
  }
}
