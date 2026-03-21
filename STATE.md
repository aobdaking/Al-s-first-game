# 🎯 PROJECT STATE & TRACKER

**Current Project Phase:** Phase 1 - Project Setup & Foundation
**Game Genre:** 2D Platformer (Phaser.js)

---

## 🟢 ACTIVE TASKS (Who is doing what right now?)
*   [ ] **Project Manager (Human):** Define the first creative concept/theme for the platformer.
*   [x] **Devon (DevOps):** Initialize `package.json`, Vite configuration, and `.gitlab-ci.yml`. *(Completed: Scaffolded all required files, outlined the folder structure, and defined strict pipeline rules.)*
*   [ ] **Code (Dev):** Scaffold the `main.js` Phaser instance and empty main scene with Arcade Physics enabled. *(Waiting for kick-off)*
*   [ ] **Art (Design):** Establish the color palette and dimensions for the main character sprite. *(Waiting for kick-off)*
*   [ ] **Robbie (QA):** Draft the initial testing blueprint for platformer movement. *(Waiting for kick-off)*

---

## 📝 BACKLOG (Upcoming Features)
*   [ ] Implement Player Movement (Run & Jump)
*   [ ] Design First Level Tileset (Ground & Platforms)
*   [ ] Implement Collision Detection between Player and Level
*   [ ] Create basic Main Menu UI

---

## ✅ COMPLETED
*   [x] Define development tech stack (Phaser.js + Vite)
*   [x] Establish AI Agent Team (Code, Art, Robbie, Devon)
*   [x] Create AGENT_RULEBOOK.md

---

## 🛑 BLOCKERS / NOTES
*   **None currently.** Ready for the first creative concept!

---

## 🚀 Pipeline Rules
1. **Merge to `main`:** All merges to `main` are automatically picked up by the GitLab CI runner and deployed to GitLab Pages if all prior stages pass.
2. **Testing Gates (Robbie):** Robbie's `run_tests` job serves as a hard gate. If any unit or E2E tests fail, the deployment is aborted to protect production.
3. **Build Artifacts:** We use Vite (`vite build`) to compile the game assets. The pipeline takes the `dist/` output, caches it securely, and pushes it as the `public/` artifact folder so GitLab Pages can serve it.
4. **Dependency Approval:** "Code" must not introduce massive npm modules without DevOps approval to ensure pipeline execution times remain lightning fast.
