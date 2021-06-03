import { window, workspace } from "vscode";

const output = window.createOutputChannel("Git Prun'd");

export class Utilities {
    
    // Gets the current directory.
    static getCurrentDirectory(): string {
        let directory = "";
        // Get the current directory.
        const currentWorkspaceFolders: string[] | undefined = workspace.workspaceFolders?.map(folder => folder.uri.path);

        if (currentWorkspaceFolders != null) {
            directory = currentWorkspaceFolders[0].substring(1);
        }

        return directory;
    }

    static showOutputChannel(): void {
        output.show(true);
    }

    static log(message: string): void {
        output.appendLine(message);
    }
}