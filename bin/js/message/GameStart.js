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
    var GameStart = /** @class */ (function (_super) {
        __extends(GameStart, _super);
        function GameStart() {
            var _this = _super.call(this) || this;
            _this.seatArr = [];
            _this.id = constants.MessageId.GAME_START;
            return _this;
        }
        GameStart.prototype.writeData = function () {
            this.content = { "seatArr": this.seatArr };
        };
        GameStart.prototype.readData = function () {
            this.seatArr = this.content["seatArr"];
        };
        GameStart.prototype.receiveHandle = function () {
            game.Room.GetInstance().startWithSeatArr(this.seatArr);
        };
        return GameStart;
    }(message.Base));
    message.GameStart = GameStart;
})(message || (message = {}));
//# sourceMappingURL=GameStart.js.map