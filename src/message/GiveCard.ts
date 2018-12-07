/**
* name 
*/
module message{
	export class GiveCard extends Base{
		public cardIds:Array<number> = [];
		public seatId:number = 0;
		public cardNum:number = 0;
		constructor(){
			super();
			this.id = constants.MessageId.GIVE_CARD;
		}

		public writeData():void
		{
			this.content["seatId"] = this.seatId;
			this.content["cardNum"] = this.cardNum;
			this.content["cardIds"] = this.cardIds;
		}

		public readData():void
		{
			this.seatId = this.content["seatId"];
			this.cardNum = this.content["cardNum"];
			this.cardIds = this.content["cardIds"];
		}

		public receiveHandle():void
		{
			//console.log(this.seatId, this.cardNum, this.cardIds);
			let mySeatId = game.Room.GetInstance().getMySeatId();
			let seat = game.Room.GetInstance().getSeat(this.seatId);
			if (this.seatId == mySeatId) {
				seat.refreshCard(this.cardIds);
			} else {
				seat.setCardNum(this.cardNum);
			}
			seat.refreshSeatInfo();
		}

		public mockSend():void
		{
			
		}
	}
}