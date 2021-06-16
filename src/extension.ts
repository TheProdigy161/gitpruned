import { Utilities } from './utilities';
import { BranchesProvider } from './branchesProvider';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext, TreeViewOptions, window, workspace } from 'vscode';
import { Branch } from './branch';

// This method is called when the extension is activated.
export function activate(context: ExtensionContext) {
	const branchesProvider: BranchesProvider = new BranchesProvider();
	let treeViewOptions: TreeViewOptions<Branch> = {
		treeDataProvider: branchesProvider,
		canSelectMany: true
	};
	
	// Utilities.showOutputChannel();
	Utilities.log('Congratulations, your extension "gitpruned" is now active!');
	
	window.createTreeView('gitPrunedBranches', treeViewOptions);
	commands.registerCommand("gitpruned.refreshBranches", () => branchesProvider.refresh());
	commands.registerCommand("gitpruned.deleteBranch", (branch: Branch) => branchesProvider.delete(branch));
}

// This method is called when the extension is deactivated.
export function deactivate() {}