import  'pixi.js/dist/pixi.js'

const initWheel = () => {
  console.log('ciro')
  console.log(PIXI)
  const app = new PIXI.Application(800, 600, { antialias: true })
  console.log(document)
  document.body.appendChild(app.view)


  const container = new PIXI.Container();

  app.stage.interactive = true
  app.stage.addChild(container)

  const graphics = new PIXI.Graphics()
  // set a fill and line style
  graphics.beginFill(0xFF3300)
  graphics.lineStyle(10, 0xffd900, 1)

  // draw a shape
  graphics.moveTo(50,50)
  graphics.lineTo(250, 50)
  graphics.lineTo(100, 100)
  graphics.lineTo(250, 220)
  graphics.lineTo(50, 220)
  graphics.lineTo(50, 50)
  graphics.endFill()
  container.x = app.renderer.width / 2;
  container.y = app.renderer.height / 2;
  container.pivot.x = container.width / 2;
  container.pivot.y = container.height / 2;
  //container.rotation = 1
  container.addChild(graphics)
  app.ticker.add(function(delta) {
    // rotate the container!
    // use delta to create frame-independent tranform
    container.rotation -= 0.01 * delta
  });
}

export {initWheel}
