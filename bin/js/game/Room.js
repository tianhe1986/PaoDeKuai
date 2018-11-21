/**
* name
*/
var game;
(function (game) {
    var Room = /** @class */ (function () {
        function Room() {
            this.isSingle = false;
            this.mySeat = null;
            this.leftSeat = null;
            this.rightSeat = null;
            this.mySeatId = 0;
            this.seatMap = null;
            this.isGaming = false;
            this.mySeat = new game.Seat();
            this.leftSeat = new game.Seat();
            this.rightSeat = new game.Seat();
            var roomView = game.PageManager.GetInstance().getRoomView();
            this.mySeat.setSeatView(roomView.mySeat);
            this.leftSeat.setSeatView(roomView.leftSeat);
            this.rightSeat.setSeatView(roomView.rightSeat);
        }
        Room.GetInstance = function () {
            if (null == Room.instance) {
                Room.instance = new Room();
            }
            return Room.instance;
        };
        Room.prototype.getIsSingle = function () {
            return this.isSingle;
        };
        Room.prototype.setIsSingle = function (val) {
            this.isSingle = val;
        };
        Room.prototype.getIsGaming = function () {
            return this.isGaming;
        };
        Room.prototype.setIsGaming = function (val) {
            this.isGaming = val;
        };
        Room.prototype.startSingle = function () {
            this.setIsSingle(true);
            game.PageManager.GetInstance().showRoom();
            //创造虚拟用户
            this.mockSeat();
            //开始游戏
            game.GameLogic.GetInstance().startGame();
        };
        Room.prototype.mockSeat = function () {
            //创造三个用户，设置给三个座位
            var userMy = { "userId": 1, "score": 100, "nickname": "莽夫", "avatar": "avatar/b.png" };
            var userLeft = { "userId": 2, "score": 100, "nickname": "梦称", "avatar": "avatar/a.png" };
            var userRight = { "userId": 3, "score": 100, "nickname": "性活", "avatar": "avatar/a.png" };
            var userManager = user.UserManager.GetInstance();
            userManager.processMyUserInfo(userMy);
            userManager.processOtherUserInfo(userLeft);
            userManager.processOtherUserInfo(userRight);
            var myUserInfo = userManager.getMyUserInfo();
            //let leftUserInfo = userManager.getUserInfo(2);
            //let rightUserInfo = userManager.getUserInfo(3);
            this.mySeat.setUserInfo(myUserInfo);
            //this.leftSeat.setUserInfo(leftUserInfo);
            //this.rightSeat.setUserInfo(rightUserInfo);
            this.mySeat.refreshSeatInfo();
            //this.leftSeat.refreshSeatInfo();
            //this.rightSeat.refreshSeatInfo();
        };
        Room.prototype.getMySeatId = function () {
            return this.mySeatId;
        };
        Room.prototype.setMySeatId = function (val) {
            this.mySeatId = val;
        };
        Room.prototype.startWithSeatArr = function (seatArr) {
            var userManager = user.UserManager.GetInstance();
            var myUserInfo = userManager.getMyUserInfo();
            console.log(seatArr);
            for (var i = 0, len = seatArr.length; i < len; i++) {
                if (seatArr[i]["userId"] == myUserInfo.getUserId()) {
                    var mySeatId = seatArr[i]["seatId"], leftSeatId = seatArr[(i + 2) % 3]["seatId"], rightSeatId = seatArr[(i + 1) % 3]["seatId"];
                    var leftUserInfo = userManager.getUserInfo(seatArr[(i + 2) % 3]["userId"]), rightUserInfo = userManager.getUserInfo(seatArr[(i + 1) % 3]["userId"]);
                    this.setMySeatId(mySeatId);
                    this.mySeat.setSeatId(mySeatId);
                    this.leftSeat.setSeatId(leftSeatId);
                    this.leftSeat.setUserInfo(leftUserInfo);
                    this.rightSeat.setSeatId(rightSeatId);
                    this.rightSeat.setUserInfo(rightUserInfo);
                    this.seatMap = { mySeatId: this.mySeat, leftSeatId: this.leftSeat, rightSeatId: this.rightSeat };
                    console.log("hao");
                    this.mySeat.refreshSeatInfo();
                    this.leftSeat.refreshSeatInfo();
                    this.rightSeat.refreshSeatInfo();
                    break;
                }
            }
            this.setIsGaming(true);
        };
        Room.prototype.getSeat = function (seatId) {
            return this.seatMap[seatId];
        };
        return Room;
    }());
    game.Room = Room;
})(game || (game = {}));
//# sourceMappingURL=Room.js.map