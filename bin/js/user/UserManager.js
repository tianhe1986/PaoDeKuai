/**
* name
*/
var user;
(function (user) {
    var UserManager = /** @class */ (function () {
        function UserManager() {
            this.myUserId = 0;
            this.userInfoMap = {};
        }
        UserManager.GetInstance = function () {
            if (null == UserManager.instance) {
                UserManager.instance = new UserManager();
            }
            return UserManager.instance;
        };
        UserManager.prototype.processMyUserInfo = function (info) {
            this.myUserId = info["userId"];
            this.processOtherUserInfo(info);
        };
        UserManager.prototype.processOtherUserInfo = function (info) {
            var userInfo = null;
            if (this.userInfoMap[info["userId"]] !== undefined) {
                userInfo = this.userInfoMap[info["userId"]];
            }
            else {
                userInfo = new user.UserInfo();
                this.userInfoMap[info["userId"]] = userInfo;
            }
            userInfo.processUserInfo(info);
        };
        UserManager.prototype.getUserInfo = function (userId) {
            return this.userInfoMap[userId];
        };
        UserManager.prototype.getMyUserInfo = function () {
            return this.userInfoMap[this.myUserId];
        };
        return UserManager;
    }());
    user.UserManager = UserManager;
})(user || (user = {}));
//# sourceMappingURL=UserManager.js.map