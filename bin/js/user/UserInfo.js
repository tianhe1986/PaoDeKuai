/**
* name
*/
var user;
(function (user) {
    var UserInfo = /** @class */ (function () {
        function UserInfo() {
        }
        UserInfo.prototype.getUserId = function () {
            return this.userId;
        };
        UserInfo.prototype.setUserId = function (val) {
            this.userId = val;
        };
        UserInfo.prototype.getScore = function () {
            return this.score;
        };
        UserInfo.prototype.setScore = function (val) {
            this.score = val;
        };
        UserInfo.prototype.getNickname = function () {
            return this.nickname;
        };
        UserInfo.prototype.setNickname = function (val) {
            this.nickname = val;
        };
        UserInfo.prototype.getAvatar = function () {
            return this.avatar;
        };
        UserInfo.prototype.setAvatar = function (val) {
            this.avatar = val;
        };
        UserInfo.prototype.processUserInfo = function (info) {
            this.setUserId(info["userId"]);
            this.setNickname(info["nickname"]);
            this.setAvatar(info["avatar"]);
            this.setScore(info["score"]);
        };
        return UserInfo;
    }());
    user.UserInfo = UserInfo;
})(user || (user = {}));
//# sourceMappingURL=UserInfo.js.map