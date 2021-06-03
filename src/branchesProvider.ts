import { BranchService } from './branchService';
import { Event, EventEmitter, TreeDataProvider, TreeItem, TreeItemCollapsibleState, window } from "vscode";
import { Branch } from './branch';

export class BranchesProvider implements TreeDataProvider<Branch> {
    private _onDidChangeTreeData: EventEmitter<Branch | undefined | null | void> = new EventEmitter<Branch | undefined | null | void>();
    readonly onDidChangeTreeData: Event<Branch | undefined | null | void> = this._onDidChangeTreeData.event;

    constructor(private workspaceRoot: string) {}

    getTreeItem(element: Branch): TreeItem {
        return element;
    }

    getChildren(element?: Branch): Thenable<Branch[]> {
        if (!element) {
            return new Promise(async function(resolve, reject) {
                const localBranchNames: string[] = await BranchService.getLocalBranches();
                resolve(localBranchNames.map(x => new Branch(x)));
            });
        } else {
            return Promise.resolve([]);
        }
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
        this.getChildren();
    }

    delete(branch: Branch): void {
        BranchService.deleteBranch(branch);
    }
}