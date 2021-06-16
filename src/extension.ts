import { Utilities } from './utilities';
import { BranchesProvider } from './branchesProvider';
import { commands, ExtensionContext, TreeViewOptions, window } from 'vscode';
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
	commands.registerCommand("gitpruned.deleteBranch", (originBranch: Branch, selectedBranches: Branch[]) => branchesProvider.delete(originBranch, selectedBranches));
}

// This method is called when the extension is deactivated.
export function deactivate() {}