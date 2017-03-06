game.s.E={
	block:[
		new game.element.wall(1,-0.4,0.5,-0.5,-0.5,-0.5,0.3,'#DDD'),//左侧墙
		new game.element.wall(1,0.25,0.5,-0.5,0.3,0.5,0.3,'#BBB'),
		new game.element.wall(1,-0.4,0.5,0.5,-0.5,0.5,0.3,'#DDD'),
		new game.element.floor(1,-0.4,-0.5,-0.5,0.5,0.3,'#9AA'),
		new game.element.floor(1,0.5,-0.5,-0.5,0.5,0.3,'#DDD'),
	],
	g:{
		block:[
			new game.element.wall(1,-0.4,0.35,-0.5,0.2,0.5,0.2,'#211'),//柜子
			new game.element.wall(1,-0.35,0.3,-0.465,0.2,-0.3,0.2,'#522'),//柜门
			new game.element.wall(1,-0.35,0.3,-0.27,0.2,-0.11,0.2,'#522'),//柜门
			new game.element.wall(1,-0.35,0.3,-0.08,0.2,0.08,0.2,'#522'),//柜门
			new game.element.wall(1,-0.35,0.3,0.11,0.2,0.27,0.2,'#522'),//柜门
			new game.element.wall(1,-0.35,0.3,0.3,0.2,0.465,0.2,'#522'),//柜门
		],
		draw:function(pen){
			for(var i in this.block){
				this.block[i].display&&this.block[i].draw(pen);
			}
			pen.fillStyle='#999';
			pen.beginPath();
			pen.arc(-0.2*game.x,0,0.01*game.y,0,Math.PI*2);
			pen.fill();
		},
		_click:function(i){
			game.s.g.nu=i;
			switch (i){
				case 1:
				if(!game.flags.get_key){
					game.show_message('这个柜子被锁着');
				break;
				}
				case 2:
				case 3:
				game.change_s('g');
			}
		},
		click:function(x,y){
			if(this.block[1].isclick(x,y)||this.block[2].isclick(x,y)){
				this._click(1);
			}else if(this.block[3].isclick(x,y)){
				this._click(2);
			}else if(this.block[5].isclick(x,y)||this.block[4].isclick(x,y)){
				this._click(3);
			}
		}
	},
	draw:function(pen){
		for(var i in this.block){
			this.block[i].display&&this.block[i].draw(pen);
		}
		this.g.draw(pen);
		game.s.global.goto_button.draw(pen);
	},
	click:function(x,y){
		if(game.s.global.goto_button.click(x,y,'N','S')){
		}else if(this.g.click(x,y)){
		}
	}
}
game.script_load('s/E.js');