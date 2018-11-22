/**
* name
*/
var game;
(function (game) {
    var GameLogic = /** @class */ (function () {
        function GameLogic() {
            this.seatUserMap = {};
            //座位，牌列表
            this.seatCardMap = {};
            //当前出牌座位id
            this.nowOutSeatId = 0;
            //当前出的牌
            this.nowCardSet = null;
            //当前最大的座位id
            this.nowSuperSeatId = 0;
            //当前最大的牌
            this.nowSuperCardSet = null;
            this.seatCardMap = { 1: {}, 2: {}, 3: {} };
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
            this.mockSendMessage(msg);
        };
        GameLogic.prototype.mockGiveCard = function () {
            //模拟洗牌，并分发出去，记录各自的牌
            var arr = [];
            for (var i = 1; i <= 51; i++) {
                arr.push(i);
            }
            //洗牌
            var randomIndex, itemAtIndex;
            for (var i = 50; i >= 0; i--) {
                randomIndex = Math.floor(Math.random() * (i + 1));
                itemAtIndex = arr[randomIndex];
                arr[randomIndex] = arr[i];
                arr[i] = itemAtIndex;
            }
            this.processSeatCard(1, arr.splice(0, 17));
            this.processSeatCard(2, arr.splice(0, 17));
            this.processSeatCard(3, arr.splice(0, 17));
        };
        GameLogic.prototype.processSeatCard = function (seatId, cardIds) {
            for (var i = 0; i < 17; i++) {
                this.seatUserMap[seatId][cardIds[i]] = true;
                if (cardIds[i] == 1) { //计算第一个出牌者
                    this.nowOutSeatId = seatId;
                }
            }
            //对于玩家，发送牌消息
            if (seatId == game.Room.GetInstance().getMySeatId()) {
                var msg = new message.GiveCard();
                msg.seatId = seatId;
                msg.cardNum = cardIds.length;
                msg.cardIds = cardIds;
                this.mockSendMessage(msg);
            }
            else { //对于电脑，计算牌型
                game.Room.GetInstance().getSeat(seatId).refreshCard(cardIds);
            }
        };
        GameLogic.prototype.mockSendMessage = function (msg) {
            msg.writeData();
            var msgObj = { "id": msg.getMessageId(), "content": msg.getContent() };
            net.SocketManager.GetInstance().onMessageReveived(JSON.stringify(msgObj));
        };
        GameLogic.prototype.mockOutTurn = function () {
            //下个发牌者发送出牌消息
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