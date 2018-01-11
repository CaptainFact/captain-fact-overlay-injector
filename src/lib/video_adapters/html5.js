export default class HTML5Player {
  constructor(videoTag) {
    this.videoTag = videoTag
    this.timeUpdatedFunc = null
    this._onTimeUpdate = this._onTimeUpdate.bind(this)
    this.videoTag.addEventListener('timeupdate', this._onTimeUpdate)
  }

  // ----- Public API -----

  /**
   * Called before component unmount.
   */
  destroy() {
    this.videoTag.removeEventListener('timeupdate', this._onTimeUpdate)
    this.timeUpdatedFunc = null
  }

  /**
   * Set player position
   */
  setPosition(time) {
    this.videoTag.currentTime = time
    this._onTimeUpdate()
  }

  /**
   * Subscribe to time updates
   */
  onTimeUpdate(onUpdateFunc) {
    this.timeUpdatedFunc = onUpdateFunc
  }

  // TODO: Detect fullscreen / resize

  // ----- Private -----
  _onTimeUpdate() {
    if (this.timeUpdatedFunc)
      this.timeUpdatedFunc(this.videoTag.currentTime)
  }
}