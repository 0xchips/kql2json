function el(id){return document.getElementById(id)}
const kqlEl = el('kql'), jsonEl = el('json'), statusEl = el('status')
const liveSync = el('liveSync')

function setStatus(msg, err){statusEl.textContent = msg; statusEl.style.color = err ? '#ffb4b4' : '#9aa6b2'}

function kqlToJson(){
  const kql = kqlEl.value
  const obj = { query: kql }
  try{
    const pretty = JSON.stringify(obj, null, 2)
    jsonEl.value = pretty
    setStatus('Converted KQL → JSON')
  }catch(e){ setStatus('Error formatting JSON: '+e.message, true) }
}

function jsonToKql(){
  const txt = jsonEl.value
  try{
    const obj = JSON.parse(txt)
    if(typeof obj.query === 'string'){
      kqlEl.value = obj.query
      setStatus('Converted JSON → KQL')
    }else{
      setStatus('JSON missing string field "query"', true)
    }
  }catch(e){ setStatus('Invalid JSON: '+e.message, true) }
}

function copy(elm){ elm.select(); document.execCommand('copy'); setStatus('Copied to clipboard') }

function download(filename, content){
  const blob = new Blob([content],{type:'text/plain'})
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href),2000)
}

el('toJson').addEventListener('click', ()=>{ kqlToJson() })
el('toKql').addEventListener('click', ()=>{ jsonToKql() })
el('copyKql').addEventListener('click', ()=>copy(kqlEl))
el('copyJson').addEventListener('click', ()=>copy(jsonEl))
el('downloadKql').addEventListener('click', ()=>download('query.kql', kqlEl.value))
el('downloadJson').addEventListener('click', ()=>download('query.json', jsonEl.value))

liveSync.addEventListener('change', ()=>{ setStatus(liveSync.checked ? 'Live sync enabled' : 'Live sync disabled') })

// Live sync: when enabled, converting in the source updates the other side
kqlEl.addEventListener('input', ()=>{ if(liveSync.checked) kqlToJson() })
jsonEl.addEventListener('input', ()=>{ if(liveSync.checked) jsonToKql() })

// Example: populate editors from sample files if available (helpful during dev)
/* If you want to prefill, paste contents here for local testing */

setStatus('Ready')
