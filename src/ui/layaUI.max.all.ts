
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
