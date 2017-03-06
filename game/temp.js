(function(){
	
	//获取字符串的真实长度（字节长度）
	function getTrueLength(str){
		var len = str.length, trueLen = 0;
		for(var x = 0; x < len; x++){
			if(str.charCodeAt(x) > 128){
				trueLen += 2;
			}else{
				trueLen += 1;
			}
		}
		return trueLen;
	}
	
	//按字节长度截取字符串，返回substr截取位置
	function cutString(str, leng){
		var len = str.length, pos = len, nlen = 0;
		for(var x = 0; x < len; x++){
			if(str.charCodeAt(x) > 128){	//双字节.
				if(nlen + 2 < leng){
					nlen += 2;
				} else {
					pos = x;
					break;
				}
			} else {
				if(nlen + 1 < leng){
					nlen += 1;
				}else{
					pos = x;
					break;
				}
			}
		}
		return pos;
	}
	
	function writeTextOnCanvas(canvas, lineheight, rw, text){
		text = text.replace(/^\s+|\s+$/, "");		
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.font = "16px 微软雅黑";
		ctx.fillStyle = "#f00";
		
		for(var i = 1; getTrueLength(text) > 0; i++){
			var tl = cutString(text, rw);
			ctx.fillText(text.substr(0, tl), 5, i * lineheight);
			text = text.substr(tl);
		}
	}
	
	//-------------------------------------------------------------------------------------
		
	var textBox = document.getElementById("input");
	var canvas = document.getElementById('ft');
	
	writeTextOnCanvas(canvas, 22, 50, textBox.value);
	
	textBox.onkeyup = function(){
		writeTextOnCanvas(canvas, 22, 50, this.value);
	}
})();