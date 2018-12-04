/**
* name 
*/
module game{
	export class GameLogic{
		protected seatUserMap:Object = {};

		//座位，牌列表
		protected seatCardMap:Object = {};

		//当前出牌座位id
		protected nowOutSeatId:number = 0;

		//当前出的牌
		protected nowCardSet:CardSet = null;

		//当前最大的座位id
		protected nowSuperSeatId:number = 0;

		//当前最大的牌
		protected nowSuperCardSet:CardSet = null;

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
			this.seatCardMap = {1:{}, 2:{}, 3:{}};
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
			this.seatUserMap = {1:1, 2:2, 3:3};

			let seatArr:Array<Object> = [];
			for (let i in this.seatUserMap) {
				seatArr.push({"seatId": i, "userId": this.seatUserMap[i]});
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
				this.seatUserMap[seatId][cardIds[i]] = true;
				if (cardIds[i] == 1) { 	//计算第一个出牌者
					this.nowOutSeatId = seatId;
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
			//如果不是玩家，则调用电脑出牌机制
		}

		//处理出牌
		public mockHandleOut(msg):void
		{

		}

		public calcuOutStatus():void
		{
			if (this.isTurn()) {
				let cardLogic = CardLogic.GetInstance()
				let cardSet = CardLogic.GetInstance().calcuCardSet(Room.GetInstance().getMySeat().getSelectCardList());
				if (cardLogic.canOut(cardSet, this.nowSuperCardSet)) { //可以出牌

				} else { //不允许出牌

				}
			} else { //没到，不允许出牌

			}
		}

		public isTurn():boolean
		{
			return this.nowOutSeatId == Room.GetInstance().getMySeatId();
		}
	}
}