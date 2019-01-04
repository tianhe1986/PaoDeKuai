// 程序入口
class GameMain{
	protected static instance:GameMain;
	protected wxSystemInfo:any = null;

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

	public getWxSystemInfo():any
    {
        if (Laya.Browser.onMiniGame) {
            if (this.wxSystemInfo == null) {
                this.wxSystemInfo = Laya.Browser.window.wx.getSystemInfoSync();
            }
        }

        return this.wxSystemInfo;
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
			{ url: "res/atlas/avatar.atlas", type:Laya.Loader.ATLAS},
			{ url: "res/atlas/card.atlas", type:Laya.Loader.ATLAS},
		];
		Laya.loader.load(uiResArry, Laya.Handler.create(this, this.login));
	}

	public login():void
	{
		game.Room.GetInstance().login();
	}

	public start():void
	{
		constants.MessageId.init();
		constants.CardType.init();
		this.initStage();
		this.loadResource();
	}
}
GameMain.GetInstance().start();