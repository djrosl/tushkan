/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);

function filmVote(id, type) {
    $.ajax({ type: 'post', url: '/news/votefilm',
        data: { id: id, type: type == 'cool' ? 1 : -1 },
        success: function(a) {
            var r = a.split('|');
            alert(r[1]);
            if(r[0] == 'ok') {
                $('#vote' + type).text(parseInt($('#vote' + type).text()) + 1);
            }
        }
    });
}

var filmoteka = {
    type1: {
        text: ['В избранное', 'Удалить из избранного'],
        id: 'btn-favorite',
    },
    type2: {
        text: ['Хочу посмотреть', 'Удалить из плейлиста'],
        id: 'btn-playlist',
    },
    type3: {
        text: ['Уже посмотрел', 'Удалить из плейлиста'],
        id: 'btn-watched',
    },
    removeFilmoteka: function (id, type) {
        $.ajax({ type: 'post', url: '/news/filmoteka',
            data: { id: id, type: type, task: 'remove' },
            success: function(a) {
                var r = a.split('|');
                if(r[1] != '') alert(r[1]);
                if(r[0] == 'ok') {
                    if(!filmoteka['type'+type]) {
                        return;
                    }
                    var text = filmoteka['type'+type].text[0];
                    $('#' + filmoteka['type'+type].id).attr('title', text).text(text).attr('onclick', 'filmoteka.addFilmoteka(' + id + ', ' + type + ')');
                }
                if(type == 3) {
                    $('.watched').hide();
                }
            }
        });
    },
    addFilmoteka: function (id, type) {
        /*if(type == 3) {
            if(!confirm('Вы уверены? Данное действие необратимо.')) {
                return;
            }
        }*/
        $.ajax({ type: 'post', url: '/news/filmoteka',
            data: { id: id, type: type, task: 'add' },
            success: function(a) {
                var r = a.split('|');
                if(r[0] == 'register') {
                    $('#popuplogin').show();
                    return;
                }
                if(r[1] != '') {
                    alert(r[1]);
                }
                if(r[0] == 'ok') {
                    if(filmoteka['type'+type]) {
                        var text = filmoteka['type'+type].text[1];
                        $('#' + filmoteka['type'+type].id).attr('title', text).text(text).attr('onclick', 'filmoteka.removeFilmoteka(' + id + ', ' + type + ')');
                    }
                    switch(type) {
                        case 1: //favorite
                            break;
                        case 2: //playlist
                            break;
                        case 3: //watched
                            //$('#btn-watched').addClass('disabled').attr('onclick', '');
                            $('.watched').show();
                            //if(r[2] != 1 && confirm('Добавить фильм в избранное?')) {
                            //    filmoteka.addFilmoteka(id, 1);
                            //}
                            if(r[3] == 1 && confirm('Удалить из плейлиста?')) {
                                filmoteka.removeFilmoteka(id, 2);
                            }
                            break;
                    }
                }
            }
        });
    }
}

$(document).ready(function(){
        $(".btn-slide").click(function(){ 
        $("#panel").slideToggle("fast"); 
        $(this).toggleClass("active"); return false;

        }); 

    $('#likebar .cool').click(function() {
        filmVote($(this).data('video'), 'cool');
    });

    $('#likebar .bad').click(function() {
        filmVote($(this).data('video'), 'bad');
    });

    $('#addrequestform').submit(function(e) {

        e.preventDefault();
        var error = false, $this = $(this), domThis = this;

        if($this.find('input[name=title]').val() == '') {
            alert('Укажите название фильма');
            error = true;
        }

        if($this.find('input[name=year]').val() == '') {
            alert('Укажите год фильма');
            error = true;
        }

        if(!error) {
            $.ajax({
                data: $this.serialize(),
                url: $this.attr('action'),
                type: $this.attr('method'),
                success: function(a) {
                    if(a == '') {
                        alert('Ваша заявка принята');
                        window.location.reload();
                        //domThis.reset();
                        //$('#addsiterequest').slideUp();
                    } else {
                        alert(a);
                    }
                }
            });
        }

        return false;
    });

 });

function inf1() {
 $('#inf_1').css({display:'block'});
 if($('#inf1').css({display:'block'})) {
  $('#inf_2').css({display:'none'});
  $('#inf_3').css({display:'none'});
  }
};
function inf2() {
 $('#inf_2').css({display:'block'});
 if($('#inf2').css({display:'block'})) {
  $('#inf_1').css({display:'none'});
  $('#inf_3').css({display:'none'});
  };
};
function inf3() {
 $('#inf_3').css({display:'block'});
 if($('#inf3').css({display:'block'})) {
  $('#inf_2').css({display:'none'}); 
  $('#inf_1').css({display:'none'});
  } 
};

function getBrowserInfo() {
 var t,v = undefined;
 if (window.opera) t = 'Opera';
 else if (document.all) {
  t = 'IE';
  var nv = navigator.appVersion;
  var s = nv.indexOf('MSIE')+5;
  v = nv.substring(s,s+1);
 }
 else if (navigator.appName) t = 'Netscape';
 return {type:t,version:v};
}
 
function bookmark(a){
 var url = window.document.location;
 var title = window.document.title;
 var b = getBrowserInfo();
 if (b.type == 'IE' && 7 > b.version && b.version >= 4) window.external.AddFavorite(url,title);
 else if (b.type == 'Opera') {
  a.href = url;
  a.rel = "sidebar";
  a.title = url+','+title;
  return true;
 }
 else if (b.type == "Netscape") window.sidebar.addPanel(title,url,"");
 else alert("Нажмите CTRL-D, чтобы добавить страницу в закладки.");
 return false;
}

/*
Author: Maenkov Vladimir
WEB: mvcreative.ru
*/

$(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() >= 50) {
			$('.upTop').fadeIn(200);
			$('.upTop').hover(function() {
				$('.upTopZone').fadeIn(100);
			}, function() {
				$('.upTopZone').fadeOut(100);
			});
		} else {
			$('.upTop, .upTopZone').fadeOut(200);
		}
	});
	$('.upTopZone, .upTopButton').click(function () {
		$('body, html').animate({scrollTop:0}, 1000);
	});
});


