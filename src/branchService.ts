import { exec, execSync } from "child_process";
import { window } from "vscode";
import { Branch } from "./branch";
import { Utilities } from "./utilities";

export class BranchService {
    static getAllBranches(): Thenable<string[]> {
        return new Promise(function(resolve, reject) {
            let directory = Utilities.getCurrentDirectory();
            const checkIfWindowsDirectory = /[a-zA-Z]{1}:\//;

            if (!checkIfWindowsDirectory.test(directory)) {
                directory = `/${directory}`;
            }

            exec(`cd ${directory} && git branch -a`, (e, x, y) => {
                if (e) {
                    window.showInformationMessage(e.message);
                    return Promise.resolve([]);
                }

                const allBranchNames: string[] = x
                    .split('\n')
                    .filter(x => !x.includes('*') && x.trim() !== "")
                    .map(x => x.trim());
                
                resolve(allBranchNames);
            });    
        });
    }

    static getLocalBranches(): Thenable<string[]> {
        return new Promise(async function(resolve, reject) {
            const allBranchNames: string[] = await BranchService.getAllBranches();
            
            const localBranches: string[] = allBranchNames
                    .filter(x => !x.startsWith('remotes/origin'));

            resolve(localBranches);
        });
    }

    static deleteBranch(branch: Branch): Thenable<boolean> {
        return new Promise(async function(resolve, reject) {
            let directory = Utilities.getCurrentDirectory();
            const checkIfWindowsDirectory = /[a-zA-Z]{1}:\//;

            if (!checkIfWindowsDirectory.test(directory)) {
                directory = `/${directory}`;
            }

            try {
                execSync(`cd ${directory} && git branch --delete ${branch.branchName}`);
                resolve(true);
            } catch (e) {
                window.showInformationMessage((e as Error).message);
                resolve(false);
            }
        });
    }
} 