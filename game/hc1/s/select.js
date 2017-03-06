//柜子
game.s.select={
	s1:{
		buttons:[
		new game.element.button(-0.4,0.4,0.2,0.1,'左转(←)','#000'),
		],
	}
	nu:-1,
	draw:function(pen){
		switch(this.nu){
			case 1:
			case 3:
					this.block[3].display=1;
					this.block[4].display=0;
					this.block[5].display=1;
					this.block[6].display=0;
				break;
			case 2:
				this.block[3].display=0;
				this.block[4].display=1;
				this.block[5].display=0;
				this.block[6].display=1;
		}
		for(var i in this.block){
			this.block[i].display&&this.block[i].draw(pen);
		}
		switch(this.nu){
			case 1:
				break;
			case 2:
			this.mmx.draw(pen);
					game.flags.get_book||this.book.draw(pen);
				break;
			case 3:
			this.g3button.draw(pen);
				break;
		}
	},
	click:function(x,y){
		if(this.block[7].isclick(x,y)){
			game.change_s('E');
		}else{
			switch (this.nu){
				case 2:
			if((!game.flags.get_book)&&this.book.isclick(x,y)){
			game.flags.get_book=true;
			game.redraw(1);
			game.show_message('得到一个日记本');
			}
			break;
			case 3:
			this.g3button.click(x,y)
		}
		}
	}
}
game.script_load('s/g.js');