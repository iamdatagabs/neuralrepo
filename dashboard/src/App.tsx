import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowUpRight, BarChart3, BrainCircuit, CheckCircle2, CircleAlert, Database, FileText, FlaskConical, Github, Image as ImageIcon, LayoutDashboard, Moon, RefreshCw, ScanEye, Search, ShieldCheck, Sun, Waves, Zap } from "lucide-react";
import VisualExplorer from "./features/imaging/VisualExplorer";
import MRIExplorer from "./features/imaging/MRIExplorer";
import type { DashboardData, Experiment } from "./types";

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "imaging", label: "Imaging lab", icon: ImageIcon },
  { id: "explainability", label: "Explainability", icon: ScanEye },
  { id: "benchmarks", label: "Model benchmark", icon: BarChart3 },
  { id: "tracks", label: "Research tracks", icon: FlaskConical },
  { id: "repro", label: "Reproducibility", icon: ShieldCheck },
];
const EMPTY: DashboardData = { generated_at: "", repository: "iamdatagabs/neuralrepo", total_experiments: 0, experiments: [], metrics_available: [], warnings: ["No exported experiment data found."] };
const METRICS = [{key:"accuracy",label:"Accuracy"},{key:"precision",label:"Precision"},{key:"recall",label:"Recall"},{key:"f1_score",label:"F1-score"},{key:"roc_auc",label:"ROC-AUC"}];
const fmt = (v:number) => v.toLocaleString("en-US",{style:"percent",maximumFractionDigits:2});
function App() {
  const [data,setData] = useState<DashboardData>(EMPTY);
  const [page,setPage] = useState("overview");
  const [dark,setDark] = useState(false);
  const [metric,setMetric] = useState("accuracy");
  const [query,setQuery] = useState("");
  const [loading,setLoading] = useState(true);
  const load = () => { setLoading(true); fetch(`${import.meta.env.BASE_URL}data/experiments.json`,{cache:"no-store"}).then(r=>r.ok?r.json():Promise.reject()).then((v:DashboardData)=>setData(v)).catch(()=>setData(EMPTY)).finally(()=>setLoading(false)); };
  useEffect(()=>{load();},[]);
  const experiments = useMemo(()=>data.experiments.filter(e=>`${e.name} ${e.model} ${e.dataset}`.toLowerCase().includes(query.toLowerCase())),[data,query]);
  const title = NAV.find(n=>n.id===page)?.label ?? "Overview";
  const mean = data.experiments.length ? data.experiments.reduce((s,e)=>s+(e.metrics[metric]??0),0)/data.experiments.filter(e=>typeof e.metrics[metric]==="number").length : 0;
  return <div className={dark?"shell dark":"shell light"}>
    <aside className="sidebar">
      <a className="brand" href="https://github.com/iamdatagabs/neuralrepo"><span className="brand-icon"><BrainCircuit size={22}/></span><span><b>NEURAL<span>REPO</span></b><small>RESEARCH INTELLIGENCE</small></span></a>
      <div className="workspace"><i/> RESEARCH WORKSPACE <span>2026</span></div>
      <p className="nav-caption">WORKSPACE</p>
      <nav>{NAV.map(n=><button key={n.id} className={page===n.id?"nav-link active":"nav-link"} onClick={()=>setPage(n.id)}><n.icon size={17}/>{n.label}{n.id==="benchmarks"&&<em>{data.total_experiments}</em>}</button>)}</nav>
      <div className="side-bottom"><div className="pipeline"><div><i/> <b>DATA PIPELINE</b><span>STATIC</span></div><p>Read-only view of versioned experiment artifacts.</p><small>LAST EXPORT</small><strong>{data.generated_at?new Date(data.generated_at).toLocaleString():"Awaiting data"}</strong></div><a href="https://github.com/iamdatagabs/neuralrepo" target="_blank" rel="noreferrer"><Github size={16}/> Repository <ArrowUpRight size={14}/></a></div>
    </aside>
    <main>
      <header className="topbar"><div className="crumb">NeuralRepo <span>/</span> <b>{title}</b></div><div className="top-actions"><span className="repo-state"><i/> PUBLIC REPOSITORY</span><button className="icon-btn" onClick={load} title="Refresh data"><RefreshCw size={16}/></button><button className="icon-btn" onClick={()=>setDark(!dark)} title="Toggle theme">{dark?<Sun size={16}/>:<Moon size={16}/>}</button><a className="avatar" href="https://github.com/iamdatagabs">GP</a></div></header>
      <div className="content">
        <div className="heading"><div><div className="eyebrow"><span/> EXPERIMENTAL AI · MEDICAL IMAGING</div><h1>{page==="overview"?"Research overview":title}</h1><p>From model experiments to reproducible evidence.</p></div><a className="outline" href="https://github.com/iamdatagabs/neuralrepo" target="_blank" rel="noreferrer"><Github size={15}/> View source <ArrowUpRight size={14}/></a></div>
        {loading&&<div className="loading"><span/> Syncing repository artifacts…</div>}
        {page==="overview"&&<Overview data={data} mean={mean} metric={metric} onNavigate={setPage}/>}
        {page==="imaging"&&<><VisualExplorer mode="imaging"/><MRIExplorer/></>}
        {page==="explainability"&&<VisualExplorer mode="explainability"/>}
        {page==="benchmarks"&&<Benchmarks experiments={experiments} metric={metric} setMetric={setMetric} query={query} setQuery={setQuery}/>}
        {page==="tracks"&&<Tracks experiments={data.experiments}/>}
        {page==="repro"&&<Repro data={data}/>}
        <footer><span>NEURALREPO <i>·</i> RESEARCH DASHBOARD</span><span>Built for reproducibility <i>✳</i></span></footer>
      </div>
    </main>
  </div>;
}
function Stat({icon,label,value,foot}:{icon:React.ReactNode;label:string;value:string;foot:string}) {return <div className="stat"><div className="stat-icon">{icon}</div><small>{label}</small><strong>{value}</strong><em>{foot}</em></div>}
function Overview({data,mean,metric,onNavigate}:{data:DashboardData;mean:number;metric:string;onNavigate:(s:string)=>void}) {
  const best=[...data.experiments].sort((a,b)=>(b.metrics.roc_auc??0)-(a.metrics.roc_auc??0))[0];
  return <div className="stack">
    <section className="hero"><div className="hero-orbit"><div/><div/><BrainCircuit size={42}/></div><div className="hero-copy"><div className="hero-label"><i/> RESEARCH ENVIRONMENT <b>01 / OBSERVED DATA</b></div><h2>From experiments<br/>to <span>evidence.</span></h2><p>A research workspace for deep learning, medical imaging, domain adaptation and efficient AI.</p><button onClick={()=>onNavigate("benchmarks")}>Explore model benchmark <ArrowUpRight size={16}/></button></div><div className="hero-index">NR / LAB <b>2026</b></div></section>
    <section className="visual-showcase">
      <div className="visual-showcase-head">
        <div><div className="eyebrow"><span/> SELECTED RESEARCH OUTPUTS</div><h2>See the research in action.</h2><p>Real assets published from the Brain Tumor MRI experiment.</p></div>
        <button className="showcase-link" onClick={()=>onNavigate("imaging")}>Open Imaging Lab <ArrowUpRight size={15}/></button>
      </div>
      <div className="showcase-grid">
        <button className="showcase-card showcase-featured" onClick={()=>onNavigate("imaging")}>
          <div className="showcase-image"><img src="https://raw.githubusercontent.com/iamdatagabs/neuralrepo/main/experiments/braintumor/results/eda_samples.png" alt="Brain MRI dataset examples showing NORMAL and TUMOR classes" loading="lazy"/><span className="showcase-chip">IMAGING LAB</span></div>
          <div className="showcase-copy"><small>01 / MEDICAL IMAGING</small><b>Brain MRI · Dataset exploration</b><p>Examples from the public Brain MRI dataset, with source and provenance documented.</p></div>
        </button>
        <button className="showcase-card" onClick={()=>onNavigate("explainability")}>
          <div className="showcase-image"><img src="https://raw.githubusercontent.com/iamdatagabs/neuralrepo/main/experiments/braintumor/results/gradcam_visualization.png" alt="Grad-CAM heatmap visualizations for brain MRI examples" loading="lazy"/><span className="showcase-chip">EXPLAINABILITY</span></div>
          <div className="showcase-copy"><small>02 / MODEL INTERPRETABILITY</small><b>Grad-CAM · Activation maps</b><p>Exploratory heatmaps and overlays associated with model outputs.</p></div>
        </button>
        <button className="showcase-card" onClick={()=>onNavigate("imaging")}>
          <div className="showcase-image"><img src="https://raw.githubusercontent.com/iamdatagabs/neuralrepo/main/experiments/braintumor/results/augmentation_preview.png" alt="Brain MRI images before and after data augmentation" loading="lazy"/><span className="showcase-chip">DATA PIPELINE</span></div>
          <div className="showcase-copy"><small>03 / DATA AUGMENTATION</small><b>Image transformations</b><p>Examples of methodological transformations applied during experimentation.</p></div>
        </button>
      </div>
      <div className="showcase-foot"><ShieldCheck size={15}/><span>Research and educational material. Visualizations are not diagnostic tools or evidence of clinical validity.</span></div>
    </section>
    <div className="section-head"><div><small>AT A GLANCE</small><h2>Research indicators</h2></div><span>SOURCE: VERSIONED REPOSITORY ARTIFACTS</span></div>
    <div className="stats">
      <Stat icon={<FlaskConical/>} label="Benchmark records" value={String(data.total_experiments)} foot="Rows from recorded CSV benchmark"/>
      <Stat icon={<BarChart3/>} label={metric.replace("_"," ").toUpperCase()+" · MEAN"} value={data.experiments.length?fmt(mean):"—"} foot="Descriptive mean of this benchmark"/>
      <Stat icon={<Database/>} label="Datasets represented" value={String(new Set(data.experiments.map(e=>e.dataset)).size)} foot="From indexed result artifacts"/>
      <Stat icon={<Activity/>} label="Metric dimensions" value={String(data.metrics_available.length)} foot="Quantitative fields available"/>
    </div>
    <div className="grid-two">
      <section className="panel"><div className="panel-head"><div><small>MODEL COMPARISON</small><h3>Recorded performance</h3></div><span className="tag">CSV SOURCE</span></div><div className="chart">{METRICS.slice(0,4).map(m=><div className="bar-row" key={m.key}><label>{m.label}</label><div className="bar-track">{data.experiments.map(e=><div className="bar-wrap" key={e.id}><div className="bar" style={{width:`${(e.metrics[m.key]??0)*100}%`}}/><small>{fmt(e.metrics[m.key]??0)}</small></div>)}</div></div>)}</div><div className="legend">{data.experiments.map((e,i)=><span key={e.id}><i className={i?"violet":""}/>{e.model}</span>)}</div></section>
      <section className="panel"><div className="panel-head"><div><small>RESEARCH TRACKS</small><h3>Areas in the repository</h3></div><Waves size={18}/></div><div className="track-list"><Track icon={<BrainCircuit/>} title="Medical imaging" detail="Brain MRI · Chest X-ray"/><Track icon={<Waves/>} title="Domain adaptation" detail="Cross-domain generalization"/><Track icon={<Zap/>} title="TinyML & efficient AI" detail="Compression · Edge deployment"/></div><p className="muted-note">Tracks are indexed from repository documentation. Only tracks with recorded metrics appear in the benchmark.</p></section>
    </div>
    <section className="panel"><div className="panel-head"><div><small>BEST RECORDED ROC-AUC</small><h3>{best?.model??"No benchmark record"}</h3></div><strong className="big-number">{best?fmt(best.metrics.roc_auc??0):"—"}</strong></div><p className="muted-note">The highest ROC-AUC in the currently indexed Brain Tumor MRI benchmark. This is a descriptive result, not evidence of clinical readiness.</p></section>
    {data.warnings.length>0&&<div className="notice"><CircleAlert size={18}/><div><b>Scientific context & limitations</b>{data.warnings.map((w,i)=><p key={i}>{w}</p>)}</div></div>}
  </div>;
}
function Track({icon,title,detail}:{icon:React.ReactNode;title:string;detail:string}) {return <div className="track"><span>{icon}</span><div><b>{title}</b><small>{detail}</small></div><ArrowUpRight size={15}/></div>}
function Benchmarks({experiments,metric,setMetric,query,setQuery}:{experiments:Experiment[];metric:string;setMetric:(s:string)=>void;query:string;setQuery:(s:string)=>void}) {
  return <div className="stack"><section className="panel"><div className="panel-head"><div><small>COMPARATIVE ANALYSIS</small><h3>Brain Tumor MRI · Model benchmark</h3><p className="muted-note">Values read from experiments/braintumor/results/model_comparison.csv.</p></div><select value={metric} onChange={e=>setMetric(e.target.value)}>{METRICS.map(m=><option value={m.key} key={m.key}>{m.label}</option>)}</select></div><div className="filter"><Search size={16}/><input placeholder="Filter model or dataset…" value={query} onChange={e=>setQuery(e.target.value)}/></div><div className="table-wrap"><table><thead><tr><th>MODEL</th><th>ACCURACY</th><th>PRECISION</th><th>RECALL</th><th>F1-SCORE</th><th>ROC-AUC</th></tr></thead><tbody>{experiments.map(e=><tr key={e.id}><td><b>{e.model}</b><small>{e.path}</small></td>{METRICS.map(m=><td key={m.key}>{fmt(e.metrics[m.key]??0)}</td>)}</tr>)}</tbody></table></div><div className="benchmark-highlight"><div><small>SELECTED METRIC</small><b>{METRICS.find(m=>m.key===metric)?.label}</b></div>{experiments.map(e=><div key={e.id}><small>{e.model}</small><strong>{fmt(e.metrics[metric]??0)}</strong></div>)}</div></section><div className="notice"><CircleAlert size={18}/><div><b>Interpretation note</b><p>These are recorded results from one experiment. The experiment README notes a limited dataset and no external validation. Do not interpret these metrics as clinical performance estimates.</p></div></div></div>;
}
function Tracks({experiments}:{experiments:Experiment[]}) {
  const items=[{title:"Brain tumor MRI classification",desc:"Binary image classification using convolutional neural networks and transfer learning.",status:"Metrics available",icon:<BrainCircuit/>,href:"https://github.com/iamdatagabs/neuralrepo/tree/main/experiments/braintumor"},{title:"Chest X-ray domain adaptation",desc:"Source/target domain shift, adaptation strategies and robustness evaluation.",status:"Documentation / code",icon:<Waves/>,href:"https://github.com/iamdatagabs/neuralrepo/tree/main/experiments/domain-adaptation/chest-xray"},{title:"TinyML & model efficiency",desc:"Research direction documented in the repository; no structured benchmark exported yet.",status:"Research direction",icon:<Zap/>,href:"https://github.com/iamdatagabs/neuralrepo"}];
  return <div className="stack"><div className="track-cards">{items.map((it,i)=><a className="track-card" key={it.title} href={it.href} target="_blank" rel="noreferrer"><span className="track-card-icon">{it.icon}</span><small>TRACK 0{i+1}</small><h3>{it.title}</h3><p>{it.desc}</p><div>{it.status}<ArrowUpRight size={14}/></div></a>)}</div><section className="panel"><div className="panel-head"><div><small>INDEXED QUANTITATIVE RECORDS</small><h3>{experiments.length} model records</h3></div><CheckCircle2 size={18}/></div><p className="muted-note">The dashboard separates documented research tracks from experiments that have machine-readable quantitative results. No placeholder metric is generated.</p></section></div>;
}
function Repro({data}:{data:DashboardData}) {
  return <div className="stack"><section className="hero compact"><div className="hero-copy"><div className="hero-label"><i/> SCIENTIFIC INTEGRITY</div><h2>Traceability<br/>before <span>claims.</span></h2><p>Only aggregate metrics and safe experiment metadata are published to this dashboard.</p></div></section><div className="stats"><Stat icon={<FileText/>} label="Metric fields" value={String(data.metrics_available.length)} foot="Normalized from source CSV"/><Stat icon={<Database/>} label="Indexed records" value={String(data.total_experiments)} foot="Benchmark model rows"/><Stat icon={<CircleAlert/>} label="Context notes" value={String(data.warnings.length)} foot="Limitations and governance notes"/><Stat icon={<RefreshCw/>} label="Generated" value={data.generated_at?new Date(data.generated_at).toLocaleDateString():"—"} foot="UTC export timestamp"/></div><section className="panel"><div className="panel-head"><div><small>DATA EXPORT POLICY</small><h3>Published / excluded artifacts</h3></div><ShieldCheck size={18}/></div><div className="policy-grid"><div><b className="good">PUBLISHED</b><p>Aggregate model metrics, model labels, experiment paths and export timestamp.</p></div><div><b className="blocked">NOT PUBLISHED</b><p>Patient-level data, predictions, images, DICOM files, checkpoints, raw telemetry or identifiable metadata.</p></div></div></section><section className="panel"><div className="panel-head"><div><small>REPOSITORY GOVERNANCE</small><h3>Validation status</h3></div></div>{data.warnings.map((w,i)=><div className="audit-row" key={i}><CircleAlert size={16}/>{w}</div>)}</section></div>;
}
export default App;