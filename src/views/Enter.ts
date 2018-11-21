/**
* name 
*/
module views{
	export class Enter extends ui.enterUI{
		constructor(){
			super();
			this.single.on(Laya.Event.CLICK, this, this.enterSingle);
		}

		protected enterSingle():void
		{
			game.Room.GetInstance().startSingle();
		}
	}
}