import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

class backGround extends Sprite {
  constructor(aDefault = 'images/bg2.png', aWidth = 512, aHeight = 512) {
    super(aDefault, aWidth, aHeight)

    this.top = 0
  }

  render(ctx) {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      -screenHeight + this.top,
      screenWidth,
      screenHeight
    )

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      this.top,
      screenWidth,
      screenHeight
    )
  }
}

class startBackground extends backGround{
  constructor(){
    super('images/startGame_bg3.png', screenWidth * 2.3, screenHeight * 2.3)
  }
}

class loadingBackground extends backGround{
  constructor(){
    super('images/loading3.gif', screenWidth, screenHeight)
  }
}

module.exports = {
  playing: backGround,
  starting: startBackground,
  loading: loadingBackground
}
