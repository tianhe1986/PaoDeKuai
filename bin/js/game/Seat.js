/**
* name
*/
var game;
(function (game) {
    var Seat = /** @class */ (function () {
        function Seat() {
            //座位编号
            this.seatId = null;
            //座位展示
            this.seatView = null;
            this.userInfo = null;
            this.cardManager = null;
            this.cardManager = new game.CardManager();
        }
        Seat.prototype.setUserInfo = function (val) {
            this.userInfo = val;
        };
        Seat.prototype.getUserInfo = function () {
            return this.userInfo;
        };
        Seat.prototype.setSeatView = function (val) {
            this.seatView = val;
        };
        Seat.prototype.getSeatView = function () {
            return this.seatView;
        };
        Seat.prototype.getCardManager = function () {
            return this.cardManager;
        };
        Seat.prototype.refreshSeatInfo = function () {
            var seatView = this.getSeatView();
            if (seatView === null) {
                return;
            }
            seatView.getChildByName("nickname").text = this.getUserInfo().getNickname();
            seatView.getChildByName("avatar").skin = this.getUserInfo().getAvatar();
            seatView.getChildByName("score").text = "" + this.getUserInfo().getScore();
            seatView.getChildByName("cardNum").text = "" + this.getCardManager().getCardNum();
        };
        return Seat;
    }());
    game.Seat = Seat;
})(game || (game = {}));
//# sourceMappingURL=Seat.js.map