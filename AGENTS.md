# AGENTS.md

Guidance for Hermes, Codex, Claude Code, and other AI agents working in this repository.

## Repository

- GitHub repository: `httpdss/vscode-struct`
- Local path: `/home/kenny/development/github.com/httpdss/vscode-struct`
- Default branch: `main`
- Standard agent branch prefix for documentation-only changes: `docs/`

## Project Snapshot

- Node/TypeScript project using npm.
- Application source lives in `src/`.
README context to preserve:

> # Struct YAML Support for VS Code
> A VS Code extension that provides enhanced support for struct YAML configuration files with schema validation and intelligent autocomplete.
> ## Features
> - **Schema Validation**: Automatic validation of `*.struct.yaml` files using the official struct schema
> - **Custom Schema Generation**: Generate custom schemas based on your struct configurations
> - **Intelligent Autocomplete**: Get suggestions and validation while editing struct files

## Important Files and Directories

- `src/` — present; inspect before editing related functionality.
- `.github/` — present; inspect before editing related functionality.
- `scripts/` — present; inspect before editing related functionality.
- `schemas/` — present; inspect before editing related functionality.
- `README.md`
- `CONTRIBUTING.md`
- `package.json`

## GitHub Workflows

- `.github/workflows/build.yml`
- `.github/workflows/release-drafter.yml`

## Safe Agent Workflow

1. Start from a clean checkout of `main` or a fresh worktree based on `origin/main`.
2. Do not overwrite existing user changes. If the working tree is dirty, create a separate worktree for your branch instead of stashing or resetting user work.
3. Create a focused branch, for example `docs/update-agents-md` for agent-instruction changes.
4. Make the smallest targeted change that satisfies the task.
5. Run the most relevant validation command(s) listed below when the touched files affect code, configuration, CI, or generated assets.
6. Commit with a conventional commit message such as `docs: add agent instructions`.
7. Push the branch and open a pull request against `main`.

## Build, Test, and Validation Commands

- `npm run lint` — package script: `eslint src --ext ts`
- `npm run test` — package script: `node ./out/test/runTest.js`

If a command needs dependencies that are not installed, install them in a project-local virtual environment or use the repository's documented devcontainer. Do not install global packages unless the user explicitly asks.

## Editing Guidelines

- Prefer small, reviewable diffs.
- Preserve public APIs, documented command names, workflow inputs, and file paths unless the task explicitly asks to change them.
- Update README or docs when behavior, commands, or configuration changes.
- Keep formatting consistent with nearby files.
- For Markdown-only changes, verify links and headings manually.
- For CI/workflow changes, check YAML syntax and confirm referenced actions, secrets, and inputs still exist.

## Do Not Touch Without Explicit Approval

- `dist/`
- `node_modules/`
- credentials, tokens, keys, or private URLs
- generated build artifacts
- secret files such as `.env*`
- Large generated files, vendored dependencies, lockfiles, or build outputs unless the task specifically requires it.
- History-rewriting operations such as `git reset --hard`, force pushes, or deleting branches that may contain user work.

## Security Notes

- Never print, commit, or summarize secret values.
- Treat `.env`, key files, tokens, credentials, cookies, and local config as sensitive.
- If you encounter a secret in tracked files or logs, stop and report it without repeating the value.
- Use placeholders like `[REDACTED]` when discussing sensitive content.

## PR Expectations

- Explain what changed and why.
- Include validation performed, even if it is "not run; documentation-only change".
- Keep PR scope limited to the requested task.
