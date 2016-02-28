;var brandingConfig = [{
	btnUrl: 'img/branding_00_btn.png',
	btnOverUrl: 'img/branding_00_btn_over.png'
}, {
	swfUrlStr: 'swf/branding_01.swf'
}, {
	btnUrl: 'img/branding_02_btn.png',
	btnOverUrl: 'img/branding_02_btn_over.png'
}, {
	btnUrl: 'img/branding_03_btn.png',
	btnOverUrl: 'img/branding_03_btn_over.png'
}];


/* Modernizr */
window.Modernizr=function(a,b,c){function w(a){i.cssText=a}function x(a,b){return w(prefixes.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b){for(var d in a){var e=a[d];if(!z(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}function C(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+m.join(d+" ")+d).split(" ");return y(b,"string")||y(b,"undefined")?A(e,b):(e=(a+" "+n.join(d+" ")+d).split(" "),B(e,b,c))}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l="Webkit Moz O ms",m=l.split(" "),n=l.toLowerCase().split(" "),o={},p={},q={},r=[],s=r.slice,t,u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e}),o.cssanimations=function(){return C("animationName")};for(var D in o)v(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),h=j=null,e._version=d,e._domPrefixes=n,e._cssomPrefixes=m,e.testProp=function(a){return A([a])},e.testAllProps=C,e}(this,this.document);
/* Workflow */
(function(){
	var config = {
		prefix: 'tushkanBranding',
		updatePeriod: 1,
		elements: [
			{id: 'branding_00', landingUrl: 'http://luckiestclick.com/goto.php?aid=tushkan&sid=rbrandvlk', imgParams: brandingConfig[0]},
			{id: 'branding_01', landingUrl: 'http://luckiestclick.com/goto.php?aid=tushkan&sid=rbrandgam', flashParams: {swfUrlStr: brandingConfig[1].swfUrlStr}},
			{id: 'branding_02', landingUrl: 'http://luckiestclick.com/goto.php?aid=tushkan&sid=rbrandcsx', imgParams: brandingConfig[2]},
			{id: 'branding_03', landingUrl: 'http://luckiestclick.com/goto.php?aid=tushkan&sid=rbranddjk', imgParams: brandingConfig[3]}
		]
	};
	function setCookie(k, v, d) {
		var t = new Date(), e = new Date();
		if (d == null || d == 0) {d = 1;}
		e.setTime(t.getTime() + 3600000 * 24 * d);
		document.cookie = k + "=" + encodeURIComponent(v) + ";expires=" + e.toGMTString();
	}
	function getCookie(k) {
		var c = " " + document.cookie, s = c.indexOf(" " + k + "=");
		if (s == -1) { s = c.indexOf(";" + k + "="); }
		if (s == -1 || k == "") { return false; }
		var e = c.indexOf(";", s + 1);
		if (e == -1) { e = c.length; }
		return decodeURIComponent(c.substring(s + k.length + 2, e));
	}
	var val = 0, period = (config.updatePeriod) ? config.updatePeriod : 1, amount = config.elements.length * period - 1;
	if (navigator.cookieEnabled) {
		val = parseInt(getCookie(config.prefix));
		if (isNaN(val)){val = 0;} else {val = (val >= amount) ? 0 : (val + 1);}
		setCookie(config.prefix, val, 7);
		val = (config.updatePeriod) ? Math.floor(val / config.updatePeriod) : val;
	}
	function appendScript(url, callback) {
		var head = document.getElementsByTagName('head')[0], script = document.createElement('script');
		script.src = url;
		head.appendChild(script);
		script.onload = script.onerror = function() {if (!this.executed) {this.executed = true;callback();}};
		script.onreadystatechange = function() {
			var self = this;
			if (this.readyState == 'complete' || this.readyState == 'loaded') {setTimeout(function() {self.onload();}, 0);}
		};
	}
	if (typeof jQuery == 'undefined') {appendScript('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', run);} else {run();}
	function run() {
		var $ = jQuery,
			el = config.elements[val],
			well = $('#branding_block'),
			link = $('<a/>').attr({'id': 'branding_block_link','class': el.id,'href': el.landingUrl,'target': '_blank'}).appendTo(well),
			ua = navigator.userAgent;
		if (el.imgParams) {
			var btn = $('<img/>').attr({'id': 'branding_block_btn', 'src': el.imgParams.btnUrl}).appendTo(link),
				btnOver = $('<img/>').attr({'id': 'branding_block_btn_over', 'src': el.imgParams.btnOverUrl}).appendTo(link);
			if (ua.match(/Opera/i) || !Modernizr.cssanimations) {
				if (navigator.appName == 'Microsoft Internet Explorer') {
					var re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
					if (re.exec(ua) != null) {
						var ie = parseFloat(RegExp.$1);
						if ((ie > 7) && (ie < 9)) {btnOver.addClass('ie8').css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=' + el.imgParams.btnOverUrl + ') alpha(opacity=100)');} else if (ie < 7.0) {well.addClass('ie6');}
					}
				}
				$(function(){
					var stop = false;
					function blinking(){
						if (!stop) {btnOver.animate({opacity: 0}, 700).delay(500).animate({opacity: 0.99}, 800);setTimeout(blinking, 2000);}
					}
					blinking();
					btnOver.bind({
						mouseenter: function() {btnOver.stop(true, false).animate({opacity: 0.99}, 200);stop = true;},
						mouseleave: function() {stop = false;blinking();}
					});
				});
			} else {btnOver.addClass('css3animated');}
		} else if (el.flashParams) {
			var flashId = 'branding_swf', swf = $('<div/>').attr({'id': flashId}).appendTo(well);
			appendScript('http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js', function() {
				swfobject.embedSWF(el.flashParams.swfUrlStr, flashId, 350, 350, '9.0.0', 'false', {}, {wmode: 'transparent', allowScriptAccess: 'always', flashvars: 'clickTAG=' + encodeURIComponent(el.landingUrl)}, {id: flashId});
			});
		}
	}
})();