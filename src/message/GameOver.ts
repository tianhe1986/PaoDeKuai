/**
* name 
*/
module message{
	export class GameOver extends Base{
		public winner:number; //胜者座位
		public scoreList:Array<Array<number>> = [];
		constructor(){
			super();
			this.id = constants.MessageId.GAME_OVER;
		}

		public writeData():void
		{
			this.content["winner"] = this.winner;
			this.content["scoreList"] = this.scoreList;
		}

		public readData():void
		{
			this.winner = this.content["winner"];
			this.scoreList = this.content["scoreList"];
		}

		public receiveHandle():void
		{
			let seatScoreMap = {};
			for (let i = 0, len = this.scoreList.length; i < len; i++) {
				seatScoreMap[this.scoreList[i][0]] = this.scoreList[i][1];
			}
			game.Room.GetInstance().handleGameOver(this.winner, seatScoreMap);
		}

		public mockSend():void
		{
			
		}
	}
}