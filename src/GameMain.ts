// 程序入口
class GameMain{
	protected static instance:GameMain;

	public static GetInstance():GameMain
	{
		if(null == GameMain.instance)
		{
			GameMain.instance = new GameMain();
		}
		return GameMain.instance;
	}

	constructor()
	{

	}

	public initStage():void
	{
		Laya.MiniAdpter.init(true, false);
		let clientWidth = Laya.Browser.clientWidth; //就是想让它初始化一下
		Laya.init(1334, 750, Laya.WebGL);

		if (Laya.Browser.onMiniGame) {
			Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
		} else {
			Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
		}

		Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
		Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
		Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
		Laya.stage.bgColor = "#000000";
	}

	public loadResource():void
	{
		let uiResArry:Array<any> = [
			{ url: "res/atlas/comp.atlas", type:Laya.Loader.ATLAS},
			{ url: "res/atlas/avatar.atlas", type:Laya.Loader.ATLAS}
		];
		Laya.loader.load(uiResArry, Laya.Handler.create(this, this.showIndex));
	}

	public showIndex():void
	{
		game.PageManager.GetInstance().showEnter();
	}

	public start():void
	{
		constants.MessageId.init();
		this.initStage();
		this.loadResource();
	}
}
GameMain.GetInstance().start();