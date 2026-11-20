import { useEffect, useRef, useState } from "react";
import { Activity, Crosshair, Info, RotateCcw, ArrowLeftRight } from "lucide-react";

type Metrics = { pixels:number; mean:number; deviation:number; entropy:number };
type SampleClass = "NORMAL" | "TUMOR";
type Comparison = Record<SampleClass, Metrics>;
const SOURCE = "https://raw.githubusercontent.com/iamdatagabs/neuralrepo/main/experiments/braintumor/results/eda_samples.png";
const WIDTH = 720;
const HEIGHT = 520;
const ROI_DEFAULT = {x:.28,y:.25,w:.38,h:.38};

function cropRow(sample:SampleClass) {
  return sample === "NORMAL" ? .055 : .555;
}
function readMetrics(image:HTMLImageElement, sample:SampleClass, region:{x:number;y:number;w:number;h:number}):Metrics {
  const canvas=document.createElement("canvas");
  canvas.width=WIDTH; canvas.height=HEIGHT;
  const ctx=canvas.getContext("2d");
  if(!ctx) throw new Error("Canvas indisponível.");
  const sx=image.naturalWidth*.405, sy=image.naturalHeight*cropRow(sample);
  const sw=image.naturalWidth*.185, sh=image.naturalHeight*.39;
  ctx.drawImage(image,sx,sy,sw,sh,0,0,WIDTH,HEIGHT);
  const x=Math.max(0,Math.min(WIDTH-1,Math.round(region.x*WIDTH)));
  const y=Math.max(0,Math.min(HEIGHT-1,Math.round(region.y*HEIGHT)));
  const w=Math.max(1,Math.min(WIDTH-x,Math.round(region.w*WIDTH)));
  const h=Math.max(1,Math.min(HEIGHT-y,Math.round(region.h*HEIGHT)));
  const data=ctx.getImageData(x,y,w,h).data;
  const hist=new Array(256).fill(0); let sum=0,sum2=0,n=0;
  for(let i=0;i<data.length;i+=4){
    const gray=Math.round(.299*data[i]+.587*data[i+1]+.114*data[i+2]);
    hist[gray]++; sum+=gray; sum2+=gray*gray; n++;
  }
  const mean=sum/n, variance=Math.max(0,sum2/n-mean*mean);
  const entropy=hist.reduce((v,count)=>count?v-(count/n)*Math.log2(count/n):v,0);
  return {pixels:n,mean,deviation:Math.sqrt(variance),entropy};
}

