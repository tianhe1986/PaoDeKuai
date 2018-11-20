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
//# sourceMappingURL=layaUI.max.all.js.map