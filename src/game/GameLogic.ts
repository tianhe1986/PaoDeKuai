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
			//下个发牌者发送出牌消息
			let msg:message.OutTurn = new message.OutTurn();
			msg.seatId = this.mockNowOutSeatId;
			msg.superSeatId = this.mockNowSuperSeatId;
			msg.cardType = this.mockNowSuperCardSet.getCardType();
			msg.connectNum = this.mockNowSuperCardSet.getConnectNum();
			msg.point = this.mockNowSuperCardSet.getPoint();

			this.mockSendMessage(msg);
		}

		public mockOut(seatId:number):void
		{
			if (seatId == Room.GetInstance().getMySeatId()) {
				return;
			}
			let seat = Room.GetInstance().getSeat(seatId);
			let superCardSet = Room.GetInstance().getNowSuperCardSet();

			let resultCardSet = seat.calcuOutCardSet(superCardSet);

			//发送出牌消息
			this.sendOutCard(seatId, resultCardSet);

			//手里没牌了，发送游戏结束
			if (seat.getRealCardNum() == 0) {
				return;
			}

			this.mockNowCardSet = resultCardSet;
			this.mockNowOutSeatId++;
			if (this.mockNowOutSeatId > 3) {
				this.mockNowOutSeatId = 1;
			}
			//如果是不要
			if (resultCardSet.getCardType() == constants.CardType.PASSED) {
				//转回到当前最大者了，新一轮,否则，保持当前最大牌不变，下一个用户
				if (this.mockNowSuperSeatId == this.mockNowOutSeatId) {
					let newCardSet = new CardSet();
					newCardSet.setCardType(constants.CardType.INIT);
					this.mockNowSuperCardSet = newCardSet;
				}
			} else {
				//更新最大者
				this.mockNowSuperSeatId = seatId;
				this.mockNowSuperCardSet = resultCardSet;
			}

			
			//下一轮出牌
			this.mockOutTurn();
		}

		//处理出牌
		public mockHandleOut(msg):void
		{

		}
		
		public sendOutCard(seatId:number, resultCardSet:CardSet):void
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

			this.mockSendMessage(msg);
		}
	}
}