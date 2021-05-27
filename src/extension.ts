// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { exec, execSync } from 'child_process';
import { commands, ExtensionContext } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// let output = createOutputChannel("Cool Trimmings");
	console.log('Congratulations, your extension "cooltrimmings" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = commands.registerCommand('cooltrimmings.getBranchesList', () => {
		// cmd.exe git branch -a
		const currentDirectory = __dirname;

		exec(`cd ${__dirname} && git branch -a`, (e, x, y) => {
			if (e) {
				console.error(`Exec error: ${e}`);
				return;
			}
				
			console.log(x);

			// execSync(`cmd.exe git branch --delete --force ${branchName}`)
		});
		let branchNames: string[] = [];
		
		branchNames.forEach(branchName => {
			execSync(`cmd.exe git branch --delete --force ${branchName}`)
		});
		
		// Display a message box to the user
		// window.showInformationMessage('Hello World from CoolTrimmings!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
