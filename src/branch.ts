import { TreeItem, TreeItemCollapsibleState } from "vscode";

export class Branch extends TreeItem {
    contextValue = 'branch';

    constructor(
        public readonly branchName: string,
        public readonly collapsibleState: TreeItemCollapsibleState = TreeItemCollapsibleState.None
    ) {
        super(branchName, collapsibleState);
        this.tooltip = `${this.label}`;
    }
}