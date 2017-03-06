game.s.start={
	buttons:[new game.element.button(-0.29,0,0.2,0.1,'读取存档','#08F'),new game.element.button(0,0,0.2,0.1,'开始游戏','#08F'),new game.element.button(0.29,0,0.2,0.1,'作者的话','#08F')],
	draw:function(ctx,width,height){
		if(game.flags.start)return;
		ctx.fillStyle="#FFF";
		ctx.textAlign="center";
		ctx.font=width*0.1+"px 方正姚体";
		ctx.fillText('幻城1--神秘房间',0,-height*0.2);//标题

		//绘制按钮
		this.buttons[0].draw(ctx);
		this.buttons[1].draw(ctx);
		this.buttons[2].draw(ctx);

		ctx.font=width*0.029+"px Georgia";
		ctx.fillText('by 星星',0,height*0.2);
	},
	click:function(x,y){
		if(this.buttons[0].isclick(x,y)){
			game.show_message('暂不支持读档');
		}else if(this.buttons[1].isclick(x,y)){
			game.flags.start=1;
			game.redraw(1);
			game.change_s('N');
			game.show_message('！');
			game.show_message('这是什么地方？');
			//}
		}else if(this.buttons[2].isclick(x,y)){
			//game.show_message("操作说明\n本游戏主要通过鼠标点击来操作，同时兼容使用键盘");
			//game.show_message('鼠标操作时只需点击到对应位置便能触发剧情');
			//game.show_message('键盘操作的功能还很不完善，暂时不推荐使用');
			//game.show_message('作者的话\n作者最初是玩了某款flash制作的解谜游戏，觉得很有意思，便萌生了自己也做一个的想法。于是作者便开始自学各种知识。（不过我并不是使用的flash——它在手机上运行起来比较吃力，在电脑上运行也不是那么好，不过这样一来，制作难度也大了不少）');
			//game.show_message('如前面所说，作者是自学的，可能做得比较烂，欢迎给我提供帮助。\n另外，游戏的剧情还没完全定下来，欢迎提意见哦');
			//game.show_message('关于剧情/地图\n严格的来说在这个一中，只是一个比较普通的密室逃脱游戏，玩家需要找到一些东西并想办法打开门方能进入“幻城”。');
			game.show_message('我，游戏的作者，是一个即将参加高考的高中生，我努力做好这个游戏，但是毕竟时间有限，只能做到这了。希望你能够喜欢')
			game.show_message('关于图形绘制\n因为我还不会制作真正的3d版的，并且前面设计的时候场景有些重叠的地方，有些地方本应该绘制得更加完善，不过不影响游戏通关，暂时就将就下吧。');
		}
	}
}
game.script_load('start.js');