if(typeof window.ulb==="undefined"){window.ulb={}}(function(h,b,f){var d=f(h),n=f(b),g=f.fancybox=function(){g.open.apply(this,arguments)},k=!1,j="undefined"!==typeof b.createTouch;var c;f.extend(g,{version:"2.0.5",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,autoSize:!0,autoResize:!j,autoCenter:!j,fitToView:!0,aspectRatio:!1,topRatio:0.5,fixed:!(f.browser.msie&&6>=f.browser.version)&&!j,scrolling:"auto",wrapCSS:"fancybox-default",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3000,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},keys:{next:[13,32,34,39,40],prev:[8,33,37,38],close:[27]},tpl:{wrap:'<div class="fancybox-wrap"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0"'+(f.browser.msie?' allowtransparency="true"':"")+"></iframe>",swf:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',error:'<p class="fancybox-error">'+ulb.error+"</p>",closeBtn:'<div title="'+ulb.closeBtn+'" class="fancybox-item fancybox-close"></div>',next:'<a title="'+ulb.next+'" href="javascript://" class="fancybox-nav fancybox-next"><span></span></a>',prev:'<a title="'+ulb.prev+'" href="javascript://" class="fancybox-nav fancybox-prev"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:300,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:300,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:{speedIn:0,speedOut:300,opacity:0.8,css:{cursor:"pointer"},closeClick:!0},title:{type:"float"}}},group:{},opts:{},coming:null,current:null,isOpen:!1,isOpened:!1,wrap:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,e){g.close(!0);a&&!f.isArray(a)&&(a=a instanceof f?f(a).get():[a]);g.isActive=!0;g.opts=f.extend(!0,{},g.defaults,e);f.isPlainObject(e)&&"undefined"!==typeof e.keys&&(g.opts.keys=e.keys?f.extend({},g.defaults.keys,e.keys):!1);g.group=a;g._start(g.opts.index||0)},cancel:function(){g.coming&&!1===g.trigger("onCancel")||(g.coming=null,g.hideLoading(),g.ajaxLoad&&g.ajaxLoad.abort(),g.ajaxLoad=null,g.imgPreload&&(g.imgPreload.onload=g.imgPreload.onabort=g.imgPreload.onerror=null))},close:function(a){g.cancel();g.current&&!1!==g.trigger("beforeClose")&&(g.unbindEvents(),!g.isOpen||a&&!0===a[0]?(f(".fancybox-wrap").stop().trigger("onReset").remove(),g._afterZoomOut()):(g.isOpen=g.isOpened=!1,f(".fancybox-item, .fancybox-nav").remove(),g.wrap.stop(!0).removeClass("fancybox-opened"),g.inner.css("overflow","hidden"),g.transitions[g.current.closeMethod]()))},play:function(l){var a=function(){clearTimeout(g.player.timer)},m=function(){a();g.current&&g.player.isActive&&(g.player.timer=setTimeout(g.next,g.current.playSpeed))},e=function(){a();f("body").unbind(".player");g.player.isActive=!1;g.trigger("onPlayEnd")};if(g.player.isActive||l&&!1===l[0]){e()}else{if(g.current&&(g.current.loop||g.current.index<g.group.length-1)){g.player.isActive=!0,f("body").bind({"afterShow.player onUpdate.player":m,"onCancel.player beforeClose.player":e,"beforeLoad.player":a}),m(),g.trigger("onPlayStart")}}},next:function(){if(typeof getPhotoVars!="undefined"&&!c){c=getPhotoVars()}if(c&&g.current){g.current.index=0;for(var a=0;a<g.group.length;a++){m1=g.group[a].href.match(/\/\d+\.[^\?]+/i);m2=g.current.href.match(/\/\d+\.[^\?]+/i);if(m1[0]==m2[0]){break}g.current.index++}}g.current&&g.jumpto(+g.current.index+1,1)},prev:function(){if(typeof getPhotoVars!="undefined"&&!c){c=getPhotoVars()}if(c&&g.current){g.current.index=0;for(var a=0;a<g.group.length;a++){m1=g.group[a].href.match(/\/\d+\.[^\?]+/i);m2=g.current.href.match(/\/\d+\.[^\?]+/i);if(m1[0]==m2[0]){break}g.current.index++}}g.current&&g.jumpto(+g.current.index-1,-1)},jumpto:function(q,e){if(typeof getPhotoVars!="undefined"&&!c){c=getPhotoVars()}if(c){var l=g.current.href.split("?");j=checkPhotoPosition(c.photoUrls,l[0]);if(j){var a;var o=pages=0;$.each(c.photoUrls,function(s){for(var r in s){o++}pages++});if(j[0]==1){a=res=typeof c.photoUrls[parseInt(j[1])+1]=="undefined"?1:parseInt(j[1])+1}else{if(j[0]==-1){a=res=j[1]-1<1?Math.max.apply(Math,Object.keys(c.photoUrls)):parseInt(j[1])-1}}if(pages!=1&&(c.photoUrls[a]==null||o!=g.group.length)){url=c.pageUrlMask.replace(/\%[pa]/gi,function(s){var r;if(s=="%p"){return a}else{if(s=="%a"){return 1}}});var p=q;function m(){var r=$(g.group[0]).clone()[0];g.group=new Array();i=0;$.each(c.photoUrls,function(t,s){if(s){$.each(s,function(v,u){var w=$(r).clone()[0];$(w).attr("data-url","/photo/0-0-"+u[0]);w.href=u[1];g.group.push(w);if(g.current.href==w.href){q=p=i+e}i++})}});g.current&&(p=parseInt(p,10),1<g.group.length&&g.current.loop&&(p>=g.group.length?p=0:0>p&&(p=g.group.length-1)),"undefined"!==typeof g.group[p]&&(g.cancel(),g._start(p)))}if(!c.photoUrls[a]){$.ajax({url:url,success:function(r){c.photoUrls[a]=r;m()}})}else{m()}return}}}g.current&&(q=parseInt(q,10),1<g.group.length&&g.current.loop&&(q>=g.group.length?q=0:0>q&&(q=g.group.length-1)),"undefined"!==typeof g.group[q]&&(g.cancel(),g._start(q)))},reposition:function(a){g.isOpen&&g.wrap.css(g._getPosition(a))},update:function(a){g.isOpen&&(k||setTimeout(function(){var e=g.current;if(k&&(k=!1,e)){if(e.autoResize||a&&"orientationchange"===a.type){e.autoSize&&(g.inner.height("auto"),e.height=g.inner.height()),g._setDimension(),e.canGrow&&g.inner.height("auto")}e.autoCenter&&g.reposition();g.trigger("onUpdate")}},100),k=!0)},toggle:function(){g.isOpen&&(g.current.fitToView=!g.current.fitToView,g.update())},hideLoading:function(){f("#fancybox-loading").remove()},showLoading:function(){g.hideLoading();f('<div id="fancybox-loading"><div></div></div>').click(g.cancel).appendTo("body")},getViewport:function(){return{x:d.scrollLeft(),y:d.scrollTop(),w:d.width()||document.body.clientWidth,h:d.height()||document.body.clientHeight}},unbindEvents:function(){g.wrap&&g.wrap.unbind(".fb");n.unbind(".fb");d.unbind(".fb")},bindEvents:function(){var a=g.current,e=a.keys;a&&(d.bind("resize.fb, orientationchange.fb",g.update),e&&n.bind("keydown.fb",function(l){var m;!l.ctrlKey&&!l.altKey&&!l.shiftKey&&!l.metaKey&&0>f.inArray(l.target.tagName.toLowerCase(),["input","textarea","select","button"])&&(m=l.keyCode,-1<f.inArray(m,e.close)?(g.close(),l.preventDefault()):-1<f.inArray(m,e.next)?(g.next(),l.preventDefault()):-1<f.inArray(m,e.prev)&&(g.prev(),l.preventDefault()))}),f.fn.mousewheel&&a.mouseWheel&&1<g.group.length&&g.wrap.bind("mousewheel.fb",function(m,l){var o=f(m.target).get(0);if(0===o.clientHeight||o.scrollHeight===o.clientHeight&&o.scrollWidth===o.clientWidth){m.preventDefault(),g[0<l?"prev":"next"]()}}))},trigger:function(l){var a,e=g[-1<f.inArray(l,["onCancel","beforeLoad","afterLoad"])?"coming":"current"];if(e){f.isFunction(e[l])&&(a=e[l].apply(e,Array.prototype.slice.call(arguments,1)));if(!1===a){return !1}e.helpers&&f.each(e.helpers,function(m,o){if(o&&"undefined"!==typeof g.helpers[m]&&f.isFunction(g.helpers[m][l])){g.helpers[m][l](o,e)}});f.event.trigger(l+".fb")}},isImage:function(a){return a&&a.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i)},isSWF:function(a){return a&&a.match(/\.(swf)(.*)?$/i)},_start:function(o){var l={},e=g.group[o]||null,p,a,m;if(e&&(e.nodeType||e instanceof f)){p=!0,f.metadata&&(l=f(e).metadata())}l=f.extend(!0,{},g.opts,{index:o,element:e},f.isPlainObject(e)?e:l);f.each(["href","title","content","type"],function(q,r){l[r]=g.opts[r]||p&&f(e).attr(r)||l[r]||null});"number"===typeof l.margin&&(l.margin=[l.margin,l.margin,l.margin,l.margin]);l.modal&&f.extend(!0,l,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{css:{cursor:"auto"},closeClick:!1}}});g.coming=l;if(!1===g.trigger("beforeLoad")){g.coming=null}else{a=l.type;o=l.href||e;a||(p&&(m=f(e).data("fancybox-type"),!m&&e.className&&(a=(m=e.className.match(/fancybox\.(\w+)/))?m[1]:null)),!a&&"string"===f.type(o)&&(g.isImage(o)?a="image":g.isSWF(o)?a="swf":o.match(/^#/)&&(a="inline")),a||(a=p?"inline":"html"),l.type=a);if("inline"===a||"html"===a){if(l.content||(l.content="inline"===a?f("string"===f.type(o)?o.replace(/.*(?=#[^\s]+$)/,""):o):e),!l.content||!l.content.length){a=null}}else{o||(a=null)}l.group=g.group;l.isDom=p;l.href=o;"image"===a?g._loadImage():"ajax"===a?g._loadAjax():a?g._afterLoad():g._error("type")}},_error:function(a){g.hideLoading();f.extend(g.coming,{type:"html",autoSize:!0,minHeight:0,hasError:a,content:g.coming.tpl.error});g._afterLoad()},_loadImage:function(){g.imgPreload=new Image;g.imgPreload.onload=function(){this.onload=this.onerror=null;g.coming.width=this.width;g.coming.height=this.height;g._afterLoad()};g.imgPreload.onerror=function(){this.onload=this.onerror=null;g._error("image")};g.imgPreload.src=g.coming.href;g.imgPreload.width||g.showLoading()},_loadAjax:function(){g.showLoading();g.ajaxLoad=f.ajax(f.extend({},g.coming.ajax,{url:g.coming.href,error:function(a,e){"abort"!==e?g._error("ajax",a):g.hideLoading()},success:function(a,e){"success"===e&&(g.coming.content=a,g._afterLoad())}}))},_preloadImages:function(){var m=g.group,e=g.current,a=m.length,l;if(e.preload&&!(2>m.length)){for(var o=1;o<=Math.min(e.preload,a-1);o++){if(l=m[(e.index+o)%a],l=f(l).attr("href")||l){(new Image).src=l}}}},_afterLoad:function(){g.hideLoading();!g.coming||!1===g.trigger("afterLoad",g.current)?g.coming=!1:(g.isOpened?(f(".fancybox-item").remove(),g.wrap.stop(!0).removeClass("fancybox-opened"),g.inner.css("overflow","hidden"),g.transitions[g.current.prevMethod]()):(f(".fancybox-wrap").stop().trigger("onReset").remove(),g.trigger("afterClose")),g.unbindEvents(),g.isOpen=!1,g.current=g.coming,g.wrap=f(g.current.tpl.wrap).addClass("fancybox-"+(j?"mobile":"desktop")+" fancybox-tmp "+g.current.wrapCSS).appendTo("body"),g.outer=f(".fancybox-outer",g.wrap).css("padding",g.current.padding+"px"),g.inner=f(".fancybox-inner",g.wrap),g._setContent())},_setContent:function(){var l,a,m=g.current,e=m.type;switch(e){case"inline":case"ajax":case"html":l=m.content;l instanceof f&&(l=l.show().detach(),l.parent().hasClass("fancybox-inner")&&l.parents(".fancybox-wrap").trigger("onReset").remove(),f(g.wrap).bind("onReset",function(){l.appendTo("body").hide()}));m.autoSize&&(a=f('<div class="fancybox-tmp '+g.current.wrapCSS+'"></div>').appendTo("body").append(l),m.width=a.width(),m.height=a.height(),a.width(g.current.width),a.height()>m.height&&(a.width(m.width+1),m.width=a.width(),m.height=a.height()),l=a.contents().detach(),a.remove());break;case"image":l=m.tpl.image.replace("{href}",m.href);m.aspectRatio=!0;break;case"swf":l=m.tpl.swf.replace(/\{width\}/g,m.width).replace(/\{height\}/g,m.height).replace(/\{href\}/g,m.href)}if("iframe"===e){l=f(m.tpl.iframe.replace("{rnd}",(new Date).getTime())).attr("scrolling",m.scrolling);m.scrolling="auto";if(m.autoSize){l.width(m.width);g.showLoading();l.data("ready",!1).appendTo(g.inner).bind({onCancel:function(){f(this).unbind();g._afterZoomOut()},load:function(){var o=f(this),q;try{this.contentWindow.document.location&&(q=o.contents().find("body").height()+12,o.height(q))}catch(p){m.autoSize=!1}!1===o.data("ready")?(g.hideLoading(),q&&(g.current.height=q),g._beforeShow(),o.data("ready",!0)):q&&g.update()}}).attr("src",m.href);return}l.attr("src",m.href)}else{if("image"===e||"swf"===e){m.autoSize=!1,m.scrolling="visible"}}g.inner.append(l);g._beforeShow()},_beforeShow:function(){g.coming=null;g.trigger("beforeShow");g._setDimension();g.wrap.hide().removeClass("fancybox-tmp");g.bindEvents();g._preloadImages();g.transitions[g.isOpened?g.current.nextMethod:g.current.openMethod]()},_setDimension:function(){var t=g.wrap,s=g.outer,q=g.inner,m=g.current,p=g.getViewport(),x=m.margin,l=2*m.padding,e=m.width,a=m.height,r=m.maxWidth,w=m.maxHeight,o=m.minWidth,v=m.minHeight,u;p.w-=x[1]+x[3];p.h-=x[0]+x[2];-1<e.toString().indexOf("%")&&(e=(p.w-l)*parseFloat(e)/100);-1<a.toString().indexOf("%")&&(a=(p.h-l)*parseFloat(a)/100);x=e/a;e+=l;a+=l;m.fitToView&&(r=Math.min(p.w,r),w=Math.min(p.h,w));m.aspectRatio?(e>r&&(e=r,a=(e-l)/x+l),a>w&&(a=w,e=(a-l)*x+l),e<o&&(e=o,a=(e-l)/x+l),a<v&&(a=v,e=(a-l)*x+l)):(e=Math.max(o,Math.min(e,r)),a=Math.max(v,Math.min(a,w)));e=Math.round(e);a=Math.round(a);f(t.add(s).add(q)).width("auto").height("auto");q.width(e-l).height(a-l);t.width(e);u=t.height();if(e>r||u>w){for(;(e>r||u>w)&&e>o&&u>v;){a-=10,m.aspectRatio?(e=Math.round((a-l)*x+l),e<o&&(e=o,a=(e-l)/x+l)):e-=10,q.width(e-l).height(a-l),t.width(e),u=t.height()}}m.dim={width:e,height:u};m.canGrow=m.autoSize&&a>v&&a<w;m.canShrink=!1;m.canExpand=!1;if(e-l<m.width||a-l<m.height){m.canExpand=!0}else{if((e>p.w||u>p.h)&&e>o&&a>v){m.canShrink=!0}}t=u-l;g.innerSpace=t-q.height();g.outerSpace=t-s.height()},_getPosition:function(p){var o=g.current,m=g.getViewport(),l=o.margin,e=g.wrap.width()+l[1]+l[3],q=g.wrap.height()+l[0]+l[2],a={position:"absolute",top:l[0]+m.y,left:l[3]+m.x};if(o.fixed&&(!p||!1===p[0])&&q<=m.h&&e<=m.w){a={position:"fixed",top:l[0],left:l[3]}}a.top=Math.ceil(Math.max(a.top,a.top+(m.h-q)*o.topRatio));if(($.browser.msie)&&($.browser.version<10)&&(document.compatMode=="BackCompat")&&!$(window).height()){a.top+=document.body.scrollTop}a.top+="px";a.left=Math.ceil(Math.max(a.left,a.left+0.5*(m.w-e)))+"px";return a},_afterZoomIn:function(){var a=g.current,e=a.scrolling;g.isOpen=g.isOpened=!0;g.wrap.addClass("fancybox-opened").css("overflow","visible");g.update();g.inner.css("overflow","yes"===e?"scroll":"no"===e?"hidden":e);if(a.closeClick||a.nextClick){g.inner.css("cursor","pointer").bind("click.fb",a.nextClick?g.next:g.close)}a.closeBtn&&f(a.tpl.closeBtn).appendTo(g.outer).bind("click.fb",g.close);a.arrows&&1<g.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(g.inner).bind("click.fb",g.prev),(a.loop||a.index<g.group.length-1)&&f(a.tpl.next).appendTo(g.inner).bind("click.fb",g.next));g.trigger("afterShow");g.opts.autoPlay&&!g.player.isActive&&(g.opts.autoPlay=!1,g.play())},_afterZoomOut:function(){g.trigger("afterClose");g.wrap.trigger("onReset").remove();f.extend(g,{group:{},opts:{},current:null,isActive:!1,isOpened:!1,isOpen:!1,wrap:null,outer:null,inner:null})}});g.transitions={getOrigPosition:function(){var p=g.current,o=p.element,l=p.padding,a=f(p.orig),e={},m=50,q=50;!a.length&&p.isDom&&f(o).is(":visible")&&(a=f(o).find("img:first"),a.length||(a=f(o)));a.length?(e=a.offset(),a.is("img")&&(m=a.outerWidth(),q=a.outerHeight())):(p=g.getViewport(),e.top=p.y+0.5*(p.h-q),e.left=p.x+0.5*(p.w-m));return e={top:Math.ceil(e.top-l)+"px",left:Math.ceil(e.left-l)+"px",width:Math.ceil(m+2*l)+"px",height:Math.ceil(q+2*l)+"px"}},step:function(m,l){var e,a,o;if("width"===l.prop||"height"===l.prop){a=o=Math.ceil(m-2*g.current.padding),"height"===l.prop&&(e=(m-l.start)/(l.end-l.start),l.start>l.end&&(e=1-e),a-=g.innerSpace*e,o-=g.outerSpace*e),g.inner[l.prop](a),g.outer[l.prop](o)}},zoomIn:function(){var l=g.wrap,a=g.current,m,e;m=a.dim;"elastic"===a.openEffect?(e=f.extend({},m,g._getPosition(!0)),delete e.position,m=this.getOrigPosition(),a.openOpacity&&(m.opacity=0,e.opacity=1),g.outer.add(g.inner).width("auto").height("auto"),l.css(m).show(),l.animate(e,{duration:a.openSpeed,easing:a.openEasing,step:this.step,complete:g._afterZoomIn})):(l.css(f.extend({},m,g._getPosition())),"fade"===a.openEffect?l.fadeIn(a.openSpeed,g._afterZoomIn):(l.show(),g._afterZoomIn()))},zoomOut:function(){var l=g.wrap,a=g.current,e;"elastic"===a.closeEffect?("fixed"===l.css("position")&&l.css(g._getPosition(!0)),e=this.getOrigPosition(),a.closeOpacity&&(e.opacity=0),l.animate(e,{duration:a.closeSpeed,easing:a.closeEasing,step:this.step,complete:g._afterZoomOut})):l.fadeOut("fade"===a.closeEffect?a.closeSpeed:0,g._afterZoomOut)},changeIn:function(){var l=g.wrap,a=g.current,e;"elastic"===a.nextEffect?(e=g._getPosition(!0),e.opacity=0,e.top=parseInt(e.top,10)-200+"px",l.css(e).show().animate({opacity:1,top:"+=200px"},{duration:a.nextSpeed,easing:a.nextEasing,complete:g._afterZoomIn})):(l.css(g._getPosition()),"fade"===a.nextEffect?l.hide().fadeIn(a.nextSpeed,g._afterZoomIn):(l.show(),g._afterZoomIn()))},changeOut:function(){var l=g.wrap,a=g.current,e=function(){f(this).trigger("onReset").remove()};l.removeClass("fancybox-opened");"elastic"===a.prevEffect?l.animate({opacity:0,top:"+=200px"},{duration:a.prevSpeed,easing:a.prevEasing,complete:e}):l.fadeOut("fade"===a.prevEffect?a.prevSpeed:0,e)}};g.helpers.overlay={overlay:null,update:function(){var e,a;this.overlay.width(0).height(0);f.browser.msie?(e=Math.max(b.documentElement.scrollWidth,b.body.scrollWidth),a=Math.max(b.documentElement.offsetWidth,b.body.offsetWidth),e=e<a?d.width():e):e=n.width();this.overlay.width(e).height(n.height())},beforeShow:function(a){this.overlay||(a=f.extend(!0,{speedIn:"fast",closeClick:!0,opacity:1,css:{background:"black"}},a),this.overlay=f('<div id="fancybox-overlay"></div>').css(a.css).appendTo("body"),this.update(),a.closeClick&&this.overlay.bind("click.fb",g.close),d.bind("resize.fb",f.proxy(this.update,this)),this.overlay.fadeTo(a.speedIn,a.opacity))},onUpdate:function(){this.update()},afterClose:function(a){this.overlay&&this.overlay.fadeOut(a.speedOut||0,function(){f(this).remove()});this.overlay=null}};g.helpers.title={beforeShow:function(a){var e;if(e=g.current.title){e=f('<div class="fancybox-title fancybox-title-'+a.type+'-wrap">'+e+"</div>").appendTo("body"),"float"===a.type&&(e.width(e.width()),e.wrapInner('<span class="child"></span>'),g.current.margin[2]+=Math.abs(parseInt(e.css("margin-bottom"),10))),e.appendTo("over"===a.type?g.inner:"outside"===a.type?g.wrap:g.outer)}}};f.fn.fancybox=function(m){var e=f(this),a=this.selector||"",l,o=function(s){var r=this,q="rel",p=r[q],t=l;!s.ctrlKey&&!s.altKey&&!s.shiftKey&&!s.metaKey&&(s.preventDefault(),p||(q="data-fancybox-group",p=f(r).attr("data-fancybox-group")),p&&""!==p&&"nofollow"!==p&&(r=a.length?f(a):e,r=r.filter("["+q+'="'+p+'"]'),t=r.index(this)),m.index=t,g.open(r,m))},m=m||{};l=m.index||0;a?n.undelegate(a,"click.fb-start").delegate(a,"click.fb-start",o):e.unbind("click.fb-start").bind("click.fb-start",o);return this}})(window,document,jQuery);(function(c){var d=c.fancybox;d.helpers.buttons={tpl:'<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="'+ulb.prev+'" href="javascript:;"></a></li><li><a class="btnPlay" title="'+ulb.btnPlay+'" href="javascript:;"></a></li><li><a class="btnNext" title="'+ulb.next+'" href="javascript:;"></a></li><li><a class="btnToggle" title="'+ulb.btnToggle+'" href="javascript:;"></a></li><li><a class="btnClose" title="'+ulb.closeBtn+'" href="javascript:jQuery.fancybox.close();"></a></li></ul></div>',list:null,buttons:{},update:function(){var a=this.buttons.toggle.removeClass("btnDisabled btnToggleOn");if(d.current.canShrink){a.addClass("btnToggleOn")}else{if(!d.current.canExpand){a.addClass("btnDisabled")}}},beforeLoad:function(a){if(d.group.length<1){d.coming.helpers.buttons=false;d.coming.closeBtn=true;return}d.coming.margin[a.position==="bottom"?2:0]+=30},onPlayStart:function(){if(this.list){this.buttons.play.attr("title","Pause slideshow").addClass("btnPlayOn")}},onPlayEnd:function(){if(this.list){this.buttons.play.attr("title","Start slideshow").removeClass("btnPlayOn")}},afterShow:function(a){var b;if(!this.list){this.list=c(a.tpl||this.tpl).addClass(a.position||"top").appendTo("body");this.buttons={prev:this.list.find(".btnPrev").click(d.prev),next:this.list.find(".btnNext").click(d.next),play:this.list.find(".btnPlay").click(d.play),toggle:this.list.find(".btnToggle").click(d.toggle)}}b=this.buttons;if(d.current.index>0||d.current.loop){b.prev.removeClass("btnDisabled")}else{b.prev.addClass("btnDisabled")}if(d.current.loop||d.current.index<d.group.length-1){b.next.removeClass("btnDisabled");b.play.removeClass("btnDisabled")}else{b.next.addClass("btnDisabled");b.play.addClass("btnDisabled")}this.update()},onUpdate:function(){this.update()},beforeClose:function(){if(this.list){this.list.remove()}this.list=null;this.buttons={}}}}(jQuery));var fixedFlag=true;var openEf="elastic";if(document.compatMode==="BackCompat"){$("html").css("height","100%");if(($.browser.msie)&&($.browser.version<10)){fixedFlag=false;openEf="fade";$(window).scroll(function(){if(!$("#fancybox-buttons").find(".btnToggleOn").length){$.fancybox.reposition()}})}}$(document).ready(function(){$(".ulightbox").fancybox({padding:3,preload:5,openEffect:openEf,closeEffect:"elastic",nextEffect:"fade",prevEffect:"fade",openEasing:"linear",nextEasing:"linear",prevEasing:"linear",fixed:fixedFlag,helpers:{title:null,overlay:{opacity:0.1,speedIn:0,speedOut:0},buttons:{}}});$(".uphoto .ulightbox").fancybox({padding:3,preload:5,openEffect:openEf,closeEffect:"elastic",nextEffect:"fade",prevEffect:"fade",openEasing:"linear",nextEasing:"linear",prevEasing:"linear",fixed:fixedFlag,beforeShow:function(){var a;if(a=$(this.element).data("url")){this.title='<a class="ulb-photopage-link" href="'+a+'">'+ulb.photoPage+"</a>"}},helpers:{title:{type:"float"},overlay:{opacity:0.1,speedIn:0,speedOut:0},buttons:{}}})});function _bldCont1(f,d){var e="allEntImgs"+f,b=[];for(var c=0,a=window[e].length;c<a;c++){b.push({href:window[e][c][0]})}$.fancybox(b,{index:d,padding:3,preload:5,openEffect:openEf,closeEffect:"elastic",nextEffect:"fade",prevEffect:"fade",openEasing:"linear",nextEasing:"linear",prevEasing:"linear",fixed:fixedFlag,helpers:{title:null,overlay:{opacity:0.1,speedIn:0,speedOut:0},buttons:{}}})};


 $(document).ready(function(){ 
        $(".btn-slide").click(function(){ 
        $("#panel").slideToggle("fast"); 
        $(this).toggleClass("active"); return false;

        }); 
               
 });

function inf1() {
 $('#inf_1').css({display:'block'});
 if($('#inf1').css({display:'block'})) {
  $('#inf_2').css({display:'none'});
  $('#inf_3').css({display:'none'});
  }
};
function inf2() {
 $('#inf_2').css({display:'block'});
 if($('#inf2').css({display:'block'})) {
  $('#inf_1').css({display:'none'});
  $('#inf_3').css({display:'none'});
  };
};
function inf3() {
 $('#inf_3').css({display:'block'});
 if($('#inf3').css({display:'block'})) {
  $('#inf_2').css({display:'none'}); 
  $('#inf_1').css({display:'none'});
  } 
};

function getBrowserInfo() {
 var t,v = undefined;
 if (window.opera) t = 'Opera';
 else if (document.all) {
  t = 'IE';
  var nv = navigator.appVersion;
  var s = nv.indexOf('MSIE')+5;
  v = nv.substring(s,s+1);
 }
 else if (navigator.appName) t = 'Netscape';
 return {type:t,version:v};
}
 
function bookmark(a){
 var url = window.document.location;
 var title = window.document.title;
 var b = getBrowserInfo();
 if (b.type == 'IE' && 7 > b.version && b.version >= 4) window.external.AddFavorite(url,title);
 else if (b.type == 'Opera') {
  a.href = url;
  a.rel = "sidebar";
  a.title = url+','+title;
  return true;
 }
 else if (b.type == "Netscape") window.sidebar.addPanel(title,url,"");
 else alert("Нажмите CTRL-D, чтобы добавить страницу в закладки.");
 return false;
}


window.ulb = {photoPage: "Перейти на страницу с фотографией.",closeBtn: "Закрыть", error: "Запрошенный контент не может быть загружен. Пожалуйста, попробуйте позже.", next: "Вперед", prev: "Предыдущий", btnPlay: "Начать слайдшоу", btnToggle: "Изменить размер"}
new Image().src = "http://counter.yadro.ru/hit;noadsru?r"+escape(document.referrer)+((typeof(screen)=="undefined")?"":";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+";"+Math.random();

$(document).ready(function(){

    setTimeout(function() {
    $('#col-left > table').height($('#col-center').height());
    $('#col-right > table').height($('#col-center').height());
    }, 2000);

    var link_1 = $("div.breadcrumbs a:last");
    link_1.parent().append('<b style="font-weight:normal;">'+link_1.html()+'</b>');
    link_1.remove();
    $('body div[itemtype="http://schema.org/Movie"]').hide();
    $("div.report-spam-hidden").each(function(){
        $(this).hide();
        var comment_id = $(this).attr("comment_id");
        $('<div id="report-spam-toggle-wrapper-'+comment_id+'" class="report-spam-toggle-wrapper" style="margin-left: 0px;"><span class="report-spam-toggle-text">Спам-сообщение скрыто.</span> <a class="report-spam-toggle-button report-spam-handled" data-target="#comEnt'+comment_id+'" href="javascript://">Показать</a></div>').insertBefore($("#comEnt"+comment_id));
    });
    $("#chat_frame").append('<iframe id="mchatIfm2" name="mchat" style="width:100%;height:600px;" frameborder="0" scrolling="auto" hspace="0" vspace="0" allowtransparency="true" src="/index/mchat/"></iframe>');
});

$('.refresh_captcha').live("click",function(){
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/refreshcaptcha',
        async: false,
        success : function (res) {
            if(res.status == "success"){
                var captcha_id = res.captcha_id;
                $(".captcha_id").val(captcha_id);
                $("#secImg").attr('src','/captcha/'+captcha_id+'.png');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$('.deletecomment').live("click",function(){
    var id = $(this).attr('comment_id');
    if(confirm('Вы точно хотите удалить этот комментарий?')){
        $.post('/user/deletecomment/id/'+id, {}, function(e){
            $('#comEnt' + id).slideUp();
        })
    }
    return false;
});

$('.editcomment').live("click",function(){
    var comment_id = $(this).attr('comment_id');
    $.ajax({
        type : 'GET',
        data : {comment_id:comment_id},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/getcomment',
        async: false,
        success : function (res) {
            if(res.status == "comment"){
                var comment = res.comment;
                $("#popup_comment_edit").remove();
                showPopupCommentEdit(comment);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$('.save_commentt').live("click",function(){
    var idc = $(this).attr('idc');
    var idm = $(this).attr('idm');
    var text = $('#mess').val();
    if(idc && text){
        $.post('/user/editcomment/id/'+idc+'/idm/'+idm, {message:text}, function(e){
            if(e.status == 'spam'){
                alert('Сообщение содержит запрещенные слова');
            }else if(e.status == 'ok'){
                $('#comEnt' + idc + ' [itemprop="commentText"]').html(text);
                $(".close_popup_comment_edit").trigger('click');
                //window.location.href = window.location.href;
                //window.location.reload();
            }
        });
    }
});

$('.save_chat_message').live("click",function(){
    var idm = $(this).attr('idm');
    var text = $('#mess').val();
    if(idm && text){
        $.ajax({
            type : 'GET',
            dataType : 'json',
            data: {message:text},
            contentType: "application/json",
            url : '/index/editchatmessage/id/'+idm,
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                    $("#comEntT"+idm).find(".message_text").html(res.message);
                    $("#popup_chat_message_edit").remove();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

$("#mchatRSel").live("change",function(){
    var param = $("#mchatRSel option:selected").val();
    var func_id = $(this).attr("func_id");
    clearInterval(func_id);
    if(param != 0){
        func_id = setInterval(function(){ refreshChat(); }, param+'000');
        $(this).attr("func_id",func_id);
    }
    $.post('/index/setreftime/time/'+param, function(e){
        
    });
});

$('#mchatMsgF').live("keydown",function(e){
    if(e.keyCode == 13){
        chat_send();
    }
});

$('#mchatBtn').live("click",function(){
    chat_send();
});

function chat_send(){
    var message = $("#mchatMsgF").val();
    $('#mchatBtn').hide();
    $("#mchatAjax").show();
    if(message == ""){
        afterRatingBlock2('Не заполнено поле "Сообщение"');
        setTimeout(function(){
            killBlock();
            $("#mchatAjax").hide();
            $('#mchatBtn').show();
        }, 2000);
    }else{
        $.ajax({
            type : 'GET',
            data : {message:message},
            dataType : 'json',
            contentType: "application/json",
            url : '/index/chat',
            async: false,
            success : function (res) {
                if(res.status == "added"){
                    setTimeout(function(){
                        $("#mchatMsgF").val('');
                        $("#mchatAjax").hide();
                        $('#mchatBtn').show();
                        refreshChat();
                    }, 1000);
                }
                if(res.status == "user_banned"){
                    popupBannedUser();
                    setTimeout(function(){
                        $("#mchatAjax").hide();
                        $('#mchatBtn').show();
                        killBlock();
                    }, 3000);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
}

function refreshChat(){
    document.getElementById('mchatIfm2').src='/index/mchat/?'+Math.random();return false;
}

$("#chat_smiles").live("click",function(){
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/getsmiles',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                var smiles = res.smiles;
                $("#popupSmiles").remove();
                popupSmiles(smiles);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
})

$(".show_popup_smiles_comments").live("click",function(){
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/getsmiles',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                var smiles = res.smiles;
                $("#popupSmilesComments").remove();
                popupSmilesComments(smiles);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
})

$(".open_mini_chat").live("click",function(){
    window.open('/index/minichat','subwindow','HEIGHT=700,WIDTH=300') 
});

$("#chat_settings").live("click",function(){
    window.open('/index/chatsettings','subwindow','HEIGHT=550,WIDTH=750') 
});

$("#chat_bb_codes").live("click",function(){
    window.open('/index/showbbcodes','subwindow','HEIGHT=550,WIDTH=550') 
});

$(".open_user_page").live("click",function(){
    var user_id = $(this).attr("user_id");
    //window.open('/index/8-'+user_id,'up'+user_id,'scrollbars=1,top=0,left=0,resizable=1,width=680,height=350'); 
    window.open('/index/8-'+user_id,'_blank');
});

$(".chat_delete_message").live("click",function(){
    var message_id = $(this).attr("message_id");
    if(confirm("Вы подтверждаете удаление?")){
        $.ajax({
            type : 'GET',
            dataType : 'json',
            contentType: "application/json",
            url : '/index/chatdeletemessage/id/'+message_id,
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                    $("#comEntT"+message_id).remove();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

$(".chat_edit_message").live("click",function(){
    var message_id = $(this).attr("message_id");
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/getmessage/id/'+message_id,
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                var message = res.message;
                showPopupChatMessageEdit(message);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".smile_to_add").live("click",function(){
    var message = $("#mchatMsgF").val();
    var smile = $(this).attr("smile");
    $("#mchatMsgF").val(message+' [img]/sml/'+smile+'[/img] ').focus();
});

$(".smile_to_add_comments").live("click",function(){
    var message = $("#message").val();
    var smile = $(this).attr("smile");
    $("#message").val(message+' [img]/sml/'+smile+'[/img] ').focus();
});

$(".chat_to_user").live("click",function(){
    var username = $(this).attr("username");
    $("#mchatMsgF").val('[i]'+username+'[/i], ').focus();
});

//------------ Repute
$('.repHistory').live("click",function(){
    var user_id = $(this).attr('user_id');
    $.ajax({
        type : 'GET',
        data : {user_id:user_id},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/getrepute',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                var repute = res.repute;
                var username = res.username;
                var admin = res.admin;
                var repute_value = res.repute_value;
                var user_id = res.user_id;
                var user_rep_hide = res.user_rep_hide;
                $("#popup_repute_user").remove();
                showPopupReputeUser(repute,username,admin,repute_value,user_id,user_rep_hide);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".m_edit_rep_val").live("click",function(){
    var user_id = $(this).attr("user_id");
    var text = $('#kdfjeu2').html();
    $('#kdfjeu2').html('<input user_id="'+user_id+'" class="m_repute_text" value="'+text+'"/>');
    $(this).hide();
    $('.m_repute_text').focus();
});

$(".m_repute_text").live("focusout",function(){
    var user_id = $(this).attr("user_id");
    var text = $(this).val();
    $.ajax({
        type : 'GET',
        data : {id:user_id,text:text},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/meditrepute',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                $('.m_edit_rep_val').show();
                $('.m_repute_text').parent().html(text);
            }
            if(res.status == "not_authorized"){
                
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".m_clear_repute").live("click",function(){
    var user_id = $(this).attr("user_id");
    if(confirm('Вы подтверждаете данное действие?')){
        $.ajax({
            type : 'GET',
            data : {id:user_id},
            dataType : 'json',
            contentType: "application/json",
            url : '/user/mclearrepute',
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                    $("#popupReputeDiv .ljdj3uur").remove();
                    $("#kdfjeu2").html("");
                }
                if(res.status == "not_authorized"){
                    
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

$(".user_rep_hide").live("click",function(){
    var user_id = $(this).attr("user_id");
    var item = $(this);
    $.ajax({
        type : 'GET',
        data : {id:user_id},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/rephide',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                $("#ljdemcla").attr("src","/img/icon/add.png");
                $("#ljdemcla").attr("title","Включить репутацию");
                item.attr("class","user_rep_show");
            }
            if(res.status == "not_authorized"){
                
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".user_rep_show").live("click",function(){
    var user_id = $(this).attr("user_id");
    var item = $(this);
    $.ajax({
        type : 'GET',
        data : {id:user_id},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/repshow',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                $("#ljdemcla").attr("src","/img/icon/ban.png");
                $("#ljdemcla").attr("title","Отключить репутацию");
                item.attr("class","user_rep_hide");
            }
            if(res.status == "not_authorized"){
                
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

function showPopupReputeUser(repute,username,admin,repute_value,user_id,user_rep_hide){
    var count_reputes = repute.length;
    
    var str_manage = '';
    
    if(user_rep_hide == true){
        var str_rep_hide_class = "user_rep_show";
        var str_rep_hide_title = "Включить репутацию";
        var str_rep_hide_img_src = "/img/icon/add.png";
    }else{
        var str_rep_hide_class = "user_rep_hide";
        var str_rep_hide_title = "Отключить репутацию";
        var str_rep_hide_img_src = "/img/icon/ban.png";
    }
    
    if(admin == true){
        str_manage = '<div style="padding:0 5px;">'+
        '<a href="javascript://" rel="nofollow" id="lksdfkjd" class="m_edit_rep_val" user_id="'+user_id+'" title="Изменить репутацию"><img alt="" src="/img/icon/edt.png" width="16" height="16" border="0"></a> '+
        '<a href="javascript://" rel="nofollow" class="'+str_rep_hide_class+'" user_id="'+user_id+'"><img alt="" id="ljdemcla" title="'+str_rep_hide_title+'" src="'+str_rep_hide_img_src+'" width="16" height="16" border="0"></a> '+
        '<a href="javascript://" rel="nofollow" title="Очистить репутацию" class="m_clear_repute" user_id="'+user_id+'"><img alt="" src="/img/icon/clear.png" width="16" height="16" border="0"></a>'+
        '</div>';
    }
    
    var res = '<div id="popup_repute_user" style="position: fixed; z-index: 10012; overflow: visible; left: 50%;top: 50%;margin-left: -204px;margin-top: -170px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 339px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 339px; left: 415px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 425px; top: 339px; display: block;"><div class="xsbl"><div class="xsbr">'+
    '<div class="xsbc"></div></div></div></div><div id="_uwndWnd2" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 417px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 417px; height: 341px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 close_popup_repute_user" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div>'+
    '<div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">История репутации</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 300px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div>'+
    '<div class="myWinCont" id="popupReputeDiv" style="overflow: auto; width: 395px; display: block; height: 100%;" align="center" unselectable="on">'+
    '<table border="0" cellpadding="1" cellspacing="0" width="100%"><tbody><tr><td width="25%" nowrap="nowrap">Репутация "'+username+'":</td>'+
    '<td><b><span id="kdfjeu2">'+repute_value+'</span></b></td>'+
    '<td width="10%" nowrap="nowrap">'+str_manage+'</td>'+
    '</tr></tbody></table><hr>'+
    '</div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>';
    $('body').append(res);
    i=0;
    while(i < count_reputes){
        var a = new Date(repute[i].addtime*1000);
        var hour = a.getHours().toString();
        var min = a.getMinutes().toString();
        var date = a.getDate().toString();
        var year = a.getFullYear().toString();
        var month = (a.getMonth()+1).toString();
        if(date.length == 1){
            date = '0'+date;
        }
        if(hour.length == 1){
            hour = '0'+hour;
        }
        if(min.length == 1){
            min = '0'+min;
        }
        if(month.length == 1){
            month = '0'+month;
        }
        var time = date + '.' + month + '.' + year + ', ' + hour + ':' + min;
        if(repute[i].value > 0){
            var class_image = "popup_repute_plus";
        }
        if(repute[i].value < 0){
            var class_image = "popup_repute_minus";
        }
        if(repute[i].value == 0){
            var class_image = "popup_repute_none";
        }
        if(repute[i].forum_url != ''){
            var ist = '[<a href="'+repute[i].forum_url+'" target="_blank">Источник</a>]';
        }else{
            var ist = '';
        }
        
        var str_answer = '<a href="javascript://" rel="nofollow"><img alt="" border="0" align="absmiddle" src="/img/fr/OmnA.gif" width="15" height="15" title="Ответить"></a>';
        var str_edit_repute = '';
        var str_delete_repute = '';
        if(admin == true){
            str_edit_repute = '<a href="javascript://" class="edit_repute" repute_id="'+repute[i].id+'" rel="nofollow"><img alt="" border="0" align="absmiddle" src="/img/fr/OmnE.gif" width="15" height="15" title="Изменить"></a>';
            str_delete_repute = '<a href="javascript://" class="delete_repute" repute_id="'+repute[i].id+'" rel="nofollow"><img border="0" align="absmiddle" src="/img/fr/OmnD.gif" width="15" height="15" title="Удалить"></a>';
        }
        
        $("#popupReputeDiv").append('<div class="ljdj3uur"><div id="blr'+repute[i].id+'"><table border="0" cellpadding="1" cellspacing="1" width="100%">'+
        '<tbody><tr><td width="70%"><div title="Уровень повышен [+20]" class="'+class_image+'" style="width:16px;height:17px;float:left;"></div> &nbsp; <a class="banHUser" href="/index/8-'+repute[i].id_from+'" target="_blank"><b>'+repute[i].username+'</b></a> &nbsp; <span style="font-size:7pt">'+ist+'</span></td><td align="right" style="white-space: nowrap;font-size:7pt">'+time+' &nbsp;'+
        
        str_edit_repute+
        str_delete_repute+
        
        '</td></tr>'+
        '<tr><td colspan="2"><div id="mmtx'+repute[i].id+'">'+repute[i].message+'</div><div><span id="mmaxt'+repute[i].id+'"></span><i><span id="mmax2370"></span></i></div></td></tr></tbody></table><hr></div></div>');
        i++;
    }
}

$(".close_popup_repute_user").live("click",function(){
    $("#popup_repute_user").remove();
});

$(".repute_show_add_popup").live("click",function(){
    var user_id = $(this).attr('user_id');
    $('body').append('<div id="repute_add_popup" style="position: fixed; z-index: 10008; overflow: visible; left: 158px; top: 61px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 227px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 227px; left: 398px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 408px; top: 227px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd1" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 400px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 400px; height: 229px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_repute_add_popup" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Репутация пользователя</span></div></div></div></div>'+
    '<div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 188px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 378px; display: block; height: 100%;" align="center" unselectable="on"><div align="left"><fieldset><legend><b>Действие</b></legend>'+
    '<div class="popup_repute_none" style="width:16px;height:17px;float:left;"></div><input id="a0" type="radio" name="act" value="0" checked=""><label for="a0">не изменять репутацию</label><div style="clear:both"></div>'+
    '<div class="popup_repute_plus" style="width:16px;height:17px;float:left;"></div><input id="a2" type="radio" name="act" value="2"><label for="a2">повысить репутацию</label><div style="clear:both"></div>'+
    '<div class="popup_repute_minus" style="width:16px;height:17px;float:left;"></div><input id="a1" type="radio" name="act" value="1"><label for="a1">понизить репутацию</label></fieldset>'+
    '<fieldset><legend><b>Комментарий</b></legend><textarea name="reason" id="repute_comment" style="height:50px;width:99%;"></textarea></fieldset>'+
    '<fieldset style="margin-top:5px;"><table border="0" cellpadding="2" cellspacing="1" width="100%"><tbody><tr><td id="msg'+user_id+'"></td><td width="10%">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="outBtn">'+
    '<tbody><tr>'+
    '<td class="myBtnLeft"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td class="myBtnCenter">'+
    '<div class="myBtnCont x-unselectable" unselectable="on" id="subbutfrm'+user_id+'">'+
    '<a href="javascript://" class="repute_add_confirm" user_id="'+user_id+'">Применить</a></div></td>'+
    '<td class="myBtnRight"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td style="visibility:hidden;"><input type="image" src="/img/ma/1px.gif" style="width:1px;" name="submfrm'+user_id+'" id="submfrm'+user_id+'"></td>'+
    '</tr></tbody></table></td></tr></tbody></table></fieldset>'+
    '<input type="hidden" name="a" value="23"><input type="hidden" name="s" value="106546"><input type="hidden" name="t" value="1">'+
    '<input type="hidden" name="ssid" value="q61u1Lkj"><input type="hidden" name="ref" value=""></div></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>');
});

$(".close_repute_add_popup").live("click",function(){
    $("#repute_add_popup").remove();
});
$(".repute_add_confirm").live("click",function(){
    var user_id = $(this).attr('user_id');
    var repute_comment = $("#repute_comment").val();
    var a1 = $("#a1").prop('checked'); // minus
    var a2 = $("#a2").prop('checked'); // plus
    var repute_change = "none";
    if(a1 == true){
        repute_change = "minus";
    }
    if(a2 == true){
        repute_change = "plus";
    }
    $.ajax({
        type : 'GET',
        data : {user_id:user_id,change:repute_change,comment:repute_comment},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/addrepute',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                afterRatingBlock2("Репутация изменена");
                setTimeout(function(){
                    $("#repute_add_popup").remove();
                    killBlock();
                }, 2000);
            }
            if(res.status == "banned_user"){
                popupBannedUser();
                setTimeout(function(){
                    killBlock();
                }, 3000);
            }
            if(res.status == "not_authorized"){
                
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".edit_repute").live("click",function(){
    var repute_id = $(this).attr("repute_id");
    var text = $('#mmtx'+repute_id).html();
    $('#mmtx'+repute_id).html('<textarea repute_id="'+repute_id+'" class="repute_text">'+text+'</textarea>');
    $(this).hide();
    $('.repute_text[repute_id="'+repute_id+'"]').focus();
});

$(".repute_text").live("focusout",function(){
    var repute_id = $(this).attr("repute_id");
    var text = $(this).val();
    $.ajax({
        type : 'GET',
        data : {id:repute_id,text:text},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/editrepute',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                $('.edit_repute[repute_id="'+repute_id+'"]').show();
                $('.repute_text[repute_id="'+repute_id+'"]').parent().html(text);
            }
            if(res.status == "not_authorized"){
                
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".delete_repute").live("click",function(){
    var repute_id = $(this).attr("repute_id");
    if(confirm("Вы подтверждаете удаление?")){
        $.ajax({
            type : 'GET',
            data : {id:repute_id},
            dataType : 'json',
            contentType: "application/json",
            url : '/user/deleterepute',
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                   $('#blr'+repute_id).parent().remove();
                }
                if(res.status == "not_authorized"){
                    
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

//------------ Repute end

//------------ Awards
$('.awardsHistory').live("click",function(){
    var user_id = $(this).attr('user_id');
    $.ajax({
        type : 'GET',
        data : {user_id:user_id},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/getallawards',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                var awards = res.awards;
                var username = res.username;
                $("#popup_some_awards_user").remove();
                $("#popup_awards_user").remove();
                showPopupAwardsUser(awards,username);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

function showPopupAwardsUser(awards,username){
    var count_awards_all = awards.length;
    var res = '<div id="popup_awards_user" style="position: fixed; z-index: 10008; overflow: visible;left: 50%;top: 50%;margin-left: -250px;margin-top: -170px;" class=""><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 339px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 339px; left: 497px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 507px; top: 339px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd1" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 499px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 499px; height: 341px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_popup_awards_user" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
    '<span class="xw-hdr-text" unselectable="on" title="">Список наград - '+username+' ('+count_awards_all+')</span></div></div></div></div><div class="xw-ml" unselectable="on" style="display: block;"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 300px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 477px; display: block; height: 100%;" align="center" unselectable="on"><div align="left">'+
    '<fieldset class="awards_marks"><legend><b>Знаки отличия</b></legend></fieldset>'+
    '<fieldset class="awards_love"><legend><b>Любовь</b></legend></fieldset>'+
    '<fieldset class="awards_food"><legend><b>Еда</b></legend></fieldset>'+
    '<fieldset class="awards_positive"><legend><b>Позитив</b></legend></fieldset>'+
    '<fieldset class="awards_animals"><legend><b>Животные</b></legend></fieldset>'+
    '<fieldset class="awards_subjects"><legend><b>Предметы</b></legend></fieldset>'+
    '<fieldset class="awards_negative"><legend><b>Негатив</b></legend></fieldset>'+
    '<fieldset class="awards_rich"><legend><b>Богатство</b></legend></fieldset>'+
    '</div></div></div></div></div></div></div><div class="xw-bl" unselectable="on" style="display: block;"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="width: 499px; height: 316px; display: none;" unselectable="on"></div></div></div>';
    $('body').append(res);
    i=0;
    var awards_marks = '';var awards_love = '';var awards_food = '';var awards_positive = '';var awards_animals = '';var awards_subjects = '';var awards_negative = '';awards_rich = '';
    
    var count_awards = [];
    
    k=1;
    kk=1;
    while(kk < 56){
        count_awards[kk] = 1;
        kk++;
    }
    while(i < count_awards_all){
        if(awards[i].award < 11){
            if(awards_marks.indexOf('item_award_'+awards[i].award) == -1){
                awards_marks += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }else if(awards[i].award < 16){
            if(awards_love.indexOf('item_award_'+awards[i].award) == -1){
                awards_love += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }else if(awards[i].award < 26){
            if(awards_food.indexOf('item_award_'+awards[i].award) == -1){
                awards_food += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }else if(awards[i].award < 31){
            if(awards_positive.indexOf('item_award_'+awards[i].award) == -1){
                awards_positive += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }else if(awards[i].award < 36){
            if(awards_animals.indexOf('item_award_'+awards[i].award) == -1){
                awards_animals += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }else if(awards[i].award < 46){
            if(awards_subjects.indexOf('item_award_'+awards[i].award) == -1){
                awards_subjects += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }else if(awards[i].award < 51){
            if(awards_negative.indexOf('item_award_'+awards[i].award) == -1){
                awards_negative += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }else if(awards[i].award < 56){
            if(awards_rich.indexOf('item_award_'+awards[i].award) == -1){
                awards_rich += '<div class="item_award item_award_'+awards[i].award+'" user_id="'+awards[i].id_to+'" award="'+awards[i].award+'"><img alt="" src="/img/awards/'+awards[i].award+'.png" border="0"><div style="text-align: center;padding-top:2px;font-size:7pt;"><b class="count_awards_'+awards[i].award+'">1</b></div></div>';
                k = parseInt(awards[i].award);
            }else{
                count_awards[k]++;
            }
        }
        i++;
    }
    
    if(awards_marks != ""){
        $(".awards_marks").append(awards_marks);
    }else{
        $(".awards_marks").hide();
    }
    
    if(awards_love != ""){
        $(".awards_love").append(awards_love);
    }else{
        $(".awards_love").hide();
    }
    
    if(awards_food != ""){
        $(".awards_food").append(awards_food);
    }else{
        $(".awards_food").hide();
    }
    
    if(awards_positive != ""){
        $(".awards_positive").append(awards_positive);
    }else{
        $(".awards_positive").hide();
    }
    
    if(awards_animals != ""){
        $(".awards_animals").append(awards_animals);
    }else{
        $(".awards_animals").hide();
    }
    
    if(awards_subjects != ""){
        $(".awards_subjects").append(awards_subjects);
    }else{
        $(".awards_subjects").hide();
    }
    
    if(awards_negative != ""){
        $(".awards_negative").append(awards_negative);
    }else{
        $(".awards_negative").hide();
    }
    
    if(awards_rich != ""){
        $(".awards_rich").append(awards_rich);
    }else{
        $(".awards_rich").hide();
    }
    
    kk=1;
    while(kk < 56){
        $(".count_awards_"+kk).html(count_awards[kk]);
        kk++;
    }
}

$(".close_popup_awards_user").live("click",function(){
    $("#popup_awards_user").remove();
});

$('.item_award').live("click",function(){
    var user_id = $(this).attr('user_id');
    var award = $(this).attr('award');
    $.ajax({
        type : 'GET',
        data : {user_id:user_id,award:award},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/getsomeawards',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                var awards = res.awards;
                var admin = res.admin;
                $("#popup_awards_user").remove();
                showPopupSomeAwardsUser(awards,admin);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

function showPopupSomeAwardsUser(awards,admin){
    var count_awards = awards.length;
    var res = '<div id="popup_some_awards_user" style="position: fixed; z-index: 10012; overflow: visible;left: 50%;top: 50%;margin-left: -199px;margin-top: -125px;" class=""><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 247px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 247px; left: 395px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 405px; top: 247px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd2" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 397px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 397px; height: 249px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_popup_some_awards_user" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
    '<span class="xw-hdr-text" unselectable="on" title="">Список наград - Детали</span></div></div></div></div><div class="xw-ml" unselectable="on" style="display: block;"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 208px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 375px; display: block; height: 100%;" align="center" unselectable="on">'+
    '<div id="some_awards_content" align="left"><table border="0" cellpadding="2" cellspacing="1" width="100%"><tbody><tr>'+
    '<td width="10%"><img alt="" src="/img/awards/'+awards[0].award+'.png" border="0"></td>'+
    '<td style="padding-left:6px;"><b>'+count_awards+'</b></td>'+
    '<td align="right" valign="top">[<a href="javascript://" class="awardsHistory" user_id="'+awards[0].id_to+'" rel="nofollow">Все награды</a>]</td></tr></tbody></table>'+
    '</div></div></div></div></div></div></div><div class="xw-bl" unselectable="on" style="display: block;"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="width: 397px; height: 224px; display: none;" unselectable="on"></div></div></div>';
    $('body').append(res);
    i=0;
    while(i < count_awards){
        var a = new Date(awards[i].addtime*1000);
        var hour = a.getHours().toString();
        var min = a.getMinutes().toString();
        var date = a.getDate().toString();
        var year = a.getFullYear().toString();
        var month = (a.getMonth()+1).toString();
        if(hour.length == 1){
            hour = '0'+hour;
        }
        if(date.length == 1){
            date = '0'+date;
        }
        if(min.length == 1){
            min = '0'+min;
        }
        if(month.length == 1){
            month = '0'+month;
        }
        var time = date + '.' + month + '.' + year + ', ' + hour + ':' + min;
        
        switch(awards[i].group_name){
            case 'GUESTS' : group = "Гости"; break;
            case 'REGISTERED' : group = "Пользователи"; break;
            case 'REGISTERED_COPPA' : group = "Зарегистрированные COPPA"; break;
            case 'GLOBAL_MODERATORS' : group = "Глобальные модераторы"; break;
            case 'ADMINISTRATORS' : group = "Администраторы"; break;
            case 'BOTS' : group = "Боты"; break;
            case 'NEWLY_REGISTERED' : group = "Недавно зарегистрированные"; break;
            case 'MODERATORS' : group = "Модераторы"; break;
            case 'EDITORS' : group = "Редакторы"; break;
            case 'CERTIFIED' : group = "Проверенные"; break;
            case 'BANNED' : group = "Забаненные"; break;
            default : group = "Не найдено"; break;
        }
        
        var str_edit_award = '';
        var str_delete_award = '';
        if(admin == true){
            str_edit_award = '<a href="javascript://" class="edit_award" award_id="'+awards[i].id+'" rel="nofollow"><img alt="" border="0" align="absmiddle" src="/img/fr/OmnE.gif" width="15" height="15" title="Изменить"></a>';
            str_delete_award = '<a href="javascript://" class="delete_award" award_id="'+awards[i].id+'" rel="nofollow"><img border="0" align="absmiddle" src="/img/fr/OmnD.gif" width="15" height="15" title="Удалить"></a>';
        }
        
        $("#some_awards_content").append('<fieldset id="blk'+awards[i].id+'"><legend><b><a href="/index/8-'+awards[i].id_from+'" target="_blank">'+awards[i].username+'</a></b> ('+group+')</legend><div style="text-align:justify;" id="mtx'+awards[i].id+'">'+awards[i].text+'</div><div style="padding:3px 0;font-size:7pt;text-align:right;">'+time+' &nbsp;'+
        
        str_edit_award+
        str_delete_award+
        '</div></fieldset>');
        i++;
    }
}

$(".close_popup_some_awards_user").live("click",function(){
    $("#popup_some_awards_user").remove();
});


$(".awards_show_add_popup").live("click",function(){
    var user_id = $(this).attr('user_id');
    var username = $(this).attr("username");
    $("#popup_item_add_award").remove();
    $("#popup_add_award_user").remove();
    showPopupAddAwardUser(user_id,username);
});

function showPopupAddAwardUser(user_id,username){
    var res = '<div id="popup_add_award_user" style="position: fixed; z-index: 10008; overflow: visible;left: 50%;top: 50%;margin-left: -250px;margin-top: -170px;" class=""><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 339px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 339px; left: 497px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 507px; top: 339px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd1" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 499px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 499px; height: 341px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_popup_add_award_user" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
    '<span class="xw-hdr-text" unselectable="on" title="">Вручить награду</span></div></div></div></div><div class="xw-ml" unselectable="on" style="display: block;"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 300px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 477px; display: block; height: 100%;" align="center" unselectable="on"><div align="left">'+
    '<fieldset class="awards_marks"><legend><b>Знаки отличия</b></legend></fieldset>'+
    '<fieldset class="awards_love"><legend><b>Любовь</b></legend></fieldset>'+
    '<fieldset class="awards_food"><legend><b>Еда</b></legend></fieldset>'+
    '<fieldset class="awards_positive"><legend><b>Позитив</b></legend></fieldset>'+
    '<fieldset class="awards_animals"><legend><b>Животные</b></legend></fieldset>'+
    '<fieldset class="awards_subjects"><legend><b>Предметы</b></legend></fieldset>'+
    '<fieldset class="awards_negative"><legend><b>Негатив</b></legend></fieldset>'+
    '<fieldset class="awards_rich"><legend><b>Богатство</b></legend></fieldset>'+
    '</div></div></div></div></div></div></div><div class="xw-bl" unselectable="on" style="display: block;"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="width: 499px; height: 316px; display: none;" unselectable="on"></div></div></div>';
    $('body').append(res);
    i=1;
    var awards_marks = '';var awards_love = '';var awards_food = '';var awards_positive = '';var awards_animals = '';var awards_subjects = '';var awards_negative = '';awards_rich = '';
    
    while(i < 56){
        if(i < 11){
            awards_marks += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }else if(i< 16){
            awards_love += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }else if(i < 26){
            awards_food += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }else if(i < 31){
            awards_positive += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }else if(i < 36){
            awards_animals += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }else if(i < 46){
            awards_subjects += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }else if(i < 51){
            awards_negative += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }else if(i < 56){
            awards_rich += '<div class="item_add_award item_award_'+i+'" user_id="'+user_id+'" username="'+username+'" award="'+i+'"><img alt="" src="/img/awards/'+i+'.png" border="0"></div>';
        }
        i++;
    }
    
    $(".awards_marks").append(awards_marks);
    $(".awards_love").append(awards_love);
    $(".awards_food").append(awards_food);
    $(".awards_positive").append(awards_positive);
    $(".awards_animals").append(awards_animals);
    $(".awards_subjects").append(awards_subjects);
    $(".awards_negative").append(awards_negative);
    $(".awards_rich").append(awards_rich);
    
}

$(".close_popup_add_award_user").live("click",function(){
    $("#popup_add_award_user").remove();
});


$(".item_add_award").live("click",function(){
    var user_id = $(this).attr('user_id');
    var username = $(this).attr('username');
    var award = $(this).attr('award');
    var res ='<div id="popup_item_add_award" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 397px; z-index: 2; overflow: visible;left: 50%;top: 50%;margin-left: -198px;margin-top: -127px;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 397px; height: 155px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 close_popup_item_add_award" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Вручить награду</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 114px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 375px; display: block; height: 100%;" align="center" unselectable="on"><div align="left"><table border="0" cellpadding="2" cellspacing="1" width="100%"><tbody><tr>'+
    '<td width="1%"><img alt="" src="/img/awards/'+award+'.png" border="0"></td>'+
    '<td style="padding-left:5px"><b>'+username+'</b></td>'+
    '<td width="5%" nowrap="nowrap" align="right" valign="top">[<a class="awards_show_add_popup" user_id="'+user_id+'" username="'+username+'" href="javascript://" rel="nofollow">Все награды</a>]</td>'+
    '</tr></tbody></table>'+
    
    '<fieldset><legend><b>Комментарий</b></legend><input type="text" id="item_add_award_comment" name="comment" style="width:99%;" maxlength="180"></fieldset>'+
    
    '<fieldset style="margin-top:5px;"><table border="0" cellpadding="2" cellspacing="0" width="100%"><tbody><tr><td id="msg735">&nbsp;</td><td width="5%" nowrap="nowrap"><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="myBtnLeft"><img alt="" border="0" src="/img/1px.gif"></td><td class="myBtnCenter"><div class="myBtnCont x-unselectable" unselectable="on">'+
    
    '<a href="javascript://" class="add_award_user_confirm" user_id="'+user_id+'" award="'+award+'">Добавить</a>'+
    
    '</div></td><td class="myBtnRight"><img alt="" border="0" src="/img/1px.gif"></td><td style="visibility:hidden;"><input type="image" src="/img/ma/1px.gif" style="width:1px;" name="submfrm"></td></tr></tbody></table></td></tr></tbody></table></fieldset></div></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div>';
    $("#popup_add_award_user").remove();
    $('body').append(res);
});

$(".close_popup_item_add_award").live("click",function(){
    $("#popup_item_add_award").remove();
});

$(".add_award_user_confirm").live("click",function(){
    var user_id = $(this).attr('user_id');
    var award = $(this).attr('award');
    var comment = $("#item_add_award_comment").val();
    if(comment == ''){
        afterRatingBlock2("Введите комментарий");
        setTimeout(function(){
            killBlock();
        }, 2000);
    }else{
        $.ajax({
            type : 'GET',
            data : {user_id:user_id,award:award,comment:comment},
            dataType : 'json',
            contentType: "application/json",
            url : '/user/addaward',
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                    $("#popup_item_add_award").remove();
                    afterRatingBlock2("Награда добавлена");
                    setTimeout(function(){
                        killBlock();
                    }, 2000);
                }
                if(res.status == "banned_user"){
                    popupBannedUser();
                    setTimeout(function(){
                        killBlock();
                    }, 3000);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

$(".edit_award").live("click",function(){
    var award_id = $(this).attr("award_id");
    var text = $('#mtx'+award_id).html();
    $('#mtx'+award_id).html('<textarea award_id="'+award_id+'" class="award_text">'+text+'</textarea>');
    $(this).hide();
    $('.award_text[award_id="'+award_id+'"]').focus();
});

$(".award_text").live("focusout",function(){
    var award_id = $(this).attr("award_id");
    var text = $(this).val();
    $.ajax({
        type : 'GET',
        data : {id:award_id,text:text},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/editaward',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                $('.edit_award[award_id="'+award_id+'"]').show();
                $('.award_text[award_id="'+award_id+'"]').parent().html(text);
            }
            if(res.status == "not_authorized"){
                
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".delete_award").live("click",function(){
    var award_id = $(this).attr("award_id");
    if(confirm("Вы подтверждаете удаление?")){
        $.ajax({
            type : 'GET',
            data : {id:award_id},
            dataType : 'json',
            contentType: "application/json",
            url : '/user/deleteaward',
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                   $('#blk'+award_id).remove();
                }
                if(res.status == "not_authorized"){
                    
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

//------------ Awards end 

//------------ Remarks
$(".show_popup_user_remarks").live("click",function(){
    var user_id = $(this).attr('user_id');
    $("#popup_user_remarks").remove();
    $('body').append('<div id="popup_user_remarks" style="position: fixed; z-index: 10080; overflow: visible; left: 50%;top: 50%;margin-left: -200px;margin-top: -146px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 290px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 290px; left: 398px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 408px; top: 290px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd10" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 400px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 400px; height: 292px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_popup_user_remarks" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Центр замечаний пользователя</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 251px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 378px; display: block; height: 100%;" align="center" unselectable="on"><div align="left">'+
    
    '<fieldset><legend><b>Действие</b></legend>'+
    '<input id="remark_a1" type="radio" name="act" value="1"><label for="remark_a1">[–] понизить уровень замечаний (снять бан)</label><br>'+
    '<input id="remark_a2" type="radio" name="act" value="2"><label for="remark_a2">[+] повысить уровень замечаний</label><br>'+
    '</fieldset>'+
    
    '<fieldset><legend><b>Введите причину</b></legend>'+
    '<textarea rows="3" name="reason" id="remark_comment" style="height:50px;width:99%;"></textarea>'+
    '</fieldset>'+
    
    '<fieldset><legend><b>Блокировать активность</b></legend>'+
    '<input type="text" name="time" id="remark_time" size="3" value="0" maxlength="3">'+
    '<select size="1" name="period" id="remark_period"><option value="1">дней</option><option value="2">часов</option></select> &nbsp; '+
    '<input type="checkbox" id="remark_ever" name="ever" value="1"><label for="ever">Блокировать навсегда</label>'+
    '</fieldset>'+
    
    '<fieldset><legend><b>Отправить уведомление</b></legend>'+
    '<input type="checkbox" id="sendto1" name="sendto" value="1" checked=""><label for="sendto1">Личные сообщения</label> &nbsp; '+
    '<input type="checkbox" id="sendto2" name="sendto" value="2"><label for="sendto2">E-mail</label>'+
    '</fieldset>'+
    
    '<fieldset style="margin-top:5px;"><table border="0" cellpadding="2" cellspacing="1" width="100%"><tbody><tr><td id="msg982"></td><td width="10%"><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="myBtnLeft"><img alt="" border="0" src="/img/1px.gif"></td><td class="myBtnCenter"><div class="myBtnCont x-unselectable" unselectable="on">'+
    '<a href="javascript://" class="send_remark" user_id="'+user_id+'">Применить</a>'+
    '</div></td><td class="myBtnRight"><img alt="" border="0" src="/img/1px.gif"></td><td style="visibility:hidden;"><input type="image" src="/img/1px.gif" style="width:1px;" name="submfrm"></td></tr></tbody></table></td></tr></tbody></table>'+
    '</fieldset>'+
    
    '</div>'+
	'</div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>');
});

$(".close_popup_user_remarks").live("click",function(){
    $("#popup_user_remarks").remove();
});

$(".send_remark").live("click",function(){
    var user_id = $(this).attr('user_id');
    var a1 = $("#remark_a1").prop('checked'); // minus
    var a2 = $("#remark_a2").prop('checked'); // plus
    var remark_change = "none";
    if(a1 == true){
        remark_change = "minus";
    }
    if(a2 == true){
        remark_change = "plus";
    }
    var remark_comment = $("#remark_comment").val();
    var remark_time = $("#remark_time").val();
    var remark_period = $("#remark_period").val();
    var remark_ever_prop = $("#remark_ever").prop('checked');
    var sendto1_prop = $("#sendto1").prop('checked');
    var sendto2_prop = $("#sendto2").prop('checked');
    if(remark_ever_prop == true){ remark_ever = 1; }else{ remark_ever = 0; }
    if(sendto1_prop == true){ sendto1 = 1; }else{ sendto1 = 0; }
    if(sendto2_prop == true){ sendto2 = 1; }else{ sendto2 = 0; }
    
    if(remark_comment == ''){
        afterRatingBlock2("Форма заполнена неверно");
        setTimeout(function(){
            killBlock();
        }, 2000);
    }else if(remark_change == "none" && remark_ever == "0" && remark_time == "0"){
        afterRatingBlock2("Форма заполнена неверно");
        setTimeout(function(){
            killBlock();
        }, 2000);
    }else{
        $.ajax({
            type : 'GET',
            data : {user_id:user_id,change:remark_change,comment:remark_comment,time:remark_time,period:remark_period,ever:remark_ever,privmsg:sendto1,emailmsg:sendto2},
            dataType : 'json',
            contentType: "application/json",
            url : '/user/changeremark',
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                    afterRatingBlock2("Замечание добавлено");
                    setTimeout(function(){
                        killBlock();
                        $("#popup_user_remarks").remove();
                    }, 2000);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

$(".show_remark_history").live("click",function(){
    var user_id = $(this).attr('user_id');
    $.ajax({
        type : 'GET',
        data : {user_id:user_id},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/getremarkshistory',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                var remarks = res.remarks;
                var user = res.user;
                var admin = res.admin;
                $("#popup_remark_history").remove();
                showPopupRemarkHistory(remarks,user,admin);
            }else if(res.status == "no_history"){
                alert("Нет истории");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

function showPopupRemarkHistory(remarks,user,admin){
    switch(user.remark){
        case '20' : remark_str = "1"; break;
        case '40' : remark_str = "2"; break;
        case '60' : remark_str = "3"; break;
        case '80' : remark_str = "4"; break;
        case '100' : remark_str = "5"; break;
        default : remark_str = "0"; break;
    }
    var res = '<div id="popup_remark_history" style="position: fixed; z-index: 10008; overflow: visible; left: 50%;top: 50%;margin-left: -200px;margin-top: -133px;" class=""><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 264px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 264px; left: 398px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 408px; top: 264px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd1" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" ' +
    'style="position: absolute; width: 400px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 400px; height: 266px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_popup_remark_history" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">История замечаний</span></div></div></div></div><div class="xw-ml" unselectable="on" style="display: block;"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 225px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div>'+
    '<div class="myWinCont" id="remarks_history_content" style="overflow: auto; width: 378px; display: block; height: 100%;" align="center" unselectable="on">'+
    '<div align="left">Уровень замечаний пользователя: <b>'+remark_str+'</b> [ '+user.remark+'% ]</div><hr>'+
    
    '</div></div></div></div></div></div><div class="xw-bl" unselectable="on" style="display: block;"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="width: 400px; height: 241px; display: none;" unselectable="on"></div></div></div>';
    $('body').append(res);
    count_remarks = remarks.length;
    i=0;
    while(i < count_remarks){
        var a = new Date(remarks[i].addtime*1000);
        var hour = a.getHours().toString();
        var min = a.getMinutes().toString();
        var date = a.getDate().toString();
        var year = a.getFullYear().toString();
        var month = (a.getMonth()+1).toString();
        if(date.length == 1){
            date = '0'+date;
        }
        if(hour.length == 1){
            hour = '0'+hour;
        }
        if(min.length == 1){
            min = '0'+min;
        }
        if(month.length == 1){
            month = '0'+month;
        }
        var time = date + '.' + month + '.' + year + ', ' + hour + ':' + min;
        
        if(remarks[i].type == "plus"){
            var class_image = "popup_repute_plus";
            var text = "Уровень повышен";
        }
        if(remarks[i].type == "minus"){
            var class_image = "popup_repute_minus";
            var text = "Уровень понижен";
        }
        
        var str_edit_remark = '';
        var str_delete_remark = '';
        if(admin == true){
            str_edit_remark = '<a href="javascript://" class="edit_remark" remark_id="'+remarks[i].id+'" rel="nofollow"><img alt="" border="0" align="absmiddle" src="/img/fr/OmnE.gif" width="15" height="15" title="Изменить"></a>';
            str_delete_remark = '<a href="javascript://" class="delete_remark" remark_id="'+remarks[i].id+'" rel="nofollow"><img border="0" align="absmiddle" src="/img/fr/OmnD.gif" width="15" height="15" title="Удалить"></a>';
        }
        
        $("#remarks_history_content").append(
        '<div id="blk'+remarks[i].id+'"><table border="0" cellpadding="1" cellspacing="1" width="100%">'+
        '<tbody><tr><td width="70%"><div title="'+text+'" class="'+class_image+'" style="width:16px;height:17px;float:left;"></div>&nbsp;'+
        '<a class="banHUser" href="/index/8-'+remarks[i].from_id+'" target="_blank"><b>'+remarks[i].username+'</b></a></td>'+
        '<td align="right" style="white-space: nowrap;font-size:7pt">'+time+' &nbsp;'+
        
        str_edit_remark+
        str_delete_remark+
        
        '</td></tr><tr><td colspan="2" id="mtx'+remarks[i].id+'">'+remarks[i].comment+'</td>'+
        '</tr></tbody></table><hr></div>');
        i++;
    }    
}

$(".close_popup_remark_history").live("click",function(){
    $("#popup_remark_history").remove();
});

$(".edit_remark").live("click",function(){
    var remark_id = $(this).attr("remark_id");
    var text = $('#mtx'+remark_id).html();
    $('#mtx'+remark_id).html('<textarea remark_id="'+remark_id+'" class="remark_text">'+text+'</textarea>');
    $(this).hide();
    $('.remark_text[remark_id="'+remark_id+'"]').focus();
});

$(".remark_text").live("focusout",function(){
    var remark_id = $(this).attr("remark_id");
    var text = $(this).val();
    $.ajax({
        type : 'GET',
        data : {id:remark_id,text:text},
        dataType : 'json',
        contentType: "application/json",
        url : '/user/editremark',
        async: false,
        success : function (res) {
            if(res.status == "ok"){
                $('.edit_remark[remark_id="'+remark_id+'"]').show();
                $('.remark_text[remark_id="'+remark_id+'"]').parent().html(text);
            }
            if(res.status == "not_authorized"){
                
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".delete_remark").live("click",function(){
    var remark_id = $(this).attr("remark_id");
    if(confirm("Вы подтверждаете удаление?")){
        $.ajax({
            type : 'GET',
            data : {id:remark_id},
            dataType : 'json',
            contentType: "application/json",
            url : '/user/deleteremark',
            async: false,
            success : function (res) {
                if(res.status == "ok"){
                   $('#blk'+remark_id).remove();
                }
                if(res.status == "not_authorized"){
                    
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
});

//------------ Remarks end

$("#film_dont_work").live("click",function(){
    var one_news_id = $(this).attr("one_news_id");
    showFilmDontWork(one_news_id);
});

$(".xt-close2").live("click",function(){
    $('#_uwndTop1').remove();
});

$('input.loginField[name="password"]').live("keydown",function(e){
    if(e.keyCode == 13){
        login1();
    }
});

$(".loginButton").live("click",function(){
    login1(this);
});

function login1(a){
    var username = $('#' + $(a).data('username')).val();
    var password = $('#' + $(a).data('password')).val();
    var user = {username:username,password:password};
    $.ajax({
        type : 'GET',
        data : {user:user},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/login',
        async: false,
        success : function (res) {
            if(res == "login_success"){
                $("#login_block").attr("style","opacity: 0.5;border: 1px solid gray;background: url(/img/arrow_login.jpg) 10px 15px no-repeat;");
                setTimeout(function(){
                    window.location.href = window.location.href;
                    window.location.reload();
                }, 2000);
            }else{
                var error_login = res['error_login'];
                if(error_login == "LOGIN_ERROR_USERNAME"){
                    $("#login_block").attr("style","opacity: 0.5;border: 1px solid gray;background: url(/img/login_fail.jpg) 10px 15px no-repeat;");
                    $("#login_block input").attr("disabled","disabled");
                    afterRatingBlock2("Неправильный логин!");
                    setTimeout(function(){
                        $("#login_block").removeAttr("style");
                        $("#login_block input").removeAttr("disabled");
                        killBlock();
                    }, 3000);
                }else{
                    if(error_login == "LOGIN_ERROR_PASSWORD"){
                        $("#login_block").attr("style","opacity: 0.5;border: 1px solid gray;background: url(/img/login_fail.jpg) 10px 15px no-repeat;");
                        $("#login_block input").attr("disabled","disabled");
                        afterRatingBlock2("Неправильный пароль!");
                        setTimeout(function(){
                            $("#login_block").removeAttr("style");
                            $("#login_block input").removeAttr("disabled");
                            killBlock();
                        }, 3000);
                    }else{
                        if(error_login == "LOGIN_ERROR_ATTEMPTS"){
                            $("#login_block").attr("style","opacity: 0.5;border: 1px solid gray;background: url(/img/login_fail.jpg) 10px 15px no-repeat;");
                            $("#login_block input").attr("disabled","disabled");
                            afterRatingBlock2("Превышено количество неверных паролей!");
                            setTimeout(function(){
                                $("#login_block").removeAttr("style");
                                $("#login_block input").removeAttr("disabled");
                                killBlock();
                            }, 3000);
                        }
                    }
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
}

$(".loginButton2").live("click",function(){
    var username = $('input.loginField2[name="username"]').val();
    var password = $('input.loginField2[name="password"]').val();
    var user = {username:username,password:password};
    $.ajax({
        type : 'GET',
        data : {user:user},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/login',
        async: false,
        success : function (res) {
            if(res == "login_success"){
                $("#login_block2").attr("style","width: 656px;float: left;opacity: 0.5;border: 1px solid gray;background: url(/img/arrow_login.jpg) 10px 15px no-repeat;");
                setTimeout(function(){
                    window.location = '/';
                }, 2000);
            }else{
                var error_login = res['error_login'];
                if(error_login == "LOGIN_ERROR_USERNAME"){
                    $("#login_block2").attr("style","width: 656px;float: left;opacity: 0.5;border: 1px solid gray;background: url(/img/login_fail.jpg) 10px 15px no-repeat;");
                    $("#login_block2 input").attr("disabled","disabled");
                    afterRatingBlock2("Неправильный логин!");
                    setTimeout(function(){
                        $("#login_block2").removeAttr("style");
                        $("#login_block2").attr("style","width: 656px;float: left;");
                        $("#login_block2 input").removeAttr("disabled");
                        killBlock();
                    }, 3000);
                }else{
                    if(error_login == "LOGIN_ERROR_PASSWORD"){
                        $("#login_block2").attr("style","width: 656px;float: left;opacity: 0.5;border: 1px solid gray;background: url(/img/login_fail.jpg) 10px 15px no-repeat;");
                        $("#login_block2 input").attr("disabled","disabled");
                        afterRatingBlock2("Неправильный пароль!");
                        setTimeout(function(){
                            $("#login_block2").removeAttr("style");
                            $("#login_block2").attr("style","width: 656px;float: left;");
                            $("#login_block2 input").removeAttr("disabled");
                            killBlock();
                        }, 3000);
                    }else{
                        if(error_login == "LOGIN_ERROR_ATTEMPTS"){
                            $("#login_block2").attr("style","width: 656px;float: left;opacity: 0.5;border: 1px solid gray;background: url(/img/login_fail.jpg) 10px 15px no-repeat;");
                            $("#login_block2 input").attr("disabled","disabled");
                            afterRatingBlock2("Превышено количество неверных паролей!");
                            setTimeout(function(){
                                $("#login_block2").removeAttr("style");
                                $("#login_block2").attr("style","width: 656px;float: left;");
                                $("#login_block2 input").removeAttr("disabled");
                                killBlock();
                            }, 3000);
                        }
                    }
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".login_popup").live("click",function(){
    $("#popup_login").remove();
    showLoginPopup();
});

function showLoginPopup(){
    $('body').append('<div id="popup_login" style="position: fixed; z-index: 10020; overflow: visible; left: 50%;top: 50%;margin-left: -136px;margin-top: -75px;">'+
    '<div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 149px; display: block;"><div class="xstl"><div class="xsml"></div></div></div>'+
    '<div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 149px; left: 270px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div>'+
    '<div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 280px; top: 149px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div>'+
    
    '<div id="_uwndWnd3" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 272px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 272px; height: 151px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_popup_login" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
    '<span class="xw-hdr-text" unselectable="on" title="">Вход на сайт</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 110px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 250px; display: block; height: 100%;" align="center" unselectable="on">'+
    '<div align="left">'+
    
    '<table border="0" cellpadding="1" cellspacing="0" width="100%"><tbody><tr>'+
    '<td width="35%" nowrap="nowrap">Логин:</td>'+
    '<td><input type="text" name="user" style="width:95%" maxlength="50"></td></tr><tr>'+
    '<td>Пароль:</td>'+
    '<td><input type="password" name="p_password" style="width:95%" maxlength="15"></td>'+
    '</tr>'+
    
    '<tr><td nowrap="nowrap"><input id="rem" type="checkbox" name="rem" value="1" checked=""><label for="rem">запомнить</label><br><input id="hid555" type="checkbox" name="hidden" value="1"><label for="hid555">скрытый</label></td>'+
    '<td valign="top">'+
    '<table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td>'+
    '<table border="0" cellpadding="0" cellspacing="0" class="outBtn">'+
    '<tbody><tr>'+
    '<td class="myBtnLeft"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td class="myBtnCenter"><div class="myBtnCont x-unselectable" unselectable="on" id="subbutfrmLg">'+
    
    '<a href="javascript://" class="login_from_popup">Вход</a></div></td>'+
    
    '<td class="myBtnRight"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td style="visibility:hidden;" id="for_img"><input type="image" src="/img/ma/1px.gif" style="width:1px;" name="submfrmLg" id="submfrmLg"></td>'+
    '</tr></tbody></table></td><td style="padding-left:4px" id="msgL"></td></tr></tbody></table></td></tr><tr><td style="font-size:7pt;text-align:center;padding-top:5px;" colspan="2"><a href="javascript://" rel="nofollow" class="remind_password">Забыл пароль</a> · <a href="/index/registration">Регистрация</a></td></tr></tbody></table>'+
    
    '</div></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>');
}

$(".close_popup_login").live("click",function(){
    $("#popup_login").remove();
});

$(".login_from_popup").live("click",function(){
    var username = $('input[name="user"]').val();
    var password = $('input[name="p_password"]').val();
    var user = {username:username,password:password};
    $.ajax({
        type : 'GET',
        data : {user:user},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/login',
        async: false,
        success : function (res) {
            if(res == "login_success"){
                $("#for_img").html('<img src="/img/arrow_login.jpg" alt="" />');
                $("#for_img").removeAttr("style");
                $(".login_from_popup").attr("class","login_from_popup_2");
                setTimeout(function(){
                    window.location.href = window.location.href;
                    window.location.reload();
                }, 2000);
            }else{
                var error_login = res['error_login'];
                if(error_login == "LOGIN_ERROR_USERNAME"){
                    afterRatingBlock2("Неправильный логин!");
                    $("#for_img").html('<img src="/img/login_fail.jpg" alt="" />');
                    $("#for_img").removeAttr("style");
                    $(".login_from_popup").attr("class","login_from_popup_2");
                    setTimeout(function(){
                        $("#for_img").attr("style","visibility:hidden;");
                        killBlock();
                        $(".login_from_popup_2").attr("class","login_from_popup");
                    }, 3000);
                }else{
                    if(error_login == "LOGIN_ERROR_PASSWORD"){
                        afterRatingBlock2("Неправильный пароль!");
                        $("#for_img").html('<img src="/img/login_fail.jpg" alt="" />');
                        $("#for_img").removeAttr("style");
                        $(".login_from_popup").attr("class","login_from_popup_2");
                        setTimeout(function(){
                            $("#for_img").attr("style","visibility:hidden;");
                            killBlock();
                            $(".login_from_popup_2").attr("class","login_from_popup");
                        }, 3000);
                    }else{
                        if(error_login == "LOGIN_ERROR_ATTEMPTS"){
                            afterRatingBlock2("Превышено количество неверных паролей!");
                            $("#for_img").html('<img src="/img/login_fail.jpg" alt="" />');
                            $("#for_img").removeAttr("style");
                            $(".login_from_popup").attr("class","login_from_popup_2");
                            setTimeout(function(){
                                $("#for_img").attr("style","visibility:hidden;");
                                killBlock();
                                $(".login_from_popup_2").attr("class","login_from_popup");
                            }, 3000);
                        }
                    }
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

/*$("#logout").live("click",function(){
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/logout',
        async: false,
        success : function (res) {
            if(res == "logout_success"){
                setTimeout(function(){
                    window.location.href = window.location.href;
                    window.location.reload();
                }, 2000);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});*/

$('.remind_password').live("click",function(){
    $("#popup_login").remove();
    $("#popupRemindPass").remove();
    showPopupRemindPassword();
});

function showPopupRemindPassword(){
    $('#popuplogin').hide();
    $('body').append('<div id="popupRemindPass" style="position: fixed; z-index: 10012; overflow: visible; left: 50%;top: 50%;margin-left: -150px;margin-top: -60px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 118px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 118px; left: 298px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 308px; top: 118px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd4" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 300px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 300px; height: 120px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
    '<div class="xt xt-close xt-close2 close_popup_remind_pass" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
    '<span class="xw-hdr-text" unselectable="on" title="">Напоминание пароля</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 79px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 278px; display: block; height: 100%;" align="center" unselectable="on"><div style="padding:15px 0">'+
    
    '<table border="0" width="100%">'+
    '<tbody><tr><td width="35%" align="right">Логин:</td><td>'+
    '<input style="width:140px" maxlength="50" id="txtF774" type="text" name="s" size="20"></td></tr>'+
    '<tr><td align="right" id="eMsg831"></td><td>'+
    '<table border="0" cellpadding="0" cellspacing="0">'+
    '<tbody><tr>'+
    '<td class="myBtnLeftA"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td class="myBtnCenterA"><div class="myBtnCont x-unselectable" unselectable="on">'+
    '<a href="javascript://" onclick="return false;" class="remind_pass_ok">Применить</a></div></td>'+
    '<td class="myBtnRightA"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td style="visibility:hidden;"><input type="image" src="/img/ma/1px.gif" style="width:1px;" name="submPrm348"></td></tr></tbody></table></td></tr></tbody></table></div>'+
    
    '</div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>');
}

$(".close_popup_remind_pass").live("click",function(){
    $("#popupRemindPass").remove();
});

$(".remind_pass_ok").live("click",function(){
    var login = $("#txtF774").val();
    $.ajax({
        type : 'GET',
        data : {login:login},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/remindpass',
        async: false,
        success : function (res) {
            if(res.status == "success"){
                $("#eMsg831").html('<div class="myWinLoadSD"></div>');
                afterRemindBlock("На ваш E-Mail адрес, указанный при регистрации, было отправлено уведомление для генерации нового пароля для Вас.");
                $("#popupRemindPass").remove();
            }else if(res.status == "not_found"){
                $("#eMsg831").html('<div class="myWinLoadSF" title="Пользователь не найден"></div>');
                afterRatingBlock2("Пользователь не найден");
                setTimeout(function(){
                    killBlock();
                }, 2000);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".pollBut").live("click",function(){
    var id_pool = $(this).attr("id_pool");
    var list = $('div.answer input[type="radio"]');
    var count_elem = list.length;
    if(count_elem == 0){
        list = $('div.answer input[type="checkbox"]');
        count_elem = list.length;
    }
    var i=1;
    var answers = [];
    while(i < count_elem+1){
        var elem = $('#a'+id_pool+i).prop('checked');
        if(elem == true){
            answers[i] = $('#a'+id_pool+i).val();
        }
        i++;
    }
    console.log(answers);
    var params = {id_pool:id_pool,answers:answers}
    //----------
    $.ajax({
        type : 'GET',
        data : {params:params},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/pool',
        async: false,
        success : function (res) {
            if(res.rated == "success"){
                var new_pool = res.new_pool;
                $("div.answer input").remove();
                $("div.answer label").remove();
                var i = 1;
                var i_answer = 8;
                var i_result = 23;
                var all_votes = parseInt(new_pool[38]);
                var colours = res.colours;
                $("div.answer").each(function(){
                    var percent = Math.round((new_pool[i_result] * 100) / all_votes);
                    $(this).attr("votes",new_pool[i_result]).append('<span title="Голосов: '+new_pool[i_result]+'('+percent+'%)">'+new_pool[i_answer]+'</span><div style="padding-top:3px;width: 100%;"><div style="width: '+percent+'%;background:'+colours[i-1]+';height:3px"></div></div>');
                    i++;i_answer++;i_result++;
                });
                var wrapper = $('.pollAns');
                wrapper.find('div.answer').sort(function (a, b) {
                    return +b.getAttribute('votes') - +a.getAttribute('votes');
                }).prependTo( wrapper );
                $(".pollTot b").html(all_votes);
                var ii = 1;
                $("div.answer").each(function(){
                    $(this).prepend(ii+'. ');
                    ii++;
                });
                $(".pollBut").hide();
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
    //----------
});

$(".link_pool_archive").live("click",function(){
    var id_pool = $(this).attr("id_pool");
    //----------
    $.ajax({
        type : 'GET',
        data : {id_pool:id_pool},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/getpool',
        async: false,
        success : function (res) {
            if(res.status == "success"){
                var pool = res.pool;
                var colours = res.colours;
                //--------------голосование в архиве--------------
                $("#popupPoolArchive").remove();
                popupPoolArchive(pool);
                //------------------------------------------------
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
    //----------
});

$(".pool_archive").live("click", function(){
    var id_pool = $(this).attr("id_pool");
    var list = $('#popupPoolArchive input[type="radio"]');
    var count_elem = list.length;
    if(count_elem == 0){
        list = $('#popupPoolArchive input[type="checkbox"]');
        count_elem = list.length;
    }
    var i=1;
    var answers = [];
    while(i < count_elem+1){
        var elem = $('#a'+id_pool+i).prop('checked');
        if(elem == true){
            answers[i] = $('#a'+id_pool+i).val();
        }
        i++;
    }
    var params = {id_pool:id_pool,answers:answers}
    //----------
    $.ajax({
        type : 'GET',
        data : {params:params},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/pool',
        async: false,
        success : function (res) {
            if(res.rated == "success"){
                var new_pool = res.new_pool;
                $(".img_after_result").append('<div class="myWinLoadSD" style="background:url(\'/s.s/img/icon/ok.png\') no-repeat 0 0!important; background-attachment: initial;"></div>');
                setTimeout(function(){
                    $("#popupArchivePools .link_pool_archive").each(function(){
                        if( $(this).attr("id_pool") == id_pool){
                            $(this).parent().parent().parent().parent().parent().hide();
                            var wrap = $(this).parent().parent().parent().parent().parent().parent();
                            var el_votes = wrap.find(".myWinPollTd b");
                            var count_votes = wrap.find(".myWinPollTd b").html();
                            el_votes.html(parseInt(el_votes.html())+1);
                        }
                    });
                    $("#popupPoolArchive").remove();
                }, 2000);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
    //----------
});

$(".pollLnk-all").live("click",function(){
    var id_pool = $(this).attr("id_pool");
    //----------
    $.ajax({
        type : 'GET',
        data : {id_pool:id_pool},
        dataType : 'json',
        contentType: "application/json",
        url : '/index/getpool',
        async: false,
        success : function (res) {
            if(res.status == "success"){
                var pool = res.pool;
                var colours = res.colours;
                $('#popupPoolResults').remove();
                popupPoolResults(pool,colours);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
    //----------
});

$(".closePopupPoolResults").live("click",function(){
    $('#popupPoolResults').remove();
});

$(".closePopupPoolArchive").live("click",function(){
    $('#popupPoolArchive').remove();
});

$(".pollLnk-archive").live("click",function(){
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/getallpools',
        async: false,
        success : function (res) {
            if(res.status == "success"){
                var all_pools = res.all_pools;
                var colours = res.colours;
                $('#popupArchivePools').remove();
                popupArchivePools(all_pools,colours);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".xt-close-opros").live("click",function(){
    $('#popupArchivePools').remove();
});

$("#filmdontwork_button").live("click",function(){
    var fr51 = $('#fr51').prop('checked');
    var fr71 = $('#fr71').prop('checked');
    var fr61 = $('#fr61').prop('checked');
    var fr81 = $('#fr81').prop('checked');
    var param1 = 0;
    var param2 = 0;
    var param3 = 0;
    var param4 = 0;
    if(fr51 == true){param1 = 1;}
    if(fr71 == true){param2 = 1;}
    if(fr61 == true){param3 = 1;}
    if(fr81 == true){param4 = 1;}
    var text_f3 = $('#f3').val();
    var one_news_id = $("#one_news_id").val();
    
    $.post('/index/filmdontwork',{one_news_id:one_news_id,param1:param1,param2:param2,param3:param3,param4:param4,text_f3:text_f3}, function(e){
        afterSendMailBlock('Ваше сообщение было успешно отправлено.');
    });
});

$(".report-spam-btn").live("click",function(){
    var this_link = $(this);
    var module_id = $(this).attr("module_id");
    var user_ip = $(this).attr("ip");
    var comment_id = $(this).attr("data-message-id");
    var spam = $(this).attr("data-not-spam");
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/spamcomment/spam/'+spam+'/module_id/'+module_id+'/user_ip/'+user_ip+'/comment_id/'+comment_id,
        async: false,
        success : function (res) {
            if(res == "added"){
                $("#comEnt"+comment_id).addClass("report-spam-hidden").hide();
                $('<div id="report-spam-toggle-wrapper-'+comment_id+'" class="report-spam-toggle-wrapper" style="margin-left: 0px;"><span class="report-spam-toggle-text">Спам-сообщение скрыто.</span> <a class="report-spam-toggle-button report-spam-handled" data-target="#comEnt'+comment_id+'" href="javascript://">Показать</a></div>').insertBefore($("#comEnt"+comment_id));
                this_link.attr("data-not-spam",1);
                this_link.html("Не спам");
            }
            if(res == "deleted"){
                $("#comEnt"+comment_id).removeClass("report-spam-hidden").show();
                $("#report-spam-toggle-wrapper-"+comment_id).remove();
                this_link.attr("data-not-spam",0);
                this_link.html("Спам");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".report-spam-toggle-button").live("click",function(){
    var data_target = $(this).attr("data-target");
    var is_visible = $(data_target).is(":visible");
    if(is_visible){
        $(data_target).hide();
        $(this).html("Показать");
        $(this).parent().find("span.report-spam-toggle-text").html("Спам-сообщение скрыто.");
    }else{
        $(data_target).show();
        $(this).html("Скрыть");
        $(this).parent().find("span.report-spam-toggle-text").html("Спам-сообщение показано.");
    }
});

//------- comments rate
$(".comment_rate").live("click",function(){
    var this_item = $(this);
    var comment_id = $(this).attr("comment_id");
    var module_id = $(this).attr("module_id");
    //var user_id = $(this).attr("user_id");
    var rate = $(this).attr("rate");
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/commentrate/rate/'+rate+'/module_id/'+module_id+'/comment_id/'+comment_id,
        async: false,
        success : function (res) {
            if(res.status == "rated"){
                var new_rate = res.new_rate;
                var colour = "";
                if(new_rate == 0){
                    colour = "gray";
                }
                if(new_rate < 0){
                    colour = "red";
                }
                if(new_rate > 0){
                    new_rate = '+'+new_rate;
                    colour = "blue";
                }
                this_item.parent().find("b").html(new_rate).attr("style","color:"+colour+";");
                afterRatingBlock2('Оценка комментария: '+new_rate);
                setTimeout(function(){
                    killBlock();
                }, 3000);
            }
            if(res.status == "already_rated"){
                afterRatingBlock2('Вы уже оценивали этот комментарий');
                setTimeout(function(){
                    killBlock();
                }, 3000);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

//------- comments rate end



$(".com-order-select").live("change",function(){
    var url = $(this).attr("url");
    var param = $(".com-order-select option:selected").val();
    is_param = url.indexOf("?comments_order");
    if(is_param == -1){
        window.location = url+"?comments_order="+param;
    }else{
        window.location = url.substr(0,is_param)+"?comments_order="+param;
    }
});

var usrarids={};
function ustarrating(module_id,id,mark){
    if (!usrarids[id]){
        usrarids[id]=1;
        $(".u-star-li-"+id).hide();
        $.ajax({
            type : 'GET',
            dataType : 'json',
            contentType: "application/json",
            url : '/index/starrating/module_id/'+module_id+'/material_id/'+id+'/mark/'+mark,
            async: false,
            success : function (res) {
                if(res == "failed"){
                    afterRatingBlock2('Вы уже голосовали!');
                    setTimeout(function(){
                        killBlock();
                    }, 3000);
                }else{
                    rating = res['rating'];
                    rate_num = res['rate_num'];
                    $("#entRating"+id).html(rating);
                    $("#entRated"+id).html(rate_num);
                    percent = (rating*100)/5;
                    $("#uCurStarRating"+id).attr("style","width: "+percent+"%;");
                    $("#uStarRating"+id).attr("title","Рейтинг: "+rating+"/"+rate_num);
                    afterRatingBlock('Оценка засчитана',rating,rate_num);
                    setTimeout(function(){
                        killBlock();
                    }, 3000);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
}

function uplusminusrating(module_id,id,mark){
    if (!usrarids[id]){
        usrarids[id]=1;
        $.ajax({
            type : 'GET',
            dataType : 'json',
            contentType: "application/json",
            url : '/index/starrating/module_id/'+module_id+'/material_id/'+id+'/mark/'+mark,
            async: false,
            success : function (res) {
                if(res == "failed"){
                    afterRatingBlock2('Вы уже голосовали!');
                    setTimeout(function(){
                        killBlock();
                    }, 3000);
                }else{
                    rating = res['rating'];
                    rate_num = res['rate_num'];
                    tmp_1 = Math.round(rating*rate_num);
                    tmp_2 = 2*rate_num;
                    tmp_3 = tmp_1 - tmp_2;                
                    $("span#rate_"+id).html(tmp_3).attr("title","Голосов: "+tmp_3);
                    afterRatingBlock2('Оценка засчитана');
                    setTimeout(function(){
                        killBlock();
                    }, 3000);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error : "+textStatus+" / "+errorThrown);
            }
        });
    }
}

function afterRatingBlock(text,rating,rate_num){
    $('body').append('<div id="after_rating_block" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: fixed;bottom: 5px;right: 5px;z-index: 2;width: 220px;">'+
        '<div class="xw-tl" unselectable="on">'+
            '<div class="xw-tr" unselectable="on">'+
                '<div class="xw-tc" unselectable="on">'+
                    '<div class="xw-sps" unselectable="on"></div>'+
                    '<div class="xw-hdr xw-draggable" style="height:5px;" unselectable="on">'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-ml" unselectable="on">'+
            '<div class="xw-mr" unselectable="on">'+
                '<div class="xw-mc" unselectable="on">'+
                    '<div class="xw-body" unselectable="on">'+
                        '<div style="overflow: hidden;" unselectable="on">'+
                            '<p style="text-align: center;"><b>'+text+'</b></p>'+
                            '<p style="text-align: center;">Рейтинг: <b>'+rating+'</b>/'+rate_num+'</p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-bl" unselectable="on">'+
            '<div class="xw-br" unselectable="on">'+
                '<div class="xw-bc" unselectable="on"></div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-blank" style="display:none" unselectable="on"></div>'+
    '</div>');
}

function afterRatingBlock2(text){
    $('body').append('<div id="after_rating_block" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: fixed;bottom: 5px;right: 5px;z-index: 2;width: 220px;">'+
        '<div class="xw-tl" unselectable="on">'+
            '<div class="xw-tr" unselectable="on">'+
                '<div class="xw-tc" unselectable="on">'+
                    '<div class="xw-sps" unselectable="on"></div>'+
                    '<div class="xw-hdr xw-draggable" style="height:5px;" unselectable="on">'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-ml" unselectable="on">'+
            '<div class="xw-mr" unselectable="on">'+
                '<div class="xw-mc" unselectable="on">'+
                    '<div class="xw-body" unselectable="on">'+
                        '<div style="overflow: hidden;" unselectable="on">'+
                            '<p style="text-align: center;"><b>'+text+'</b></p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-bl" unselectable="on">'+
            '<div class="xw-br" unselectable="on">'+
                '<div class="xw-bc" unselectable="on"></div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-blank" style="display:none" unselectable="on"></div>'+
    '</div>');
}

function popupPoolResults(pool,colours){
    var i_answer = 8;
    var i_result = 23;
    var ii = 0;
    var res_1 = '';
    var res_2 = '';
    for (i = 8; i < 23; i++) {
        if(pool[i] != ""){
            var percent = Math.round((pool[i+15] * 100) / pool[38]);
            res_1 += '<tr class="item_to_sort" sort_param="'+pool[i+15]+'"><td class="myWinPollTd"><table width="100%" cellspacing="0" cellpadding="3" border="0"><tbody><tr><td width="18" class="number" align="right"></td><td width="5%" align="center"><table cellspacing="1" cellpadding="0" border="0" bgcolor="#000000"><tbody><tr><td><div class="need_colour" style="height:10px;width:10px;background:'+colours[ii]+'"><img width="10" src="/img/1px.gif" alt=""></div></td></tr></tbody></table></td><td>'+pool[i]+'</td></tr></tbody></table></td><td width="10%" align="center" class="myWinPollTd"><b>'+pool[i+15]+'</b></td><td width="10%" align="center" class="myWinPollTd">'+percent+'%</td></tr>';
            ii++;
        }
    }
    var need_count = ii+1;
    ii = 0;
    var iii = 1;
    for (i = 23; i < 38; i++) {
        if(iii < need_count){
            var percent = Math.round((pool[i] * 100) / pool[38]);
            res_2 += '<td class="item_to_sort" sort_param="'+pool[i]+'" valign="bottom" align="center"><table width="80%" cellspacing="1" cellpadding="0" border="0" bgcolor="#000000"><tbody><tr><td class="need_colour" style="font-size:0;background:'+colours[ii]+'"><img width="1" height="'+percent+'" src="/img/1px.gif" alt=""></td></tr></tbody></table></td>';
            ii++;
            iii++;
        }
    }
    var res = '<div id="popupPoolResults" style="width: 677px;z-index: 2;left: 50%;position: fixed;margin: 0px auto;top: 50%;overflow: visible;display: block;margin-top: -85px;margin-left: -339px;" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on">'+
        '<div style="overflow: hidden; position: absolute; z-index: 30010; width: 660px; height: 207px; display: none;" class="xw-disabled" unselectable="on"></div>'+
        '<div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 closePopupPoolResults" unselectable="on"></div>'+
        '<div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Результаты опроса</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden;" unselectable="on"><div align="center" style="display: none; overflow: hidden;" class="myWinCont" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div align="center" style="overflow: auto; width: 638px; display: block; height: 100%;" class="myWinCont" unselectable="on">'+
        '<table cellpadding="0" border="0"><tbody><tr><td width="80%" valign="top"><table width="100%" cellspacing="1" cellpadding="1" border="0" class="myWinPollT"><tbody>'+
            res_1+
        '</tbody></table>'+
        '<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="50%">&nbsp;</td><td align="right">'+
        '<table cellspacing="1" cellpadding="3" border="0" class="myWinPollT"><tbody><tr><td class="myWinPollTd">Всего ответов: <b>'+pool[38]+'</b></td></tr></tbody></table>'+
        '</td></tr></tbody></table>'+
        '</td><td valign="top" align="right"><div class="myWinPollG"><table width="195" height="131" cellspacing="0" cellpadding="0" border="0"><tbody><tr>'+
            res_2+
        '</tr></tbody></table></div></td></tr></tbody></table></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div style="display:none" class="xw-blank" unselectable="on"></div>'+
        '</div>';
    $('body').append(res);
    var height_div = $('#popupPoolResults').css("height");
    height_div = Math.round(parseInt(height_div) / 2);
    $('#popupPoolResults').css("margin-top", "-"+height_div+"px");
}


function popupArchivePools(all_pools,colours){
    var res_begin = '<div id="popupArchivePools" style="width: 677px;z-index: 2;left: 50%;position: fixed;margin: 0px auto;top: 50%;overflow: visible;display: block;margin-top: -220px;margin-left: -339px;" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on"><div style="overflow: hidden; position: absolute; z-index: 30010; width: 677px; height: 441px; display: none;" class="xw-disabled" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close-opros" unselectable="on"></div><div class="xt xt-maxi" unselectable="on"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on"></div><span class="xw-hdr-text" unselectable="on" title="">Архив опросов</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 400px;" unselectable="on"><div align="center" style="display: none; overflow: hidden;" class="myWinCont" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div align="center" style="overflow: auto; width: 655px; display: block; height: 100%;" class="myWinCont" id="all_items" unselectable="on">';
    var res_end = '</div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div style="display:none" class="xw-blank" unselectable="on"></div></div>';
    var full_res = res_begin+res_end;
    $('body').append(full_res);
    var count_pools = all_pools.length;
    k = 0;
    while(k < count_pools){
        var i_answer = 8;
        var i_result = 23;
        var ii = 0;
        var res_1 = '';
        var res_2 = '';
        var pool = all_pools[k];
        for (i = 8; i < 23; i++) {
            if(pool[i] != ""){
                var percent = Math.round((pool[i+15] * 100) / pool[38]);
                res_1 += '<tr class="item_to_sort" sort_param="'+pool[i+15]+'"><td class="myWinPollTd"><table width="100%" cellspacing="0" cellpadding="3" border="0"><tbody><tr><td width="18" class="number" align="right">'+(ii+1)+'.'+'</td><td width="5%" align="center"><table cellspacing="1" cellpadding="0" border="0" bgcolor="#000000"><tbody><tr><td><div class="need_colour" style="height:10px;width:10px;background:'+colours[ii]+'"><img width="10" src="/img/1px.gif" alt=""></div></td></tr></tbody></table></td><td>'+pool[i]+'</td></tr></tbody></table></td><td width="10%" align="center" class="myWinPollTd"><b>'+pool[i+15]+'</b></td><td width="10%" align="center" class="myWinPollTd">'+percent+'%</td></tr>';
                ii++;
            }
        }
        var need_count = ii+1;
        ii = 0;
        var iii = 1;
        for (i = 23; i < 38; i++) {
            if(iii < need_count){
                var percent = Math.round((pool[i] * 100) / pool[38]);
                res_2 += '<td class="item_to_sort" sort_param="'+pool[i]+'" valign="bottom" align="center"><table width="80%" cellspacing="1" cellpadding="0" border="0" bgcolor="#000000"><tbody><tr><td class="need_colour" style="font-size:0;background:'+colours[ii]+'"><img width="1" height="'+percent+'" src="/img/1px.gif" alt=""></td></tr></tbody></table></td>';
                ii++;
                iii++;
            }
        }
        //add item to result
        
        var item = '<fieldset><legend><b>'+pool[7]+'</b></legend>'+
            '<table cellpadding="0" border="0"><tbody><tr><td width="80%" valign="top"><table width="100%" cellspacing="1" cellpadding="1" border="0" class="myWinPollT"><tbody>'+
            res_1+
            '</tbody></table><table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="50%"><table cellspacing="1" cellpadding="3" border="0" class="myWinPollT"><tbody><tr><td class="myWinPollTd">'+
                '<a style="text-decoration:none;" class="link_pool_archive" id_pool="'+pool[1]+'"  href="javascript://">Проголосовать</a></td></tr></tbody></table></td><td align="right"><table cellspacing="1" cellpadding="3" border="0" class="myWinPollT"><tbody>'+
                '<tr><td class="myWinPollTd">Всего ответов: <b>'+pool[38]+'</b></td></tr></tbody></table></td></tr></tbody></table></td><td valign="top" align="right"><div class="myWinPollG"><table width="195" height="131" cellspacing="0" cellpadding="0" border="0"><tbody><tr>'+
            res_2+
            '</tr></tbody></table></div></td></tr></tbody></table></fieldset>';
        $("#popupArchivePools #all_items").append(item);
        k++;
    } // end while
    
}


function popupPoolArchive(pool){
    var type = pool[2];
    if(type == 1){
        var type_str = "radio";
    }
    if(type == 2){
        var type_str = "checkbox";
    }
    var res = '<div id="popupPoolArchive" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: fixed; width: 280px; z-index: 2; left: 50%; overflow: visible;top: 50%;margin-left: -140px;margin-top: -75px;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 280px; height: 157px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 closePopupPoolArchive" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
    '<span class="xw-hdr-text" unselectable="on" title="">'+pool[7]+'</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; " unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 258px; display: block; height: 100%;" align="center" unselectable="on"><div align="left"><form id="plF31" onsubmit="sendPlF1();return false;">';
    var ii = 1;
    for (i = 8; i < 23; i++) {
        if(pool[i] != ""){
            res += '<div style="padding-bottom:1px;"><input id="a'+pool[1]+ii+'" type="'+type_str+'" name="answer" value="'+ii+'"> <label for="a'+pool[1]+ii+'">'+pool[i]+'</label></div>';
            ii++;
        }
    }
    res += '<table border="0"><tbody><tr><td><table border="0" cellpadding="0" cellspacing="0"><tbody><tr class="img_after_result"><td class="myBtnLeft"><img alt="" border="0" src="/img/1px.gif"></td><td class="myBtnCenter"><div class="myBtnCont x-unselectable" unselectable="on" id="subbutfrm942">'+
    '<a href="javascript://" class="pool_archive" id_pool="'+pool[1]+'">'+pool[6]+'</a></div></td>'+
    '<td class="myBtnRight"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td style="visibility:hidden;"><input type="image" src="/img/1px.gif" style="width:1px;" name="submfrm942" id="submfrm942"></td></tr></tbody></table>'+
	'</td><td id="eMsgPl1"></td></tr></tbody></table><input type="hidden" name="id" value="1"><input type="hidden" name="a" value="1"><input type="hidden" name="t" value="1"><input type="hidden" name="ssid" value=""></form></div></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div>';
    $('body').append(res);
}

function killBlock()
{
    $('#after_rating_block').remove();
    $('#popup_banned_user').remove();
}

function showFilmDontWork(one_news_id){
    $('body').append('<div id="_uwndTop1" style="display: block; position: fixed; z-index: 10004; overflow: visible; left: 50%;top: 50%;margin-left: -225px;margin-top: -150px;">'+
        '<div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 298px; display: block;"><div class="xstl"><div class="xsml"></div></div></div>'+
        '<div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 298px; left: 448px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div>'+
        '<div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 458px; top: 298px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div>'+
        '<div id="_uwndWnd1" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 450px; z-index: 2; left: 0px; overflow: visible;">'+
            '<div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 450px; height: 300px; display: none;" unselectable="on"></div>'+
            '<div class="xw-tl" unselectable="on">'+
                '<div class="xw-tr" unselectable="on">'+
                    '<div class="xw-tc" unselectable="on">'+
                        '<div class="xw-sps" unselectable="on"></div>'+
                        '<div class="xw-hdr xw-draggable" unselectable="on">'+
                            '<div class="xt xt-close xt-close2" unselectable="on"></div>'+
                            '<div class="xt xt-maxi" unselectable="on" style="display: none;"></div>'+
                            '<div class="xt xt-rest" unselectable="on" style="display: none;"></div>'+
                            '<div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
                            '<span class="xw-hdr-text" unselectable="on" title="">Сообщение об ошибке</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="xw-ml" unselectable="on">'+
                '<div class="xw-mr" unselectable="on">'+
                    '<div class="xw-mc" unselectable="on">'+
                        '<div class="xw-body" unselectable="on">'+
                            '<div style="overflow: hidden; height: 259px;" unselectable="on">'+
                                '<div class="myWinCont" style="display: none; overflow: hidden;" align="left" unselectable="on">'+
                                    '<div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div>'+
                                '</div>'+
                                    '<div class="myWinCont" style="overflow: auto; width: 428px; display: block; height: 100%;" align="left" unselectable="on">'+
                                        '<form method="post" name="badlink" id="f6F9kL" style="margin: 0pt;">'+
                                            '<table border="0" width="100%" id="table1" cellspacing="1" cellpadding="2">'+
                                            '<tbody>'+
                                                '<tr>'+
                                                    '<td>'+
                                                        '<input type="hidden" name="f1" id="one_news_id" value="'+one_news_id+'" size="30" style="width:95%;" maxlength="70">'+
                                                    '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td>Причина: </td>'+
                                                    '<td><input id="fr51" type="radio" name="f5" value="Не работает видео"> <label for="fr51">Не работает видео</label><br></td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td> </td>'+
                                                    '<td>'+
                                                        '<input id="fr71" type="radio" name="f7" value="Проблемы со звуковой дорожкой"> <label for="fr71">Проблемы со звуковой дорожкой</label><br>'+
                                                    '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td> </td>'+
                                                    '<td>'+
                                                        '<input id="fr61" type="radio" name="f6" value="Видео не соответствует описанию"> <label for="fr61">Видео не соответствует описанию</label><br>'+
                                                    '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td> </td>'+
                                                    '<td>'+
                                                        '<input id="fr81" type="radio" name="f8" value="Другое"> <label for="fr81">Другое</label><br>'+
                                                    '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td>Описание:</td>'+
                                                    '<td>'+
                                                        '<textarea rows="7" name="f3" id="f3" cols="30" style="width:95%;"></textarea>'+
                                                    '</td>'+
                                                '</tr>'+
                                            '</tbody>'+
                                            '</table>'+
                                            '<input name="f4" size="30" value="http://tushkan.net/news/realnye_pacany_3_sezon_2011_smotret_serial_onlajn/2014-09-16-1143-0-3" type="hidden">'+
                                            '<input style="display: none;" name="sbm" type="submit">'+
                                            '<input name="id" value="2" type="hidden">'+
                                            '<input name="a" value="1" type="hidden">'+
                                            '<input name="o" value="1" type="hidden">'+
                                        '</form>'+
                                        '<br>'+
                                        '<div align="center">'+
                                            '<button id="filmdontwork_button" style="color:#515151;font-family:Tahoma,Arial;font-size:8pt;vertical-align:middle;">Отправить сообщение</button>'+
                                        '</div>'+
                                    '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="xw-bl" unselectable="on">'+
                '<div class="xw-br" unselectable="on">'+
                    '<div class="xw-bc" unselectable="on"></div>'+
                '</div>'+
            '</div>'+
            '<div class="xw-blank" style="display:none" unselectable="on"></div>'+
        '</div>'+
    '</div>');
}

function showPopupCommentEdit(comment){
    $('body').append('<div id="popup_comment_edit" class="xw-plain x-unselectable xw-active" unselectable="on" style="position: fixed;width: 622px;z-index: 2;overflow: visible;top: 50%;left: 50%;margin-left: -311px;margin-top: -100px;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 622px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div>'+
        '<div id="popup_comment_edit_dad" class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 close_popup_comment_edit" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Редактирование комментария</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 600px; display: block; height: 100%;" align="center" unselectable="on"><table border="0" cellspacing="1" width="100%" cellpadding="2"><tbody><tr>'+
        '<td width="20%" align="right">Пользователь:</td><td><a><b>'+comment['user']+'</b></a> ('+comment['name']+')</td></tr>'+
        '<tr><td align="right" valign="top">Сообщение:</td><td><textarea rows="6" name="message" id="mess" cols="30" style="width:98%;">'+comment['message']+'</textarea></td></tr>'+
        '<tr><td id="eMsg835" align="right"></td><td><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="myBtnLeft"></td><td class="myBtnCenter"><div class="myBtnCont x-unselectable" unselectable="on" id="subbutipd348">'+
        '<a href="javascript://" idc="'+comment['commentID']+'" idm="'+comment['moduleID']+'" class="save_commentt">Изменить</a>'+
        '</div></td><td class="myBtnRight"></td><td style="visibility:hidden;"></td></tr></tbody></table></td></tr></tbody></table>'+
        '</div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div>'
    );
    ball = document.getElementById('popup_comment_edit');
    ball_dad = document.getElementById('popup_comment_edit_dad');
    ball_dad.onmousedown = function(e) {
    
      var coords = getCoords(ball);
      var shiftX = e.pageX - coords.left;
      var shiftY = e.pageY - coords.top;
    
      ball.style.position = 'absolute';
      ball.style.margin = '0px';
      moveAt(e);
      
      function moveAt(e) {
        ball.style.left = e.pageX - shiftX + 'px';
        ball.style.top = e.pageY - shiftY + 'px';
      }
    
      document.onmousemove = function(e) {
        moveAt(e);
      };
    
      ball_dad.onmouseup = function() {
        document.onmousemove = null;
        ball_dad.onmouseup = null;
      };
    
    }
    
    ball_dad.ondragstart = function() {
      return false;
    };
}

$(".close_popup_comment_edit").live("click",function(){
    $("#popup_comment_edit").remove();
});

function afterSendMailBlock(text){
    $('body').append('<div id="_uwndTop2" class="" style="position: fixed; z-index: 21004; overflow: visible; left: 50%;top: 50%;margin-left: -175px;margin-top: -75px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 148px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 148px; left: 348px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 358px; top: 148px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd2" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 350px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="display: none; overflow: hidden; position: absolute; z-index: 30010; width: 350px; height: 150px;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on">'+
    '<div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2" onclick="close_after_mail();" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Сообщение отправлено</span></div></div></div></div><div class="xw-ml" unselectable="on" style="display: block;"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 109px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 328px; display: block; height: 100%;" align="center" unselectable="on"><b>Спасибо.</b><br><br>'+text+'<br><br><br>[ <a href="javascript://" onclick="close_after_mail();"><b>Закрыть окно</b></a> ]</div></div></div></div></div></div><div class="xw-bl" unselectable="on" style="display: block;"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="width: 350px; height: 125px; display: none;" unselectable="on"></div></div></div>');
}

function close_after_mail(){
    $("#_uwndTop2").remove();
    $('#_uwndTop1').remove();
}

$(".answer_com").live("click",function(){
    var parent_id = $(this).attr("c_comment_id");
    var username = $(this).attr("username");
    var date = $(this).attr("date");
    $.ajax({
        type : 'GET',
        dataType : 'json',
        contentType: "application/json",
        url : '/index/checkuser',
        async: false,
        success : function (res) {
            if(res.status_user == "banned"){
                popupBannedUser();
                setTimeout(function(){
                    killBlock();
                }, 3000);
            }else{
                $("#popup_answer_comment").remove();
                popupAnswerComment(parent_id,username,date);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error : "+textStatus+" / "+errorThrown);
        }
    });
});

$(".answer_com_add").live("click",function(){
    var message = $("#message2").val();
    var user_id = $("#c_user_id").val();
    var material_id = $("#c_material_id").val();
    var module_id = $("#c_module_id").val();
    var parent_id = $(this).attr("c_comment_id");
    $.post('/index/newcomment/', {user_id:user_id,material_id:material_id,module_id:module_id,message:message,parent_id:parent_id}, function(e){
        var ansWrap = $('<div class="comment-wrp comment-wrp-'+parent_id+'">' +
            '<div id="comAns'+e.id+'" class="data"></div>' +
            '<div id="childs'+e.id+'" class="child"></div></div>');

        if($('#appEntry' + parent_id).length > 0) {
            ansWrap.insertAfter('#appEntry' + parent_id);
        } else {
            $('#childs' + parent_id).append(ansWrap);
        }
        ajaxAddComment(parent_id, e.message, e.user, e.date, e.avatar, e.user_id, e.id);
        $('.close_popup_answer_comment').trigger('click');
        //location.reload();
    })
    
});

var maxComNum = 0;
function ajaxAddComment(parent_id, message, user, date, avatar, user_id, id) {
    $('#eMessage').hide();
    var idAppend = '#' + (parent_id == 0 ? 'allEntries' : 'comAns' + id);
    var comment = $('.comEnt').first().clone();
    $(idAppend).prepend(comment);
    comment.hide();
    //comment = $(idAppend).find('.comEnt').first();
    comment.attr('id', 'comEnt' + id).attr('comment_id', id);
    comment.find('[itemprop=commentText]').html(message);
    comment.find('[itemprop=name]').text(user);
    comment.find('.cdt').text(date);
    comment.find('.deletecomment, .editcomment, .finger_down_green, .finger_up_green').attr('comment_id', id);
    comment.find('a.open_user_page').attr('user_id', user_id);
    comment.find('a.answer_com').attr('c_comment_id', id).attr('date', date).attr('username', user);
    comment.find('.ratio b').html('0');
    comment.find('.ratio').css('color', 'gray');
    //comment.find('.myWinSuccess b, .comment_rate, .deletecomment, .editcomment').remove();
    //comment.find('.answer_com').parent().remove();
    comment.find('.cMessage img').eq(0).attr('src', avatar);
    if(avatar != '') {
        comment.find('.cMessage img').show();
    }
    maxComNum = (maxComNum == 0 ? parseInt(comment.find('.cTop a').eq(0).find('b').html()) : maxComNum) + 1;
    comment.find('.cTop a').eq(0).find('b').html(maxComNum);
    comment.slideDown();
    return comment;
}

function popupAnswerComment(parent_id,username,date){
    $('body').append('<div id="popup_answer_comment" style="position: fixed; z-index: 10012; overflow: visible;   left: 50%;top: 50%;margin-left: -286px;margin-top: -141px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 281px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 281px; left: 570px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 580px; top: 281px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div>'+
    '<div id="_uwndWnd2" class="xw-plain x-unselectable xw-active" unselectable="on" style="position: absolute; width: 572px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 572px; height: 283px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div>'+
    '<div id="popup_answer_comment_dad" class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 close_popup_answer_comment" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Добавить комментарий</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 242px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 550px; display: block; height: 100%;" align="center" unselectable="on"><div align="left">'+
    '<form id="frm235" onsubmit="sendFrm235();  return false;">'+
    '<fieldset><legend><b>Комментарий от:</b></legend><table border="0" cellpadding="2" cellspacing="1" width="100%"><tbody><tr><td width="50%"><b>'+username+'</b> &nbsp; <span style="unicode-bidi:embed;">['+date+']</span></td><td align="right"><select name="subs"><option value="0">Без подписки</option><option value="1">Все комментарии к материалу</option><option value="2" selected="">Ответы на мой комментарий</option></select></td></tr></tbody></table></fieldset>'+
    '<fieldset><legend><b>Сообщение</b></legend>'+
    
    '<span style="padding-right:1px;" id="bc1"><input type="button" title="Bold" onclick="simpletag(\'b\',\'\',\'\',\'message2\',\'\')" value="b" class="codeButtons" id="b3" style="width:20px;font-weight:bold"></span>'+
    '<span style="padding-right:1px;" id="bc2"><input type="button" title="Italic" onclick="simpletag(\'i\',\'\',\'\',\'message2\',\'\')" value="i" class="codeButtons" id="i3" style="width:20px;font-style:italic"></span>'+
    '<span style="padding-right:1px;" id="bc3"><input type="button" title="Underline" onclick="simpletag(\'u\',\'\',\'\',\'message2\',\'\')" value="u" class="codeButtons" id="u3" style="width:20px;text-decoration:underline"></span>'+
    '<span style="padding-right:1px;" id="bc4"><select id="fsize3" onchange="alterfont(this.options[this.selectedIndex].value,\'size\',\'message2\',\'\');this.selectedIndex=0;" class="codeButtons"><option value="0">SIZE</option><option value="6">6 pt</option><option value="7">7 pt</option><option value="8">8 pt</option><option value="9">9 pt</option><option value="10">10 pt</option><option value="11">11 pt</option><option value="12">12 pt</option><option value="13">13 pt</option><option value="14">14 pt</option><option value="15">15 pt</option><option value="16">16 pt</option><option value="17">17 pt</option><option value="18">18 pt</option><option value="19">19 pt</option><option value="20">20 pt</option><option value="21">21 pt</option><option value="22">22 pt</option></select></span>'+
    '<span style="padding-right:1px;" id="bc6"><select id="fcolor3" onchange="alterfont(this.options[this.selectedIndex].value, \'color\',\'message2\',\'\');this.selectedIndex=0;" class="codeButtons"><option value="0">COLOR</option><option value="blue" style="color:blue">Blue</option><option value="red" style="color:red">Red</option><option value="purple" style="color:purple">Purple</option><option value="orange" style="color:orange">Orange</option><option value="yellow" style="color:yellow">Yellow</option><option value="gray" style="color:gray">Gray</option><option value="green" style="color:green">Green</option></select></span>'+
    '<span style="padding-right:1px;" id="bc7"><input type="button" title="URL" onclick="tag_url(\'message2\',\'\')" value="http://" class="codeButtons" style="direction:ltr;width:45px;" id="url3"></span>'+
    '<span style="padding-right:1px;" id="bc8"><input type="button" title="E-mail" onclick="tag_email(\'message2\',\'\')" value="@" class="codeButtons" style="width:30px;" id="email3"></span>'+
    '<span style="padding-right:1px;" id="bc9"><input type="button" title="Image" onclick="tag_image(\'message2\',\'\')" value="img" class="codeButtons" style="width:35px;" id="img3"></span>'+
    '<span style="padding-right:1px;" id="bc18"><input type="button" title="Hide from Guest" onclick="simpletag(\'hide\',\'\',\'\',\'message2\',\'\')" value="hide" class="codeButtons" style="width:40px;" id="hide3"></span>'+
    '<span style="padding-right:1px;" id="bc12"><input type="button" title="List" onclick="tag_list(\'message2\',\'\')" value="list" class="codeButtons" id="list3" style="width:30px;"></span>'+
    '<span style="padding-right:1px;" id="bc13"><input type="button" title="Left" onclick="simpletag(\'l\',\'cdl\',\'···\',\'message2\')" style="width:20px;text-align:left;" value="···" class="codeButtons" id="cdl3"></span>'+
    '<span style="padding-right:1px;" id="bc14"><input type="button" title="Center" onclick="simpletag(\'c\',\'cdc\',\'···\',\'message2\')" style="width:20px;text-align:center;" value="···" class="codeButtons" id="cdc3"></span>'+
    '<span style="padding-right:1px;" id="bc15"><input type="button" title="Right" onclick="simpletag(\'r\',\'cdr\',\'···\',\'message2\')" style="width:20px;text-align:right;" value="···" class="codeButtons" id="cdr3"></span>'+
    '<span style="padding-right:1px;" id="bc16"><input type="button" title="All codes" onclick="window.open(\'/index/showbbcodes\',\'bbcodes\',\'scrollbars=1,width=550,height=450,left=0,top=0\');" style="width:60px;" value="All codes" class="codeButtons"></span>'+
    '<span style="padding-right:1px;" id="bc17"><input style="font-weight:bold;width:20px" type="button" onclick="closeall(\'message2\',\'\');" value="/" class="codeButtons codeCloseAll" title="Close all opened codes"></span><input type="hidden" id="tagcount3" value="0">'+
    
    '<table border="0" cellpadding="1" cellspacing="0" width="100%"><tbody><tr><td valign="top"><textarea style="width:100%;height:115px;" id="message2" name="message2"></textarea></td><td valign="top" width="1%" nowrap="nowrap">'+
    
    '<table border="0" cellpadding="2" class="smiles"><tbody>'+
    '<tr><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\'>(\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/angry.gif" title="angry"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\':D\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/biggrin.gif" title="biggrin"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\'B)\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/cool.gif" title="cool"></a></td></tr><tr><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\':\\\'(\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/cry.gif" title="cry"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\'<_<\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/dry.gif" title="dry"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\'^_^\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/happy.gif" title="happy"></a></td></tr>'+
    '<tr><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\':(\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/sad.gif" title="sad"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\':)\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/smile.gif" title="smile"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\':o\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/surprised.gif" title="surprised"></a></td></tr><tr><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\':p\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/tongue.gif" title="tongue"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\'%)\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/wacko.gif" title="wacko"></a></td><td class="sml1" align="center"><a href="javascript://" rel="nofollow" onclick="emoticon(\';)\',\'message2\');return false;"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/wink.gif" title="wink"></a></td></tr><tr id="asmltrSoVNa" style="display: none;">'+
    '<td colspan="3" align="center" id="allSmiles" nowrap=""><a href="javascript://" rel="nofollow">Все смайлы</a></td></tr></tbody></table>'+
    
    
    '</td></tr></tbody></table>'+
    '</fieldset>'+
    
    '<fieldset style="margin-top:5px;"><table border="0" cellpadding="2" cellspacing="0" width="100%"><tbody><tr><td id="msg235">&nbsp;</td><td width="5%" nowrap="nowrap">'+
    '<table border="0" cellpadding="0" cellspacing="0">'+
    '<tbody><tr>'+
    '<td class="myBtnLeft"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td class="myBtnCenter"><div class="myBtnCont x-unselectable" unselectable="on" id="subbutfrm235">'+
    '<a href="javascript://" class="answer_com_add" c_comment_id="'+parent_id+'">Добавить</a></div></td>'+
    '<td class="myBtnRight"><img alt="" border="0" src="/img/1px.gif"></td>'+
    '<td style="visibility:hidden;"><input type="image" src="/img/ma/1px.gif" style="width:1px;" name="submfrm235" id="submfrm235"></td>'+
    '</tr>'+
    '</tbody></table>'+
    	'</td></tr></tbody></table></fieldset>'+
    '<input type="hidden" name="ssid" value="Htp7Wdkw"><input type="hidden" name="a" value="36"><input type="hidden" name="pid" value="286153"><input type="hidden" name="sos" value="4149968531" id="dkdjfi38">'+
    '<input id="csoc_type" type="hidden" name="soc_type" value="0"><input id="cdata" type="hidden" name="data" value="">'+
    '</form>'+
    '</div></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>');
    ball = document.getElementById('popup_answer_comment');
    ball_dad = document.getElementById('popup_answer_comment_dad');
    
    ball_dad.onmousedown = function(e) {
    
      var coords = getCoords(ball);
      var shiftX = e.pageX - coords.left;
      var shiftY = e.pageY - coords.top;
    
      ball.style.position = 'absolute';
      ball.style.margin = '0px';
      moveAt(e);
      
      function moveAt(e) {
        ball.style.left = e.pageX - shiftX + 'px';
        ball.style.top = e.pageY - shiftY + 'px';
      }
    
      document.onmousemove = function(e) {
        moveAt(e);
      };
    
      ball_dad.onmouseup = function() {
        document.onmousemove = null;
        ball_dad.onmouseup = null;
      };
    
    }
    
    ball_dad.ondragstart = function() {
      return false;
    };
}

function getCoords(elem) {
  // (1)
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  // (2)
  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  // (3)
  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  // (4)
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return {
    top: top,
    left: left
  };
}

$(".close_popup_answer_comment").live("click",function(){
    $("#popup_answer_comment").remove();
});

function popupSmiles(smiles){
    $('body').append('<div id="popupSmiles" style="position: fixed; z-index: 10004; overflow: visible; left: 50%;top: 50%;margin-left: -136px;margin-top: -195px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 389px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 389px; left: 270px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 280px; top: 389px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd1" class="xw-plain x-unselectable xw-active" unselectable="on" style="position: absolute; width: 272px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 272px; height: 391px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div>'+
    '<div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 close_popup_smiles" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Полный список смайлов</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 350px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow-y: auto; width: 250px; display: block; height: 100%;" align="center" unselectable="on">'+
    '<table id="popupSmilesTable" border="0" cellspacing="0" style="width:100%" cellpadding="2">'+
    '</table></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>');
    i=0;
    while(i<smiles.length){
        $("#popupSmilesTable").append('<tr class="smile_to_add" smile="'+smiles[i].name_file+'" style="cursor:pointer;"><td class="myWinTD1" width="40%" align="center" style="max-width:80px;">'+smiles[i].name_sml+'</td><td class="myWinTD1" align="center"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/'+smiles[i].name_file+'" title="wacko"></td></tr>');
        i++;
    }
}
function popupSmilesComments(smiles){
    $('body').append('<div id="popupSmilesComments" style="position: fixed; z-index: 10004; overflow: visible; left: 50%;top: 50%;margin-left: -136px;margin-top: -195px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 389px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 389px; left: 270px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 280px; top: 389px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd1" class="xw-plain x-unselectable xw-active" unselectable="on" style="position: absolute; width: 272px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 272px; height: 391px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div>'+
    '<div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 close_popup_smiles_comments" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Полный список смайлов</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 350px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow-y: auto; width: 250px; display: block; height: 100%;" align="center" unselectable="on">'+
    '<table id="popupSmilesTableComments" border="0" cellspacing="0" style="width:100%" cellpadding="2">'+
    '</table></div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div></div>');
    i=0;
    while(i<smiles.length){
        $("#popupSmilesTableComments").append('<tr class="smile_to_add_comments" smile="'+smiles[i].name_file+'" style="cursor:pointer;"><td class="myWinTD1" width="40%" align="center" style="max-width:80px;">'+smiles[i].name_sml+'</td><td class="myWinTD1" align="center"><img alt="" style="margin:0;padding:0;border:0;" src="/sml/'+smiles[i].name_file+'" title="wacko"></td></tr>');
        i++;
    }
}
$(".close_popup_smiles").live("click",function(){
    $("#popupSmiles").remove();
});
$(".close_popup_smiles_comments").live("click",function(){
    $("#popupSmilesComments").remove();
});

//smile_to_add

function showPopupChatMessageEdit(message){
    $('body').append('<div id="popup_chat_message_edit" class="xw-plain x-unselectable xw-active" unselectable="on" style="position: fixed;width: 622px;z-index: 2;overflow: visible;top: 50%;left: 50%;margin-left: -311px;margin-top: -100px;"><div class="xw-disabled" style="overflow: hidden; position: absolute; z-index: 30010; width: 622px; display: none;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on"><div class="xt xt-close xt-close2 close_popup_chat_message_edit" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div><span class="xw-hdr-text" unselectable="on" title="">Редактирование комментария</span></div></div></div></div><div class="xw-ml" unselectable="on"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 600px; display: block; height: 100%;" align="center" unselectable="on"><table border="0" cellspacing="1" width="100%" cellpadding="2"><tbody><tr>'+
        '<td width="20%" align="right">Пользователь:</td><td><a><b>'+message['username']+'</b></a> ('+message['username']+')</td></tr>'+
        '<tr><td align="right" valign="top">Сообщение:</td><td><textarea rows="6" name="message" id="mess" cols="30" style="width:98%;">'+message['message']+'</textarea></td></tr>'+
        '<tr><td id="eMsg835" align="right"></td><td><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="myBtnLeft"></td><td class="myBtnCenter"><div class="myBtnCont x-unselectable" unselectable="on" id="subbutipd348">'+
        '<a href="javascript://" idm="'+message['id']+'" class="save_chat_message">Изменить</a>'+
        '</div></td><td class="myBtnRight"></td><td style="visibility:hidden;"></td></tr></tbody></table></td></tr></tbody></table>'+
        '</div></div></div></div></div></div><div class="xw-bl" unselectable="on"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="display:none" unselectable="on"></div></div>'
    );
}

$(".close_popup_chat_message_edit").live("click",function(){
    $("#popup_chat_message_edit").remove();
});

function popupBannedUser(){
    var text = 'Для вашего аккаунта любая активность временно заблокирована';
    $('body').append('<div id="popup_banned_user" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: fixed;bottom: 5px;right: 5px;z-index: 2;width: 220px;">'+
        '<div class="xw-tl" unselectable="on">'+
            '<div class="xw-tr" unselectable="on">'+
                '<div class="xw-tc" unselectable="on">'+
                    '<div class="xw-sps" unselectable="on"></div>'+
                    '<div class="xw-hdr xw-draggable" style="height:5px;" unselectable="on">'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-ml" unselectable="on">'+
            '<div class="xw-mr" unselectable="on">'+
                '<div class="xw-mc" unselectable="on">'+
                    '<div class="xw-body" unselectable="on">'+
                        '<div style="overflow: hidden;" unselectable="on">'+
                            '<p style="text-align: center;color:red;"><b>'+text+'</b></p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-bl" unselectable="on">'+
            '<div class="xw-br" unselectable="on">'+
                '<div class="xw-bc" unselectable="on"></div>'+
            '</div>'+
        '</div>'+
        '<div class="xw-blank" style="display:none" unselectable="on"></div>'+
    '</div>');
}

function emoticon(code,nm){if (code != ""){var txtarea=document.getElementById(nm);code = ' ' + code + ' ';if (document.selection) {txtarea.focus();var txtContent = txtarea.value;var str = document.selection.createRange();if (str.text == ""){str.text = code;} else if (txtContent.indexOf(str.text) != -1){str.text = code + str.text;} else {txtarea.value = txtContent + code;}}else{txtarea.value = txtarea.value + code;}}}

function afterRemindBlock(text){
    $('body').append('<div id="after_remind_block" class="" style="position: fixed; z-index: 21004; overflow: visible; left: 50%;top: 50%;margin-left: -175px;margin-top: -75px;"><div class="x-sh xsl" style="position: absolute; z-index: 1; width: 6px; left: -4px; top: 0px; height: 148px; display: block;"><div class="xstl"><div class="xsml"></div></div></div><div class="x-sh xsr" style="position: absolute; z-index: 1; width: 6px; top: 0px; height: 148px; left: 348px; display: block;"><div class="xstr"><div class="xsmr"></div></div></div><div class="x-sh xsb" style="position: absolute; z-index: 1; height: 6px; left: -4px; width: 358px; top: 148px; display: block;"><div class="xsbl"><div class="xsbr"><div class="xsbc"></div></div></div></div><div id="_uwndWnd2" class="xw-plain x-unselectable xw-resize xw-active" unselectable="on" style="position: absolute; width: 350px; z-index: 2; left: 0px; overflow: visible;"><div class="xw-disabled" style="display: none; overflow: hidden; position: absolute; z-index: 30010; width: 350px; height: 150px;" unselectable="on"></div><div class="xw-tl" unselectable="on"><div class="xw-tr" unselectable="on"><div class="xw-tc" unselectable="on"><div class="xw-sps" unselectable="on"></div><div class="xw-hdr xw-draggable" unselectable="on">'+
        '<div class="xt xt-close xt-close2 close_after_remind_block" unselectable="on"></div><div class="xt xt-maxi" unselectable="on" style="display: none;"></div><div class="xt xt-rest" unselectable="on" style="display: none;"></div><div class="xt xt-mini" unselectable="on" style="display: none;"></div>'+
        '<span class="xw-hdr-text" unselectable="on" title="">Уведомление</span></div></div></div></div><div class="xw-ml" unselectable="on" style="display: block;"><div class="xw-mr" unselectable="on"><div class="xw-mc" unselectable="on"><div class="xw-body" unselectable="on"><div style="overflow: hidden; height: 109px;" unselectable="on"><div class="myWinCont" style="display: none; overflow: hidden;" align="center" unselectable="on"><div align="left" unselectable="on"><div class="myWinLoad" unselectable="on"></div></div></div><div class="myWinCont" style="overflow: auto; width: 328px; display: block; height: 100%;" align="center" unselectable="on">'+
        '<br><b>'+text+'</b><br><br>[ <a href="javascript://" class="close_after_remind_block"><b>Закрыть окно</b></a> ]</div></div></div></div></div></div><div class="xw-bl" unselectable="on" style="display: block;"><div class="xw-br" unselectable="on"><div class="xw-bc" unselectable="on"></div></div></div><div class="xw-blank" style="width: 350px; height: 125px; display: none;" unselectable="on"></div></div></div>');
}

$('.close_after_remind_block').live("click",function(){
    $("#after_remind_block").remove();
})

// BANNERS

var banners = [];
//var test_banners = [];
//var counter = 0;
function getbanner(el_id){
    var arr_banners = [];
    count_banners = banners.length;
    i = 0;
    while(i < count_banners){
        for(k=0;k < banners[i].priority;k++){
            arr_banners.push(banners[i].code);
        }
        i++;
    }
    var item = arr_banners[Math.floor(Math.random()*arr_banners.length)];
    //test_banners[counter] = {"el_id" : el_id, "code": item};
    //counter++;
    //console.log(item);
    //document.write(item);
    if(el_id == 'banner_left_center'){
        document.write(item);
    }else{
        $(document).ready(function(){ $("#"+el_id).append(item); });
    }
    //$('body').live("load",function(){ $("#"+el_id).append(item); });
    //var el = document.getElementById('banner_left_top');
    //el.innerHTML = '<div id=\'bn_6b4ffe039a\'>загрузка...</div> <script type=\'text/javascript\' src=\'http://recreativ.ru/rcode.6b4ffe039a.js\'></script>';
}


// BANNERS end


var calendarUtil = {

	// Возвращат количество дней в месяце по конкретному году		
	getDaysInMonth: function(m, y) {
		var days = [31, (y % 4 == 0 && y % 100 != 0 || y % 400 == 0)?29:28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		return days[m-1];
	},
	
	displayAvailableDays: function(daySelector, monthSelector, yearSelector){	
		var monthNum = parseInt($(monthSelector).val());
		if(monthNum && parseInt($(yearSelector).val())){					
			var days_in_month = this.getDaysInMonth(monthNum, $(yearSelector).val());	
			var diff = $(daySelector + ' option').size() - 32;									
			var indx = days_in_month + diff;		

			$(daySelector + ' option').slice(0, indx + 1).removeClass('hidden-for-calendar');
			$(daySelector + ' option').slice(indx + 1).addClass('hidden-for-calendar');					
			if(parseInt($(daySelector).val()) > days_in_month) {
				$(daySelector).val(days_in_month);
			}
		} else {
			$('option',daySelector).slice(0, indx).removeClass('hidden-for-calendar');
		}		
	},

	setAvailableDays: function(daySelector, monthSelector, yearSelector){
		var $this = this;				
		$this.displayAvailableDays(daySelector, monthSelector, yearSelector);					
		$("select").filter(monthSelector +','+ yearSelector).on('change',(function(){				
			$this.displayAvailableDays(daySelector, monthSelector, yearSelector);					
		}));
	}
}

function orderDescRemove(id) {
    if(!confirm('Удалить данную завяку?')) {
        return;
    }
    $.ajax({
        type: 'post', data: { id: id, act: 'remove' }, url: '/index/ajaxorderdesc',
        success: function(a) {
            if(a != '') {
                alert(a);
            } else {
                $('#orderdesc-'+id).remove();
            }
        }
    });
}

function orderDescSetLink(id) {
    var link = prompt('Введите ссылку на фильм');
    if(link == null) {
        return;
    }
    $.ajax({
        type: 'post', data: { id: id, act: 'edit', link: link }, url: '/index/ajaxorderdesc',
        success: function(a) {
            if(a != '') {
                alert(a);
            } else {
                var title = $('#orderdesc-'+id+' .link').html();
                $('#orderdesc-'+id+' .link').html('<a href="'+link+'">' + title + '</a>');
            }
        }
    });
}

function voteForOrderDesc(id, obj) {
    var $obj = $(obj), now = $obj.data('now');
    $.ajax({
        type: 'post', data: { id: id, act: 'vote' }, url: '/index/ajaxorderdesc',
        success: function(a) {
            if(a != '') {
                alert(a);
            } else {
                $obj.parent().html(now + 1);
            }
        }
    });
}