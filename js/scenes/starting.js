import Scene from './scene'
import BackGround from '../runtime/background'
import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class startScene extends Scene {
  constructor(aParent) {
    super(aParent)
    this.bg = new BackGround.starting()
    this.dq_word = new Sprite("images/斗球字.png", 500, 300, - 100, - 20)
    this.sports_btn = new Sprite("images/sports_btn.png", 200, 120, screenWidth * 0.5 - 100, screenHeight - 160)
    this.lt_btn = new Sprite("images/lt_btn.png", 200, 120, screenWidth * 0.5 - 100, screenHeight - 110)

    this.bindStartGame = this.startGame.bind(this)
  }
  update(){
    
  }
  render(ctx){
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
      this.parent.switchScene("loading")
    }
  }

  enter(){
    canvas.addEventListener('touchstart', this.bindStartGame)
  }

  leave(){
    canvas.removeEventListener('touchstart', this.bindStartGame)
  }
}