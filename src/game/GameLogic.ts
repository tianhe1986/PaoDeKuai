/**
* name 
*/
module game{
	export class GameLogic{
		protected mockSeatUserMap:Object = {};

		//座位，牌列表
		protected mockSeatCardMap:Object = {};
		protected mockNowOutSeatId:number = 0;
		protected mockNowCardSet:CardSet = null;
		protected mockNowSuperSeatId:number = 0;
		protected mockNowSuperCardSet:CardSet = null;

		protected static instance:GameLogic;

		public static GetInstance():GameLogic
		{
			if(null == GameLogic.instance)
			{
				GameLogic.instance = new GameLogic();
			}
			return GameLogic.instance;
		}

		constructor(){
			this.mockClearSeatCard();
		}

		public mockClearSeatCard():void
		{
			this.mockSeatCardMap = {1:{}, 2:{}, 3:{}};
		}

		public startGame():void
		{
			if ( ! Room.GetInstance().getIsSingle()) {
				return;
			}

			this.mockStart();
			this.mockGiveCard();
			this.mockOutTurn();
		}

		public mockStart():void
		{
			//发送游戏开始的消息
			this.mockSeatUserMap = {1:1, 2:2, 3:3};

			let seatArr:Array<Object> = [];
			for (let i in this.mockSeatUserMap) {
				seatArr.push({"seatId": i, "userId": this.mockSeatUserMap[i]});
			}
			
			let msg:message.GameStart = new message.GameStart();
			msg.seatArr = seatArr;

			this.mockSendMessage(msg);
		}

		public mockGiveCard():void
		{
			//模拟洗牌，并分发出去，记录各自的牌
			let arr:Array<number> = [];
			for (let i = 1; i <= 51; i++) {
				arr.push(i);
			}

			//洗牌
			let randomIndex:number, itemAtIndex:number;
			for (let i = 50; i >= 0; i--) {
				randomIndex = Math.floor(Math.random()*(i+1));
				itemAtIndex = arr[randomIndex];

				arr[randomIndex] = arr[i];
				arr[i] = itemAtIndex;
			}

			this.mockClearSeatCard();
			this.processSeatCard(1, arr.splice(0, 17));
			this.processSeatCard(2, arr.splice(0, 17));
			this.processSeatCard(3, arr);
		}

		protected processSeatCard(seatId:number, cardIds:Array<number>):void
		{
			for (let i = 0, len = cardIds.length; i < len; i++) {
				this.mockSeatCardMap[seatId][cardIds[i]] = true;
				if (cardIds[i] == 1) { 	//计算第一个出牌者
					this.mockNowOutSeatId = seatId;
					this.mockNowSuperSeatId = seatId;
					let newCardSet = new game.CardSet();
					newCardSet.setCardType(constants.CardType.INIT);
					this.mockNowCardSet = newCardSet;
					this.mockNowSuperCardSet = newCardSet;
				}
			}

			//对于玩家，发送牌消息
			if (seatId == Room.GetInstance().getMySeatId()) {
				let msg:message.GiveCard = new message.GiveCard();
				msg.seatId = seatId;
				msg.cardNum = cardIds.length;
				msg.cardIds = cardIds;

				this.mockSendMessage(msg);
			} else { //对于电脑，计算牌型
				Room.GetInstance().getSeat(seatId).refreshCard(cardIds);
				let msg:message.GiveCard = new message.GiveCard();
				msg.seatId = seatId;
				msg.cardNum = cardIds.length;
				msg.cardIds = [];

				this.mockSendMessage(msg);
			}
			
		}

		public mockSendMessage(msg:message.Base):void
		{
			msg.writeData();
			let msgObj = {"id":msg.getMessageId(), "content":msg.getContent()};
			net.SocketManager.GetInstance().onMessageReveived(JSON.stringify(msgObj));
		}

		public mockOutTurn():void
		{
			Laya.timer.once(500, this, () => {
				//下个发牌者发送出牌消息
				let msg:message.OutTurn = new message.OutTurn();
				msg.seatId = this.mockNowOutSeatId;
				msg.superSeatId = this.mockNowSuperSeatId;
				msg.cardType = this.mockNowSuperCardSet.getCardType();
				msg.connectNum = this.mockNowSuperCardSet.getConnectNum();
				msg.point = this.mockNowSuperCardSet.getPoint();

				this.mockSendMessage(msg);
			});
		}

		public mockPunish(seatId:number, score:number):void
		{
			let msg:message.Punish = new message.Punish();
			msg.seatId = seatId;
			msg.score = -Math.abs(score);

			this.mockSendMessage(msg);
		}

		public matchAndClearSeatCard(seatId:number, cardSet:CardSet):boolean
		{
			let cardList = cardSet.getCardList();
			for (let i = 0, len = cardList.length; i < len; i++) {
				let cardId = cardList[i].getCardId();
				if (this.mockSeatCardMap[seatId][cardId] == undefined) {
					return false;
				}
			}

			for (let i = 0, len = cardList.length; i < len; i++) {
				let cardId = cardList[i].getCardId();
				delete(this.mockSeatCardMap[seatId][cardId]);
			}

			return true;
		}

