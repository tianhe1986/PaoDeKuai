/**
* name 
*/
module views{
	export class Room extends ui.roomUI{
		constructor(){
			super();
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

		public showCardHandleButtons():void
		{
			this.cardOutButton.visible = true;
			this.cancelButton.visible = true;
		}

		public hideCardHandleButtons():void
		{
			this.cardOutButton.visible = false;
			this.cancelButton.visible = false;
		}
	}
}