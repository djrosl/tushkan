var opens=[];
var isSel=0;
var bbtags   = new Array();
var myAgent   = navigator.userAgent.toLowerCase();
var myVersion = parseInt(navigator.appVersion);

var is_ie   = ((myAgent.indexOf("msie") != -1)  && (myAgent.indexOf("opera") == -1));
var is_nav  = ((myAgent.indexOf('mozilla')!=-1) && (myAgent.indexOf('spoofer')==-1)
&& (myAgent.indexOf('compatible') == -1) && (myAgent.indexOf('opera')==-1)
&& (myAgent.indexOf('webtv') ==-1)       && (myAgent.indexOf('hotjava')==-1));

var is_win   =  ((myAgent.indexOf("win")!=-1) || (myAgent.indexOf("16bit")!=-1));
var is_mac    = (myAgent.indexOf("mac")!=-1);

function cstat(fi){
if (!fi){fi='';}
var c = stacksize(bbtags);

if ( (c < 1) || (c == null) ) {
c = 0;
}

if ( ! bbtags[0] ) {
c = 0;
}
eval('document.getElementById("tagcount'+fi+'").value='+c);
}

function stacksize(thearray){
for (i = 0 ; i < thearray.length; i++ ) {
if ( (thearray[i] == "") || (thearray[i] == null) || (thearray == 'undefined') ) {
return i;
}
}

return thearray.length;
}

function pushstack(thearray,newval,fi){
arraysize = stacksize(thearray);
thearray[arraysize] = newval;
}

function popstack(thearray){
arraysize = stacksize(thearray);
theval = thearray[arraysize - 1];
delete thearray[arraysize - 1];
return theval;
}

function closeall(wh,fi){
if (!fi){fi='';}
if (!wh){wh='message';}	
if (bbtags[0]) {
try {
while (bbtags[0]) {
tagRemove = popstack(bbtags)
document.getElementById(wh).value += "[/" + tagRemove + "]";
if ( (tagRemove != 'font') && (tagRemove != 'size') && (tagRemove != 'color') ){
if (tagRemove=='code'){
eval("document.getElementById('codes"+fi+"').value = ' " + tagRemove + " '");
}
else {
eval("document.getElementById('"+tagRemove+fi+"').value = ' " + tagRemove + " '");
}
opens[tagRemove+fi]=0;
}
}
} catch(e){}
}

eval('document.getElementById("tagcount'+fi+'").value=0');
bbtags = new Array();
document.getElementById(wh).focus();
}


function emoticon(theSmilie,wh){
doInsert(" " + theSmilie + " ","",false,wh);
}

function add_code(NewCode,wh){
if (!wh){wh='message';}
document.getElementById(wh).value += NewCode;
document.getElementById(wh).focus();
}

function alterfont(theval,thetag,wh,fi){
if (!fi){fi='';}
if (theval == 0)
return;

if(doInsert("[" + thetag + "=" + theval + "]", "[/" + thetag + "]",true,wh))
pushstack(bbtags,thetag);

cstat(fi);
}

function _alterfont(theval,thetag,wh){
if (theval == 0){return;}
if (thetag=='size'){doInsert('<span style="font-size:'+theval+'pt">','</span>',3,wh);}
else if (thetag=='color'){doInsert('<span style="color:'+theval+'">',"</span>",3,wh);}
else if (thetag=='font'){doInsert('<span style="font-family:\''+theval+'\'">',"</span>",3,wh);}
else if (thetag=='pos'){doInsert('<div align="'+theval+'">',"</div>",3,wh);}
}

function _simpletag(thetag,wh){
simpletag(thetag,'','',wh,'',1);
}

