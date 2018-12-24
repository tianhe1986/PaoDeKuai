/**
* name 
*/
module constants{
	export class CardType{
		public static PASSED = -2; //要不起
		public static INIT = -1; //前面没有牌
		public static ERROR = 0; //没有这个牌型的
		public static SINGLE = 1; //单牌
		public static DOUBLE = 2; //一对
		public static CONNECT_DOUBLE = 3; //姊妹对，不能到二
		public static THREE_TWO = 4; //三带二
		public static STRAIGHT = 5; //顺子，不能顺到二
		public static THREE_ONE = 6; //三带一，仅最后出牌可出
		public static CONNECT_THREE = 7; //连续三带二
		public static BOMB = 8; //炸弹

		protected static typeNameMap:Object = {};

		public static init():void
		{
			CardType.typeNameMap[-2] = "要不起";
			CardType.typeNameMap[-1] = "前面没有牌";
			CardType.typeNameMap[0] = "错误牌型";
			CardType.typeNameMap[1] = "单张";
			CardType.typeNameMap[2] = "一对";
			CardType.typeNameMap[3] = "姊妹对";	
			CardType.typeNameMap[4] = "三带二";
			CardType.typeNameMap[5] = "一条龙";
			CardType.typeNameMap[6] = "三带一";
			CardType.typeNameMap[7] = "连续三带二";
			CardType.typeNameMap[8] = "炸弹";
		}

		public static getTypeName(cardType:number):string
		{
			return CardType.typeNameMap[cardType] != undefined ? CardType.typeNameMap[cardType] : "";
		}
	}
}