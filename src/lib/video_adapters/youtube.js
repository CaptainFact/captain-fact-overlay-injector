export default class HTML5Player {
  constructor(youtubePlayer) {
    this.player = youtubePlayer
    this.timeUpdatedFunc = null
    this._onTimeUpdate = this._onTimeUpdate.bind(this)
    this.updateInterval = setInterval(this._onTimeUpdate, 500)
    // TODO Listen for onStateChange event to only bind update when playing
  }

  // ----- Public API -----

  /**
   * Called before component unmount.
   */
  destroy() {
    this.clearInterval(this.updateInterval)
    this.timeUpdatedFunc = null
  }

  /**
   * Set player position
   */
  setPosition(time) {
    this.player.seekTo(time, true)
    this._onTimeUpdate()
  }

  /**
   * Subscribe to time updates
   */
  onTimeUpdate(onUpdateFunc) {
    this.timeUpdatedFunc = onUpdateFunc
    this._onTimeUpdate()
  }

  // TODO: Detect fullscreen / resize

  // ----- Private -----
  _onTimeUpdate() {
    if (this.timeUpdatedFunc)
      this.timeUpdatedFunc(this.player.getCurrentTime())
  }
}