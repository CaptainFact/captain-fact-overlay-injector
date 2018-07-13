<p align="center"><img src="src/assets/icon.png" height="100"/></p>
<h1 align="center"><a href="https://captainfact.io">CaptainFact.io</a></h1>

<table>
  <thead>
    <tr>
      <th>Community</th>
      <th>Master</th>
      <th>Staging</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="https://discord.gg/2Qd7hMz" title="Discord"><img src="https://discordapp.com/api/guilds/416782744748687361/widget.png" alt="Discord"></a>
        <a href="https://twitter.com/CaptainFact_io" title="Twitter"><img src="https://img.shields.io/twitter/follow/CaptainFact_io.svg?style=social&label=Follow"></a>
        <a href="./LICENSE"><img src="https://img.shields.io/github/license/CaptainFact/captain-fact-overlay-injector.svg" alt="AGPL3"></a>
      </td>
      <td>
        <a href="https://travis-ci.org/CaptainFact/captain-fact-overlay-injector"><img src="https://travis-ci.org/CaptainFact/captain-fact-overlay-injector.svg?branch=master" alt="Build Status"/></a>
        <a href='https://coveralls.io/github/CaptainFact/captain-fact-overlay-injector?branch=master'><img src='https://coveralls.io/repos/github/CaptainFact/captain-fact-overlay-injector/badge.svg?branch=master' alt='Coverage Status' /></a>
      </td>
      <td>
        <a href="https://travis-ci.org/CaptainFact/captain-fact-overlay-injector"><img src="https://travis-ci.org/CaptainFact/captain-fact-overlay-injector.svg?branch=staging" alt="Build Status"/></a>
        <a href='https://coveralls.io/github/CaptainFact/captain-fact-overlay-injector?branch=staging'><img src='https://coveralls.io/repos/github/CaptainFact/captain-fact-overlay-injector/badge.svg?branch=staging' alt='Coverage Status' /></a>
      </td>
    </tr>
  </tbody>
</table>

<hr/>

<p align="center">
<a href="https://opencollective.com/webpack/donate" target="_blank">
  <img src="https://opencollective.com/webpack/donate/button@2x.png?color=blue" width=300 />
</a>
</p>

<hr/>

This repo holds the overlay injector script, that basically add facts over videos.
It is used by [the browser extension](https://github.com/CaptainFact/captain-fact-extension)
and can be integrated on any website freely. 

You can check the [live demo](https://embed.captainfact.io) with various integrations or the production version
used by the French channel Thinkerview on [thinkerview.com](https://thinkerview.com)

# TODO

- [x] Basic injection
- [x] Dynamic configuration
- [x] Autosize
- [ ] Multiple videos on a single page

# Usage

## Declarative approach

Just specify a config object in `window.CaptainFactOverlayConfig` global key and import script. This is the way
you usually want to go as it is simple and allows you to load the script asynchronously without worrying about
waiting for it to be ready.

```html
<!-- Overlay configuration, see details below -->
<script type="javascript">
  window.CaptainFactOverlayConfig = { /* Config here */ }
</script>

<!-- Import CaptainFact main script -->
<script src="https://embed.captainfact.io/captain-fact-overlay-injector.min.js" async/>
```

## Imperative approach

You can also import the library and instantiate it yourself:

```html
<script src="https://embed.captainfact.io/captain-fact-overlay-injector.min.js"/>
```

Then:

```javascript
let injector = new window.CaptainFactOverlayInjector({ /* Config here */ })
```

# Configuration

(!) For now the overlay can only be injected to one video per page. It's not a small change to make, but
we haven't done it yet.

```javascript
window.CaptainFactOverlayConfig = {
  injector: {
    // Required

    /**
     * Function that selects all the nodes containing your video containers.
     * If `factsInjector` is not defined, facts will be added inside returned nodes.
     */
    videosSelector: undefined,

    /**
     * Function that resolves url for a given video
     * 
     * @param {object} video - The video tag as returned by videosSelector
     */
    urlExtractor: undefined,

    /**
     * Function that resolves an url for a given video
     *
     * @param {object} video - The video tag as returned by videosSelector
     * @param {object} adapters - adapters list for different types of players.
     * Only `html5` is supported at the moment
     *
     * You can also implement your own, check `src/lib/video_adapters/html5.js`
     * if you need an example.
     *
     * Injector support a null return value, which can be used if you just
     * want to display facts without player binding.
     */
    getPlayer: undefined,

    // Optional

    /**
     * By default, facts are added in a new div added to video children.
     * You can change this behaviour by setting a custom function here.
     * Mounting `visibilityToggle` is optional
     *
     * @param mountFunc {function} - mount components (ex: mountFunc(myDiv, facts))
     * @param video - the video, as returned by videosSelector
     * @param facts - the facts component generator to pass to `mountFunc`
     * @param visibilityToggle - the visibilityToggle component generator to pass to `mountFunc`
     *                           (only for "overlay" display mode)
     */
    factsInjector: undefined,
    
    /**
     * Function that return a list of HTML node where
     * CaptainFact ON / OFF toggle should be injected
     */
    onOffToggleSelector: undefined,
  },
  
  app: {
    /**
     * Display type
     * overlay (default) - a right sidebar appearing above video, with a button to show / hide it
     * block - a solid block to inject facts somewhere else. **You MUST specify factsInjector if using this mode**
     */
    display: 'overlay',

    /**
      * Language used by default in UI: english
      */
    language: 'en',

    /**
     * Add a slide effect on sidebar entrance / leave when using overlay display. This will add a 'overflow: hidden'
     * on your component. Disable this if animation breaks your UI.
     */
    animate: true,
  
    /**
    * Enable autosize. It looks at parent container's size and adapt `baseSize` based on it 
    */
    autoSize: true,
    
    /**
     * Minimum text size.
     */
    baseSize: '15px',
  
    /**
     * Graphics resources URL. Can be used to override default icons
     */
    graphics: {
      logo: {
        neutral: undefined,
        confirm: undefined,
        refute: undefined,
      },
      newTab: undefined,
      star: undefined,
      next: undefined,
      prev: undefined,
      close: undefined
    }
  }
}
```

# API methods

Injector has following methods :

```javascript
  /**
   * (static) Return the current lib version
   * @returns {string}
   */
  getVersion()

  /**
   * Enable the fact injector
   * @returns {boolean} - returns false if already enabled or mounted
   */
  enable()

  /**
   * Disable fact injector and unmount all mounted facts
   */
  disable()

  /**
   * Unmount existing overlay and reload everything (except configuration)
   */
  reload()
  
  /**
   * @returns {boolean} true if enabled, false otherwise
   */
  isEnabled()
  
  /**
   * Autosize only triggers on window size change or fullscreen toggle.
   * If your application has special needs or resize events, you can use
   * this method to force autosize refresh
   */
  forceResize()
```

# Developing

* Install (if you don't have them):
  * [Docker](https://docs.docker.com/install/) (to start the API easily)
  * [Node.js](http://nodejs.org)
  * App dependencies: `npm install`
  
* Run:
  * `./dev/start_graphql_api.sh` - Start the GraphQL API. You can access GraphiQL at http://localhost:4002/graphiql
  * `npm start` - Start the overlay injector test pages on http://localhost:3342
  * `npm run test` - run all unit tests
