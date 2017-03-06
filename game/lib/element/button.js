game.element.button=function(cx,cy,w,h,text,bsstayle,bfstyle,color){
	this.changeStyle=function(nstyle){
		style=nstyle;
	}
	this.display=1;
	this.isclick=function(x,y){
		//x-=game.x/2;y-=game.y/2;y=-y;
		//var d=[game.get_2d(sx,sy,sz),game.get_2d(ex,ey,sz),game.get_2d(ex,ey,ez),game.get_2d(sx,sy,ez)];
		/*var f=[
			game.is_click_f(game.x*(cx-w/2),game.y*(cy-h/2),game.x*(cx+w/2),game.y*(cy-h/2),x,y),
			game.is_click_f(game.x*(cx+w/2),game.y*(cy+h/2),game.x*(cx-w/2),game.y*(cy+h/2),x,y),
			game.is_click_f(game.x*(cx+w/2),game.y*(cy-h/2),game.x*(cx+w/2),game.y*(cy+h/2),x,y),
			game.is_click_f(game.x*(cx-w/2),game.y*(cy+h/2),game.x*(cx-w/2),game.y*(cy-h/2),x,y)
		];
		return f[0]*f[1]>0&&f[2]*f[3]>0;*/
		return ((cx-w/2)<x&&(cx+w/2)>x&&(cy+h/2)>y&&(cy-h/2)<y)
	}
	this.draw=function(ctx){
		if(bsstayle){
			ctx.strokeStyle=bsstayle;
			ctx.strokeRect(game.x*(cx-w/2),game.y*(cy-h/2),game.x*w,game.y*h);
		}
		if(bfstyle){
			//
		}
		if(text){
			ctx.font=game.x*h/2+"px Georgia";
			ctx.fillStyle=color||'#FFF';
			ctx.textAlign="center";
			ctx.fillText(text,game.x*cx,game.y*(cy+h/3));
			ctx.strokeStyle="#9AF";
			ctx.strokeText(text,game.x*cx,game.y*(cy+h/3));
		}
	}
}
game.script_load('button/wall.js');