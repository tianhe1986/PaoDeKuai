/**
* name 
*/
module message{
	export abstract class Base{
		protected id:number = 0;
		protected content:Object = {};
		constructor(){

		}

		public abstract writeData():void;
		public abstract readData():void;
		public abstract receiveHandle():void;
		public abstract mockSend():void;

		public setContent(val:any):void
		{
			this.content = val;
		}

		public getContent():any
		{
			return this.content;
		}

		public getMessageId():number
		{
			return this.id;
		}
	}
}