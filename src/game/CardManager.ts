/**
* name 
*/
module game{
	export class CardManager{
		//牌数量
		protected cardNum:number = 0;

		//牌列表
		protected cardList:Array<Card> = [];

		//牌型列表, 用于AI辅助计算
		protected cardSetList:Array<CardSet> = [];

		//TODO: 牌型set，便于快速查询
		constructor(){

		}

		public getCardNum():number
		{
			return this.cardNum;
		}
	}
}