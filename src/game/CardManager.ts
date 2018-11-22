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

		public setCardNum(val:number):void
		{
			this.cardNum = val;
		}

		public getAvailableCard():Card
		{
			//TODO: 使用poolManager
			return new Card();
		}

		public refreshCard(cardIds:Array<number>, isSelf:boolean = false):void
		{
			this.cardList = [];
			this.cardSetList = [];

			for (let i = 0, len = cardIds.length; i < len; i++) {
				let newCard = this.getAvailableCard();
				newCard.setCardId(cardIds[i]);
				this.cardList.push(newCard);
			}
			this.sortCardList();
			this.setCardNum(cardIds.length);

			if (isSelf) {
				this.refreshHandCardView();
			} else {
				this.calcuCardSet();
			}
		}

		public sortCardList():void
		{
			this.cardList.sort((a:Card, b:Card) => {
				return b.getCardId() - a.getCardId();
			});
		}

		public refreshHandCardView():void
		{
			let handCardView = PageManager.GetInstance().getRoomView().handCard;
			//简单粗暴的清除重绘，之后再优化
			handCardView.removeChildren();
			for (let i = 0, len = this.cardList.length; i < len; i++) {
				let cardView = this.cardList[i].getCardView();
				handCardView.addChild(cardView);
				cardView.y = 0;
				cardView.x = i * 53;
			}
		}

		public calcuCardSet():void
		{

		}
	}
}