function simpletag(thetag,fid,chtxt,wh,fi,tp){
if(!fi){fi='';}
var tagOpen;
tagOpen = opens[thetag+fid];
var bracket1='['; var bracket2=']'; var doClose = true;
if (tp){bracket1='<';bracket2='>';doClose=3;}	
if (!tagOpen){
	if(doInsert(bracket1+thetag+bracket2, bracket1+"/"+thetag+bracket2,doClose,wh) && !tp){
		opens[thetag+fid]=1;	
		if (fid){
			document.getElementById(fid).value=chtxt+'*';
		}
		else {
			if (thetag=='code'){
				eval("document.getElementById('codes"+fi+"').value += '*'");
			}
			else {                        
				eval("document.getElementById('"+thetag+fi+"').value += '*'");
			}
		}
		pushstack(bbtags,thetag,fi);
		cstat(fi);
	}
}
else {
	lastindex = 0;
	for (i = 0 ; i < bbtags.length; i++ ){
		if ( bbtags[i] == thetag ){
			lastindex = i;
		}
	}

	while (bbtags[lastindex]){
		tagRemove = popstack(bbtags);
		doInsert("[/" + tagRemove + "]", "",false,wh)
		if ( (tagRemove != 'font') && (tagRemove != 'size') && (tagRemove != 'color') ){
			if (fid){
				document.getElementById(fid).value=chtxt;
			}
			else {
				if (thetag=='code'){
					eval("document.getElementById('codes"+fi+"').value = '"+tagRemove+"'");
				}
				else {
					eval("document.getElementById('"+tagRemove+fi+"').value = '"+tagRemove+"'");
				}
			}
			opens[tagRemove+fid]=0;
		}
	}

	cstat(fi);
}
}

function tag_list(wh){
var listvalue = "init";
var thelist = "";
while ( (listvalue != "") && (listvalue != null) ){
listvalue = prompt('List item', "");
if ( (listvalue != "") && (listvalue != null) ){
thelist = thelist+"[*]"+listvalue+"\n";
}
}
if ( thelist != "" ){doInsert( "[list]\n" + thelist + "[/list]\n", "",false,wh);}
}

function _tag_list(wh){
var listvalue = "init";
var thelist = "";
while ( (listvalue != "") && (listvalue != null) ){
listvalue = prompt('List item', "");
if ( (listvalue != "") && (listvalue != null) ){
thelist = thelist+"<li>"+listvalue+"\n";
}
}
if ( thelist != "" ){doInsert( "<ul>\n" + thelist + "</ul>\n", "", false,wh);}
}


function _tag_url(wh){
var enterURL  = prompt('Site address', "http://");
var enterTITLE=isSelected(wh);
if (enterTITLE.length==0){
	enterTITLE = prompt('Site name',"My WebPage"); 		
}
if (!enterURL || enterURL=='http://'){
	return;
}
else if (!enterTITLE) {
	return;
}

doInsert('<a href="'+enterURL+'" target="_blank">'+enterTITLE+'</a>',"",false,wh);	
}

function _tag_image(wh){
var FoundErrors = '';
var enterURL   = prompt('Image URL', "http://");
if (!enterURL || enterURL=='http://') {return;}
doInsert('<img border="0" align="absmiddle" src="'+enterURL+'">',"",false,wh);
}

function _tag_email(wh) {
var emailAddress = prompt('E-mail address',"");

if (!emailAddress) {return;}
var enterTITLE=isSelected(wh);
if (enterTITLE.length>0){
	doInsert('<a href="mailto:'+emailAddress+'">'+enterTITLE+'</a>',"",false,wh);	
}
else {
	doInsert('<a href="mailto:'+emailAddress+'">'+emailAddress+'</a>',"",false,wh);	
}

}

function tag_url(wh){
var enterURL  = prompt('Site address', "http://");
var enterTITLE=isSelected(wh);
if (enterTITLE.length==0){
	enterTITLE = prompt('Site name',"My WebPage"); 		
}
if (!enterURL || enterURL=='http://'){
	return;
}
else if (!enterTITLE) {
	return;
}
doInsert("[url="+enterURL+"]"+enterTITLE+"[/url]","",false,wh);	
}

function tag_url2(wh){
var enterURL  = prompt('Site address', "http://");
var enterTITLE=isSelected(wh);
if (enterTITLE.length==0){
	enterTITLE = prompt('Site name',"My WebPage"); 		
}
if (!enterURL || enterURL=='http://'){
	return;
}
else if (!enterTITLE) {
	return;
}
if(confirm('Индексировать ссылку? Отмена - nofollow')){
	tag = 'furl'
} else {
	tag = 'url'
}

doInsert("["+tag+"="+enterURL+"]"+enterTITLE+"[/"+tag+"]","",false,wh);	
}

