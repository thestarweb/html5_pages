ChemicalFormula=function(data){
	this.name=data;
	this.info={};
	var task={start:"",data:{}};
	var stack=[task];
	//var res={name:data,info:{},error:""};
	var atom="";
	var number=0;
	for(var i=0;i<data.length;i++){
		if(data[i]=="("||data[i]=="["){
			if((data[i]==")"&&task.start!="(")||(data[i]=="]"&&task.start!="[")){
				throw new SyntaxError("括号不匹配");
				return;
			}
			if(typeof atom=="object"){//原子团
				for(var j in atom.data){
					task.data[j]=(task.data[j]||0)+atom.data[j]*(number||1);
				}
			}else if(atom!=""){
				task.data[atom]=(task.data[atom]||0)+(number||1);
			}
			atom="";
			number=0;
			task={start:data[i],data:{}};
			stack.push(task);
		}else if(data[i]==")"||data[i]=="]"){
			if((data[i]==")"&&task.start!="(")||(data[i]=="]"&&task.start!="[")){
				throw new SyntaxError("括号不匹配");
				return;
			}
			if(typeof atom=="object"){//原子团
				for(var j in atom){
					task.data[j]=(task.data[j]||0)+atom[j]*(number||1);
				}
			}else if(atom!=""){
				task.data[atom]=(task.data[atom]||0)+(number||1);
			}
			atom=task;
			number=0;
			stack.pop();
			task=stack[stack.length-1];
		}else if(data[i].toLowerCase()==data[i]){
			if(atom==""){
				throw new SyntaxError("化学式请用元素开头");
				return;
			}
			if(data[i].toUpperCase()==data[i]){//不是大写也不是小写，可能是数字也可能是特殊字符
				if(data[i]==parseInt(data[i])){
					number*=10;
					number+=data[i]*1;
				}else{
					//this.error="非法字符"+data[i];
					throw new SyntaxError("非法字符"+data[i]);
					return;
				}
			}else{
				if(number!=0){
					throw new SyntaxError("数字后面应该为新的元素符号");
					return;
				}
				//小写字母拼接在原子名之后
				atom+=data[i];
			}
		}else{
			if(typeof atom=="object"){//原子团
				for(var j in atom.data){
					task.data[j]=(task.data[j]||0)+atom.data[j]*(number||1);
				}
			}else if(atom!=""){
				task.data[atom]=(task.data[atom]||0)+(number||1);
			}
			atom=data[i];//新元素的开始
			number=0;
		}
	}
	if(atom==""){
		throw new SyntaxError("化学式不能为空");
	}else if(typeof atom=="object"){//原子团
		for(var j in atom.data){
			task.data[j]=(task.data[j]||0)+atom.data[j]*(number||1);
		}
	}else {
		task.data[atom]=(task.data[atom]||0)+(number||1);
	}
	this.info=task.data;
	console.log(this);
}
