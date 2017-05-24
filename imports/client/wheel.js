import  'pixi.js/dist/pixi.js'

const wheelCenterX = 250
const wheelCenterY = 250
const stageWidth = 500
const stageHeigth = 500
const startAngle = 0
const arc = Math.PI/4

const drawText = () => {
  const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fill: 'white',
    strokeThickness: 0,
    //dropShadow: true,
    //dropShadowColor: '#000000',
    //dropShadowBlur: 4,
    //dropShadowAngle: Math.PI / 6,
    //dropShadowDistance: 6,
  });

  const textContainer = new PIXI.Container()
  const outsideRadius =  200
  const insideRadius = 125
  const textRadius = (outsideRadius + insideRadius) /2

  for (let i = 0; i < 8; i++) {
    let angle = startAngle + i * arc
    const basicText = new PIXI.Text('Basic text in pixi',style)
    //basicText.x = (250 - basicText.width/2) + textRadius * Math.cos(angle + arc / 2)
    basicText.x = 250  + textRadius * Math.cos(angle)
    basicText.y = 250 + textRadius * Math.sin(angle)
    basicText.pivot = (250 + textRadius *  Math.cos(angle + arc / 2) ,
      250 + textRadius * Math.sin(angle + arc / 2))

    basicText.rotation =angle + arc / 2 + Math.PI/1.9
    textContainer.addChild(basicText)
  }
  return textContainer

}

const drawWheel = () => {
  const wheel = new PIXI.Graphics()
  // set a fill and line style
  wheel.lineStyle(2, 0xffd900, 1)
  const outsideRadius =  200
  const textRadius = 160
  const insideRadius = 125

  wheel.beginFill()
  for (let i = 0; i < 8; i++) {
    let angle = startAngle + i * arc
    console.log(angle)
    console.log(arc)
    console.log("position ",wheel.position)
    console.log("x,y ",wheel.x,wheel.y)
    wheel.moveTo(250 + outsideRadius * Math.cos(angle), 250 + outsideRadius * Math.sin(angle))
    wheel.arc(wheelCenterX, wheelCenterY, outsideRadius, angle, angle + arc, false)
    //wheel.moveTo(250 + insideRadius * Math.cos(angle), 250 + insideRadius * Math.sin(angle))
    wheel.arc(wheelCenterX, wheelCenterY, insideRadius, angle + arc, angle, true)
    //wheel.arc(wheelCenterX, wheelCenterY, outsideRadius, angle, angle + arc, true)
    //graphics.addHole()
    const basicText = new PIXI.Text('Basic text in pixi');
    console.log(basicText.transform)
    basicText.x = 250 + Math.cos(angle + arc / 2) * textRadius
    basicText.y = 250 + Math.sin(angle + arc / 2) * textRadius
    console.log(basicText.transform)

  }
  wheel.endFill()
  return wheel
}


const initWheel = () => {
  const app = new PIXI.Application(stageWidth, stageHeigth, { antialias: true })
  document.body.appendChild(app.view)
  const wheel = drawWheel()
  const txt = drawText()
  wheel.x = app.renderer.width / 2
  wheel.y = app.renderer.height / 2
  wheel.pivot.x = app.renderer.width / 2
  wheel.pivot.y = app.renderer.height / 2
  // container.addChild(graphics)
  app.stage.addChild(wheel)
  app.stage.addChild(txt)
  app.ticker.add(function(delta) {
    // rotate the container!
    // use delta to create frame-independent tranform
    //  wheel.rotation -= 0.01 * delta
  })
}

export {initWheel}
