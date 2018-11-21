/**
* name
*/
var game;
(function (game) {
    var CardManager = /** @class */ (function () {
        //TODO: 牌型set，便于快速查询
        function CardManager() {
            //牌数量
            this.cardNum = 0;
            //牌列表
            this.cardList = [];
            //牌型列表, 用于AI辅助计算
            this.cardSetList = [];
        }
        CardManager.prototype.getCardNum = function () {
            return this.cardNum;
        };
        return CardManager;
    }());
    game.CardManager = CardManager;
})(game || (game = {}));
//# sourceMappingURL=CardManager.js.map