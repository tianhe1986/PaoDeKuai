/**
* name
*/
var constants;
(function (constants) {
    var MessageId = /** @class */ (function () {
        function MessageId() {
        }
        MessageId.init = function () {
            MessageId._maps = {};
            MessageId._maps[MessageId.GAME_START] = message.GameStart;
            MessageId._maps[MessageId.GAME_OVER] = message.GameOver;
            MessageId._maps[MessageId.GIVE_CARD] = message.GiveCard;
            MessageId._maps[MessageId.CARD_OUT] = message.CardOut;
            MessageId._maps[MessageId.OUT_TURN] = message.OutTurn;
            MessageId._maps[MessageId.CHAT] = message.Chat;
            MessageId._maps[MessageId.PUNISH] = message.Punish;
            MessageId._maps[MessageId.HEART_REQ] = message.HeartReq;
            MessageId._maps[MessageId.HEART_REP] = message.HeartRep;
        };
        MessageId.GetProtocolNameById = function (pid) {
            return MessageId._maps[pid] ? MessageId._maps[pid] : null;
        };
        MessageId.GAME_START = 1;
        MessageId.GAME_OVER = 2;
        MessageId.GIVE_CARD = 3;
        MessageId.CARD_OUT = 4;
        MessageId.OUT_TURN = 5;
        MessageId.CHAT = 6;
        MessageId.PUNISH = 7;
        MessageId.HEART_REQ = 10000;
        MessageId.HEART_REP = 10001;
        return MessageId;
    }());
    constants.MessageId = MessageId;
})(constants || (constants = {}));
//# sourceMappingURL=MessageId.js.map