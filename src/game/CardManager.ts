/**
* name 
*/
module game{
	export class CardManager{
		//牌数量
		protected cardNum:number = 0;

		//牌列表
		protected cardList:Array<Card> = [];

		//牌型列表, 用于AI辅助计算
		protected cardSetList:Array<CardSet> = [];

		//牌型set，便于快速查询
		protected cardSetMap:Object = {};

		constructor(){

		}

		public getCardList():Array<Card>
		{
			return this.cardList;
		}

		public getCardNum():number
		{
			return this.cardNum;
		}

		public setCardNum(val:number):void
		{
			this.cardNum = val;
		}

		public getAvailableCard():Card
		{
			//TODO: 使用poolManager
			return new Card();
		}

		public refreshCard(cardIds:Array<number>, isSelf:boolean = false):void
		{
			for (let i = 0, len = this.cardList.length; i < len; i++) {
				this.cardList[i].recover();
			}
			this.cardList = [];
			this.cardSetList = [];

			for (let i = 0, len = cardIds.length; i < len; i++) {
				let newCard = this.getAvailableCard();
				newCard.setCardId(cardIds[i]);
				this.cardList.push(newCard);
			}
			this.sortCardList();
			this.setCardNum(cardIds.length);

			if (isSelf) {
				this.refreshHandCardView();
			} else {
				this.calcuCardSet();
			}
		}

		public sortCardList():void
		{
			this.cardList.sort((a:Card, b:Card) => {
				return b.getCardId() - a.getCardId();
			});
		}

		public refreshHandCardView():void
		{
			let handCardView = PageManager.GetInstance().getRoomView().handCard;
			//简单粗暴的清除重绘，之后再优化
			handCardView.removeChildren();
			for (let i = 0, len = this.cardList.length; i < len; i++) {
				this.cardList[i].recover();
				this.cardList[i].bindClick();
				let cardView = this.cardList[i].getCardView();
				handCardView.addChild(cardView);
				cardView.y = 0;
				cardView.x = i * 53;
			}
		}

		public clearCardSet():void
		{
			this.cardSetList = [];
			this.cardSetMap = {};
		}