export default function MRIExplorer() {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const imageRef=useRef<HTMLImageElement|null>(null);
  const [ready,setReady]=useState(false);
  const [activeClass,setActiveClass]=useState<SampleClass>("TUMOR");
  const [selection,setSelection]=useState(ROI_DEFAULT);
  const [dragStart,setDragStart]=useState<{x:number;y:number}|null>(null);
  const [comparison,setComparison]=useState<Comparison|null>(null);
  const [error,setError]=useState("");

  const calculate=(region=selection)=>{
    const image=imageRef.current;
    if(!image||!ready)return;
    try {
      setComparison({
        NORMAL:readMetrics(image,"NORMAL",region),
        TUMOR:readMetrics(image,"TUMOR",region)
      });
    } catch { setError("Não foi possível calcular os descritores desta região."); }
  };

  useEffect(()=>{
    const image=new Image();
    image.crossOrigin="anonymous";
    image.onload=()=>{imageRef.current=image;setReady(true);};
    image.onerror=()=>setError("Não foi possível carregar a imagem de origem.");
    image.src=SOURCE;
    return ()=>{image.onload=null;image.onerror=null;};
  },[]);

  useEffect(()=>{
    if(!ready)return;
    const image=imageRef.current,canvas=canvasRef.current,ctx=canvas?.getContext("2d");
    if(!image||!canvas||!ctx)return;
    canvas.width=WIDTH;canvas.height=HEIGHT;
    const sx=image.naturalWidth*.405,sy=image.naturalHeight*cropRow(activeClass);
    const sw=image.naturalWidth*.185,sh=image.naturalHeight*.39;
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    ctx.drawImage(image,sx,sy,sw,sh,0,0,WIDTH,HEIGHT);
    calculate(selection);
  },[ready,activeClass]);

  const point=(event:React.PointerEvent<HTMLCanvasElement>)=>{
    const rect=event.currentTarget.getBoundingClientRect();
    return {x:Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width)),y:Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height))};
  };
  const start=(event:React.PointerEvent<HTMLCanvasElement>)=>{event.currentTarget.setPointerCapture(event.pointerId);setDragStart(point(event));};
  const move=(event:React.PointerEvent<HTMLCanvasElement>)=>{
    if(!dragStart)return;
    const p=point(event);
    setSelection({x:Math.min(p.x,dragStart.x),y:Math.min(p.y,dragStart.y),w:Math.abs(p.x-dragStart.x),h:Math.abs(p.y-dragStart.y)});
  };
  const finish=(event:React.PointerEvent<HTMLCanvasElement>)=>{
    if(!dragStart)return;
    const p=point(event);
    const next={x:Math.min(p.x,dragStart.x),y:Math.min(p.y,dragStart.y),w:Math.max(.01,Math.abs(p.x-dragStart.x)),h:Math.max(.01,Math.abs(p.y-dragStart.y))};
    setSelection(next);setDragStart(null);calculate(next);
  };
  const reset=()=>{setSelection(ROI_DEFAULT);calculate(ROI_DEFAULT);};
  const fmt=(value:number)=>value.toFixed(2);
  const delta=(a:number,b:number)=>{const d=a-b;return `${d>0?"+":""}${d.toFixed(2)}`;};

  return <section className="mri-explorer">
    <div className="mri-heading"><div><div className="eyebrow"><span/> INTERACTIVE IMAGE ANALYSIS</div><h2>Brain MRI · ROI explorer</h2><p>Compare pixel-level descriptors across one NORMAL and one TUMOR example using the same region of interest.</p></div><span className="mri-class">PAIRED SAMPLE COMPARISON</span></div>
    <div className="mri-layout mri-compare-layout">
      <div className="mri-viewer panel">
        <div className="mri-viewer-top"><span><Crosshair size={15}/> SELECT REGION OF INTEREST</span><button onClick={reset}><RotateCcw size={14}/> Reset ROI</button></div>
        <div className="mri-class-switch" role="group" aria-label="Select MRI class">
          <button className={activeClass==="NORMAL"?"active normal":"normal"} onClick={()=>setActiveClass("NORMAL")}>NORMAL <small>Sample</small></button>
          <button className={activeClass==="TUMOR"?"active tumor":"tumor"} onClick={()=>setActiveClass("TUMOR")}>TUMOR <small>Sample</small></button>
        </div>
        <div className="mri-canvas-wrap">
          <canvas ref={canvasRef} onPointerDown={start} onPointerMove={move} onPointerUp={finish} onPointerCancel={()=>setDragStart(null)} aria-label={`Brain MRI ${activeClass} sample with draggable region of interest`}/>
          {ready&&<div className="mri-roi" style={{left:`${selection.x*100}%`,top:`${selection.y*100}%`,width:`${selection.w*100}%`,height:`${selection.h*100}%`}}/>}
          {!ready&&!error&&<div className="mri-loading">Loading MRI samples…</div>}
          {error&&<div className="mri-loading">{error}</div>}
        </div>
        <p className="mri-hint">Alterne entre NORMAL e TUMOR. A mesma posição relativa da ROI é aplicada às duas imagens. Clique e arraste para redefinir a região analisada.</p>
      </div>
      <div className="mri-side">
        <section className="panel mri-metrics mri-paired-metrics">
          <div className="panel-head"><div><small>PAIRED ROI DESCRIPTORS</small><h3>Same region · two classes</h3></div><ArrowLeftRight size={18}/></div>
          <div className="mri-compare-table">
            <div className="mri-compare-head"><span>DESCRIPTOR</span><b className="normal-text">NORMAL</b><b className="tumor-text">TUMOR</b></div>
            {comparison&&([
              ["ROI area",comparison.NORMAL.pixels.toLocaleString("en-US")+" px",comparison.TUMOR.pixels.toLocaleString("en-US")+" px"],
              ["Mean intensity",fmt(comparison.NORMAL.mean),fmt(comparison.TUMOR.mean)],
              ["Intensity SD",fmt(comparison.NORMAL.deviation),fmt(comparison.TUMOR.deviation)],
              ["Shannon entropy",comparison.NORMAL.entropy.toFixed(3),comparison.TUMOR.entropy.toFixed(3)]
            ] as [string,string,string][]).map(([label,n,t])=><div className="mri-compare-row" key={label}><span>{label}</span><b>{n}</b><b>{t}</b></div>)}
          </div>
          {comparison&&<div className="mri-deltas"><small>TUMOR − NORMAL · DESCRIPTIVE DIFFERENCE</small><div><span>Mean intensity</span><b>{delta(comparison.TUMOR.mean,comparison.NORMAL.mean)}</b></div><div><span>Intensity SD</span><b>{delta(comparison.TUMOR.deviation,comparison.NORMAL.deviation)}</b></div><div><span>Entropy</span><b>{delta(comparison.TUMOR.entropy,comparison.NORMAL.entropy)}</b></div></div>}
          {!comparison&&<div className="mri-loading">Calculating paired descriptors…</div>}
        </section>
        <div className="visual-disclaimer"><Info size={16}/><span>Comparação exploratória de duas amostras ilustrativas. Diferenças de intensidade e textura dependem da aquisição, do pré-processamento e da região selecionada; não são biomarcadores, medidas clínicas ou evidência diagnóstica.</span></div>
      </div>
    </div>
    <div className="mri-method"><b>Method</b><span>Same normalized ROI coordinates · grayscale conversion · mean · population standard deviation · Shannon entropy (256-bin histogram)</span><a href="https://github.com/iamdatagabs/neuralrepo/tree/main/experiments/braintumor" target="_blank" rel="noreferrer">Experiment source ↗</a></div>
  </section>;
}
