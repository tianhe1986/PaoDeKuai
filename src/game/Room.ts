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

		//当前出牌座位id
		protected nowOutSeatId:number = 0;

		//当前出的牌
		protected nowCardSet:CardSet = null;

		//当前最大的座位id
		protected nowSuperSeatId:number = 0;

		//当前最大的牌
		protected nowSuperCardSet:CardSet = null;

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

			PageManager.GetInstance().getRoomView().clearAll();

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

		public isTurn():boolean
		{
			return this.nowOutSeatId == Room.GetInstance().getMySeatId();
		}

		public setNowOutSeatId(seatId:number):void
		{
			this.nowOutSeatId = seatId;
		}

		public setNowSuperSeatId(seatId:number):void
		{
			this.nowSuperSeatId = seatId;
		}

		public setNowSuperCardSet(cardSet:CardSet):void
		{
			this.nowSuperCardSet = cardSet;
		}

		public getNowSuperCardSet():CardSet
		{
			return this.nowSuperCardSet;
		}

		public outTurn():void
		{
			let superCardSet:CardSet = this.getNowSuperCardSet();
			if (superCardSet.getCardType() == constants.CardType.INIT) { //新出牌，清除之前所有的
				this.mySeat.clearOutCardView();
				this.leftSeat.clearOutCardView();
				this.rightSeat.clearOutCardView();
			}

			if (this.isTurn()) {
				//展示轮到出牌了
				PageManager.GetInstance().getRoomView().showTips('轮到你出牌了');
				//清除所有选择的牌
				this.clearSelectCards();
				//检查状态，展示出牌和不要按钮
				this.calcuOutStatus();
			} else {
				//调用mock处理出牌
				PageManager.GetInstance().getRoomView().showTips('请等待' + this.getSeat(this.nowOutSeatId).getUserInfo().getNickname() + '出牌');
				GameLogic.GetInstance().mockOut(this.nowOutSeatId);
			}
		}

		public clearSelectCards():void
		{
			this.mySeat.clearSelectCards();
		}

		public calcuOutStatus():void
		{
			let roomView = PageManager.GetInstance().getRoomView();
			if (this.isTurn()) {
				roomView.showCardHandleButtons();
				let cardLogic = CardLogic.GetInstance()
				let cardSet = CardLogic.GetInstance().calcuCardSet(Room.GetInstance().getMySeat().getSelectCardList());
				if (cardLogic.canOut(cardSet, this.nowSuperCardSet)) { //可以出牌
					roomView.showCardOut();
				} else { //不允许出牌
					roomView.hideCardOut();
				}
			} else { //没到，不允许出牌
				roomView.hideCardHandleButtons();
			}
		}

		public confirmCardOut():void
		{
			if (this.isTurn()) {
				let cardLogic = CardLogic.GetInstance()
				let cardSet = CardLogic.GetInstance().calcuCardSet(Room.GetInstance().getMySeat().getSelectCardList());
				if (cardLogic.canOut(cardSet, this.nowSuperCardSet)) { //可以出牌
					GameLogic.GetInstance().sendOutCard(this.mySeatId, cardSet);
				} else { //不允许出牌
					
				}
			} else { //没到，不允许出牌
				
			}
		}

		public pass():void
		{
			let cardSet = new CardSet();
			cardSet.setCardType(constants.CardType.PASSED);
			GameLogic.GetInstance().sendOutCard(this.mySeatId, cardSet);
		}

		public processCardOut(seatId, cardSet:CardSet):void
		{
			let handleSeat = this.getSeat(seatId);
			//如果是自己，将cardSet中的牌移除掉
			if (this.mySeatId == seatId) {
				handleSeat.removeCardsBySet(cardSet);
				handleSeat.refreshCardNum();
				handleSeat.refreshHandCardView();
				handleSeat.refreshSeatInfo();
			} else { //否则，只更新剩余牌数
				handleSeat.setCardNum(handleSeat.getCardNum() - cardSet.getCardList().length);
			}
			
			let nextSeatId:number = seatId + 1;
			if (nextSeatId > 3) {
				nextSeatId = 1;
			}

			//关闭按钮展示
			PageManager.GetInstance().getRoomView().hideCardHandleButtons();
			//清除此座位下家的展示
			this.getSeat(nextSeatId).clearOutCardView();
			//展示此座位出的牌
			handleSeat.showOutCard(cardSet, this.mySeatId == seatId);
		}

		public handleGameOver(winner:number, scoreMap:Object):void
		{
			let resultList = [];
			//处理分值
			for (let seatId in scoreMap) {
				let handleSeat = this.getSeat(parseInt(seatId));
				let userInfo = handleSeat.getUserInfo();
				userInfo.setScore(userInfo.getScore() + scoreMap[seatId]);
				handleSeat.refreshSeatInfo();
				resultList.push([userInfo.getNickname(), scoreMap[seatId]]);
			}

			//展示结果
			PageManager.GetInstance().getRoomView().showResult(this.getSeat(winner).getUserInfo().getNickname(), resultList);
		}
	}
}