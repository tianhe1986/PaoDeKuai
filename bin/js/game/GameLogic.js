/**
* name
*/
var game;
(function (game) {
    var GameLogic = /** @class */ (function () {
        function GameLogic() {
            this.seatUserMap = {};
        }
        GameLogic.GetInstance = function () {
            if (null == GameLogic.instance) {
                GameLogic.instance = new GameLogic();
            }
            return GameLogic.instance;
        };
        GameLogic.prototype.startGame = function () {
            if (!game.Room.GetInstance().getIsSingle()) {
                return;
            }
            this.mockStart();
            this.mockGiveCard();
            this.mockOutTurn();
        };
        GameLogic.prototype.mockStart = function () {
            //发送游戏开始的消息
            this.seatUserMap = { 1: 1, 2: 2, 3: 3 };
            var seatArr = [];
            for (var i in this.seatUserMap) {
                seatArr.push({ "seatId": i, "userId": this.seatUserMap[i] });
            }
            var msg = new message.GameStart();
            msg.seatArr = seatArr;
            msg.writeData();
            var msgObj = { "id": msg.getMessageId(), "content": msg.getContent() };
            net.SocketManager.GetInstance().onMessageReveived(JSON.stringify(msgObj));
        };
        GameLogic.prototype.mockGiveCard = function () {
            //模拟洗牌，并分发出去，记录各自的牌
            //对于玩家，发送牌消息
            //对于电脑，计算牌型
        };
        GameLogic.prototype.mockOutTurn = function () {
            //给红桃3的人发送出牌消息
            //如果不是玩家，则调用电脑出牌机制
        };
        //处理出牌
        GameLogic.prototype.mockHandleOut = function (msg) {
        };
        return GameLogic;
    }());
    game.GameLogic = GameLogic;
})(game || (game = {}));
//# sourceMappingURL=GameLogic.js.map