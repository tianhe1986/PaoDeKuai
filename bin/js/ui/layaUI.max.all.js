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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var enterUI = /** @class */ (function (_super) {
        __extends(enterUI, _super);
        function enterUI() {
            return _super.call(this) || this;
        }
        enterUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.enterUI.uiView);
        };
        enterUI.uiView = { "type": "View", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0 }, "child": [{ "type": "Rect", "props": { "width": 1334, "lineWidth": 1, "height": 750, "fillColor": "#56b8e7" } }] }, { "type": "Button", "props": { "y": 284, "x": 360, "width": 155, "var": "single", "skin": "comp/button.png", "labelSize": 36, "labelFont": "SimSun", "label": "单机", "height": 72 } }] };
        return enterUI;
    }(View));
    ui.enterUI = enterUI;
})(ui || (ui = {}));
(function (ui) {
    var roomUI = /** @class */ (function (_super) {
        __extends(roomUI, _super);
        function roomUI() {
            return _super.call(this) || this;
        }
        roomUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.roomUI.uiView);
        };
        roomUI.uiView = { "type": "View", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "var": "background" }, "child": [{ "type": "Rect", "props": { "width": 1334, "lineWidth": 1, "height": 750, "fillColor": "#56b8e7" } }] }, { "type": "Box", "props": { "y": 76, "x": 13, "var": "leftSeat" }, "child": [{ "type": "Box", "props": { "width": 180, "height": 260 }, "child": [{ "type": "Rect", "props": { "width": 180, "lineWidth": 1, "height": 260, "fillColor": "#11829f" } }] }, { "type": "Image", "props": { "y": 14, "x": 15, "width": 150, "name": "avatar", "height": 150 } }, { "type": "Text", "props": { "y": 173, "x": 18, "width": 145, "name": "nickname", "height": 30, "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 214, "x": 18, "width": 145, "name": "score", "height": 30, "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": -4, "x": 185, "width": 47, "name": "cardNum", "height": 30, "fontSize": 24, "font": "Microsoft YaHei", "color": "#ffffff", "align": "left" } }] }, { "type": "Box", "props": { "y": 480, "x": 13, "var": "mySeat" }, "child": [{ "type": "Box", "props": { "width": 180, "height": 260 }, "child": [{ "type": "Rect", "props": { "width": 180, "lineWidth": 1, "height": 260, "fillColor": "#11829f" } }] }, { "type": "Image", "props": { "y": 14, "x": 15, "width": 150, "name": "avatar", "height": 150 } }, { "type": "Text", "props": { "y": 173, "x": 18, "width": 145, "name": "nickname", "height": 30, "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 214, "x": 18, "width": 145, "name": "score", "height": 30, "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": -4, "x": 185, "width": 47, "name": "cardNum", "height": 30, "fontSize": 24, "font": "Microsoft YaHei", "color": "#ffffff", "align": "left" } }] }, { "type": "Box", "props": { "y": 76, "x": 1093, "width": 233, "var": "rightSeat", "height": 271 }, "child": [{ "type": "Box", "props": { "y": 4, "x": 53, "width": 180, "height": 260 }, "child": [{ "type": "Rect", "props": { "width": 180, "lineWidth": 1, "height": 260, "fillColor": "#11829f" } }] }, { "type": "Image", "props": { "y": 18, "x": 68, "width": 150, "name": "avatar", "height": 150 } }, { "type": "Text", "props": { "y": 177, "x": 71, "width": 145, "name": "nickname", "height": 30, "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 218, "x": 71, "width": 145, "name": "score", "height": 30, "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 0, "x": 2, "width": 47, "name": "cardNum", "height": 30, "fontSize": 24, "font": "Microsoft YaHei", "color": "#ffffff", "align": "left" } }, { "type": "Box", "props": { "y": 486, "x": -851, "width": 926, "var": "handCard", "height": 150 } }] }] };
        return roomUI;
    }(View));
    ui.roomUI = roomUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map