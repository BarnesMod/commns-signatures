const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const get=id=>document.getElementById(id).value.trim();
function values(){return Object.fromEntries(['name','pronouns','title','email','phone','website'].map(x=>[x,esc(get(x))]));}
function markup(i,example=false){let x=values(),c='#c5050c';
if(example){
  for(const [key,label] of Object.entries({pronouns:'[Pronouns (optional)]',phone:'[Phone (optional)]',website:'[Website (optional)]'})){
    if(!x[key]) x[key]=`<span style="color:#646b72">${label}</span>`;
  }
}
let pr=x.pronouns?' | '+x.pronouns:'';
let parts=[x.email,x.phone,x.website].filter(Boolean).join(' &nbsp;|&nbsp; ');
let contact=`<div style="font:12px/1.55 Arial,sans-serif;color:#000000;padding-top:6px">${parts}</div>`;
let who=`<div style="font:bold 17px/1.5 Arial,sans-serif;color:${c}">${x.name}</div><div style="font:13px/1.5 Arial,sans-serif;color:#000000">${x.title}${pr}</div>`;
let org=`<div style="font:12px/1.5 Arial,sans-serif;color:#000000">Center for Community and Nonprofit Studies</div><div style="font:12px/1.5 Arial,sans-serif;color:#000000">University of Wisconsin–Madison · School of Human Ecology</div>`;
let flush=new URL('assets/brand/CNTRCOMMNO_color-flush.png?v=20261026-1', document.baseURI).href;
let centered=new URL('assets/brand/CNTRCOMMNO_color-center.png', document.baseURI).href;
let logo=`<img src="${flush}" width="430" alt="Center for Community and Nonprofit Studies, School of Human Ecology, University of Wisconsin–Madison" style="display:block;width:430px;max-width:100%;height:auto;border:0">`;
let logoOption1=logo.replace('width="430"','width="300"').replace('width:430px','width:300px');
let out;
if(i===1)out=`<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;border-collapse:collapse"><tr><td style="vertical-align:middle;padding-right:20px">${logoOption1}</td><td style="border-left:2px solid #c7c9ca;padding-left:18px;vertical-align:middle">${who}${org}${contact}</td></tr></table>`;
if(i===2)out=`<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;border-collapse:collapse"><tr><td style="text-align:left;vertical-align:top"><img src="${centered}" alt="Center for Community and Nonprofit Studies, School of Human Ecology, University of Wisconsin–Madison" width="430" style="display:block;width:430px;max-width:100%;height:auto;border:0;margin-bottom:9px"></td></tr><tr><td style="text-align:left;padding-top:10px">${who}${org}${contact}</td></tr></table>`;
if(i===3)out=`<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;border-collapse:collapse"><tr><td style="vertical-align:middle;padding-right:22px">${who}${org}${contact}</td><td style="vertical-align:middle;border-left:2px solid #c7c9ca;padding-left:18px">${logoOption1}</td></tr></table>`;
return out}
const titles=['Standard — left logo','Stacked — centered logo','Minimal — right logo'];
document.getElementById('designs').innerHTML=titles.map((title,k)=>`<section class="panel"><h2>Option ${k+1}: ${title}</h2><div class="preview" id="preview${k+1}"></div><div class="actions"><button onclick="copySig(${k+1})">Copy formatted signature</button><button class="secondary" onclick="downloadSig(${k+1})">Save HTML file</button></div><p class="note" id="msg${k+1}"></p></section>`).join('');
function redraw(){for(let i=1;i<=3;i++)document.getElementById('preview'+i).innerHTML=markup(i,true)}document.querySelectorAll('input').forEach(e=>e.addEventListener('input',redraw));redraw();
function plainTextSignature(){
 const x=values();
 return [x.name, [x.title,x.pronouns].filter(Boolean).join(' | '),
 'Center for Community and Nonprofit Studies',
 'University of Wisconsin–Madison · School of Human Ecology',
 [x.email,x.phone,x.website].filter(Boolean).join(' | ')].filter(Boolean).join('\n');
}
async function copySig(i){let h=markup(i);let msg=document.getElementById('msg'+i);try{await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([h],{type:'text/html'}),'text/plain':new Blob([plainTextSignature()],{type:'text/plain'})})]);msg.textContent='Copied. Paste into Outlook and send yourself a test email.'}catch(e){msg.textContent='Clipboard permissions blocked. Select the signature preview with your mouse, copy it (⌘C / Ctrl+C), and paste into Outlook, or use the Save HTML file option.'}}
function downloadSig(i){let body=`<!doctype html><html><head><meta charset="utf-8"></head><body>${markup(i)}</body></html>`;let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([body],{type:'text/html'}));a.download=`CommNS_Signature_Option_${i}.html`;a.click();URL.revokeObjectURL(a.href)}