		public calcuCardSet():void
		{
			this.clearCardSet();
			let cardLogic = CardLogic.GetInstance();
			let tempCardList = this.cardList.slice();
			//按从小到大排序
			tempCardList.sort((a:Card, b:Card) => {
				return a.getCardId() - b.getCardId();
			});
			//炸弹
			let bombList = cardLogic.findAllBomb(tempCardList);
			//连续三张
			let connectThreeList = cardLogic.findAllConnectThree(tempCardList);
			//三张
			let threeList = cardLogic.findAllThree(tempCardList);
			//姊妹对
			let connectTwoList = cardLogic.findAllConnectTwo(tempCardList);
			//顺子
			let straightList = cardLogic.findAllStraight(tempCardList);
			//单对
			let twoList = cardLogic.findAllTwo(tempCardList);
			//剩下的都是单张
			let singleList = new Array<Array<Card>>();
			for (let i = 0; i < tempCardList.length; i++) {
				singleList.push([tempCardList[i]]);
			}
			//炸弹直接加入
			this.directInsert(bombList, constants.CardType.BOMB);
			//三张，优先配两个单张，再配单对，配不了了则拆
			let i:number = 0;
			while (i < connectThreeList.length) {
				if (twoList.length * 2 + singleList.length >= 2 * connectThreeList[i].length / 3) { //两张 + 单对数量够了,组合在一起
					let insertList = connectThreeList[i].slice();
					let needLen:number = connectThreeList[i].length / 3 * 5;
					let point:number = connectThreeList[i][0].getPoint();
					let minPoint:number = point;
					while (insertList.length < needLen && singleList.length >= 2) {
						let tempCalcuList = singleList.splice(0, 2);
						insertList.push(tempCalcuList[0][0]);
						insertList.push(tempCalcuList[1][0]);
						if (tempCalcuList[0][0].getPoint() < minPoint) {
							minPoint = tempCalcuList[0][0].getPoint();
						}
					}
					while (insertList.length < needLen && twoList.length) {
						let tempCalcuList = twoList.splice(0, 1);
						insertList.push(tempCalcuList[0][0]);
						insertList.push(tempCalcuList[0][1]);
						if (tempCalcuList[0][0].getPoint() < minPoint) {
							minPoint = tempCalcuList[0][0].getPoint();
						}
					}

					let newCardSet = new CardSet();
					newCardSet.setCardType(constants.CardType.CONNECT_THREE);
					newCardSet.setCardList(insertList);
					newCardSet.setPoint(point);
					newCardSet.setConnectNum(needLen/5);
					newCardSet.setMinPoint(minPoint);
					this.cardSetList.push(newCardSet);
					if (this.cardSetMap[constants.CardType.CONNECT_THREE] == undefined) {
						this.cardSetMap[constants.CardType.CONNECT_THREE] = [];
					}
					this.cardSetMap[constants.CardType.CONNECT_THREE].push(newCardSet);
					i++;
				} else { //不够,直接拆了,TODO: 优化,考虑拆顺子,连对,和其他三张,第一版电脑当然是蠢的
					let handleList = connectThreeList[i].slice();
					connectThreeList.splice(i, 1);
					while (handleList.length) {
						twoList.push(handleList.splice(0, 2));
						singleList.push(handleList.splice(0, 1));
					}
				}
			}

			i = 0;
			while (i < threeList.length) {
				if (twoList.length * 2 + singleList.length >= 2) { //两张 + 单对数量够了,组合在一起
					let insertList = threeList[i].slice();
					let needLen:number = 5;
					let point:number = threeList[i][0].getPoint();
					let minPoint:number = point;
					while (insertList.length < needLen && singleList.length >= 2) {
						let tempCalcuList = singleList.splice(0, 2);
						insertList.push(tempCalcuList[0][0]);
						insertList.push(tempCalcuList[1][0]);
						if (tempCalcuList[0][0].getPoint() < minPoint) {
							minPoint = tempCalcuList[0][0].getPoint();
						}
					}
					while (insertList.length < needLen && twoList.length) {
						let tempCalcuList = twoList.splice(0, 1);
						insertList.push(tempCalcuList[0][0]);
						insertList.push(tempCalcuList[0][1]);
						if (tempCalcuList[0][0].getPoint() < minPoint) {
							minPoint = tempCalcuList[0][0].getPoint();
						}
					}

					let newCardSet = new CardSet();
					newCardSet.setCardType(constants.CardType.THREE_TWO);
					newCardSet.setCardList(insertList);
					newCardSet.setPoint(point);
					newCardSet.setMinPoint(minPoint);
					this.cardSetList.push(newCardSet);
					if (this.cardSetMap[constants.CardType.THREE_TWO] == undefined) {
						this.cardSetMap[constants.CardType.THREE_TWO] = [];
					}
					this.cardSetMap[constants.CardType.THREE_TWO].push(newCardSet);
					i++;
				} else { //不够,直接拆了,TODO: 优化,考虑拆顺子,连对
					let handleList = threeList[i].slice();
					threeList.splice(i, 1);
					while (handleList.length) {
						twoList.push(handleList.splice(0, 2));
						singleList.push(handleList.splice(0, 1));
					}
				}
			}

			//其他的没啥好说的,直接往里塞
			this.directInsert(connectTwoList, constants.CardType.CONNECT_DOUBLE);
			this.directInsert(straightList, constants.CardType.STRAIGHT);
			this.directInsert(twoList, constants.CardType.DOUBLE);
			this.directInsert(singleList, constants.CardType.SINGLE);

			//按最小点数排序
			this.cardSetList.sort((a:CardSet, b:CardSet) => {
				let typea = a.getCardType();
				let typeb = b.getCardType();

				if (typea <= 2 && typeb <= 2) {
					return a.getMinPoint() - b.getMinPoint();
				}

				let subResult = b.getCardType() - a.getCardType();
				return subResult == 0 ? a.getMinPoint() - b.getMinPoint() : subResult;
				//return a.getMinPoint() - b.getMinPoint();
			});

			//this.printCardSetList();
			/*this.printCardList(bombList, "bomb");
			this.printCardList(connectThreeList, "connectThree");
			this.printCardList(threeList, "three");
			this.printCardList(connectTwoList, "connectTwo");
			this.printCardList(straightList, "straight");
			this.printCardList(twoList, "twoList");
			this.printCardList(singleList, "single");*/
		}

		protected printCardSetList():void
		{
			for (let i = 0, len = this.cardSetList.length; i < len; i++) {
				this.printCardSet(this.cardSetList[i]);
			}
		}

