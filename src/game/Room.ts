/**
* name 
*/
module game{
	export class Room{
		public static SCORE_KEY = "score_map";
		protected isSingle:boolean = false;

		protected userInfo:user.UserInfo = null;
		protected scoreMap:Object = null;

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

			this.userInfo = new user.UserInfo();
			this.userInfo.setNickname("莽夫");
			this.userInfo.setAvatar("avatar/b.png");
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

		public login():void
		{
			game.PageManager.GetInstance().showLogin();

			if (Laya.Browser.onMiniGame) {
				let wx = Laya.Browser.window.wx;
				
				wx.login({
					success: (res) => {
						let code = res.code;
						wx.getSetting({
							success: (resSetting) => {
								if (resSetting.authSetting["scope.userInfo"] == true)  { //已授权，直接获取
									wx.getUserInfo({
										withCredentials: true,
										success: (res2) => {
											this.userInfo.setNickname(res2.userInfo.nickName);
											this.userInfo.setAvatar(res2.userInfo.avatarUrl);
											this.showEnter();
										}
									});
								} else { //未授权，创建微信登录按钮
									let systemInfo = GameMain.GetInstance().getWxSystemInfo();
									let button = wx.createUserInfoButton({
										type: 'text',
										text: '登录',
										withCredentials: true,
										style: {
											left: systemInfo.windowWidth/2 - 70,
											top: systemInfo.windowHeight/2 - 20,
											width: 140,
											height: 40,
											lineHeight: 40,
											backgroundColor: '#ffffff',
											color: '#000000',
											textAlign: 'center',
											fontSize: 16,
											borderRadius: 4
										}
									})
									button.onTap((res2) => {
										this.userInfo.setNickname(res2.userInfo.nickName);
										this.userInfo.setAvatar(res2.userInfo.avatarUrl);
										button.destroy();
										this.showEnter();
									})
								}
							}
						});
					}
				});
			} else { //否则，展示登录框
				this.showEnter();
			}
		}

		public showEnter():void
		{
			game.PageManager.GetInstance().showEnter();
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

		public getScoreMap():any
		{
			if (this.scoreMap == null) {
				this.scoreMap = Laya.LocalStorage.getJSON(Room.SCORE_KEY);
				if (this.scoreMap == null || this.scoreMap == '') {
					this.scoreMap = {};
					this.scoreMap[1] = 100;
					this.scoreMap[2] = 100;
					this.scoreMap[3] = 100;
				}
			}

			return this.scoreMap;
		}

		public refreshAndSaveScore():void
		{
			this.scoreMap[this.mySeat.getUserInfo().getUserId()] = this.mySeat.getUserInfo().getScore();
			this.scoreMap[this.leftSeat.getUserInfo().getUserId()] = this.leftSeat.getUserInfo().getScore();
			this.scoreMap[this.rightSeat.getUserInfo().getUserId()] = this.rightSeat.getUserInfo().getScore();

			Laya.LocalStorage.setJSON(Room.SCORE_KEY, this.scoreMap);
		}

		public mockSeat():void
		{
			//创造三个用户，设置给三个座位
			let scoreMap = this.getScoreMap();
			let userMy = {"userId":1, "score":scoreMap[1], "nickname":this.userInfo.getNickname(), "avatar":this.userInfo.getAvatar()};
			let userLeft = {"userId":2, "score":scoreMap[2], "nickname":"懵懂" , "avatar":"avatar/c.png"};
			let userRight = {"userId":3, "score":scoreMap[3], "nickname":"性活" , "avatar":"avatar/a.png"};

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
					let mySeatId = parseInt(seatArr[i]["seatId"]), leftSeatId = parseInt(seatArr[(i + 2)%3]["seatId"]), rightSeatId = parseInt(seatArr[(i + 1)%3]["seatId"]);
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
				this.mySeat.clearOutCard();
				this.leftSeat.clearOutCard();
				this.rightSeat.clearOutCard();
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
				if (this.nowSuperCardSet.getCardType() == constants.CardType.INIT) {
					roomView.hidePass();
				}
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

		//提示
		public remind():void
		{
			if (this.isTurn()) {
				let seat = this.getMySeat();
				//收起当前选中的牌
				seat.clearSelectCards();
				//计算手中的牌
				seat.getCardManager().calcuCardSet();
				//计算要出的牌
				let nextSeatId:number = seat.getSeatId() + 1;
				if (nextSeatId > 3) {
					nextSeatId = 1;
				}
				let resultCardSet = seat.calcuOutCardSet(this.nowSuperCardSet, this.getSeat(nextSeatId).getCardNum());

				seat.backCardsBySet(resultCardSet);
				//如果打不起，直接不要
				if (resultCardSet.getCardType() == constants.CardType.PASSED) {
					this.pass();
				} else { //否则，把推荐的牌取出
					let cardList = resultCardSet.getCardList();
					for (let i = 0, len = cardList.length; i < len; i++) {
						cardList[i].setIsSelect(true);
					}
					this.calcuOutStatus();
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

		public processCardOut(seatId:number, cardSet:CardSet):void
		{
			let handleSeat = this.getSeat(seatId);
			//如果是自己，将cardSet中的牌移除掉
			if (this.mySeatId == seatId) {
				handleSeat.recoverCardsBySet(cardSet);
				handleSeat.removeCardsBySet(cardSet);
				handleSeat.refreshCardNum();
				handleSeat.refreshHandCardView();
				handleSeat.refreshSeatInfo();
			} else { //否则，只更新剩余牌数
				handleSeat.setCardNum(handleSeat.getCardNum() - cardSet.getCardList().length);
			}
			handleSeat.moveToOutList(cardSet.getCardList());
			
			let nextSeatId:number = seatId + 1;
			if (nextSeatId > 3) {
				nextSeatId = 1;
			}

			//关闭按钮展示
			PageManager.GetInstance().getRoomView().hideCardHandleButtons();
			//清除此座位下家的展示
			this.getSeat(nextSeatId).clearOutCard();
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

			this.refreshAndSaveScore();

			//展示结果
			PageManager.GetInstance().getRoomView().showResult(this.getSeat(winner).getUserInfo().getNickname(), resultList);
		}

		public handlePunish(seatId:number, score:number):void
		{
			let handleSeat = this.getSeat(seatId);
			handleSeat.getUserInfo().setScore(handleSeat.getUserInfo().getScore() + score);
			handleSeat.refreshSeatInfo();

			this.refreshAndSaveScore();

			if (seatId == this.mySeatId) {
				PageManager.GetInstance().getRoomView().showPunish(Math.abs(score));
			}
		}
	}
}