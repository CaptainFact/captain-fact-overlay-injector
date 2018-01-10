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
  * Function that select a list of video nodes on which we'll be injecting
  * @param {object} document - The document containing page nodes
  */
  videosSelectorFunc: document => [],
  
  /**
  * Function that resolves url for a given video tag
  * @param {object} videoTag - The video tag as returned by videosSelectorFunc
  */
  urlExtractor: videoTag => "https://www.youtube.com/watch?v=xxxxxxxx",
  
  // ---- Optional ----
  
  /**
  * Css class selector specifying where CaptainFact activation toggle button should be mounted
  */
  activateToggleBtnClass: null
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