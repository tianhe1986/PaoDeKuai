/**
* name 
*/
module net{
	export class SocketManager{
		protected static instance:SocketManager;

		public static GetInstance():SocketManager
		{
			if(null == SocketManager.instance)
			{
				SocketManager.instance = new SocketManager();
			}
			return SocketManager.instance;
		}

		constructor(){

		}

		public onMessageReveived(message: any): void
		{
			let obj = JSON.parse(message);
			let handleClass:any = constants.MessageId.GetProtocolNameById(obj["id"]);
			if (handleClass != null) {
				let msgHandler = new handleClass();

				msgHandler.setContent(obj["content"]);
				
				msgHandler.readData();
				//调用对应的收到消息处理方法
				msgHandler.receiveHandle();
			} else {
				//TODO： 记录异常
			}
		}

		public sendMessage(msg:message.Base):void
		{
			msg.mockSend();
		}
	}
}