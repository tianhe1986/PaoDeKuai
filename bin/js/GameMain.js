// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(1344, 400);
    }
    GameMain.GetInstance = function () {
        if (null == GameMain.instance) {
            GameMain.instance = new GameMain();
        }
        return GameMain.instance;
    };
    GameMain.prototype.initStage = function () {
        Laya.MiniAdpter.init(true, false);
        var clientWidth = Laya.Browser.clientWidth; //就是想让它初始化一下
        Laya.init(1334, 750, Laya.WebGL);
        if (Laya.Browser.onMiniGame) {
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        }
        else {
            Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        }
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.bgColor = "#000000";
    };
    GameMain.prototype.loadResource = function () {
    };
    GameMain.prototype.start = function () {
        this.initStage();
        this.loadResource();
    };
    return GameMain;
}());
GameMain.GetInstance().start();
//# sourceMappingURL=GameMain.js.map