# 🐞 QA BUG REPORT 05: Menu Button Crash (Beta Feedback)
**Tested By:** Robbie (QA / User Research)
**Target File(s):** `src/scenes/MenuScene.js`, `src/scenes/GameOverScene.js`

CRITICAL BUG: Beta testers are reporting that the game is completely unplayable from the start screen! The "START" button does absolutely nothing when clicked. 

### What Went Wrong?
Code's previous fix to prevent button-spam was to inject `disableInteractive()` directly inside the `pointerdown` callback. 
However, in Phaser's architecture, forcibly stripping an object's interactive boundaries *while the Input Manager is actively iterating through that exact UI pointer event collection* causes an internal array mutation exception. The engine crashes silently on that line, meaning `this.scene.start('MainScene')` is never reached.

### 🛠️ Action Required (Code):
We need to handle the debouncing safely without mutating the object during the active Input loop.

1. **In `MenuScene.js`:**
   Change `startButton.on('pointerdown', () => {` to `startButton.once('pointerdown', () => {`.
   Remove the `startButton.disableInteractive();` line entirely. 
   Using `.once()` ensures the event only fires exactly one time per life, natively preventing queue spam without breaking the engine iteration.

2. **In `GameOverScene.js`:**
   Perform the exact same fix. Change `retryButton.on('pointerdown', ...)` to `retryButton.once('pointerdown', ...)`.
   Remove `retryButton.disableInteractive();`.

Project Manager: Routing this Critical Bug to Code!
