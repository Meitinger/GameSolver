!function(){function t(t){return t&&t.__esModule?t.default:t}function e(t,e,r,n){Object.defineProperty(t,e,{get:r,set:n,enumerable:!0,configurable:!0})}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},i=r.parcelRequirec9a8;null==i&&((i=function(t){if(t in n)return n[t].exports;if(t in o){var e=o[t];delete o[t];var r={id:t,exports:{}};return n[t]=r,e.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){o[t]=e},r.parcelRequirec9a8=i),importScripts("./tictactoe.b26777f7.js");var a={};e(a,"Schema",(function(){return p})),e(a,"TicTacToe",(function(){return y}));var c=i("e6kUJ"),u={},s=function(t){var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),a=new P(n||[]);return i._invoke=function(t,e,r){var n=f;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===y){if("throw"===o)throw i;return j()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=E(a,r);if(c){if(c===d)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var u=l(t,e,r);if("normal"===u.type){if(n=r.done?y:h,u.arg===d)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=y,r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f="suspendedStart",h="suspendedYield",p="executing",y="completed",d={};function v(){}function g(){}function m(){}var w={};u(w,i,(function(){return this}));var b=Object.getPrototypeOf,x=b&&b(b(O([])));x&&x!==r&&n.call(x,i)&&(w=x);var k=m.prototype=v.prototype=Object.create(w);function T(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function r(o,i,a,c){var u=l(t[o],t,i);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return r("throw",t,a,c)}))}c(u.arg)}var o;this._invoke=function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}}function E(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,E(t,r),"throw"===r.method))return d;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,d;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,d):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,d)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function O(t){if(t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:j}}function j(){return{value:e,done:!0}}return g.prototype=m,u(k,"constructor",m),u(m,"constructor",g),g.displayName=u(m,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u(t,c,"GeneratorFunction")),t.prototype=Object.create(k),t},t.awrap=function(t){return{__await:t}},T(L.prototype),u(L.prototype,a,(function(){return this})),t.AsyncIterator=L,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new L(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},T(k),u(k,c,"Generator"),u(k,i,(function(){return this})),u(k,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=O,P.prototype={constructor:P,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(_),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:O(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),d}},t}(u);try{regeneratorRuntime=s}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=s:Function("r","regeneratorRuntime = r")(s)}var l=i("PAmCh"),f=i("1zfaW"),h=2*Math.PI,p={type:"object",properties:{board:{type:"array",description:"Specifies the initial board setup, one array per horizontal line.",minItems:3,maxItems:3,items:{type:"array",description:"Specifies the three spaces of one horizontal line.",minItems:3,maxItems:3,items:{type:"string",description:'"x" for player X, "o" for player O or " " if no one has marked the space yet.',enum:[" ","x","o"]}}},start:{type:"string",description:'Specifies the player who should start, either "x" for player X or "o" for player O.',enum:["x","o"]}},required:["board","start"],additionalProperties:!1},y=function(e){"use strict";function r(){var t;return c.classCallCheck(this,r),(t=c.possibleConstructorReturn(this,c.getPrototypeOf(r).apply(this,arguments))).schema=p,t}return c.inherits(r,e),c.createClass(r,[{key:"getPlayers",value:function(){return[{name:"x",color:"#0f0"},{name:"o",color:"#f00"}]}},{key:"encodeState",value:function(t){var e=c.slicedToArray(t,3),r=((e[0]?524288:0)|e[1]<<9|e[2]).toString(16);return"0".repeat(5-r.length)+r}},{key:"decodeState",value:function(t){var e=parseInt(t,16);return[0==(524288&e),e>>9&1023,1023&e]}},{key:"getInitialState",value:function(){var t=this.getSetup(),e=0,r=0;return t.board.forEach((function(t,n){return t.forEach((function(t,o){var i=1<<3*n+o;switch(t){case"o":r|=i;break;case"x":e|=i}}))})),["x"===t.start,e,r]}},{key:"getNextStates",value:t(u).mark((function e(r){var n,o,i,a,s,l,f,h;return t(u).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=c.slicedToArray(r,3),o=n[0],i=n[1],a=n[2],!this.isWinning(i)&&!this.isWinning(a)){t.next=3;break}return t.abrupt("return");case 3:s=o?i:a,l=o?a:i,f=8;case 6:if(!(f>=0)){t.next=14;break}if(0!=(s&(h=1<<f))||0!=(l&h)){t.next=11;break}return t.next=11,o?[0,[[!1,s|h,l]]]:[1,[[!0,l,s|h]]];case 11:f--,t.next=6;break;case 14:case"end":return t.stop()}}),e,this)}))},{key:"isWinning",value:function(t){return 7==(7&t)||56==(56&t)||448==(448&t)||73==(73&t)||146==(146&t)||292==(292&t)||273==(273&t)||84==(84&t)}},{key:"getWinningPlayersFromState",value:t(u).mark((function e(r){var n,o,i;return t(u).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=c.slicedToArray(r,3),o=n[1],i=n[2],!this.isWinning(o)){t.next=4;break}return t.next=4,0;case 4:if(!this.isWinning(i)){t.next=7;break}return t.next=7,1;case 7:case"end":return t.stop()}}),e,this)}))},{key:"renderState",value:function(t,e,r,n){var o=Math.min(e,r),i=(e-o)/2,a=(r-o)/2,u=o/3,s=2*o/3,l=o/6,f=o/12;n.lineWidth=Math.max(o/72,1),n.strokeStyle="black",n.beginPath(),n.moveTo(i,a+u),n.lineTo(i+o,a+u),n.stroke(),n.beginPath(),n.moveTo(i,a+s),n.lineTo(i+o,a+s),n.stroke(),n.beginPath(),n.moveTo(i+u,a),n.lineTo(i+u,a+o),n.stroke(),n.beginPath(),n.moveTo(i+s,a),n.lineTo(i+s,a+o),n.stroke();for(var p=c.slicedToArray(t,3),y=p[1],d=p[2],v=0;v<3;v++)for(var g=0;g<3;g++){var m=1<<3*v+g,w=i+l*(2*g+1),b=a+l*(2*v+1);0!=(y&m)&&(n.strokeStyle="green",n.beginPath(),n.moveTo(w-f,b-f),n.lineTo(w+f,b+f),n.stroke(),n.beginPath(),n.moveTo(w-f,b+f),n.lineTo(w+f,b-f),n.stroke()),0!=(d&m)&&(n.strokeStyle="red",n.beginPath(),n.ellipse(w,b,f,f,0,0,h),n.stroke())}}}]),r}(f.TypedGame);f.isWorker()&&l.expose(new y)}();
//# sourceMappingURL=tictactoe.06a91f59.js.map
