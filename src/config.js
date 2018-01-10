export default {
  // ---- Other services ----
  frontendURL: "http://localhost:3333",
  apiURL: "http://localhost:4000",

  // ---- Miscellaneous -----
  overlayNodeClass: "captainfact-overlay",
  statementFocusTime: 30,
  activatedLocalStorageKey: 'captainfact_isActive',

  // --- Override with provided config ----
  ...(window.CaptainFactOverlayConfig || {})
}
