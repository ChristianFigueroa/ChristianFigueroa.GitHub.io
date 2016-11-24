! function() {
	"use strict";
	var r = null,
		s = window,
		t = document,
		u = Object,
		v = String.prototype,
		w = HTMLCollection.prototype,
		x = HTMLElement.prototype,
		y = NodeList.prototype,
		z = Node.prototype,
		f=function($){return $};
	w.forEach = y.forEach = function(a) {
		Array.prototype.forEach.call(this, function(b, c, d) {
			a.call(b, b, c, d)
		})
	};
	w.loop = y.loop = function(a, b) {
		b = b || [];
		for (var i = 0, l = this.length; i < l; i++) {
			var d = a.apply(this[i], b.concat([i, this]));
			if (d !== undefined) return d
		}
	};
	x.ael = z.ael = function(a, b) {
		var c = this;
		a.forEach(function(d) {
			c.addEventListener(d, b)
		})
	};
	x.css = z.css = function(a) {
		for (var b in a) {
			this.style[b] = a[b]
		}
	};
	x.interval = z.interval = function(a, b, c, d, h) {
		var e = this,
			f = 0,
			d = d || [],
			g;
		if (!c && c != 0) {
			g = setInterval(function() {
				if (f != r) {
					a.apply(e, d.concat([f, function() {
						f = r
					}]));
					if (f != r) f++
				} else clearInterval(g)
			}, b || 100)
		} else if (c) {
			g = setInterval(function() {
				if (f != r) a.apply(e, d.concat([f, function() {
					f = r
				}]));
				else f = c - 1;
				if (f != r) f++;
				if (f == c) {
					clearInterval(g);
					h ? h.call(e) : 0
				}
			}, b || 100)
		} else {
			h ? h.call(e) : 0;
			return
		}
	};
	u.defineProperty(Element.prototype, 'rect', {
		get: function() {
			return this.getBoundingClientRect()
		}
	});
	v.unescape = function() {
		var a = t.createElement('a');
		a.innerHTML = this.toString();
		return a.innerText
	};
	v.escape = function() {
		var a = t.createElement('a');
		a.innerText = this.toString();
		return a.innerHTML
	};
	s.$$ = function querySelector(a) {
		return t.querySelector(a)
	};
	s.$id = function getElementById(a) {
		return t.getElementById(a)
	};
	if (s.$) {
		s.$_ = function querySelectorAll(a) {
			return t.querySelectorAll(a)
		}
	} else {
		s.$ = function querySelectorAll(a) {
			return t.querySelectorAll(a)
		}
	};
	String.parse=f=function(g){
		try{
			if(/^("|').*\1$/.test(g))return g.slice(1,-1).replace(new RegExp('\\\\'+g[0],'g'),g[0]);
			if(+g||g=='NaN'||g=='0')return+g;
			if(g in{true:0,false:0})return g=='true';
			if(g in{undefined:0,null:0})return'undefined'==g?({}).a:null;
			if(/^\/.+\/(?:g(?:im?|mi?)?|i(?:mg?|gm?)?|m(?:gi?|ig?)?)?$/.test(g))try{var a=g.match(/^\/(.+)\/(g(?:im?|mi?)?|i(?:mg?|gm?)?|m(?:gi?|ig?)?)?$/);return new RegExp(a[1],a[2])}catch(_){return g};
			var m=/^{(?:}|(?:\s*(?:("|').*?\1|[^:"'{},][^:,]*):\s*(?:(?={)|(?=\[)|("|').*?\2,|(?:[^,"'}][^,}]*?|),))*\s*(?:(?={)|(?=\[)|(?:("|').*?\3|[^:"'},][^:,]*):\s*(?:(?={)|(?=\[)|("|').*?\4}|(?:[^,"'][^,]*?|)})))/g,q=/^\[(?:]|(?:\s*(?:(?=\[)|(?={)|("|').*?\1,|[^"',][^,]*,))*?\s*(?:(?=\[)|(?={)|(?:("|').*?\2]|[^"',][^,]*])))/g
			if(/^\[.+]$/.test(g)){
				g=g.slice(1,-1).trim();
				var h=[];
				(function i(){
					if(~g.indexOf(',')){
						var j,k;
						if(g[0]=='"'||g[0]=="'")g.match(new RegExp('^'+g[0]+'(?:|(?:.(?!'+g[0]+')(?:\\\\'+g[0]+')?|(?:\\\\'+g[0]+'))*[^'+g[0]+'\\\\\\n]?)'+g[0]+'(?=\\s*,|\\s*$)')),k;
						if(j){
							h.push(j[0].slice(1,-1));
							g=g.substring(j[0].length+1);
							if(g)i();
						}else if((g[0]=='['||g[0]=='{')&&(function(){
							function n(o,p,h,k){
								(p?q:m).exec(o);

								k=(p?q:m).lastIndex;
								(p?q:m).lastIndex=0;
								if(!k)return!1;
								if(!(o.substring(k)[0]=='{'||o.substring(k)[0]=='{'))return k;
								h=n(o.substring(k),o.substring(k)[0]=='[');
								if(!h)return!1;
								return n(o.substring(0,k)+1+o.substring(k+h),o[0]=='[');
							}
							return n(g,g[0]=='[');
						})()){
							var n=function(o,p,h,k){
								(p?q:m).exec(o);
								k=(p?q:m).lastIndex;
								(p?q:m).lastIndex=0;
								if(!(o.substring(k)[0]=='{'||o.substring(k)[0]=='['))return k;
								h=n(o.substring(k),o.substring(k)[0]=='[');
								return n(o.substring(0,k)+1+o.substring(k+h),o[0]=='[')+h-1;
							}
							n=n(g,g[0]=='[');
							h.push(f(g.substring(0,n)));
							g=g.substring(n+1);
							if(g)i();
						}else{
							h.push(f(g.substring(g.includes(',')?0:g.length,g.indexOf(','))));
							g=g.substring(g.indexOf(',') + 1 || g.length);
							if(g)i();
						}
					}else h.push(f(g));
				})();
				return h;
			}
			if(/\[\s*]$/.test(g))return[];
			if(/^{.+}$/.test(g)){
				g=g.slice(1,-1);
				var h={},l=g;
				(function i(){
					var j=g[0]=="'"||g[0]=='"'?g.match(new RegExp('^'+g[0]+'(?:|(?:.(?!'+g[0]+')(?:\\\\'+g[0]+')?|(?:\\\\'+g[0]+'))*[^'+g[0]+'\\\\\\n]?)'+g[0]+'(?=:)'))||['"'+g.substring(0,g.indexOf(':'))+'"',1]:['"'+g.substring(0,g.indexOf(':'))+'"',1],k;
					if(!(j[0].length-2)){
						h = l;
						return;
					};
					g=g.substring(j.length-1?j[0].length-1:j[0].length+1);
					if(g[0]=="'"||g[0]=='"'){
						k=g.match(new RegExp('^'+g[0]+'(?:|(?:.(?!'+g[0]+')(?:\\\\'+g[0]+')?|(?:\\\\'+g[0]+'))*[^'+g[0]+'\\\\\\n]?)'+g[0]+'(?=,|$)'));
						h[j[0].slice(1,-1)] = k ? k[0].slice(1,-1) : f(g.substring(g.indexOf(',')));
						g=g.substring(k ? k[0].length + 1 : g.indexOf(',') + 1 || g.length);
						if(g)i();
					}else if((function(){
						function n(o,p,h,k){
							(p?q:m).exec(o);
							k=(p?q:m).lastIndex;
							(p?q:m).lastIndex=0;
							if(!k)return!1;
							if(!(o.substring(k)[0]=='{'||o.substring(k)[0]=='['))return k;
							h=n(o.substring(k),o.substring(k)[0]=='[');
							if(!h)return!1;
							return n(o.substring(0,k)+1+o.substring(k+h),o[0]=='[');
						}
						return n(g,g[0]=='[');
					})()){
						var n=function(o,p,h,k){
							(p?q:m).exec(o);
							k=(p?q:m).lastIndex;
							(p?q:m).lastIndex=0;
							if(!(o.substring(k)[0]=='{'||o.substring(k)[0]=='['))return k;
							h=n(o.substring(k),o.substring(k)[0]=='[');
							return n(o.substring(0,k)+1+o.substring(k+h),o[0]=='[')+h-1;
						}
						n=n(g,g[0]=='[');
						k=f(g.substring(0,n));
						h[j[0].slice(1,-1)]=k;
						g=g.substring(n+1);
						if(g)i();
					}else{
						if(j[0].includes(',')&&j[1]&&location.href.substring(0,4)!='http')console.warn('It looks like your JSON object is malformed - {'+l+'}. The key '+j[0].substring(0,j[0].indexOf(','))+'" does not have a value. If this was unintentional, the object was probably parsed incorrectly. Fix the object to prevent this error from reappearing.')
						h[j[0].slice(1,-1)] = f(g.substring(g.includes(',')?0:g.length,g.indexOf(',')));
						g=g.substring(g.indexOf(',') + 1 || g.length);
						if(g)i();
					}
				})();
				return h;
			}
			if(/^\{\s*}$/.test(g))return{};
			return g;
		}catch(_){return g}
	}

	s.parseUrlArgs = function(a,b) {
		var c = location.search.substring(1).split('&'),
			d = {}
		if (!c.length-1&&!c[0])return d;
		c.forEach(function(e) {
			e=e.split('=')
			d[decodeURIComponent(e[0])] = a ? (d[decodeURIComponent(e[0])] || []).concat(b?[f(decodeURIComponent(e[1]))]:decodeURIComponent(e[1])) : b?f(decodeURIComponent(e[1])):decodeURIComponent(e[1]);
		});
		return d
	}
}();
