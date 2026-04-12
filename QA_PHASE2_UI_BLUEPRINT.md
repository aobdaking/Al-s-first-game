# 🧪 QA UI & BONUSES BLUEPRINT
**Owner:** Robbie (QA)

As Code integrates the new Electric Cyan UI, the Starlight Gold bonus items, and the Win State, the complexity of our state machine in `MainScene.js` has significantly increased. Here is the blueprint to ensure these systems don't break each other. 

## 🏁 1. The End-of-Level Edge Case (Frame-Perfect Collisions)
*   [ ] **The "Simultaneous Death-Win" Test:** What happens if the Cat's hitbox triggers the "Level Complete" boundary (`triggerWin()`) on the *exact same frame* that a Hot Tangerine projectile strikes the Cat? 
  *   **Testing Method:** We must verify that `triggerWin()` enforces a strict conditional hierarchy. The moment the player hits the finish line, `player.isInvulnerable` should immediately be forced to `true`. All Hazard collisions must instantly be disregarded. The Game Over state CANNOT trigger if the Level Complete state has fired.

## 🦅 2. Physics Collision Matrix (Bonus vs Hazard)
*   [ ] **The "Dangerous Bird" Test:** Can a Starlight Gold Bonus Bird accidentally trigger the Hazard damage logic? 
  *   **Testing Method:** Arcade Physics groups will overlap indiscriminately if the collider/overlap logic is sloppy. We must verify that `this.physics.add.overlap(player, BonusGroup)` ONLY triggers the score/point function. The `BonusGroup` MUST NOT be mixed into the `HazardGroup` collision callbacks.
*   [ ] **Cross-Group Projectile Bounce:** Do thrown Plates hit the Bonus Birds? 
  *   **Testing Method:** `BonusGroup` and `HazardGroup` should not interact physically. If they possess a shared collider, plates might bounce off birds and ricochet unfairly into the player. Ensure there is NO collider defined between these two groups.

## 📊 3. UI Scaling & Overflow
*   [ ] **The "101% UI Overflow" Test:** The Progress Bar maps to `distanceTraveled / maxLevelDistance`. If the player holds right and dashes slightly past the exact finish line pixel before physics pause, what happens to the Electric Cyan fill?
  *   **Testing Method:** The UI render width calculation MUST be clamped. It should use `Math.min(distanceTraveled, maxLevelDistance)` or its equivalent. If it is not clamped, the UI's width will exceed the container box, literally stretching off the screen and looking incredibly broken.

---
*Ready for testing! Let me know when Code says the UI and bonus mechanics are finalized!*
