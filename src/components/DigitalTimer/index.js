// Write your code here

import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimeOn: false, initialMinutes: 25, initialSeconds: 0}

  decrementClicked = () => {
    const {initialMinutes} = this.state

    if (initialMinutes > 1) {
      this.setState(prevState => ({
        initialMinutes: prevState.initialMinutes - 1,
      }))
    }
  }

  incrementClicked = () => {
    this.setState(prevState => ({initialMinutes: prevState.initialMinutes + 1}))
  }

  incrementSeconds = () => {
    const {initialMinutes, initialSeconds} = this.state
    const timeCompleted = initialSeconds === initialMinutes * 60
    if (timeCompleted) {
      this.clearTimerInterval()
      this.setState({isTimeOn: false})
    } else {
      this.setState(prevState => ({
        initialSeconds: prevState.initialSeconds + 1,
      }))
    }
  }

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.IntervalId)

  startOrPauseClicked = () => {
    const {isTimeOn, initialMinutes, initialSeconds} = this.state
    const isTimeCompleted = initialSeconds === initialMinutes * 60

    if (isTimeCompleted) {
      this.setState({initialSeconds: 0})
    }
    if (isTimeOn) {
      this.clearTimerInterval()
    } else {
      this.IntervalId = setInterval(this.incrementSeconds, 1000)
    }
    this.setState(prevState => ({isTimeOn: !prevState.isTimeOn}))
  }

  restIconClicked = () => {
    this.clearTimerInterval()
    this.setState({
      isTimeOn: false,
      initialMinutes: 25,
      initialSeconds: 0,
    })
  }

  displayTimeFormat = () => {
    const {initialMinutes, initialSeconds} = this.state

    const remainingTime = initialMinutes * 60 - initialSeconds
    const minutes = Math.floor(remainingTime / 60)
    const seconds = Math.floor(remainingTime % 60)
    console.log(seconds)
    const displayMinutes = minutes > 9 ? minutes : `0${minutes}`
    const displaySeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${displayMinutes}:${displaySeconds}`
  }

  render() {
    const {isTimeOn, initialMinutes} = this.state
    const textTimer = isTimeOn ? 'Running' : 'Paused'
    const startOrResume = isTimeOn ? 'Pause' : 'Start'
    const img = isTimeOn
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const alt = isTimeOn ? 'pause icon' : 'play icon'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="clock-container">
          <div className="image">
            <div className="timer">
              <h1 className="time">{this.displayTimeFormat()}</h1>
              <p className="text">{textTimer}</p>
            </div>
          </div>
          <div className="buttons-container">
            <div className="icons-container">
              <div className="buttons">
                <button
                  type="button"
                  className="button"
                  onClick={this.startOrPauseClicked}
                >
                  <img src={img} alt={alt} className="icon" />
                  <p className="icon-text">{startOrResume}</p>
                </button>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  className="button"
                  onClick={this.restIconClicked}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icon"
                  />
                  <p className="icon-text">Reset</p>
                </button>
              </div>
            </div>
            <p className="limit">Set Timer limit</p>
            <div className="inc-dec-buttons">
              <button
                type="button"
                className="button"
                disabled={isTimeOn}
                onClick={this.decrementClicked}
              >
                -
              </button>
              <p className="limit-button">{initialMinutes}</p>
              <button
                type="button"
                className="button"
                disabled={isTimeOn}
                onClick={this.incrementClicked}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
