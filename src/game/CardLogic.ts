/**
* name 
*/
module game{
	export class CardLogic{

		protected static instance:CardLogic;

		public static GetInstance():CardLogic
		{
			if(null == CardLogic.instance)
			{
				CardLogic.instance = new CardLogic();
			}
			return CardLogic.instance;
		}
		
		constructor(){

		}

		public calcuCardSet(cardList:Array<Card>):CardSet
		{
			return null;
		}

		public canOut(newCardSet:CardSet, nowCardSet:CardSet):boolean
		{
			return false;
		}

		//找炸弹
		public findAllBomb(cardList:Array<Card>):Array<Array<Card>>
		{
			let result = [];
			let i = 0;
			while (i <= cardList.length - 4) {
				if (cardList[i].getPoint() == cardList[i+3].getPoint()) {
					result.push(cardList.splice(i, 4));
				} else {
					i++;
				}
			}

			return result;
		}

		//找连三
		public findAllConnectThree(cardList:Array<Card>):Array<Array<Card>>
		{
			let result = [];
			let i = 0;
			while (i <= cardList.length - 6) {
				if (cardList[i].getPoint() == cardList[i+5].getPoint() - 1) { //找到第一个连对
					//继续找后面连在一起的
					let endIndex = i + 5;
					while (endIndex + 3 < cardList.length && cardList[endIndex].getPoint() == cardList[endIndex+3].getPoint() - 1) {
						endIndex += 3;
					}
					result.push(cardList.splice(i, endIndex + 1 - i));
				} else {
					i++;
				}
			}

			return result;
		}
	}
}