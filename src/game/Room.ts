/**
* name 
*/
module game{
	export class Room{
		protected isSingle:boolean = false;

		protected mySeat:Seat;
		protected leftSeat:Seat;
		protected rightSeat:Seat;

		protected static instance:Room;

		public static GetInstance():Room
		{
			if(null == Room.instance)
			{
				Room.instance = new Room();
			}
			return Room.instance;
		}

		constructor(){
			this.mySeat = new Seat();
			this.leftSeat = new Seat();
			this.rightSeat = new Seat();

			let roomView = PageManager.GetInstance().getRoomView();
			this.mySeat.setSeatView(roomView.mySeat);
			this.leftSeat.setSeatView(roomView.leftSeat);
			this.rightSeat.setSeatView(roomView.rightSeat);
		}

		public getIsSingle():boolean
		{
			return this.isSingle;
		}

		public setIsSingle(val:boolean):void
		{
			this.isSingle = val;
		}

		public startSingle():void
		{
			this.setIsSingle(true);
			PageManager.GetInstance().showRoom();

			//创造虚拟用户
			this.mockSeat();

			//开始游戏
			this.startGame();
		}

		public mockSeat():void
		{
			//创造三个用户，设置给三个座位
			let userMy = {"userId":1, "score":100, "nickname":"莽夫" , "avatar":"avatar/b.png"};
			let userLeft = {"userId":2, "score":100, "nickname":"梦称" , "avatar":"avatar/a.png"};
			let userRight = {"userId":3, "score":100, "nickname":"性活" , "avatar":"avatar/a.png"};

			let userManager = user.UserManager.GetInstance();
			userManager.processMyUserInfo(userMy);
			userManager.processOtherUserInfo(userLeft);
			userManager.processOtherUserInfo(userRight);

			let myUserInfo = userManager.getMyUserInfo();
			let leftUserInfo = userManager.getUserInfo(2);
			let rightUserInfo = userManager.getUserInfo(3);

			this.mySeat.setUserInfo(myUserInfo);
			this.leftSeat.setUserInfo(leftUserInfo);
			this.rightSeat.setUserInfo(rightUserInfo);

			this.mySeat.refreshSeatInfo();
			this.leftSeat.refreshSeatInfo();
			this.rightSeat.refreshSeatInfo();
		}

		public startGame():void
		{
			//转入GameLogic进行处理
		}
	}
}