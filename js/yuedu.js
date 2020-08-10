
var _num = 10;

function LastRead(){
	this.bookList="bookList"
}
LastRead.prototype={
	set:function(bid,tid,title,texttitle){
		if(!(bid&&tid&&title&&texttitle))return;
		var v=bid+'#'+tid+'#'+title+'#'+texttitle;
		this.setItem(bid,v);
		this.setBook(bid)
	},

	get:function(k){
		return this.getItem(k)?this.getItem(k).split("#"):"";
	},

	remove:function(k){
		this.removeItem(k);
		this.removeBook(k)
	},

	setBook:function(v){
		var reg=new RegExp("(^|#)"+v);
		var books =	this.getItem(this.bookList);
		if(books==""){
			books=v
		}
		else{
			if(books.search(reg)==-1){
				books+="#"+v
			}
			else{
				books.replace(reg,"#"+v)
			}
		}
		this.setItem(this.bookList,books)

	},

	getBook:function(){
		var v=this.getItem(this.bookList)?this.getItem(this.bookList).split("#"):Array();
		var books=Array();
		if(v.length){

			for(var i=0;i<v.length;i++){
				var tem=this.getItem(v[i]).split('#');
				if(i>v.length-(_num+1)){
					if (tem.length>3)	books.push(tem);
				}
				else{
					lastread.remove(tem[0]);
				}
			}
		}
		return books
	},

	removeBook:function(v){
		var reg=new RegExp("(^|#)"+v);
		var books =	this.getItem(this.bookList);
		if(!books){
			books=""
		}
		else{
			if(books.search(reg)!=-1){
				books=books.replace(reg,"")
			}

		}
		this.setItem(this.bookList,books)

	},

	setItem:function(k,v){
		if(!!window.localStorage){
			localStorage.setItem(k,v);
		}
		else{
			var expireDate=new Date();
			var EXPIR_MONTH=30*24*3600*1000;
			expireDate.setTime(expireDate.getTime()+12*EXPIR_MONTH)
			document.cookie=k+"="+encodeURIComponent(v)+";expires="+expireDate.toGMTString()+"; path=/";
		}
	},

	getItem:function(k){
		var value=""
		var result=""
		if(!!window.localStorage){
			result=window.localStorage.getItem(k);
			value=result||"";
		}
		else{
			var reg=new RegExp("(^| )"+k+"=([^;]*)(;|\x24)");
			var result=reg.exec(document.cookie);
			if(result){
				value=decodeURIComponent(result[2])||""}
		}
		return value

	},

	removeItem:function(k){
		if(!!window.localStorage){
			window.localStorage.removeItem(k);
		}
		else{
			var expireDate=new Date();
			expireDate.setTime(expireDate.getTime()-1000)
			document.cookie=k+"= "+";expires="+expireDate.toGMTString()
		}
	},
	removeAll:function(){
		if(!!window.localStorage){
			window.localStorage.clear();
		}
		else{
			var v=this.getItem(this.bookList)?this.getItem(this.bookList).split("#"):Array();
			var books=Array();
			if(v.length){
				for( i in v ){
					var tem=this.removeItem(v[k])
				}
			}
			this.removeItem(this.bookList)
		}
	}
}

function showbook(){
	var showbook=document.getElementById('banner');
	var bookhtml='<ul style="margin:10px 0px;">';
	var books=lastread.getBook();
	if(books.length){

		for(var i=books.length-1;i>-1;i--){//for(var i=0 ;i<books.length;i++){
			var __17mb_sid = parseInt(books[i][0]/1000);

			bookhtml+='<div class="book-item">';
			bookhtml+='<a class="book-a"  href="/article/'+__17mb_sid+'/'+books[i][0]+'/'+books[i][1]+'.html" >';
			bookhtml+='<div class="book-box">';
			bookhtml+='<img src="'+__17mb_pcurl+'/image/'+__17mb_sid+'/'+books[i][0]+'/'+books[i][0]+'s.jpg" alt="">';
			bookhtml+='</div>';
			bookhtml+='<div class="book-info">';
			bookhtml+='<div class="chapter-item">';
			bookhtml+='<h4 class="title">'+books[i][2]+'</h4>';
			bookhtml+='<p class="mark_info">';
			bookhtml+='<em>上次阅读：</em>'+books[i][3];
			bookhtml+='</p>';
			bookhtml+='</div>';
			bookhtml+='</div>';
			bookhtml+='</a><a style="position:absolute;bottom:20px;right:20px;border:1px solid #84D9CA;border-radius:5px;padding:5px 12px;color:#999" href="javascript:removebook(\''+books[i][0]+'\')">删除记录</a>';
			bookhtml+='</div>';




		}
		showbook.innerHTML=bookhtml+"</ul>";
	}
	else{
		showbook.innerHTML=bookhtml+"还没开始阅读！</ul>";
	}


}

function removebook(k){
	lastread.remove(k);
	showbook()
}



function yuedu(){
	//document.write("<a href='javascript:showbook();' target='_self'>点击查看阅读记录</a>");
	showbook();
}

window.lastread = new LastRead();

