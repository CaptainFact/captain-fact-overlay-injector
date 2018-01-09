export default {
  /**
   * Function that select a list of video nodes on which we'll be injecting
   * @param {object} document - The document containing page nodes
   */
  videosSelectorFunc: document => document.getElementsByClassName("video"),

  /**
   * Function that resolves url for a given video tag
   * @param {object} videoTag - The video tag as returned by videosSelectorFunc
   */
  resolverFunc: videoTag => videoTag.querySelector("iframe").getAttribute("src"),


  // ---- Other services ----
  frontendURL: "http://localhost:3333",
  apiURL: "http://localhost:4000",

  // ---- Miscellaneous -----
  overlayNodeClass: "captainfact-overlay",
  statementFocusTime: 30,

  // --- Override with provided config ----
  ...(window.CaptainFactOverlayConfig || {})
}
