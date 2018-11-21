/**
* name
*/
var message;
(function (message) {
    var Base = /** @class */ (function () {
        function Base() {
        }
        Base.prototype.setContent = function (val) {
            this.content = val;
        };
        Base.prototype.getContent = function () {
            return this.content;
        };
        Base.prototype.getMessageId = function () {
            return this.id;
        };
        return Base;
    }());
    message.Base = Base;
})(message || (message = {}));
//# sourceMappingURL=Base.js.map