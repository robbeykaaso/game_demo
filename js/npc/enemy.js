import Animation from '../base/animation'
import DataBus from '../databus'

const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH = 40
const ENEMY_HEIGHT = 40

const __ = {
  speed: Symbol('speed'),
}

const databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)

    this.initExplosionAnimation()
  }

  init(speed) {
    this.x = rnd(0, window.innerWidth - ENEMY_WIDTH)
    this.y = rnd(0, window.innerHeight / 2 - this.height) 
    this.alpha = 100

    this[__.speed] = speed

    this.visible = true
  }

  drawImage(ctx, image, x , y, alpha)
	{
		// 绘制图片
		ctx.drawImage(image , x , y, this.width, this.height);
		// 获取从x、y开始，宽为image.width、高为image.height的图片数据
		// 也就是获取绘制的图片数据
    var imgData = ctx.getImageData(x , y , this.width , this.height);
    
		for (var i = 0 , len = imgData.data.length ; i < len ; i += 4 )
		{
      // 改变每个像素的透明度
      //console.log(imgData.data[i])
      imgData.data[i + 3] = imgData.data[i + 3] * (1 - alpha);
		}
		// 将获取的图片数据放回去。
		ctx.putImageData(imgData , x , y);
	}

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    const frames = []

    const EXPLO_IMG_PREFIX = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
      frames.push(`${EXPLO_IMG_PREFIX + (i + 1)}.png`)
    }

    this.initFrames(frames)
  }

  drawToCanvas(ctx) {
    if (!this.visible) return

    this.drawImage(ctx, this.img, this.x, this.y, this.alpha / 100)
    /*ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )*/
  }

  // 每一帧更新子弹位置
  update() {
    //this.y += this[__.speed]
   this.alpha -= 1
    // 对象回收
    //if (this.y > window.innerHeight + this.height) databus.removeEnemey(this)
    if (!this.alpha){
      databus.removeEnemey(this);
    }
  }
}