		public mockOut(seatId:number):void
		{
			if (seatId == Room.GetInstance().getMySeatId()) {
				return;
			}

			//延迟处理
			Laya.timer.once(500, this, () => {
				let seat = Room.GetInstance().getSeat(seatId);
				let superCardSet = Room.GetInstance().getNowSuperCardSet();

				let resultCardSet = seat.calcuOutCardSet(superCardSet);

				//发送出牌消息
				this.sendOutCard(seatId, resultCardSet);
			});
			
		}

		//处理出牌
		public mockHandleOut(msg:message.CardOut):void
		{
			let seatId = msg.seatId;
			let cardSet = msg.getCardSet();
			//检查牌型是否匹配
			if ( ! this.checkCardSetMatch(seatId, cardSet)) {
				return;
			}

			if (this.matchAndClearSeatCard(seatId, cardSet)) {
				this.mockSendOutCard(seatId, cardSet);

				//手里没牌了，发送游戏结束
				if (Object.keys(this.mockSeatCardMap[seatId]).length == 0) {
					let msg:message.GameOver = new message.GameOver();
					msg.winner = seatId;
					let scoreList = [];
					let handleSeatId = seatId;
					let winScore:number = 0;
					for (let i = 0; i < 3; i++) {
						scoreList.push([handleSeatId, -Object.keys(this.mockSeatCardMap[handleSeatId]).length]);
						winScore += Object.keys(this.mockSeatCardMap[handleSeatId]).length;
						handleSeatId++;
						if (handleSeatId > 3) {
							handleSeatId = 1;
						}
					}
					scoreList[0][1] = winScore;
					msg.scoreList = scoreList;
					this.mockSendMessage(msg);
					return;
				}

				this.mockNowCardSet = cardSet;
				this.mockNowOutSeatId++;
				if (this.mockNowOutSeatId > 3) {
					this.mockNowOutSeatId = 1;
				}
				//如果是不要
				if (cardSet.getCardType() == constants.CardType.PASSED) {
					//转回到当前最大者了，新一轮,否则，保持当前最大牌不变，下一个用户
					if (this.mockNowSuperSeatId == this.mockNowOutSeatId) {
						let newCardSet = new CardSet();
						newCardSet.setCardType(constants.CardType.INIT);
						this.mockNowSuperCardSet = newCardSet;
					}
				} else {
					//更新最大者
					this.mockNowSuperSeatId = seatId;
					this.mockNowSuperCardSet = cardSet;
				}

				
				//下一轮出牌
				this.mockOutTurn();
			}
		}

		public checkCardSetMatch(seatId:number, cardSet:CardSet):boolean
		{
			if (cardSet.getCardType() == constants.CardType.PASSED) { //不要，计算手中是否有大的牌
				if (seatId != Room.GetInstance().getMySeatId()) { //电脑暂时不检查
					return true;
				}
				let cardList = [];
				for (let cardId in this.mockSeatCardMap[seatId]) {
					let newCard = new Card();
					newCard.setCardId(parseInt(cardId));
					cardList.push(newCard);
				}
				if (CardLogic.GetInstance().hasLarge(cardList, this.mockNowSuperCardSet)) {
					//发送扣分消息
					this.mockPunish(seatId, this.mockNowSuperCardSet.getCardList().length);
					//还是此人出牌
					this.mockOutTurn();
					return false;
				}

				return true;
			} else {
				//检查传的牌与算出来的牌是否相同
				let calcuCardSet = CardLogic.GetInstance().calcuCardSet(cardSet.getCardList().slice());
				if (calcuCardSet.getCardType() != cardSet.getCardType() || calcuCardSet.getConnectNum() != cardSet.getConnectNum() || calcuCardSet.getPoint() != cardSet.getPoint()) {
					//TODO: 发假消息，要揍一顿
					return false;
				}

				if ( ! CardLogic.GetInstance().canOut(cardSet, this.mockNowSuperCardSet)) {
					return false;
				}

				return true;
			}
		}

		public generateCardOutMsg(seatId:number, resultCardSet:CardSet):message.CardOut
		{
			let msg:message.CardOut = new message.CardOut();
			msg.seatId = seatId;
			msg.cardType = resultCardSet.getCardType();
			msg.connectNum = resultCardSet.getConnectNum();
			msg.point = resultCardSet.getPoint();
			let cardIds:Array<number> = [];
			let cardList = resultCardSet.getCardList();
			for (let i = 0, len = cardList.length; i < len; i++) {
				cardIds.push(cardList[i].getCardId());
			}
			msg.cardIds = cardIds;
			return msg;
		}
		
		public mockSendOutCard(seatId:number, resultCardSet:CardSet):void
		{
			let msg:message.CardOut = this.generateCardOutMsg(seatId, resultCardSet);

			this.mockSendMessage(msg);
		}

		public sendOutCard(seatId:number, resultCardSet:CardSet):void
		{
			let msg:message.CardOut = this.generateCardOutMsg(seatId, resultCardSet);
			net.SocketManager.GetInstance().sendMessage(msg);
		}
	}
}