(function(t){function e(e){for(var r,u,c=e[0],i=e[1],l=e[2],p=0,f=[];p<c.length;p++)u=c[p],Object.prototype.hasOwnProperty.call(a,u)&&a[u]&&f.push(a[u][0]),a[u]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);s&&s(e);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,c=1;c<n.length;c++){var i=n[c];0!==a[i]&&(r=!1)}r&&(o.splice(e--,1),t=u(u.s=n[0]))}return t}var r={},a={app:0},o=[];function u(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=t,u.c=r,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)u.d(n,r,function(e){return t[e]}.bind(null,r));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="/vue-bbs/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],i=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var s=i;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},1768:function(t,e,n){"use strict";n("7bcc")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("TheHeader",{attrs:{"public-path":t.publicPath}})],1)},o=[],u=n("5f5b"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-navbar",{staticClass:"mt-3 bg-light",attrs:{toggleable:"lg",type:"light",variant:"info"}},[n("b-navbar-brand",{attrs:{href:"/"}},[n("img",{attrs:{width:"32",src:t.logo.src,alt:t.logo.title}}),n("span",{staticClass:"title"},[t._v(t._s(t.logo.title))])]),n("b-navbar-toggle",{attrs:{target:"vue-bbs-header-navbar"}}),n("b-collapse",{attrs:{id:"vue-bbs-header-navbar","is-nav":""}},[n("b-navbar-nav",t._l(t.navList,(function(e,r){return n("b-nav-item",{key:r,attrs:{href:"#"}},[t._v(" "+t._s(e)+" ")])})),1)],1)],1)},i=[],l={name:"TheHeader",data:function(){return{logo:{src:"".concat(this.publicPath,"logo.png"),title:"Learnku Vue.js"},navList:["社区","头条","问答","教程"]}},methods:{},props:{publicPath:String}},s=l,p=(n("1768"),n("2877")),f=Object(p["a"])(s,c,i,!1,null,"c1af9208",null),b=f.exports;r["default"].use(u["a"]);var d={name:"App",components:{TheHeader:b},data:function(){return{publicPath:"/vue-bbs/"}}},v=d,h=(n("5c0b"),Object(p["a"])(v,a,o,!1,null,null,null)),g=h.exports;r["default"].config.productionTip=!1,new r["default"]({render:function(t){return t(g)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";n("9c0c")},"7bcc":function(t,e,n){},"9c0c":function(t,e,n){}});
//# sourceMappingURL=app.9d0a8c95.js.map