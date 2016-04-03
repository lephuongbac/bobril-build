!function(){"use strict";function a(a){return document.createTextNode(a)}function b(a){return document.createElement(a)}function c(a){return"object"==typeof a}function d(a){var b=Jb;return Jb=a,b}function e(){return Object.create(null)}function f(a){return"string"==typeof Lb[a]}function g(a){return function(b,c,d){b[a]=c,b[d]=void 0}}function h(a){return function(b,c,d){"number"==typeof c?b[a]=c+"px":b[a]=c,b[d]=void 0}}function i(a,b,c){"number"==typeof b&&(a[c]=b+"px")}function j(){return document.documentMode}function k(a){for(var b=Object.keys(a),c=0,d=b.length;d>c;c++){var e=b[c],j=Mb[e],k=a[e];if(void 0!==k){if(void 0===j){if(f(e))j=Nb[e]===!0?null:i;else{for(var l=e.replace(/^\w/,function(a){return a.toUpperCase()}),m=0;m<Kb.length;m++)if(f(Kb[m]+l)){j=(Nb[e]===!0?g:h)(Kb[m]+l);break}void 0===j&&(j=Nb[e]===!0?null:i)}Mb[e]=j}null!==j&&j(a,k,e)}}}function l(a,b){a[b]=""}function m(a,b,d,e){var f=b.style;if(c(d)){k(d);var g;if(c(e)){for(g in e)g in d||l(f,g);for(g in d){var h=d[g];void 0!==h?e[g]!==h&&(f[g]=h):l(f,g)}}else{e&&(f.cssText="");for(g in d){var h=d[g];void 0!==h&&(f[g]=h)}}}else if(d)f.cssText=d;else if(c(e))for(g in e)l(f,g);else e&&(f.cssText="")}function n(a,b){Gb?a.setAttribute("class",b):a.className=b}function o(a,b,c,d){var e,f,g,h,i;for(e in c)f=c[e],g=d[e],"value"!==e||Gb?g!==f&&(d[e]=f,Gb?"href"===e?b.setAttributeNS("http://www.w3.org/1999/xlink","href",f):b.setAttribute(e,f):e in b&&"list"!==e&&"form"!==e?b[e]=f:b.setAttribute(e,f)):(h=g,i=f,d[e]=f);for(e in d)void 0===d[e]||e in c||(d[e]=void 0,b.removeAttribute(e));return void 0!==i&&Jb(b,a,i,h),d}function p(a,b){var c=a.component;c&&c[b?"postUpdateDom":"postInitDom"]&&(Hb.push(b),Ib.push(a))}function q(a){for(var b;a&&(b=a.cfg,void 0===b);){if(a.ctx){b=a.ctx.cfg;break}a=a.parent}return b}function r(a,b){if(null!=a){if("function"==typeof a)return void a(b);var c=a[0],d=c.refs;d||(d=e(),c.refs=d),d[a[1]]=b}}function s(c,d,e,f){var g,h={tag:c.tag,key:c.key,ref:c.ref,className:c.className,style:c.style,attrs:c.attrs,children:c.children,component:c.component,data:c.data,cfg:c.cfg,parent:d,element:void 0,ctx:void 0},i=Gb,j=h.component;if(r(h.ref,h),j){var k={data:h.data||{},me:h,cfg:q(d)};h.ctx=k,j.init&&j.init(k,h),j.render&&j.render(k,h)}var l=h.tag,s=h.children;if(void 0===l)return"string"==typeof s?(g=a(s),h.element=g,e.insertBefore(g,f)):u(h,e,f),j&&(j.postRender&&j.postRender(h.ctx,h),p(h,!1)),h;if("/"===l){var t=s;if(""===t);else if(null==f){var v=e.lastChild;for(e.insertAdjacentHTML("beforeend",t),h.element=[],v=v?v.nextSibling:e.firstChild;v;)h.element.push(v),v=v.nextSibling}else{g=f;var w=f.previousSibling,x=!1,y=e;g.insertAdjacentHTML||(g=y.insertBefore(b("i"),g),x=!0),g.insertAdjacentHTML("beforebegin",t),w=w?w.nextSibling:y.firstChild;for(var z=[];w!==g;)z.push(w),w=w.nextSibling;c.element=z,x&&y.removeChild(g)}return j&&(j.postRender&&j.postRender(h.ctx,h),p(h,!1)),h}Gb||"svg"===l?(g=document.createElementNS("http://www.w3.org/2000/svg",l),Gb=!0):g||(g=b(l)),e.insertBefore(g,f),h.element=g,u(h,g,null),j&&j.postRender&&j.postRender(h.ctx,h),h.attrs&&(h.attrs=o(h,g,h.attrs,{})),h.style&&m(h,g,h.style,void 0);var A=h.className;return A&&n(g,A),Gb=i,p(h,!1),h}function t(a){var b=typeof a;return"string"===b?{children:a}:"boolean"===b?null:a}function u(a,b,c){var d=a.children;if(d){if(!Eb(d)){if("string"==typeof d)return void(Fb?b.textContent=d:b.innerText=d);d=[d]}d=d.slice(0);for(var e=0,f=d.length;f>e;){var g=d[e];Eb(g)?(d.splice.apply(d,[e,1].concat(g)),f=d.length):(g=t(g),null!=g?(d[e]=s(g,a,b,c),e++):(d.splice(e,1),f--))}a.children=d}}function v(a){r(a.ref,null);var b=a.children;if(Eb(b))for(var c=0,d=b.length;d>c;c++)v(b[c]);var e=a.component;e&&e.destroy&&e.destroy(a.ctx,a,a.element)}function w(a){var b=a.element;if(Eb(b)){var c=b[0].parentNode;if(c)for(var d=0;d<b.length;d++)c.removeChild(b[d])}else if(null!=b){var e=b.parentNode;e&&e.removeChild(b)}else{var f=a.children;if(Eb(f))for(var g=0,h=f.length;h>g;g++)w(f[g])}}function x(a){v(a),w(a)}function y(a,b,c,d){var e=a.element,f=a.children;if(Eb(e)){for(var g=0;g<e.length;g++)if(e[g]===b)return d.push(a),Eb(f)?f:null}else if(null==e){if(Eb(f))for(var h=0;h<f.length;h++){var i=y(f[h],b,c,d);if(void 0!==i)return d.splice(c,0,a),i}}else if(e===b)return d.push(a),Eb(f)?f:null}function z(a){var b=[];if(null==a)return b;var c=Object.keys(Ob),d=c.map(function(a){return Ob[a].e||document.body}),e=[];a:for(;a;){for(var f=0;f<d.length;f++)if(a===d[f])break a;e.push(a),a=a.parentNode}if(!a||0===e.length)return b;var g=null,h=e.pop();a:for(f=0;f<d.length;f++)if(a===d[f])for(var i=Ob[c[f]].c,j=0;j<i.length;j++){var k=i[j],l=y(k,h,b.length,b);if(void 0!==l){g=l;break a}}for(;e.length;){if(h=e.pop(),g&&g.length)for(var m=0,n=g.length;n>m;m++){var o=g[m],l=y(o,h,b.length,b);if(void 0!==l){g=l,h=null;break}}if(h){b.push(null);break}}return b}function A(a){for(var b=z(a),c=null;null===c&&b.length>0;)c=b.pop();return c}function B(a,b,c){c&&c.postRender&&c.postRender(b.ctx,a,b),b.data=a.data,p(b,!0)}function C(a,b,c,d,e){var f=a.component,g=Gb,h=!1,i=b.ctx;if(f&&null!=i)if(i[Ub]===Zb&&(e=Math.max(e,i[Vb])),f.id!==b.component.id)h=!0;else{if(void 0!=b.parent&&(i.cfg=q(b.parent)),f.shouldChange&&!f.shouldChange(i,a,b)&&!ec)return Eb(b.children)&&R(b.children,b.element||c,null!=b.element?null:d),b;i.data=a.data||{},b.component=f,f.render&&(a=yb({},a),f.render(i,a,b)),b.cfg=a.cfg}var j=a.children,k=b.children,l=a.tag;if(h||f&&null==i);else if("/"===l){if("/"===b.tag&&k===j)return B(a,b,f),b}else if(l===b.tag){if(void 0===l){if("string"==typeof j&&"string"==typeof k){if(j!==k){var p=b.element;Fb?p.textContent=j:p.nodeValue=j,b.children=j}}else 0>=e?Eb(k)&&R(b.children,c,d):b.children=K(c,j,k,b,d,e-1);return B(a,b,f),b}"svg"===l&&(Gb=!0);var p=b.element;"string"!=typeof j||Eb(k)?0>=e?Eb(k)&&R(b.children,p,d):k=K(p,j,k,b,null,e-1):j!==k&&(Fb?p.textContent=j:p.innerText=j,k=j),b.children=k,B(a,b,f),(b.attrs||a.attrs)&&(b.attrs=o(b,p,a.attrs||{},b.attrs||{})),m(b,p,a.style,b.style),b.style=a.style;var r=a.className;return r!==b.className&&(n(p,r||""),b.className=r),Gb=g,b}var t=b.element;Eb(t)&&(t=t[0]),t=null==t?c:t.parentNode;var u=s(a,b.parent,t,D(b));return x(b),u}function D(a){var b=a.element;if(null!=b)return Eb(b)?b[0]:b;var c=a.children;if(!Eb(c))return null;for(var d=0;d<c.length;d++)if(b=D(c[d]))return b;return null}function E(a,b,c,d){for(;++b<c;){var e=a[b];if(null!=e){var f=D(e);if(null!=f)return f}}return d}function F(){for(var a=Ib.length,b=0;a>b;b++){var c=Ib[b];Hb[b]?c.component.postUpdateDom(c.ctx,c,c.element):c.component.postInitDom(c.ctx,c,c.element)}Hb=[],Ib=[]}function G(a,b,c,d,e,f,g){b[c]=C(a,b[c],f,E(b,c,d,e),g)}function H(a,b,c){var d=a.element;if(null==d){var e=a.children;if(!Eb(e))return null;for(var f=0;f<e.length;f++)H(e[f],b,c)}else if(Eb(d))for(var f=0;f<d.length;f++)b.insertBefore(d[f],c);else b.insertBefore(d,c)}function I(a,b,c,d,e){var f=E(a,b,c,d),g=a[b],h=D(g);null!=h&&h!==f&&H(g,e,f)}function J(a,b,c,d,e,f,g){var h=E(b,c,d,e),i=b[c],j=D(i);null!=j&&j!==h&&H(i,f,h),b[c]=C(a,i,f,h,g)}function K(a,b,c,d,e,f){null==b&&(b=[]),Eb(b)||(b=[b]),null==c&&(c=[]),Eb(c)||(a.firstChild&&a.removeChild(a.firstChild),c=[]);var g=b;g=g.slice(0);var h,i=g.length;for(h=0;i>h;){var j=g[h];Eb(j)?(g.splice.apply(g,[h,1].concat(j)),i=g.length):(j=t(j),null!=j?(g[h]=j,h++):(g.splice(h,1),i--))}return L(a,g,c,d,e,f)}function L(a,b,c,d,f,g){for(var h=b.length,i=c.length,j=i,k=0,l=0;h>k&&j>l;){if(b[k].key!==c[l].key){for(;;)if(!(b[h-1].key===c[j-1].key&&(h--,j--,G(b[h],c,j,i,f,a,g),h>k&&j>l)))break;if(h>k&&j>l){if(b[k].key===c[j-1].key){c.splice(l,0,c[j-1]),c.splice(j,1),J(b[k],c,l,i,f,a,g),k++,l++;continue}if(b[h-1].key===c[l].key){c.splice(j,0,c[l]),c.splice(l,1),j--,h--,J(b[h],c,j,i,f,a,g);continue}}break}G(b[k],c,l,i,f,a,g),k++,l++}if(l===j){if(k===h)return c;for(;h>k;)c.splice(l,0,s(b[k],d,a,E(c,l-1,i,f))),l++,j++,i++,k++;return c}if(k===h){for(;j>l;)j--,x(c[j]),c.splice(j,1);return c}for(var m,n,o=e(),p=e(),q=k,r=l,t=0;j>l;l++)n=c[l],m=n.key,null!=m?o[m]=l:t--;for(var u=-t-t;h>k;k++)n=b[k],m=n.key,null!=m?p[m]=k:t++;u+=t;var v=0;k=q,l=r;for(var w;j>l&&h>k;)if(null!==c[l])if(w=c[l].key,null!=w){if(m=b[k].key,null==m){for(k++;h>k&&(m=b[k].key,null==m);)k++;if(null==m)break}var y=o[m];void 0!==y?w in p?l===y+v?(G(b[k],c,l,i,f,a,g),k++,l++):(c.splice(l,0,c[y+v]),v++,c[y+v]=null,J(b[k],c,l,i,f,a,g),l++,j++,i++,k++):(x(c[l]),c.splice(l,1),v--,j--,i--):(c.splice(l,0,s(b[k],d,a,E(c,l-1,i,f))),v++,k++,l++,j++,i++)}else l++;else c.splice(l,1),j--,i--,v--;for(;j>l;)null!==c[l]?null==c[l].key?l++:(x(c[l]),c.splice(l,1),j--,i--):(c.splice(l,1),j--,i--);for(;h>k;)m=b[k].key,null!=m&&(c.splice(l,0,s(b[k],d,a,E(c,l-1,i,f))),j++,i++,v++,l++),k++;if(!u)return c;for(u=u-Math.abs(t)>>1,k=q,l=r;h>k;)if(j>l&&(w=c[l].key,null!=w))l++;else if(m=b[k].key,j>k&&m===c[k].key){if(null!=m){k++;continue}G(b[k],c,k,i,f,a,g),u--,k++,l=k}else if(null==m)j>l?(c.splice(k,0,c[l]),c.splice(l+1,1),J(b[k],c,k,i,f,a,g),u--,k++,l++):(c.splice(k,0,s(b[k],d,a,E(c,k-1,i,f))),j++,i++,k++,l++);else{if(0===u&&0>t){for(;;)if(x(c[l]),c.splice(l,1),j--,i--,t++,null!=c[l].key)break;continue}for(;null==c[l].key;)l++;c.splice(k,0,c[l]),c.splice(l+1,1),I(c,k,i,f,a),k++,l=k}for(;j>k;)j--,x(c[j]),c.splice(j,1);return c}function M(a){if(Pb)Qb(a);else{var b=50/3+Tb-zb();0>b&&(b=0),window.setTimeout(function(){Tb=zb(),a(Tb-Sb)},b)}}function N(a,b,c){null==Rb&&(Rb={});var d=Rb[a]||[];d.push({priority:b,callback:c}),Rb[a]=d}function O(a,b,c,d){var e=ac[a];if(e)for(var f=0;f<e.length;f++)if(e[f](b,c,d))return!0;return!1}function P(a,b){function c(c){c=c||window.event;var d=c.target||c.srcElement||a,e=A(d);O(b,c,d,e)}if("!"!=b[0]){var d="^"==b[0],e=b;d&&(e=b.slice(1)),"on"+e in window&&(a=window),a.addEventListener(e,c,d)}}function Q(){if(null!=Rb){for(var a=Object.keys(Rb),b=0;b<a.length;b++){var c=a[b],d=Rb[c];d=d.sort(function(a,b){return a.priority-b.priority}),ac[c]=d.map(function(a){return a.callback})}Rb=null;for(var e=document.body,f=0;f<a.length;f++)P(e,a[f])}}function R(a,b,c){for(var d=a.length,e=0;d>e;e++){var f=a[e],g=f.ctx;if(null!=g&&g[Ub]===Zb){var h={data:g.data,component:f.component};a[e]=C(h,f,b,c,g[Vb])}else if(Eb(f.children)){var i=Gb;"svg"===f.tag&&(Gb=!0),R(f.children,f.element||b,E(a,e,d,c)),Gb=i}}}function S(a){var b=bc;return bc=a,b}function T(a){var b=cc;return cc=a,b}function U(a){for(var b=a.length-1;b>=0;b--){var c=a[b],d=c.element;if(null!=d){if(Eb(d)){var e=d.length;if(0===e)continue;return d[e-1]}return d}var f=c.children;if(Eb(f)){var g=U(f);if(null!=g)return g}}return null}function V(a){_b=zb(),Q(),Zb++,ec=dc,dc=!1,Yb=a,Xb=!1,bc();var b=!1;Wb&&(Wb=!1,b=!0);for(var c=Object.keys(Ob),d=0;d<c.length;d++){var e=Ob[c[d]];if(e){var f=e.c,g=U(f);if(null!=g&&(g=g.nextSibling),b){var h=e.f();if(void 0===h)break;e.e=e.e||document.body,e.c=K(e.e,h,f,null,g,1e6)}else R(f,e.e,g)}}F();var i=Ob[0];cc(i?i.c:null),$b=zb()-_b}function W(){dc=!0,Ab()}function X(a){var b=Ab;return Ab=a,b}function Y(){Xb||(Wb=!1),Ab()}function Z(a,b,c){fc++;var d=""+fc;return Ob[d]={f:a,e:b,c:[],p:c},Y(),d}function $(a){var b=Ob[a];b&&(b.c.length&&(b.c=K(b.e,[],b.c,null,null,1e9)),delete Ob[a])}function _(){return Ob}function aa(a,b){$("0"),Ob[0]={f:a,e:b,c:[],p:void 0},gc(),gc=Y}function ba(a,b,c){for(;a;){var d=a.component;if(d){var e=a.ctx,f=d[b];if(f&&f.call(d,e,c))return e;if(f=d.shouldStopBubble,f&&f.call(d,e,b,c))break}a=a.parent}return null}function ca(a,b,c){if(!a)return null;var d=a.component;if(d){var e=a.ctx,f=d[b];if(f&&f.call(d,e,c))return e;if(f=d.shouldStopBroadcast,f&&f.call(d,e,b,c))return null}var g=a.children;if(Eb(g))for(var h=0;h<g.length;h++){var i=ca(g[h],b,c);if(null!=i)return i}}function da(a,b){for(var c=Object.keys(Ob),d=0;d<c.length;d++){var e=Ob[c[d]].c;if(null!=e)for(var f=0;f<e.length;f++){var g=ca(e[f],a,b);if(null!=g)return g}}return null}function ea(a){var b=a.preventDefault;b?b.call(a):a.returnValue=!1}function fa(a,b){Mb[a]=b}function ga(){return hc=null,Ab(),!1}function ha(){if(null==hc){var a=mc.clientWidth,b=mc.clientHeight,c=window.orientation,d=b>=a;if(null==c&&(c=d?0:90),nc){var e=Math.abs(c)%180===90;null==lc?lc=e===d:d=e===lc}for(var f=0;a>ic[+!d][f];)f++;hc={width:a,height:b,orientation:c,deviceCategory:f,portrait:d}}return hc}function ia(a){var b=a.type;return"checkbox"===b||"radio"===b}function ja(a,b){var c=a.length;if(c!==b.length)return!1;for(var d=0;c>d;d++)if(a[d]!==b[d])return!1;return!0}function ka(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return!0;return!1}function la(a){for(var b=[],c=0;c<a.length;c++)a[c].selected&&b.push(a[c].value);return b}function ma(a,b,c){if(b&&"OPTION"===b.nodeName&&(b=document.activeElement,c=A(b)),!c)return!1;var d=c.component;if(!d)return!1;if(!d.onChange)return!1;var e=c.ctx,f=b.tagName,g="SELECT"===f,h=g&&b.multiple;if(h){var i=la(b.options);ja(e[oc],i)||(e[oc]=i,d.onChange(e,i))}else if(ia(b)){if(a&&"change"===a.type)return setTimeout(function(){ma(null,b,c)},10),!1;if("radio"===b.type)for(var j=document.getElementsByName(b.name),k=0;k<j.length;k++){var l=j[k],m=A(l);if(m){var n=m.component;if(n&&n.onChange){var o=m.ctx,p=l.checked;o[oc]!==p&&(o[oc]=p,n.onChange(o,p))}}}else{var q=b.checked;e[oc]!==q&&(e[oc]=q,d.onChange(e,q))}}else{var r=b.value;e[oc]!==r&&(e[oc]=r,d.onChange(e,r))}return!1}function na(a){return{shift:a.shiftKey,ctrl:a.ctrlKey,alt:a.altKey,meta:a.metaKey||!1,which:a.which||a.keyCode}}function oa(a,b,c){if(!c)return!1;var d=na(a);return ba(c,"onKeyDown",d)?(ea(a),!0):!1}function pa(a,b,c){if(!c)return!1;var d=na(a);return ba(c,"onKeyUp",d)?(ea(a),!0):!1}function qa(a,b,c){if(!c)return!1;if(0===a.which)return!1;var d={charCode:a.which||a.keyCode};return ba(c,"onKeyPress",d)?(ea(a),!0):!1}function ra(a,b){if(null==sc)return!1;var c=sc.me.component[a];if(!c)return!1;rc=!0;var d=c(sc,b);return rc=!1,d}function sa(a){for(;a;){var b=a.style;if(b){var c=b.pointerEvents;if(void 0!==c)return"none"===c?!0:!1}a=a.parent}return!1}function ta(a){var b=A(a);return sa(b)}function ua(a){if(a.length){for(var b=a.length-1;b>=0;--b)a[b].t.style.visibility=a[b].p;return!0}return!1}function va(a,b){a.push({t:b,p:b.style.visibility}),b.style.visibility="hidden"}function wa(a,b,c){for(var d=[],e=b;ta(e);)va(d,e),e=document.elementFromPoint(a.x,a.y);if(ua(d)){try{e.dispatchEvent(a)}catch(f){return!1}return ea(a),!0}return!1}function xa(a,b){N(a,5,b)}function ya(a){return"mouse"==a?0:"pen"==a?2:1}function za(a,b,c,d){for(var e=[],f=c;sa(d);)va(e,f),f=document.elementFromPoint(a,b),d=A(f);return ua(e),[f,d]}function Aa(a){return function(b,c,d){if(sa(d)){var e=za(b.x,b.y,c,d);c=e[0],d=e[1]}var f=b.button+1,g=ya(b.pointerType),h=b.buttons;if(0===f&&0===g&&h)for(f=1;!(1&h);)h>>=1,f++;var i={id:b.pointerId,type:g,x:b.clientX,y:b.clientY,button:f,shift:b.shiftKey,ctrl:b.ctrlKey,alt:b.altKey,meta:b.metaKey||!1};return O("!"+a,i,c,d)?(ea(b),!0):!1}}function Ba(a){return function(b,c,d){for(var e=!1,f=0;f<b.changedTouches.length;f++){var g=b.changedTouches[f];c=document.elementFromPoint(g.clientX,g.clientY),d=A(c);var h={id:g.identifier+2,type:1,x:g.clientX,y:g.clientY,button:1,shift:b.shiftKey,ctrl:b.ctrlKey,alt:b.altKey,meta:b.metaKey||!1};O("!"+a,h,c,d)&&(e=!0)}return e?(ea(b),!0):!1}}function Ca(a){return function(b,c,d){if(c=document.elementFromPoint(b.clientX,b.clientY),d=A(c),sa(d)){var e=za(b.clientX,b.clientY,c,d);c=e[0],d=e[1]}var f={id:1,type:0,x:b.clientX,y:b.clientY,button:Ma(b),shift:b.shiftKey,ctrl:b.ctrlKey,alt:b.altKey,meta:b.metaKey||!1};return O("!"+a,f,c,d)?(ea(b),!0):!1}}function Da(a,b,c){return Math.abs(a-b)<c}function Ea(a){Fc=a;var b=document.elementFromPoint(a.x,a.y),c=z(b),d=0==c.length?null:c[c.length-1];if(sa(d)){var e=za(a.x,a.y,b,d);b=e[0],c=z(b)}ba(d,"onMouseOver",a);for(var f=0;f<Gc.length&&f<c.length&&Gc[f]===c[f];)f++;var g,h,i=Gc.length;for(i>0&&(g=Gc[i-1],g&&(h=g.component,h&&h.onMouseOut&&h.onMouseOut(g.ctx,a)));i>f;)i--,g=Gc[i],g&&(h=g.component,h&&h.onMouseLeave&&h.onMouseLeave(g.ctx,a));for(;i<c.length;)g=c[i],g&&(h=g.component,h&&h.onMouseEnter&&h.onMouseEnter(g.ctx,a)),i++;return Gc=c,i>0&&(g=Gc[i-1],g&&(h=g.component,h&&h.onMouseIn&&h.onMouseIn(g.ctx,a))),!1}function Fa(){return 0===Object.keys(yc).length}function Ga(a,b,c){return-1===Ac&&Fa()&&(Ac=a.id,Bc=zb(),Cc=a.x,Dc=a.y,Ec=!1,Ea(a)),yc[a.id]=a.type,Ac!==a.id&&(Ec=!0),!1}function Ha(a,b,c){return 0===a.type&&0===a.button&&null!=yc[a.id]&&(a.button=1,O("!PointerUp",a,b,c),a.button=0),Ac===a.id?(Ea(a),Da(Cc,a.x,13)&&Da(Dc,a.y,13)||(Ec=!0)):Fa()&&Ea(a),!1}function Ia(a,b,c){if(delete yc[a.id],Ac==a.id&&(Ea(a),Ac=-1,1==a.type&&!Ec&&zb()-Bc<750)){O("!PointerCancel",a,b,c);var d=ra(tc,a)||null!=ba(c,tc,a),e=j()?800:500;return zc.push([a.x,a.y,zb()+e,d?1:0]),d}return!1}function Ja(a,b,c){return delete yc[a.id],Ac==a.id&&(Ac=-1),!1}function Ka(a,b,c){for(var d=zb(),e=0;e<zc.length;e++){var f=zc[e];if(f[2]<d)zc.splice(e,1),e--;else if(Da(f[0],a.clientX,50)&&Da(f[1],a.clientY,50))return zc.splice(e,1),f[3]&&ea(a),!0}return!1}function La(a){return function(b,c,d){return(Ac==b.id||Fa())&&(ra(a,b)||ba(d,a,b))?!0:!1}}function Ma(a){return a.which||a.button}function Na(a){return function(b,c,d){var e=Ma(b)||1;if(1!==e)return!1;var f={x:b.clientX,y:b.clientY,button:e,shift:b.shiftKey,ctrl:b.ctrlKey,alt:b.altKey,meta:b.metaKey||!1};return ra(a,f)||ba(d,a,f)?(ea(b),!0):!1}}function Oa(a,b){var c=document.elementFromPoint(a,b),d=A(c);if(sa(d)){var e=za(a,b,c,d);d=e[1]}return d}function Pa(a,b,c){for(;c;){var d=c.style;if(d){var e=d.userSelect;if("none"===e)return ea(a),!0;if(e)break}c=c.parent}return!1}function Qa(a,b,c){if(sa(c)){var d=za(a.x,a.y,b,c);b=d[0],c=d[1]}var e=a.button+1,f=a.buttons;if(0===e&&f)for(e=1;!(1&f);)f>>=1,e++;var g,h=0;"mousewheel"==Kc?(g=-1/40*a.wheelDelta,a.wheelDeltaX&&(h=-1/40*a.wheelDeltaX)):(h=a.deltaX,g=a.deltaY);var i={dx:h,dy:g,x:a.clientX,y:a.clientY,button:e,shift:a.shiftKey,ctrl:a.ctrlKey,alt:a.altKey,meta:a.metaKey||!1};return ra("onMouseWheel",i)||ba(c,"onMouseWheel",i)?(ea(a),!0):!1}function Ra(){var a=document.hasFocus()?document.activeElement:null;if(a!==Lc){Lc=a;for(var b=z(Lc),c=0;c<Nc.length&&c<b.length&&Nc[c]===b[c];)c++;var d,e,f=Nc.length-1;for(f>=c&&(d=Nc[f],d&&(e=d.component,e&&e.onBlur&&e.onBlur(d.ctx)),f--);f>=c;)d=Nc[f],d&&(e=d.component,e&&e.onFocusOut&&e.onFocusOut(d.ctx)),f--;for(f=c;f+1<b.length;)d=b[f],d&&(e=d.component,e&&e.onFocusIn&&e.onFocusIn(d.ctx)),f++;f<b.length&&(d=b[f],d&&(e=d.component,e&&e.onFocus&&e.onFocus(d.ctx)),f++),Nc=b,Mc=0==Nc.length?null:Nc[Nc.length-1]}}function Sa(){setTimeout(Ra,10),Ra()}function Ta(a,b,c){for(var d={node:c},e=0;e<Oc.length;e++)Oc[e](d);return!1}function Ua(){if(null==Uc){var a=document.body.style;Pc=a.cursor,Qc=a[Xc],a[Xc]="none",Uc=Z(Wa)}}function Va(){var a="no-drop";if(0!==Sc.length){var b=Sc[0];if(b.beforeDrag)return"";if(null!=b.cursor)return b.cursor;if(b.system)return"";switch(b.operation){case 3:a="move";break;case 1:a="alias";break;case 2:a="copy"}}return a}function Wa(){return{component:$c}}function Xa(a,b,c){var d=ad[a.id];if(d&&d.cancelDnd(),a.button<=1){d=new Yc(a.id),d.startX=a.x,d.startY=a.y,d.lastX=a.x,d.lastY=a.y,d.overNode=c,Za(d,a);var e=ba(c,"onDragStart",d);if(e){var f=D(e.me);if(null==f)return d.destroy(),!1;d.started=!0;var g=f.getBoundingClientRect;if(g){var h=g.call(f);d.deltaX=h.left-a.x,d.deltaY=h.top-a.y}d.distanceToStart<=0&&(d.beforeDrag=!1,Ya(c,d)),Ua()}else d.destroy()}return!1}function Ya(a,b){b.overNode=a,b.targetCtx=ba(a,"onDragOver",b),null==b.targetCtx&&(b.operation=0),da("onDrag",b)}function Za(a,b){a.shift=b.shift,a.ctrl=b.ctrl,a.alt=b.alt,a.meta=b.meta,a.x=b.x,a.y=b.y}function $a(a,b,c){var d=ad[a.id];if(!d)return!1;if(d.totalX+=Math.abs(a.x-d.lastX),d.totalY+=Math.abs(a.y-d.lastY),d.beforeDrag){if(d.totalX+d.totalY<=d.distanceToStart)return d.lastX=a.x,d.lastY=a.y,!1;d.beforeDrag=!1}return Za(d,a),Ya(c,d),d.lastX=a.x,d.lastY=a.y,!0}function _a(a,b,c){var d=ad[a.id];if(!d)return!1;if(!d.beforeDrag){Za(d,a),Ya(c,d);var e=d.targetCtx;return e&&ba(e.me,"onDrop",d)?d.destroy():d.cancelDnd(),Cb(a.x,a.y),!0}return d.destroy(),!1}function ab(a,b,c){var d=ad[a.id];return d?(d.beforeDrag?d.destroy():d.cancelDnd(),!1):!1}function bb(a,b){a.shift=b.shiftKey,a.ctrl=b.ctrlKey,a.alt=b.altKey,a.meta=b.metaKey,a.x=b.clientX,a.y=b.clientY,a.totalX+=Math.abs(a.x-a.lastX),a.totalY+=Math.abs(a.y-a.lastY);var c=Oa(a.x,a.y);Ya(c,a),a.lastX=a.x,a.lastY=a.y}function cb(a,b,c){var d=Tc;null!=d&&d.destroy();var e=Object.keys(ad);if(e.length>0)d=ad[e[0]],d.system=!0,Tc=d;else{var f=a.clientX,g=a.clientY;d=new Yc(-1),d.system=!0,Tc=d,d.x=f,d.y=g,d.lastX=f,d.lastY=g,d.startX=f,d.startY=g;var h=ba(c,"onDragStart",d);if(!h)return d.destroy(),!1;var i=D(h.me);if(null==i)return d.destroy(),!1;d.started=!0;var j=i.getBoundingClientRect;if(j){var k=j.call(i);d.deltaX=k.left-f,d.deltaY=k.top-g}Ua()}d.beforeDrag=!1;var l=bd[d.enabledOperations],m=a.dataTransfer;if(m.effectAllowed=l,m.setDragImage){var n=document.createElement("div");n.style.pointerEvents="none",m.setDragImage(n,0,0)}else{var o=a.target.style,p=o.opacity,q=o.width,r=o.height,s=o.padding;o.opacity="0",o.width="0",o.height="0",o.padding="0",window.setTimeout(function(){o.opacity=p,o.width=q,o.height=r,o.padding=s},0)}for(var t=d.data,u=Object.keys(t),v=0;v<u.length;v++)try{var w=u[v],x=t[w];"string"!=typeof x&&(x=JSON.stringify(x)),a.dataTransfer.setData(w,x)}catch(y){}return bb(d,a),!1}function db(a,b){a.dataTransfer.dropEffect=["none","link","copy","move"][b]}function eb(a,b,c){var d=Tc;if(null==d){d=new Yc(-1),d.system=!0,Tc=d,d.x=a.clientX,d.y=a.clientY,d.startX=d.x,d.startY=d.y,d.local=!1;var e=a.dataTransfer,f=0;try{var g=e.effectAllowed}catch(h){}for(;7>f&&bd[f]!==g;f++);d.enabledOperations=f;var i=e.types;if(i)for(var j=0;j<i.length;j++){var k=i[j];"text/plain"===k?k="Text":"text/uri-list"===k&&(k="Url"),d.data[k]=null}else void 0!==e.getData("Text")&&(d.data.Text=null)}return bb(d,a),db(a,d.operation),0!=d.operation?(ea(a),!0):!1}function fb(a,b,c){var d=a.clientX,e=a.clientY,f=ha();return null!=Tc&&(0===d&&0===e||0>d||0>e||d>=f.width||e>=f.height)&&(Tc.x=0,Tc.y=0,Tc.operation=0,da("onDrag",Tc)),!1}function gb(a,b,c){return null!=Tc&&Tc.destroy(),!1}function hb(a,b,c){var d=Tc;if(null==d)return!1;if(d.x=a.clientX,d.y=a.clientY,!d.local)for(var e=Object.keys(d.data),f=a.dataTransfer,g=0;g<e.length;g++){var h,i=e[g];h="Files"===i?[].slice.call(f.files,0):f.getData(i),d.data[i]=h}bb(d,a);var j=d.targetCtx;return j&&ba(j.me,"onDrop",d)?(db(a,d.operation),d.destroy(),ea(a)):d.cancelDnd(),!0}function ib(a,b,c){return ea(a),!0}function jb(a,b,c){return 0===Sc.length?!1:(ea(a),!0)}function kb(){return cd>=0&&clearTimeout(cd),cd=-1,Ab(),!1}function lb(a){var b=md.exec(a);if(!b)return dd[a].name;var c=b.index;return dd[a.substring(0,c)].name+a.substring(c)}function mb(a,b){var c="";if(a)if(Eb(a))for(var d=0;d<a.length;d++)d>0&&(c+=","),c+="."+lb(a[d])+"."+b;else c="."+lb(a)+"."+b;else c="."+b;return c}function nb(a,b,c,d){if("string"==typeof c){var f=dd[c];if(void 0===f)throw new Error("uknown style "+c);nb(a,b,f.style,f.pseudo)}else if("function"==typeof c)c(a,b);else if(Eb(c))for(var g=0;g<c.length;g++)nb(a,b,c[g],void 0);else if("object"==typeof c)for(var h in c)if(Object.prototype.hasOwnProperty.call(c,h)){var i=c[h];"function"==typeof i&&(i=i(a,h)),a[h]=i}if(null!=d&&null!=b)for(var j in d){var k=b[j];void 0===k&&(k=e(),b[j]=k),nb(k,void 0,d[j],void 0)}}function ob(){if(hd){for(var a=0;a<fd.length;a++){var b=fd[a],c=gd[b.url];if(null!=c){var d=b.color();if(d!==b.lastColor){b.lastColor=d,null==b.width&&(b.width=c.width),null==b.height&&(b.height=c.height);var f=vb(c,d,b.width,b.height,b.left,b.top),g=dd[b.styleid];g.style={backgroundImage:"url("+f+")",width:b.width,height:b.height}}}}var h="";for(var i in dd){var j=dd[i],l=j.parent,m=j.name,n=j.pseudo,o=j.style;if("function"==typeof o&&0===o.length&&(x=o(),o=x[0],n=x[1]),"string"!=typeof o||null!=n){j.realname=m;var p=e(),q=e();nb(void 0,q,void 0,n),nb(p,q,o,void 0);var r=null;p.pointerEvents&&(r=e(),r.pointerEvents=p.pointerEvents),kd&&p.userSelect&&(null==r&&(r=e()),r.userSelect=p.userSelect,delete p.userSelect),j.inlStyle=r,k(p);var s=rb(p);s.length>0&&(h+=mb(l,m)+" {"+s+"}\n");for(var t in q){var u=q[t];k(u),h+=mb(l,m+":"+t)+" {"+rb(u)+"}\n"}}else j.realname=o}var v=document.createElement("style");v.type="text/css",v.styleSheet?v.styleSheet.cssText=h:v.appendChild(document.createTextNode(h));var w=document.head||document.getElementsByTagName("head")[0];null!=id?w.replaceChild(v,id):w.appendChild(v),id=v,hd=!1}ld();var x}function pb(a){for(var b=[],c=1;c<arguments.length;c++)b[c-1]=arguments[c];for(var d=a.className,e=a.style,f=null,g=0,h=b;;)if(h.length!==g){var i=h[g];if(null==i||"boolean"==typeof i||""===i);else if("string"==typeof i){var j=dd[i];d=null==d?j.realname:d+" "+j.realname;var k=j.inlStyle;k&&(null==e&&(e={}),e=yb(e,k))}else{if(Eb(i)){h.length>g+1&&(null==f&&(f=[]),f.push(g),f.push(h)),h=i,g=0;continue}null==e&&(e={}),e=yb(e,i)}g++}else{if(null===f||0===f.length)break;h=f.pop(),g=f.pop()+1}return a.className=d,a.style=e,a}function qb(a){return"cssFloat"===a?"float":a.replace(nd,"-$1").toLowerCase().replace(od,"-ms-")}function rb(a){var b="";for(var c in a){var d=a[c];void 0!==d&&(b+=qb(c)+":"+(""===d?'""':d)+";")}return b=b.slice(0,-1)}function sb(a,b,c){return tb(null,a,b,c)}function tb(a,b,c,d){if(d&&"b-"!==d){if(ed[d]){for(var e=1;ed[d+e];)e++;d+=e}ed[d]=!0}else d="b-"+jd++;return dd[d]={name:d,realname:d,parent:a,style:b,inlStyle:null,pseudo:c},ub(),d}function ub(){hd=!0,Ab()}function vb(a,b,c,d,e,f){var g=document.createElement("canvas");g.width=c,g.height=d;var h=g.getContext("2d");h.drawImage(a,-e,-f);var i,j,k,l,m=h.getImageData(0,0,c,d),n=m.data,o=pd.exec(b);if(o?(i=parseInt(o[1],10),j=parseInt(o[2],10),k=parseInt(o[3],10),l=Math.round(255*parseFloat(o[4]))):(i=parseInt(b.substr(1,2),16),j=parseInt(b.substr(3,2),16),k=parseInt(b.substr(5,2),16),l=parseInt(b.substr(7,2),16)||255),255===l)for(var p=0;p<n.length;p+=4){var q=n[p];q===n[p+1]&&q===n[p+2]&&(128===q||n[p+3]<255&&q>112)&&(n[p]=i,n[p+1]=j,n[p+2]=k)}else for(var p=0;p<n.length;p+=4){var q=n[p],r=n[p+3];q===n[p+1]&&q===n[p+2]&&(128===q||255>r&&q>112)&&(255===r?(n[p]=i,n[p+1]=j,n[p+2]=k,n[p+3]=l):(r*=1/255,n[p]=Math.round(i*r),n[p+1]=Math.round(j*r),n[p+2]=Math.round(k*r),n[p+3]=Math.round(l*r)))}return h.putImageData(m,0,0),g.toDataURL()}function wb(a){return function(b){var c=b&&b.color,d=b&&b.size||24,e={tag:"svg",attrs:{viewBox:"0 0 24 24"},children:a};return pb(e,qd),c&&pb(e,{fill:c}),24!==d&&pb(e,{height:d,width:d}),e}}function xb(a){var b={tag:"path",attrs:{d:a}};return wb(b)}var yb,zb,Ab,Bb,Cb,Db,Eb=Array.isArray,Fb="textContent"in a("");null==Object.assign&&(Object.assign=function(a){for(var b=[],c=1;c<arguments.length;c++)b[c-1]=arguments[c];if(null==a)throw new TypeError("Target in assign cannot be undefined or null");for(var d=arguments.length,e=1;d>e;e++){var f=arguments[e];if(null!=f)for(var g=Object.keys(f),h=g.length,i=0;h>i;i++){var j=g[i];a[j]=f[j]}}return a}),yb=Object.assign;var Gb=!1,Hb=[],Ib=[],Jb=function(a,b,c,d){c!==d&&(a.value=c)},Kb=["Webkit","Moz","ms","O"],Lb=document.createElement("div").style,Mb=e(),Nb={boxFlex:!0,boxFlexGroup:!0,columnCount:!0,flex:!0,flexGrow:!0,flexNegative:!0,flexPositive:!0,flexShrink:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,strokeDashoffset:!0,widows:!0,zIndex:!0,zoom:!0},Ob=e(),Pb=!1,Qb=window.requestAnimationFrame;Qb&&Qb(function(a){a===+a&&(Pb=!0)}),zb=Date.now||function(){return(new Date).getTime()};var Rb,Sb=zb(),Tb=0,Ub="$invalidated",Vb="$deepness",Wb=!0,Xb=!1,Yb=0,Zb=0,$b=0,_b=0,ac={},bc=function(){},cc=function(){},dc=!1,ec=!1;Ab=function(a,b){Wb||(null!=a?(void 0==b&&(b=1e6),a[Ub]!==Zb+1?(a[Ub]=Zb+1,a[Vb]=b):b>a[Vb]&&(a[Vb]=b)):Wb=!0,Xb||(Xb=!0,M(V)))};for(var fc=0,gc=Y,hc=null,ic=[[414,800,900],[736,1280,1440]],jc=["resize","orientationchange"],kc=0;kc<jc.length;kc++)N(jc[kc],10,ga);var lc,mc=window.document.documentElement,nc=/Android/i.test(navigator.userAgent);Bb=function(){function a(){var a=b;b=[];for(var c=0,d=a.length;d>c;c++)a[c]()}var b=[],c="onreadystatechange";if(window.MutationObserver){var d=document.createElement("div");return new MutationObserver(a).observe(d,{attributes:!0}),function(a){b.length||d.setAttribute("yes","no"),b.push(a)}}if(!window.setImmediate&&window.postMessage&&window.addEventListener){var e="basap"+Math.random(),f=!1,g=function(b){b.source===window&&b.data===e&&(f=!1,a())};return window.addEventListener("message",g,!1),function(a){b.push(a),f||(f=!0,window.postMessage(e,"*"))}}if(!window.setImmediate&&c in document.createElement("script")){var h;return function(d){b.push(d),h||(h=document.createElement("script"),h[c]=function(){h[c]=null,h.parentNode.removeChild(h),h=null,a()},document.body.appendChild(h))}}var i,j=window.setImmediate||setTimeout;return function(c){b.push(c),i||(i=j(function(){i=void 0,a()},0))}}(),window.Promise||!function(){function a(a,b){return function(){a.apply(b,arguments)}}function b(a){var b=this;return null===this.s?void this.d.push(a):void Bb(function(){var c=b.s?a[0]:a[1];if(null==c)return void(b.s?a[2]:a[3])(b.v);var d;try{d=c(b.v)}catch(e){return void a[3](e)}a[2](d)})}function c(){for(var a=0,c=this.d.length;c>a;a++)b.call(this,this.d[a]);this.d=null}function d(a){this.s=!1,this.v=a,c.call(this)}function e(a,b,c){var d=!1;try{a(function(a){d||(d=!0,b(a))},function(a){d||(d=!0,c(a))})}catch(e){if(d)return;d=!0,c(e)}}function f(b){try{if(b===this)throw new TypeError("Promise selfresolve");if(Object(b)===b){var g=b.then;if("function"==typeof g)return void e(a(g,b),a(f,this),a(d,this))}this.s=!0,this.v=b,c.call(this)}catch(h){d.call(this,h)}}function g(b){this.s=null,this.v=null,this.d=[],e(b,a(f,this),a(d,this))}g.prototype.then=function(a,c){var d=this;return new g(function(e,f){b.call(d,[a,c,e,f])})},g.prototype["catch"]=function(a){return this.then(void 0,a)},g.all=function(){var a=[].slice.call(1===arguments.length&&Eb(arguments[0])?arguments[0]:arguments);return new g(function(b,c){function d(f,g){try{if(g&&("object"==typeof g||"function"==typeof g)){var h=g.then;if("function"==typeof h)return void h.call(g,function(a){d(f,a)},c)}a[f]=g,0===--e&&b(a)}catch(i){c(i)}}if(0===a.length)return void b(a);for(var e=a.length,f=0;f<a.length;f++)d(f,a[f])})},g.resolve=function(a){return a&&"object"==typeof a&&a.constructor===g?a:new g(function(b){b(a)})},g.reject=function(a){return new g(function(b,c){c(a)})},g.race=function(a){return new g(function(b,c){for(var d=0,e=a.length;e>d;d++)a[d].then(b,c)})},window.Promise=g}(),9===j()?!function(){function a(a,b){null==a.zoom&&(a.zoom="1");var c=a.filter;a.filter=null==c?b:c+" "+b}var b=/^linear\-gradient\(to (.+?),(.+?),(.+?)\)/gi;fa("background",function(c,d,e){var f=b.exec(d);if(null!=f){var g,h=f[1],i=f[2],j=f[3];switch(h){case"top":h="0",g=i,i=j,j=g;break;case"bottom":h="0";break;case"left":h="1",g=i,i=j,j=g;break;case"right":h="1";break;default:return}c[e]="none",a(c,"progid:DXImageTransform.Microsoft.gradient(startColorstr='"+i+"',endColorstr='"+j+"', gradientType='"+h+"')")}})}():!function(){var a=document.createElement("div").style;a.cssText="background:-webkit-linear-gradient(top,red,red)",a.background.length>0&&!function(){function a(a,d,e){if(b.test(d)){var f=d.indexOf("(to ");if(f>0){f+=4;var g=d.indexOf(",",f),h=d.slice(f,g);h=h.split(" ").map(function(a){return c[a]||a}).join(" "),d=d.slice(0,f-3)+h+d.slice(g)}d="-webkit-"+d}a[e]=d}var b=/^(?:repeating\-)?(?:linear|radial)\-gradient/gi,c={top:"bottom",bottom:"top",left:"right",right:"left"};fa("background",a)}()}();for(var oc="b$value",pc="value",qc=d(function(a,b,c,d){var e=a.tagName,f="SELECT"===e,g="INPUT"===e||"TEXTAREA"===e;if(!g&&!f)return void qc(a,b,c,d);void 0===b.ctx&&(b.ctx={}),void 0===d&&(b.ctx[oc]=c);var h=f&&a.multiple,i=!1;if(h){var j=a.options,k=la(j);if(!ja(c,k))if(void 0===d||ja(k,d)||!ja(c,b.ctx[oc])){for(var l=0;l<j.length;l++)j[l].selected=ka(c,j[l].value);k=la(j),ja(k,c)&&(i=!0)}else i=!0;
}else if(g||f)if(g&&ia(a)){var m=a.checked;c!==m&&(void 0===d||m===d||c!==b.ctx[oc]?a.checked=c:i=!0)}else{var n=f&&a.size<2,o=a[pc];c!==o&&(void 0===d||o===d||c!==b.ctx[oc]?f?(""===c?a.selectedIndex=n?0:-1:a[pc]=c,(""!==c||n)&&(o=a[pc],c!==o&&(i=!0))):a[pc]=c:i=!0)}i?ma(null,a,b):b.ctx[oc]=c}),jc=["input","cut","paste","keydown","keypress","keyup","click","change"],kc=0;kc<jc.length;kc++)N(jc[kc],10,ma);N("keydown",50,oa),N("keyup",50,pa),N("keypress",50,qa);var rc,kc,sc=null,tc="onClick",uc=["PointerDown","PointerMove","PointerUp","PointerCancel"];if(j()&&j()<11){var vc=["click","dblclick","drag","dragend","dragenter","dragleave","dragover","dragstart","drop","mousedown","mousemove","mouseout","mouseover","mouseup","mousewheel","scroll","wheel"];for(kc=0;kc<vc.length;++kc)N(vc[kc],1,wa)}if(void 0!==window.onpointerdown)for(kc=0;4>kc;kc++){var wc=uc[kc];xa(wc.toLowerCase(),Aa(wc))}else if(void 0!==window.onmspointerdown)for(kc=0;4>kc;kc++){var wc=uc[kc];xa("MS"+wc,Aa(wc))}else void 0!==window.ontouchstart&&(xa("touchstart",Ba(uc[0])),xa("touchmove",Ba(uc[1])),xa("touchend",Ba(uc[2])),xa("touchcancel",Ba(uc[3]))),xa("mousedown",Ca(uc[0])),xa("mousemove",Ca(uc[1])),xa("mouseup",Ca(uc[2]));for(var xc=0;4>xc;xc++)!function(a){var b="on"+a;N("!"+a,50,function(a,c,d){return ra(b,a)||null!=ba(d,b,a)})}(uc[xc]);for(var yc=e(),zc=[],Ac=-1,Bc=0,Cc=0,Dc=0,Ec=!1,Fc=null,Gc=[],Hc=["!PointerDown","!PointerMove","!PointerUp","!PointerCancel","click"],Ic=[Ga,Ha,Ia,Ja,Ka],kc=0;5>kc;kc++)N(Hc[kc],3,Ic[kc]);for(var Jc=["Down","Move","Up","Up"],kc=0;4>kc;kc++)N(Hc[kc],80,La("onMouse"+Jc[kc]));xa("selectstart",Pa),xa("click",Na(tc)),xa("dblclick",Na("onDoubleClick"));var Kc=("onwheel"in document.createElement("div")?"":"mouse")+"wheel";xa(Kc,Qa);Cb=function(a,b){var c=j()?800:500;zc.push([a,b,zb()+c,1])};for(var Lc=null,Mc=null,Nc=[],jc=["focus","blur","keydown","keyup","keypress","mousedown","mouseup","mousemove","touchstart","touchend"],kc=0;kc<jc.length;kc++)N(jc[kc],50,j()?Sa:Ra);var Oc=[];N("^scroll",10,Ta);var Pc,Qc,Rc=0,Sc=[],Tc=null,Uc=null,Vc={userSelect:""};k(Vc);var Wc=Object.keys(Vc),Xc=Wc[Wc.length-1],Yc=function(a){this.id=++Rc,this.pointerid=a,this.enabledOperations=7,this.operation=0,this.started=!1,this.beforeDrag=!0,this.local=!0,this.system=!1,this.ended=!1,this.cursor=null,this.overNode=null,this.targetCtx=null,this.dragView=null,this.startX=0,this.startY=0,this.distanceToStart=10,this.x=0,this.y=0,this.deltaX=0,this.deltaY=0,this.totalX=0,this.totalY=0,this.lastX=0,this.lastY=0,this.shift=!1,this.ctrl=!1,this.alt=!1,this.meta=!1,this.data=e(),a>=0&&(ad[a]=this),Sc.push(this)},Zc={render:function(a,b){var c=a.data;b.tag="div",b.style={position:"absolute",left:c.x,top:c.y},b.children=c.dragView(c)}},$c={render:function(a,b){for(var c=[],d=0;d<Sc.length;d++){var e=Sc[d];e.beforeDrag||null==e.dragView||0==e.x&&0==e.y||c.push({key:""+e.id,data:e,component:Zc})}b.tag="div",b.style={position:"fixed",pointerEvents:"none",userSelect:"none",left:0,top:0,right:0,bottom:0};var f=document.body.style,g=Va();g&&f.cursor!==g&&(f.cursor=g),b.children=c},onDrag:function(a){return Ab(a),!1}},_c=Yc.prototype;_c.setOperation=function(a){this.operation=a},_c.setDragNodeView=function(a){this.dragView=a},_c.addData=function(a,b){return this.data[a]=b,!0},_c.listData=function(){return Object.keys(this.data)},_c.hasData=function(a){return void 0!==this.data[a]},_c.getData=function(a){return this.data[a]},_c.setEnabledOps=function(a){this.enabledOperations=a},_c.cancelDnd=function(){Ya(null,this),this.destroy()},_c.destroy=function(){this.ended=!0,this.started&&da("onDragEnd",this),delete ad[this.pointerid];for(var a=0;a<Sc.length;a++)if(Sc[a]===this){Sc.splice(a,1);break}if(Tc===this&&(Tc=null),0===Sc.length&&null!=Uc){$(Uc),Uc=null;var b=document.body.style;b.cursor=Pc,b[Xc]=Qc}};var ad=e(),bd=["none","link","copy","copyLink","move","linkMove","copyMove","all"];N("!PointerDown",4,Xa),N("!PointerMove",4,$a),N("!PointerUp",4,_a),N("!PointerCancel",4,ab),N("selectstart",4,jb),N("dragstart",5,cb),N("dragover",5,eb),N("dragend",5,gb),N("drag",5,fb),N("drop",5,hb),N("dragenter",5,ib),N("dragleave",5,ib),Db=function(){return Sc};var cd=-1;N("hashchange",10,kb);var dd=(e(),e()),ed=(e(),e()),fd=[],gd=e(),hd=!1,id=null,jd=0,kd=9===j(),ld=S(ob),md=/\:|\ |\>/,nd=/([A-Z])/g,od=/^ms-/,pd=/\s*rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d+|\d*\.\d+)\s*\)\s*/;window.bobrilBPath||"bundle.png";window.b||(window.b={deref:A,getRoots:_,setInvalidate:X,invalidateStyles:ub,ignoreShouldChange:W,setAfterFrame:T,setBeforeFrame:S,getDnds:Db});var qd=sb({display:"inline-block",fill:"#000",height:24,width:24,userSelect:"none",transition:"all 450ms cubic-bezier(0.23, 1, 0.32, 1)"}),rd=xb("M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z");aa(function(){return rd()})}();