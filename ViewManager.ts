interface View extends egret.DisplayObjectContainer {
	viewManager: ViewManager;
}
class ViewManager {

	private currentView: View;

	public constructor(private rootContainer: egret.DisplayObjectContainer) {
	}

	async SwitchToView(clz, groupName?: string, ...args) {
		this.rootContainer.touchEnabled = false;
		this.rootContainer.touchChildren = false;

		if (groupName)
			await RES.loadGroup(groupName);

		if (this.currentView) {
			if (this.currentView.parent) this.currentView.parent.removeChild(this.currentView);
			this.currentView = null;
		}

		let newView = new clz(...args);
		newView.viewManager = this;
		this.rootContainer.addChild(newView);

		this.currentView = newView;

		this.rootContainer.touchEnabled = true;
		this.rootContainer.touchChildren = true;
	}

}
