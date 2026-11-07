var Field = (() => {
const demo={name:"Stress response",brief:"Does oxidative stress change HMOX1 abundance in our cells?\nOur experiment measures protein abundance, not transcript levels.",file:"example.tsv (synthetic)",rows:[["protein","condition","relative_abundance"],["HMOX1","control","1.0"],["HMOX1","stress","1.8"],["NQO1","stress","1.2"]],col:0};
function parse(raw,d){
 const rows=[];let row=[],cell="",quote=false,closed=false;raw=raw.replace(/^\uFEFF/,"");
 function end(){row.push(cell);cell="";closed=false}
 for(let i=0;i<raw.length;i++){let c=raw[i];if(quote){if(c==='"'){if(raw[i+1]==='"'){cell+='"';i++}else{quote=false;closed=true}}else cell+=c}
 else if(c===d)end();else if(c==="\n"||c==="\r"){if(c==="\r"&&raw[i+1]==="\n")i++;end();if(row.some(x=>x.trim()))rows.push(row);row=[]}
 else if(c==='"'&&!cell&&!closed)quote=true;else if(c==='"'||closed)throw Error("Unexpected character near a quoted field.");else cell+=c}
 if(quote)throw Error("Unclosed quoted field.");end();if(row.some(x=>x.trim()))rows.push(row);
 if(rows.length<2||rows[0].some(x=>!x.trim())||rows.some(r=>r.length!==rows[0].length))throw Error("Expected a header and data records with the same number of columns.");return rows}
function hits(p,id){return p.rows.slice(1).map((r,i)=>({r,n:i+1})).filter(({r})=>r[p.col].trim().toUpperCase()===id.trim().toUpperCase())}
function terms(s){return new Set((s.toLowerCase().match(/[a-z0-9-]{3,}/g)||[]).filter(x=>!('the and with that this for from are was were our does its into have has may different'.split(' ').includes(x))))}
function compare(s,b){let a=terms(s);return b.split(/\n+/).filter(Boolean).map(line=>({line,words:[...terms(line)].filter(x=>a.has(x))})).filter(x=>x.words.length).sort((a,b)=>b.words.length-a.words.length)[0]}
function request(s){if(!/\b(find|identify|locate|check|search|look up)\b/i.test(s)||!/\b(protein|dataset|table|data set|accession)\b/i.test(s))return "";return (s.match(/\b[A-Z][A-Z0-9-]{1,15}\b/g)||[]).find(x=>!["CSV","TSV","DNA","RNA","ID","MS","PDF"].includes(x))||""}
return {demo,parse,hits,compare,request};
})();
