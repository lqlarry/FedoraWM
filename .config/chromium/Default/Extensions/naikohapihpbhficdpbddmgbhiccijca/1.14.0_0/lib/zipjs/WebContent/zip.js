/*
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
(function(u){function A(){var a=-1,b=this;b.append=function(c){var d,h=b.table;for(d=0;d<c.length;d++)a=a>>>8^h[(a^c[d])&255]};b.get=function(){return~a};}function Q(a,b,c){if(a.slice)return a.slice(b,b+c);if(a.webkitSlice)return a.webkitSlice(b,b+c);if(a.mozSlice)return a.mozSlice(b,b+c);if(a.msSlice)return a.msSlice(b,b+c)}function x(a,b){var c,d;c=new ArrayBuffer(a);d=new Uint8Array(c);b&&d.set(b,0);return{buffer:c,array:d,view:new DataView(c)}}function B(){}function C(a){var b=this,c;b.size=0;
b.init=function(d,h){var e=new Blob([a],{type:'text/plain'});c=new y(e);c.init(function(){b.size=c.size;d()},h)};b.readUint8Array=function(a,b,e,f){c.readUint8Array(a,b,e,f)};}function D(a){var b=this,c;b.size=0;b.init=function(d){for(var h=a.length;'='==a.charAt(h-1);)h--;c=a.indexOf(',')+1;b.size=Math.floor(.75*(h-c));d()};b.readUint8Array=function(b,h,e){var f=x(h),k=4*Math.floor(b/3),p=u.atob(a.substring(k+c,4*Math.ceil((b+h)/3)+c));for(b=k=b-3*Math.floor(k/4);b<k+h;b++)f.array[b-k]=p.charCodeAt(b);
e(f.array)};}function y(a){this.size=0;this.init=function(b){this.size=a.size;b()};this.readUint8Array=function(b,c,d,h){var e=new FileReader;e.onload=function(a){d(new Uint8Array(a.target.result))};e.onerror=h;e.readAsArrayBuffer(Q(a,b,c))};}function w(){}function E(a){var b;this.init=function(a){b=new Blob([],{type:'text/plain'});a()};this.writeUint8Array=function(a,d){b=new Blob([b,H?a:a.buffer],{type:'text/plain'});d()};this.getData=function(c,d){var h=new FileReader;h.onload=function(a){c(a.target.result)};
h.onerror=d;h.readAsText(b,a)};}function F(a){var b='',c='';this.init=function(c){b+='data:'+(a||'')+';base64,';c()};this.writeUint8Array=function(a,h){var e,f=c.length,k=c;c='';for(e=0;e<3*Math.floor((f+a.length)/3)-f;e++)k+=String.fromCharCode(a[e]);for(;e<a.length;e++)c+=String.fromCharCode(a[e]);2<k.length?b+=u.btoa(k):c=k;h()};this.getData=function(a){a(b+u.btoa(c))};}function G(a){var b;this.init=function(c){b=new Blob([],{type:a});c()};this.writeUint8Array=function(c,d){b=new Blob([b,H?c:c.buffer],
{type:a});d()};this.getData=function(a){a(b)};}function I(a,b,c,d,h,e,f,k,p,r){function m(b){b=b.data;var d=b.data;b.onappend&&(l+=d.length,c.writeUint8Array(d,function(){e(!1,d);g()},r));b.onflush&&(d?(l+=d.length,c.writeUint8Array(d,function(){e(!1,d);a.removeEventListener('message',m,!1);k(l)},r)):(a.removeEventListener('message',m,!1),k(l)));b.progress&&f&&f(n+b.current,h)}function g(){n=524288*q;n<h?b.readUint8Array(d+n,Math.min(524288,h-n),function(b){a.postMessage({append:!0,data:b});q++;f&&
f(n,h);e(!0,b)},p):a.postMessage({flush:!0})}var q=0,n,l;l=0;a.addEventListener('message',m,!1);g()}function J(a,b,c,d,h,e,f,k,p,r){function m(){var l;q=524288*g;q<h?b.readUint8Array(d+q,Math.min(524288,h-q),function(b){var k=a.append(b,function(){f&&f(d+q,h)});n+=k.length;e(!0,b);c.writeUint8Array(k,function(){e(!1,k);g++;setTimeout(m,1)},r);f&&f(q,h)},p):(l=a.flush())?(n+=l.length,c.writeUint8Array(l,function(){e(!1,l);k(n)},r)):k(n)}var g=0,q,n=0;m()}function K(a,b,c,d,h,e,f,k,p){function r(a,
b){h&&!a&&q.append(b)}function m(a){e(a,q.get())}var g,q=new A;u.zip.useWebWorkers?(g=new Worker(u.zip.workerScriptsPath+'inflate.js'),I(g,a,b,c,d,r,f,m,k,p)):J(new u.zip.Inflater,a,b,c,d,r,f,m,k,p);return g}function R(a,b,c,d,h,e,f){function k(a,b){a&&g.append(b)}function p(a){d(a,g.get())}function r(){m.removeEventListener('message',r,!1);I(m,a,b,0,a.size,k,h,p,e,f)}var m,g=new A;u.zip.useWebWorkers?(m=new Worker(u.zip.workerScriptsPath+'deflate.js'),m.addEventListener('message',r,!1),m.postMessage({init:!0,
level:c})):J(new u.zip.Deflater,a,b,0,a.size,k,h,p,e,f);return m}function L(a,b,c,d,h,e,f,k,p){function r(){var q=524288*m;q<d?a.readUint8Array(c+q,Math.min(524288,d-q),function(a){h&&g.append(a);f&&f(q,d,a);b.writeUint8Array(a,function(){m++;r()},p)},k):e(d,g.get())}var m=0,g=new A;r()}function M(a){var b,c='',d,h='\u00c7\u00fc\u00e9\u00e2\u00e4\u00e0\u00e5\u00e7\u00ea\u00eb\u00e8\u00ef\u00ee\u00ec\u00c4\u00c5\u00c9\u00e6\u00c6\u00f4\u00f6\u00f2\u00fb\u00f9\u00ff\u00d6\u00dc\u00f8\u00a3\u00d8\u00d7\u0192\u00e1\u00ed\u00f3\u00fa\u00f1\u00d1\u00aa\u00ba\u00bf\u00ae\u00ac\u00bd\u00bc\u00a1\u00ab\u00bb___\u00a6\u00a6\u00c1\u00c2\u00c0\u00a9\u00a6\u00a6++\u00a2\u00a5++--+-+\u00e3\u00c3++--\u00a6-+\u00a4\u00f0\u00d0\u00ca\u00cb\u00c8i\u00cd\u00ce\u00cf++__\u00a6\u00cc_\u00d3\u00df\u00d4\u00d2\u00f5\u00d5\u00b5\u00fe\u00de\u00da\u00db\u00d9\u00fd\u00dd\u00af\u00b4\u00ad\u00b1_\u00be\u00b6\u00a7\u00f7\u00b8\u00b0\u00a8\u00b7\u00b9\u00b3\u00b2_ '.split('');
for(b=0;b<a.length;b++)d=a.charCodeAt(b)&255,c=127<d?c+h[d-128]:c+String.fromCharCode(d);return c}function N(a){var b,c='';for(b=0;b<a.length;b++)c+=String.fromCharCode(a[b]);return c}function O(a,b,c,d,h){a.version=b.view.getUint16(c,!0);a.bitFlag=b.view.getUint16(c+2,!0);a.compressionMethod=b.view.getUint16(c+4,!0);a.lastModDateRaw=b.view.getUint32(c+6,!0);var e;a:{var f=a.lastModDateRaw,k=(f&4294901760)>>16,f=f&65535;try{e=new Date(1980+((k&65024)>>9),((k&480)>>5)-1,k&31,(f&63488)>>11,(f&2016)>>
5,2*(f&31),0);break a}catch(p){}e=void 0}a.lastModDate=e;if(1===(a.bitFlag&1))h('File contains encrypted entry.');else{if(d||8!=(a.bitFlag&8))a.crc32=b.view.getUint32(c+10,!0),a.compressedSize=b.view.getUint32(c+14,!0),a.uncompressedSize=b.view.getUint32(c+18,!0);4294967295===a.compressedSize||4294967295===a.uncompressedSize?h('File is using Zip64 (4gb+ file size).'):(a.filenameLength=b.view.getUint16(c+22,!0),a.extraFieldLength=b.view.getUint16(c+24,!0))}}function S(a,b){function c(){}function d(c,
e){a.readUint8Array(a.size-c,c,function(a){a=x(a.length,a).view;1347093766!=a.getUint32(0)?d(c+1,e):e(a)},function(){b('Error while reading zip file.')})}c.prototype.getData=function(c,d,f,k){function p(a,b){l&&l.terminate();l=null;a&&a(b)}function r(a){var b=x(4);b.view.setUint32(0,a);return n.crc32==b.view.getUint32(0)}function m(a,b){k&&!r(b)?g():c.getData(function(a){p(d,a)})}function g(){p(b,'Error while reading file data.')}function q(){p(b,'Error while writing file data.')}var n=this,l;a.readUint8Array(n.offset,
30,function(d){d=x(d.length,d);var e;1347093252!=d.view.getUint32(0)?b('File format is not recognized.'):(O(n,d,4,!1,b),e=n.offset+30+n.filenameLength+n.extraFieldLength,c.init(function(){0===n.compressionMethod?L(a,c,e,n.compressedSize,k,m,f,g,q):l=K(a,c,e,n.compressedSize,k,m,f,g,q)},q))},g)};return{getEntries:function(h){22>a.size?b('File format is not recognized.'):d(22,function(d){var f,k;f=d.getUint32(16,!0);k=d.getUint16(8,!0);a.readUint8Array(f,a.size-f,function(a){var d=0,e=[],g,f,n=x(a.length,
a);for(a=0;a<k;a++){g=new c;if(1347092738!=n.view.getUint32(d)){b('File format is not recognized.');return}O(g,n,d+6,!0,b);g.commentLength=n.view.getUint16(d+32,!0);g.directory=16==(n.view.getUint8(d+38)&16);g.offset=n.view.getUint32(d+42,!0);f=N(n.array.subarray(d+46,d+46+g.filenameLength));g.filename=2048===(g.bitFlag&2048)?decodeURIComponent(escape(f)):M(f);g.directory||'/'!=g.filename.charAt(g.filename.length-1)||(g.directory=!0);f=N(n.array.subarray(d+46+g.filenameLength+g.extraFieldLength,d+
46+g.filenameLength+g.extraFieldLength+g.commentLength));g.comment=2048===(g.bitFlag&2048)?decodeURIComponent(escape(f)):M(f);e.push(g);d+=46+g.filenameLength+g.extraFieldLength+g.commentLength}h(e)},function(){b('Error while reading zip file.')})})},close:function(a){a&&a()}}}function P(a){var b,c=[];for(b=0;b<a.length;b++)c.push(a.charCodeAt(b));return c}function T(a,b,c){function d(a,b){f&&f.terminate();f=null;a&&a(b)}function h(){d(b,'Error while writing zip file.')}function e(){d(b,'Error while reading file data.')}
var f,k={},p=[],r=0;return{add:function(m,g,q,n,l){function t(b){var d;z=l.lastModDate||new Date;v=x(26);k[m]={headerArray:v.array,directory:l.directory,filename:w,offset:r,comment:P(unescape(encodeURIComponent(l.comment||'')))};v.view.setUint32(0,335546376);l.version&&v.view.setUint8(0,l.version);c||0===l.level||l.directory||v.view.setUint16(4,2048);v.view.setUint16(6,(z.getHours()<<6|z.getMinutes())<<5|z.getSeconds()/2,!0);v.view.setUint16(8,(z.getFullYear()-1980<<4|z.getMonth()+1)<<5|z.getDate(),
!0);v.view.setUint16(22,w.length,!0);d=x(30+w.length);d.view.setUint32(0,1347093252);d.array.set(v.array,4);d.array.set(w,30);r+=d.array.length;a.writeUint8Array(d.array,b,h)}function u(b,c){var f=x(16);r+=b||0;f.view.setUint32(0,1347094280);'undefined'!=typeof c&&(v.view.setUint32(10,c,!0),f.view.setUint32(4,c,!0));g&&(f.view.setUint32(8,b,!0),v.view.setUint32(14,b,!0),f.view.setUint32(12,g.size,!0),v.view.setUint32(18,g.size,!0));a.writeUint8Array(f.array,function(){r+=16;d(q)},h)}function y(){l=
l||{};m=m.trim();l.directory&&'/'!=m.charAt(m.length-1)&&(m+='/');k.hasOwnProperty(m)?b('File already exists.'):(w=P(unescape(encodeURIComponent(m))),p.push(m),t(function(){g?c||0===l.level?L(g,a,0,g.size,!0,u,n,e,h):f=R(g,a,l.level,u,n,e,h):u()},h))}var v,w,z;g?g.init(y,e):y()},close:function(b){var c,f=0,e=0,l,t;for(l=0;l<p.length;l++)t=k[p[l]],f+=46+t.filename.length+t.comment.length;c=x(f+22);for(l=0;l<p.length;l++)t=k[p[l]],c.view.setUint32(e,1347092738),c.view.setUint16(e+4,5120),c.array.set(t.headerArray,
e+6),c.view.setUint16(e+32,t.comment.length,!0),t.directory&&c.view.setUint8(e+38,16),c.view.setUint32(e+42,t.offset,!0),c.array.set(t.filename,e+46),c.array.set(t.comment,e+46+t.filename.length),e+=46+t.filename.length+t.comment.length;c.view.setUint32(e,1347093766);c.view.setUint16(e+8,p.length,!0);c.view.setUint16(e+10,p.length,!0);c.view.setUint32(e+12,f,!0);c.view.setUint32(e+16,r,!0);a.writeUint8Array(c.array,function(){d(function(){a.getData(b)})},h)}}}function U(a,b){return{gunzip:function(b,
d,h,e,f){a.readUint8Array(0,10,function(k){31!=k[0]&&139!=k[1]?onerror('File format is not recognized.'):8!=k[2]?onerror('File format is not recognized.'):0!=k[3]?onerror('File format is not recognized.'):b.init(function(){worker=K(a,b,10,a.size-10-8,!0,function(a){b.getData(function(a){d(a)})},h,e,f)})})}}}var H;try{H=0===(new Blob([new DataView(new ArrayBuffer(0))])).size}catch(a){}A.prototype.table=function(){var a,b,c,d=[];for(a=0;256>a;a++){c=a;for(b=0;8>b;b++)c=c&1?c>>>1^3988292384:c>>>1;d[a]=
c}return d}();C.prototype=new B;C.prototype.constructor=C;D.prototype=new B;D.prototype.constructor=D;y.prototype=new B;y.prototype.constructor=y;w.prototype.getData=function(a){a(this.data)};E.prototype=new w;E.prototype.constructor=E;F.prototype=new w;F.prototype.constructor=F;G.prototype=new w;G.prototype.constructor=G;u.zip={Reader:B,Writer:w,BlobReader:y,Data64URIReader:D,TextReader:C,BlobWriter:G,Data64URIWriter:F,TextWriter:E,createReader:function(a,b,c){a.init(function(){b(S(a,c))},c)},createWriter:function(a,
b,c,d){a.init(function(){b(T(a,c,d))},c)},createGZipReader:function(a,b,c){a.init(function(){b(U(a,c))},c)},workerScriptsPath:'',useWebWorkers:!0}})(this);