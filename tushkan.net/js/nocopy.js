function preventSelection(element){
 var preventSelection = false;

 function addHandler(element, event, handler){
 if (element.attachEvent) 
 element.attachEvent('on' + event, handler);
 else 
 if (element.addEventListener) 
 element.addEventListener(event, handler, false);
 }
 function removeSelection(){
 if (window.getSelection) { window.getSelection().removeAllRanges(); }
 else if (document.selection && document.selection.clear)
 document.selection.clear();
 }
 function killCtrlA(event){
 var event = event || window.event;
 var sender = event.target || event.srcElement;

 if (sender.tagName.match(/INPUT|TEXTAREA/i))
 return;

 var key = event.keyCode || event.which;
 if (event.ctrlKey && key == 'A'.charCodeAt(0)) // 'A'.charCodeAt(0) ����� �������� �� 65
 {
 removeSelection();

 if (event.preventDefault) 
 event.preventDefault();
 else
 event.returnValue = false;
 }
 }
 addHandler(element, 'mousemove', function(){
 if(preventSelection)
 removeSelection();
 });
 addHandler(element, 'mousedown', function(event){
 var event = event || window.event;
 var sender = event.target || event.srcElement;
 preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
 });
 addHandler(element, 'mouseup', function(){
 if (preventSelection)
 removeSelection();
 preventSelection = false;
 });
 addHandler(element, 'keydown', killCtrlA);
 addHandler(element, 'keyup', killCtrlA);
 }

 preventSelection(document);

var Base64 = {
   _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    decode : function (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
     while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
       enc2 = this._keyStr.indexOf(input.charAt(i++));
       enc3 = this._keyStr.indexOf(input.charAt(i++));
       enc4 = this._keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
       output = output + String.fromCharCode(chr1);
       if( enc3 != 64 ){
          output = output + String.fromCharCode(chr2);
        }
        if( enc4 != 64 ) {
          output = output + String.fromCharCode(chr3);
        }
   }
   output = Base64._utf8_decode(output);
     return output;
   },
    _utf8_decode : function (utftext) {
      var string = "";
      var i = 0;
      var c = c1 = c2 = 0;
      while( i < utftext.length ){
       c = utftext.charCodeAt(i);
      if (c < 128) {
         string += String.fromCharCode(c);
         i++;
       }else if( (c > 191) && (c < 224) ) {
         c2 = utftext.charCodeAt(i+1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        }else {
          c2 = utftext.charCodeAt(i+1);
          c3 = utftext.charCodeAt(i+2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
     }
     return string;
    }
 }     