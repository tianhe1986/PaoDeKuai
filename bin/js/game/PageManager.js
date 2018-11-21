/**
* name
*/
var game;
(function (game) {
    var PageManager = /** @class */ (function () {
        function PageManager() {
            //现在展示的视图
            this.nowView = null;
            //进入页
            this.enterView = null;
            //游戏页
            this.roomView = null;
        }
        PageManager.GetInstance = function () {
            if (null == PageManager.instance) {
                PageManager.instance = new PageManager();
            }
            return PageManager.instance;
        };
        PageManager.prototype.hideView = function (processView, clear) {
            if (clear === void 0) { clear = true; }
            if (clear && processView.showClear && typeof processView.showClear == 'function') {
                processView.showClear();
            }
            processView.visible = false;
        };
        PageManager.prototype.showView = function (processView, init) {
            if (init === void 0) { init = true; }
            if (init && processView.showInit && typeof processView.showInit == 'function') {
                processView.showInit();
            }
            processView.visible = true;
        };
        PageManager.prototype.baseShow = function (viewName, className) {
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
        };
        PageManager.prototype.showEnter = function () {
            this.baseShow("enterView", views.Enter);
        };
        PageManager.prototype.showRoom = function () {
            this.baseShow("roomView", views.Room);
        };
        PageManager.prototype.getRoomView = function () {
            if (this.roomView == null) {
                this.roomView = new views.Room();
                Laya.stage.addChild(this.roomView);
                this.roomView.visible = false;
            }
            return this.roomView;
        };
        return PageManager;
    }());
    game.PageManager = PageManager;
})(game || (game = {}));
//# sourceMappingURL=PageManager.js.map