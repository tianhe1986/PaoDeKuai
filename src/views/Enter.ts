/**
* name 
*/
module views{
	export class Enter extends ui.enterUI{
		constructor(){
			super();
			this.ruleText.text = constants.GameInfo.info;
			this.single.on(Laya.Event.CLICK, this, this.enterSingle);
			this.rule.on(Laya.Event.CLICK, this, this.showRule);
			this.ruleClose.on(Laya.Event.CLICK, this, this.hideRule);
		}

		protected enterSingle():void
		{
			game.Room.GetInstance().startSingle();
		}

		public showRule():void
		{
			this.mock.visible = true;
			this.ruleBox.visible = true;
		}

		public hideRule():void
		{
			this.mock.visible = false;
			this.ruleBox.visible = false;
		}
	}
}