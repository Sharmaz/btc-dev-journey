"use strict";(self.webpackChunkbtc_dev_journey=self.webpackChunkbtc_dev_journey||[]).push([[4684],{222:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>m,frontMatter:()=>c,metadata:()=>r,toc:()=>u});const r=JSON.parse('{"id":"getting-started/index","title":"Comenzando","description":"Gu\xedas para empezar a desarrollar aplicaciones de Bitcoin y Lightning Network.","source":"@site/i18n/es/docusaurus-plugin-content-docs/current/getting-started/index.md","sourceDirName":"getting-started","slug":"/getting-started/","permalink":"/btc-dev-journey/es/docs/getting-started/","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"title":"Comenzando"},"sidebar":"guideSidebar","previous":{"title":"Introducci\xf3n","permalink":"/btc-dev-journey/es/docs/intro"},"next":{"title":"Requerimientos","permalink":"/btc-dev-journey/es/docs/getting-started/requirements"}}');var s=n(4848),i=n(8453),o=n(7473);const c={sidebar_position:2,title:"Comenzando"},a=void 0,l={},u=[];function d(e){const t={p:"p",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.A,{}),"\n",(0,s.jsx)(t.p,{children:"Gu\xedas para empezar a desarrollar aplicaciones de Bitcoin y Lightning Network."})]})}function m(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},7473:(e,t,n)=>{n.d(t,{A:()=>k});var r=n(6540),s=n(4164),i=n(102),o=n(6289),c=n(797);const a=["zero","one","two","few","many","other"];function l(e){return a.filter((t=>e.includes(t)))}const u={locale:"en",pluralForms:l(["one","other"]),select:e=>1===e?"one":"other"};function d(){const{i18n:{currentLocale:e}}=(0,c.A)();return(0,r.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:l(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),u}}),[e])}function m(){const e=d();return{selectMessage:(t,n)=>function(e,t,n){const r=e.split("|");if(1===r.length)return r[0];r.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms.join(",")}), but the message contains ${r.length}: ${e}`);const s=n.select(t),i=n.pluralForms.indexOf(s);return r[Math.min(i,r.length-1)]}(n,t,e)}}var p=n(2887),f=n(539),h=n(9303);const g={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var x=n(4848);function j(e){let{href:t,children:n}=e;return(0,x.jsx)(o.A,{href:t,className:(0,s.A)("card padding--lg",g.cardContainer),children:n})}function b(e){let{href:t,icon:n,title:r,description:i}=e;return(0,x.jsxs)(j,{href:t,children:[(0,x.jsxs)(h.A,{as:"h2",className:(0,s.A)("text--truncate",g.cardTitle),title:r,children:[n," ",r]}),i&&(0,x.jsx)("p",{className:(0,s.A)("text--truncate",g.cardDescription),title:i,children:i})]})}function y(e){let{item:t}=e;const n=(0,i.Nr)(t),r=function(){const{selectMessage:e}=m();return t=>e(t,(0,f.T)({message:"1 item|{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t}))}();return n?(0,x.jsx)(b,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??r(t.items.length)}):null}function w(e){let{item:t}=e;const n=(0,p.A)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",r=(0,i.cC)(t.docId??void 0);return(0,x.jsx)(b,{href:t.href,icon:n,title:t.label,description:t.description??r?.description})}function v(e){let{item:t}=e;switch(t.type){case"link":return(0,x.jsx)(w,{item:t});case"category":return(0,x.jsx)(y,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function N(e){let{className:t}=e;const n=(0,i.$S)();return(0,x.jsx)(k,{items:n.items,className:t})}function k(e){const{items:t,className:n}=e;if(!t)return(0,x.jsx)(N,{...e});const r=(0,i.d1)(t);return(0,x.jsx)("section",{className:(0,s.A)("row",n),children:r.map(((e,t)=>(0,x.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,x.jsx)(v,{item:e})},t)))})}}}]);