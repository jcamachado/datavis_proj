/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/vega-voronoi@4.2.2/build/vega-voronoi.module.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import{Transform as e}from"../vega-dataflow@5.7.5/_esm.js";import{inherits as t}from"../vega-util@1.17.2/_esm.js";import{Delaunay as n}from"../d3-delaunay@6.0.4/_esm.js";function r(t){e.call(this,null,t)}r.Definition={type:"Voronoi",metadata:{modifies:!0},params:[{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"size",type:"number",array:!0,length:2},{name:"extent",type:"array",array:!0,length:2,default:[[-1e5,-1e5],[1e5,1e5]],content:{type:"number",array:!0,length:2}},{name:"as",type:"string",default:"path"}]};const o=[-1e5,-1e5,1e5,1e5];function a(e){const t=e[0][0],n=e[0][1];let r=e.length-1;for(;e[r][0]===t&&e[r][1]===n;--r);return"M"+e.slice(0,r+1).join("L")+"Z"}t(r,e,{transform(e,t){const r=e.as||"path",l=t.source;if(!l||!l.length)return t;let i=e.size;i=i?[0,0,i[0],i[1]]:(i=e.extent)?[i[0][0],i[0][1],i[1][0],i[1][1]]:o;const m=this.value=n.from(l,e.x,e.y).voronoi(i);for(let e=0,t=l.length;e<t;++e){const t=m.cellPolygon(e);l[e][r]=t&&(2!==(s=t).length||s[0][0]!==s[1][0]||s[0][1]!==s[1][1])?a(t):null}var s;return t.reflow(e.modified()).modifies(r)}});export{r as voronoi};export default null;
