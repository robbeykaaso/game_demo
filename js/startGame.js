import Sprite from "./base/sprite"


// const START_GAME_IMG_SRC = "images/sports_btn.png"
// const START_GAME_IMG_SRC = "images/lt_btn.png"
const START_GAME_WIDTH = 200
const START_GAME_HEIGT = 120
const screenWidth = window.innerWidth


export default class StartGame extends Sprite{
    constructor(){
      super("",START_GAME_WIDTH,START_GAME_HEIGT)

      this.x = screenWidth / 2 - this.width / 2
      // this.y = screenHeight - this.height - 30
    }
    // render(){
    //   this.visible = true
    // }
}
