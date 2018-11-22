/**
* name 
*/
module game{
	export class Card{
		//卡牌id
		protected cardId:number = 0;

		//卡牌图片视图
		protected cardImage:Laya.Image;

		//卡牌点数
		protected point:number = 0;

		constructor(){
			this.cardImage = new Laya.Image();
			this.cardImage.width = 105;
			this.cardImage.height = 150;
		}

		public getCardView():Laya.Image
		{
			return this.cardImage;
		}

		public setCardId(val:number):void
		{
			this.cardId = val;
			this.point = Math.ceil(val/4) + 2;
			this.cardImage.skin = "card/" + val + ".jpg";
		}

		public getCardId():number
		{
			return this.cardId;
		}

		public getPoint():number
		{
			return this.point;
		}
	}
}