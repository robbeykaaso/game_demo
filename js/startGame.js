import Sprite from "./base/sprite"


const START_GAME_IMG_SRC = "images/startGame.png"
const START_GAME_WIDTH = 200
const START_GAME_HEIGT = 120
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class StartGame extends Sprite{
    constructor(){
      super(START_GAME_IMG_SRC,START_GAME_WIDTH,START_GAME_HEIGT)

      this.x = screenWidth / 2 - this.width / 2
      this.y = screenHeight - this.height - 50
      this.start = false
      // this.render()
      this.initEvent()
    }
    // render(){
    //   this.visible = true
    // }
    initEvent(){
      canvas.addEventListener('touchstart', ((e) => {
        e.preventDefault()
        const x = e.touches[0].clientX
        const y = e.touches[0].clientY
        
        if (!!(x >= this.x
          && y >= this.y
          && x <= this.x + this.width 
          && y <= this.y + this.height)) {
          this.start = true
        }
      }))
    }
}
