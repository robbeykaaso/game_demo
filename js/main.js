import Player from './player/index'
import Ball from './player/ball'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'
import StartGame from './startGame'
//import Test from './interface/interface'

const ctx = canvas.getContext('2d')
const databus = new DataBus()

export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.startGame = new StartGame(ctx)
    this.restart()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg = new BackGround(ctx)
    this.player = new Player(ctx)
    this.ball = new Ball(ctx)

    this.player.ball = this.ball
    this.player.init({left: this.ball.width * 1.5, 
                      top: window.innerHeight * 0.5 + this.ball.height,
                      right: window.innerWidth - this.ball.width * 1.5, 
                      bottom: window.innerHeight - this.ball.height * 1.5},
                    (window.innerWidth - this.player.width) * 0.5,
                    window.innerHeight - this.player.height - 60)
    this.ball.init(5, this.player)

    this.enemy = new Player(ctx)
    this.enemy.ball = this.ball
    this.enemy.init({left: this.ball.width * 1.5,
                     top: this.ball.height * 1.5,
                     right: window.innerWidth - this.ball.width * 1.5,
                     bottom: window.innerHeight * 0.5 - this.ball.height},
                     (window.innerWidth - this.enemy.width) * 0.5,
                     60)

    this.gameinfo = new GameInfo()
    this.music = new Music()

    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId)

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

    const x = e.touches[0].clientX
    const y = e.touches[0].clientY

    const area = this.gameinfo.btnArea

    if (x >= area.startX
        && x <= area.endX
        && y >= area.startY
        && y <= area.endY) this.restart()
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)    
    this.player.drawToCanvas(ctx)
    this.ball.drawToCanvas(ctx) 
    this.enemy.drawToCanvas(ctx)
    
    databus.animations.forEach((ani) => {
      if (ani.isPlaying) {
        ani.aniRender(ctx)
      }
    })

    this.gameinfo.renderGameScore(ctx, databus.score)

    // 游戏结束停止帧循环
    if (databus.gameOver) {
      this.gameinfo.renderGameOver(ctx, databus.score)

      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

  update() {
    if (databus.gameOver) return

    //this.bg.update()
    this.ball.update([this.player, this.enemy])

   // this.enemy.moveTo(this.enemy.x + util.random(- 5, 5), this.enemy.y + util.random(- 5, 5))
  }

  loop() {
    databus.frame++

    this.startGame.drawToCanvas(ctx)
    if(this.startGame.start){
      this.update()
      this.render()
    }

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
