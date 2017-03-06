game.s.sleep={
	draw:function(pen){
		game.s.global.hidden=true;
		pen.fillStyle="#FFF";
		pen.textAlign="center";
		pen.font=game.y*0.1+"px Georgia";
		pen.fillText('睡觉中......',-game.x/6,0);
		if(this.flags) return;
		game.settimeout(function(){
			game.change_s('N');
			game.s.global.hidden=false;
			game.settimeout(function(){
				game.show_message('啊，我睡了多久，肚子好饿，看来得赶紧离开这里');
				game.show_message('小提示：\r\n不要浪费时间啊！');
			},900);
		},5000);
		this.flags=true;
	},
	myflasg:false
}
game.script_load('s/sleep.js');