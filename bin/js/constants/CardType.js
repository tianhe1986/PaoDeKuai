/**
* name
*/
var constants;
(function (constants) {
    var CardType = /** @class */ (function () {
        function CardType() {
        }
        CardType.PASSED = -2; //要不起
        CardType.INIT = -1; //前面没有牌
        CardType.ERROR = 0; //没有这个牌型的
        CardType.SINGLE = 1; //单牌
        CardType.DOUBLE = 2; //一对
        CardType.STRAIGHT = 3; //顺子，不能顺到二
        CardType.CONNECT_DOUBLE = 4; //姊妹对，不能到二
        CardType.THREE_TWO = 5; //三带二
        CardType.THREE_ONE = 6; //三带一，仅最后出牌可出
        CardType.CONNECT_THREE = 7; //连续三带二
        CardType.BOMB = 8; //炸弹
        return CardType;
    }());
    constants.CardType = CardType;
})(constants || (constants = {}));
//# sourceMappingURL=CardType.js.map