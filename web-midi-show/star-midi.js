var SMidiFile=(function(){
	var MidiChannel=function(){
		var events=[];
		var key=[];
		var nowtype=0;//记录音色
		var statsCatch={};//记录按键
		var posList=[];
		this._events=events;
		var tickNumber=0;
		Object.defineProperty(this,"pushEvent",{
			value:function(even){
			// even.evenTick=tickNumber;
			// tickNumber+=even.deltaTime;
				events.push(even);
				if(even.subtype=="programChange"){
					nowtype=even.programNumber;
				}else if(even.subtype=="noteOn"){
					if(!statsCatch[even.noteNumber]){
						var pos=Object.keys(statsCatch).length
						if(posList.length)pos=posList.pop();
						statsCatch[even.noteNumber]={even,nowtype,pos};
					}
				}else if(even.subtype=="noteOff"){
					//this.nowtype=programNumber;
					if(statsCatch[even.noteNumber]){
						key.push({
							noteNumber:even.noteNumber,
							start:statsCatch[even.noteNumber].even.evenTick,
							end:even.evenTick,
							programNumber:nowtype,
							pos:statsCatch[even.noteNumber].pos
						});
						posList.push(statsCatch[even.noteNumber].pos);
						delete statsCatch[even.noteNumber];
					}
				}
			},
			writable: false
		});
		Object.defineProperty(this,"length",{
			get:function(){return events.length}
		});
		Object.defineProperty(this,"posNum",{
			get:function(){return posList.length}
		});
		Object.defineProperty(this,"totalKeyNum",{
			get:function(){return key.length}
		});
		Object.defineProperty(this,"getDataAABB",{
			value:function(start,end){
				var data=[];
				var i=0;
				for(var i=0;i<key.length;i++){
					if((key[i].start>start&&key[i].start<end)||(key[i].end>start&&key[i].end<end)||(key[i].start<start&&key[i].end>end)){
						data.push(key[i]);
					}
				}
				return data;
			},
			writable: false,
			enumerable:false
		});
	}
	var MidiTrack=function(data){
		var channels=[];
		this._channel=channels;
		var tickNumber=0;
		for(var i=0;i<16;i++) channels[i]=new MidiChannel();
		for(var j=0;j<data.length;j++){
			var item=data[j];
			tickNumber+=item.deltaTime;
			item.evenTick=tickNumber;
			switch(item.type){
				case "channel":
					// switch(item.subtype){
					// 	case "programChange":
					// 		console.log(item.channel,item.programNumber,type[item.programNumber],item);
					// 		break;
					// }
					channels[item.channel].pushEvent(item);
			}
		}
		Object.defineProperty(this,"tickNumber",{
			value:tickNumber,
			writable: false,
			enumerable:true
		});
		Object.defineProperty(this,"usedChannels",{
			get:function(){
				var list=[];
				for(var i=0;i<channels.length;i++){
					if(channels[i].length>0){
						list.push({id:i});
					}
				}
				return list;
			}
		});
		Object.defineProperty(this,"getChannel",{
			value:function(i){return channels[i]},
			writable: false,
			enumerable:false
		});
		Object.defineProperty(this,"totalKeyNum",{
			get:function(){
				var t=0;
				for(var i=0;i<channels.length;i++){
					t+=channels[i].totalKeyNum
				}
				return t;
			}
		});
	}
	return function(data){
		var file=MidiFile(data);
		console.log(file);
		//this.file=file;

		var data=[];
		this._data=data;
		for(var i=0;i<file.tracks.length;i++){
			data.push(new MidiTrack(file.tracks[i]));
			
		}
		console.log(data);
		//this._data=[];
		Object.defineProperty(this,"tracksNumber",{
			value:file.tracks.length,
			writable: false,
			enumerable:true
		});
		Object.defineProperty(this,"usedTracks",{
			get:function(){
				var list=[];
				for(var i=0;i<data.length;i++){
					if(data[i].usedChannels.length>0){
						list.push({id:i})
					}
				}
				return list;
			}
		});
		Object.defineProperty(this,"getTrack",{
			value:function(i){return data[i]},
			writable: false,
			enumerable:false
		});
		Object.defineProperty(this,"tickNumber",{
			get:function(){
				var number=0;
				for(var i=0;i<data.length;i++){
					if(data[i].tickNumber>number){
						number=data[i].tickNumber;
					}
				}
				return number;
			}
		});
		Object.defineProperty(this,"ticksPerBeat",{
			get:function(){
				return file.header.ticksPerBeat;
			}
		});
		Object.defineProperty(this,"totalKeyNum",{
			get:function(){
				var t=0;
				for(var i=0;i<data.length;i++){
					t+=data[i].totalKeyNum
				}
				return t;
			}
		});
	}
})();