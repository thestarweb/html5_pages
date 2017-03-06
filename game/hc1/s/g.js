//柜子
game.s.g={
	block:[
		new game.element.wall(1,-0.4,0.5,-0.5,0.1,0.5,0.1,'#851'),//后面
		new game.element.floor(1,-0.4,-0.5,-0.5,0.5,0.1,'#850'),//下
		new game.element.floor(1,0.5,-0.5,-0.5,0.5,0.1,'#850'),//上
		new game.element.wall(1,-0.4,0.5,0.25,-5,0.25,0.1,'#850'),//大右
		new game.element.wall(1,-0.4,0.5,0.15,-5,0.15,0.1,'#850'),//小右
		new game.element.wall(1,-0.4,0.5,-0.25,-5,-0.25,0.1,'#850'),//大柜左侧
		new game.element.wall(1,-0.4,0.5,-0.15,-5,-0.15,0.1,'#850'),//小柜左侧
		new game.element.button(0.4,0.45,0.15,0.05,'关上柜子（↓）','#FFF'),
		new game.element.floor(0,-0.4,-0.25,0,0.1,0.1,'#999'),//

	],
	mmx_open:[
		new game.element.floor(1,-0.2,-0.1,-0.1,0.1,0.1,'#AAA'),//上
		new game.element.wall(1,-0.2,-0.22,-0.1,-0.1,0.1,-0.1,'#AAA'),//厚度
	],
	draw_key:function(pen){
		//var temp=pen.lineWidth;
		pen.save();
		pen.lineWidth=game.x*0.002;
		pen.strokeStyle="#DDD";
		pen.transform(1,0,-0.5,1,0,0);
		pen.beginPath();
		//pen.moveTo(-game.x*0.1,game.y*0.2);
		pen.arc(0,game.y*0.2,game.x*0.008,0,2*Math.PI);
		pen.lineTo(game.x*0.1,game.y*0.2);
		pen.lineTo(game.x*0.1,game.y*0.19);
		pen.stroke();
		pen.restore()
	},
	draw_tool:function(pen){
		pen.lineJoin='round';
		pen.fillStyle="#DDD";
		pen.fillRect(-game.x*0.01,game.y*0.169,game.x*0.1,game.y*0.006);
		pen.fillStyle="#FF0";
		pen.fillRect(-game.x*0.09,game.y*0.152,game.x*0.08,game.y*0.04);
		var temp=pen.lineWidth;
		pen.lineWidth=game.x*0.005;
		pen.strokeStyle="#000";
		pen.strokeRect(-game.x*0.09,game.y*0.152,game.x*0.08,game.y*0.02);
		pen.strokeRect(-game.x*0.09,game.y*0.172,game.x*0.08,game.y*0.02);
		pen.lineWidth=temp;
	},
	book:{
		block:[

			new game.element.floor(1,-0.4,0.11,-0.11,-0.11,0,'#A00',true),
			new game.element.wall(1,-0.4,-0.35,0.1,-0.1,-0.1,-0.1,'#FFF',true),
			new game.element.floor(1,-0.36,0.11,-0.11,-0.11,0,'#A00',true)
		],
		draw:function(c){
			for(var i in this.block){
				this.block[i].draw(c);
			}
		},
		isclick:function(x,y){
			return this.block[0].isclick(x,y)||this.block[1].isclick(x,y)||this.block[2].isclick(x,y);
		}
	},
	mmx:{
			blocks:(function(){
				var a=[];
				for(var i=0;i<4;i++){
					a[i]=['000','FFF','F00','F80','FF0','0F0','80F','08F','F8F','999'];
				}
				var temp,x,y;
				for(i=0;i<4;i++){
					for(var j=0;j<10;j++){
						x=parseInt(Math.random()*4);
						y=parseInt(Math.random()*10);
						temp=a[i][j];
						a[i][j]=a[x][y];
						a[x][y]=temp;
					}
				}
				return a;
			})(),
			draw:function(pen){
				for(i=0;i<4;i++){
					for(var j=0;j<10;j++){
						pen.fillStyle='#'+this.blocks[i][j];
						pen.fillRect(game.x*(i*0.04-0.08),game.y*(j*0.05-0.25),game.x*0.04,game.y*0.05);
					}
				}
			},
			leftButtons:(function(){
				var re=[];
				for (var i = 0; i < 10; i++) {
					re.push(new game.element.button(-0.2+(i%5)*0.1,i<5?-0.1:0.1,0.05,0.05,i+"",'#00F'));
				};
				return re;
			})(),
			leftButtonsDraw:function(pen){
				for(var i=0;i<this.leftButtons.length;i++){
					this.leftButtons[i].draw(pen);
				}
			},
			leftButtonsClick:function(x,y){
				for(var i=0;i<this.leftButtons.length;i++){
					if(this.leftButtons[i].isclick(x,y)){
						var temp=this.blocks[0][i];
						this.blocks[0][i]=this.blocks[1][i];
						this.blocks[1][i]=this.blocks[2][i];
						this.blocks[2][i]=this.blocks[3][i];
						this.blocks[3][i]=temp;
						this.isopen();
						return true;
					}
				}
			},
			isopen:function(){
				//alert(this.blocks[0][game.global.this.note]);
				var mm=game.s.global.things.note1.nu;
				if(this.blocks[0][mm.substr(0,1)]=='08F'&&this.blocks[1][mm.substr(1,1)]=='08F'&&this.blocks[2][mm.substr(2,1)]=='08F'&&this.blocks[3][mm.substr(3,1)]=='08F'){
					game.flags.mmx_open=true;
					game.show_message('咔嚓，什么东西打开的声音');
				}
			}
	},
	g3button:{
		buttons:[new game.element.button(-0.15,0,0.05,0.05,'A','#F00'),new game.element.button(-0.05,0,0.05,0.05,'B','#F00'),new game.element.button(0.05,0,0.05,0.05,'C','#F00'),new game.element.button(0.15,0,0.05,0.05,'D','#F00')],
		draw:function(pen){
			for(var i=0;i<this.buttons.length;i++){
				this.buttons[i].draw(pen);
			}
		},
		click:function(x,y){
			var temp;
			for(var i=0;i<4;i++){
				if(this.buttons[i].isclick(x,y)){
				temp=game.s.g.mmx.blocks[i].shift();
				game.s.g.mmx.blocks[i].push(temp);
				game.s.g.mmx.isopen();
				return true;
				}
			}
		}
	},
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
				if(game.flags.endtype>2) this.mmx.leftButtonsDraw(pen)
				else game.change_s('trueend');
				break;
			case 2:
				if(game.flags.mmx_open){
					this.mmx_open[0].draw(pen);
					this.mmx_open[1].draw(pen);
					if(game.flags.endtype<3){
						game.flags.get_key||this.draw_key(pen);
					}else{
						game.flags.get_tool||this.draw_tool(pen);
					}
				}else this.mmx.draw(pen);
				game.flags.get_book||this.book.draw(pen);
				break;
			case 3:
				if(!game.flags.endtype)game.flags.endtype=1;
				if(game.flags.endtype<3) this.mmx.leftButtonsDraw(pen);
				this.g3button.draw(pen);
				this.block[8].draw(pen);
				break;
		}
	},
	click:function(x,y){
		if(this.block[7].isclick(x,y)){
			game.change_s('E');
		}else{
			switch (this.nu){
				case 1:
					game.flags.endtype>2&&this.mmx.leftButtonsClick(x,y)
				case 2:
					if((!game.flags.get_book)&&this.book.isclick(x,y)){
						game.flags.get_book=true;
						game.redraw(1);
						game.show_message('得到一个日记本');
					}else if(game.flags.mmx_open&&this.mmx_open[0].isclick(x,y)){
						if(game.flags.endtype>2){
							if(!game.flags.get_tool){
								game.show_message('得到螺丝刀');
								game.flags.get_tool=true;
								game.redraw(0);
							}
						}else{
							if(!game.flags.get_key){
								game.show_message('得到钥匙');
								game.flags.get_key=true;
								game.redraw(0);
							}
						}
					}
					break;
				case 3:
					if(this.g3button.click(x,y)){
					}else if(game.flags.endtype<3&&this.mmx.leftButtonsClick(x,y)){
					}else if(this.block[8].isclick(x,y)){
						game.show_message("一些铁粉，要靠近调查吗？",'select',function(i){
							if(i){
								if(game.flags.get_note1&&!game.flags.get_mm){
									game.show_message("一些铁粉飞向蓝色卡片");
									game.flags.get_mm=true;
								}
								game.show_message("铁粉中什么也没有");
							}
						},['否','是']);
					}
		}
		}
	}
}
game.script_load('s/g.js');