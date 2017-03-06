game.s.trueend={
	draw:function(pen){
		game.s.global.hidden=true;
		pen.fillStyle="#FFF";
		pen.textAlign="center";
		pen.font=game.y*0.1+"px Georgia";
		
		switch(game.flags.endtype){
			case 1:
				out='1.2 传送出房间之正确完成';
				break;
			case 2:
				out='1.1 传送出房间之立下flag';
				break;
			case 3:
				out='2.1 撬锁而出之正确完成';
				break;
			case 4:
				out='2.2 撬锁而出之立下flag';
				break;
		}
		pen.fillText('TrueEnd'+out,0,-game.y*0.2);
		pen.font=game.y*0.05+"px Georgia";
		pen.fillText('游戏共五个结局，其中一个死亡结局，四个（两组）真结局，',0,game.y*0.2);
		pen.fillText('剩下四个结局分成两组，同一组内结局相近但有一个带上flag',0,game.y*0.3);
	},
	open_door:function(){
		if(game.flags.get_tool) game.show_message('要用螺丝刀撬开门并出去吗？','select',function(v){
			v&&game.change_s("trueend");
		},['否','是']);
		else game.show_message('门是锁坏了，打不开');
	}
}
game.script_load('s/truened.js');