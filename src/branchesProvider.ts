import { BranchService } from './branchService';
import { Event, EventEmitter, TreeDataProvider, TreeItem } from "vscode";
import { Branch } from './branch';

export class BranchesProvider implements TreeDataProvider<Branch> {
    private _onDidChangeTreeData: EventEmitter<Branch | undefined | null | void> = new EventEmitter<Branch | undefined | null | void>();
    readonly onDidChangeTreeData: Event<Branch | undefined | null | void> = this._onDidChangeTreeData.event;

    constructor() {}

    getTreeItem(element: Branch): TreeItem {
        return element;
    }

    getChildren(element?: Branch): Thenable<Branch[]> {
        return new Promise(async (resolve, reject) => {
                if (!element) {
                const localBranchNames: string[] = await BranchService.getLocalBranches();
                resolve(localBranchNames.map(x => new Branch(x)));
            } else {   
                resolve([]);
            }
        });
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    delete(originBranch: Branch, selectedBranches: Branch[]): void {
        selectedBranches.forEach(branch => BranchService.deleteBranch(branch));
        this.refresh();
    }
}