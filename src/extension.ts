// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { exec, execSync } from 'child_process';
import { commands, DocumentHighlight, ExtensionContext, window, workspace } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
	const output = window.createOutputChannel("Git Prun'd");
	output.show(true);
	output.appendLine('Congratulations, your extension "gitpruned" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = commands.registerCommand('gitpruned.clearBranches', () => {
		output.appendLine("Pruning branches.");
		const currentWorkspaceFolders: string[] | undefined = workspace.workspaceFolders?.map(folder => folder.uri.path);
		let currentDirectory: string = "";

		if (currentWorkspaceFolders != null)
			currentDirectory = currentWorkspaceFolders[0].substring(1);
		else {
			output.appendLine("Failed to get a workspace folder.");
			return;
		}
		
		exec(`cd ${currentDirectory} && git branch -a`, (e, x, y) => {
			if (e) {
				output.appendLine(`Exec error: ${e}`);
				return;
			}

			const branches: string[] = x.split('\n').filter(x => !x.includes('*'));

			branches.forEach(x => {
				x = x.trim();

				if (x == null)
					return;

				output.appendLine(`Pruning branch: ${x}`);
				try {
					execSync(`cd ${currentDirectory} && git branch --delete --force ${x}`);
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

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}