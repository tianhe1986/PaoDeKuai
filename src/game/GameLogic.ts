/**
* name 
*/
module game{
	export class GameLogic{
		protected seatUserMap:Object = {};
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
			msg.writeData();

			let msgObj = {"id":msg.getMessageId(), "content":msg.getContent()};
			net.SocketManager.GetInstance().onMessageReveived(JSON.stringify(msgObj));
		}

		public mockGiveCard():void
		{
			//模拟洗牌，并分发出去，记录各自的牌
			//对于玩家，发送牌消息
			//对于电脑，计算牌型
		}

		public mockOutTurn():void
		{
			//给红桃3的人发送出牌消息
			//如果不是玩家，则调用电脑出牌机制
		}

		//处理出牌
		public mockHandleOut(msg):void
		{

		}
	}
}