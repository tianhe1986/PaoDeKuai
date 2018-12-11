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
						if (threePoints.length == cardList.length / 5 && this.isStraight(threePoints) && threePoints[threePoints.length - 1].getPoint() != 15) {
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

		public hasLarge(cardList:Array<Card>, cardSet:CardSet):boolean
		{
			cardList.sort((a:Card, b:Card) => { //从小到大排序
				return a.getCardId() - b.getCardId();
			});
			let findAllLastCard = this.findAllLastCard(cardList, 4);
			let cardType = cardSet.getCardType();
			let point = cardSet.getPoint();
			let cardCount = cardSet.getCardList().length;
			if (findAllLastCard.length) { //有炸弹
				if (cardType == constants.CardType.BOMB) {
					if (findAllLastCard[findAllLastCard.length - 1].getPoint() > point) {
						return true;
					}
					return false;
				} else {
					return true;
				}
			}

			if (cardList.length < cardCount) { //牌数量不够
				return false;
			}

			if (cardType == constants.CardType.BOMB) { //碰上炸弹了
				
			} else if (cardType == constants.CardType.SINGLE) { //单张，有一个大的
				if (cardList[cardList.length - 1].getPoint() > point) {
					return true;
				}
			} else if (cardType == constants.CardType.DOUBLE) { //两张，有一个大的
				findAllLastCard = this.findAllLastCard(cardList, 2);
				if (findAllLastCard.length && findAllLastCard[findAllLastCard.length - 1].getPoint() > point) {
					return true;
				}
			} else if (cardType == constants.CardType.THREE_TWO) { //三带二，有一个大的
				findAllLastCard = this.findAllLastCard(cardList, 3);
				if (findAllLastCard.length && findAllLastCard[findAllLastCard.length - 1].getPoint() > point) {
					return true;
				}
			} else if (cardType == constants.CardType.CONNECT_DOUBLE) { //姊妹对
				findAllLastCard = this.findAllLastCard(cardList, 2);
				if (this.hasStraight(findAllLastCard, point, cardSet.getConnectNum())) {
					return true;
				}
			} else if (cardType == constants.CardType.STRAIGHT) { //顺子
				if (this.hasStraight(cardList, point, cardSet.getConnectNum())) {
					return true;
				}
			} else if (cardType == constants.CardType.CONNECT_THREE) { //连续三带二
				findAllLastCard = this.findAllLastCard(cardList, 3);
				if (this.hasStraight(findAllLastCard, point, cardSet.getConnectNum())) {
					return true;
				}
			}

			return false;
		}

		public hasStraight(cardList:Array<Card>, point:number, count:number):boolean
		{
			if (cardList.length) {
				let nowCount = 0;
				let nowPoint = 0;
				for (let i = 0, len = cardList.length; i < len; i++) {
					let tempPoint = cardList[i].getPoint();
					if (tempPoint <= point || tempPoint == 15) {
						continue;
					}
					if (tempPoint == nowPoint) {
						continue;
					} else if (tempPoint == nowPoint + 1) {
						nowCount++;
						if (nowCount == count) {
							return true;
						}
						nowPoint = tempPoint;
					} else {
						nowCount = 1;
						nowPoint = tempPoint;
					}
				}
			}

			return false;
		}

		public findMinStraight(cardList:Array<Card>, point:number, count:number):CardSet
		{
			if (cardList.length) {
				let nowList:Array<Card> = [];
				let nowCount = 0;
				let nowPoint = 0;
				for (let i = 0, len = cardList.length; i < len; i++) {
					let tempPoint = cardList[i].getPoint();
					if (tempPoint <= point || tempPoint == 15) {
						continue;
					}
					if (tempPoint == nowPoint) {
						continue;
					} else if (tempPoint == nowPoint + 1) {
						nowCount++;
						nowList.push(cardList[i]);
						if (nowCount == count) {
							let newCardSet = new CardSet();
							newCardSet.setCardType(constants.CardType.STRAIGHT);
							newCardSet.setCardList(nowList);
							newCardSet.setPoint(nowList[0].getPoint());
							newCardSet.setMinPoint(nowList[0].getPoint());
							newCardSet.setConnectNum(count);
							return newCardSet;
						}
						nowPoint = tempPoint;
					} else {
						nowCount = 1;
						nowList = [cardList[i]];
						nowPoint = tempPoint;
					}
				}
			}

			return null;
		}

		public findMinConnectTwo(cardList:Array<Card>, point:number, count:number):CardSet
		{
			if (cardList.length) {
				let nowList:Array<Card> = [];
				let nowCount = 0;
				let nowPoint = 0;
				let step = 1;
				for (let i = 0, len = cardList.length; i < len; i++) {
					let tempPoint = cardList[i].getPoint();
					if (tempPoint <= point || tempPoint < nowPoint || tempPoint == 15) {
						continue;
					}
					if (tempPoint == nowPoint) {
						nowList.push(cardList[i]);
						if (step == 2) {
							nowPoint++;
							nowCount++;
							if (nowCount == count) {
								let newCardSet = new CardSet();
								newCardSet.setCardType(constants.CardType.CONNECT_DOUBLE);
								newCardSet.setCardList(nowList);
								newCardSet.setPoint(nowList[0].getPoint());
								newCardSet.setMinPoint(nowList[0].getPoint());
								newCardSet.setConnectNum(count);
								return newCardSet;
							}
							step = 1;
						} else {
							step = 2;
						}
					} else {
						nowCount = 0;
						nowList = [cardList[i]];
						nowPoint = tempPoint;
						step = 2;
					}
				}
			}

			return null;
		}

		public findMinThreeTwo(cardList:Array<Card>, point:number):CardSet
		{
			if (cardList.length) {
				let nowList:Array<Card> = [];
				for (let i = 0, len = cardList.length; i < len - 2; i++) {
					let tempPoint = cardList[i].getPoint();
					if (tempPoint <= point) {
						continue;
					}
					if (cardList[i + 2].getPoint() == tempPoint) {
						nowList = [cardList[i], cardList[i+1], cardList[i+2]];
						let num = 0, j = 0;
						while (num < 2 && j < len) {
							if (cardList[j].getPoint() != tempPoint) {
								nowList.push(cardList[j]);
								num++;
							}
							j++;
						}
						if (num == 2) {
							let newCardSet = new CardSet();
							newCardSet.setCardType(constants.CardType.THREE_TWO);
							newCardSet.setCardList(nowList);
							newCardSet.setPoint(nowList[0].getPoint());
							return newCardSet;
						}
						break;
					}
				}
			}

			return null;
		}

		public findMinConnectThree(cardList:Array<Card>, point:number, count:number):CardSet
		{
			if (cardList.length) {
				let nowList:Array<Card> = [];
				let nowCount = 0;
				let nowPoint = 0;
				let step = 1;
				for (let i = 0, len = cardList.length; i < len; i++) {
					let tempPoint = cardList[i].getPoint();
					if (tempPoint <= point || tempPoint < nowPoint || tempPoint == 15) {
						continue;
					}
					if (tempPoint == nowPoint) {
						nowList.push(cardList[i]);
						if (step == 3) {
							nowPoint++;
							nowCount++;
							if (nowCount == count) {
								//塞些其他东西进去
								let num = 0, j = 0, needNum = count + count;
								while (num < needNum && j < len) {
									if (cardList[j].getPoint() <= point || cardList[j].getPoint() >= nowPoint) {
										nowList.push(cardList[j]);
										num++;
									}
									j++;
								}
								if (num == needNum) {
									let newCardSet = new CardSet();
									newCardSet.setCardType(constants.CardType.CONNECT_THREE);
									newCardSet.setCardList(nowList);
									newCardSet.setPoint(nowList[0].getPoint());
									newCardSet.setConnectNum(count);
									return newCardSet;
								}
								//这里没有,那之后也没有了
								break;
							}
							step = 1;
						} else {
							step++;
						}
					} else {
						nowCount = 0;
						nowList = [cardList[i]];
						nowPoint = tempPoint;
						step = 2;
					}
				}
			}

			return null;
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
				if (cardList[i].getPoint() == cardList[i+5].getPoint() - 1 && cardList[i+5].getPoint() != 15) { //找到第一个连对
					//继续找后面连在一起的
					let endIndex = i + 5;
					while (endIndex + 3 < cardList.length && cardList[endIndex].getPoint() == cardList[endIndex+3].getPoint() - 1 && cardList[endIndex+3].getPoint() != 15) {
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