/**
* name 
*/
module views{
	export class Room extends ui.roomUI{
		constructor(){
			super();
			this.initButtons();
			this.initResult();
			this.initPunish();
		}

		public initButtons():void
		{
			this.cardOutButton.on(Laya.Event.CLICK, this, this.onCardOut);
			this.passButton.on(Laya.Event.CLICK, this, this.onPass);
		}

		public initResult():void
		{
			(this.result.getChildByName("resultList") as Laya.List).renderHandler = new Laya.Handler(this, this.resultItem);
			this.result.getChildByName("confirm").on(Laya.Event.CLICK, this, this.onRestart);
		}

		public initPunish():void
		{
			this.punish.getChildByName("confirm").on(Laya.Event.CLICK, this, this.hidePunish);
		}

		public resultItem(cell:Laya.Box,index:number):void
		{
			let arr = (this.result.getChildByName("resultList") as Laya.List).array;
			if (index >= arr.length) {
				return;
			}

			(cell.getChildByName("nickname") as Laya.Text).text = arr[index][0];
			(cell.getChildByName("score") as Laya.Text).text = arr[index][1];
		}

		public onCardOut():void
		{
			game.Room.GetInstance().confirmCardOut();
		}

		public onPass():void
		{
			game.Room.GetInstance().pass();
		}


		public showTips(str:string):void
		{
			this.tips.text = str;
		}

		public showCardOut():void
		{
			this.cardOutButton.visible = true;
		}

		public hideCardOut():void
		{
			this.cardOutButton.visible = false;
		}

		public hidePass():void
		{
			this.passButton.visible = false;
		}

		public showCardHandleButtons():void
		{
			this.cardOutButton.visible = true;
			this.passButton.visible = true;
		}

		public hideCardHandleButtons():void
		{
			this.cardOutButton.visible = false;
			this.passButton.visible = false;
		}

		public onRestart():void
		{
			this.clearAll();
			game.GameLogic.GetInstance().startGame();
		}

		public showResult(winner:string, resultList:Array<any>):void
		{
			(this.result.getChildByName("resultList") as Laya.List).array = resultList;
			(this.result.getChildByName("winner") as Laya.Text).text = winner;

			this.showMock();
			this.result.visible = true;
		}

		public showMock():void
		{
			this.mock.visible = true;
		}

		public hideMock():void
		{
			this.mock.visible = false;
		}

		public clearAll():void
		{
			this.result.visible = false;
			this.hideMock();
			this.hideCardHandleButtons();
			this.hidePunish();
			this.showTips("");
			this.handCard.removeChildren();
			(this.mySeat.getChildByName("outCard") as Laya.Box).visible = false;
			(this.mySeat.getChildByName("pass") as Laya.Text).visible = false;
			(this.leftSeat.getChildByName("outCard") as Laya.Box).visible = false;
			(this.leftSeat.getChildByName("pass") as Laya.Text).visible = false;
			(this.rightSeat.getChildByName("outCard") as Laya.Box).visible = false;
			(this.rightSeat.getChildByName("pass") as Laya.Text).visible = false;
		}

		public showPunish(score:number):void
		{
			this.showMock();
			(this.punish.getChildByName("score") as Laya.Text).text = "" + score;
			this.punish.visible = true;
		}

		public hidePunish():void
		{
			this.hideMock();
			this.punish.visible = false;
		}
	}
}