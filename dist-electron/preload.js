"use strict";var m=Object.defineProperty;var g=(a,i,n)=>i in a?m(a,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[i]=n;var o=(a,i,n)=>(g(a,typeof i!="symbol"?i+"":i,n),n);const y=require("electron"),_=require("path"),E=require("better-sqlite3"),f=require("bcryptjs");function L(a){const i=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(a){for(const n in a)if(n!=="default"){const s=Object.getOwnPropertyDescriptor(a,n);Object.defineProperty(i,n,s.get?s:{enumerable:!0,get:()=>a[n]})}}return i.default=a,Object.freeze(i)}const I=L(_);class c{constructor(i){o(this,"db");o(this,"tableName");o(this,"getAll",()=>{try{return this.db.prepare(`SELECT * FROM ${this.tableName}`).all()}catch(i){return console.error(i),[]}});o(this,"create",i=>{const n=this.getFields(i),s=this.getValues(i);this.db.prepare(`INSERT INTO ${this.tableName} (${n}) VALUES (${s})`).run()});o(this,"getById",i=>this.db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ${i}`).get());o(this,"update",i=>{const n=this.getQueryUpdate(i);console.log(n),this.db.prepare(`UPDATE ${this.tableName} SET ${n} WHERE id = ${Object.values(i)[0]}`).run()});o(this,"delete",i=>{this.db.prepare(`DELETE FROM ${this.tableName} WHERE id = ${i}`).run()});const n=process.env.NODE_ENV==="development"?"./data.db":I.join(process.resourcesPath,"./data.db");this.db=new E(n),this.db.pragma("journal_mode = WAL"),this.tableName=i}getFields(i){return Object.keys(i).filter(s=>s!=="Id").join(", ")}getQueryUpdate(i){return Object.entries(i).map(([e,t])=>typeof t=="string"?`${e} = '${t}'`:`${e} = ${t}`).join(", ")}getValues(i){return Object.values(i).slice(1).flatMap(e=>typeof e=="string"?`'${e}'`:e===null?"NULL":e).join(",")}}class S extends c{constructor(){super("Perfil")}}class F{constructor(i){o(this,"Id",null);this.Id=i}}class h{constructor(){this._dataLength=0,this._bufferLength=0,this._state=new Int32Array(4),this._buffer=new ArrayBuffer(68),this._buffer8=new Uint8Array(this._buffer,0,68),this._buffer32=new Uint32Array(this._buffer,0,17),this.start()}static hashStr(i,n=!1){return this.onePassHasher.start().appendStr(i).end(n)}static hashAsciiStr(i,n=!1){return this.onePassHasher.start().appendAsciiStr(i).end(n)}static _hex(i){const n=h.hexChars,s=h.hexOut;let e,t,r,l;for(l=0;l<4;l+=1)for(t=l*8,e=i[l],r=0;r<8;r+=2)s[t+1+r]=n.charAt(e&15),e>>>=4,s[t+0+r]=n.charAt(e&15),e>>>=4;return s.join("")}static _md5cycle(i,n){let s=i[0],e=i[1],t=i[2],r=i[3];s+=(e&t|~e&r)+n[0]-680876936|0,s=(s<<7|s>>>25)+e|0,r+=(s&e|~s&t)+n[1]-389564586|0,r=(r<<12|r>>>20)+s|0,t+=(r&s|~r&e)+n[2]+606105819|0,t=(t<<17|t>>>15)+r|0,e+=(t&r|~t&s)+n[3]-1044525330|0,e=(e<<22|e>>>10)+t|0,s+=(e&t|~e&r)+n[4]-176418897|0,s=(s<<7|s>>>25)+e|0,r+=(s&e|~s&t)+n[5]+1200080426|0,r=(r<<12|r>>>20)+s|0,t+=(r&s|~r&e)+n[6]-1473231341|0,t=(t<<17|t>>>15)+r|0,e+=(t&r|~t&s)+n[7]-45705983|0,e=(e<<22|e>>>10)+t|0,s+=(e&t|~e&r)+n[8]+1770035416|0,s=(s<<7|s>>>25)+e|0,r+=(s&e|~s&t)+n[9]-1958414417|0,r=(r<<12|r>>>20)+s|0,t+=(r&s|~r&e)+n[10]-42063|0,t=(t<<17|t>>>15)+r|0,e+=(t&r|~t&s)+n[11]-1990404162|0,e=(e<<22|e>>>10)+t|0,s+=(e&t|~e&r)+n[12]+1804603682|0,s=(s<<7|s>>>25)+e|0,r+=(s&e|~s&t)+n[13]-40341101|0,r=(r<<12|r>>>20)+s|0,t+=(r&s|~r&e)+n[14]-1502002290|0,t=(t<<17|t>>>15)+r|0,e+=(t&r|~t&s)+n[15]+1236535329|0,e=(e<<22|e>>>10)+t|0,s+=(e&r|t&~r)+n[1]-165796510|0,s=(s<<5|s>>>27)+e|0,r+=(s&t|e&~t)+n[6]-1069501632|0,r=(r<<9|r>>>23)+s|0,t+=(r&e|s&~e)+n[11]+643717713|0,t=(t<<14|t>>>18)+r|0,e+=(t&s|r&~s)+n[0]-373897302|0,e=(e<<20|e>>>12)+t|0,s+=(e&r|t&~r)+n[5]-701558691|0,s=(s<<5|s>>>27)+e|0,r+=(s&t|e&~t)+n[10]+38016083|0,r=(r<<9|r>>>23)+s|0,t+=(r&e|s&~e)+n[15]-660478335|0,t=(t<<14|t>>>18)+r|0,e+=(t&s|r&~s)+n[4]-405537848|0,e=(e<<20|e>>>12)+t|0,s+=(e&r|t&~r)+n[9]+568446438|0,s=(s<<5|s>>>27)+e|0,r+=(s&t|e&~t)+n[14]-1019803690|0,r=(r<<9|r>>>23)+s|0,t+=(r&e|s&~e)+n[3]-187363961|0,t=(t<<14|t>>>18)+r|0,e+=(t&s|r&~s)+n[8]+1163531501|0,e=(e<<20|e>>>12)+t|0,s+=(e&r|t&~r)+n[13]-1444681467|0,s=(s<<5|s>>>27)+e|0,r+=(s&t|e&~t)+n[2]-51403784|0,r=(r<<9|r>>>23)+s|0,t+=(r&e|s&~e)+n[7]+1735328473|0,t=(t<<14|t>>>18)+r|0,e+=(t&s|r&~s)+n[12]-1926607734|0,e=(e<<20|e>>>12)+t|0,s+=(e^t^r)+n[5]-378558|0,s=(s<<4|s>>>28)+e|0,r+=(s^e^t)+n[8]-2022574463|0,r=(r<<11|r>>>21)+s|0,t+=(r^s^e)+n[11]+1839030562|0,t=(t<<16|t>>>16)+r|0,e+=(t^r^s)+n[14]-35309556|0,e=(e<<23|e>>>9)+t|0,s+=(e^t^r)+n[1]-1530992060|0,s=(s<<4|s>>>28)+e|0,r+=(s^e^t)+n[4]+1272893353|0,r=(r<<11|r>>>21)+s|0,t+=(r^s^e)+n[7]-155497632|0,t=(t<<16|t>>>16)+r|0,e+=(t^r^s)+n[10]-1094730640|0,e=(e<<23|e>>>9)+t|0,s+=(e^t^r)+n[13]+681279174|0,s=(s<<4|s>>>28)+e|0,r+=(s^e^t)+n[0]-358537222|0,r=(r<<11|r>>>21)+s|0,t+=(r^s^e)+n[3]-722521979|0,t=(t<<16|t>>>16)+r|0,e+=(t^r^s)+n[6]+76029189|0,e=(e<<23|e>>>9)+t|0,s+=(e^t^r)+n[9]-640364487|0,s=(s<<4|s>>>28)+e|0,r+=(s^e^t)+n[12]-421815835|0,r=(r<<11|r>>>21)+s|0,t+=(r^s^e)+n[15]+530742520|0,t=(t<<16|t>>>16)+r|0,e+=(t^r^s)+n[2]-995338651|0,e=(e<<23|e>>>9)+t|0,s+=(t^(e|~r))+n[0]-198630844|0,s=(s<<6|s>>>26)+e|0,r+=(e^(s|~t))+n[7]+1126891415|0,r=(r<<10|r>>>22)+s|0,t+=(s^(r|~e))+n[14]-1416354905|0,t=(t<<15|t>>>17)+r|0,e+=(r^(t|~s))+n[5]-57434055|0,e=(e<<21|e>>>11)+t|0,s+=(t^(e|~r))+n[12]+1700485571|0,s=(s<<6|s>>>26)+e|0,r+=(e^(s|~t))+n[3]-1894986606|0,r=(r<<10|r>>>22)+s|0,t+=(s^(r|~e))+n[10]-1051523|0,t=(t<<15|t>>>17)+r|0,e+=(r^(t|~s))+n[1]-2054922799|0,e=(e<<21|e>>>11)+t|0,s+=(t^(e|~r))+n[8]+1873313359|0,s=(s<<6|s>>>26)+e|0,r+=(e^(s|~t))+n[15]-30611744|0,r=(r<<10|r>>>22)+s|0,t+=(s^(r|~e))+n[6]-1560198380|0,t=(t<<15|t>>>17)+r|0,e+=(r^(t|~s))+n[13]+1309151649|0,e=(e<<21|e>>>11)+t|0,s+=(t^(e|~r))+n[4]-145523070|0,s=(s<<6|s>>>26)+e|0,r+=(e^(s|~t))+n[11]-1120210379|0,r=(r<<10|r>>>22)+s|0,t+=(s^(r|~e))+n[2]+718787259|0,t=(t<<15|t>>>17)+r|0,e+=(r^(t|~s))+n[9]-343485551|0,e=(e<<21|e>>>11)+t|0,i[0]=s+i[0]|0,i[1]=e+i[1]|0,i[2]=t+i[2]|0,i[3]=r+i[3]|0}start(){return this._dataLength=0,this._bufferLength=0,this._state.set(h.stateIdentity),this}appendStr(i){const n=this._buffer8,s=this._buffer32;let e=this._bufferLength,t,r;for(r=0;r<i.length;r+=1){if(t=i.charCodeAt(r),t<128)n[e++]=t;else if(t<2048)n[e++]=(t>>>6)+192,n[e++]=t&63|128;else if(t<55296||t>56319)n[e++]=(t>>>12)+224,n[e++]=t>>>6&63|128,n[e++]=t&63|128;else{if(t=(t-55296)*1024+(i.charCodeAt(++r)-56320)+65536,t>1114111)throw new Error("Unicode standard supports code points up to U+10FFFF");n[e++]=(t>>>18)+240,n[e++]=t>>>12&63|128,n[e++]=t>>>6&63|128,n[e++]=t&63|128}e>=64&&(this._dataLength+=64,h._md5cycle(this._state,s),e-=64,s[0]=s[16])}return this._bufferLength=e,this}appendAsciiStr(i){const n=this._buffer8,s=this._buffer32;let e=this._bufferLength,t,r=0;for(;;){for(t=Math.min(i.length-r,64-e);t--;)n[e++]=i.charCodeAt(r++);if(e<64)break;this._dataLength+=64,h._md5cycle(this._state,s),e=0}return this._bufferLength=e,this}appendByteArray(i){const n=this._buffer8,s=this._buffer32;let e=this._bufferLength,t,r=0;for(;;){for(t=Math.min(i.length-r,64-e);t--;)n[e++]=i[r++];if(e<64)break;this._dataLength+=64,h._md5cycle(this._state,s),e=0}return this._bufferLength=e,this}getState(){const i=this._state;return{buffer:String.fromCharCode.apply(null,Array.from(this._buffer8)),buflen:this._bufferLength,length:this._dataLength,state:[i[0],i[1],i[2],i[3]]}}setState(i){const n=i.buffer,s=i.state,e=this._state;let t;for(this._dataLength=i.length,this._bufferLength=i.buflen,e[0]=s[0],e[1]=s[1],e[2]=s[2],e[3]=s[3],t=0;t<n.length;t+=1)this._buffer8[t]=n.charCodeAt(t)}end(i=!1){const n=this._bufferLength,s=this._buffer8,e=this._buffer32,t=(n>>2)+1;this._dataLength+=n;const r=this._dataLength*8;if(s[n]=128,s[n+1]=s[n+2]=s[n+3]=0,e.set(h.buffer32Identity.subarray(t),t),n>55&&(h._md5cycle(this._state,e),e.set(h.buffer32Identity)),r<=4294967295)e[14]=r;else{const l=r.toString(16).match(/(.*?)(.{0,8})$/);if(l===null)return;const p=parseInt(l[2],16),b=parseInt(l[1],16)||0;e[14]=p,e[15]=b}return h._md5cycle(this._state,e),i?this._state:h._hex(this._state)}}h.stateIdentity=new Int32Array([1732584193,-271733879,-1732584194,271733878]);h.buffer32Identity=new Int32Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);h.hexChars="0123456789abcdef";h.hexOut=[];h.onePassHasher=new h;if(h.hashStr("hello")!=="5d41402abc4b2a76b9719d911017c592")throw new Error("Md5 self test failed.");const x=(a,i)=>f.compareSync(a,i),w=a=>{const i=f.genSaltSync(10);return f.hashSync(a,i)};class R extends F{constructor(n){super(n.Id??null);o(this,"NomeCompleto");o(this,"Email");o(this,"Telefone");o(this,"ResponsavelId");o(this,"Senha");o(this,"PerfilId");this.nomeCompleto=n.NomeCompleto,this.email=n.Email,this.telefone=n.Telefone??"N/A",this.responsavelId=n.ResponsavelId??null,this.senha=n.Senha,this.perfilId=n.PerfilId}validarSenha(n){return x(n,this.Senha)}validarPerfil(){return this.PerfilId===1||this.PerfilId===2}getId(){return this.Id??0}set nomeCompleto(n){this.NomeCompleto=n.trim().toLocaleUpperCase()}set email(n){this.Email=n.trim().toLocaleLowerCase()}set telefone(n){this.Telefone=n==null?void 0:n.trim()}set responsavelId(n){this.ResponsavelId=n}set senha(n){n.length>8?this.Senha=n:n===""?this.Senha="N/A":this.Senha=w(n)}set perfilId(n){this.PerfilId=n}}class u extends c{constructor(){super("Pessoa");o(this,"administradorExists",()=>this.db.prepare("SELECT COUNT(*) FROM Pessoa WHERE perfilId = 1").get()["COUNT(*)"]>0);o(this,"login",(n,s)=>{const e=this.db.prepare(`SELECT * FROM Pessoa WHERE email = '${n}'`).get(),t=new R(e);if(!t)throw new Error("Email não encontrado");if(!t.validarSenha(s))throw new Error("Senha inválida");if(!t.validarPerfil())throw new Error("Perfil inválido");return e})}}class d extends c{constructor(){super("Livro")}}class A extends c{constructor(){super("Emprestimo");o(this,"livroRepository");o(this,"pessoaRepository");o(this,"create",n=>{this.db.prepare(`INSERT INTO Emprestimo (LivroId, PessoaId, DataInicio, DataFim) 
            VALUES (${n.LivroId}, ${n.PessoaId}, '${n.DataInicio}', '${n.DataFim}')`).run()});this.livroRepository=new d,this.pessoaRepository=new u}}y.contextBridge.exposeInMainWorld("database",{perfilRepository:new S,pessoaRepository:new u,livroRepository:new d,emprestimoRepository:new A});