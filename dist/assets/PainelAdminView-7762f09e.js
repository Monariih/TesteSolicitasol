import{j as V,au as w,M as k,y as R,z as E,aA as x,C as G,d as e,ag as T,_ as B,X as C,v as N,b as i,a1 as d,w as o,V as S,a3 as u,Y as l,Z as D,$ as h,a0 as $,a2 as f,a4 as _,bA as A,bB as P}from"./display-5ee0fbf6.js";import{f as y}from"./index.esm-feddbe58.js";import{b as q,f as I,V as L,a as U,c as p,d as c,e as j}from"./VNavigationDrawer-3fc59310.js";import{V as F}from"./VContainer-fa0bc818.js";import"./index.esm2017-20e3b9f8.js";const H=V({name:"VTable",props:{fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],hover:Boolean,...w(),...k(),...R()},setup(a,r){let{slots:t}=r;const{themeClasses:g}=E(a),{densityClasses:b}=x(a);return G(()=>{var m,s,v;return e(a.tag,{class:["v-table",{"v-table--fixed-height":!!a.height,"v-table--fixed-header":a.fixedHeader,"v-table--fixed-footer":a.fixedFooter,"v-table--has-top":!!t.top,"v-table--has-bottom":!!t.bottom,"v-table--hover":a.hover},g.value,b.value]},{default:()=>[(m=t.top)==null?void 0:m.call(t),t.default?e("div",{class:"v-table__wrapper",style:{height:T(a.height)}},[e("table",null,[t.default()])]):(s=t.wrapper)==null?void 0:s.call(t),(v=t.bottom)==null?void 0:v.call(t)]})}),{}}}),M={name:"PainelAdminView",data:()=>({deslogar:!1,drawer:null,arrayRepreEmail:[],arrayRepreEmailTratado:[],arrayRepreNome:[],arrayGestorEmail:[],arrayGestorSenha:[],teste:[],representante:null,gestor:[]}),beforeMount(){this.getRepresentante(),this.getGestor()},methods:{getRepresentante(){y.firestore().collection("representante").get().then(r=>{r.docs.forEach(t=>{t.data(),this.representante=t.data(),this.arrayRepreEmail.push(this.representante.email),console.log(this.arrayRepreEmail),this.arrayRepreNome.push(this.representante.nome)})}).catch(r=>{console.log(r.message)})},getGestor(){y.firestore().collection("empresa").get().then(r=>{r.docs.forEach(t=>{t.data(),this.gestor=t.data(),this.arrayGestorEmail.push(this.gestor.emailUserResponsavel),this.arrayGestorSenha.push(this.gestor.senhaUserResponsavel)}),console.log(JSON.stringify(this.arrayGestorSenha))}).catch(r=>{console.log(r.message)})},async logout(){const a="https://cordeiro.solarview.com.br/graphql",r=`mutation Deslogar {
 deslogar
}
`,t={Authorization:`Bearer ${window.token}`,"content-type":"application/json"};await C({url:a,method:"post",headers:t,data:{operationName:"Deslogar",query:r,variables:{}}}).then(N.push("/"))}}},n=a=>(A("data-v-12ddf242"),a=a(),P(),a),z=n(()=>l("img",{id:"logo_corsol_header",src:"https://uploads-ssl.webflow.com/63235e08d659e25502559daf/63235e44d40246d10737645b_logo-corsolar-negativo.svg"},null,-1)),J=n(()=>l("a",{id:"linkDownload",href:"https://mxwqlouaaupkgunfdbku.supabase.co/storage/v1/object/public/corsolar/Proposta Comercial.docx"},"Download Proposta",-1)),O=n(()=>l("tr",{class:"list"},"E-mail representante",-1)),X=n(()=>l("tr",{class:"list"},"Representante",-1)),Y=n(()=>l("tr",{class:"list"},"Gestor",-1)),Z=n(()=>l("tr",{class:"list"},"Senha",-1));function K(a,r,t,g,b,m){return i(),d(u,null,[e(q,null,{default:o(()=>[e(L,{onClick:r[0]||(r[0]=s=>a.drawer=!a.drawer)}),e(U,{id:"header"},{default:o(()=>[z]),_:1}),l("div",null,[e(D,null,{default:o(()=>[h(" Admin ")]),_:1})])]),_:1}),e(I,{modelValue:a.drawer,"onUpdate:modelValue":r[1]||(r[1]=s=>a.drawer=s),temporary:""},{default:o(()=>[e(p,{link:"",to:"/home"},{default:o(()=>[e(c,null,{default:o(()=>[h(" Home ")]),_:1})]),_:1}),e(p,{link:"",to:"/create"},{default:o(()=>[e(c,null,{default:o(()=>[h(" Cadastramento Empresarial ")]),_:1})]),_:1}),e(p,{link:"",to:"/admin"},{default:o(()=>[e(c,null,{default:o(()=>[h(" Painel administrador ")]),_:1})]),_:1}),e(p,{link:""},{default:o(()=>[e(c,{id:"linkDownload"},{default:o(()=>[J]),_:1})]),_:1}),e(j,{class:"my-2"}),e(p,{link:""},{default:o(()=>[e(c,{onClick:m.logout},{default:o(()=>[h(" Logout "),e($,{icon:"mdi-logout"})]),_:1},8,["onClick"])]),_:1})]),_:1},8,["modelValue"]),e(S,{id:"principal"},{default:o(()=>[e(F,null,{default:o(()=>[e(H,{id:"tabela"},{default:o(()=>[l("td",null,[O,(i(),d(u,null,f(4,s=>l("tr",{key:s},_(this.arrayRepreEmail[s]),1)),64))]),l("td",null,[X,(i(),d(u,null,f(4,s=>l("tr",{key:s},_(this.arrayRepreNome[s]),1)),64))]),l("td",null,[Y,(i(),d(u,null,f(4,s=>l("tr",{key:s},_(this.arrayGestorEmail[s]),1)),64))]),l("td",null,[Z,(i(),d(u,null,f(4,s=>l("tr",{key:s},_(this.arrayGestorSenha[s]),1)),64))])]),_:1})]),_:1})]),_:1})],64)}const se=B(M,[["render",K],["__scopeId","data-v-12ddf242"]]);export{se as default};
