import { Record } from 'immutable'


const DEFAULT_CONFIG = new Record({
  injector: new Record({
    // Required

    /**
     * Function that selects all the nodes containing your videos. If `factsInjector` is not defined, facts will
     * be added inside returned nodes.
     */
    videosSelectorFunc: undefined,

    /**
     * Function that resolves url for a given video
     * @param {object} video - The video tag as returned by videosSelectorFunc
     */
    urlExtractor: undefined,

    /**
     * Function that resolves an url for a given video
     * @param {object} video - The video tag as returned by videosSelectorFunc
     * @param {object} adapters - adapters list for different types of players. Only `html5` is supported at the moment
     * You can also implement your own, check `src/lib/video_adapters/html5.js` if you need an example.
     * Injector support a null return value, which can be used if you just want to display facts without player binding.
     */
    getPlayer: undefined,

    // Optional

    /**
     * Css class selector specifying where CaptainFact activation toggle buttons should be mounted
     */
    activateToggleBtnClass: undefined,

    /**
     * By default, facts are added in a new div added to video children. You can change this behaviour
     * by setting a custom function here. Mounting `visibilityToggle` is optional
     * @param mountFunc {function} - mount components (ex: mountFunc(myDiv, facts))
     * @param video - the video, as returned by videosSelectorFunc
     * @param facts - the facts component generator to pass to `mountFunc`
     * @param visibilityToggle - the visibilityToggle component generator to pass to `mountFunc`
     *                           (only for "overlay" display mode)
     */
    factsInjector: undefined
  })(),

  app: new Record({
    /**
     * Display type
     * overlay (default) - a right sidebar appearing above video, with a button to show / hide it
     * block - a solid block to inject facts somewhere else. **You MUST specify factsInjector if using this mode**
     */
    display: 'overlay',

    /**
     * Add a slide effect on sidebar entrance / leave when using overlay display. This will add a 'overflow: hidden'
     * on your component. Disable this if animation breaks your UI.
     */
    animate: true,

    /**
     * Graphics resources URL. Can be used to add custom icons
     */
    graphics: new Record({
      logo: new Record({
        neutral: undefined,
        confirm: undefined,
        refute: undefined,
      })(),
      newTab: undefined,
      star: undefined
    })()
  })()
})()

const loadConfig = config => {
  // TODO check config and warn user if missing required keys
  return DEFAULT_CONFIG.mergeDeep(config)
}

export default loadConfig