import Player from './player/index'
import Ball from './player/ball'
import BackGround from './runtime/background'
import StartBackGround from './runtime/startBackground'
import Word from './runtime/word'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import StartGame from './startGame'
import util from './base/util'
//import Test from './interface/interface'

const ctx = canvas.getContext('2d')

class scene {
  constructor(aParent){
    this.parent = aParent
  }
  update(){

  }
  render(){

  }
  
  enter(){

  }

  leave(){

  }
}

class startScene extends scene {
  constructor(aParent) {
    super(aParent)
    const screenHeight = window.innerHeight
    this.bg = new StartBackGround(ctx)

    this.dq_word = new Word(ctx)
    this.dq_word.img.src = "images/斗球字.png"

    this.sports_btn = new StartGame(ctx)
    this.sports_btn.img.src = "images/sports_btn.png"
    this.sports_btn.y = screenHeight - this.sports_btn.height - 40

    this.lt_btn = new StartGame(ctx)
    this.lt_btn.img.src = "images/lt_btn.png"
    this.lt_btn.y = screenHeight - this.lt_btn.height+10  

    this.bindStartGame = this.startGame.bind(this)
  }
  update(){
    
  }
  render(){
    this.bg.render(ctx)
    this.dq_word.drawToCanvas(ctx)
    this.sports_btn.drawToCanvas(ctx)
    this.lt_btn.drawToCanvas(ctx)
  }

  startGame(e){
    e.preventDefault()
    const x = e.touches[0].clientX
    const y = e.touches[0].clientY
    if (this.sports_btn.pointIsIn(x , y)){
      this.parent.switchScene("train")
    }
  }

  enter(){
    canvas.addEventListener('touchstart', this.bindStartGame)
  }

  leave(){
    canvas.removeEventListener('touchstart', this.bindStartGame)
  }
}

class trainScene extends scene {
  constructor(aParent) {
    super(aParent)
    this.bg = new BackGround(ctx)
    this.player = new Player(ctx)
    this.ball = new Ball(ctx)
    this.player.ball = this.ball
    this.enemy = new Player(ctx)
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
  render(){
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

export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.scenes = {start: new startScene(this), 
                   train: new trainScene(this)}
    
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
    sc.render()
    this.nextloop()
  }
}
