/**
* name 
*/
module message{
	export class OutTurn extends Base{
		public seatId:number;
		public superSeatId:number;
		public cardType:number;
		public connectNum:number;
		public point:number;

		constructor(){
			super();
			this.id = constants.MessageId.OUT_TURN;
		}

		public writeData():void
		{
			this.content["seatId"] = this.seatId;
			this.content["superSeatId"] = this.superSeatId;
			this.content["cardType"] = this.cardType;
			this.content["connectNum"] = this.connectNum;
			this.content["point"] = this.point;
		}

		public readData():void
		{
			this.seatId = this.content["seatId"];
			this.superSeatId = this.content["superSeatId"];
			this.cardType = this.content["cardType"];
			this.connectNum = this.content["connectNum"];
			this.point = this.content["point"];
		}

		public receiveHandle():void
		{
			let seat = game.Room.GetInstance().getSeat(this.seatId);
			let room = game.Room.GetInstance();
			//当前该谁出牌
			room.setNowOutSeatId(this.seatId);
			//当前牌最大的是谁
			room.setNowSuperSeatId(this.superSeatId);
			//当前牌型是什么
			let newCardSet = new game.CardSet();
			newCardSet.setCardType(this.cardType);
			newCardSet.setConnectNum(this.connectNum);
			newCardSet.setPoint(this.point);
			room.setNowSuperCardSet(newCardSet);
			room.outTurn();

			//如果是新一轮，清掉所有牌
			//清掉轮到下家的牌
		}

		public mockSend():void
		{
			
		}
	}
}