/**
* name 
*/
module game{
	export class Room{
		protected isSingle:boolean = false;

		protected mySeat:Seat = null;
		protected leftSeat:Seat = null;
		protected rightSeat:Seat = null;

		protected mySeatId:number = 0;
		protected seatMap:Object = null;
		protected isGaming:boolean = false;

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

		public getIsGaming():boolean
		{
			return this.isGaming;
		}

		public setIsGaming(val:boolean):void
		{
			this.isGaming = val;
		}

		public startSingle():void
		{
			this.setIsSingle(true);
			PageManager.GetInstance().showRoom();

			//创造虚拟用户
			this.mockSeat();

			//开始游戏
			GameLogic.GetInstance().startGame();
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
			//let leftUserInfo = userManager.getUserInfo(2);
			//let rightUserInfo = userManager.getUserInfo(3);

			this.mySeat.setUserInfo(myUserInfo);
			//this.leftSeat.setUserInfo(leftUserInfo);
			//this.rightSeat.setUserInfo(rightUserInfo);

			this.mySeat.refreshSeatInfo();
			//this.leftSeat.refreshSeatInfo();
			//this.rightSeat.refreshSeatInfo();
		}

		public getMySeatId():number
		{
			return this.mySeatId;
		}

		public setMySeatId(val:number):void
		{
			this.mySeatId = val;
		}

		public getMySeat():Seat
		{
			return this.mySeat;
		}

		public startWithSeatArr(seatArr:Array<Object>):void
		{
			let userManager = user.UserManager.GetInstance();
			let myUserInfo = userManager.getMyUserInfo();
			for (let i = 0, len = seatArr.length; i < len; i++) {
				if (seatArr[i]["userId"] == myUserInfo.getUserId()) {
					let mySeatId = seatArr[i]["seatId"], leftSeatId = seatArr[(i + 2)%3]["seatId"], rightSeatId = seatArr[(i + 1)%3]["seatId"];
					let leftUserInfo = userManager.getUserInfo(seatArr[(i + 2)%3]["userId"]), rightUserInfo = userManager.getUserInfo(seatArr[(i + 1)%3]["userId"]);

					this.setMySeatId(mySeatId);
					this.mySeat.setSeatId(mySeatId);

					this.leftSeat.setSeatId(leftSeatId);
					this.leftSeat.setUserInfo(leftUserInfo);

					this.rightSeat.setSeatId(rightSeatId);
					this.rightSeat.setUserInfo(rightUserInfo);

					this.seatMap = {};
					this.seatMap[mySeatId] = this.mySeat;
					this.seatMap[leftSeatId] = this.leftSeat;
					this.seatMap[rightSeatId] = this.rightSeat;

					this.mySeat.refreshSeatInfo();
					this.leftSeat.refreshSeatInfo();
					this.rightSeat.refreshSeatInfo();
					break;
				}
			}
			this.setIsGaming(true);
		}

		public getSeat(seatId:number):Seat
		{
			return this.seatMap[seatId];
		}
	}
}