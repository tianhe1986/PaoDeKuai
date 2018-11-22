
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

        public static  uiView:any ={"type":"View","props":{"width":1334,"height":750},"child":[{"type":"Box","props":{"y":0,"x":0,"var":"background"},"child":[{"type":"Rect","props":{"width":1334,"lineWidth":1,"height":750,"fillColor":"#56b8e7"}}]},{"type":"Box","props":{"y":76,"x":13,"var":"leftSeat"},"child":[{"type":"Box","props":{"width":180,"height":260},"child":[{"type":"Rect","props":{"width":180,"lineWidth":1,"height":260,"fillColor":"#11829f"}}]},{"type":"Image","props":{"y":14,"x":15,"width":150,"name":"avatar","height":150}},{"type":"Text","props":{"y":173,"x":18,"width":145,"name":"nickname","height":30,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":214,"x":18,"width":145,"name":"score","height":30,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":-4,"x":185,"width":47,"name":"cardNum","height":30,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":480,"x":13,"var":"mySeat"},"child":[{"type":"Box","props":{"width":180,"height":260},"child":[{"type":"Rect","props":{"width":180,"lineWidth":1,"height":260,"fillColor":"#11829f"}}]},{"type":"Image","props":{"y":14,"x":15,"width":150,"name":"avatar","height":150}},{"type":"Text","props":{"y":173,"x":18,"width":145,"name":"nickname","height":30,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":214,"x":18,"width":145,"name":"score","height":30,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":-4,"x":185,"width":47,"name":"cardNum","height":30,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":76,"x":1093,"width":233,"var":"rightSeat","height":271},"child":[{"type":"Box","props":{"y":4,"x":53,"width":180,"height":260},"child":[{"type":"Rect","props":{"width":180,"lineWidth":1,"height":260,"fillColor":"#11829f"}}]},{"type":"Image","props":{"y":18,"x":68,"width":150,"name":"avatar","height":150}},{"type":"Text","props":{"y":177,"x":71,"width":145,"name":"nickname","height":30,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":218,"x":71,"width":145,"name":"score","height":30,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":0,"x":2,"width":47,"name":"cardNum","height":30,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Box","props":{"y":486,"x":-851,"width":926,"var":"handCard","height":150}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.roomUI.uiView);

        }

    }
}
