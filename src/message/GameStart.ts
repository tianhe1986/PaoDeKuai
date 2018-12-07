/**
* name 
*/
module message{
	export class GameStart extends Base{
		public seatArr:Array<Object> = [];
		constructor(){
			super();
			this.id = constants.MessageId.GAME_START;
		}

		public writeData():void
		{
			this.content = {"seatArr":this.seatArr};
		}

		public readData():void
		{
			this.seatArr = this.content["seatArr"];
		}

		public receiveHandle():void
		{
			game.Room.GetInstance().startWithSeatArr(this.seatArr);
		}

		public mockSend():void
		{
			
		}
	}
}