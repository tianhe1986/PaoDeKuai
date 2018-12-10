/**
* name 
*/
module message{
	export class CardOut extends Base{
		public seatId:number;
		public cardType:number;
		public connectNum:number;
		public point:number;
		public cardIds:Array<number> = [];

		constructor(){
			super();
			this.id = constants.MessageId.CARD_OUT;
		}

		public writeData():void
		{
			this.content["seatId"] = this.seatId;
			this.content["cardType"] = this.cardType;
			this.content["connectNum"] = this.connectNum;
			this.content["point"] = this.point;
			this.content["cardIds"] = this.cardIds;
		}

		public readData():void
		{
			this.seatId = this.content["seatId"];
			this.cardType = this.content["cardType"];
			this.connectNum = this.content["connectNum"];
			this.point = this.content["point"];
			this.cardIds = this.content["cardIds"];
		}

		public receiveHandle():void
		{
			let cardSet = this.getCardSet();
			game.Room.GetInstance().processCardOut(this.seatId, cardSet);
		}

		public getCardSet():game.CardSet
		{
			let cardList:Array<game.Card> = [];
			for (let i = 0, len = this.cardIds.length; i < len; i++) {
				let newCard = new game.Card();
				newCard.setCardId(this.cardIds[i]);
				cardList.push(newCard);
			}
			let cardSet = new game.CardSet();
			cardSet.setCardType(this.cardType);
			cardSet.setConnectNum(this.connectNum);
			cardSet.setPoint(this.point);
			cardSet.setCardList(cardList);
			return cardSet;
		}

		public mockSend():void
		{
			game.GameLogic.GetInstance().mockHandleOut(this);
		}
	}
}