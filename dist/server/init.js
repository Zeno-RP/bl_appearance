var oe=Object.create;var C=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var ie=Object.getOwnPropertyNames;var ce=Object.getPrototypeOf,pe=Object.prototype.hasOwnProperty;var N=e=>t=>{var n=e[t];if(n)return n();throw new Error("Module not found in bundle: "+t)};var b=(e,t)=>()=>(e&&(t=e(e=0)),t);var le=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),h=(e,t)=>{for(var n in t)C(e,n,{get:t[n],enumerable:!0})},ue=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of ie(t))!pe.call(e,a)&&a!==n&&C(e,a,{get:()=>t[a],enumerable:!(r=se(t,a))||r.enumerable});return e};var g=(e,t,n)=>(n=e!=null?oe(ce(e)):{},ue(t||!e||!e.__esModule?C(n,"default",{value:e,enumerable:!0}):n,e));var l=le(v=>{"use strict";Object.defineProperty(v,"__esModule",{value:!0});v.oxmysql=void 0;var I=[];function S(e,t){if(!e)throw new TypeError(t)}var c=(e,t,n,r)=>{if(typeof e=="number"&&(e=I[e]),r?S(typeof e=="object",`First argument expected object, recieved ${typeof e}`):S(typeof e=="string",`First argument expected string, received ${typeof e}`),t){let a=typeof t;S(a==="object"||a==="function",`Second argument expected object or function, received ${a}`),!n&&a==="function"&&(n=t,t=void 0)}return n!==void 0&&S(typeof n=="function",`Third argument expected function, received ${typeof n}`),[e,t,n]},k=global.exports.oxmysql,fe=GetCurrentResourceName();function p(e,t,n){return new Promise((r,a)=>{k[e](t,n,(i,d)=>{if(d)return a(d);r(i)},fe,!0)})}v.oxmysql={store(e){return S(typeof e!="string",`Query expects a string, received ${typeof e}`),I.push(e)},ready(e){setImmediate(async()=>{for(;GetResourceState("oxmysql")!=="started";)await new Promise(t=>setTimeout(t,50));e()})},async query(e,t,n){[e,t,n]=c(e,t,n);let r=await p("query",e,t);return n?n(r):r},async single(e,t,n){[e,t,n]=c(e,t,n);let r=await p("single",e,t);return n?n(r):r},async scalar(e,t,n){[e,t,n]=c(e,t,n);let r=await p("scalar",e,t);return n?n(r):r},async update(e,t,n){[e,t,n]=c(e,t,n);let r=await p("update",e,t);return n?n(r):r},async insert(e,t,n){[e,t,n]=c(e,t,n);let r=await p("insert",e,t);return n?n(r):r},async prepare(e,t,n){[e,t,n]=c(e,t,n);let r=await p("prepare",e,t);return n?n(r):r},async rawExecute(e,t,n){[e,t,n]=c(e,t,n);let r=await p("rawExecute",e,t);return n?n(r):r},async transaction(e,t,n){[e,t,n]=c(e,t,n,!0);let r=await p("transaction",e,t);return n?n(r):r},isReady(){return k.isReady()},async awaitConnection(){return await k.awaitConnection()}}});function u(e,t,...n){let r;do r=`${e}:${Math.floor(Math.random()*100001)}:${t}`;while(A[r]);return emitNet(`_bl_cb_${e}`,t,P,r,...n),new Promise(a=>{A[r]=a})}function o(e,t){onNet(`_bl_cb_${e}`,async(n,r,...a)=>{let i=source,d;try{d=await t(i,...a)}catch(_){console.error(`an error occurred while handling callback event ${e}`),console.log(`^3${_.stack}^0`)}emitNet(`_bl_cb_${n}`,i,r,d)})}var P,A,me,E,j,s,ge,L,y=b(()=>{P=GetCurrentResourceName(),A={};onNet(`_bl_cb_${P}`,(e,...t)=>{let n=A[e];return n&&n(...t)});me=exports.bl_bridge,E=me.core(),j=e=>E.GetPlayer(e),s=e=>{let t=E.GetPlayer(e);return t?t.id:null},ge=exports.bl_appearance.config(),L=ge});async function W(e,t){let n=s(e);return await T.oxmysql.update("UPDATE appearance SET skin = ? WHERE id = ?",[JSON.stringify(t),n])}async function U(e,t){let n=s(e);return await T.oxmysql.update("UPDATE appearance SET clothes = ? WHERE id = ?",[JSON.stringify(t),n])}async function G(e,t){let n=s(e);return await T.oxmysql.update("UPDATE appearance SET tattoos = ? WHERE id = ?",[JSON.stringify(t),n])}async function m(e,t,n){if(e&&t){let _=s(e);if(t!==_){console.warn("You are trying to save an appearance for a different player",e,t);return}}t||(t=s(e));let r={drawables:n.drawables,props:n.props,headOverlay:n.headOverlay},a={headBlend:n.headBlend,headStructure:n.headStructure,hairColor:n.hairColor,model:n.model},i=n.tattoos||[];return await T.oxmysql.prepare("INSERT INTO appearance (id, clothes, skin, tattoos) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE clothes = VALUES(clothes), skin = VALUES(skin), tattoos = VALUES(tattoos);",[t,JSON.stringify(r),JSON.stringify(a),JSON.stringify(i)])}var T,w=b(()=>{y();T=g(l(),1);o("bl_appearance:server:saveSkin",W);exports("SaveSkin",W);o("bl_appearance:server:saveClothes",U);exports("SaveClothes",U);o("bl_appearance:server:saveTattoos",G);exports("SaveTattoos",G);o("bl_appearance:server:saveAppearance",m);exports("SaveAppearance",function(e,t){return m(null,e,t)})});var ye={};var Y=b(()=>{});var X={};h(X,{default:()=>Ee});var K,de,be,Ee,Z=b(()=>{K=g(l(),1);y();w();de=e=>new Promise(t=>setTimeout(t,e)),be=async e=>{let t=await K.oxmysql.query("SELECT * FROM `players`");if(t){for(let n of t)if(n.skin){await u("bl_appearance:client:migration:setAppearance",e,{type:"fivem",data:JSON.parse(n.skin)}),await de(100);let r=await u("bl_appearance:client:getAppearance",e),a=parseInt(e);await m(a,n.citizenid,r)}console.log("Converted "+t.length+" appearances")}},Ee=be});var ee={};h(ee,{default:()=>we});var q,Se,Te,we,te=b(()=>{q=g(l(),1);y();w();Se=e=>new Promise(t=>setTimeout(t,e)),Te=async e=>{let t=await q.oxmysql.query("SELECT * FROM `playerskins` WHERE active = 1");if(t){for(let n of t)if(n.skin){await u("bl_appearance:client:migration:setAppearance",e,{type:"illenium",data:JSON.parse(n.skin)}),await Se(100);let r=await u("bl_appearance:client:getAppearance",e),a=parseInt(e);await m(a,n.citizenid,r)}console.log("Converted "+t.length+" appearances")}},we=Te});var re={};h(re,{default:()=>xe});var ne,Oe,ve,xe,ae=b(()=>{ne=g(l(),1);y();w();Oe=e=>new Promise(t=>setTimeout(t,e)),ve=async e=>{let t=await ne.oxmysql.query("SELECT * FROM `playerskins` WHERE active = 1");if(t){for(let n of t){emitNet("qb-clothes:loadSkin",e,0,n.model,n.skin),await Oe(200);let r=await u("bl_appearance:client:getAppearance",e),a=parseInt(e);await m(a,n.citizenid,r)}console.log("Converted "+t.length+" appearances")}},xe=ve});var f=g(l(),1);y();async function M(e,t){let n=E.GetPlayer(e).job||{name:"unknown",grade:{name:"unknown"}},r=await f.oxmysql.prepare("SELECT * FROM outfits WHERE player_id = ? OR (jobname = ? AND jobrank <= ?)",[t,n.name,n.grade.name]);return r?(Array.isArray(r)||(r=[r]),r.map(i=>({id:i.id,label:i.label,outfit:JSON.parse(i.outfit),jobname:i.jobname}))):[]}o("bl_appearance:server:getOutfits",M);exports("GetOutfits",M);async function D(e,t){let n=s(e);return await f.oxmysql.update("UPDATE outfits SET label = ? WHERE player_id = ? AND id = ?",[t.label,n,t.id])}o("bl_appearance:server:renameOutfit",D);exports("RenameOutfit",D);async function F(e,t){let n=s(e);return await f.oxmysql.update("DELETE FROM outfits WHERE player_id = ? AND id = ?",[n,t])>0}o("bl_appearance:server:deleteOutfit",F);exports("DeleteOutfit",F);async function J(e,t){let n=s(e),r=null,a=0;return t.job&&(r=t.job.name,a=t.job.rank),await f.oxmysql.insert("INSERT INTO outfits (player_id, label, outfit, jobname, jobrank) VALUES (?, ?, ?, ?, ?)",[n,t.label,JSON.stringify(t.outfit),r,a])}o("bl_appearance:server:saveOutfit",J);exports("SaveOutfit",J);async function $(e,t){let n=await f.oxmysql.prepare("SELECT outfit FROM outfits WHERE id = ?",[t]);return JSON.parse(n)}o("bl_appearance:server:fetchOutfit",$);exports("FetchOutfit",$);async function H(e,t,n,r){let a=await f.oxmysql.query("SELECT label, outfit FROM outfits WHERE id = ?",[n]);return!a||typeof a!="object"||Object.keys(a).length===0?{success:!1,message:"Outfit not found"}:{success:!0,newId:await f.oxmysql.insert("INSERT INTO outfits (player_id, label, outfit) VALUES (?, ?, ?)",[t,r,a.outfit])}}o("bl_appearance:server:importOutfit",H);exports("ImportOutfit",H);var x=L.outfitItem;x||console.warn("bl_appearance: No outfit item configured, please set it in config.lua");o("bl_appearance:server:itemOutfit",async(e,t)=>{E.GetPlayer(e).addItem(x,1,t)});E.RegisterUsableItem(x,async(e,t,n)=>{j(e)?.removeItem(x,1,t)&&emitNet("bl_appearance:server:useOutfitItem",e,n.outfit)});w();var O=g(l(),1);y();async function B(e,t){t||(t=s(e));let n=await O.oxmysql.prepare("SELECT skin FROM appearance WHERE id = ?",[t]);return JSON.parse(n)}o("bl_appearance:server:getSkin",B);exports("GetSkin",function(e){return B(null,e)});async function V(e,t){t||(t=s(e));let n=await O.oxmysql.prepare("SELECT clothes FROM appearance WHERE id = ?",[t]);return JSON.parse(n)}o("bl_appearance:server:getClothes",V);exports("GetClothes",function(e){return V(null,e)});async function z(e,t){t||(t=s(e));let n=await O.oxmysql.prepare("SELECT tattoos FROM appearance WHERE id = ?",[t]);return JSON.parse(n)||[]}o("bl_appearance:server:getTattoos",z);exports("GetTattoos",function(e){return z(null,e)});async function Q(e,t){if(!t&&!e)return null;t||(t=s(e));let n=await O.oxmysql.single("SELECT * FROM appearance WHERE id = ? LIMIT 1",[t]);if(!n)return null;let r={...JSON.parse(n.skin),...JSON.parse(n.clothes),tattoos:JSON.parse(n.tattoos)};return r.id=n.id,r}o("bl_appearance:server:getAppearance",Q);exports("GetAppearance",function(e){return Q(null,e)});var R=g(l(),1);var _e=N({"./migrate/esx.ts":()=>Promise.resolve().then(()=>(Y(),ye)),"./migrate/fivem.ts":()=>Promise.resolve().then(()=>(Z(),X)),"./migrate/illenium.ts":()=>Promise.resolve().then(()=>(te(),ee)),"./migrate/qb.ts":()=>Promise.resolve().then(()=>(ae(),re))});R.oxmysql.ready(async()=>{try{await R.oxmysql.query("SELECT 1 FROM appearance LIMIT 1")}catch{console.error("Error checking appearance table. Most likely the table does not exist.")}});onNet("bl_appearance:server:setroutingbucket",()=>{SetPlayerRoutingBucket(source.toString(),source)});onNet("bl_appearance:server:resetroutingbucket",()=>{SetPlayerRoutingBucket(source.toString(),0)});RegisterCommand("migrate",async e=>{e=e!==0?e:parseInt(getPlayers()[0]);let n=exports.bl_appearance.config();(await _e(`./migrate/${n.previousClothing==="fivem-appearance"?"fivem":n.previousClothing}.ts`)).default(e)},!1);
