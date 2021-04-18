import Sprite from '../../base/sprite'

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/swing/turtle.png'
const PLAYER_WIDTH = 40
const PLAYER_HEIGHT = 60

const GRAVITY = - 0.75
const DT = 2
const screenWidth = window.innerWidth

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    this.PLAYER_WIDTH = PLAYER_WIDTH
    this.PLAYER_HEIGHT = PLAYER_HEIGHT
  }

  findClosestSwing(){
    let swingDistances = [0, 0, 0, 0]
    for(let i = 0; i < 4; i++){
      swingDistances[i] = Math.sqrt(Math.pow((this.swings[i] - this.pos_x), 2) + Math.pow((0 - this.pos_y), 2));
    }
    let min = 0;
    for(let i = 0; i < 4; i++){
      if(swingDistances[i] < swingDistances[min]){
        min = i;
      }
    }
    return min;
  }

  touchStart(e){
    e.preventDefault()
    this.swinging = true
    this.currentSwing = findClosestSwing()
    this.angle = Math.atan((this.swings[this.currentSwing] - this.pos_x) / (0 - this.pos_y))
    this.len = Math.sqrt(Math.pow((this.swings.get(this.currentSwing).x - this.pos_x), 2) + Math.pow((0 - this.pos_y), 2))
  }

  touchEnd(e){
    e.preventDefault()
    this.swinging = false
  }

  init(aX, aY){
    this.x = aX
    this.y = aY
    this.pos_x = 0
    this.pos_y = 256
    this.velocity = [0, - GRAVITY]
    this.swings = [0, 150, 300]
    this.swinging = false
    this.angle = 0
    this.len = 150
    this.angleVelocity = 0
  }

  thetaPositionCalc(){
    const angleAccel = (GRAVITY / l) * Math.sin(this.angle)
    this.angleVelocity += angleAccel * DT
    this.angle += angleVelocity * dt;
  }

  update(){
    if (!this.swinging){
      this.velocity = [0, - GRAVITY]
    }else{
      this.thetaPositionCalc()
      let x = this.swings[this.currentSwing] - this.pos_x;
      let y = 0 - this.pos_y + 20;
      let xChange = -1 * (Math.cos(this.angle) * this.angleVelocity) * this.len * DT;
      //change in y from x-velocity
      this.velocity[1] = 0.5 * Math.pow(Math.pow(this.len, 2) - Math.pow(x, 2), -0.5) * (0 - (2 * x * (xChange))) - 1;
      
    }
    return 2
  }
}