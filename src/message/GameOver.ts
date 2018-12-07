/**
* name 
*/
module message{
	export class GameOver extends Base{
		constructor(){
			super();
			this.id = constants.MessageId.GAME_OVER;
		}

		public writeData():void
		{

		}

		public readData():void
		{

		}

		public receiveHandle():void
		{
			
		}
		public mockSend():void
		{
			
		}
	}
}