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
			//TODO: 真的计算
			let cardSet = new CardSet();
			cardSet.setCardType(constants.CardType.SINGLE);
			cardSet.setCardList(cardList);
			cardSet.setPoint(3);
			return cardSet;
		}

		public canOut(newCardSet:CardSet, nowCardSet:CardSet):boolean
		{
			//牌型相同
			if (newCardSet.getCardType() == nowCardSet.getCardType()) {
				if (newCardSet.getConnectNum() == nowCardSet.getConnectNum() && newCardSet.getPoint() > nowCardSet.getPoint()) {
					return true;
				}
			} else {
				//炸弹可以出
				if (newCardSet.getCardType() == constants.CardType.BOMB) {
					return true;
				}
			}

			return true;
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

		//三张
		public findAllThree(cardList:Array<Card>):Array<Array<Card>>
		{
			let result = [];
			let i = 0;
			while (i <= cardList.length - 3) {
				if (cardList[i].getPoint() == cardList[i+2].getPoint()) {
					result.push(cardList.splice(i, 3));
				} else {
					i++;
				}
			}

			return result;
		}

		//找姊妹对
		public findAllConnectTwo(cardList:Array<Card>):Array<Array<Card>>
		{
			let result = [];
			let i = 0;
			while (i <= cardList.length - 4) {
				if (cardList[i].getPoint() == cardList[i+3].getPoint() - 1) { //找到第一个姊妹对
					//继续找后面连在一起的
					let endIndex = i + 3;
					while (endIndex + 2 < cardList.length && cardList[endIndex].getPoint() == cardList[endIndex+2].getPoint() - 1) {
						endIndex += 2;
					}
					result.push(cardList.splice(i, endIndex + 1 - i));
				} else {
					i++;
				}
			}

			return result;
		}

		//找顺子
		public findAllStraight(cardList:Array<Card>):Array<Array<Card>>
		{
			let result = [];
			let i = 0;
			let j;
			let count:number = 0;
			let needPoint:number,tempPoint:number;
			let tempList:Array<Card>;
			let removeList:Array<Card> = [];
			while (i <= cardList.length - 5) {
				tempList = [];
				needPoint = cardList[i].getPoint() + 1;
				tempList.push(cardList[i]);
				if (needPoint >= 12) { //J开头,没啥搞头了
					break;
				}
				count = 1;
				j = i + 1;
				while (j < cardList.length) {
					tempPoint = cardList[j].getPoint();
					if (tempPoint < needPoint) { //还没到,继续
						j++;
					} else if (tempPoint == needPoint) { //就是当前要的
						tempList.push(cardList[j])
						count++;
						if (count == 5) {
							result.push(tempList.slice());
							removeList = removeList.concat(tempList);
							i = j + 1;
							break;
						}
						needPoint++;
						j++;
					} else { //超了, 从j开始重新找
						i = j;
						break;
					}
				}
				if (j == cardList.length) {
					break;
				}
			}

			//移除处理
			i = 0;
			j = 0;
			while (i < cardList.length && j < removeList.length) {
				let leftId = cardList[i].getCardId();
				let rightId = removeList[j].getCardId();
				if (leftId < rightId) {
					i++;
				} else if (leftId > rightId) {
					j++;
				} else {
					cardList.splice(i, 1);
					j++;
				}
			}

			//把剩下可加的加进去
			i = 0;
			j = 0;
			while (i < cardList.length && j < result.length) {
				let nowNeedPoint = result[j][result[j].length - 1].getPoint() + 1;
				if (nowNeedPoint >= 15) {
					break;
				}
				let nowPoint = cardList[i].getPoint();
				if (nowPoint < nowNeedPoint) {
					i++;
				} else if (nowPoint == nowNeedPoint) {
					result[j].push(cardList[i]);
					cardList.splice(i, 1);
				} else {
					j++;
				}
			}

			return result;
		}

		//两张
		public findAllTwo(cardList:Array<Card>):Array<Array<Card>>
		{
			let result = [];
			let i = 0;
			while (i <= cardList.length - 2) {
				if (cardList[i].getPoint() == cardList[i+1].getPoint()) {
					result.push(cardList.splice(i, 2));
				} else {
					i++;
				}
			}

			return result;
		}
	}
}