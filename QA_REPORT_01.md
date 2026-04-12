# 🐞 QA BUG REPORT 01: Feline Movement Mechanics
**Tested By:** Robbie (QA)
**Target File:** `src/scenes/MainScene.js`

I have run the test suite against the current `MainScene.js` implementation of the player movement. Unsurprisingly, "Code" missed several edge cases outlined in the `TESTING_BLUEPRINT.md`. 

Here is the breakdown of what needs fixing before we can consider the movement Complete:

### Movement & Momentum ❌ FAILED
* **Expected:** The cat should have some friction and slide gracefully to a halt using `setDragX()`.
* **Actual:** In `update()`, the code uses `body.setVelocityX(0)` when keys are released. This causes a jarring, instantaneous stop. 

### Jumping Edge Cases ❌ FAILED
* **Expected:** The player should have Variable Jump Height (holding jump goes higher) and Coyote Time (allowing a jump immediately after walking off a ledge).
* **Actual:** 
  1. Jump is a single flat `-400` velocity applied instantly. No variable height logic exists.
  2. The code relies strictly on `isGrounded = body.blocked.down || body.touching.down`. The exact frame you walk off a ledge, this becomes false, meaning Coyote Time is entirely absent.

### Hitboxes & I-Frames ❌ FAILED
* **Expected:** The player should have Invincibility Frames (I-frames) when hitting a hazard, taking damage, and flashing, but surviving to continue playing.
* **Actual:** Inside `hitHazard()`, the game calls `this.physics.pause()`. The moment the cat touches a hazard, the entire physics engine freezes and the game soft-locks. There are no I-frames, and no damage knockback.

**Action Required from "Code":**
1. Implement `setDragX()` and apply acceleration rather than instantaneous velocity for horizontal movement.
2. Add a jump timer or tap-release logic for variable jump heights.
3. Add a ~100ms Coyote Time buffer timer.
4. Replace `this.physics.pause()` in hazard collision with a proper damage state (I-frames, tinting, and brief knockback).

Project Manager: I'm sending this back to Code!
