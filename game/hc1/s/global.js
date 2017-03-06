game.s.global={
	goto_button:(function(){
		var button=[
			new game.element.button(-0.4,0.4,0.2,0.1,'左转(←)','#000'),
			new game.element.button(0.4,0.4,0.2,0.1,'右转(→)','#000'),
		];
		return {
			draw:function(pen){
				button[0].draw(pen);
				button[1].draw(pen);
			},
			click:function(x,y,l,r){
				if(button[0].isclick(x,y)){
					return game.change_s(l);
				}else if(button[1].isclick(x,y)){
					return game.change_s(r);
				}
			}
		}
	})(),
	setting:{
		button:new game.element.button(-0.4,-0.45,0.15,0.05,'菜单','#08F'),
		buttons:[
			new game.element.button(-0.2,-0.4,0.3,0.1,'持有物','#FFF','#08F'),
			new game.element.button(0.2,-0.4,0.3,0.1,'基本设置','#FFF','#08F'),
		]
	},
	draw:function(c1,c2){
		if(!game.flags.start||this.hidden) return;
		if(this.setting.open){
			//c2.fillStyle='#7c53a0';
			var h=c2.createRadialGradient(0,0,game.x/2,0,game.y,game.x/11);
			h.addColorStop(0,'#7C53A0');
			h.addColorStop(1,'#08F');
			c2.fillStyle=h;
			c2.fillRect(-0.45*game.x,-0.45*game.y,0.9*game.x,0.9*game.y);//菜单背景
			this.setting.buttons[0].draw(c2);
			this.setting.buttons[1].draw(c2);
			//关闭按钮
			c2.fillStyle='#000';
			c2.beginPath();
			c2.arc(0.45*game.x,-0.45*game.y,0.04*game.y,0,Math.PI*2);
			c2.fill();
			c2.font=game.x*0.03+"px Georgia";
			c2.textAlign="center";
			c2.fillStyle='#FFF';
			c2.fillText('X',0.45*game.x,-0.435*game.y);
			if(this.setting.open==1){
				this.show_things(c2);
			}
		}else{
			this.setting.button.draw(c2);
		}
	},
	things:{
		'note1':{
			name:'蓝色卡片',
			use:function(){
				game.flags.get_mm&&game.show_message('铁粉在卡片上摆出一串数字\n貌似是'+this.nu);
				game.show_message('卡片上隐约可以看见一小行字：\n 从左到右，从A到D，从上到下，从0到9 ');
				//alert(
			},
			nu:(parseInt(Math.random()*8999)+1000)+''
		},
		'key':{
			name:'一片小钥匙'
		},
		'book':{
			name:'日记本',
			use:function(){
				game.show_message('第一页：\n这是什么地方？我怎么到这来了？');
				game.show_message('第二页：\n我回不去了吗？那这里有什么东西让我探寻？');
				game.show_message('第三页：\n找到一张紫色卡片，我以为是把中间柜子的紫色方块全部挪到四角，然而什么也没发生');
				game.show_message('第四页：\n 瞧我这破记性！！纸片放到那里去了？总觉得它有什么用');
				game.show_message('第四页：\n 卡片找回来了，但是上面竟然沾满了铁粉，似乎是个密码');
				game.show_message('第六页：\n啊，我想我已经可以离开这里了，不过这个记事本就在这里吧，也许会有人用的到，不过真的还会有人来吗？');
				game.show_message('后面的页全部空着');
			}
		},
		'tool':{
			name:'螺丝刀'
		}
	},
	click:function(x,y){
		if(!game.flags.start||this.hidden) return true;
		if(this.setting.open){
			if(x<0.48&&x>0.42&&y>-0.48&&y<-0.42){
				this.setting.open=false;
				game.redraw(2);
				return;
			}
			if(this.setting.open==1){
			for (var key in this.things) {
				//this.things_botton[i].isclick(x,y)&&this.thing=this.things_botton[i].key;alert(this.things_botton[i].key);
				if(this.things[key].button&&this.things[key].button.isclick(x,y)){
					this.things[key].use?this.things[key].use():game.show_message('现在好像用不到这玩意');
					return;
				}
			}
			}
			for(var i in this.setting.buttons){
				if(this.setting.buttons[i].isclick(x,y)){
					this.setting.open=i+1;
					game.redraw(2);
					return false;
				}
			}
			return false;
		}
		if(this.setting.button.isclick(x,y)){
			this.setting.open=1;
			game.redraw(2);
			return;
		}
		return true;
	},
	show_things:function(c2){
		var i=0;
			var temp;
			for(var key in this.things){
				if(game.flags['get_'+key]){
					temp=new game.element.button(-0.2+(i%2)*0.4,-0.3+parseInt(i/2)*0.05,0.3,0.04,this.things[key].name,'#00F')
					temp.draw(c2);
					this.things[key].button=temp;
					i++;
				}
			}
	},
	hidden:false
};
game.script_load('s/global.js');