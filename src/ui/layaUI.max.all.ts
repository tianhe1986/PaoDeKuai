
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class enterUI extends View {
		public single:Laya.Button;
		public rule:Laya.Button;
		public mock:Laya.Box;
		public ruleBox:Laya.Box;
		public ruleText:laya.display.Text;
		public ruleClose:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1334,"height":750,"centerY":0.5,"centerX":0.5},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Rect","props":{"width":1334,"lineWidth":1,"height":750,"fillColor":"#56b8e7"}}]},{"type":"Button","props":{"y":284,"x":360,"width":155,"var":"single","skin":"comp/button.png","labelSize":36,"labelFont":"SimSun","label":"开始","height":72}},{"type":"Button","props":{"y":283,"x":712,"width":155,"var":"rule","skin":"comp/button.png","labelSize":36,"labelFont":"SimSun","label":"说明","height":72}},{"type":"Text","props":{"y":679,"x":450,"text":"Powered by LayaAir Engine","fontSize":26,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Text","props":{"y":639,"x":543,"text":"作者：天河","fontSize":26,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Box","props":{"y":0,"x":0,"visible":false,"var":"mock","alpha":0.9},"child":[{"type":"Rect","props":{"width":1334,"lineWidth":1,"height":750,"fillColor":"#000000"}}]},{"type":"Box","props":{"y":71,"x":414,"visible":false,"var":"ruleBox"},"child":[{"type":"Panel","props":{"y":0,"x":-79,"width":617,"vScrollBarSkin":"comp/vscroll.png","height":521},"child":[{"type":"Text","props":{"y":0,"x":0,"wordWrap":true,"width":617,"var":"ruleText","text":"地","leading":8,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Button","props":{"y":554,"x":175,"width":110,"var":"ruleClose","skin":"comp/button.png","labelSize":24,"labelFont":"Arial","label":"知道了","height":45}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.enterUI.uiView);

        }

    }
}

