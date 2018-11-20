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
        Laya.init(1344,400);
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
        
    }

    public start():void
    {
        this.initStage();
        this.loadResource();
    }
}
GameMain.GetInstance().start();