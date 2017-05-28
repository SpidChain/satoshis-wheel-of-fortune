import React from 'react'
import createReactClass from 'create-react-class'

import Winwheel from './Winwheel'

const colorArray = [
  '#ee1c24',
  '#3cb878',
  '#f6989d',
  '#00aef0',
  '#f26522'
]

const newWheel = (emails, onStop, initialAngle) => {
  const segments = emails.map((e, i) => ({
    fillStyle: colorArray[i % 5],
    text: e
  }))

  const wheel = new Winwheel({
    // 'outerRadius'     : 400,        // Set outer radius so wheel fits inside the background.
    innerRadius: 50,         // Make wheel hollow so segments don't go all way to center.
    textFontSize: 10,         // Set default font size for the segments.
    textOrientation: 'vertical', // Make text vertial so goes down from the outside of wheel.
    textAlignment: 'outer',    // Align text to outside of wheel.
    numSegments: emails.length,         // Specify number of segments.
    rotationAngle: initialAngle || 0,
    segments: segments,
    animation: {
      type: 'spinToStop',
      duration: 8,     // Duration in seconds.
      spins: 3,     // Default number of complete spins.
      stopAngle: 0,
      callbackFinished: onStop
    }
  })

  return wheel
}

const winnerAngle = (emails, nonce) => 360 / emails.length * (nonce % emails.length + 0.5)

export default createReactClass({
  displayName: 'WheelCanvas',

  getInitialState () {
    return {
      theWheel: null
    }
  },

  componentDidMount () {
    const {emails, nonce, onStop} = this.props

    if (Number.isInteger(nonce)) {
      this.setState({
        theWheel: newWheel(emails, onStop, -winnerAngle(emails, nonce))
      })
    } else {
      this.setState({
        theWheel: newWheel(emails, onStop)
      })
    }
  },

  componentDidUpdate () {
    const {emails, nonce, spinning} = this.props
    if (Number.isInteger(nonce) && spinning) {
      console.log('Start spinning.')
      this.state.theWheel.animation.stopAngle = winnerAngle(emails, nonce)
      this.state.theWheel.startAnimation()
    }
  },

  render () {
    return <canvas id='canvas' width='800' height='800'>
      <p>
        Sorry, your browser doesn't support canvas. Please try another.
      </p>
    </canvas>
  }
})
