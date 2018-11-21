/**
* name 
*/
module user{
	export class UserInfo{

		protected userId:number; // ID

		protected nickname:string; // 昵称

		protected avatar:string; // 头像

		protected score:number; // 积分

		constructor(){

		}

		public getUserId():number
		{
			return this.userId;
		}

		public setUserId(val:number):void
		{
			this.userId = val;
		}

		public getScore():number
		{
			return this.score;
		}

		public setScore(val:number):void
		{
			this.score = val;
		}

		public getNickname():string
		{
			return this.nickname;
		}

		public setNickname(val:string):void
		{
			this.nickname = val;
		}

		public getAvatar():string
		{
			return this.avatar;
		}

		public setAvatar(val:string):void
		{
			this.avatar = val;
		}

		public processUserInfo(info:any):void
		{
			this.setUserId(info["userId"]);
			this.setNickname(info["nickname"]);
			this.setAvatar(info["avatar"]);
			this.setScore(info["score"]);
		}
	}
}