		protected printCardSet(cardSet:CardSet):void
		{
			
			let cardType = cardSet.getCardType();
			let cardTypeStr:string = constants.CardType.getTypeName(cardType);
			console.log("--------------------------user card begin " + cardTypeStr +"----------------------------");
			//console.log("connect num " + cardSet.getConnectNum());
			console.log("point " + cardSet.getPoint());
			console.log("min point " + cardSet.getMinPoint());
			let idList:Array<number> = [];
			let pointList:Array<number> = [];
			let cardList = cardSet.getCardList();
			for (let i = 0, len = cardList.length; i < len; i++) {
				idList.push(cardList[i].getCardId());
				pointList.push(cardList[i].getPoint());
			}
			console.log("id " + JSON.stringify(idList));
			console.log("point " + JSON.stringify(pointList));
			console.log("--------------------------user card end " + cardTypeStr +"----------------------------\n");
		}

		protected directInsert(handleList:Array<Array<Card>>, cardType:number):void
		{
			for (let i = 0, len = handleList.length; i < len; i++) {
				let newCardSet = new CardSet();
				newCardSet.setCardType(cardType);
				newCardSet.setCardList(handleList[i]);
				newCardSet.setPoint(handleList[i][0].getPoint());
				newCardSet.setMinPoint(handleList[i][0].getPoint());
				if (cardType == constants.CardType.CONNECT_DOUBLE) {
					newCardSet.setConnectNum(handleList[i].length /2);
				} else if (cardType == constants.CardType.STRAIGHT) {
					newCardSet.setConnectNum(handleList[i].length);
				} 
				this.cardSetList.push(newCardSet);
				if (this.cardSetMap[cardType] == undefined) {
					this.cardSetMap[cardType] = [];
				}
				this.cardSetMap[cardType].push(newCardSet);
			}
		}

		protected printCardList(cardBaseList:Array<Array<Card>>, cardType:string = ""):void
		{
			console.log("--------------------------user card begin " + cardType +"----------------------------");
			for (let i = 0, len = cardBaseList.length; i < len; i++) {
				let pointList:Array<number> = [];
				let idList:Array<number> = [];
				for (let j = 0, cardLen = cardBaseList[i].length; j < cardLen; j++) {
					idList.push(cardBaseList[i][j].getCardId());
					pointList.push(cardBaseList[i][j].getPoint());
				}
				console.log("id " + JSON.stringify(idList));
				console.log("point " + JSON.stringify(pointList));
			}
			console.log("--------------------------user card end " + cardType +"----------------------------");
		}

		public getSelectCardList():Array<Card>
		{
			let result:Array<Card> = [];
			for (let i = 0, len = this.cardList.length; i < len; i++) {
				if (this.cardList[i].getIsSelect()) {
					result.push(this.cardList[i]);
				}
			}

			return result;
		}

		public clearSelectCards():void
		{
			for (let i = 0, len = this.cardList.length; i < len; i++) {
				this.cardList[i].setIsSelect(false);
			}
		}

		public removeCard(cardId:number):void
		{
			for (let i = 0, len = this.cardList.length; i < len; i++) {
				if (this.cardList[i].getCardId() == cardId) {
					this.cardList.splice(i, 1);
					break;
				}
			}
		}

		public removeCardsBySet(cardSet:CardSet):void
		{
			let cardList = cardSet.getCardList();
			for (let i = 0, len = cardList.length; i < len; i++) {
				this.removeCard(cardList[i].getCardId());
			}
		}

		public refreshCardNum():void
		{
			this.setCardNum(this.cardList.length);
		}

