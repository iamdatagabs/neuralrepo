import { useEffect, useRef, useState } from "react";
import { Activity, Crosshair, Info, RotateCcw } from "lucide-react";

type Metrics = { pixels:number; mean:number; deviation:number; entropy:number };
const SOURCE = "https://raw.githubusercontent.com/iamdatagabs/neuralrepo/main/experiments/braintumor/results/eda_samples.png";

export default function MRIExplorer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [ready,setReady] = useState(false);
  const [selection,setSelection] = useState({x:.28,y:.25,w:.38,h:.38});
  const [dragStart,setDragStart] = useState<{x:number;y:number}|null>(null);
  const [metrics,setMetrics] = useState<Metrics|null>(null);
  const [error,setError] = useState("");

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      imageRef.current = image;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = 720; canvas.height = 520;
      // The source figure is a 5-column x 2-row Matplotlib montage.
      // This viewport isolates the central tile in the lower (TUMOR) row.
      const sx = image.naturalWidth * .405;
      const sy = image.naturalHeight * .555;
      const sw = image.naturalWidth * .185;
      const sh = image.naturalHeight * .39;
      ctx.drawImage(image,sx,sy,sw,sh,0,0,canvas.width,canvas.height);
      setReady(true);
    };
    image.onerror = () => setError("Não foi possível carregar a imagem de origem.");
    image.src = SOURCE;
    return () => { image.onload = null; image.onerror = null; };
  },[]);

  const calculate = (region = selection) => {
    const canvas=canvasRef.current, ctx=canvas?.getContext("2d");
    if(!canvas||!ctx||!ready) return;
    const x=Math.max(0,Math.min(canvas.width-1,Math.round(region.x*canvas.width)));
    const y=Math.max(0,Math.min(canvas.height-1,Math.round(region.y*canvas.height)));
    const w=Math.max(1,Math.min(canvas.width-x,Math.round(region.w*canvas.width)));
    const h=Math.max(1,Math.min(canvas.height-y,Math.round(region.h*canvas.height)));
    const data=ctx.getImageData(x,y,w,h).data;
    const hist=new Array(256).fill(0); let sum=0,sum2=0,n=0;
    for(let i=0;i<data.length;i+=4){
      const gray=Math.round(.299*data[i]+.587*data[i+1]+.114*data[i+2]);
      hist[gray]++;sum+=gray;sum2+=gray*gray;n++;
    }
    const mean=sum/n, variance=Math.max(0,sum2/n-mean*mean);
    const entropy=hist.reduce((v,count)=>count? v-(count/n)*Math.log2(count/n):v,0);
    setMetrics({pixels:n,mean,deviation:Math.sqrt(variance),entropy});
  };
  useEffect(()=>{if(ready) calculate();},[ready]);

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
  const reset=()=>{const next={x:.28,y:.25,w:.38,h:.38};setSelection(next);calculate(next);};
  return <section className="mri-explorer">
    <div className="mri-heading"><div><div className="eyebrow"><span/> INTERACTIVE IMAGE ANALYSIS</div><h2>Brain MRI · ROI explorer</h2><p>Explore a single example from the TUMOR class and inspect pixel-level descriptors.</p></div><span className="mri-class">TUMOR · SAMPLE 03</span></div>
    <div className="mri-layout">
      <div className="mri-viewer panel">
        <div className="mri-viewer-top"><span><Crosshair size={15}/> SELECT REGION OF INTEREST</span><button onClick={reset}><RotateCcw size={14}/> Reset ROI</button></div>
        <div className="mri-canvas-wrap">
          <canvas ref={canvasRef} onPointerDown={start} onPointerMove={move} onPointerUp={finish} onPointerCancel={()=>setDragStart(null)} aria-label="MRI sample with draggable region of interest"/>
          {ready&&<div className="mri-roi" style={{left:`${selection.x*100}%`,top:`${selection.y*100}%`,width:`${selection.w*100}%`,height:`${selection.h*100}%`}}/>}
          {!ready&&!error&&<div className="mri-loading">Loading MRI sample…</div>}
          {error&&<div className="mri-loading">{error}</div>}
        </div>
        <p className="mri-hint">Clique e arraste sobre a imagem para selecionar uma nova região. A área destacada define os pixels analisados.</p>
      </div>
      <div className="mri-side">
        <section className="panel mri-metrics"><div className="panel-head"><div><small>ROI DESCRIPTORS</small><h3>Pixel statistics</h3></div><Activity size={18}/></div>
          <div className="mri-metric"><span>ROI area</span><b>{metrics?metrics.pixels.toLocaleString("en-US"):"—"} <small>px</small></b></div>
          <div className="mri-metric"><span>Mean intensity</span><b>{metrics?metrics.mean.toFixed(2):"—"} <small>/ 255</small></b></div>
          <div className="mri-metric"><span>Intensity dispersion (SD)</span><b>{metrics?metrics.deviation.toFixed(2):"—"}</b></div>
          <div className="mri-metric"><span>Shannon entropy</span><b>{metrics?metrics.entropy.toFixed(3):"—"} <small>bits</small></b></div>
        </section>
        <div className="visual-disclaimer"><Info size={16}/><span>Descritores computacionais da intensidade em escala de cinza. Não representam biomarcadores, medidas clínicas, segmentação tumoral ou suporte diagnóstico.</span></div>
      </div>
    </div>
    <div className="mri-method"><b>Method</b><span>Grayscale conversion · arithmetic mean · population standard deviation · Shannon entropy (256-bin histogram)</span><a href="https://github.com/iamdatagabs/neuralrepo/tree/main/experiments/braintumor" target="_blank" rel="noreferrer">Experiment source ↗</a></div>
  </section>;
}
