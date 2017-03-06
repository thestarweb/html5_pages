game.s.badend={
	draw:function(pen){
		game.s.global.hidden=true;
		pen.fillStyle="#FFF";
		pen.textAlign="center";
		pen.font=game.y*0.1+"px Georgia";
		pen.fillText('badEnd 饿死',0,0);
	}
}
game.script_load('s/badend.js');