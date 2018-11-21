/**
* name 
*/
module game{
	export class PageManager{

		//现在展示的视图
    	protected nowView:laya.ui.View = null;
		//进入页
		protected enterView:laya.ui.View = null;
		//游戏页
		protected roomView:laya.ui.View = null;

		protected static instance:PageManager;

		public static GetInstance():PageManager
		{
			if(null == PageManager.instance)
			{
				PageManager.instance = new PageManager();
			}
			return PageManager.instance;
		}

		constructor(){

		}

		public hideView(processView:any, clear:boolean = true)
		{
			if (clear && processView.showClear && typeof processView.showClear == 'function') {
				processView.showClear();
			}

			(processView as laya.ui.View).visible = false;
		}

		public showView(processView:any, init:boolean = true)
		{
			if (init && processView.showInit && typeof processView.showInit == 'function') {
				processView.showInit();
			}

			(processView as laya.ui.View).visible = true;
		}

		protected baseShow(viewName:string, className:any):void
		{
			if (this.nowView) {
				if (this.nowView == this[viewName]) {
					return;
				}
				this.hideView(this.nowView);
			}

			if (null == this[viewName]) {
				this[viewName] = new className();
				Laya.stage.addChild(this[viewName]);
			}

			this.showView(this[viewName]);
			this.nowView = this[viewName];
		}

		public showEnter():void
		{
			this.baseShow("enterView", views.Enter);
		}

		public showRoom():void
		{
			this.baseShow("roomView", views.Room);
		}

		public getRoomView():views.Room
		{
			if (this.roomView == null) {
				this.roomView = new views.Room();
				Laya.stage.addChild(this.roomView);
				this.roomView.visible = false;
			}

			return (this.roomView as views.Room);
		}
	}
}