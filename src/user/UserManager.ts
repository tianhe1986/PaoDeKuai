/**
* name 
*/
module user{
	export class UserManager{

		protected myUserId:number = 0;

		protected userInfoMap:Object = {};

		protected static instance:UserManager;

		public static GetInstance():UserManager
		{
			if(null == UserManager.instance)
			{
				UserManager.instance = new UserManager();
			}
			return UserManager.instance;
		}

		constructor(){

		}

		public processMyUserInfo(info:any):void
		{
			this.myUserId = info["userId"];
			this.processOtherUserInfo(info);
		}

		public processOtherUserInfo(info:any):void
		{
			let userInfo:UserInfo = null;
			if (this.userInfoMap[info["userId"]] !== undefined) {
				userInfo = this.userInfoMap[info["userId"]];
			} else {
				userInfo = new UserInfo();
				this.userInfoMap[info["userId"]] = userInfo;
			}
			userInfo.processUserInfo(info);
		}

		public getUserInfo(userId:number):UserInfo
		{
			return this.userInfoMap[userId];
		}

		public getMyUserInfo():UserInfo
		{
			return this.userInfoMap[this.myUserId];
		}
	}
}