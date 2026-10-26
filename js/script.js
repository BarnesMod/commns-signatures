const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const get=id=>document.getElementById(id).value.trim();
function values(){return Object.fromEntries(['name','pronouns','title','email','phone','website'].map(x=>[x,esc(get(x))]));}
function markup(i){
  const x=values(), crimson='#c5050c';
  const pr=x.pronouns?' | '+x.pronouns:'';
  const parts=[x.email,x.phone,x.website].filter(Boolean).join(' &nbsp;|&nbsp; ');
  const contact=`<div style="font:12px/1.55 Arial,sans-serif;color:#000;padding-top:6px">${parts}</div>`;
  const who=`<div style="font:bold 17px/1.5 Arial,sans-serif;color:${crimson}">${x.name}</div><div style="font:13px/1.5 Arial,sans-serif;color:#000">${x.title}${pr}</div>`;
  const flush=new URL('assets/brand/CNTRCOMMNO_color-flush.png',document.baseURI).href;
  const centered=new URL('assets/brand/CNTRCOMMNO_color-center.png',document.baseURI).href;
  const flushLogo=`<img src="${flush}" width="380" alt="Center for Community and Nonprofit Studies, School of Human Ecology, University of Wisconsin–Madison" style="display:block;width:380px;max-width:100%;height:auto;border:0">`;
  const centerLogo=`<img src="${centered}" width="320" alt="Center for Community and Nonprofit Studies, School of Human Ecology, University of Wisconsin–Madison" style="display:block;width:320px;max-width:100%;height:auto;border:0">`;
  if(i===1)return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;border-collapse:collapse"><tr><td style="padding-bottom:12px">${flushLogo}</td></tr><tr><td>${who}${contact}</td></tr></table>`;
  if(i===2)return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;border-collapse:collapse"><tr><td style="padding-bottom:10px">${centerLogo}</td></tr><tr><td>${who}${contact}</td></tr></table>`;
  if(i===3)return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;border-collapse:collapse"><tr><td style="vertical-align:middle;padding-right:16px">${who}${contact}</td><td style="border-left:2px solid #c7c9ca;padding-left:16px;vertical-align:middle"><img src="${flush}" width="290" alt="Center for Community and Nonprofit Studies, School of Human Ecology, University of Wisconsin–Madison" style="display:block;width:290px;max-width:100%;height:auto;border:0"></td></tr></table>`;
  return '';
}
const titles=['Standard — horizontal logo','Stacked — centered logo','Compact — right logo'];
document.getElementById('designs').innerHTML=titles.map((title,k)=>`<section class="panel"><h2>${k+1===1?'2. ':''}Option ${k+1}: ${title}</h2><div class="preview" id="preview${k+1}"></div><div class="actions"><button onclick="copySig(${k+1})">Copy formatted signature</button><button class="secondary" onclick="downloadSig(${k+1})">Save HTML file</button></div><p class="note" id="msg${k+1}"></p></section>`).join('');
function redraw(){for(let i=1;i<=3;i++)document.getElementById('preview'+i).innerHTML=markup(i)}document.querySelectorAll('input').forEach(e=>e.addEventListener('input',redraw));redraw();
async function copySig(i){let h=markup(i);let msg=document.getElementById('msg'+i);try{await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([h],{type:'text/html'}),'text/plain':new Blob([document.getElementById('preview'+i).innerText],{type:'text/plain'})})]);msg.textContent='Copied. Paste into Outlook and send yourself a test email.'}catch(e){msg.textContent='Clipboard permissions blocked. Select the signature preview with your mouse, copy it (⌘C / Ctrl+C), and paste into Outlook, or use the Save HTML file option.'}}
function downloadSig(i){let body=`<!doctype html><html><head><meta charset="utf-8"></head><body>${markup(i)}</body></html>`;let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([body],{type:'text/html'}));a.download=`CommNS_Signature_Option_${i}.html`;a.click();URL.revokeObjectURL(a.href)}
