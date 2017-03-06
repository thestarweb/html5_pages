game.element.wall=function(display,sz,ez,sx,sy,ex,ey,style,type){
	this.sx=sx;
	this.sy=sy;
	this.sz=sz;
	this.ex=ex;
	this.ey=ey;
	this.ez=ez;
	this.display=display;
	this.style=style;
	this.changeStyle=function(nstyle){
		style=nstyle;
	}
	this.isclick=function(x,y){
		x*=game.x;y*=game.y;
		var d=[game.get_2d(sx,sy,sz),game.get_2d(ex,ey,sz),game.get_2d(ex,ey,ez),game.get_2d(sx,sy,ez)];
		return game.is_click_f(d[0],d[1],x,y)*game.is_click_f(d[2],d[3],x,y)>0&&game.is_click_f(d[3],d[0],x,y)*game.is_click_f(d[1],d[2],x,y)>0;
	}
	this.draw=function(pen){
		var d=[game.get_2d(sx,sy,sz),game.get_2d(ex,ey,sz),game.get_2d(ex,ey,ez),game.get_2d(sx,sy,ez)];
		/*var str='';
		for(var i in d){
			str+=d[i].y+',\n';
		}
		alert(str);*/
		pen.fillStyle=style;
		pen.beginPath();
		pen.moveTo(d[0].x,d[0].y);
		pen.lineTo(d[1].x,d[1].y);
		pen.lineTo(d[2].x,d[2].y);
		pen.lineTo(d[3].x,d[3].y);
		pen.closePath();
		pen.fill();
		//var h=pen.createRadialGradient((d[0].x+d[1].x+d[2].x+d[3].x)/4,(d[0].y+d[1].y+d[2].y+d[3].y)/4,50,(d[0].x+d[1].x+d[2].x+d[3].x)/4,(d[0].y+d[1].y+d[2].y+d[3].y)/4,500);
		if(!type){
			var duijiaoxian=[Math.sqrt((d[0].x-d[2].x)*(d[0].x-d[2].x)+(d[0].y-d[2].y)*(d[0].y-d[2].y)),Math.sqrt((d[1].x-d[3].x)*(d[1].x-d[3].x)+(d[1].y-d[3].y)*(d[1].y-d[3].y))];
			var h=pen.createRadialGradient((d[0].x+d[1].x+d[2].x+d[3].x)/4,(d[0].y+d[1].y+d[2].y+d[3].y)/4,Math.min(duijiaoxian[0],duijiaoxian[1])*0.1,(d[0].x+d[1].x+d[2].x+d[3].x)/4,(d[0].y+d[1].y+d[2].y+d[3].y)/4,Math.max(duijiaoxian[0],duijiaoxian[1])*1.1);
			h.addColorStop(0,'rgba(0,0,0,0.0)');
			h.addColorStop(1,'rgba(0,0,0,1)');
			pen.fillStyle=h;
			pen.fill();
		}
	}
}
game.script_load('element/wall.js');