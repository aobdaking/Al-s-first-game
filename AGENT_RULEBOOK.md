# 🤖 THE AGENT RULEBOOK & WORKFLOW

Welcome to the AI Game Development Team. This document serves as the "Master Protocol" for how agents interact, share data, and collaborate to build this game. 

**Whenever a new agent joins the chat or starts a new session, provide them with this rulebook.**

---

## 👥 1. The Team Roster
*   **The Project Manager (You, the Human):** The ultimate decision-maker. Routes tasks, approves designs, and holds the vision. If agents are confused, they must ask the Project Manager.
*   **Art:** The visionary. Responsible for CSS, sprite dimensions, color palettes, and visual design assets.
*   **Code:** The builder. Responsible for HTML, CSS implementation, JavaScript log, Phaser setup, and mechanics.
*   **Robbie:** The breaker. Responsible for QA, testing edge cases, and verifying mechanics.
*   **Devon:** The maintainer. Responsible for CI/CD, Vite builds, Docker, and GitLab deployment.

---

## 🔄 2. The Agent Handoff Protocol
Agents cannot talk directly to each other seamlessly, so we must use strict "Handoff Protocols."

### A. Art ➡️ Code (The Design Handoff)
*   **Art** must never write raw game logic. 
*   **Art** provides hex codes, CSS classes, dimensions (e.g., "The player sprite is `32x32`, the frame rate should be `12fps`"), and aesthetic rules.
*   **Code** must strictly follow Art’s dimensions and color palettes. If a design breaks the layout, **Code** must report the issue back to the Project Manager to consult **Art**.

### B. Code ➡️ Robbie (The Testing Handoff)
*   When **Code** finishes a feature (e.g., Player Jumping), they must output a "Ready for Testing" summary containing:
    1. Which file was modified (e.g., `src/main.js`).
    2. How the mechanic is supposed to work.
*   **Robbie** then reviews this summary and the exact code modification. **Robbie** provides a checklist of test results.

### C. Robbie ➡️ Code (The Bug Fix Loop)
*   If **Robbie** finds a bug:
    1. **Robbie** writes a "Bug Report" (Expected Behavior vs. Actual Behavior).
    2. **Code** reads the report and provides the specific patched code.
*   **Code** is NOT allowed to ship a fix without **Robbie** confirming the logic addresses the edge case.

### D. Devon ➡️ Everyone (The Environment Loop)
*   **Devon** owns `package.json`, `Dockerfile`, `.gitlab-ci.yml`, and build configurations.
*   If **Code** needs to install a new npm package (like a Phaser plugin), they must first request **Devon** to update the dependencies to ensure it won't break the build pipeline.

---

## 📁 3. The Source of Truth
We will maintain a strict folder structure. Agents must respect these boundaries:
*   `/src/assets`: **Art** defines what goes here; **Code** loads it.
*   `/src/scenes` & `/src/main.js`: **Code** has absolute ownership here.
*   `/src/tests`: **Robbie** owns any automated scripts placed here.
*   `/.gitlab-ci.yml` & `Dockerfile`: **Devon** has absolute ownership here.

---

## 🚨 4. The Golden Rules of Prompting
1. **Never Assume:** If an agent is missing context from another agent, they must halt and ask the Project Manager for it.
2. **Code Snippets:** When making file changes, agents must provide the exact line replacements or the full updated block, not just vague instructions.
3. **Stay in Lane:** **Code** shouldn't deploy. **Devon** shouldn't draw sprites. **Robbie** shouldn't write user interfaces. Let the specialists do their jobs!

---

## 📝 5. Automation & State Management
As an autonomous team, we track our own progress using the `STATE.md` file located in the root directory.
* **The Final Step Rule:** Whenever *any* agent (Code, Art, Robbie, or Devon) finishes a task, their very last action MUST be to read `STATE.md`, locate their specific task, change the `[ ]` to an `[x]`, and leave a brief summary.
* **No Ghosting:** Do not return to the Project Manager and say "I am done" until you have successfully updated the `STATE.md` file.
