/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/vega-encode@4.10.1/build/vega-encode.module.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import{Transform as e,ingest as t,tupleid as n,stableCompare as a}from"../vega-dataflow@5.7.6/_esm.js";import{tickCount as i,tickFormat as o,validTicks as r,tickValues as l,SymbolLegend as s,labelFormat as u,labelValues as d,GradientLegend as m,scaleFraction as c,labelFraction as f,scale as p,Sequential as h,Linear as g,isContinuous as v,Time as M,UTC as y,Ordinal as x,scaleImplicit as b,Log as D,Sqrt as S,Pow as w,Symlog as A,isLogarithmic as O,BinOrdinal as k,isInterpolating as E,interpolateColors as R,interpolate as z,Band as C,Point as L,bandSpace as I,scheme as P,Threshold as _,Quantile as N,Quantize as U,quantizeInterpolator as F,interpolateRange as G,Diverging as X}from"../vega-scale@7.4.1/_esm.js";import{inherits as Y,isArray as T,error as $,falsy as H,isFunction as V,constant as j,peek as q,fastmap as J,one as W,toSet as B,isString as K,zoomLog as Q,zoomPow as Z,zoomSymlog as ee,zoomLinear as te,stringValue as ne}from"../vega-util@1.17.2/_esm.js";import{sum as ae,range as ie}from"../d3-array@3.2.4/_esm.js";import{interpolateRound as oe,interpolate as re}from"../d3-interpolate@3.0.1/_esm.js";function le(t){e.call(this,null,t)}function se(t){e.call(this,null,t)}function ue(){return t({})}function de(t){e.call(this,null,t)}function me(t){e.call(this,[],t)}Y(le,e,{transform(e,n){if(this.value&&!e.modified())return n.StopPropagation;var a=n.dataflow.locale(),s=n.fork(n.NO_SOURCE|n.NO_FIELDS),u=this.value,d=e.scale,m=null==e.count?e.values?e.values.length:10:e.count,c=i(d,m,e.minstep),f=e.format||o(a,d,c,e.formatSpecifier,e.formatType,!!e.values),p=e.values?r(d,e.values,c):l(d,c);return u&&(s.rem=u),u=p.map(((e,n)=>t({index:n/(p.length-1||1),value:e,label:f(e)}))),e.extra&&u.length&&u.push(t({index:-1,extra:{value:u[0].value},label:""})),s.source=u,s.add=u,this.value=u,s}}),Y(se,e,{transform(e,t){var a=t.dataflow,i=t.fork(t.NO_SOURCE|t.NO_FIELDS),o=e.item||ue,r=e.key||n,l=this.value;return T(i.encode)&&(i.encode=null),l&&(e.modified("key")||t.modified(r))&&$("DataJoin does not support modified key function or fields."),l||(t=t.addAll(),this.value=l=function(e){const t=J().test((e=>e.exit));return t.lookup=n=>t.get(e(n)),t}(r)),t.visit(t.ADD,(e=>{const t=r(e);let n=l.get(t);n?n.exit?(l.empty--,i.add.push(n)):i.mod.push(n):(n=o(e),l.set(t,n),i.add.push(n)),n.datum=e,n.exit=!1})),t.visit(t.MOD,(e=>{const t=r(e),n=l.get(t);n&&(n.datum=e,i.mod.push(n))})),t.visit(t.REM,(e=>{const t=r(e),n=l.get(t);e!==n.datum||n.exit||(i.rem.push(n),n.exit=!0,++l.empty)})),t.changed(t.ADD_MOD)&&i.modifies("datum"),(t.clean()||e.clean&&l.empty>a.cleanThreshold)&&a.runAfter(l.clean),i}}),Y(de,e,{transform(e,t){var n=t.fork(t.ADD_REM),a=e.mod||!1,i=e.encoders,o=t.encode;if(T(o)){if(!n.changed()&&!o.every((e=>i[e])))return t.StopPropagation;o=o[0],n.encode=null}var r="enter"===o,l=i.update||H,s=i.enter||H,u=i.exit||H,d=(o&&!r?i[o]:l)||H;if(t.changed(t.ADD)&&(t.visit(t.ADD,(t=>{s(t,e),l(t,e)})),n.modifies(s.output),n.modifies(l.output),d!==H&&d!==l&&(t.visit(t.ADD,(t=>{d(t,e)})),n.modifies(d.output))),t.changed(t.REM)&&u!==H&&(t.visit(t.REM,(t=>{u(t,e)})),n.modifies(u.output)),r||d!==H){const i=t.MOD|(e.modified()?t.REFLOW:0);r?(t.visit(i,(t=>{const i=s(t,e)||a;(d(t,e)||i)&&n.mod.push(t)})),n.mod.length&&n.modifies(s.output)):t.visit(i,(t=>{(d(t,e)||a)&&n.mod.push(t)})),n.mod.length&&n.modifies(d.output)}return n.changed()?n:t.StopPropagation}}),Y(me,e,{transform(e,n){if(null!=this.value&&!e.modified())return n.StopPropagation;var a,o,r,l,p,h=n.dataflow.locale(),g=n.fork(n.NO_SOURCE|n.NO_FIELDS),v=this.value,M=e.type||s,y=e.scale,x=+e.limit,b=i(y,null==e.count?5:e.count,e.minstep),D=!!e.values||M===s,S=e.format||u(h,y,b,M,e.formatSpecifier,e.formatType,D),w=e.values||d(y,b);return v&&(g.rem=v),M===s?(x&&w.length>x?(n.dataflow.warn("Symbol legend count exceeds limit, filtering items."),v=w.slice(0,x-1),p=!0):v=w,V(r=e.size)?(e.values||0!==y(v[0])||(v=v.slice(1)),l=v.reduce(((t,n)=>Math.max(t,r(n,e))),0)):r=j(l=r||8),v=v.map(((n,a)=>t({index:a,label:S(n,a,v),value:n,offset:l,size:r(n,e)}))),p&&(p=w[v.length],v.push(t({index:v.length,label:`…${w.length-v.length} entries`,value:p,offset:l,size:r(p,e)})))):M===m?(a=y.domain(),o=c(y,a[0],q(a)),w.length<3&&!e.values&&a[0]!==q(a)&&(w=[a[0],q(a)]),v=w.map(((e,n)=>t({index:n,label:S(e,n,w),value:e,perc:o(e)})))):(r=w.length-1,o=f(y),v=w.map(((e,n)=>t({index:n,label:S(e,n,w),value:e,perc:n?o(e):0,perc2:n===r?1:o(w[n+1])})))),g.source=v,g.add=v,this.value=v,g}});const ce=e=>e.source.x,fe=e=>e.source.y,pe=e=>e.target.x,he=e=>e.target.y;function ge(t){e.call(this,{},t)}ge.Definition={type:"LinkPath",metadata:{modifies:!0},params:[{name:"sourceX",type:"field",default:"source.x"},{name:"sourceY",type:"field",default:"source.y"},{name:"targetX",type:"field",default:"target.x"},{name:"targetY",type:"field",default:"target.y"},{name:"orient",type:"enum",default:"vertical",values:["horizontal","vertical","radial"]},{name:"shape",type:"enum",default:"line",values:["line","arc","curve","diagonal","orthogonal"]},{name:"require",type:"signal"},{name:"as",type:"string",default:"path"}]},Y(ge,e,{transform(e,t){var n=e.sourceX||ce,a=e.sourceY||fe,i=e.targetX||pe,o=e.targetY||he,r=e.as||"path",l=e.orient||"vertical",s=e.shape||"line",u=xe.get(s+"-"+l)||xe.get(s);return u||$("LinkPath unsupported type: "+e.shape+(e.orient?"-"+e.orient:"")),t.visit(t.SOURCE,(e=>{e[r]=u(n(e),a(e),i(e),o(e))})),t.reflow(e.modified()).modifies(r)}});const ve=(e,t,n,a)=>"M"+e+","+t+"L"+n+","+a,Me=(e,t,n,a)=>{var i=n-e,o=a-t,r=Math.hypot(i,o)/2;return"M"+e+","+t+"A"+r+","+r+" "+180*Math.atan2(o,i)/Math.PI+" 0 1 "+n+","+a},ye=(e,t,n,a)=>{const i=n-e,o=a-t,r=.2*(i+o),l=.2*(o-i);return"M"+e+","+t+"C"+(e+r)+","+(t+l)+" "+(n+l)+","+(a-r)+" "+n+","+a},xe=J({line:ve,"line-radial":(e,t,n,a)=>ve(t*Math.cos(e),t*Math.sin(e),a*Math.cos(n),a*Math.sin(n)),arc:Me,"arc-radial":(e,t,n,a)=>Me(t*Math.cos(e),t*Math.sin(e),a*Math.cos(n),a*Math.sin(n)),curve:ye,"curve-radial":(e,t,n,a)=>ye(t*Math.cos(e),t*Math.sin(e),a*Math.cos(n),a*Math.sin(n)),"orthogonal-horizontal":(e,t,n,a)=>"M"+e+","+t+"V"+a+"H"+n,"orthogonal-vertical":(e,t,n,a)=>"M"+e+","+t+"H"+n+"V"+a,"orthogonal-radial":(e,t,n,a)=>{const i=Math.cos(e),o=Math.sin(e),r=Math.cos(n),l=Math.sin(n);return"M"+t*i+","+t*o+"A"+t+","+t+" 0 0,"+((Math.abs(n-e)>Math.PI?n<=e:n>e)?1:0)+" "+t*r+","+t*l+"L"+a*r+","+a*l},"diagonal-horizontal":(e,t,n,a)=>{const i=(e+n)/2;return"M"+e+","+t+"C"+i+","+t+" "+i+","+a+" "+n+","+a},"diagonal-vertical":(e,t,n,a)=>{const i=(t+a)/2;return"M"+e+","+t+"C"+e+","+i+" "+n+","+i+" "+n+","+a},"diagonal-radial":(e,t,n,a)=>{const i=Math.cos(e),o=Math.sin(e),r=Math.cos(n),l=Math.sin(n),s=(t+a)/2;return"M"+t*i+","+t*o+"C"+s*i+","+s*o+" "+s*r+","+s*l+" "+a*r+","+a*l}});function be(t){e.call(this,null,t)}be.Definition={type:"Pie",metadata:{modifies:!0},params:[{name:"field",type:"field"},{name:"startAngle",type:"number",default:0},{name:"endAngle",type:"number",default:6.283185307179586},{name:"sort",type:"boolean",default:!1},{name:"as",type:"string",array:!0,length:2,default:["startAngle","endAngle"]}]},Y(be,e,{transform(e,t){var n,a,i,o=e.as||["startAngle","endAngle"],r=o[0],l=o[1],s=e.field||W,u=e.startAngle||0,d=null!=e.endAngle?e.endAngle:2*Math.PI,m=t.source,c=m.map(s),f=c.length,p=u,h=(d-u)/ae(c),g=ie(f);for(e.sort&&g.sort(((e,t)=>c[e]-c[t])),n=0;n<f;++n)i=c[g[n]],(a=m[g[n]])[r]=p,a[l]=p+=i*h;return this.value=c,t.reflow(e.modified()).modifies(o)}});const De=5;function Se(e){return v(e)&&e!==h}const we=B(["set","modified","clear","type","scheme","schemeExtent","schemeCount","domain","domainMin","domainMid","domainMax","domainRaw","domainImplicit","nice","zero","bins","range","rangeStep","round","reverse","interpolate","interpolateGamma"]);function Ae(t){e.call(this,null,t),this.modified(!0)}function Oe(e,t,n){O(e)&&(Math.abs(t.reduce(((e,t)=>e+(t<0?-1:t>0?1:0)),0))!==t.length&&n.warn("Log scale domain includes zero: "+ne(t)));return t}function ke(e,t,n){return V(e)&&(t||n)?G(e,Ee(t||[0,1],n)):e}function Ee(e,t){return t?e.slice().reverse():e}function Re(t){e.call(this,null,t)}Y(Ae,e,{transform(e,t){var n=t.dataflow,a=this.value,o=function(e){var t,n=e.type,a="";if(n===h)return h+"-"+g;(function(e){const t=e.type;return v(t)&&t!==M&&t!==y&&(e.scheme||e.range&&e.range.length&&e.range.every(K))})(e)&&(a=2===(t=e.rawDomain?e.rawDomain.length:e.domain?e.domain.length+ +(null!=e.domainMid):0)?h+"-":3===t?X+"-":"");return(a+n||g).toLowerCase()}(e);for(o in a&&o===a.type||(this.value=a=p(o)()),e)if(!we[o]){if("padding"===o&&Se(a.type))continue;V(a[o])?a[o](e[o]):n.warn("Unsupported scale property: "+o)}return function(e,t,n){var a=e.type,i=t.round||!1,o=t.range;if(null!=t.rangeStep)o=function(e,t,n){e!==C&&e!==L&&$("Only band and point scales support rangeStep.");var a=(null!=t.paddingOuter?t.paddingOuter:t.padding)||0,i=e===L?1:(null!=t.paddingInner?t.paddingInner:t.padding)||0;return[0,t.rangeStep*I(n,i,a)]}(a,t,n);else if(t.scheme&&(o=function(e,t,n){var a,i,o=t.schemeExtent;T(t.scheme)?i=R(t.scheme,t.interpolate,t.interpolateGamma):(a=t.scheme.toLowerCase(),(i=P(a))||$(`Unrecognized scheme name: ${t.scheme}`));return n=e===_?n+1:e===k?n-1:e===N||e===U?+t.schemeCount||De:n,E(e)?ke(i,o,t.reverse):V(i)?F(ke(i,o),n):e===x?i:i.slice(0,n)}(a,t,n),V(o))){if(e.interpolator)return e.interpolator(o);$(`Scale type ${a} does not support interpolating color schemes.`)}if(o&&E(a))return e.interpolator(R(Ee(o,t.reverse),t.interpolate,t.interpolateGamma));o&&t.interpolate&&e.interpolate?e.interpolate(z(t.interpolate,t.interpolateGamma)):V(e.round)?e.round(i):V(e.rangeRound)&&e.interpolate(i?oe:re);o&&e.range(Ee(o,t.reverse))}(a,e,function(e,t,n){let a=t.bins;if(a&&!T(a)){const t=e.domain(),n=t[0],i=q(t),o=a.step;let r=null==a.start?n:a.start,l=null==a.stop?i:a.stop;o||$("Scale bins parameter missing step property."),r<n&&(r=o*Math.ceil(n/o)),l>i&&(l=o*Math.floor(i/o)),a=ie(r,l+o/2,o)}a?e.bins=a:e.bins&&delete e.bins;e.type===k&&(a?t.domain||t.domainRaw||(e.domain(a),n=a.length):e.bins=e.domain());return n}(a,e,function(e,t,n){const a=function(e,t,n){return t?(e.domain(Oe(e.type,t,n)),t.length):-1}(e,t.domainRaw,n);if(a>-1)return a;var o,r,l=t.domain,s=e.type,u=t.zero||void 0===t.zero&&function(e){const t=e.type;return!e.bins&&(t===g||t===w||t===S)}(e);if(!l)return 0;if((u||null!=t.domainMin||null!=t.domainMax||null!=t.domainMid)&&(o=(l=l.slice()).length-1||1,u&&(l[0]>0&&(l[0]=0),l[o]<0&&(l[o]=0)),null!=t.domainMin&&(l[0]=t.domainMin),null!=t.domainMax&&(l[o]=t.domainMax),null!=t.domainMid)){const e=(r=t.domainMid)>l[o]?o+1:r<l[0]?0:o;e!==o&&n.warn("Scale domainMid exceeds domain min or max.",r),l.splice(e,0,r)}Se(s)&&t.padding&&l[0]!==q(l)&&(l=function(e,t,n,a,i,o){var r=Math.abs(q(n)-n[0]),l=r/(r-2*a),s=e===D?Q(t,null,l):e===S?Z(t,null,l,.5):e===w?Z(t,null,l,i||1):e===A?ee(t,null,l,o||1):te(t,null,l);return t=t.slice(),t[0]=s[0],t[t.length-1]=s[1],t}(s,l,t.range,t.padding,t.exponent,t.constant));e.domain(Oe(s,l,n)),s===x&&e.unknown(t.domainImplicit?b:void 0);t.nice&&e.nice&&e.nice(!0!==t.nice&&i(e,t.nice)||null);return l.length}(a,e,n))),t.fork(t.NO_SOURCE|t.NO_FIELDS)}}),Y(Re,e,{transform(e,t){const n=e.modified("sort")||t.changed(t.ADD)||t.modified(e.sort.fields)||t.modified("datum");return n&&t.source.sort(a(e.sort)),this.modified(n),t}});const ze="zero",Ce="center",Le="normalize",Ie=["y0","y1"];function Pe(t){e.call(this,null,t)}function _e(e,t,n,a,i){for(var o,r=(t-e.sum)/2,l=e.length,s=0;s<l;++s)(o=e[s])[a]=r,o[i]=r+=Math.abs(n(o))}function Ne(e,t,n,a,i){for(var o,r=1/e.sum,l=0,s=e.length,u=0,d=0;u<s;++u)(o=e[u])[a]=l,o[i]=l=r*(d+=Math.abs(n(o)))}function Ue(e,t,n,a,i){for(var o,r,l=0,s=0,u=e.length,d=0;d<u;++d)(o=+n(r=e[d]))<0?(r[a]=s,r[i]=s+=o):(r[a]=l,r[i]=l+=o)}Pe.Definition={type:"Stack",metadata:{modifies:!0},params:[{name:"field",type:"field"},{name:"groupby",type:"field",array:!0},{name:"sort",type:"compare"},{name:"offset",type:"enum",default:ze,values:[ze,Ce,Le]},{name:"as",type:"string",array:!0,length:2,default:Ie}]},Y(Pe,e,{transform(e,t){var n,i,o,r,l=e.as||Ie,s=l[0],u=l[1],d=a(e.sort),m=e.field||W,c=e.offset===Ce?_e:e.offset===Le?Ne:Ue;for(n=function(e,t,n,a){var i,o,r,l,s,u,d,m,c,f=[],p=e=>e(s);if(null==t)f.push(e.slice());else for(i={},o=0,r=e.length;o<r;++o)s=e[o],(d=i[u=t.map(p)])||(i[u]=d=[],f.push(d)),d.push(s);for(u=0,c=0,l=f.length;u<l;++u){for(o=0,m=0,r=(d=f[u]).length;o<r;++o)m+=Math.abs(a(d[o]));d.sum=m,m>c&&(c=m),n&&d.sort(n)}return f.max=c,f}(t.source,e.groupby,d,m),i=0,o=n.length,r=n.max;i<o;++i)c(n[i],r,m,s,u);return t.reflow(e.modified()).modifies(l)}});export{le as axisticks,se as datajoin,de as encode,me as legendentries,ge as linkpath,be as pie,Ae as scale,Re as sortitems,Pe as stack};export default null;
