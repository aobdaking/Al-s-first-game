# 🧪 TESTING BLUEPRINT: Feline Platforming & Enemy Dodging
**Owner:** Robbie (QA)

This blueprint outlines the core test cases for the initial mechanics of the game. "Code" must ensure these mechanics pass these tests before we sign off on the movement logic.

## 🐾 1. Feline Platforming Mechanics

### Movement & Momentum
*   [ ] **Friction & Sliding:** When the player releases the directional keys, does the black cat stop appropriately? It might be a slick kitchen floor, so a bit of slide is okay, but it shouldn't feel uncontrollable. Check the `setDragX()` values.
*   [ ] **Wall Sticking:** If the cat jumps into a kitchen counter (wall) and the player holds the direction towards it, does the cat get stuck against the wall in mid-air? 
*   [ ] **Edge Forgiveness (Coyote Time):** If the cat walks off a ledge (like the edge of a table), is there a small 100-200ms window where the player can still press jump? This is crucial for good game feel.

### Jumping Edge Cases
*   [ ] **Jump Clearance:** Can the cat jump high enough to comfortably clear a standard enemy sprite? Check against the max heights of the first level tile setups.
*   [ ] **Variable Jump Height:** Does holding the jump button yield a higher jump than quickly tapping it?
*   [ ] **Double Jump Logic:** If a double-jump is enabled for the cat, does the second jump reset the downward velocity properly? We don't want the player launching into orbit or failing to gain height because they were falling too fast.
*   [ ] **Headbonk Recovery:** When jumping into a ceiling (e.g., underside of a cabinet), does the upward velocity instantly zero out so the cat drops cleanly?

## 🚫 2. Enemy Dodging & Hitboxes

### Collision Fairness
*   [ ] **Fair Hitboxes (Enemies):** Are enemy colliders slightly smaller than their visual sprites? The player should not take damage from an enemy that visually missed the cat.
*   [ ] **Fair Hitboxes (Player):** The cat sprite is 48x48px. Is the physics body adjusted (via `setSize` and `setOffset`) so it isn't a massive square? If the cat has a tail, the tail shouldn't usually trigger enemy damage.
*   [ ] **Pixel-Perfect Platforming:** Do the cat and enemies sit flush on the floor? Or are they floating 1 pixel above the tiles due to inaccurate origin points?

### Damage Response
*   [ ] **I-Frames (Invincibility Frames):** When the cat gets hit by an enemy, is there a brief period of invincibility? Does the sprite flash to indicate this status?
*   [ ] **Damage Knockback:** Does the cat get knocked back when taking damage? If so, does high knockback velocity tunnel the cat straight through level geometry, causing them to fall out of the map?
*   [ ] **Enemy Clipping:** Can enemies clip into each other and become an inescapable "super enemy" with stacked hitboxes?

---
*Ready for testing once "Code" pushes the first physics update!*
