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
		public static STRAIGHT = 3; //顺子，不能顺到二
		public static CONNECT_DOUBLE = 4; //姊妹对，不能到二
		public static THREE_TWO = 5; //三带二
		public static THREE_ONE = 6; //三带一，仅最后出牌可出
		public static CONNECT_THREE = 7; //连续三带二
		public static BOMB = 8; //炸弹
	}
}