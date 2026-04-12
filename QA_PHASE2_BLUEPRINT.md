# 🧪 PHASE 2 TESTING BLUEPRINT: Hazards & Projectiles
**Owner:** Robbie (QA)

This blueprint outlines the criteria for testing the new Mouse hazard and projectile mechanics. "Code" must ensure the physics logic survives these rigorous checks before Phase 2 is considered complete.

## ☄️ 1. Projectile Speed and Arcs (Difficulty Metrics)
*   [ ] **The "Unavoidable Death" Test:** Are the projectiles thrown so quickly that a player at the minimal realistic distance physically cannot react in time? We need a minimum flight time or capped downward velocity so the cat has a chance to dash out of the way.
*   [ ] **Arc Trajectory Variance:** Does the Mouse throw objects perfectly at the cat with 100% accuracy, or is there an RNG spread? A "perfect aim" bot is unfair. We must test that there is enough variance to make dodging dynamic but survivable.
*   [ ] **Terminal Velocity Cap:** Do projectiles spin out of control and clip through the floor if they fall from the top of the screen? Gravity and max velocity parameters must be enforced.

## 🎯 2. Clean Hitboxes (Circular vs. Square)
*   [ ] **The "Phantom Strike" Test:** Plates and cups are circular or irregular, but Phaser Arcade Physics uses square AABBs (Axis-Aligned Bounding Boxes) by default. The test here requires turning on `physics.world.createDebugGraphic()`. We must verify that the hitbox isn't larger than the solid part of the sprite; if it is, the player will get hit by "air."
*   [ ] **The AABB Rotation Rule:** Arcade Physics hitboxes *do not rotate* when the visual sprite rotates. For a spinning plate or spoon, the physics body (`setSize` and `setOffset`) or a `setCircle()` must be small enough to stay entirely inside the spinning sprite at all angles. Otherwise, an invisible corner of the hitbox could trigger an unfair hit against the player.

## 🗑️ 3. Memory Leaks & Object Lifecycle (Garbage Collection)
*   [ ] **The "10-Minute Idle" Test:** Leave the game running for 10 minutes without killing the Mouse. Does the frame rate drop? If the Mouse continuously spawns plates that fall out of camera bounds without being explicitly destroyed, the RAM will fill up with orphaned physics bodies.
*   [ ] **Boundary & Collision Destruction:** Do projectiles cleanly `.destroy()` themselves on impact with the player AND the floor? 
*   [ ] **The Abyss Check:** If a projectile misses the floor entirely and falls out of the world bounds, is it destroyed? We need to verify that `outOfBoundsKill` or an equivalent check is actively deleting the objects, not just making them invisible.

---
*Ready for testing when Code says Phase 2 is ready!*
