/**
* name
*/
var game;
(function (game) {
    var Room = /** @class */ (function () {
        function Room() {
            this.isSingle = false;
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
        Room.prototype.startSingle = function () {
            this.setIsSingle(true);
            game.PageManager.GetInstance().showRoom();
            //创造虚拟用户
            this.mockSeat();
            //开始游戏
            this.startGame();
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
            var leftUserInfo = userManager.getUserInfo(2);
            var rightUserInfo = userManager.getUserInfo(3);
            this.mySeat.setUserInfo(myUserInfo);
            this.leftSeat.setUserInfo(leftUserInfo);
            this.rightSeat.setUserInfo(rightUserInfo);
            this.mySeat.refreshSeatInfo();
            this.leftSeat.refreshSeatInfo();
            this.rightSeat.refreshSeatInfo();
        };
        Room.prototype.startGame = function () {
            //转入GameLogic进行处理
        };
        return Room;
    }());
    game.Room = Room;
})(game || (game = {}));
//# sourceMappingURL=Room.js.map