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
    var CardOut = /** @class */ (function (_super) {
        __extends(CardOut, _super);
        function CardOut() {
            var _this = _super.call(this) || this;
            _this.id = constants.MessageId.CARD_OUT;
            return _this;
        }
        CardOut.prototype.writeData = function () {
        };
        CardOut.prototype.readData = function () {
        };
        CardOut.prototype.receiveHandle = function () {
        };
        return CardOut;
    }(message.Base));
    message.CardOut = CardOut;
})(message || (message = {}));
//# sourceMappingURL=CardOut.js.map