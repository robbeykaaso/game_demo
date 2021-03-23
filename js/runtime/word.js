import Sprite from "../base/sprite"


// const START_GAME_IMG_SRC = "images/sports_btn.png"
// const START_GAME_IMG_SRC = "images/lt_btn.png"
const START_GAME_WIDTH = 500
const START_GAME_HEIGT = 300
const screenWidth = window.innerWidth


export default class Word extends Sprite{
    constructor(){
      super("",START_GAME_WIDTH,START_GAME_HEIGT)

      this.x = -100
      this.y = -20
      // this.y = screenHeight - this.height - 30
    }
    // render(){
    //   this.visible = true
    // }
}