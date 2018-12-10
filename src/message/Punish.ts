/**
* name 
*/
module message{
	export class Punish extends Base{
		public score:number; //惩罚分
		public seatId:number; //惩罚的座位

		constructor(){
			super();
			this.id = constants.MessageId.PUNISH;
		}

		public writeData():void
		{
			this.content["seatId"] = this.seatId;
			this.content["score"] = this.score;
		}

		public readData():void
		{
			this.seatId = this.content["seatId"];
			this.score = this.content["score"];
		}

		public receiveHandle():void
		{
			game.Room.GetInstance().handlePunish(this.seatId, this.score);
		}

		public mockSend():void
		{
			
		}
	}
}