function tag_hide(wh){
var enterhide  = parseInt(prompt('Minimum messages for showing', ""));
if(enterhide>1000000){
	alert('max 1000000');
	return;
}
var enterTITLE=isSelected(wh);

var insert = "[hide" + (enterhide > 0 ? ("=" + enterhide) : "") + "]"+enterTITLE+"[/hide]"
doInsert(insert,"",false,wh);	
}

function tag_image(wh){
var FoundErrors = '';
var enterURL   = prompt('Image URL',"http://");

if (!enterURL || enterURL=='http://' || enterURL.length<20) {
return;
}

doInsert("[img]"+enterURL+"[/img]","",false,wh);
}

function tag_email(wh) {
var emailAddress = prompt('E-mail address',"");

if (!emailAddress) {return;}
var enterTITLE=isSelected(wh);
if (enterTITLE.length>0){
	doInsert("[email="+emailAddress+"]"+enterTITLE+"[/email]","",false,wh);	
}
else {
	doInsert("[email]"+emailAddress+"[/email]","",false,wh);	
}

}

function doInsert(ibTag,ibClsTag,isSingle,wh){
if (!wh){wh='message';}
var isClose = false;
var obj_ta = document.getElementById(wh);
var txtStart = obj_ta.selectionStart;
var txtEnd   = obj_ta.selectionEnd;
if ( (myVersion >= 4) && is_ie && is_win)
{ 
if(obj_ta.isTextEdit){
obj_ta.focus();
var sel = document.selection;
var rng = sel.createRange();
rng.colapse;
if((sel.type == "Text" || sel.type == "None") && rng != null){
if(ibClsTag != "" && rng.text.length > 0)
ibTag += rng.text + ibClsTag;
else if(isSingle)
isClose = true;
rng.text = ibTag;
}
}
else{
if(isSingle)
isClose = true;
obj_ta.value += ibTag;
}
}
else try {
var scr = obj_ta.scrollTop;
if(!(txtStart >= 0)) throw 1;
if(ibClsTag != "" && obj_ta.value.substring(txtStart,txtEnd).length>0) {
obj_ta.value = obj_ta.value.substring(0,txtStart) + ibTag + obj_ta.value.substring(txtStart,txtEnd) + ibClsTag + obj_ta.value.substring(txtEnd,obj_ta.value.length);
} else {
if(isSingle) isClose = true;  
if (isSel==1){obj_ta.value = obj_ta.value.substring(0,txtStart) + ibTag + obj_ta.value.substring(txtEnd,obj_ta.value.length);}
else {obj_ta.value = obj_ta.value.substring(0,txtStart) + ibTag +(isSingle==3?ibClsTag:'')+ obj_ta.value.substring(txtStart,obj_ta.value.length);}
}
obj_ta.scrollTop=scr;
} catch(e) {
if(isSingle){isClose = true;}
obj_ta.value += ibTag;
}
try {
	if( txtStart == void 0 ) {
		obj_ta.focus();
		var range = document.selection.createRange();
		range.select();
	} else if( txtStart != txtEnd ) {
		obj_ta.selectionStart = txtStart;
		obj_ta.selectionEnd   = txtEnd + ibTag.length + ibClsTag.length;
	} else {
		var cursorPosition    = txtStart + ibTag.length;
		obj_ta.selectionStart = cursorPosition;
		obj_ta.selectionEnd   = cursorPosition;
	};
} finally {}
obj_ta.focus();
return isClose;
}



function isSelected(wh){
if (!wh){wh='message';}
var obj_ta = document.getElementById(wh);

if ( (myVersion >= 4) && is_ie && is_win){
	if(obj_ta.isTextEdit){
		obj_ta.focus();
		var sel = document.selection;
		var rng = sel.createRange();
		rng.colapse;
		if((sel.type == "Text" || sel.type == "None") && rng != null){
			if(rng.text.length > 0){
				isSel=1;
				return rng.text;		
			}
		}
	}
	return '';
}
try {

	var txtStart = obj_ta.selectionStart;
	if(!(txtStart >= 0)) throw 1;
	var txtEnd   = obj_ta.selectionEnd;
	if(obj_ta.value.substring(txtStart,txtEnd).length>0) {
		isSel=1;
		return obj_ta.value.substring(txtStart,txtEnd);
	}
} catch(e) {}
return '';
}