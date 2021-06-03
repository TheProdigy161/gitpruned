import { Utilities } from './utilities';
import { BranchesProvider } from './branchesProvider';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { exec, execSync } from 'child_process';
import { commands, ExtensionContext, window, workspace } from 'vscode';
import { Branch } from './branch';

let currentDirectory: string = Utilities.getCurrentDirectory();

// This method is called when the extension is activated.
export function activate(context: ExtensionContext) {
	Utilities.showOutputChannel();
	Utilities.log('Congratulations, your extension "gitpruned" is now active!');
	
	setupTreeView();

	setupRefreshButton();
	setupDeleteBranchButton();
}

// This method is called when the extension is deactivated.
export function deactivate() {}

function setupTreeView(): void {
	window.createTreeView("gitPrunedBranches", {
		treeDataProvider: new BranchesProvider("")
	});
}

function setupRefreshButton(): void {
	const branchesProvider: BranchesProvider = new BranchesProvider("");
	commands.registerCommand("gitpruned.refreshBranches", () => {
		branchesProvider.refresh();
	});
}

function setupDeleteBranchButton(): void {
	const branchesProvider: BranchesProvider = new BranchesProvider("");
	commands.registerCommand("gitpruned.deleteBranch", (branch: Branch) => {
		branchesProvider.delete(branch);
	});
}