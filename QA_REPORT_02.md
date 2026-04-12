# 🐞 QA BUG REPORT 02: Phase 2 Hazards & Spawner
**Tested By:** Robbie (QA)
**Target File:** `src/scenes/MainScene.js`

I have run the test suite against the new `MouseSpawner` logic. While the arc velocity and spawn timers feel fair (great job on adding the RNG variance!), there are two critical failures regarding Hitboxes and Memory Leaks.

### Projectile Speed and Arcs 🟩 PASSED
* **Arc Trajectory:** The spread (`dx * 0.4` + RNG variance) is fair and prevents an aimbot situation.
* **Spawn Rate:** 1500ms provides a decent gap for dodging without creating a wall of death.

### Clean Hitboxes ❌ FAILED
* **Expected:** Spinning objects shouldn't cause phantom hits. If a plate/spoon spins, the hitbox must either be circular or small enough to fit inside the spinning shape at all times.
* **Actual:** Code is spawning `rectangle` graphics and applying `setAngularVelocity` to them. Arcade Physics hitboxes **do not rotate**. When a square graphic spins 45 degrees, its visible painted corners poke *outside* the immobile square AABB, and the AABB's actual corners are covering "empty space" where the sprite isn't.
* **Action Required:** When creating the projectile, Code must configure the physics body to be a circle. Add `projectile.body.setCircle(size / 2)` so the hitbox is perfectly round and immune to rotation issues.

### Memory Leaks & Garbage Collection ❌ FAILED
* **Expected:** If a projectile misses the floor and falls into the abyss (out of bounds), it must be destroyed to prevent RAM from filling up.
* **Actual:** While Code successfully destroys the hazard when hitting the `platforms`, the projectiles are NOT destroyed if they fly out of the left/right bounds of the world (e.g., past x=0 or x=1600). Since they don't have `collideWorldBounds` enabled, they will fall infinitely and leak memory.
* **Action Required:** Code must continually clean up orphaned projectiles. Either add logic in the `update()` loop to destroy hazards that fall out of bounds (`y > 600` or `x < 0`), or see if Phaser's `outOfBoundsKill` properties can be applied.

Project Manager: Back to Code for a quick hotfix!
