var localExt=!!globalThis.chrome?.runtime?.id;
var deskStore=localExt?chrome.storage.local:{async get(k){return {[k]:JSON.parse(localStorage.getItem("fieldnote:"+k)||"null")}},async set(o){for(const [k,v] of Object.entries(o))localStorage.setItem("fieldnote:"+k,JSON.stringify(v))}};
const by=id=>document.getElementById(id),note=t=>by("notice").textContent=t;let draft;
function cols(){by("col").replaceChildren(...draft.rows[0].map((v,i)=>new Option(v,i)));by("col").value=draft.col;by("fileinfo").textContent=draft.file+" · "+(draft.rows.length-1)+" data records"}
(async()=>{draft=structuredClone((await deskStore.get("project")).project||Field.demo);by("pname").value=draft.name;by("brief").value=draft.brief;cols();by("model").value=(await deskStore.get("model")).model||""})().catch(e=>note(e.message));
by("upload").onchange=async e=>{try{let f=e.target.files[0];if(!f)return;if(f.size>1000000)throw Error("Use a subset under 1 MB.");let rows=Field.parse(await f.text(),/\.tsv$/i.test(f.name)?"\t":",");draft={...draft,rows,file:f.name,col:0};cols();note("Preview ready. Choose the identifier column, then save.")}catch(err){note(err.message)}};
by("save").onclick=async()=>{try{let p={...draft,name:by("pname").value.trim(),brief:by("brief").value.trim(),col:Number(by("col").value)};if(!p.name||!p.brief)throw Error("Give your project a name and research brief.");await deskStore.set({project:p});note("Saved on this computer.")}catch(e){note(e.message)}};
by("enable").onclick=async()=>{try{if(!localExt)throw Error("Install the extension to connect a local model.");let model=by("model").value.trim();if(!model||/cloud/i.test(model))throw Error("Enter a downloaded local model name.");if(!await chrome.permissions.request({origins:["http://127.0.0.1/*"]}))throw Error("Local connection permission was declined.");await deskStore.set({model});note("Model configured. Use Interpret locally on a passage to try it.")}catch(e){note(e.message)}};
by("disable").onclick=async()=>{await deskStore.set({model:""});if(localExt)await chrome.permissions.remove({origins:["http://127.0.0.1/*"]});by("model").value="";note("Local AI disabled.")};

if(localExt){
 by("kimiPanel").hidden=false;
 async function kimiState(){by("kimiState").textContent=(await chrome.storage.session.get("kimiKey")).kimiKey?"Ready. Key held only for this session.":"Disconnected. Free local features are available."}
 kimiState();
 by("kimiOn").onclick=async()=>{try{
   const key=by("kimiKey").value.trim();if(!key)throw Error("Enter your Moonshot Open Platform API key here.");
   if(!await chrome.permissions.request({origins:["https://api.moonshot.ai/*"]}))throw Error("Moonshot access declined.");
   await chrome.storage.session.set({kimiKey:key});by("kimiKey").value="";await kimiState();
 }catch(e){note(e.message)}};
 by("kimiOff").onclick=async()=>{await chrome.storage.session.remove("kimiKey");by("kimiKey").value="";await chrome.permissions.remove({origins:["https://api.moonshot.ai/*"]});await kimiState()};
}
