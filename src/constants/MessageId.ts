/**
* name 
*/
module constants{
	export class MessageId{
		public static GAME_START = 1; //游戏开始
		public static GAME_OVER = 2; //游戏结束
		public static GIVE_CARD = 3; //发牌
		public static CARD_OUT = 4; //出牌
		public static OUT_TURN = 5; //轮到出牌
		public static CHAT = 6; //聊天
		public static PUNISH = 7; //惩罚
		public static HEART_REQ = 10000;
		public static HEART_REP = 10001;
		
		//协议对应的消息类
		private static _maps:Object;

		public static init()
		{
			MessageId._maps = {};
			MessageId._maps[MessageId.GAME_START] = message.GameStart;
			MessageId._maps[MessageId.GAME_OVER] = message.GameOver;
			MessageId._maps[MessageId.GIVE_CARD] = message.GiveCard;
			MessageId._maps[MessageId.CARD_OUT] = message.CardOut;
			MessageId._maps[MessageId.OUT_TURN] = message.OutTurn;
			MessageId._maps[MessageId.CHAT] = message.Chat;
			MessageId._maps[MessageId.PUNISH] = message.Punish;
			MessageId._maps[MessageId.HEART_REQ] = message.HeartReq;
			MessageId._maps[MessageId.HEART_REP] = message.HeartRep;
		}
		
		public static GetProtocolNameById(pid:number):Function|null
		{
			return MessageId._maps[pid] ? MessageId._maps[pid] : null;
		}
	}
}