module ui {
    export class loginUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":1334,"height":750,"centerY":0.5,"centerX":0.5},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Rect","props":{"width":1334,"lineWidth":1,"height":750,"fillColor":"#56b8e7"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.loginUI.uiView);

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
		public remindButton:Laya.Button;
		public passButton:Laya.Button;
		public mock:Laya.Box;
		public result:Laya.Box;
		public punish:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":1334,"visible":false,"height":750,"centerY":0.5,"centerX":0.5},"child":[{"type":"Box","props":{"y":0,"x":0,"var":"background"},"child":[{"type":"Rect","props":{"width":1334,"lineWidth":1,"height":750,"fillColor":"#56b8e7"}}]},{"type":"Box","props":{"y":108,"x":13,"width":154,"var":"leftSeat","height":184},"child":[{"type":"Box","props":{"width":180,"height":260},"child":[{"type":"Rect","props":{"width":120,"lineWidth":1,"height":180,"fillColor":"#11829f"}}]},{"type":"Image","props":{"y":10,"x":10,"width":100,"name":"avatar","height":100}},{"type":"Text","props":{"y":118,"x":11,"width":98,"text":"你的","name":"nickname","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":146,"x":8,"width":103,"text":"111","name":"score","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":-4,"x":118,"width":38,"text":"12","name":"cardNum","height":30,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Box","props":{"y":8,"x":191,"width":105,"name":"outCard","height":458}},{"type":"Text","props":{"y":69,"x":220,"width":38,"visible":false,"text":"打得","name":"pass","height":30,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":533,"x":13,"width":154,"var":"mySeat","height":184},"child":[{"type":"Box","props":{"width":180,"height":260},"child":[{"type":"Rect","props":{"width":120,"lineWidth":1,"height":180,"fillColor":"#11829f"}}]},{"type":"Image","props":{"y":10,"x":10,"width":100,"name":"avatar","height":100}},{"type":"Text","props":{"y":118,"x":11,"width":98,"text":"你的","name":"nickname","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":146,"x":8,"width":103,"text":"111","name":"score","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":-4,"x":118,"width":38,"text":"12","name":"cardNum","height":30,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Box","props":{"y":-142,"x":381,"width":577,"name":"outCard","height":150}},{"type":"Text","props":{"y":-55,"x":614,"width":38,"visible":false,"text":"打得","name":"pass","height":30,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":108,"x":1203,"width":154,"var":"rightSeat","height":184},"child":[{"type":"Box","props":{"width":180,"height":260},"child":[{"type":"Rect","props":{"width":120,"lineWidth":1,"height":180,"fillColor":"#11829f"}}]},{"type":"Image","props":{"y":10,"x":10,"width":100,"name":"avatar","height":100}},{"type":"Text","props":{"y":118,"x":11,"width":98,"text":"你的","name":"nickname","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":146,"x":8,"width":103,"text":"111","name":"score","height":30,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":-6,"x":-43,"width":38,"text":"12","name":"cardNum","height":30,"fontSize":18,"font":"Microsoft YaHei","color":"#ffffff","align":"right"}},{"type":"Box","props":{"y":8,"x":-153,"width":105,"name":"outCard","height":458}},{"type":"Text","props":{"y":74,"x":-128,"width":38,"visible":false,"text":"打得","name":"pass","height":30,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":562,"x":194,"width":1009,"var":"handCard","height":150}},{"type":"Text","props":{"y":47,"x":576,"var":"tips","text":"好的","fontSize":24,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Button","props":{"y":423,"x":391,"width":123,"visible":false,"var":"cardOutButton","skin":"comp/button.png","labelSize":30,"labelFont":"SimHei","label":"出牌","height":53}},{"type":"Button","props":{"y":423,"x":611,"width":123,"visible":false,"var":"remindButton","skin":"comp/button.png","labelSize":30,"labelFont":"SimHei","label":"提示","height":53}},{"type":"Button","props":{"y":423,"x":825,"width":123,"visible":false,"var":"passButton","skin":"comp/button.png","labelSize":30,"labelFont":"SimHei","label":"不要","height":53}},{"type":"Box","props":{"y":0,"x":0,"var":"mock","alpha":0.8},"child":[{"type":"Rect","props":{"width":1334,"lineWidth":1,"height":750,"fillColor":"#000000"}}]},{"type":"Box","props":{"y":103,"x":464,"visible":false,"var":"result"},"child":[{"type":"Text","props":{"x":34,"text":"本局获胜者是","fontSize":32,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Text","props":{"x":255,"text":"本局获胜者是","name":"winner","fontSize":32,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"List","props":{"y":86,"x":0,"width":251,"spaceY":10,"name":"resultList","height":130},"child":[{"type":"Box","props":{"renderType":"render"},"child":[{"type":"Text","props":{"text":"你的","name":"nickname","fontSize":32,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Text","props":{"x":213,"text":"10","name":"score","fontSize":32,"font":"Microsoft YaHei","color":"#ffffff"}}]}]},{"type":"Button","props":{"y":238,"x":93,"width":99,"skin":"comp/button.png","name":"confirm","labelSize":20,"labelFont":"Arial","label":"确定","height":31}}]},{"type":"Box","props":{"y":113,"x":474,"visible":false,"var":"punish"},"child":[{"type":"Text","props":{"y":78,"x":-26,"text":"手里有大牌却不出，扣","fontSize":32,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Text","props":{"y":79,"x":301,"width":62,"text":"12","name":"score","height":32,"fontSize":32,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":162,"x":131,"width":99,"skin":"comp/button.png","name":"confirm","labelSize":20,"labelFont":"Arial","label":"确定","height":31}},{"type":"Text","props":{"y":78,"x":368,"text":"分","fontSize":32,"font":"Microsoft YaHei","color":"#ffffff"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.roomUI.uiView);

        }

    }
}
