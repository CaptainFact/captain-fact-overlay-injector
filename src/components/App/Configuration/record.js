import { Record } from 'immutable'


const Configuration = new Record({
  // ---- Required methods ----

  /**
   * Function that selects all the nodes containing your videos. If `factsInjector` is not defined, facts will
   * be added inside returned nodes.
   */
  videosSelectorFunc: null,

  /**
   * Function that resolves url for a given video
   * @param {object} video - The video tag as returned by videosSelectorFunc
   */
  urlExtractor: null,

  /**
   * Function that resolves an url for a given video
   * @param {object} video - The video tag as returned by videosSelectorFunc
   * @param {object} adapters - adapters list for different types of players. Only `html5` is supported at the moment
   * You can also implement your own, check `src/lib/video_adapters/html5.js` if you need an example.
   * Injector support a null return value, which can be used if you just want to display facts without player binding.
   */
  getPlayer: null,

  // ---- Optional ----

  /**
   * Css class selector specifying where CaptainFact activation toggle buttons should be mounted
   */
  activateToggleBtnClass: null,

  /**
   * Display type
   * overlay (default) - a right sidebar appearing above video, with a button to show / hide it
   * block - a solid block to inject facts somewhere else. **You MUST specify factsInjector if using this mode**
   */
  display: 'overlay',

  /**
   * By default, facts are added in a new div added to video children. You can change this behaviour
   * by setting a custom function here. Mounting `visibilityToggle` is optional
   * @param mountFunc {function} - mount components (ex: mountFunc(myDiv, facts))
   * @param video - the video, as returned by videosSelectorFunc
   * @param facts - the facts component generator to pass to `mountFunc`
   * @param visibilityToggle - the visibilityToggle component generator to pass to `mountFunc`
   *                           (only for "overlay" display mode)
   */
  factsInjector: null,

  // ---- Miscellaneous -----
  overlayNodeClass: "captainfact-overlay",
  statementFocusTime: 30,
})

export default Configuration