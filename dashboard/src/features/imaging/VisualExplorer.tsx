import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Image as ImageIcon, Search, ScanEye, X } from "lucide-react";
import type { VisualAsset, VisualManifest } from "../../types";
type Props = { mode: "imaging" | "explainability" };
export default function VisualExplorer({ mode }: Props) {
  const [assets,setAssets]=useState<VisualAsset[]>([]);
  const [loading,setLoading]=useState(true);
  const [query,setQuery]=useState("");
  const [origin,setOrigin]=useState("all");
  const [selected,setSelected]=useState<VisualAsset|null>(null);
  useEffect(()=>{fetch(`${import.meta.env.BASE_URL}data/visuals.json`).then(r=>r.ok?r.json():Promise.reject()).then((v:VisualManifest)=>setAssets(Array.isArray(v.assets)?v.assets:[])).catch(()=>setAssets([])).finally(()=>setLoading(false));},[]);
  const visible=useMemo(()=>assets.filter(a=>{
    const matchesMode=mode==="explainability"?a.category==="explainability":a.category!=="explainability";
    const matchesOrigin=origin==="all"||a.image_origin===origin;
    const text=`${a.title} ${a.description} ${a.dataset??""} ${a.modality??""} ${a.experiment??""}`.toLowerCase();
    return a.approved_for_publication&&matchesMode&&matchesOrigin&&text.includes(query.toLowerCase());
  }),[assets,mode,origin,query]);
  const title=mode==="imaging"?"Medical imaging explorer":"Explainability studio";
  const description=mode==="imaging"?"Explore published medical-imaging examples, documented by source, modality and experiment.":"Inspect published model-interpretability outputs with their method and experimental provenance.";
  const imagePath=(asset:VisualAsset)=>`${import.meta.env.BASE_URL}${asset.path.replace(/^\/+/,"")}`;
  return <div className="visual-explorer">
    <div className="heading"><div><div className="eyebrow"><span/> CLINICAL RESEARCH · VISUAL WORKSPACE</div><h1>{title}</h1><p>{description}</p></div></div>
    <div className="visual-disclaimer"><AlertCircle size={16}/><span>Research and educational visualization only. These materials are not diagnostic tools and must not be interpreted as clinical recommendations. Only assets explicitly approved for publication are displayed.</span></div>
    <section className="panel"><div className="panel-head"><div><small>CURATED VISUAL ASSETS</small><h3>{visible.length} approved {visible.length===1?"asset":"assets"}</h3></div>{mode==="imaging"?<ImageIcon/>:<ScanEye/>}</div>
      <div className="visual-toolbar"><label className="visual-search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by dataset, modality or experiment…"/></label>
        <select value={origin} onChange={e=>setOrigin(e.target.value)} aria-label="Filter by image origin"><option value="all">All origins</option><option value="public_dataset">Public dataset</option><option value="synthetic">Synthetic</option><option value="derived_result">Derived result</option></select></div>
      {loading?<div className="visual-empty"><ImageIcon size={26}/><b>Loading visual catalogue…</b></div>:visible.length?<div className="visual-grid">{visible.map(a=><article className="visual-card" key={a.id}><button onClick={()=>setSelected(a)} aria-label={`Open ${a.title}`}><img src={imagePath(a)} alt={a.title} loading="lazy"/><div className="visual-card-copy"><small>{a.image_origin.replaceAll("_"," ")}</small><b>{a.title}</b><p>{a.description}</p><div className="visual-meta">{a.modality&&<span>{a.modality}</span>}{a.organ&&<span>{a.organ}</span>}{a.dataset&&<span>{a.dataset}</span>}</div></div></button></article>)}</div>:<div className="visual-empty"><ImageIcon size={29}/><b>No approved visual assets yet</b><p>The catalogue is ready, but no image has been published here. Assets will appear after source, license, provenance and privacy review. Existing experiment images have not been automatically exposed.</p></div>}
    </section>
    {selected&&<div className="visual-modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={()=>setSelected(null)}><div className="visual-modal-panel" onClick={e=>e.stopPropagation()}><div className="visual-modal-head"><div><small className="eyebrow">VERIFIED RESEARCH ASSET</small><h3>{selected.title}</h3></div><button className="visual-close" onClick={()=>setSelected(null)} aria-label="Close"><X size={17}/></button></div><img src={imagePath(selected)} alt={selected.title}/><p>{selected.description}</p><div className="visual-meta">{selected.dataset&&<span>Dataset: {selected.dataset}</span>}{selected.license&&<span>License: {selected.license}</span>}{selected.method&&<span>Method: {selected.method}</span>}{selected.experiment&&<span>Experiment: {selected.experiment}</span>}</div>{selected.disclaimer&&<p>{selected.disclaimer}</p>}</div></div>}
  </div>;
}