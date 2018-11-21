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
    var Chat = /** @class */ (function (_super) {
        __extends(Chat, _super);
        function Chat() {
            var _this = _super.call(this) || this;
            _this.id = constants.MessageId.CHAT;
            return _this;
        }
        Chat.prototype.writeData = function () {
        };
        Chat.prototype.readData = function () {
        };
        Chat.prototype.receiveHandle = function () {
        };
        return Chat;
    }(message.Base));
    message.Chat = Chat;
})(message || (message = {}));
//# sourceMappingURL=Chat.js.map