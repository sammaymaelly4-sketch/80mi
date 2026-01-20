## 2024-05-21 - TypeScript Config Overwrite
**Learning:** Next.js automatically creates/updates `tsconfig.json` when it detects TypeScript, but it might not migrate custom paths from `jsconfig.json`, causing build breaks if the project mixes JS/TS.
**Action:** Always check `tsconfig.json` paths after it's generated if aliases stop working.
