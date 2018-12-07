
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class enterUI extends View {
		public single:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1334,"height":750},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Rect","props":{"width":1334,"lineWidth":1,"height":750,"fillColor":"#56b8e7"}}]},{"type":"Button","props":{"y":284,"x":360,"width":155,"var":"single","skin":"comp/button.png","labelSize":36,"labelFont":"SimSun","label":"单机","height":72}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.enterUI.uiView);

        }

    }
}

module ui {
    export class roomUI extends View {
		public background:Laya.Box;
		public leftSeat:Laya.Box;
		public mySeat:Laya.Box;
		public rightSeat:Laya.Box;
		public handCard:Laya.Box;
		public tips:laya.display.Text;
		public cardOutButton:Laya.Button;
		public cancelButton:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1334,"height":750},"child":[{"type":"Box","props":{"y":0,"x":0,"var":"background"},"child":[{"type":"Rect","props":{"width":1334,"lineWidth":1,"height":750,"fillColor":"#56b8e7"}}]},{"type":"Box","props":{"y":76,"x":13,"width":154,"var":"leftSeat","height":184},"child":[{"type":"Box","props":{"width":180,"height":260},"child":[{"type":"Rect","props":{"width":120,"lineWidth":1,"height":180,"fillColor":"#11829f"}}]},{"type":"Image","props":{"y":10,"x":10,"width":100,"name":"avatar","height":100}},{"type":"Text","props":{"y":118,"x":11,"width":98,"text":"你的","name":"nickname","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":146,"x":8,"width":103,"text":"111","name":"score","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":-4,"x":118,"width":38,"text":"12","name":"cardNum","height":30,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Box","props":{"y":8,"x":191,"width":105,"name":"outCard","height":458}},{"type":"Text","props":{"y":69,"x":220,"width":38,"visible":false,"text":"不要","name":"pass","height":30,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":533,"x":13,"width":154,"var":"mySeat","height":184},"child":[{"type":"Box","props":{"width":180,"height":260},"child":[{"type":"Rect","props":{"width":120,"lineWidth":1,"height":180,"fillColor":"#11829f"}}]},{"type":"Image","props":{"y":10,"x":10,"width":100,"name":"avatar","height":100}},{"type":"Text","props":{"y":118,"x":11,"width":98,"text":"你的","name":"nickname","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":146,"x":8,"width":103,"text":"111","name":"score","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":-4,"x":118,"width":38,"text":"12","name":"cardNum","height":30,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Box","props":{"y":-142,"x":381,"width":577,"name":"outCard","height":150}},{"type":"Text","props":{"y":-55,"x":614,"width":38,"visible":false,"text":"不要","name":"pass","height":30,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":76,"x":1203,"width":154,"var":"rightSeat","height":184},"child":[{"type":"Box","props":{"width":180,"height":260},"child":[{"type":"Rect","props":{"width":120,"lineWidth":1,"height":180,"fillColor":"#11829f"}}]},{"type":"Image","props":{"y":10,"x":10,"width":100,"name":"avatar","height":100}},{"type":"Text","props":{"y":118,"x":11,"width":98,"text":"你的","name":"nickname","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":146,"x":8,"width":103,"text":"111","name":"score","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":-6,"x":-43,"width":38,"text":"12","name":"cardNum","height":30,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"Box","props":{"y":8,"x":-153,"width":105,"name":"outCard","height":458}},{"type":"Text","props":{"y":74,"x":-128,"width":38,"visible":false,"text":"不要","name":"pass","height":30,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":562,"x":194,"width":1009,"var":"handCard","height":150}},{"type":"Text","props":{"y":47,"x":576,"var":"tips","text":"好的","fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Button","props":{"y":441,"x":491,"width":99,"visible":false,"var":"cardOutButton","skin":"comp/button.png","labelSize":20,"labelFont":"Arial","label":"出牌","height":31}},{"type":"Button","props":{"y":441,"x":728,"width":99,"visible":false,"var":"cancelButton","skin":"comp/button.png","labelSize":20,"labelFont":"Arial","label":"不要","height":31}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.roomUI.uiView);

        }

    }
}
