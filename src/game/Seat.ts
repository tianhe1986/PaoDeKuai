/**
* name 
*/
module game{
	export class Seat{
		//座位编号
		protected seatId:number = null;

		//座位展示
		protected seatView:Laya.Box = null;

		protected userInfo:user.UserInfo = null;

		protected cardManager:CardManager = null;

		constructor()
		{
			this.cardManager = new CardManager();
		}

		public setSeatId(val:number):void
		{
			this.seatId = val;
		}

		public getSeatId():number
		{
			return this.seatId;
		}

		public setUserInfo(val:user.UserInfo):void
		{
			this.userInfo = val;
		}

		public getUserInfo():user.UserInfo
		{
			return this.userInfo;
		}

		public setSeatView(val:Laya.Box):void
		{
			this.seatView = val;
		}

		public getSeatView():Laya.Box
		{
			return this.seatView;
		}

		public getCardManager():CardManager
		{
			return this.cardManager;
		}

		public backCardsBySet(cardSet:CardSet):void
		{
			if (this.getSeatId() == game.Room.GetInstance().getMySeatId()) {
				this.getCardManager().backCardsBySet(cardSet);
			}
		}

		public refreshSeatInfo():void
		{
			let seatView = this.getSeatView();
			if (seatView === null) {
				return;
			}
			(seatView.getChildByName("nickname") as Laya.Text).text = this.getUserInfo().getNickname();
			(seatView.getChildByName("avatar") as Laya.Image).skin = this.getUserInfo().getAvatar();
			(seatView.getChildByName("score") as Laya.Text).text = "" + this.getUserInfo().getScore();
			(seatView.getChildByName("cardNum") as Laya.Text).text = "" + this.getCardManager().getCardNum();
		}

		public refreshCard(cardIds:Array<number>):void
		{
			this.cardManager.refreshCard(cardIds, this.getSeatId() == game.Room.GetInstance().getMySeatId());
			this.refreshSeatInfo();
		}

		public setCardNum(cardNum:number):void
		{
			this.cardManager.setCardNum(cardNum);
			this.refreshSeatInfo();
		}

		public getCardNum():number
		{
			return this.cardManager.getCardNum();
		}

		public getSelectCardList():Array<Card>
		{
			return this.cardManager.getSelectCardList();
		}

		public clearSelectCards():void
		{
			this.cardManager.clearSelectCards();
		}

		public calcuOutCardSet(superCardSet:CardSet, nextCardNum:number):CardSet
		{
			return this.cardManager.calcuOutCardSet(superCardSet, nextCardNum);
		}

		public getRealCardNum():number
		{
			return this.cardManager.getCardList().length;
		}

		public removeCardsBySet(cardSet:CardSet):void
		{
			this.cardManager.removeCardsBySet(cardSet);
		}

		public refreshCardNum():void
		{
			this.cardManager.refreshCardNum();
		}

		public refreshHandCardView():void
		{
			this.cardManager.refreshHandCardView();
		}

		public clearOutCardView():void
		{
			let seatView = this.getSeatView();
			(seatView.getChildByName("outCard") as Laya.Box).removeChildren();
			(seatView.getChildByName("outCard") as Laya.Box).visible = false;
			(seatView.getChildByName("pass") as Laya.Text).visible = false;
		}

		public showOutCard(cardSet:CardSet, isSelf:boolean):void
		{
			//如果是不要
			let seatView = this.getSeatView();
			if (cardSet.getCardType() == constants.CardType.PASSED) {
				(seatView.getChildByName("pass") as Laya.Text).visible = true;
				(seatView.getChildByName("outCard") as Laya.Box).visible = false;
			} else { //否则，将cardView放入展示框
				(seatView.getChildByName("pass") as Laya.Text).visible = false;
				let outCardView = (seatView.getChildByName("outCard") as Laya.Box);
				let cardList = cardSet.getCardList();
				for (let i = 0, len = cardList.length; i < len; i++) {
					let cardView = cardList[i].getCardView();
					outCardView.addChild(cardView);
					if (isSelf) {
						cardView.x = i * 53;
						cardView.y = 0;
					} else {
						cardView.x = 0
						cardView.y = i * 31;
					}
				}
				outCardView.visible = true;
			}
		}
	}
}