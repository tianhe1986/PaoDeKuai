/**
* name 
*/
module game{
	export class CardSet{
		protected cardType:number; //牌型
		protected cardList:Array<Card>; //牌
		protected connectNum:number = 1; //连续数量,用于连续三带二,姊妹对和顺子
		protected point:number; //牌型的点数,取最小的
		protected minPoint:number; //所有牌中最小的点数
		constructor(){

		}

		public getCardType():number
		{
			return this.cardType;
		}

		public setCardType(val:number):void
		{
			this.cardType = val;
		}

		public getCardList():Array<Card>
		{
			return this.cardList;
		}

		public setCardList(val:Array<Card>):void
		{
			this.cardList = val;
		}

		public getConnectNum():number
		{
			return this.connectNum;
		}

		public setConnectNum(val:number):void
		{
			this.connectNum = val;
		}

		public getPoint():number
		{
			return this.point;
		}

		public setPoint(val:number):void
		{
			this.point = val;
		}

		public getMinPoint():number
		{
			return this.minPoint;
		}

		public setMinPoint(val:number):void
		{
			this.minPoint = val;
		}
	}
}