import  'pixi.js/dist/pixi.js'

const wheelCenterX = 250
const wheelCenterY = 300
const stageWidth = 500
const stageHeigth = 200
const startAngle = 0
const arc = Math.PI/4
const drawWheel = () => {
  const wheel = new PIXI.Graphics()
  // set a fill and line style
  wheel.lineStyle(2, 0xffd900, 1)
  const outsideRadius =  200
  const textRadius = 160
  const insideRadius = 125

  for (let i = 0; i < 8; i++) {
   let angle = startAngle + i * arc
    console.log("position ",wheel.position)
    console.log("x,y ",wheel.x,wheel.y)
    wheel.beginFill()
    wheel.arc(wheelCenterX, wheelCenterY, outsideRadius, angle, angle + arc, true)
    wheel.arc(wheelCenterX, wheelCenterY, insideRadius, angle + arc, angle, false)
    //graphics.addHole()
    wheel.endFill()
    const basicText = new PIXI.Text('Basic text in pixi');
    basicText.x = 0;
    basicText.y = 0;
  }
  return wheel
}


const initWheel = () => {
  const app = new PIXI.Application(stageWidth, stageHeigth, { antialias: true })
  document.body.appendChild(app.view)
  const wheel = drawWheel()
  wheel.x = app.renderer.width / 2
  wheel.y = app.renderer.height / 2
  wheel.pivot.x = app.renderer.width / 2
  wheel.pivot.y = app.renderer.height / 2
  // container.addChild(graphics)
  app.stage.addChild(wheel)
  app.ticker.add(function(delta) {
    // rotate the container!
    // use delta to create frame-independent tranform
  //  wheel.rotation -= 0.01 * delta
  })
}

export {initWheel}
