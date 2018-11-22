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
        CardManager.prototype.setCardNum = function (val) {
            this.cardNum = val;
        };
        CardManager.prototype.getAvailableCard = function () {
            //TODO: 使用poolManager
            return new game.Card();
        };
        CardManager.prototype.refreshCard = function (cardIds, isSelf) {
            if (isSelf === void 0) { isSelf = false; }
            this.cardList = [];
            this.cardSetList = [];
            for (var i = 0, len = cardIds.length; i < len; i++) {
                var newCard = this.getAvailableCard();
                newCard.setCardId(cardIds[i]);
                this.cardList.push(newCard);
            }
            this.sortCardList();
            this.setCardNum(cardIds.length);
            if (isSelf) {
                this.refreshHandCardView();
            }
            else {
                this.calcuCardSet();
            }
        };
        CardManager.prototype.sortCardList = function () {
            this.cardList.sort(function (a, b) {
                return b.getCardId() - a.getCardId();
            });
        };
        CardManager.prototype.refreshHandCardView = function () {
            var handCardView = game.PageManager.GetInstance().getRoomView().handCard;
            //简单粗暴的清除重绘，之后再优化
            handCardView.removeChildren();
            for (var i = 0, len = this.cardList.length; i < len; i++) {
                var cardView = this.cardList[i].getCardView();
                handCardView.addChild(cardView);
                cardView.y = 0;
                cardView.x = i * 53;
            }
        };
        CardManager.prototype.calcuCardSet = function () {
        };
        return CardManager;
    }());
    game.CardManager = CardManager;
})(game || (game = {}));
//# sourceMappingURL=CardManager.js.map