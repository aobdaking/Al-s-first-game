# 🧪 PHASE 3: SCENE FLOW & UI BLUEPRINT
**Owner:** Robbie (QA)

As Code connects the Menu, Main Game, and Game Over scenes, the global physics and data tracking systems become highly vulnerable to "zombie states." This blueprint outlines the crucial edge-cases we must test before we call the Scene Flow reliable.

## 🔄 1. The Replay Leak Test (Zombie States)
*   [ ] **The "Second Run" Glitch:** In Phaser, restarting a scene by calling `this.scene.start('MainScene')` does not automatically erase variables attached to the class instance if the developer didn't properly re-initialize them in `init()` or `create()`. We must test what happens when moving from `GameOverScene` back to `MainScene`:
  *   **Expected Check 1:** Does the `distanceTraveled` reset perfectly to 0, or does the Cat instantly warp to the finish line upon touching the ground?
  *   **Expected Check 2:** Does the Score reset to 0, or do you keep your points from the previous life?
  *   **Expected Check 3:** Are the `mouseSpawnerTimer` and `bonusTimer` accurately shut down during scene transitions, or will we have 2x the normal amount of projectiles spawning because of overlapping orphaned loops?

## 📬 2. Data Payload Test (Cross-Scene State)
*   [ ] **The "Lost points" Evaluation:** In order for the `GameOverScene` to proudly display the final score, that data must be securely passed from `MainScene`.
  *   **Testing Method:** Achieve a highly specific score (e.g., `500` via one bonus bird). Intentionally collide with hazards until 3 strikes triggers the Game Over push: `this.scene.start('GameOverScene', { score: this.score })`. Does the actual printed text on the Game Over screen correctly read `500`, or does it read `undefined`?

## 🖱️ 3. Button Spam Test (UI Debouncing)
*   [ ] **The "Over-Eager Gamer" Test:** What happens if a player rapidly clicks the "START" or "REPLAY" buttons 50 times in the span of 2 seconds while the scene fade/transition is already running?
  *   **Testing Method:** Often in Phaser, a button's `pointerdown` event stays active during scene transitions. If a player clicks "Start" 50 times, it may queue up 50 scene restart commands. The Start button MUST be disabled immediately (e.g. `button.disableInteractive()`) upon its first successful click. 

---
*Blueprint written! I'm ready to review the scene flow when Code pushes the changes.*
