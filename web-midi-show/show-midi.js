(function(){
		var type=[
			"大钢琴","明亮的钢琴","电钢琴","酒吧钢琴","柔和电钢琴","和声效果电钢琴","拨弦古钢琴","击弦古钢琴",
			"钢片琴","钟琴","八音盒","颤音琴","马林巴","木琴","管钟","大扬琴",
			"击杆风琴","打击式风琴","摇滚风琴","教堂风琴","簧管风琴","手风琴","口琴","探戈手风琴",
			"尼龙弦吉他","钢弦吉他","爵士电吉他","清音电吉他","闷音电吉他","驱动效果电吉他","失真电吉他","吉他和音",
			"大贝司","电贝司（指弹）","电贝司（拨片）","无品贝司","击掌1","击掌2","合成1","合成2",
			"小提琴","中提琴","大提琴","低音大提琴","击掌1","击掌2","竖琴","定音鼓",
			"弦乐合奏1","弦乐合奏2","合成弦乐合奏1","合成弦乐合奏2","人声 啊","人声 嘟","合成人声","管弦乐敲击合奏",
			"小号","长号","大号","加弱音器小号","圆号","铜管组","合成铜管音色1","合成铜管音色2",
			"高音萨克斯","次中音萨克斯","中音萨克斯","低音萨克斯","双簧管","英国管","巴松","单簧管",
			"短笛","长笛","竖笛","排箫","Bottle Blow","日本尺八","口哨","奥卡雷那",
			"合成主音1方波","合成主音2锯齿波","合成主音3","合成主音4","合成主音5","合成主音6人声","合成主音7平行五度","合成主音8贝司加主音",
			"合成音色1新世界","合成音色2温暖","合成音色3","合成音色4合唱","合成音色5","合成音色6金属声","合成音色7光环","合成音色8",
			"合成效果1雨声","合成效果2音轨","合成效果3水晶","合成效果4大气","合成效果5明亮","合成效果6鬼怪","合成效果7回声","合成效果8科幻",
			"西塔尔","班卓琴","三味线","十三弦筝","卡林巴","风笛","民族提琴","山奈",
			"叮当铃","Agogo","钢鼓","木鱼","太鼓","通通鼓","合成鼓","铜钹",
			"吉他换把杂音","呼吸声","海浪声","鸟鸣","电话铃","直升机","鼓掌声","枪声",
		];
		var type_color=[
			"#08f","#08f","#08f","#08f","#08f","#08f","#08f","#08f",
			"#08f","#08f","#08f","#08f","#08f","#08f","#FFF","#088",
			"#088","#088","#088","#088","#088","#088","#C60","#088",
			"#8F8","#8F8","#8F8","#8F8","#8F8","#8F8","#8F8","#8F8",
			"#4A4","#4A4","#4A4","#4A4","#F88","#F88","#4A4","#4A4",
			"#AF2","#AF2","#AF2","#AF2","#F88","#F88","#AF2","#F88",
			"#0F0","#0F0","#0F0","#0F0","#0F0","#0F0","#0F0","#0F0",
			"#FF0","#FF0","#FF0","#FF0","#FF0","#FF0","#FF0","#FF0",
			"#F20","#F20","#F20","#F20","#F20","#F20","#F20","#F20",
			"#A40","#A40","#A40","#A40","#A40","#A40","#A40","#A40",
			"#AAA","#AAA","#AAA","#AAA","#AAA","#AAA","#AAA","#AAA",
			"#AAA","#AAA","#AAA","#AAA","#AAA","#AAA","#AAA","#AAA",
			"#AAA","#AAA","#AAA","#AAA","#AAA","#AAA","#AAA","#AAA",
			"#A40","#A40","#A40","#A40","#A40","#A40","#AF2","#A40",
			"#F88","#F88","#F88","#F88","#F88","#F88","#F88","#F88",
			"#F88","#FFF","#FFF","#FFF","#FFF","#FFF","#F88","#F88",
		];
		var sound=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
		//var sound=["1-","1#-","2-","2#-","3-","4-","4#-","5-","4#-","6-","6#-","7-"];
		window.MindShow=function(id){

			//对象全局变量定义
			var s=null;//midi音乐数据
			var canvas=document.getElementById(id);//画布
			var mousePoseX=0, mousePoseY=0;//记录鼠标位置
			// canvas.onclick=function(ev){
			// 	draw();
			// }
			var selInfo={
				type:"",
				data:null
			}
			var viewLeft=100;
			var viewTop=10;
			var viewRight=10;
			var viewBottom=40;
			var viewWidth=0;
			var viewHeight=0;
			var sizeX=1;
			var sizeY=1;
			var nodeHeight=20;
			var viewStart=0;

			//基本函数
			var checkMouseIn=function(x,y,w,h){
				return mousePoseX>x&&mousePoseX<w+x&&mousePoseY>y&&mousePoseY<h+y;
			}

			//绘制函数
			var c=canvas.getContext("2d");
			var drawKey=function(key,dy,showP){
				if(showP) {
					c.lineWidth=2;
				}
				var x=(key.start-viewStart)*sizeX+viewLeft;//
				var y=(key.pos*nodeHeight+dy)*sizeY+viewTop;
				var w=(key.end-key.start)*sizeX;
				var h=nodeHeight*sizeY;
				//var rect=[x>viewLeft?x:viewLeft,y>viewTop?y:viewTop,(w+x)<(viewLeft+viewWidth)?w:(viewLeft+viewWidth-x),(h+y)<(viewLeft+viewWidth)?h:(viewLeft+viewWidth-y)];
				var ef=true;
				if(x<viewLeft){
					w-=viewLeft-x;
					x=viewLeft;
					ef=false;
				}
				if(y<viewTop){
					h-=viewTop-y;
					y=viewLeft;
					ef=false;
				}
				if(w+x>viewLeft+viewWidth){
					w=viewLeft+viewWidth-x;
				}
				if(h+y>viewTop+viewHeight){
					h=viewTop+viewHeight-y;
					ef=false;
				}
				c.strokeStyle=showP?"#A22":"#666";
				c.fillStyle=type_color[key.programNumber];//"#08f";
				c.beginPath();
				c.rect(x,y,w,h);
				c.fill();
				c.stroke();
				if(ef&&w>(nodeHeight*sizeY*2)&&x+(nodeHeight*sizeY)*2<(viewLeft+viewWidth)){
					c.fillStyle="#000";
					c.font=nodeHeight*sizeY+"px Arial";
					var text=sound[key.noteNumber%sound.length]+parseInt(key.noteNumber/sound.length);
					c.beginPath();
					c.fillText(text,x,y);
				}
				return checkMouseIn(x,y,w,h);
			}
			var draw=function(){
				//清空画布并设置宽度与高度
				canvas.width=canvas.offsetWidth;
				canvas.height=canvas.offsetHeight;
				c.textBaseline="top";
				//清空鼠标选择的物品类型
				selInfo.type="";
				viewWidth=canvas.width-viewLeft-viewRight;
				viewHeight=canvas.height-viewTop-viewBottom;
				if(s){
					//检查显示范围
					if(viewStart+viewWidth/sizeX>s.tickNumber) viewStart=s.tickNumber-viewWidth/sizeX;
					if(viewStart<0)viewStart=0;
					//c.clearRect(0,0,canvas.width,canvas.height); 
					//绘制音符
					var usedTracks=s.usedTracks;
					var dy=0;
					c.lineWidth=1;
					for(var i=0;i<usedTracks.length;i++){
						var track=s.getTrack(usedTracks[i].id);
						var usedChannels=track.usedChannels;
						for(var j=0;j<usedChannels.length;j++){
							var channel=track.getChannel(usedChannels[j].id);
							var list=channel.getDataAABB(viewStart,viewStart+(canvas.width-viewLeft-viewRight)/sizeX);
							//console.log(viewStart);
							for(var k=0;k<list.length;k++){
								//fillStyle()
								if(drawKey(list[k],dy)){
									selInfo.type="key";
									selInfo.data={key:list[k],dy:dy};
								}
							}
							dy+=nodeHeight*channel.posNum+2;
						}
					}
					//绘制节拍线
					var ticksPerBeat=s.ticksPerBeat;
					var beat=(parseInt(viewStart/ticksPerBeat)+1)*ticksPerBeat-viewStart;
					c.strokeStyle="#666";
					while(beat<(viewLeft+viewWidth)/sizeX){
						//if(best)
						c.beginPath();
						c.moveTo(viewLeft+beat*sizeX,viewTop);
						c.lineTo(viewLeft+beat*sizeX,viewTop+viewHeight);
						c.stroke();
						beat+=ticksPerBeat;
					}
				}
				//绘制滚动条
				if(s){
					var barSize=20;
					c.strokeStyle="#888";
					c.fillStyle="#EEE";
					c.beginPath();
					//c.rect(viewLeft,canvas.height-viewBottom+barSize,canvas.width+viewRight+viewLeft,barSize);
					c.rect(viewLeft,viewTop+viewHeight,canvas.width-viewRight-viewLeft,barSize);
					c.fill();
					c.stroke();
					c.fillStyle="#F00";
					c.beginPath();
					c.rect(
						viewLeft+(viewStart/s.tickNumber)*(viewWidth),
						viewTop+viewHeight,
						viewWidth/sizeX/s.tickNumber*viewWidth,
						barSize
					);
					c.fill();
					c.stroke();
				}

				//绘制界面上状态栏
				var barSize=20;
				c.strokeStyle="#888";
				c.fillStyle="#ccc";
				c.rect(0,canvas.height-barSize,canvas.width,barSize);
				c.fill();
				c.stroke();
				//绘制当前时间
				c.fillStyle="#000";
				c.font=barSize+"px 微软雅黑";
				if(checkMouseIn(viewLeft,viewRight,viewWidth,viewHeight)){
					var time=parseInt(((mousePoseX-viewLeft)/sizeX+viewStart)/1);
					c.fillText(parseInt(time/60/100)+":"+parseInt(time/100)%60+"."+(time%100),1,canvas.height-barSize+1);
				}
				if(selInfo.type=="key"){
					// console.log(type[selInfo.data.programNumber]);
					c.fillText(type[selInfo.data.key.programNumber],160,canvas.height-barSize+1);
					c.fillText(sound[selInfo.data.key.noteNumber%sound.length]+parseInt(selInfo.data.key.noteNumber/sound.length),90,canvas.height-barSize+1);
					//重新刷新选中节点
					drawKey(selInfo.data.key,selInfo.data.dy,true);
				}
				requestAnimationFrame(draw);
			}
			draw();

			//事件绑定
			canvas.onmousewheel=function(ev){
				// console.log(ev.altKey);
				if(s&&checkMouseIn(viewLeft,viewRight,viewWidth,viewHeight)){
					if(ev.altKey){
						if(ev.ctrlKey){
							if(ev.wheelDelta<0){
								sizeY*=0.8;
							}else{
								sizeY/=0.8;
							}
						}
					}else if(ev.ctrlKey){
						var olds=sizeX;
						viewStart += (mousePoseX-viewLeft)/sizeX;
						// console.log((mousePoseX-viewLeft)*sizeX);
						if(ev.wheelDelta<0){
							sizeX*=0.8;
						}else{
							sizeX/=0.8;
						}
						// setTimeout(()=>{
						// 	console.log((mousePoseX-viewLeft)*sizeX);
							viewStart -= (mousePoseX-viewLeft)/sizeX;
						// },1000);
						//viewStart+=(mousePoseX-viewLeft)/(olds-sizeX);
					}else{
						viewStart-=ev.wheelDelta/sizeX;
					}
					//draw();
				}
				return false;
			}
			canvas.onmousemove=function(ev){
				//console.log(ev);
				mousePoseX=ev.clientX;
				mousePoseY=ev.clientY;
			}
			// return{
			// 	draw:draw,
			// 	load:data=>s=new SMidiFile(data)
			// }
			this.load=function(data){
				s=new SMidiFile(data);
				viewStart=0;
			}
		}
})();