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
			let cardSet = new CardSet();
			cardSet.setCardType(constants.CardType.ERROR);
			
			if (cardList.length == 0) { //未选中牌，接下来的都不用算了
				return cardSet;
			}

			cardList.sort((a:Card, b:Card) => { //从小到大排序
				return a.getCardId() - b.getCardId();
			});

			//默认是错误
			let cardType = constants.CardType.ERROR;
			let cardCount = cardList.length;
			let connectNum = 1;
			let point = cardList[0].getPoint();
			if (cardCount == 1) { //一张牌，没啥说的
				cardType = constants.CardType.SINGLE;
			} else if (cardCount == 2) { //两张牌，只可能是对子
				if (cardList[0].getPoint() == cardList[1].getPoint()) {
					cardType = constants.CardType.DOUBLE;
				}
			} else if (cardCount == 4) { //姊妹对或炸弹
				if (cardList[0].getPoint() == cardList[1].getPoint() && cardList[2].getPoint() == cardList[3].getPoint()) { //前两个与后两个都不相等的话，没搞头了
					if (cardList[1].getPoint() == cardList[2].getPoint()) { //炸弹
						cardType = constants.CardType.BOMB;
					} else if (cardList[1].getPoint() + 1 == cardList[2].getPoint() && cardList[2].getPoint() != 15) { //姊妹对
						cardType = constants.CardType.CONNECT_DOUBLE;
						connectNum = 2;
					}
				}
			} else if (cardCount == 5) { //三带二或顺子
				let threePoints = this.findAllLastCard(cardList, 3);
				if (threePoints.length) {
					cardType = constants.CardType.THREE_TWO;
					point = threePoints[0].getPoint();
					this.sortWithPoint(cardList, point, point);
				} else {
					if (this.isStraight(cardList) && cardList[cardList.length - 1].getPoint() != 15) {
						cardType = constants.CardType.STRAIGHT;
						connectNum = cardList.length;
					}
				}
			} else if (cardCount > 5){
				while (true) { //只可能是连续三带二，顺子，或姊妹对
					if (cardList.length % 5 == 0) { //三带二
						let threePoints = this.findAllLastCard(cardList, 3);
						if (threePoints.length == cardList.length / 5 && this.isStraight(threePoints)) {
							cardType = constants.CardType.CONNECT_THREE;
							point = threePoints[0].getPoint();
							connectNum = cardList.length / 5;
							this.sortWithPoint(cardList, point, point + connectNum - 1);
							break;
						}
					}

					if (cardList.length % 2 == 0) { //姊妹对
						let twoPoints = this.findAllLastCard(cardList, 2);
						if (twoPoints.length == cardList.length / 2 && this.isStraight(twoPoints) && twoPoints[twoPoints.length - 1].getPoint() != 15) {
							cardType = constants.CardType.CONNECT_DOUBLE;
							point = twoPoints[0].getPoint();
							connectNum = cardList.length / 2;
							this.sortWithPoint(cardList, point, point + connectNum - 1);
							break;
						}
					}

					if (this.isStraight(cardList) && cardList[cardList.length - 1].getPoint() != 15) {
						cardType = constants.CardType.STRAIGHT;
						connectNum = cardList.length;
					}
					break;
				}
			}
			
			cardSet.setCardType(cardType);
			cardSet.setCardList(cardList);
			cardSet.setPoint(point);
			cardSet.setConnectNum(connectNum);
			return cardSet;
		}

		//对于所有存在samePointNum张点数相同的，把最后一张放入结果数组
		public findAllLastCard(cardList:Array<Card>, samePointNum:number):Array<Card>
		{
			let result = [];
			let nowNum = 1;
			let nowPoint = 0;
			for (let i = 0, len = cardList.length; i < len; i++) {
				if (cardList[i].getPoint() != nowPoint) { //不相等，重新开始计算
					nowNum = 1;
					nowPoint = cardList[i].getPoint();
				} else {
					nowNum++;
					if (nowNum == samePointNum) {
						result.push(cardList[i]);
						nowNum = 1;
						nowPoint = 0;
					}
				}
			}

			return result;
		}

		public isStraight(cardList:Array<Card>):boolean
		{
			for (let i = 0, len = cardList.length; i < len - 1; i++) {
				if (cardList[i].getPoint() + 1 != cardList[i+1].getPoint()) {
					return false;
				}
			}

			return true;
		}

		public sortWithPoint(cardList:Array<Card>, minPoint:number, maxPoint:number):void
		{
			cardList.sort((a:Card, b:Card) => { //从小到大排序
				let pointa = a.getPoint();
				let pointb = b.getPoint();
				let ainrange:boolean = (pointa >= minPoint && pointa <= maxPoint);
				let binrange:boolean = (pointb >= minPoint && pointb <= maxPoint);
				if (ainrange) {
					if (binrange) {
						return a.getCardId() - b.getCardId();
					} else {
						return -1;
					}
				} else {
					if (binrange) {
						return 1;
					} else {
						return a.getCardId() - b.getCardId();
					}
				}
			});
		}

		public canOut(newCardSet:CardSet, nowCardSet:CardSet):boolean
		{
			if (newCardSet.getCardType() == constants.CardType.ERROR) { //错误牌型，不让出
				return false;
			}

			if (nowCardSet.getCardType() == constants.CardType.INIT) { //首出
				return true;
			}

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