var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var views;
(function (views) {
    var Enter = /** @class */ (function (_super) {
        __extends(Enter, _super);
        function Enter() {
            var _this = _super.call(this) || this;
            _this.single.on(Laya.Event.CLICK, _this, _this.enterSingle);
            return _this;
        }
        Enter.prototype.enterSingle = function () {
            game.Room.GetInstance().startSingle();
        };
        return Enter;
    }(ui.enterUI));
    views.Enter = Enter;
})(views || (views = {}));
//# sourceMappingURL=Enter.js.map