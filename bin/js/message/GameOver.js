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
var message;
(function (message) {
    var GameOver = /** @class */ (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            var _this = _super.call(this) || this;
            _this.id = constants.MessageId.GAME_OVER;
            return _this;
        }
        GameOver.prototype.writeData = function () {
        };
        GameOver.prototype.readData = function () {
        };
        GameOver.prototype.receiveHandle = function () {
        };
        return GameOver;
    }(message.Base));
    message.GameOver = GameOver;
})(message || (message = {}));
//# sourceMappingURL=GameOver.js.map