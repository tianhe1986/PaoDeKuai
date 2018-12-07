/**
* name 
*/
module message{
	export class HeartReq extends Base{
		constructor(){
			super();
			this.id = constants.MessageId.HEART_REQ;
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