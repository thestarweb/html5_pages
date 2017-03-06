game.element.floor=function(display,z,sx,sy,ex,ey,style,type){
	this.sx=sx;
	this.sy=sy;
	this.z=z;
	this.ex=ex;
	this.ey=ey;
	this.display=display;
	this.draw=function(pen){
		var d=[game.get_2d(sx,sy,z),game.get_2d(sx,ey,z),game.get_2d(ex,ey,z),game.get_2d(ex,sy,z)];
		pen.fillStyle=style;
		pen.beginPath();
		pen.moveTo(d[0].x,d[0].y);
		pen.lineTo(d[1].x,d[1].y);
		pen.lineTo(d[2].x,d[2].y);
		pen.lineTo(d[3].x,d[3].y);
		pen.closePath();
		pen.fill();
		var duijiaoxian=[Math.sqrt((d[0].x-d[2].x)*(d[0].x-d[2].x)+(d[0].y-d[2].y)*(d[0].y-d[2].y)),Math.sqrt((d[1].x-d[3].x)*(d[1].x-d[3].x)+(d[1].y-d[3].y)*(d[1].y-d[3].y))];
		//var duijiaoxian=[Math.sqrt((d[0].x+d[2].x)*(d[0].x+d[2].x)+(d[0].y+d[2].y)*(d[0].y+d[2].y)),Math.sqrt((d[1].x+d[3].x)*(d[1].x+d[3].x)+(d[1].y+d[3].y)*(d[1].y+d[3].y))];
		if(!type){
		var h=pen.createRadialGradient((d[0].x+d[1].x+d[2].x+d[3].x)/4,(d[0].y+d[1].y+d[2].y+d[3].y)/4,Math.min(duijiaoxian[0],duijiaoxian[1])*0.1,(d[0].x+d[1].x+d[2].x+d[3].x)/4,(d[0].y+d[1].y+d[2].y+d[3].y)/4,Math.max(duijiaoxian[0],duijiaoxian[1])*1.1);
		h.addColorStop(0,'rgba(0,0,0,0.0)');
		h.addColorStop(1,'rgba(0,0,0,1)');
		pen.fillStyle=h;
		pen.fill();
		}else if(type==1){
			pen.strokeStyle='#555';
			pen.stroke();
		}
	}
	this.isclick=function(x,y){
		x*=game.x;y*=game.y;
		var d=[game.get_2d(sx,sy,z),game.get_2d(sx,ey,z),game.get_2d(ex,ey,z),game.get_2d(ex,sy,z)];
		return game.is_click_f(d[0],d[1],x,y)*game.is_click_f(d[2],d[3],x,y)>0&&game.is_click_f(d[3],d[0],x,y)*game.is_click_f(d[1],d[2],x,y)>0;
	}
}
game.script_load('element/floor.js');