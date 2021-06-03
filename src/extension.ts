// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { exec, execSync } from 'child_process';
import { commands, ExtensionContext, window, workspace } from 'vscode';

const output = window.createOutputChannel("Git Prun'd");
let currentDirectory: string = GetCurrentDirectory();

// This method is called when the extension is activated.
export function activate(context: ExtensionContext) {
	output.show(true);
	output.appendLine('Congratulations, your extension "gitpruned" is now active!');
	
	setupClearBranchesCommand(context);
}

// This method is called when the extension is deactivated.
export function deactivate() {}

// Setup the command Clear Branches that clears all branches in the current repo.
function setupClearBranchesCommand(context: ExtensionContext) {
	const subscription = commands.registerCommand('gitpruned.clearBranches', () => {
		output.appendLine("Pruning branches.");
		
		exec(`cd ${currentDirectory} && git branch -a`, (e, x, y) => {
			if (e) {
				output.appendLine(`Exec error: ${e}`);
				return;
			}
			
			// Filter branches to not include the current branch.
			const branches: string[] = x.split('\n').filter(x => !x.includes('*'));

			branches.forEach(x => {
				x = x.trim();

				if (x == null)
					return;

				output.appendLine(`Pruning branch: ${x}`);
				try {
					execSync(`cd ${currentDirectory} && git branch --delete ${x}`);
					output.appendLine('Branch pruned.');
				}
				catch (e) {
					output.appendLine(`Error: ${e}`);
				}
			});
			
			output.appendLine("Get prun'd kid.");
			output.appendLine(`Pruned ${branches.length} branches.`);
		});
	});

	context.subscriptions.push(subscription);
}

// Gets the current directory.
function GetCurrentDirectory(): string {
	let directory = "";
	// Get the current directory.
	const currentWorkspaceFolders: string[] | undefined = workspace.workspaceFolders?.map(folder => folder.uri.path);

	if (currentWorkspaceFolders != null) {
		directory = currentWorkspaceFolders[0].substring(1);
	}
	else {
		output.appendLine("Failed to get a workspace folder.");
	}

	return directory;
}