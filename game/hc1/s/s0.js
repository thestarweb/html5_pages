game.s.s0={
	block:[
		new game.element.wall(1,-0.4,0.5,-0.5,-0.5,-0.5,0.4,'#DDD'),//左侧墙
		new game.element.wall(1,-0.4,0.5,-0.5,0.4,0.5,0.4,'#DDD'),
		new game.element.wall(1,-0.4,0.5,0.5,-0.5,0.5,0.4,'#DDD'),
		new game.element.floor(1,-0.4,-0.5,-0.5,0.5,0.4,'#9AA'),
		new game.element.floor(1,0.5,-0.5,-0.5,0.5,0.4,'#DDD'),
		new game.element.wall(1,-0.4,0.1,-0.5,0.1,-0.5,0.2,'#A90',1),//门
		new game.element.floor(1,-0.29,-0.21,0.05,0.5,-0.8,'#EEE',1),//床
	],
	draw:function(pen){
		for(var i in this.block){
			this.block[i].display&&this.block[i].draw(pen);
		}
		game.s.global.goto_button.draw(pen);
		if(!game.flags.get_note1){
			pen.fillStyle='#08F';
			pen.beginPath();
			var dots=this.noteDots=[game.get_2d(-0.08,0.4,-0.4),game.get_2d(0,0.4,-0.4),game.get_2d(0,0.35,-0.4),game.get_2d(-0.08,0.35,-0.4)];
			pen.moveTo(dots[0].x,dots[1].y);
			pen.lineTo(dots[1].x,dots[1].y);
			pen.lineTo(dots[2].x,dots[2].y);
			pen.lineTo(dots[3].x,dots[3].y);
			pen.closePath();
			pen.fill();
		}
	},
	click:function(x,y){
		var tx=x*game.x,ty=y*game.y;
		if(game.s.global.goto_button.click(x,y,'S','N')){
		}else if(this.block[5].isclick(x,y)){
			game.s.trueend.open_door();
		}else if(
				!game.flags.ge_nNote1&&
				game.is_click_f(this.noteDots[0],this.noteDots[1],tx,ty)*game.is_click_f(this.noteDots[2],this.noteDots[3],tx,ty)>0&&
				game.is_click_f(this.noteDots[3],this.noteDots[0],tx,ty)*game.is_click_f(this.noteDots[1],this.noteDots[2],tx,ty)>0
			){
			game.flags.get_note1=true;
			game.show_message('得到一张蓝色卡片，可以打开菜单查看');
			game.redraw(1);
		}
	}
}
game.script_load('s/s0.js');