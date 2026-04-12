# 🐞 QA BUG REPORT 03: UI, Bonuses & Win State
**Tested By:** Robbie (QA)
**Target File:** `src/scenes/MainScene.js`

Code has made excellent progress on the new Phase 3 features, but I caught an edge case in the Win State execution during my rigorous blueprint run.

### Physics Collision Matrix (Bonus vs Hazard) 🟩 PASSED
* **Expected:** Birds should only give points, and Plates should only damage. They should not interact with each other.
* **Actual:** Proper isolated collision groups (`bonusGroup` vs `hazards`) were implemented. Overlaps are beautifully siloed and the logic does not leak.

### UI Scaling & Overflow 🟩 PASSED
* **Expected:** The progress bar should clamp at 100% even if the physics engine pushes the cat 10 pixels over the finish line before pausing.
* **Actual:** Code properly used `let progress = Math.min(this.distanceTraveled / this.maxLevelDistance, 1);`. The UI bounding is bulletproof and no Electric Cyan will be stretching infinitely off the screen!

### The End-of-Level Edge Case ❌ FAILED
* **Expected:** When `triggerWin()` is called, `player.isInvulnerable` must immediately switch to `true` to disregard any hazard overlaps occurring on that exact frame.
* **Actual:** `triggerWin()` correctly sets `this.gameWon = true`, pauses the physics engine, and kills the spawning timers. However, it does *not* set `player.isInvulnerable = true`. Due to how Phaser processes its update vs physics loop, if a player's hitbox overlaps a hazard AND they cross the finish line in the same tick, `hitHazard()` can still theoretically fire, turning the cat red and applying knockback logic *while* the Level Complete text shows up!
* **Action Required:** Inside `triggerWin()`, simply add `this.player.isInvulnerable = true;` to guarantee absolute safety for the cat upon winning the game.

Project Manager: Handing this back to Code for a fast hotfix!
