import fs from 'node:fs';
import { createHash } from 'node:crypto';
const root=new URL('./',import.meta.url);
const rows=fs.readFileSync(new URL('assets/portrait.txt',root),'utf8').trimEnd().split('\n');
const fields=[["iuri1911@github",""],["",""],["Name","Iuri Ribeiro"],["Role","Tech lead / Engineering manager"],["Location","Vitória da Conquista, Brazil"],["",""],["Work",""],["Focus","E-commerce, AI, engineering teams"],["Commerce","Shopify, headless commerce"],["Web","React, Next.js, Webflow"],["Agents","LangChain, Amazon Bedrock"],["",""],["Outside work",""],["Projects","AI agents, Three.js / WebGL"],["Home server","Intel N100 / 16 GB RAM"],["System","Debian 13 / Docker / Dockhand"],["",""],["Contact",""],["Website","iuri.io"],["GitHub","github.com/iuri1911"],["LinkedIn","linkedin.com/in/iuri1911"],["Email","iurics10@gmail.com"]];
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
let svg='<svg xmlns="http://www.w3.org/2000/svg" width="1160" height="740" viewBox="0 0 1160 740" role="img" aria-labelledby="title desc"><title id="title">Iuri Ribeiro</title><desc id="desc">ASCII portrait and terminal profile. Tech lead and engineering manager in e-commerce and AI. Contact: iuri.io.</desc><rect width="1160" height="740" rx="4" fill="#0B0B0C"/><rect x="1" y="1" width="1158" height="738" rx="4" fill="none" stroke="#2A2A26"/><path d="M0 48H1160" stroke="#2A2A26"/><g font-family="monospace" font-size="13" fill="#8B8B83"><text x="26" y="30">iuri1911 / README.md</text><text x="1040" y="30">bash</text></g>';
// Slow, decorative SVG rain works without JavaScript or external assets.
const glyphs = '012345789Z:.=*+-$#%';
let seed = 1911;
const random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
let rain = '<defs><clipPath id="rain-clip"><rect x="2" y="49" width="1156" height="689" rx="4"/></clipPath><pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 .5H4" stroke="#000" stroke-opacity=".12"/></pattern><radialGradient id="shade"><stop offset=".45" stop-color="#0B0B0C" stop-opacity="0"/><stop offset="1" stop-color="#0B0B0C" stop-opacity=".6"/></radialGradient></defs><style>@keyframes rain{from{transform:translateY(-720px)}to{transform:translateY(720px)}}.rain{animation:rain linear infinite}@media(prefers-reduced-motion:reduce){.rain{animation:none}}</style><g clip-path="url(#rain-clip)" aria-hidden="true" font-family="monospace" font-size="12" fill="#9FE870">';
for(let col=0;col<48;col++) {
  const x=14+col*24;
  const duration=28+random()*26;
  const delay=-random()*duration;
  rain+='<g class="rain" style="animation-duration:'+duration.toFixed(2)+'s;animation-delay:'+delay.toFixed(2)+'s">';
  for(let trail=0;trail<3;trail++) {
    const head=trail*480+Math.floor(random()*180);
    for(let j=0;j<15;j++) {
      const opacity=(.015+(1-j/15)*.065).toFixed(3);
      rain+='<text x="'+x+'" y="'+(head-j*15)+'" opacity="'+opacity+'">'+glyphs[Math.floor(random()*glyphs.length)]+'</text>';
    }
  }
  rain+='</g>';
}
rain+='</g><rect x="2" y="49" width="1156" height="689" fill="url(#shade)"/>';
// Paint rain before the frame and all foreground content.
const backgroundEnd=svg.indexOf('/>',svg.indexOf('<rect width="1160"'))+2;
svg=svg.slice(0,backgroundEnd)+rain+svg.slice(backgroundEnd);
const ramp=' .:-=+*#%@';
rows.forEach((row,y)=>{Array.from(row).forEach((ch,x)=>{if(ch===' ')return; const level=ramp.indexOf(ch)/9; const brightness=Math.round(55+200*level); const color='rgb('+Math.round(brightness*.70)+','+brightness+','+Math.round(brightness*.50)+')'; svg+='<text x="'+(28+x*6.05)+'" y="'+(135+y*10.3)+'" font-family="monospace" font-size="10" font-weight="bold" fill="'+color+'">'+esc(ch)+'</text>';});});
fields.forEach(([key,value],i)=>{const y=94+i*25; if(!key)return; if(!value){svg+='<text x="445" y="'+y+'" font-family="monospace" font-size="17" font-weight="bold" fill="#9FE870">'+esc(key)+'</text><path d="M445 '+(y+9)+'H1125" stroke="#2A2A26"/>';}else{svg+='<text x="445" y="'+y+'" font-family="monospace" font-size="15" fill="#8B8B83">'+esc(key)+'</text><text x="588" y="'+y+'" font-family="monospace" font-size="15" fill="#EDEDE8">'+esc(value)+'</text>';}});
svg+='<rect x="2" y="49" width="1156" height="689" fill="url(#scan)" pointer-events="none"/><text x="1030" y="708" font-family="monospace" font-size="16" fill="#9FE870">$ iuri.io</text></svg>';
const hash = createHash('sha256').update(svg).digest('hex').slice(0, 12);
const asset = 'assets/profile-' + hash + '.svg';
fs.writeFileSync(new URL(asset, root), svg);
const readme = new URL('README.md', root);
fs.writeFileSync(readme, fs.readFileSync(readme, 'utf8').replace(/assets\/profile(?:-[a-f0-9]+)?\.svg/g, asset));
