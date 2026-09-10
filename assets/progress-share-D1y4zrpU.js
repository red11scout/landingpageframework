import{c as i}from"./index-rrWTCmjz.js";import{l as u}from"./lessons-B_NQm9_7.js";/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=i("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);function o(t){return Array.from(new Set(t.filter(e=>Number.isInteger(e)&&e>=1&&e<=90))).sort((e,r)=>e-r)}function a(t){return o(t).join(",")}function f(t){return t?o(t.split(",").map(e=>Number.parseInt(e,10))):[]}function l(t,e){const r=a(t);return`${e}/share${r?`?p=${encodeURIComponent(r)}`:""}`}function m(t){const e=o(t),r=Math.round(e.length/90*100),n=u.find(c=>!e.includes(c.id)),s=n?` Next up: Night ${n.id}, ${n.title}.`:" The 90-night journey is complete.";return`Our family has completed ${e.length} of 90 Revolution Nights (${r}%).${s}`}export{d as C,m as a,f as d,l as p};
