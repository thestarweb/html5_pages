function log(info){
	document.getElementById("out_info").innerHTML+=info+"<br/>";
}
var working=false;
var c=document.getElementById("m1");
var pen=c.getContext('2d');
var c2=document.getElementById("m2");
var pen2=c2.getContext('2d');
var image1=null;image2=null;
var i=0,imgData=null,imgData2=null;
var jd_bar=document.getElementById("jd_bar"),jd_num=document.getElementById("jd_num");
function run(){//这里分开操作是为了不因为线程锁死导致页面不更新
	var color;
	var this_max=imgData.data.length>400?i+400:imgData.data.length;
	for(;i<this_max;i+=4){
		color=imgData.data[i]<20&&imgData2.data[i]<20?0:255;
		imgData.data[i]=color;
		imgData.data[i+1]=color;
		imgData.data[i+2]=color;
	}
	var jd=i/imgData.data.length*100;
	if(this_max==imgData.data.length){
		pen.putImageData(imgData,0,0);
		working=false;
		log("去噪完成(右键另存为即可)");
		var img=document.createElement("canvas");
		document.getElementById("out_info").appendChild(img);
		img.width=c.width;
		img.height=c.height;
		img.getContext("2d").putImageData(imgData,0,0);
		jd=100;
	}
	else setTimeout(run,2);
	jd_bar.style.width=jd+"%";
	jd_num.innerHTML=jd.toFixed(2);
}
document.getElementById("start").onclick=function(){
	if(working){
		log("本程序不支持多组图片同时操作哦");
		return;
	}
	if(!image1||!image2){
		log("缺少图片");
		return;
	}
	working=true;
	imgData=pen.getImageData(0,0,c.width,c.height);
	imgData2=pen2.getImageData(0,0,c.width,c.height);
	i=0;
	log("开始去噪");
	setTimeout(run,10);
	//pen.putImageData(imgData,0,0);
}
document.getElementById("file1").onchange=function(){
	if(working){
		log("本程序不支持多组图片同时操作哦");
		return
	}
	if(/\.(png|jpg|jpeg|gif)$/i.test(this.value)){
		//var reader = new FileReader();
		//reader.readAsDataURL(this.files[0]);
		var img=new Image();
		img.onload=function(){
			c.width=this.width;
			c.height=this.height;
			pen.drawImage(this,0,0,this.width,this.height);
			image1=true;
			log("图片1已加载完成");
		}
		img.src=URL.createObjectURL(this.files[0]);
	}else{
		log("图片1不是一个可识别的图片");
	}
}
document.getElementById("file2").onchange=function(){
	if(working){
		log("本程序不支持多组图片同时操作哦");
		return;
	}
	if(/\.(png|jpg|jpeg|gif)$/i.test(this.value)){
		//var reader = new FileReader();
		//reader.readAsDataURL(this.files[0]);
		var img=new Image();
		img.onload=function(){
			c2.width=this.width;
			c2.height=this.height;
			pen2.drawImage(this,0,0,this.width,this.height);
			image2=true;
			log("图片2已加载完成");
		}
		img.src=URL.createObjectURL(this.files[0]);
	}else{
		log("图片2不是一个可识别的图片");
	}
}
log("脚本加载完成");