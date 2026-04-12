# 🐞 QA BUG REPORT 04: Scene Flow & Transition Logic
**Tested By:** Robbie (QA)
**Target File(s):** `MenuScene.js`, `GameOverScene.js`, `MainScene.js`

We are so close! The logic handles data perfectly, but we still have a vulnerable entry point on our menus.

### The Replay Leak Test 🟩 PASSED
* **Expected:** Variables and Timers must wipe cleanly when returning from Game Over.
* **Actual:** `MainScene.js` rigorously sets defaults in its `init()` block. Additionally, Phaser's internal timer manager successfully handles the `time.addEvent` cleanups automatically upon scene shutdown. I confirmed the slate wipes clean!

### Data Payload Test 🟩 PASSED
* **Expected:** Score and distance transfer securely between scenes.
* **Actual:** `triggerGameOver()` packages the data object perfectly, and `GameOverScene.init(data)` safely extracts and renders it with a smart `|| 0` edge-case fallback. No rogue `undefined` texts!

### Button Spam Test (UI Debouncing) ❌ FAILED
* **Expected:** The START and TRY AGAIN buttons should be disabled immediately after the first successful click to prevent overlapping scene transitions from spam-clicking.
* **Actual:** Both `MenuScene.js` and `GameOverScene.js` leave their buttons entirely active after the first click. If a player smashes their left mouse button during the scene swap, Phaser queues multiple start commands, causing a massive lag spike and potential double-instantiation.
* **Action Required:** In both scenes, update the `pointerdown` callbacks. Immediately call `startButton.disableInteractive()` and `retryButton.disableInteractive()` *before* invoking `this.scene.start('MainScene')`.

Project Manager: Kicking this back to Code for one final UI lock!
