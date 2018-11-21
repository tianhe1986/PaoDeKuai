/**
* name 
*/
module game{
	export class Seat{
		//座位编号
		protected seatId:number = null;

		//座位展示
		protected seatView:Laya.Box = null;

		protected userInfo:user.UserInfo = null;

		protected cardManager:CardManager = null;

		constructor()
		{
			this.cardManager = new CardManager();
		}

		public setUserInfo(val:user.UserInfo):void
		{
			this.userInfo = val;
		}

		public getUserInfo():user.UserInfo
		{
			return this.userInfo;
		}

		public setSeatView(val:Laya.Box):void
		{
			this.seatView = val;
		}

		public getSeatView():Laya.Box
		{
			return this.seatView;
		}

		public getCardManager():CardManager
		{
			return this.cardManager;
		}

		public refreshSeatInfo():void
		{
			let seatView = this.getSeatView();
			if (seatView === null) {
				return;
			}
			(seatView.getChildByName("nickname") as Laya.Text).text = this.getUserInfo().getNickname();
			(seatView.getChildByName("avatar") as Laya.Image).skin = this.getUserInfo().getAvatar();
			(seatView.getChildByName("score") as Laya.Text).text = "" + this.getUserInfo().getScore();
			(seatView.getChildByName("cardNum") as Laya.Text).text = "" + this.getCardManager().getCardNum();
		}
	}
}