!function(){function x(h){var d=h.draggableElement[b];this.target=h;this.bounds=d.bounds;this.callbacks={init:d.init,start:d.start,move:d.move,end:d.end,done:d.done};this.axes={x:d.doX,y:d.doY};d.coordinates.init.timestamp=this.timestamp=performance&&"function"==typeof performance.now?performance.now():(new Date).getTime();this.coordinates={init:d.coordinates.init};this.type="draginit"}function y(h){var d=h.draggableElement[b];this.target=h;this.bounds=d.bounds;this.callbacks={init:d.init,start:d.start,
move:d.move,end:d.end,frame:d.frame,done:d.done};this.axes={x:d.doX,y:d.doY};this.coordinates={init:d.coordinates.init,start:d.coordinates.start};this.timestamp=performance&&"function"==typeof performance.now?performance.now():(new Date).getTime();this.type="dragstart"}function z(h){var d=h.draggableElement[b];this.target=h;this.bounds=d.bounds;this.callbacks={init:d.init,start:d.start,move:d.move,end:d.end,frame:d.frame,done:d.done};this.axes={x:d.doX,y:d.doY};this.coordinates={init:d.coordinates.init,
start:d.coordinates.start,move:d.coordinates.move};this.distance=d.coordinates.move.last.distance;this.timestamp=performance&&"function"==typeof performance.now?performance.now():(new Date).getTime();this.type="dragmove"}function u(h,d){var a=h.draggableElement[b];this.target=h;this.bounds=a.bounds;this.callbacks={init:a.init,start:a.start,move:a.move,end:a.end,frame:a.frame,done:a.done};this.axes={x:a.doX,y:a.doY};this.coordinates={init:a.coordinates.init,start:a.coordinates.start,move:a.coordinates.move,
end:a.coordinates.end};this.distance=a.coordinates.end.distance;this.timestamp=performance&&"function"==typeof performance.now?performance.now():(new Date).getTime();this.endDistance=a.endDistance;this.endTime=a.coordinates.end.timestamp-a.coordinates.start.timestamp;this.hasInertia=d;this.type="dragend"}function A(h,d){var a=h.draggableElement[b];this.target=h;this.bounds=a.bounds;this.callbacks={init:a.init,start:a.start,move:a.move,end:a.end,frame:a.frame,done:a.done};this.axes={x:a.doX,y:a.doY};
this.coordinates={init:a.coordinates.init,start:a.coordinates.start,move:a.coordinates.move,end:a.coordinates.end,frame:a.coordinates.frame};this.timestamp=performance&&"function"==typeof performance.now?performance.now():(new Date).getTime();this.distance=this.coordinates.frame.last.distance;this.endDistance=a.endDistance;this.endTime=a.coordinates.end.timestamp-a.coordinates.start.timestamp;this.direction=d;this.type="dragframe"}function r(h,d,a){var c=h.draggableElement[b];this.target=h;this.bounds=
c.bounds;this.callbacks={init:c.init,start:c.start,move:c.move,end:c.end,frame:c.frame,done:c.done};this.axes={x:c.doX,y:c.doY};this.coordinates={init:c.coordinates.init,start:c.coordinates.start,move:c.coordinates.move,end:c.coordinates.end,frame:c.coordinates.frame,done:{x:h.getBoundingClientRect().left+window.scrollX,y:h.getBoundingClientRect().top+window.scrollY,timestamp:performance&&"function"==typeof performance.now?performance.now():(new Date).getTime(),distance:{x:h.getBoundingClientRect().left+
window.scrollX-c.coordinates.end.x,y:h.getBoundingClientRect().top+window.scrollY-c.coordinates.end.y}}};this.timestamp=performance&&"function"==typeof performance.now?performance.now():(new Date).getTime();this.endDistance=c.endDistance;this.doneDistance={x:this.coordinates.done.x-this.coordinates.start.x,y:this.coordinates.done.y-this.coordinates.start.y};this.endTime=c.coordinates.end.timestamp-c.coordinates.start.timestamp;this.doneTime=c.coordinates.done.timestamp-c.coordinates.start.timestamp;
this.brokeThreshold=d;this.interrupted=!a;this.type="dragdone"}function w(b){var d={},a;for(a in b)d[a]=b[a];return d}function t(h){"touchstart"==h.type&&h.stopPropagation();var d=getComputedStyle(this);this.style.left=d.left;this.style.top=d.top;this.style.cursor=document.documentElement.style.cursor=this.draggableElement[b].cursor;var a=this.offsetLeft,c=this.offsetTop;isNaN(parseFloat(d.left))?this.draggableElement[b].marginOffset.x=a:1<=Math.abs(a-parseFloat(d.left))&&(this.draggableElement[b].marginOffset.x=
a-parseFloat(d.left));isNaN(parseFloat(d.top))?this.draggableElement[b].marginOffset.y=c:1<=Math.abs(c-parseFloat(d.top))&&(this.draggableElement[b].marginOffset.y=c-parseFloat(d.top));this.draggableElement[b].beingHeld=!0;this.draggableElement[b].mouseOffset={x:(h.clientX?h.clientX:h.changedTouches?h.changedTouches[0].clientX:0)-this.getBoundingClientRect().left,y:(h.clientY?h.clientY:h.changedTouches?h.changedTouches[0].clientY:0)-this.getBoundingClientRect().top};this.draggableElement[b].coordinates=
{init:this.draggableElement[b].coordinates.init};this.draggableElement[b].coordinates.start={x:this.getBoundingClientRect().left+window.scrollX,y:this.getBoundingClientRect().top+window.scrollY,timestamp:performance&&"function"==typeof performance.now?performance.now():(new Date).getTime()};this.draggableElement[b].doX&&this.setAttribute("data-draggable-element-axis-x",1);this.draggableElement[b].doY&&this.setAttribute("data-draggable-element-axis-y",1);this.setAttribute("data-draggable-element-being-dragged",
1);"function"==typeof this.draggableElement[b].start&&this.draggableElement[b].start.call(this,new y(this),h);for(var g in this.draggableElement[b].css)g in{left:0,top:0,right:0,bottom:0,position:0,cursor:0}||(this.style[g]=this.draggableElement[b].css[g])}var b=(new Date).getTime()+Math.round(1E6*Math.random());window.addEventListener("load",function(){if("static"==document.body.style.position||"static"==getComputedStyle(document.body).position)document.body.style.position="relative"});window.DraggableElement=
function d(a,c){if(this==window)return new d(a,c);if(!(a instanceof HTMLElement)){if(!arguments.length)throw TypeError("Not enough arguments to DraggableElement.");throw TypeError("First argument given must be an instance of HTMLElement.");}a.draggableElement=this;this.element=a;c=Object(c);Object.defineProperty(this,b,{configurable:!0,value:{},enumerable:!1});this.config={};Object.defineProperties(this.config,{doX:{get:function(){return a.draggableElement[b].doX},set:function(c){a.draggableElement[b].doX=
!!c},enumerable:!0},doY:{get:function(){return a.draggableElement[b].doY},set:function(c){a.draggableElement[b].doY=!!c},enumerable:!0},css:{get:function(){return a.draggableElement[b].css},set:function(c){a.draggableElement[b].css=Object(c)},enumerable:!0},inertia:{get:function(){return a.draggableElement[b].inertia},set:function(c){a.draggableElement[b].inertia=!!c},enumerable:!0},inertiaThreshold:{get:function(){return a.draggableElement[b].inertiaThreshold},set:function(c){isNaN(c)||(a.draggableElement[b].inertiaThreshold=
Math.max(0,c))},enumerable:!0},inertiaResistance:{get:function(){return a.draggableElement[b].inertiaResistance},set:function(c){isNaN(c)||(a.draggableElement[b].inertiaResistance=Math.min(2.5,Math.max(0,c)))},enumerable:!0},inertiaCollision:{get:function(){return a.draggableElement[b].inertiaCollision},set:function(c){c&&c.toString()in{bounce:0,slide:0,stop:0}&&(a.draggableElement[b].inertiaCollision=c.toString())},enumerable:!0},init:{get:function(){return a.draggableElement[b].init},set:function(c){a.draggableElement[b].init=
"function"==typeof c?c:null},enumerable:!0},start:{get:function(){return a.draggableElement[b].start},set:function(c){a.draggableElement[b].start="function"==typeof c?c:null},enumerable:!0},move:{get:function(){return a.draggableElement[b].move},set:function(c){a.draggableElement[b].move="function"==typeof c?c:null},enumerable:!0},end:{get:function(){return a.draggableElement[b].end},set:function(c){a.draggableElement[b].end="function"==typeof c?c:null},enumerable:!0},frame:{get:function(){return a.draggableElement[b].frame},
set:function(c){a.draggableElement[b].frame="function"==typeof c?c:null}},done:{get:function(){return a.draggableElement[b].done},set:function(c){a.draggableElement[b].done="function"==typeof c?c:null},enumerable:!0},cursor:{get:function(){return a.draggableElement[b].cursor},set:function(c){a.draggableElement[b].cursor=typeof c in{string:0,"boolean":0}&&1!=c?"string"==typeof c?c:"":a.draggableElement[b].doX?a.draggableElement[b].doY?"all-scroll":"ew-resize":a.draggableElement[b].doY?"ns-resize":
"not-allowed"},enumerable:!0},keepSelection:{get:function(){return a.draggableElement[b].keepSelection},set:function(c){a.draggableElement[b].keepSelection=!!c},enumerable:!0},bounds:{get:function(){return a.draggableElement[b].bounds},set:function(c){var d=a.draggableElement[b];if(!Array.isArray(c)||4!=c.length||isNaN(c[0])||isNaN(c[1])||isNaN(c[2])||isNaN(c[3]))if(c instanceof Element&&"function"==typeof c.getBoundingClientRect){var e=c.getBoundingClientRect();a[b].boundParent=c;c=[e.left+window.scrollX,
e.top+window.scrollY,e.right+window.scrollX,e.bottom+window.scrollY]}else c=[-Infinity,-Infinity,Infinity,Infinity];d.bounds=c;c=a.draggableElement[b].bounds;a.draggableElement[b].bounds=[Math.min(c[0],c[2]),Math.min(c[1],c[3]),Math.max(c[0],c[2]),Math.max(c[1],c[3])]},enumerable:!0},dependents:{get:function(){return a.draggableElement[b].dependents},set:function(){Array.isArray(v)?v.filter(function(a){return a instanceof HTMLElement}):v instanceof HTMLCollection||v instanceof NodeList?function(a){for(var b=
0,c=a.length,d=[];b<c;b++)d[b]=a[b];return d}():v instanceof Element?[v]:[]},enumerable:!0}});this[b].css="css"in c?Object(c.css):{};this[b].doX="doX"in c?!!c.doX:!0;this[b].doY="doY"in c?!!c.doY:!0;c.bounds=c.bounds&&"function"==typeof c.bounds.toString&&"function"==typeof c.bounds.toString().toLowerCase?"parent"==c.bounds.toString().toLowerCase()?a.parentNode:"body"==c.bounds.toString().toLowerCase()?document.body:c.bounds:c.bounds;this[b].bounds="bounds"in c?!Array.isArray(c.bounds)||4!=c.bounds.length||
isNaN(c.bound[0])||isNaN(c.bounds[1])||isNaN(c.bounds[2])||isNaN(c.bounds[3])?c.bounds instanceof Element&&"function"==typeof c.bounds.getBoundingClientRect?function(a){this[b].boundParent=c.bounds;return[a.left+window.scrollX,a.top+window.scrollY,a.right+window.scrollX,a.bottom+window.scrollY]}.call(this,c.bounds.getBoundingClientRect()):[-Infinity,-Infinity,Infinity,Infinity]:c.bounds:[-Infinity,-Infinity,Infinity,Infinity];this[b].bounds=[Math.min(this[b].bounds[0],this[b].bounds[2]),Math.min(this[b].bounds[1],
this[b].bounds[3]),Math.max(this[b].bounds[0],this[b].bounds[2]),Math.max(this[b].bounds[1],this[b].bounds[3])];this[b].inertia="inertia"in c?!!c.inertia:!1;this[b].inertiaThreshold="inertiaThreshold"in c&&!isNaN(c.inertiaThreshold)?Math.max(0,c.inertiaThreshold):5;this[b].inertiaResistance="inertiaResistance"in c&&!isNaN(c.inertiaResistance)?Math.min(Math.max(0,c.inertiaResistance),2.5):1;this[b].inertiaCollision="inertiaCollision"in c&&c.inertiaCollision in{bounce:0,slide:0,stop:0}?c.inertiaCollision.toString():
"bounce";this[b].init="init"in c&&"function"==typeof c.init?c.init:null;this[b].start="start"in c&&"function"==typeof c.start?c.start:null;this[b].move="move"in c&&"function"==typeof c.move?c.move:null;this[b].end="end"in c&&"function"==typeof c.end?c.end:null;this[b].frame="frame"in c&&"function"==typeof c.frame?c.frame:null;this[b].done="done"in c&&"function"==typeof c.done?c.done:null;this[b].cursor="cursor"in c&&typeof c.cursor in{string:0,"boolean":0}&&1!=c.cursor?"string"==typeof c.cursor?c.cursor:
"":this[b].doX?this[b].doY?"all-scroll":"ew-resize":this[b].doY?"ns-resize":"not-allowed";this[b].dependents="dependents"in c?Array.isArray(c.dependents)?c.dependents.filter(function(a){return a instanceof HTMLElement}):c.dependents instanceof HTMLCollection||c.dependents instanceof NodeList?function(a){for(var b=0,c=a.length,d=[];b<c;b++)d[b]=a[b];return d}(c.dependents):c.dependents instanceof Element?[c.dependents]:[]:[];this[b].keepSelection="keepSelection"in c?!!c.keepSelection:!1;this[b].oldCursors=
{elem:a.style.cursor,html:document.documentElement.style.cursor};this[b].boundParent=this[b].boundParent||null;this[b].marginOffset={x:0,y:0};this[b].oldCSS=Object.freeze(w(getComputedStyle(a)));this[b].beingHeld=!1;this[b].coordinates={init:{x:a.getBoundingClientRect().left+window.scrollX,y:a.getBoundingClientRect().top+window.scrollY}};var g=getComputedStyle(a);a.style.left=g.left;a.style.top=g.top;var e=a.offsetLeft,l=a.offsetTop;isNaN(parseFloat(g.left))?this[b].marginOffset.x=e:1<=Math.abs(e-
parseFloat(g.left))&&(this[b].marginOffset.x=e-parseFloat(g.left));isNaN(parseFloat(g.top))?this[b].marginOffset.y=l:1<=Math.abs(l-parseFloat(g.top))&&(this[b].marginOffset.y=l-parseFloat(g.top));if("static"==a.style.position||"static"==g.position)a.style.position="relative",a.style.top="0px",a.style.left="0px";a.addEventListener("mousedown",t);a.addEventListener("touchstart",t);a.setAttribute("data-draggable-element",1);"function"==typeof this[b].init&&this[b].init.call(a,new x(a))};DraggableElement.isInstance=
function(b){return b instanceof HTMLElement?b.draggableElement instanceof DraggableElement:!1};DraggableElement.prototype.destroy=function(){this.element.removeAttribute("data-draggable-element");this.element.removeAttribute("data-draggable-element-axis-x");this.element.removeAttribute("data-draggable-element-axis-y");this.element.removeAttribute("data-draggable-element-being-dragged");this.element.removeEventListener("touchstart",t);this.element.removeEventListener("mousedown",t);this.element.draggableElement=
HTMLElement.prototype.draggableElement;return this.element};DraggableElement.prototype.updateCSS=function(){this[b].oldCursors={elem:this.element.style.cursor,html:document.documentElement.style.cursor};return this[b].oldCSS=Object.freeze(w(getComputedStyle(this.element)))};DraggableElement.prototype.element=null;DraggableElement.prototype.config={};Object.defineProperties(DraggableElement.prototype.config,{doX:{get:function(){return!0},set:function(b){},enumerable:!0},doY:{get:function(){return!0},
set:function(b){},enumerable:!0},css:{get:function(){return{}},set:function(b){},enumerable:!0},inertia:{get:function(){return!1},set:function(b){},enumerable:!0},inertiaThreshold:{get:function(){return 5},set:function(b){},enumerable:!0},inertiaResistance:{get:function(){return 1},set:function(b){},enumerable:!0},inertiaCollision:{get:function(){return"bounce"},set:function(b){},enumerable:!0},init:{get:function(){return null},set:function(b){},enumerable:!0},start:{get:function(){return null},set:function(b){},
enumerable:!0},move:{get:function(){return null},set:function(b){},enumerable:!0},end:{get:function(){return null},set:function(b){},enumerable:!0},frame:{get:function(){return null},set:function(b){}},done:{get:function(){return null},set:function(b){},enumerable:!0},cursor:{get:function(){return"all-scroll"},set:function(b){},enumerable:!0},keepSelection:{get:function(){return!1},set:function(b){},enumerable:!0},bounds:{get:function(){return[-Infinity,-Infinity,Infinity,Infinity]},set:function(b){},
enumerable:!0},dependents:{get:function(){return[]},set:function(){},enumerable:!0}});HTMLElement.prototype.draggableElement=function(b){new DraggableElement(this,b);return this};var q=function(d){Array.prototype.forEach.call(document.querySelectorAll("[data-draggable-element-being-dragged][data-draggable-element-axis-x]"),function(a){if(a.draggableElement[b].boundParent&&"function"==typeof a.draggableElement[b].boundParent.getBoundingClientRect){var c=a.draggableElement[b].boundParent.getBoundingClientRect(),
g=getComputedStyle(a.draggableElement[b].boundParent);a.draggableElement[b].bounds=[c.left+window.scrollX,c.top+window.scrollY,c.right+window.scrollX-parseFloat(g.borderLeftWidth)-parseFloat(g.borderRightWidth),c.bottom+window.scrollY-parseFloat(g.borderTopWidth)-parseFloat(g.borderBottomWidth)]}var e=a.draggableElement[b].dependents.map(function(a){return a.style.left||getComputedStyle(a).left}),l=a.style.left;a.style.left=Math.max(Math.min(a.draggableElement[b].bounds[2]-a.offsetParent.getBoundingClientRect().left-
window.scrollX-a.getBoundingClientRect().width-a.draggableElement[b].marginOffset.x,(d.clientX?d.clientX:d.changedTouches?d.changedTouches[0].clientX:0)-a.offsetParent.getBoundingClientRect().left-a.draggableElement[b].mouseOffset.x-a.draggableElement[b].marginOffset.x),a.draggableElement[b].bounds[0]-a.offsetParent.getBoundingClientRect().left-window.scrollX-a.draggableElement[b].marginOffset.x)+"px";a.draggableElement[b].dependents.forEach(function(b,c){b.style.left=parseFloat(e[c])+(parseFloat(a.style.left)-
parseFloat(l))+"px"})});Array.prototype.forEach.call(document.querySelectorAll("[data-draggable-element-being-dragged][data-draggable-element-axis-y]"),function(a){if(a.draggableElement[b].boundParent&&"function"==typeof a.draggableElement[b].boundParent.getBoundingClientRect){var c=a.draggableElement[b].boundParent.getBoundingClientRect(),g=getComputedStyle(a.draggableElement[b].boundParent);a.draggableElement[b].bounds=[c.left+window.scrollX,c.top+window.scrollY,c.right+window.scrollX-parseFloat(g.borderLeftWidth)-
parseFloat(g.borderRightWidth),c.bottom+window.scrollY-parseFloat(g.borderTopWidth)-parseFloat(g.borderBottomWidth)]}var e=a.draggableElement[b].dependents.map(function(a){return a.style.top||getComputedStyle(a).top}),l=a.style.top;a.style.top=Math.max(Math.min(a.draggableElement[b].bounds[3]-a.offsetParent.getBoundingClientRect().top-window.scrollY-a.getBoundingClientRect().height-a.draggableElement[b].marginOffset.y,(d.clientY?d.clientY:d.changedTouches?d.changedTouches[0].clientY:0)-a.offsetParent.getBoundingClientRect().top-
a.draggableElement[b].mouseOffset.y-a.draggableElement[b].marginOffset.y),a.draggableElement[b].bounds[1]-a.offsetParent.getBoundingClientRect().top-window.scrollY-a.draggableElement[b].marginOffset.y)+"px";a.draggableElement[b].dependents.forEach(function(b,c){b.style.top=parseFloat(e[c])+(parseFloat(a.style.top)-parseFloat(l))+"px"})});Array.prototype.forEach.call(document.querySelectorAll("[data-draggable-element-being-dragged][data-draggable-element-axis-x],[data-draggable-element-being-dragged][data-draggable-element-axis-y]"),
function(a){a.draggableElement[b].keepSelection||(document.selection?document.selection.empty():window.getSelection&&window.getSelection().removeAllRanges());a.draggableElement[b].coordinates.move=a.draggableElement[b].coordinates.move||[];a.draggableElement[b].coordinates.move.push({x:a.getBoundingClientRect().left+window.scrollX,y:a.getBoundingClientRect().top+window.scrollY,timestamp:performance&&"function"==typeof performance.now?performance.now():(new Date).getTime(),distance:{}});a.draggableElement[b].coordinates.move[a.draggableElement[b].coordinates.move.length-
1].distance.x=a.draggableElement[b].coordinates.move[a.draggableElement[b].coordinates.move.length-1].x-(a.draggableElement[b].coordinates.move[a.draggableElement[b].coordinates.move.length-2]||a.draggableElement[b].coordinates.start).x;a.draggableElement[b].coordinates.move[a.draggableElement[b].coordinates.move.length-1].distance.y=a.draggableElement[b].coordinates.move[a.draggableElement[b].coordinates.move.length-1].y-(a.draggableElement[b].coordinates.move[a.draggableElement[b].coordinates.move.length-
2]||a.draggableElement[b].coordinates.start).y;Object.defineProperty(a.draggableElement[b].coordinates.move,"last",{value:a.draggableElement[b].coordinates.move[a.draggableElement[b].coordinates.move.length-1],configurable:!0,enumerable:!1});"function"==typeof a.draggableElement[b].move&&a.draggableElement[b].move.call(a,new z(a),d)})};document.addEventListener("mousemove",q);document.addEventListener("touchmove",q);q=function(d){Array.prototype.forEach.call(document.querySelectorAll("[data-draggable-element-being-dragged]"),
function(a){a.style.cursor=a.draggableElement[b].oldCursors.elem;document.documentElement.style.cursor=a.draggableElement[b].oldCursors.html;["being-dragged","axis-x","axis-y"].forEach(function(b){a.removeAttribute("data-draggable-element-"+b)});for(var c in a.draggableElement[b].css)c in{left:0,top:0,right:0,bottom:0,position:0,cursor:0}||(a.style[c]=a.draggableElement[b].oldCSS[c]);a.draggableElement[b].coordinates.move&&a.draggableElement[b].coordinates.move.length||(a.draggableElement[b].coordinates.move=
[a.draggableElement[b].coordinates.start],Object.defineProperty(a.draggableElement[b].coordinates.move,"last",{value:a.draggableElement[b].coordinates.move[0],configurable:!0,enumerable:!1}),a.draggableElement[b].coordinates.move[0].timestamp=performance&&"function"==typeof performance.now?performance.now():(new Date).getTime(),a.draggableElement[b].coordinates.move[0].distance={x:a.draggableElement[b].coordinates.move.last.x-a.draggableElement[b].coordinates.start.x,y:a.draggableElement[b].coordinates.move.last.x-
a.draggableElement[b].coordinates.start.x});a.draggableElement[b].coordinates.end={x:a.getBoundingClientRect().left+window.scrollX,y:a.getBoundingClientRect().top+window.scrollY,timestamp:performance&&"function"==typeof performance.now?performance.now():(new Date).getTime(),distance:{}};a.draggableElement[b].coordinates.end.distance.x=a.draggableElement[b].coordinates.move.last.x;a.draggableElement[b].coordinates.end.distance.y=a.draggableElement[b].coordinates.move.last.y;a.draggableElement[b].coordinates.endDistance=
{x:a.draggableElement[b].coordinates.end.x-a.draggableElement[b].coordinates.start.x,y:a.draggableElement[b].coordinates.end.y-a.draggableElement[b].coordinates.start.y};a.draggableElement[b].beingHeld=!1;if(a.draggableElement[b].inertia){c=[];for(var g=!1,e=a.draggableElement[b].coordinates.move.length-1;0<=e&&!(a.draggableElement[b].coordinates.move[e].timestamp+120<a.draggableElement[b].coordinates.end.timestamp);e--)c.push(a.draggableElement[b].coordinates.move[e]);c.length&&~c.map(function(c){return Math.max(Math.abs(c.distance.x),
Math.abs(c.distance.y))>a.draggableElement[b].inertiaThreshold}).indexOf(!0)&&(g=!0);"function"==typeof a.draggableElement[b].end&&a.draggableElement[b].end.call(a,new u(a,g),d,function(){g=!1});if(g){var l,p=[];c=a.draggableElement[b].coordinates.move;c.reverse().forEach(function(c){3>Math.max(Math.abs(c.distance.x),Math.abs(c.distance.y))||9<p.length||(l=l||{x:2>Math.abs(c.distance.x)?null:0<=c.distance.x,y:2>Math.abs(c.distance.y)?null:0<=c.distance.y},!(0<=c.distance.x!=l.x&&null!=l.x||0<=c.distance.y!=
l.y&&null!=l.y)&&c.timestamp+200>a.draggableElement[b].coordinates.end.timestamp&&p.push(c))});var m=p.length,n=m%3?1==m%3?[Math.floor(m/3),Math.ceil(m/3),Math.floor(m/3)]:[Math.ceil(m/3),Math.floor(m/3),Math.ceil(m/3)]:[m/3,m/3,m/3];c=[{x:0,y:0},{x:0,y:0},{x:0,y:0}];for(e=0;e<m;e++)c[e<n[0]?0:e<n[0]+n[1]?1:2].x+=p[e].distance.x,c[e<n[0]?0:e<n[0]+n[1]?1:2].y+=p[e].distance.y;c[1].x=(c[1].x-c[0].x)/3+c[0].x;c[1].y=(c[1].y-c[0].y)/3+c[0].y;c[2].x=(c[2].x-c[0].x)/6+c[0].x;c[2].y=(c[2].y-c[0].y)/6+c[0].y;
var f={x:0,y:0};c.forEach(function(a){f.x+=a.x;f.y+=a.y});if(f.x||f.y){a.draggableElement[b].coordinates.frame=[{x:a.getBoundingClientRect().left+window.scrollX,y:a.getBoundingClientRect().top+window.scrollY,timestamp:performance&&"function"==typeof performance.now?performance.now():(new Date).getTime(),distance:{x:0,y:0}}];Object.defineProperty(a.draggableElement[b].coordinates.frame,"last",{value:a.draggableElement[b].coordinates.frame[0],configurable:!0,enumerable:!1});var q=setInterval(function(){if(a.draggableElement[b].beingHeld)clearInterval(q),
"function"==typeof a.draggableElement[b].done&&a.draggableElement[b].done.call(a,new r(!0,!0));else{f.x=.4*f.x*a.draggableElement[b].inertiaResistance;f.y=.4*f.y*a.draggableElement[b].inertiaResistance;var c=parseFloat(a.style.left),d=parseFloat(a.style.top),e=a.draggableElement[b].bounds,g=a.getBoundingClientRect(),k=a.parentNode.getBoundingClientRect();"bounce"==a.draggableElement[b].inertiaCollision?(c+f.x<e[0]-k.left-window.scrollX-a.draggableElement[b].marginOffset.x?(a.style.left=e[0]-k.left-
window.scrollX-a.draggableElement[b].marginOffset.x+Math.abs(f.x+(c-(e[0]-k.left-window.scrollX)))-a.draggableElement[b].marginOffset.x+"px",f.x=-f.x):c+f.x>e[2]-k.left-window.scrollX-g.width-a.draggableElement[b].marginOffset.x?(a.style.left=e[2]-g.width-k.left-window.scrollX-a.draggableElement[b].marginOffset.x-Math.abs(f.x-(e[2]-k.left-window.scrollX-g.width-c)+a.draggableElement[b].marginOffset.x)+"px",f.x=-f.x):a.style.left=c+f.x+"px",d+f.y<e[1]-k.top-window.scrollY-a.draggableElement[b].marginOffset.y?
(a.style.top=e[1]-k.top-window.scrollY-a.draggableElement[b].marginOffset.y+Math.abs(f.y+(d-(e[1]-k.top-window.scrollY)))-a.draggableElement[b].marginOffset.y+"px",f.y=-f.y):d+f.y>e[3]-k.top-window.scrollY-g.height?(a.style.top=e[3]-g.height-k.top-window.scrollY-a.draggableElement[b].marginOffset.y-Math.abs(f.y-(e[3]-k.top-window.scrollY-g.height-d)+a.draggableElement[b].marginOffset.y)+"px",f.y=-f.y):a.style.top=d+f.y+"px"):"slide"==a.draggableElement[b].inertiaCollision?(c+f.x<e[0]-k.left-window.scrollX-
a.draggableElement[b].marginOffset.x?(a.style.left=e[0]-k.left-window.scrollX-a.draggableElement[b].marginOffset.x+"px",f.x=0):c+f.x>e[2]-k.left-window.scrollX-g.width?(a.style.left=e[2]-g.width-k.left-window.scrollX-a.draggableElement[b].marginOffset.x+"px",f.x=0):a.style.left=c+f.x+"px",d+f.y<e[1]-k.top-window.scrollY-a.draggableElement[b].marginOffset.y?(a.style.top=e[1]-k.top-window.scrollY-a.draggableElement[b].marginOffset.y+"px",f.y=0):d+f.y>e[3]-k.top-window.scrollY-g.height?(a.style.top=
e[3]-g.height-k.top-window.scrollY-a.draggableElement[b].marginOffset.y+"px",f.y=0):a.style.top=d+f.y+"px"):"stop"==a.draggableElement[b].inertiaCollision&&(c+f.x<e[0]-k.left-window.scrollX||c+f.x>e[2]-k.left-window.scrollX-g.width||d+f.y<e[1]-k.top-window.scrollY-a.draggableElement[b].marginOffset.y||d+f.y>e[3]-k.top-scrollY-g.height-a.draggableElement[b].marginOffset.y?(a.style.left=(c+f.x<e[0]-k.left-window.scrollX-a.draggableElement[b].marginOffset.x?e[0]-k.left-window.scrollX-a.draggableElement[b].marginOffset.x:
c+f.x>e[2]-k.left-window.scrollX-g.width-a.draggableElement[b].marginOffset.x?e[2]-g.width-k.left-window.scrollX-a.draggableElement[b].marginOffset.x:c+f.x)+"px",a.style.top=(d+f.y<e[1]-k.top-window.scrollY-a.draggableElement[b].marginOffset.y?e[1]-k.top-window.scrollY-a.draggableElement[b].marginOffset.y:d+f.y>e[3]-k.top-window.scrollY-g.height-a.draggableElement[b].marginOffset.y?e[3]-g.height-k.top-window.scrollY-a.draggableElement[b].marginOffset.y:d+f.y)+"px",f.x=f.y=0):(a.style.left=c+f.x+"px",
a.style.top=d+f.y+"px"));a.draggableElement[b].coordinates.frame.push({x:a.getBoundingClientRect().left+window.scrollX,y:a.getBoundingClientRect().top+window.scrollY,timestamp:performance&&"function"==typeof performance.now?performance.now():(new Date).getTime(),distance:{x:a.getBoundingClientRect().left+window.scrollX-a.draggableElement[b].coordinates.frame.last.x,y:a.getBoundingClientRect().top+window.scrollY-a.draggableElement[b].coordinates.frame.last.y}});Object.defineProperty(a.draggableElement[b].coordinates.frame,
"last",{value:a.draggableElement[b].coordinates.frame[a.draggableElement[b].coordinates.frame.length-1],configurable:!0,enumerable:!1});"function"==typeof a.draggableElement[b].frame&&a.draggableElement[b].frame.call(a,new A(a,f),function(){f={x:0,y:0}});.1>=Math.abs(f.x)&&.1>=Math.abs(f.y)&&(clearInterval(q),"function"==typeof a.draggableElement[b].done&&a.draggableElement[b].done.call(a,new r(a,!0)))}},25)}else"function"==typeof a.draggableElement[b].done&&a.draggableElement[b].done.call(a,new r(a,
!0))}else"function"==typeof a.draggableElement[b].done&&a.draggableElement[b].done.call(a,new r(a,!1))}else"function"==typeof a.draggableElement[b].end&&a.draggableElement[b].end.call(a,new u(a,!1),d,function(){})})};document.addEventListener("mouseup",q);document.addEventListener("touchend",q);window.addEventListener("resize",function(){Array.prototype.forEach.call(document.querySelectorAll("[data-draggable-element]"),function(d){var a=getComputedStyle(d),c=d.offsetLeft,g=d.offsetTop;if(d.draggableElement[b].doX){if(d.draggableElement[b].boundParent&&
"function"==typeof d.draggableElement[b].boundParent.getBoundingClientRect){var e=d.draggableElement[b].boundParent.getBoundingClientRect(),l=getComputedStyle(d.draggableElement[b].boundParent);d.draggableElement[b].bounds=[e.left+window.scrollX,e.top+window.scrollY,e.right+window.scrollX-parseFloat(l.borderLeftWidth)-parseFloat(l.borderRightWidth),e.bottom+window.scrollY-parseFloat(l.borderTopWidth)-parseFloat(l.borderBottomWidth)]}isNaN(parseFloat(a.left))?d.draggableElement[b].marginOffset.x=c:
1<=Math.abs(c-parseFloat(a.left))&&(d.draggableElement[b].marginOffset.x=c-parseFloat(a.left));var p=d.draggableElement[b].dependents.map(function(a){return a.style.left||getComputedStyle(a).left}),m=d.style.left;d.style.left=Math.max(Math.min(d.draggableElement[b].bounds[2]-d.offsetParent.getBoundingClientRect().left-window.scrollX-d.getBoundingClientRect().width-d.draggableElement[b].marginOffset.x,parseFloat(d.style.left)),d.draggableElement[b].bounds[0]-d.offsetParent.getBoundingClientRect().left-
window.scrollX-d.draggableElement[b].marginOffset.x)+"px";d.draggableElement[b].dependents.forEach(function(a,b){a.style.left=parseFloat(p[b])+(parseFloat(d.style.left)-parseFloat(oldLeft))+"px"})}d.draggableElement[b].doY&&(d.draggableElement[b].boundParent&&"function"==typeof d.draggableElement[b].boundParent.getBoundingClientRect&&(e=d.draggableElement[b].boundParent.getBoundingClientRect(),l=getComputedStyle(d.draggableElement[b].boundParent),d.draggableElement[b].bounds=[e.left+window.scrollX,
e.top+window.scrollY,e.right+window.scrollX-parseFloat(l.borderLeftWidth)-parseFloat(l.borderRightWidth),e.bottom+window.scrollY-parseFloat(l.borderTopWidth)-parseFloat(l.borderBottomWidth)]),isNaN(parseFloat(a.top))?d.draggableElement[b].marginOffset.y=g:1<=Math.abs(g-parseFloat(a.top))&&(d.draggableElement[b].marginOffset.y=g-parseFloat(a.top)),p=d.draggableElement[b].dependents.map(function(a){return a.style.top||getComputedStyle(a).top}),m=d.style.top,d.style.top=Math.max(Math.min(d.draggableElement[b].bounds[3]-
d.offsetParent.getBoundingClientRect().top-window.scrollY-d.getBoundingClientRect().height-d.draggableElement[b].marginOffset.y,parseFloat(d.style.top)),d.draggableElement[b].bounds[1]-d.offsetParent.getBoundingClientRect().top-window.scrollY-d.draggableElement[b].marginOffset.y)+"px",d.draggableElement[b].dependents.forEach(function(a,b){a.style.top=parseFloat(p[b])+(parseFloat(d.style.top)-parseFloat(m))+"px"}))})})}();