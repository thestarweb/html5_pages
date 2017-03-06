game.s.N={
	block:[
		new game.element.wall(1,-0.4,0.5,-0.5,-0.5,-0.5,0.25,'#DDD'),//左侧墙
		new game.element.wall(1,-0.4,0.5,-0.5,0.25,0.5,0.25,'#DDD'),
		new game.element.wall(1,0.35,0.5,0.5,-0.5,0.5,0.25,'#DDD'),
		new game.element.floor(1,-0.4,-0.5,-0.5,0.5,0.25,'#9AA'),
		new game.element.floor(1,0.5,-0.5,-0.5,0.5,0.25,'#DDD'),
		new game.element.wall(1,-0.4,0.35,0.4,-0.5,0.4,0.25,'#422'),//柜子（这里仅保持画面完整）
		new game.element.floor(1,-0.29,-0.05,0.5,0.2,-0.29,'#EEE',1),//床
		new game.element.wall(1,-0.5,-0.29,-0.05,-0.29,0.2,-0.29,'#EEE'),//床
	],
	draw:function(pen){
		for(var i in this.block){
			this.block[i].display&&this.block[i].draw(pen);
		}
		game.s.global.goto_button.draw(pen);
	},
	click:function(x,y){
		if(game.s.global.goto_button.click(x,y,'s0','E')){
		}else if(this.block[5].isclick(x,y)){
			//game.show_message('一个大柜子，需要右转才能仔细调查',0,function(){
				//game.change_s('E');
			//});
			game.s.E.g._click(1);
		}else if(this.block[6].isclick(x,y)||this.block[7].isclick(x,y)){
			game.show_message('做点什么？','select',function(i){
				if(i==1){
					if(game.flags.endtype){
						if(++game.flags.endtype%2){
							game.change_s('badend');
						}else{
							game.change_s('sleep');
						}
					}else{
						game.flags.endtype=3;
						game.show_message('叮\n ');
						game.show_message('叮\n一片钥匙掉了出来');
						game.show_message('得到一片小钥匙');
						game.flags.get_key=true;
						game.show_message('要继续睡吗？','select',function(i){
							if(i) game.change_s('sleep')&&game.flags.endtype++
						},['否','是'])
					}
				}if(i==2){
					game.show_message('什么也没有发现')
				}
			},['取消','睡一觉','调查床铺四周']);
		}
	}
}
game.script_load('s/N.js');