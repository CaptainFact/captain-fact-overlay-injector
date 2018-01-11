<p align="center"><img src="src/assets/icon.png" height="100"/></p>
<h1 align="center"><a href="https://captainfact.io">CaptainFact.io</a></h1>
<p align="center"><a href="https://gitter.im/CaptainFact"><img src="https://badges.gitter.im/Join%20Chat.svg" alt="Join the chat at https://gitter.im/CaptainFact"/></a></p>
<hr/>
<br/>

This repo holds the overlay injector script, that basically add facts over videos.
It is used by [the browser extension](https://github.com/CaptainFact/captain-fact-extension)
and can be integrated on any website freely. 

# Usage

## Declarative approach

Just specify a config object in `window.CaptainFactOverlayConfig` global key and import script. This is the way
you usually want to go as it is simple and allows you to load the script asynchronously without worrying about
waiting for it to be ready.

```html
<!-- Overlay configuration, see details below -->
<script type="javascript">
  window.CaptainFactOverlayConfig = {}
</script>

<!-- Import CaptainFact main script -->
<script src="[TODO]/embed.js" async/>
```

## Imperative approach

You can also import the library and instantiate it yourself:

```html
<script src="[TODO]/embed.js"/>
```

Then:

```javascript
let injector = new window.CaptainFactOverlayInjector({ /* Config here */ })
```

## Using NPM 

TODO

```javascript
import CaptainFactOverlayInjector from 'captain-fact-overlay-injector'
```

(!) For now the overlay can only be injected to one video per page. It's not a small change to make, but
we haven't done it yet.

# Configuration

```javascript
window.CaptainFactOverlayConfig = {
  // ---- Required ---- 
  
  /**
  * Function that selects all the nodes containing your videos. If `factsInjector` is not defined, facts will
  * be added inside returned nodes.
  */
  videosSelectorFunc: () => [],
  
  /**
  * Function that resolves url for a given video
  * @param {object} video - The video tag as returned by videosSelectorFunc
  */
  urlExtractor: video => "https://www.youtube.com/watch?v=xxxxxxxx",
  
  /**
  * Function that resolves an url for a given video
  * @param {object} video - The video tag as returned by videosSelectorFunc
  * @param {object} adapters - adapters list for different types of players. Only `html5` is supported at the moment
  * You can also implement your own, check `src/lib/video_adapters/html5.js` if you need an example.
  */
  getPlayer: (video, adapters) => adapters.HTML5(myDiv.querySelector('video')),
  
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
  factsInjector: (mountFunc, video, facts, visibilityToggle) => null
}
```

## ON / OFF toggle button

You can add a switch to offer your users the ability to disable CaptainFact. Button's state is
stored in browser local storage.

First add a div with a class name of your choice on your page:
```html
<div class="cf-toggle-btn"></div>
```

Then add it to your config:
```javascript
{
  // ...
  activateToggleBtnClass: "cf-toggle-btn"
}
```

You can change the size of the button by setting a different `font-size` on container.

# Developing