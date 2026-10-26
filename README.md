# Git Prun'd

[![VS Marketplace](https://img.shields.io/visual-studio-marketplace/v/theprodigy161.gitpruned?label=VS%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=theprodigy161.gitpruned)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/theprodigy161.gitpruned)](https://marketplace.visualstudio.com/items?itemName=theprodigy161.gitpruned)

A VS Code extension for cleaning up local Git branches: select several branches and delete them in one go, instead of running `git branch -d` for each one.

## Features

- **Branches view:** lists every local branch in the current workspace in its own activity-bar panel
- **Multi-select delete:** select several branches and delete them together
- **Single delete:** a delete button on each branch
- **Refresh:** reload the branch list after changes made outside VS Code
- Works in WSL workspaces

## Installation

Install **Git Prun'd** from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=theprodigy161.gitpruned), or run:

```bash
code --install-extension theprodigy161.gitpruned
```

Requires VS Code 1.56 or later and Git on your `PATH`.

## Usage

1. Open a folder that is a Git repository.
2. Open the **Git Prun'd Explorer** view in the activity bar.
3. Select one or more branches and click **Delete**.

Branches are deleted with `git branch --delete`, so Git refuses to delete a branch that hasn't been merged and you don't lose work.

## Development

```bash
npm install
npm run compile
```

Press `F5` in VS Code to launch an Extension Development Host with the extension loaded.

## Release Notes

See [CHANGELOG.md](CHANGELOG.md).

### 1.0.5
- Fixed deleting branches.

### 1.0.3
- Fixed workspace directory access in WSL (follow-up to 1.0.2).

### 1.0.2
- Fixed project directory access when running under WSL.

### 1.0.0
- Initial release: branch list, refresh, per-branch delete, multi-select delete and icons.

## License

[MIT](LICENSE.md)
