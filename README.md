<p align="center"><img src="app/assets/assets/img/logo.png" height="100"/></p>
<h1 align="center"><a href="https://captainfact.io">CaptainFact.io</a></h1>
<p align="center"><a href="https://gitter.im/CaptainFact"><img src="https://badges.gitter.im/Join%20Chat.svg" alt="Join the chat at https://gitter.im/CaptainFact"/></a></p>
<hr/>
<br/>

This repo holds the overlay injector script, that basically add facts over videos.
It is used by [the browser extension](https://github.com/CaptainFact/captain-fact-extension)
and can be integrated on any website freely. 

# Usage

```html
<!-- Overlay configuration -->
<script type="javascript">
  window.CaptainFactOverlayConfig = {
    /**
    * Function that select a list of video nodes on which we'll be injecting
    * @param {object} document - The document containing page nodes
    */
    videosSelectorFunc: document => [],
    
    /**
    * Function that resolves url for a given video tag
    * @param {object} videoTag - The video tag as returned by videosSelectorFunc
    */
    resolverFunc: videoTag => "https://www.youtube.com/watch?v=xxxxxxxx",
    
    /**
    * Injected node class 
    */
    nodeClass: "captainfact-overlay"
  }
</script>

<!-- Import CaptainFact main script -->
<script src="[TODO]/embed.js" async/>
```

You can also include the following div to provide a toggle button to enable / disable overlay.
Button's state is stored in browser local storage

```html
<!-- You can set the size by adding one of the following classes: cf-small, cf-large -->
<div class="cf-toggle-btn"/>
```

# Developing