		public calcuOutCardSet(superCardSet:CardSet):CardSet
		{
			if (superCardSet.getCardType() == constants.CardType.INIT) {
				//这里没有考虑下家的牌情况,TODO: 考虑下家张数
				for (let i = 0, len = this.cardSetList.length; i < len; i++) {
					if (this.cardSetList[i].getCardType() != constants.CardType.BOMB) {
						let cardSet = this.cardSetList[i];
						this.removeCardsBySet(cardSet);
						//重新计算牌型
						this.calcuCardSet();
						return cardSet;
					}
				}
				let cardSet = this.cardSetList[0];
				this.removeCardsBySet(cardSet);
				//重新计算牌型
				this.calcuCardSet();
				return cardSet;
			} else {
				if ( ! CardLogic.GetInstance().hasLarge(this.cardList, superCardSet)) { //没有大的，只能跳过
					let cardSet = new CardSet();
					cardSet.setCardType(constants.CardType.PASSED);
					return cardSet;
				}

				//有相同类型的牌，最好不过，不用拆
				for (let i = 0; i < this.cardSetList.length; i++) {
					if (this.cardSetList[i].getCardType() == superCardSet.getCardType()
						&& this.cardSetList[i].getConnectNum() == superCardSet.getConnectNum()
						&& this.cardSetList[i].getPoint() > superCardSet.getPoint()
					) {
						let cardSet = this.cardSetList[i];
						this.removeCardsBySet(cardSet);
						//重新计算牌型
						this.calcuCardSet();
						return cardSet;
					}
				}

				//根据不同的牌，找最适合出的
				let point = superCardSet.getPoint();
				switch (superCardSet.getCardType()) {
					case constants.CardType.SINGLE: //单牌:顺子里多的一张，一对，三带二里的一张，选最大的一张
						if (this.cardSetMap[constants.CardType.STRAIGHT] != undefined) {
							for (let i = 0; i < this.cardSetMap[constants.CardType.STRAIGHT].length; i++) {
								if (this.cardSetMap[constants.CardType.STRAIGHT][i].getConnectNum() > 5 && this.cardSetMap[constants.CardType.STRAIGHT][i].getPoint() > point) {
									let cardSet = this.buildSingleByCard(this.cardSetMap[constants.CardType.STRAIGHT][i].getCardList()[0]);
									this.removeCardsBySet(cardSet);
									this.calcuCardSet();
									return cardSet;
								}
							}
						}

						if (this.cardSetMap[constants.CardType.DOUBLE] != undefined) {
							for (let i = 0; i < this.cardSetMap[constants.CardType.DOUBLE].length; i++) {
								if (this.cardSetMap[constants.CardType.DOUBLE][i].getPoint() > point) {
									let cardSet = this.buildSingleByCard(this.cardSetMap[constants.CardType.DOUBLE][i].getCardList()[0]);
									this.removeCardsBySet(cardSet);
									this.calcuCardSet();
									return cardSet;
								}
							}
						}

						if (this.cardSetMap[constants.CardType.THREE_TWO] != undefined) {
							for (let i = 0; i < this.cardSetMap[constants.CardType.THREE_TWO].length; i++) {
								if (this.cardSetMap[constants.CardType.THREE_TWO][i].getCardList()[4].getPoint() > point) {
									let cardSet = this.buildSingleByCard(this.cardSetMap[constants.CardType.THREE_TWO][i].getCardList()[4]);
									this.removeCardsBySet(cardSet);
									this.calcuCardSet();
									return cardSet;
								}
							}
						}

						let cardSet = this.buildSingleByCard(this.cardList[this.cardList.length - 1]);
						this.removeCardsBySet(cardSet);
						this.calcuCardSet();
						return cardSet;

						break;
					case constants.CardType.DOUBLE: //一对:姊妹对，三带二，炸弹，选最小的一对
						if (this.cardSetMap[constants.CardType.CONNECT_DOUBLE] != undefined) {
							for (let i = 0; i < this.cardSetMap[constants.CardType.CONNECT_DOUBLE].length; i++) {
								if (this.cardSetMap[constants.CardType.CONNECT_DOUBLE][i].getPoint() > point) {
									let cardSet = this.buildDoubleByCard(this.cardSetMap[constants.CardType.CONNECT_DOUBLE][i].getCardList()[0], this.cardSetMap[constants.CardType.CONNECT_DOUBLE][i].getCardList()[1]);
									this.removeCardsBySet(cardSet);
									this.calcuCardSet();
									return cardSet;
								}
							}
						}

						if (this.cardSetMap[constants.CardType.THREE_TWO] != undefined) {
							for (let i = 0; i < this.cardSetMap[constants.CardType.THREE_TWO].length; i++) {
								if (this.cardSetMap[constants.CardType.THREE_TWO][i].getCardList()[3].getPoint() == this.cardSetMap[constants.CardType.THREE_TWO][i].getCardList()[4].getPoint()
									&& this.cardSetMap[constants.CardType.THREE_TWO][i].getCardList()[3].getPoint() > point) {
									let cardSet = this.buildDoubleByCard(this.cardSetMap[constants.CardType.THREE_TWO][i].getCardList()[3], this.cardSetMap[constants.CardType.THREE_TWO][i].getCardList()[4]);
									this.removeCardsBySet(cardSet);
									this.calcuCardSet();
									return cardSet;
								}
							}

							for (let i = 0; i < this.cardSetMap[constants.CardType.THREE_TWO].length; i++) {
								if (this.cardSetMap[constants.CardType.THREE_TWO][i].getPoint() > point) {
									let cardSet = this.buildDoubleByCard(this.cardSetMap[constants.CardType.THREE_TWO][i].getCardList()[0], this.cardSetMap[constants.CardType.THREE_TWO][i].getCardList()[1]);
									this.removeCardsBySet(cardSet);
									this.calcuCardSet();
									return cardSet;
								}
							}
						}

						if (this.cardSetMap[constants.CardType.BOMB] != undefined) {
							let cardSet = this.cardSetMap[constants.CardType.BOMB][0];
							this.removeCardsBySet(cardSet);
							this.calcuCardSet();
							return cardSet;
						}

						for (let i = 0, len = this.cardList.length; i < len - 1; i++) {
							if (this.cardList[i].getPoint() > point && this.cardList[i].getPoint() == this.cardList[i+1].getPoint()) {
								let cardSet = this.buildDoubleByCard(this.cardList[i], this.cardList[i+1]);
								this.removeCardsBySet(cardSet);
								this.calcuCardSet();
								return cardSet;
							}
						}

						break;
					case constants.CardType.STRAIGHT: //一条龙:炸弹, 选最小的一条龙
						if (this.cardSetMap[constants.CardType.BOMB] != undefined) {
							let cardSet = this.cardSetMap[constants.CardType.BOMB][0];
							this.removeCardsBySet(cardSet);
							this.calcuCardSet();
							return cardSet;
						}

						let newCardSet = CardLogic.GetInstance().findMinStraight(this.cardList, point, superCardSet.getConnectNum());
						if (newCardSet) {
							this.removeCardsBySet(newCardSet);
							this.calcuCardSet();
							return newCardSet;
						}
						break;
					case constants.CardType.CONNECT_DOUBLE: //姊妹对:炸弹，选最小的姊妹对
						if (this.cardSetMap[constants.CardType.BOMB] != undefined) {
							let cardSet = this.cardSetMap[constants.CardType.BOMB][0];
							this.removeCardsBySet(cardSet);
							this.calcuCardSet();
							return cardSet;
						}

						newCardSet = CardLogic.GetInstance().findMinConnectTwo(this.cardList, point, superCardSet.getConnectNum());
						if (newCardSet) {
							this.removeCardsBySet(newCardSet);
							this.calcuCardSet();
							return newCardSet;
						}

						break;
					case constants.CardType.THREE_TWO: //三带二: 炸弹，最小的三带二
						if (this.cardSetMap[constants.CardType.BOMB] != undefined) {
							let cardSet = this.cardSetMap[constants.CardType.BOMB][0];
							this.removeCardsBySet(cardSet);
							this.calcuCardSet();
							return cardSet;
						}

						newCardSet = CardLogic.GetInstance().findMinThreeTwo(this.cardList, point);
						if (newCardSet) {
							this.removeCardsBySet(newCardSet);
							this.calcuCardSet();
							return newCardSet;
						}

						break;
					case constants.CardType.CONNECT_THREE: //连续三带二：炸弹，最小的连续三带二
						if (this.cardSetMap[constants.CardType.BOMB] != undefined) {
							let cardSet = this.cardSetMap[constants.CardType.BOMB][0];
							this.removeCardsBySet(cardSet);
							this.calcuCardSet();
							return cardSet;
						}

						newCardSet = CardLogic.GetInstance().findMinConnectThree(this.cardList, point, superCardSet.getConnectNum());
						if (newCardSet) {
							this.removeCardsBySet(newCardSet);
							this.calcuCardSet();
							return newCardSet;
						}

						break;
					case constants.CardType.BOMB: //还有比炸弹大的？那这有点问题吧
						break;
				}

				console.log("find error");
				console.log("now super card");
				this.printCardSet(superCardSet);
				console.log("hand card");
				this.printCardList([this.cardList], "ALL");

				let cardSet = new CardSet();
				cardSet.setCardType(constants.CardType.PASSED);
				return cardSet;
			}
		}

		public buildSingleByCard(card:Card):CardSet
		{
			let cardSet = new CardSet();
			cardSet.setCardType(constants.CardType.SINGLE);
			cardSet.setPoint(card.getPoint());
			cardSet.setCardList([card]);
			return cardSet;
		}

		public buildDoubleByCard(card:Card, cardTwo:Card):CardSet
		{
			let cardSet = new CardSet();
			cardSet.setCardType(constants.CardType.DOUBLE);
			cardSet.setPoint(card.getPoint());
			cardSet.setCardList([card, cardTwo]);
			return cardSet;
		}
	}
}