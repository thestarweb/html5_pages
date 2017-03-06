game.s.S={
	block:[
		new game.element.wall(1,-0.4,0.5,-0.5,-0.5,-0.5,0.1,'#DDD'),//左侧墙
		new game.element.wall(1,-0.4,0.5,-0.5,0.1,0.5,0.1,'#DDD'),
		new game.element.wall(1,-0.4,0.5,0.5,-0.5,0.5,0.1,'#DDD'),
		new game.element.floor(1,-0.4,-0.5,-0.5,0.5,0.1,'#9AA'),
		new game.element.floor(1,0.5,-0.5,-0.5,0.5,0.1,'#DDD'),
		new game.element.wall(1,-0.4,0.1,0.05,0.1,0.2,0.1,'#A90',1),//门
		new game.element.wall(1,-0.4,0.35,-0.42,-0.5,-0.42,0.1,'#422'),//柜子（这里仅保持画面完整）
	],
	draw:function(pen){
		for(var i in this.block){
			this.block[i].display&&this.block[i].draw(pen);
		}
		game.s.global.goto_button.draw(pen);
	},
	click:function(x,y){
		if(game.s.global.goto_button.click(x,y,'E','s0')){
		}else if(this.block[5].isclick(x,y)){
			game.s.trueend.open_door();
		}else if(this.block[6].isclick(x,y)){
			game.s.E.g._click(3);
		}
	}
}
game.script_load('s/S.js');