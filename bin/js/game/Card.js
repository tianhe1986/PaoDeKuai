/**
* name
*/
var game;
(function (game) {
    var Card = /** @class */ (function () {
        function Card() {
            //卡牌id
            this.cardId = 0;
            //卡牌点数
            this.point = 0;
            this.cardImage = new Laya.Image();
            this.cardImage.width = 105;
            this.cardImage.height = 150;
        }
        Card.prototype.getCardView = function () {
            return this.cardImage;
        };
        Card.prototype.setCardId = function (val) {
            this.cardId = val;
            this.point = Math.ceil(val / 4) + 2;
            this.cardImage.skin = "card/" + val + ".jpg";
        };
        Card.prototype.getCardId = function () {
            return this.cardId;
        };
        Card.prototype.getPoint = function () {
            return this.point;
        };
        return Card;
    }());
    game.Card = Card;
})(game || (game = {}));
//# sourceMappingURL=Card.js.map