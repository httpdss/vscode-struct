# Contributing to VS Code Struct Extension

Thank you for your interest in contributing to the VS Code Struct Extension!

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/httpdss/vscode-struct.git
   cd vscode-struct
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Compile the extension**
   ```bash
   npm run compile
   ```

4. **Test the extension**
   ```bash
   npm run compile
   npx vsce package
   code --install-extension vscode-struct-*.vsix
   ```

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Edit the source code in `src/`
   - Test your changes locally
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run compile
   npx vsce package --out test.vsix
   code --install-extension test.vsix
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Use descriptive PR titles
   - Add appropriate labels (feature, bugfix, documentation, etc.)
   - The labels will be used for automatic version bumping

## Version Management

This project uses **Release Drafter** for automated version management:

### Automatic Versioning

When you create PRs, use these labels to control version bumping:

- **Major** (`major`, `breaking`): Breaking changes (1.0.0 → 2.0.0)
- **Minor** (`minor`, `feature`, `enhancement`): New features (1.0.0 → 1.1.0)  
- **Patch** (`patch`, `fix`, `bugfix`, `bug`, `chore`, `dependencies`, `documentation`, `docs`): Bug fixes and maintenance (1.0.0 → 1.0.1)

### Release Process

1. **Merge PRs** into main branch
2. **Release Drafter** automatically creates/updates a draft release with:
   - Auto-generated changelog
   - Proper version bump based on PR labels
   - Categorized changes

3. **Publish Release**:
   - Go to GitHub Releases
   - Review the draft release
   - Click "Publish release"
   
4. **Automatic Build**:
   - GitHub Actions will automatically:
   - Update `package.json` with the release version
   - Build and package the extension
   - Upload the `.vsix` file to the release

### Manual Version Update (if needed)

If you need to manually update the version:

```bash
./scripts/update-version.sh 1.2.3
```

## Code Style

- Use TypeScript for all source code
- Follow existing code formatting
- Add comments for complex logic
- Update README.md for new features

## Testing

- Test your changes with real `.struct.yaml` files
- Verify schema validation works correctly
- Test both with and without the struct command installed
- Check that settings work properly

## Pull Request Guidelines

### PR Title Format
Use conventional commits format:
- `feat: add new feature`
- `fix: resolve bug in schema validation`
- `docs: update README`
- `chore: update dependencies`

### PR Labels
Add appropriate labels for automatic versioning:
- `feature` / `enhancement` - Minor version bump
- `fix` / `bugfix` / `bug` - Patch version bump  
- `breaking` / `major` - Major version bump
- `documentation` / `chore` - Patch version bump

### PR Description
- Describe what changes you made
- Explain why the changes were necessary
- Include screenshots for UI changes
- List any breaking changes

## Release Notes

Release notes are automatically generated from PR titles and descriptions. Make sure your PR titles are clear and descriptive.

## Questions?

If you have questions about contributing, feel free to:
- Open an issue for discussion
- Ask in your PR comments
- Check existing issues and PRs for similar topics

Thank you for contributing! 🎉
