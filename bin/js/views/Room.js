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
    var Room = /** @class */ (function (_super) {
        __extends(Room, _super);
        function Room() {
            return _super.call(this) || this;
        }
        return Room;
    }(ui.roomUI));
    views.Room = Room;
})(views || (views = {}));
//# sourceMappingURL=Room.js.map