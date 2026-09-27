import { useState, useEffect, useRef } from "react";

const LOGO = "data:image/jpeg;base64,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";

const Y = "#FFD600";
const BK = "#0a0a0a";
const C1 = "#141414";
const C2 = "#1e1e1e";
const C3 = "#2a2a2a";
const MT = "#555";
const LT = "#888";

const SHOPS = [
  {
    id:"s1", name:"Classic Cuts", location:"Escazú, San José",
    address:"Av. Escazú, frente al Centro Comercial", rating:4.9, reviews:312,
    open:true, mapX:22, mapY:52, distance:"0.8 km",
    barbers:[
      { id:1, name:"Carlos Mendoza", img:"CM", rating:4.9, reviews:128, price:9500,
        specialty:"Fade clásico · Barba", available:true, domicilio:false,
        slots:["10:00","11:30","13:00","16:00","17:30"],
        bio:"10 años de experiencia en cortes clásicos y modernos. Especialista en fades y diseños de barba.",
        reviewList:[
          {user:"Rodrigo V.",stars:5,comment:"Excelente trabajo, muy puntual.",date:"Hace 2 días"},
          {user:"Luis M.",stars:5,comment:"El mejor fade que me han hecho.",date:"Hace 1 semana"},
          {user:"Jorge P.",stars:4,comment:"Muy buena atención, lo recomiendo.",date:"Hace 2 semanas"},
        ]},
      { id:5, name:"Marco Jiménez", img:"MJ", rating:4.7, reviews:84, price:8500,
        specialty:"Corte clásico · Barba", available:true, domicilio:false,
        slots:["09:30","11:00","14:00","16:30"],
        bio:"Especialista en cortes clásicos y degradados. 6 años dando servicio en Escazú.",
        reviewList:[
          {user:"Andrés P.",stars:5,comment:"Muy buen servicio, recomendado.",date:"Hace 3 días"},
          {user:"David R.",stars:4,comment:"Puntual y profesional.",date:"Hace 1 semana"},
        ]},
    ],
  },
  {
    id:"s2", name:"Navaja & Co.", location:"Rohrmoser, San José",
    address:"Contiguo al Parque La Sabana, entrada principal", rating:4.8, reviews:521,
    open:true, mapX:52, mapY:44, distance:"1.4 km",
    barbers:[
      { id:3, name:"Arturo Silva", img:"AS", rating:4.8, reviews:211, price:13000,
        specialty:"Corte clásico · Rasurado", available:true, domicilio:false,
        slots:["10:30","12:00","15:00","17:00"],
        bio:"Maestro barbero con técnicas tradicionales europeas. Especialista en rasurado con navaja.",
        reviewList:[
          {user:"Pablo S.",stars:5,comment:"Una experiencia única, muy profesional.",date:"Hace 1 día"},
          {user:"Héctor M.",stars:5,comment:"El rasurado con navaja es espectacular.",date:"Hace 5 días"},
          {user:"Omar T.",stars:5,comment:"Atención de lujo a buen precio.",date:"Hace 2 semanas"},
        ]},
      { id:6, name:"Felipe Mora", img:"FM", rating:4.6, reviews:98, price:11000,
        specialty:"Fade · Diseños · Barba", available:false, domicilio:false,
        slots:["10:00","13:30","16:00"],
        bio:"Barbero creativo, especialista en diseños y degradados modernos.",
        reviewList:[
          {user:"Gabriel T.",stars:5,comment:"Diseño perfecto, muy creativo.",date:"Hace 4 días"},
          {user:"Sofía M.",stars:4,comment:"Para el corte de mi hijo, excelente.",date:"Hace 1 semana"},
        ]},
    ],
  },
  {
    id:"s3", name:"BarberKing", location:"San Pedro, San José",
    address:"300m norte del Mall San Pedro, sobre la rotonda", rating:4.5, reviews:178,
    open:false, mapX:75, mapY:35, distance:"2.1 km",
    barbers:[
      { id:7, name:"Luis Vargas", img:"LV", rating:4.5, reviews:97, price:8000,
        specialty:"Fade · Corte moderno", available:false, domicilio:false,
        slots:["11:00","13:00","15:30","17:30"],
        bio:"Joven barbero con estilo urbano. Especialista en fades y cortes de tendencia.",
        reviewList:[
          {user:"Esteban R.",stars:5,comment:"Muy buen corte y buena onda.",date:"Hace 1 semana"},
          {user:"Camila V.",stars:4,comment:"Para el corte de mi novio, quedó increíble.",date:"Hace 2 semanas"},
        ]},
    ],
  },
];

const DOMICILIO = [
  { id:2, name:"Diego Ramos", img:"DR", rating:4.7, reviews:94, price:11500,
    specialty:"Domicilio · Fade · Diseños", available:true, domicilio:true, location:"San Pedro, San José",
    slots:["09:00","12:00","14:30","18:00"],
    bio:"Servicio a domicilio en toda la ciudad. Equipo profesional y desinfectado.",
    reviewList:[
      {user:"Ana G.",stars:5,comment:"Llegó puntual y el corte quedó increíble.",date:"Hace 2 días"},
      {user:"Miguel R.",stars:4,comment:"Muy práctico, lo volvería a pedir.",date:"Hace 1 semana"},
      {user:"Fernanda L.",stars:5,comment:"Perfecto para mi esposo.",date:"Hace 2 semanas"},
    ]},
  { id:4, name:"Kevin Torres", img:"KT", rating:4.6, reviews:57, price:8500,
    specialty:"Domicilio · Corte moderno", available:false, domicilio:true, location:"Barrio Amón, San José",
    slots:["11:00","13:30","16:30"],
    bio:"Barbero independiente con servicio a domicilio. Cortes urbanos y tendencias actuales.",
    reviewList:[
      {user:"Iván C.",stars:5,comment:"Muy buena onda y gran trabajo.",date:"Hace 3 días"},
      {user:"Samuel B.",stars:4,comment:"Rápido y preciso.",date:"Hace 2 semanas"},
    ]},
];

const MY_APTS = [
  {id:1,barber:"Carlos Mendoza",shop:"Classic Cuts",service:"Fade clásico",date:"Hoy",time:"11:30",status:"confirmada",price:9500},
  {id:2,barber:"Arturo Silva",shop:"Navaja & Co.",service:"Rasurado con navaja",date:"Vie 9 May",time:"15:00",status:"pendiente",price:13000},
];

// ── ATOMS ──────────────────────────────────────────────────────────────────────
const Stars = ({n,size=12}) => (
  <span style={{fontSize:size,letterSpacing:1}}>
    {[1,2,3,4,5].map(i=><span key={i} style={{color:i<=Math.round(n)?Y:"#2a2a2a"}}>★</span>)}
  </span>
);

const Pill = ({children,yellow,style={}}) => (
  <span style={{display:"inline-flex",alignItems:"center",padding:"4px 11px",borderRadius:20,fontSize:11,fontWeight:700,background:yellow?Y:C3,color:yellow?BK:LT,border:`1px solid ${yellow?Y:C3}`,...style}}>{children}</span>
);

const Av = ({initials,size=48,dom}) => (
  <div style={{width:size,height:size,borderRadius:"50%",flexShrink:0,position:"relative",background:dom?Y:C2,color:dom?BK:Y,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:size*.28,border:`2px solid ${Y}`}}>
    {initials}
    {dom&&<span style={{position:"absolute",bottom:-2,right:-2,width:16,height:16,borderRadius:"50%",background:Y,color:BK,fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",border:`1.5px solid ${BK}`}}>🏠</span>}
  </div>
);

const Card = ({children,onClick,style={}}) => (
  <div onClick={onClick} style={{background:C1,border:`1.5px solid ${C2}`,borderRadius:16,padding:16,cursor:onClick?"pointer":"default",...style}}>{children}</div>
);

const Btn = ({children,disabled,onClick,ghost,small,style={}}) => (
  <button onClick={onClick} disabled={disabled} style={{width:"100%",padding:small?"10px":"15px 20px",borderRadius:12,border:ghost?`1.5px solid ${C3}`:"none",background:ghost?"transparent":disabled?C3:Y,color:ghost?LT:disabled?MT:BK,fontFamily:"'DM Sans',sans-serif",fontSize:small?13:15,fontWeight:800,cursor:disabled?"not-allowed":"pointer",transition:"opacity .15s",...style}}>{children}</button>
);

// ── MAP (Leaflet - Mapa real de Costa Rica) ────────────────────────────────────
const SHOP_COORDS = {
  "s1": { lat: 9.9333, lng: -84.1500 }, // Escazú
  "s2": { lat: 9.9381, lng: -84.1024 }, // Rohrmoser / La Sabana
  "s3": { lat: 9.9346, lng: -84.0500 }, // San Pedro
};

const MapSVG = ({shops, highlight, onPin}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [ready, setReady] = useState(!!window.L);

  useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    if (!window.L) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => setReady(true);
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!ready || !mapRef.current || mapInstanceRef.current) return;

    const map = window.L.map(mapRef.current, {
      center: [9.9365, -84.1050],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    window.L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Inject popup style
    if (!document.getElementById("ss-popup-style")) {
      const st = document.createElement("style");
      st.id = "ss-popup-style";
      st.innerHTML = `.ss-popup .leaflet-popup-content-wrapper{background:#141414;border:1.5px solid #2a2a2a;border-radius:12px;padding:0;box-shadow:0 4px 20px rgba(0,0,0,.7);color:#fff}.ss-popup .leaflet-popup-content{margin:0}.ss-popup .leaflet-popup-tip{background:#141414}`;
      document.head.appendChild(st);
    }

    shops.forEach(s => {
      const coords = SHOP_COORDS[s.id];
      if (!coords) return;
      const isSelected = highlight === s.id;
      const icon = window.L.divIcon({
        html: `<div style="width:${isSelected?40:34}px;height:${isSelected?40:34}px;background:${Y};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center"><span style="transform:rotate(45deg);font-size:${isSelected?16:13}px;line-height:1;display:block;text-align:center;margin-top:4px">✂</span></div>`,
        className: "",
        iconSize: [isSelected?40:34, isSelected?40:34],
        iconAnchor: [isSelected?20:17, isSelected?40:34],
        popupAnchor: [0, -36],
      });
      window.L.marker([coords.lat, coords.lng], {icon})
        .addTo(map)
        .bindPopup(`<div style="padding:10px;min-width:150px"><div style="font-weight:700;font-size:13px;margin-bottom:3px;color:#fff">${s.name}</div><div style="font-size:11px;color:#888;margin-bottom:5px">📍 ${s.location}</div><div style="font-size:11px;color:${Y}">★ ${s.rating} &nbsp;·&nbsp; <span style="color:${s.open?"#22c55e":"#ef4444"}">${s.open?"Abierto":"Cerrado"}</span></div></div>`, {className:"ss-popup"})
        .on("click", () => onPin && onPin(s));
    });

    // User location
    window.L.circleMarker([9.9350, -84.0880], {
      radius: 8, color: "#4ade80", fillColor: "#4ade80",
      fillOpacity: 1, weight: 3,
    }).addTo(map).bindPopup(`<div style="padding:8px;color:#fff;font-size:12px"><b>📍 Tu ubicación</b></div>`, {className:"ss-popup"});

    mapInstanceRef.current = map;
  }, [ready]);

  return (
    <div style={{borderRadius:14,overflow:"hidden",border:`1.5px solid ${C2}`}}>
      {!ready && (
        <div style={{height:210,background:"#0e0e0e",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8}}>
          <div style={{fontSize:20}}>🗺️</div>
          <span style={{color:MT,fontSize:12,fontFamily:"'DM Mono',monospace"}}>Cargando mapa...</span>
        </div>
      )}
      <div ref={mapRef} style={{height:210,display:ready?"block":"none"}}/>
      <div style={{background:"#0e0e0e",padding:"8px 14px",display:"flex",alignItems:"center",gap:8,borderTop:`1px solid ${C2}`}}>
        <span style={{width:7,height:7,borderRadius:"50%",background:"#4ade80",display:"inline-block",flexShrink:0}}/>
        <span style={{fontSize:11,color:MT,fontFamily:"'DM Mono',monospace"}}>San José, Costa Rica 🇨🇷</span>
        <span style={{marginLeft:"auto",fontSize:10,color:Y,fontFamily:"'DM Mono',monospace",flexShrink:0}}>✂ barbería</span>
      </div>
    </div>
  );
};

// ── SPLASH ─────────────────────────────────────────────────────────────────────
const Splash = ({onDone}) => {
  const [step,setStep] = useState(0);
  useEffect(()=>{
    const t1=setTimeout(()=>setStep(1),500);
    const t2=setTimeout(()=>setStep(2),1300);
    const t3=setTimeout(()=>onDone(),2900);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[]);
  return(
    <div style={{position:"absolute",inset:0,background:BK,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:200}}>
      <style>{`
        @keyframes pop{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 ${Y}66}50%{box-shadow:0 0 0 20px ${Y}00}}
      `}</style>
      <div style={{animation:step>=1?"pop .5s cubic-bezier(.34,1.56,.64,1) forwards":"none",opacity:0,marginBottom:28}}>
        <img src={LOGO} alt="ShaveSmart" style={{width:120,height:120,borderRadius:28,objectFit:"cover",boxShadow:`0 0 40px ${Y}55`}}/>
      </div>
      <div style={{animation:step>=2?"fadeUp .5s ease forwards":"none",opacity:0,textAlign:"center"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:38,fontWeight:900,color:"#fff",letterSpacing:-1}}>Shave<span style={{color:Y,fontStyle:"italic"}}>Smart</span></div>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:MT,letterSpacing:3,marginTop:8}}>TU BARBERÍA, CUANDO QUERÁS</div>
      </div>
      <div style={{position:"absolute",bottom:44,display:"flex",gap:6}}>
        {[0,1,2].map(i=><div key={i} style={{width:i===1?24:6,height:6,borderRadius:3,background:i===1?Y:C2,transition:"all .3s"}}/>)}
      </div>
    </div>
  );
};

// ── AUTH ───────────────────────────────────────────────────────────────────────
const Auth = ({onLogin}) => {
  const [mode,setMode] = useState("login");
  const [form,setForm] = useState({name:"",email:"",pass:""});
  const [loading,setLoading] = useState(false);
  const set = k => e => setForm({...form,[k]:e.target.value});
  const submit = () => {
    if(!form.email||!form.pass) return;
    setLoading(true);
    setTimeout(()=>{setLoading(false);onLogin(form.name||"Usuario");},1100);
  };
  const inputStyle = {width:"100%",padding:"14px 16px",background:C1,border:`1.5px solid ${C2}`,borderRadius:12,color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:14,outline:"none",boxSizing:"border-box"};
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",padding:"32px 24px",justifyContent:"center"}}>
      <div style={{textAlign:"center",marginBottom:36}}>
        <img src={LOGO} alt="ShaveSmart" style={{width:70,height:70,borderRadius:18,objectFit:"cover",margin:"0 auto 16px",display:"block"}}/>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:900,color:"#fff"}}>{mode==="login"?"Bienvenido de vuelta":"Crear cuenta"}</div>
        <div style={{fontSize:13,color:LT,marginTop:4}}>{mode==="login"?"Ingresá a tu cuenta ShaveSmart":"Únete a ShaveSmart gratis"}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
        {mode==="register"&&<input placeholder="Tu nombre completo" value={form.name} onChange={set("name")} style={inputStyle}/>}
        <input placeholder="Correo electrónico" value={form.email} onChange={set("email")} style={inputStyle}/>
        <input type="password" placeholder="Contraseña" value={form.pass} onChange={set("pass")} style={inputStyle}/>
      </div>
      <Btn onClick={submit} disabled={loading}>{loading?"⏳ Ingresando...":mode==="login"?"Iniciar sesión":"Crear cuenta"}</Btn>
      <div style={{textAlign:"center",marginTop:16,fontSize:13,color:LT}}>
        {mode==="login"?"¿No tenés cuenta? ":"¿Ya tenés cuenta? "}
        <span onClick={()=>setMode(mode==="login"?"register":"login")} style={{color:Y,cursor:"pointer",fontWeight:700}}>{mode==="login"?"Registrate":"Ingresá"}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12,margin:"24px 0 16px"}}>
        <div style={{flex:1,height:1,background:C2}}/><span style={{fontSize:12,color:MT}}>o continuá con</span><div style={{flex:1,height:1,background:C2}}/>
      </div>
      <div style={{display:"flex",gap:10}}>
        {["🌐 Google","📘 Facebook"].map(p=>(
          <button key={p} onClick={()=>onLogin("Usuario")} style={{flex:1,padding:"12px",background:C1,border:`1.5px solid ${C2}`,borderRadius:12,color:LT,fontFamily:"'DM Sans',sans-serif",fontSize:13,cursor:"pointer"}}>{p}</button>
        ))}
      </div>
    </div>
  );
};

// ── EXPLORE ────────────────────────────────────────────────────────────────────
const Explore = ({onShop,onBarber}) => {
  const [filter,setFilter] = useState("todos");
  const [search,setSearch] = useState("");
  const fShops = SHOPS.filter(s=>(filter==="todos"||filter==="barberia")&&(search===""||s.name.toLowerCase().includes(search.toLowerCase())||s.location.toLowerCase().includes(search.toLowerCase())));
  const fDom   = DOMICILIO.filter(b=>(filter==="todos"||filter==="domicilio")&&(search===""||b.name.toLowerCase().includes(search.toLowerCase())));
  return(
    <div style={{padding:"20px 16px 16px"}}>
      {/* Search */}
      <div style={{position:"relative",marginBottom:16}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar barbería o barbero..."
          style={{width:"100%",padding:"13px 16px 13px 44px",background:C1,border:`1.5px solid ${C2}`,borderRadius:12,color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:14,outline:"none",boxSizing:"border-box"}}/>
        <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:17,color:MT}}>🔍</span>
        {search&&<span onClick={()=>setSearch("")} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",color:MT,cursor:"pointer"}}>✕</span>}
      </div>
      {/* Filters */}
      <div style={{display:"flex",gap:8,marginBottom:20,overflowX:"auto",paddingBottom:2}}>
        {[{k:"todos",l:"Todos"},{k:"barberia",l:"🏪 Barbería"},{k:"domicilio",l:"🏠 A domicilio"}].map(f=>(
          <button key={f.k} onClick={()=>setFilter(f.k)} style={{border:`1.5px solid ${filter===f.k?Y:C2}`,background:filter===f.k?Y:C1,color:filter===f.k?BK:LT,borderRadius:20,padding:"7px 16px",fontFamily:"'DM Sans',sans-serif",fontSize:13,cursor:"pointer",fontWeight:600,whiteSpace:"nowrap",transition:"all .15s"}}>{f.l}</button>
        ))}
      </div>
      {/* Promo */}
      <div style={{background:Y,borderRadius:16,padding:"18px 20px",marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{color:BK,fontWeight:800,fontSize:17,marginBottom:3}}>Primer corte gratis</div>
          <div style={{color:"#666",fontSize:12,fontFamily:"'DM Mono',monospace"}}>Solo por esta semana ✂</div>
        </div>
        <div style={{fontSize:42}}>💈</div>
      </div>
      {/* Barberías */}
      {fShops.length>0&&<>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:MT,letterSpacing:2,marginBottom:12,textTransform:"uppercase"}}>🏪 Barberías cercanas</div>
        <MapSVG shops={SHOPS} highlight={null} onPin={s=>onShop(s)}/>
        <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:16,marginBottom:24}}>
          {fShops.map(s=>(
            <Card key={s.id} onClick={()=>onShop(s)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:18,color:"#fff"}}>{s.name}</div>
                  <div style={{fontSize:12,color:MT,marginTop:2}}>📍 {s.location} · {s.distance}</div>
                </div>
                <Pill yellow={s.open}>{s.open?"Abierto":"Cerrado"}</Pill>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
                <Stars n={s.rating}/><span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:Y,fontWeight:700}}>{s.rating}</span><span style={{fontSize:11,color:MT}}>({s.reviews})</span>
              </div>
              <div style={{borderTop:`1px solid ${C2}`,paddingTop:10}}>
                <div style={{fontSize:10,color:MT,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:8,textTransform:"uppercase"}}>Barberos</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {s.barbers.map(b=>(
                    <div key={b.id} style={{display:"flex",alignItems:"center",gap:6,background:C2,borderRadius:20,padding:"4px 10px 4px 4px"}}>
                      <div style={{width:22,height:22,borderRadius:"50%",background:C1,border:`1.5px solid ${Y}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontFamily:"'DM Mono',monospace",color:Y,fontWeight:700}}>{b.img}</div>
                      <span style={{fontSize:12,color:"#ccc"}}>{b.name}</span>
                      <span style={{width:6,height:6,borderRadius:"50%",background:b.available?"#22c55e":C3}}/>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </>}
      {/* Domicilio */}
      {fDom.length>0&&<>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:MT,letterSpacing:2,marginBottom:12,textTransform:"uppercase"}}>🏠 Barberos a domicilio</div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {fDom.map(b=>(
            <Card key={b.id} onClick={()=>onBarber(b,null)}>
              <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <Av initials={b.img} size={52} dom/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                    <div style={{fontWeight:700,fontSize:15,color:"#fff"}}>{b.name}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:14,color:Y}}>₡{b.price.toLocaleString()}</div>
                  </div>
                  <div style={{fontSize:12,color:MT,marginBottom:5}}>📍 {b.location}</div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                    <Stars n={b.rating}/><span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:Y,fontWeight:700}}>{b.rating}</span><span style={{fontSize:11,color:MT}}>({b.reviews})</span>
                  </div>
                  <Pill>{b.specialty}</Pill>
                </div>
                <div style={{width:8,height:8,borderRadius:"50%",marginTop:5,background:b.available?"#22c55e":C3}}/>
              </div>
            </Card>
          ))}
        </div>
      </>}
      {fShops.length===0&&fDom.length===0&&(
        <div style={{textAlign:"center",padding:"48px 0",color:MT}}>
          <div style={{fontSize:40,marginBottom:12}}>🔍</div>
          <div style={{fontSize:15,color:LT}}>Sin resultados para "{search}"</div>
        </div>
      )}
    </div>
  );
};

// ── SHOP DETAIL ────────────────────────────────────────────────────────────────
const ShopDetail = ({shop,onBack,onBarber}) => (
  <div style={{paddingBottom:40}}>
    <div style={{padding:"16px 20px 0"}}><button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:Y,fontSize:14,fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6}}>← Explorar</button></div>
    <div style={{padding:"16px 20px 20px",borderBottom:`1px solid ${C2}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:22,color:"#fff"}}>{shop.name}</div>
        <Pill yellow={shop.open}>{shop.open?"Abierto":"Cerrado"}</Pill>
      </div>
      <div style={{fontSize:13,color:MT,marginBottom:8}}>📍 {shop.address}</div>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <Stars n={shop.rating} size={14}/><span style={{fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:13,color:Y}}>{shop.rating}</span><span style={{fontSize:12,color:MT}}>({shop.reviews} reseñas) · {shop.distance}</span>
      </div>
    </div>
    <div style={{padding:"16px 16px 0"}}>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:MT,letterSpacing:2,marginBottom:10,textTransform:"uppercase"}}>Ubicación</div>
      <MapSVG shops={SHOPS} highlight={shop.id} onPin={()=>{}}/>
    </div>
    <div style={{padding:"20px 16px 0"}}>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:MT,letterSpacing:2,marginBottom:14,textTransform:"uppercase"}}>Barberos · {shop.barbers.length} en este local</div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {shop.barbers.map(b=>(
          <Card key={b.id} onClick={()=>onBarber(b,shop)}>
            <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
              <Av initials={b.img} size={52} dom={false}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                  <div style={{fontWeight:700,fontSize:15,color:"#fff"}}>{b.name}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:14,color:Y}}>₡{b.price.toLocaleString()}</div>
                </div>
                <div style={{fontSize:12,color:MT,marginBottom:6}}>{b.specialty}</div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <Stars n={b.rating}/><span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:Y,fontWeight:700}}>{b.rating}</span><span style={{fontSize:11,color:MT}}>({b.reviews})</span>
                </div>
              </div>
              <div style={{width:8,height:8,borderRadius:"50%",marginTop:5,background:b.available?"#22c55e":C3}}/>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

// ── MINI CALENDAR ──────────────────────────────────────────────────────────────
const MiniCalendar = ({selectedDate, onSelect}) => {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const DAYS = ["Do","Lu","Ma","Mi","Ju","Vi","Sá"];
  const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if(viewMonth === 0){ setViewMonth(11); setViewYear(y=>y-1); }
    else setViewMonth(m=>m-1);
  };
  const nextMonth = () => {
    if(viewMonth === 11){ setViewMonth(0); setViewYear(y=>y+1); }
    else setViewMonth(m=>m+1);
  };

  const isPast = (d) => {
    const date = new Date(viewYear, viewMonth, d);
    const t = new Date(); t.setHours(0,0,0,0);
    return date < t;
  };
  const isToday = (d) => {
    return d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
  };
  const isSelected = (d) => {
    if(!selectedDate) return false;
    const s = new Date(selectedDate);
    return d === s.getDate() && viewMonth === s.getMonth() && viewYear === s.getFullYear();
  };

  const cells = [];
  for(let i=0;i<firstDay;i++) cells.push(null);
  for(let d=1;d<=daysInMonth;d++) cells.push(d);

  return(
    <div style={{background:C1,border:`1.5px solid ${C2}`,borderRadius:14,padding:"14px 12px",marginBottom:20}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <button onClick={prevMonth} style={{background:"none",border:"none",color:MT,fontSize:18,cursor:"pointer",padding:"0 6px"}}>‹</button>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,color:"#fff"}}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} style={{background:"none",border:"none",color:MT,fontSize:18,cursor:"pointer",padding:"0 6px"}}>›</button>
      </div>
      {/* Day names */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:6}}>
        {DAYS.map(d=>(
          <div key={d} style={{textAlign:"center",fontSize:10,fontFamily:"'DM Mono',monospace",color:MT,padding:"2px 0",letterSpacing:0.5}}>{d}</div>
        ))}
      </div>
      {/* Day cells */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
        {cells.map((d,i)=>{
          if(!d) return <div key={i}/>;
          const past = isPast(d);
          const sel = isSelected(d);
          const tod = isToday(d);
          return(
            <button key={i} onClick={()=>{
              if(past) return;
              const picked = new Date(viewYear, viewMonth, d);
              onSelect(picked.toISOString().split("T")[0]);
            }} style={{
              background: sel ? Y : tod ? C2 : "transparent",
              color: sel ? BK : past ? "#333" : tod ? Y : "#ccc",
              border: sel ? `1.5px solid ${Y}` : tod ? `1.5px solid ${C3}` : "1.5px solid transparent",
              borderRadius:8,
              padding:"7px 0",
              fontSize:12,
              fontFamily:"'DM Mono',monospace",
              fontWeight: sel||tod ? 700 : 400,
              cursor: past ? "default" : "pointer",
              transition:"all .15s",
              opacity: past ? 0.3 : 1,
            }}>{d}</button>
          );
        })}
      </div>
      {/* Today shortcut */}
      <button onClick={()=>onSelect(today.toISOString().split("T")[0])} style={{
        marginTop:12, width:"100%", background:"transparent",
        border:`1px solid ${C3}`, borderRadius:8, padding:"7px",
        fontSize:11, color:MT, fontFamily:"'DM Sans',sans-serif", cursor:"pointer"
      }}>Hoy — {today.toLocaleDateString("es-CR",{weekday:"long",day:"numeric",month:"long"})}</button>
    </div>
  );
};

// ── BARBER PROFILE ─────────────────────────────────────────────────────────────
const BarberProfile = ({barber,shop,onBack,onBooked}) => {
  const [tab,setTab] = useState("info");
  const [selectedDate,setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [slot,setSlot] = useState(null);
  const [loading,setLoading] = useState(false);
  const [done,setDone] = useState(false);

  const formatDate = (iso) => {
    const d = new Date(iso+"T12:00:00");
    const today = new Date(); today.setHours(0,0,0,0);
    const sel = new Date(iso+"T00:00:00");
    const diff = Math.round((sel-today)/(1000*60*60*24));
    if(diff===0) return "Hoy";
    if(diff===1) return "Mañana";
    return d.toLocaleDateString("es-CR",{weekday:"short",day:"numeric",month:"short"});
  };

  const book = () => {
    if(!slot||!selectedDate) return;
    setLoading(true);
    setTimeout(()=>{setLoading(false);setDone(true);setTimeout(()=>{setDone(false);setSlot(null);onBooked&&onBooked();},2500);},1200);
  };
  const TABS = ["Info","Reservar","Reseñas"];
  return(
    <div style={{paddingBottom:100}}>
      <div style={{padding:"16px 20px 0"}}><button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:Y,fontSize:14,fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6}}>← {shop?shop.name:"Inicio"}</button></div>
      <div style={{padding:"20px 20px 0"}}>
        {/* Hero */}
        <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:16}}>
          <Av initials={barber.img} size={76} dom={barber.domicilio}/>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:21,color:"#fff",marginBottom:2}}>{barber.name}</div>
            {shop&&<div style={{fontSize:13,color:MT,marginBottom:4}}>✂ {shop.name}</div>}
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <Stars n={barber.rating} size={14}/><span style={{fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:13,color:Y}}>{barber.rating}</span><span style={{fontSize:12,color:MT}}>({barber.reviews})</span>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <Pill>{barber.specialty}</Pill>
              {barber.domicilio&&<Pill yellow>🏠 Domicilio</Pill>}
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div style={{display:"flex",borderBottom:`1px solid ${C2}`,marginBottom:20}}>
          {TABS.map(t=>{
            const active=tab===t.toLowerCase();
            return(<button key={t} onClick={()=>setTab(t.toLowerCase())} style={{flex:1,padding:"10px 0",border:"none",background:"transparent",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,color:active?Y:MT,borderBottom:`2px solid ${active?Y:"transparent"}`,cursor:"pointer"}}>{t}</button>);
          })}
        </div>

        {tab==="info"&&(
          <div>
            <p style={{fontSize:14,color:LT,lineHeight:1.7,marginBottom:20}}>{barber.bio}</p>
            <Card>
              {[["Especialidad",barber.specialty],["Precio desde","₡"+barber.price.toLocaleString()],["Disponibilidad",barber.available?"Disponible hoy":"No disponible"],["Modalidad",barber.domicilio?"A domicilio":"En barbería"]].map(([k,v],i,arr)=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:i<arr.length-1?`1px solid ${C2}`:"none"}}>
                  <span style={{fontSize:13,color:MT}}>{k}</span>
                  <span style={{fontSize:13,color:"#fff",fontWeight:600}}>{v}</span>
                </div>
              ))}
            </Card>
          </div>
        )}

        {tab==="reservar"&&(
          <div>
            {/* Step 1 — Calendar */}
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:MT,letterSpacing:2,marginBottom:10,textTransform:"uppercase",display:"flex",alignItems:"center",gap:8}}>
              <span style={{background:Y,color:BK,borderRadius:"50%",width:18,height:18,display:"inline-flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:10,flexShrink:0}}>1</span>
              Elegí la fecha
            </div>
            <MiniCalendar selectedDate={selectedDate} onSelect={(d)=>{setSelectedDate(d);setSlot(null);}}/>

            {/* Step 2 — Time slots */}
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:MT,letterSpacing:2,marginBottom:10,textTransform:"uppercase",display:"flex",alignItems:"center",gap:8}}>
              <span style={{background:selectedDate?Y:C3,color:selectedDate?BK:MT,borderRadius:"50%",width:18,height:18,display:"inline-flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:10,flexShrink:0}}>2</span>
              Horarios disponibles — {selectedDate ? formatDate(selectedDate) : "Elegí una fecha"}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
              {barber.slots.map(s=>(
                <button key={s} onClick={()=>setSlot(s)} style={{
                  border:`1.5px solid ${slot===s?Y:C2}`,
                  background:slot===s?Y:C1,
                  color:slot===s?BK:"#aaa",
                  borderRadius:8,padding:"9px 15px",
                  fontFamily:"'DM Mono',monospace",fontSize:13,
                  cursor:"pointer",fontWeight:slot===s?700:400,
                  transition:"all .15s"
                }}>{s}</button>
              ))}
            </div>

            {/* Summary card */}
            {slot && selectedDate && (
              <div style={{background:"#0a1200",border:`1.5px solid ${Y}`,borderRadius:12,padding:"12px 16px",marginBottom:16}}>
                <div style={{fontSize:11,color:MT,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:8,textTransform:"uppercase"}}>Resumen de tu cita</div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:13,color:LT}}>Barbero</span>
                  <span style={{fontSize:13,color:"#fff",fontWeight:600}}>{barber.name}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:13,color:LT}}>Fecha</span>
                  <span style={{fontSize:13,color:Y,fontWeight:600}}>{formatDate(selectedDate)}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:13,color:LT}}>Hora</span>
                  <span style={{fontSize:13,color:Y,fontWeight:600}}>{slot}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",borderTop:`1px solid ${C2}`,paddingTop:8,marginTop:4}}>
                  <span style={{fontSize:13,color:LT}}>Total</span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:16,color:Y}}>₡{barber.price.toLocaleString()}</span>
                </div>
              </div>
            )}

            {!slot && (
              <div style={{display:"flex",justifyContent:"space-between",padding:"14px 16px",background:C1,border:`1.5px solid ${C2}`,borderRadius:12,marginBottom:16}}>
                <span style={{fontSize:14,color:LT}}>Corte + Barba</span>
                <span style={{fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:16,color:Y}}>₡{barber.price.toLocaleString()}</span>
              </div>
            )}

            {done?(
              <div style={{background:"#0a1f0a",border:"1.5px solid #22c55e",borderRadius:12,padding:20,textAlign:"center"}}>
                <div style={{fontSize:32,marginBottom:8}}>✅</div>
                <div style={{color:"#22c55e",fontWeight:700,fontSize:16,marginBottom:4}}>¡Cita confirmada!</div>
                <div style={{color:LT,fontSize:13}}>{barber.name}</div>
                <div style={{color:"#fff",fontSize:14,fontWeight:600,marginTop:4}}>{formatDate(selectedDate)} · {slot}</div>
              </div>
            ):(
              <Btn onClick={book} disabled={!slot||!selectedDate||loading}>
                {loading?"⏳ Confirmando...":slot&&selectedDate?`Confirmar — ${formatDate(selectedDate)} ${slot}`:"Seleccioná fecha y horario"}
              </Btn>
            )}
          </div>
        )}

        {tab==="reseñas"&&(
          <div>
            <Card style={{marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:20,padding:"4px 0"}}>
                <div style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:44,fontWeight:900,color:Y,lineHeight:1}}>{barber.rating}</div>
                  <Stars n={barber.rating} size={15}/>
                  <div style={{fontSize:11,color:MT,marginTop:5}}>{barber.reviews} reseñas</div>
                </div>
                <div style={{flex:1}}>
                  {[5,4,3,2,1].map(n=>{
                    const pct=n===5?75:n===4?18:n===3?5:n===2?1:1;
                    return(
                      <div key={n} style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
                        <span style={{fontSize:10,color:MT,width:6}}>{n}</span>
                        <div style={{flex:1,height:5,background:C2,borderRadius:3,overflow:"hidden"}}>
                          <div style={{height:"100%",background:Y,width:`${pct}%`,borderRadius:3}}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {barber.reviewList.map((r,i)=>(
                <Card key={i}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <div><span style={{fontWeight:600,fontSize:13,color:"#fff"}}>{r.user}</span><span style={{fontSize:11,color:MT,marginLeft:8}}>{r.date}</span></div>
                    <Stars n={r.stars} size={11}/>
                  </div>
                  <p style={{fontSize:13,color:LT,lineHeight:1.5}}>{r.comment}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── MIS CITAS ──────────────────────────────────────────────────────────────────
const MisCitas = () => (
  <div style={{padding:"20px 16px"}}>
    <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:"#fff",marginBottom:4}}>Mis Citas</div>
    <div style={{fontSize:13,color:MT,marginBottom:24}}>Tus próximas reservaciones</div>
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {MY_APTS.map(a=>(
        <Card key={a.id}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div>
              <div style={{fontWeight:700,fontSize:15,color:"#fff",marginBottom:2}}>{a.service}</div>
              <div style={{fontSize:13,color:MT}}>{a.barber} · {a.shop}</div>
            </div>
            <Pill yellow={a.status==="confirmada"}>{a.status}</Pill>
          </div>
          <div style={{display:"flex",gap:16,paddingTop:10,borderTop:`1px solid ${C2}`}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}><span>📅</span><span style={{fontSize:13,color:"#ccc"}}>{a.date}</span></div>
            <div style={{display:"flex",alignItems:"center",gap:6}}><span>🕐</span><span style={{fontSize:13,color:"#ccc"}}>{a.time}</span></div>
            <div style={{marginLeft:"auto",fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:14,color:Y}}>₡{a.price.toLocaleString()}</div>
          </div>
          {a.status==="confirmada"&&<div style={{marginTop:10}}><Btn ghost small>Cancelar cita</Btn></div>}
        </Card>
      ))}
    </div>
  </div>
);

// ── PANEL BARBERO ──────────────────────────────────────────────────────────────
const PanelBarbero = () => {
  const [sub,setSub] = useState("inicio");
  const [period, setPeriod] = useState("semana");
  const TABS = [
    {k:"inicio",  ico:"🏠", lbl:"Inicio"},
    {k:"agenda",  ico:"📅", lbl:"Agenda"},
    {k:"equipo",  ico:"✂️",  lbl:"Equipo"},
    {k:"clientes",ico:"👥", lbl:"Clientes"},
    {k:"ingresos",ico:"💰", lbl:"Ingresos"},
  ];
  return(
    <div style={{paddingBottom:100}}>
      <div style={{padding:"16px 16px 0"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <div style={{width:48,height:48,borderRadius:14,background:Y,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:20,color:BK}}>CC</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:17,color:"#fff"}}>Classic Cuts</div>
            <div style={{fontSize:11,color:MT}}>Escazú · Plan Pro ⭐</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:5}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#22c55e"}}/>
            <span style={{fontSize:11,color:"#22c55e"}}>Abierto</span>
          </div>
        </div>
        {/* Tabs */}
        <div style={{display:"flex",gap:6,marginBottom:18,overflowX:"auto",paddingBottom:4}}>
          {TABS.map(({k,ico,lbl})=>(
            <button key={k} onClick={()=>setSub(k)} style={{
              flexShrink:0,display:"flex",alignItems:"center",gap:5,
              padding:"7px 12px",border:`1.5px solid ${sub===k?Y:C2}`,
              background:sub===k?Y:C1,color:sub===k?BK:MT,
              borderRadius:20,fontFamily:"'DM Sans',sans-serif",
              fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"
            }}><span>{ico}</span>{lbl}</button>
          ))}
        </div>
      </div>

      <div style={{padding:"0 16px"}}>

        {/* ── INICIO ── */}
        {sub==="inicio"&&(
          <div>
            {/* KPIs */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {[
                {ico:"📅",l:"Citas hoy",v:"4",hi:true},
                {ico:"💰",l:"Ingresos hoy",v:"₡38,500",hi:false},
                {ico:"📆",l:"Citas este mes",v:"47",hi:false},
                {ico:"⭐",l:"Calificación",v:"4.9",hi:false},
              ].map((s,i)=>(
                <div key={i} style={{background:s.hi?Y:C1,borderRadius:14,padding:"14px 14px",border:s.hi?"none":`1.5px solid ${C2}`}}>
                  <div style={{fontSize:18,marginBottom:6}}>{s.ico}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:18,color:s.hi?BK:Y,marginBottom:2}}>{s.v}</div>
                  <div style={{fontSize:10,color:s.hi?"#666":MT}}>{s.l}</div>
                </div>
              ))}
            </div>
            {/* Próximas citas */}
            <div style={{background:C1,border:`1.5px solid ${C2}`,borderRadius:14,padding:"14px 16px",marginBottom:14}}>
              <div style={{fontSize:11,color:MT,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:12,textTransform:"uppercase"}}>Próximas citas hoy</div>
              {[
                {hora:"10:00",cliente:"Rodrigo V.",servicio:"Fade + Barba",barbero:"Carlos",status:"confirmada"},
                {hora:"11:30",cliente:"Luis M.",servicio:"Corte clásico",barbero:"Marco",status:"confirmada"},
                {hora:"13:00",cliente:"Jorge P.",servicio:"Barba sola",barbero:"Carlos",status:"pendiente"},
                {hora:"16:00",cliente:"Andrés R.",servicio:"Fade + Barba",barbero:"Marco",status:"confirmada"},
              ].map((c,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<3?`1px solid ${C2}`:"none"}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:Y,fontWeight:700,minWidth:40}}>{c.hora}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,color:"#fff",fontWeight:600}}>{c.cliente}</div>
                    <div style={{fontSize:11,color:MT}}>{c.servicio} · {c.barbero}</div>
                  </div>
                  <div style={{background:c.status==="confirmada"?"#0a1800":"#1a1000",border:`1px solid ${c.status==="confirmada"?"#22c55e":"#f59e0b"}`,borderRadius:6,padding:"3px 8px",fontSize:10,color:c.status==="confirmada"?"#22c55e":"#f59e0b",fontWeight:600}}>{c.status}</div>
                </div>
              ))}
            </div>
            {/* Alertas rápidas */}
            <div style={{background:"#1a0a00",border:"1.5px solid #f59e0b",borderRadius:14,padding:"12px 16px",marginBottom:14}}>
              <div style={{fontSize:12,color:"#f59e0b",fontWeight:700,marginBottom:6}}>⚠️ Alertas</div>
              <div style={{fontSize:12,color:"#ccc",marginBottom:4}}>• Jorge P. no ha confirmado su cita de las 13:00</div>
              <div style={{fontSize:12,color:"#ccc"}}>• Marco Jiménez tiene 3 horarios sin disponibilidad mañana</div>
            </div>
            {/* Accesos rápidos */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[
                {ico:"➕",lbl:"Nueva cita",sub:"agenda"},
                {ico:"✂️",lbl:"Gestionar equipo",sub:"equipo"},
                {ico:"👥",lbl:"Ver clientes",sub:"clientes"},
                {ico:"📊",lbl:"Ver ingresos",sub:"ingresos"},
              ].map(({ico,lbl,sub:s})=>(
                <button key={lbl} onClick={()=>setSub(s)} style={{background:C1,border:`1.5px solid ${C2}`,borderRadius:12,padding:"14px 10px",display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
                  <span style={{fontSize:20}}>{ico}</span>
                  <span style={{fontSize:12,color:"#ddd",fontWeight:600,textAlign:"left"}}>{lbl}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── AGENDA ── */}
        {sub==="agenda"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>Agenda del día</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:MT}}>Lunes 27 Sep</div>
            </div>
            {[
              {hora:"09:00",libre:true},
              {hora:"10:00",cliente:"Rodrigo V.",servicio:"Fade + Barba",barbero:"Carlos",libre:false,status:"confirmada"},
              {hora:"11:00",libre:true},
              {hora:"11:30",cliente:"Luis M.",servicio:"Corte clásico",barbero:"Marco",libre:false,status:"confirmada"},
              {hora:"13:00",cliente:"Jorge P.",servicio:"Barba sola",barbero:"Carlos",libre:false,status:"pendiente"},
              {hora:"14:00",libre:true},
              {hora:"15:00",libre:true},
              {hora:"16:00",cliente:"Andrés R.",servicio:"Fade + Barba",barbero:"Marco",libre:false,status:"confirmada"},
              {hora:"17:30",libre:true},
            ].map((slot,i)=>(
              <div key={i} style={{display:"flex",gap:10,marginBottom:6,alignItems:"stretch"}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:MT,minWidth:36,paddingTop:10}}>{slot.hora}</div>
                <div style={{flex:1,background:slot.libre?C1:slot.status==="confirmada"?"#0a1800":C1,border:`1.5px solid ${slot.libre?C2:slot.status==="confirmada"?"#22c55e":"#f59e0b"}`,borderRadius:10,padding:"10px 12px",minHeight:44}}>
                  {slot.libre?(
                    <div style={{fontSize:11,color:C3,fontStyle:"italic"}}>Disponible</div>
                  ):(
                    <div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{fontSize:13,color:"#fff",fontWeight:600}}>{slot.cliente}</div>
                        <div style={{fontSize:10,color:slot.status==="confirmada"?"#22c55e":"#f59e0b",fontWeight:700}}>{slot.status}</div>
                      </div>
                      <div style={{fontSize:11,color:MT,marginTop:2}}>{slot.servicio} · ✂️ {slot.barbero}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── EQUIPO ── */}
        {sub==="equipo"&&(
          <div>
            <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:14}}>Mi equipo</div>
            {[
              {ini:"CM",name:"Carlos Mendoza",rol:"Barbero senior",citas:4,rating:4.9,status:"activo",ingresos:"₡185,000"},
              {ini:"MJ",name:"Marco Jiménez", rol:"Barbero",       citas:3,rating:4.7,status:"activo",ingresos:"₡142,000"},
              {ini:"RV",name:"Rodrigo Vargas",rol:"Aprendiz",      citas:1,rating:4.5,status:"activo",ingresos:"₡89,000"},
            ].map((b,i)=>(
              <div key={i} style={{background:C1,border:`1.5px solid ${C2}`,borderRadius:14,padding:"14px 16px",marginBottom:10}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                  <Av initials={b.ini} size={44} dom={false}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{b.name}</div>
                    <div style={{fontSize:11,color:MT}}>{b.rol}</div>
                  </div>
                  <div style={{background:"#0a1800",border:"1px solid #22c55e",borderRadius:6,padding:"3px 8px",fontSize:10,color:"#22c55e",fontWeight:600}}>{b.status}</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[
                    {l:"Citas hoy",v:b.citas},
                    {l:"Rating",v:`⭐ ${b.rating}`},
                    {l:"Este mes",v:b.ingresos},
                  ].map(({l,v})=>(
                    <div key={l} style={{background:BK,borderRadius:8,padding:"8px 10px",textAlign:"center"}}>
                      <div style={{fontSize:12,fontWeight:700,color:Y}}>{v}</div>
                      <div style={{fontSize:9,color:MT,marginTop:2}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {/* Horarios del equipo */}
            <div style={{background:C1,border:`1.5px solid ${C2}`,borderRadius:14,padding:"14px 16px",marginTop:4}}>
              <div style={{fontSize:11,color:MT,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:12,textTransform:"uppercase"}}>Disponibilidad hoy</div>
              {[
                {name:"Carlos",slots:["10:00","13:00","17:30"],ocupados:[1]},
                {name:"Marco", slots:["09:30","11:00","15:00","16:00"],ocupados:[2,3]},
                {name:"Rodrigo",slots:["11:30","14:00"],ocupados:[]},
              ].map((b,i)=>(
                <div key={i} style={{marginBottom:i<2?12:0}}>
                  <div style={{fontSize:12,color:"#ccc",fontWeight:600,marginBottom:6}}>{b.name}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {b.slots.map((s,j)=>(
                      <div key={j} style={{background:b.ocupados.includes(j)?Y:C2,color:b.ocupados.includes(j)?BK:"#888",borderRadius:6,padding:"4px 10px",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:b.ocupados.includes(j)?700:400}}>{s}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CLIENTES ── */}
        {sub==="clientes"&&(
          <div>
            <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:6}}>Base de clientes</div>
            <div style={{fontSize:12,color:MT,marginBottom:14}}>52 clientes activos este mes</div>
            {/* Stats */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
              {[
                {v:"52",l:"Activos"},
                {v:"68%",l:"Recurrentes"},
                {v:"8.2",l:"Días entre visitas"},
              ].map(({v,l})=>(
                <div key={l} style={{background:C1,border:`1.5px solid ${C2}`,borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:16,fontWeight:700,color:Y}}>{v}</div>
                  <div style={{fontSize:9,color:MT,marginTop:3}}>{l}</div>
                </div>
              ))}
            </div>
            {/* Client list */}
            {[
              {ini:"RV",name:"Rodrigo Vargas",visitas:12,ultimo:"Hace 3 días",gasto:"₡114,000",fav:"Fade + Barba"},
              {ini:"LM",name:"Luis Morales",  visitas:8, ultimo:"Hace 1 semana",gasto:"₡76,000", fav:"Corte clásico"},
              {ini:"JP",name:"Jorge Pérez",   visitas:6, ultimo:"Hace 2 semanas",gasto:"₡57,000",fav:"Barba sola"},
              {ini:"AR",name:"Andrés Rojas",  visitas:5, ultimo:"Hace 3 semanas",gasto:"₡47,500",fav:"Fade clásico"},
            ].map((c,i)=>(
              <div key={i} style={{background:C1,border:`1.5px solid ${C2}`,borderRadius:14,padding:"12px 14px",marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <Av initials={c.ini} size={38} dom={false}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{c.name}</div>
                    <div style={{fontSize:11,color:MT}}>{c.visitas} visitas · Último: {c.ultimo}</div>
                  </div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:700,color:Y}}>{c.gasto}</div>
                </div>
                <div style={{background:BK,borderRadius:8,padding:"6px 10px",display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:11,color:MT}}>Servicio favorito</span>
                  <span style={{fontSize:11,color:"#ccc",fontWeight:600}}>{c.fav}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── INGRESOS ── */}
        {sub==="ingresos"&&(
          <div>
          {(()=>{
            const DATA = {
              dia: {label:"Hoy",total:"₡38,500",change:"+12%",positive:true,bars:[30,55,20,80,60,95,70,45,85,100,65,40],labels:["8a","9a","10a","11a","12p","1p","2p","3p","4p","5p","6p","7p"],highlight:9,citas:4,ticket:"₡9,625",meta:80},
              semana: {label:"Esta semana",total:"₡112,500",change:"+18%",positive:true,bars:[55,80,45,90,65,100,72],labels:["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],highlight:5,citas:14,ticket:"₡8,036",meta:65},
              mes: {label:"Este mes",total:"₡450,000",change:"+24%",positive:true,bars:[60,75,50,85,70,90,65,80,55,95,70,85,60,75,90,80,65,70,85,95,75,60,80,70,90,85,65,75,80,95],labels:["1","","","","5","","","","","10","","","","","15","","","","","20","","","","","25","","","","","30"],highlight:29,citas:52,ticket:"₡8,654",meta:78},
            };
            const d = DATA[period];
            const maxBar = Math.max(...d.bars);
            return(
              <div>
                <div style={{display:"flex",background:C1,borderRadius:10,padding:3,marginBottom:14,border:`1px solid ${C2}`}}>
                  {[["dia","Hoy"],["semana","Semana"],["mes","Mes"]].map(([k,lbl])=>(
                    <button key={k} onClick={()=>setPeriod(k)} style={{flex:1,padding:"8px 0",border:"none",borderRadius:8,background:period===k?Y:"transparent",color:period===k?BK:MT,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .2s"}}>{lbl}</button>
                  ))}
                </div>
                <div style={{background:C1,border:`1.5px solid ${C2}`,borderRadius:14,padding:"16px",marginBottom:10}}>
                  <div style={{fontSize:10,color:MT,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:6,textTransform:"uppercase"}}>{d.label}</div>
                  <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
                    <div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:32,fontWeight:700,color:Y,lineHeight:1}}>{d.total}</div>
                      <div style={{fontSize:12,color:d.positive?"#22c55e":"#ef4444",marginTop:6}}>↑ {d.change} vs período anterior</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:10,color:MT,marginBottom:2}}>Meta</div>
                      <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{d.meta}%</div>
                      <div style={{width:60,height:4,background:C3,borderRadius:2,marginTop:4}}><div style={{width:`${d.meta}%`,height:"100%",background:Y,borderRadius:2}}/></div>
                    </div>
                  </div>
                </div>
                <div style={{background:C1,border:`1.5px solid ${C2}`,borderRadius:14,padding:"14px 12px",marginBottom:10}}>
                  <div style={{fontSize:10,color:MT,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:12,textTransform:"uppercase"}}>Ingresos por {period==="dia"?"hora":period==="semana"?"día":"día"}</div>
                  <div style={{display:"flex",alignItems:"flex-end",gap:period==="mes"?2:5,height:80}}>
                    {d.bars.map((h,i)=>{
                      const isHi=i===d.highlight;
                      const pct=(h/maxBar)*100;
                      return(
                        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                          <div style={{width:"100%",height:pct*0.75,background:isHi?Y:`${Y}33`,borderRadius:"3px 3px 0 0",minHeight:4}}/>
                          <span style={{fontSize:7,color:isHi?Y:MT,fontFamily:"'DM Mono',monospace"}}>{d.labels[i]||""}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
                  {[
                    {ico:"✂️",label:"Citas",val:d.citas,color:"#fff"},
                    {ico:"💰",label:"Ticket promedio",val:d.ticket,color:Y},
                    {ico:"⭐",label:"Calificación",val:"4.9",color:Y},
                    {ico:"🔄",label:"Recurrentes",val:"68%",color:"#22c55e"},
                  ].map(({ico,label,val,color})=>(
                    <div key={label} style={{background:C1,border:`1.5px solid ${C2}`,borderRadius:12,padding:"12px 14px"}}>
                      <div style={{fontSize:16,marginBottom:6}}>{ico}</div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:16,fontWeight:700,color,marginBottom:2}}>{val}</div>
                      <div style={{fontSize:10,color:MT}}>{label}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:C1,border:`1.5px solid ${C2}`,borderRadius:14,padding:"14px 16px"}}>
                  <div style={{fontSize:10,color:MT,fontFamily:"'DM Mono',monospace",letterSpacing:1,marginBottom:10,textTransform:"uppercase"}}>Servicios más solicitados</div>
                  {[
                    {name:"Fade + Barba",pct:45,val:"₡42,750"},
                    {name:"Corte clásico",pct:30,val:"₡28,500"},
                    {name:"Barba sola",pct:15,val:"₡14,250"},
                    {name:"Rasurado",pct:10,val:"₡9,500"},
                  ].map(({name,pct,val})=>(
                    <div key={name} style={{marginBottom:10}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                        <span style={{fontSize:12,color:"#ddd"}}>{name}</span>
                        <span style={{fontSize:12,fontFamily:"'DM Mono',monospace",color:Y,fontWeight:700}}>{val}</span>
                      </div>
                      <div style={{height:4,background:C3,borderRadius:2}}><div style={{width:`${pct}%`,height:"100%",background:Y,borderRadius:2}}/></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
          </div>
        )}
      </div>
    </div>
  );
};

// ── PERFIL ─────────────────────────────────────────────────────────────────────
const Perfil = ({user,onLogout}) => (
  <div style={{padding:"20px 16px"}}>
    <div style={{textAlign:"center",padding:"28px 0 24px",borderBottom:`1px solid ${C2}`,marginBottom:24}}>
      <img src={LOGO} alt="ShaveSmart" style={{width:80,height:80,borderRadius:"50%",objectFit:"cover",margin:"0 auto 14px",display:"block",border:`3px solid ${Y}`}}/>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:"#fff"}}>{user||"Usuario"}</div>
      <div style={{fontSize:13,color:MT,marginTop:4}}>Cliente ShaveSmart 🇨🇷</div>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:2,marginBottom:24}}>
      {[["👤","Mi perfil"],["🔔","Notificaciones"],["📍","Mis direcciones"],["💳","Métodos de pago"],["⭐","Mis reseñas"],["🎁","Referir amigos"]].map(([icon,label])=>(
        <div key={label} style={{display:"flex",alignItems:"center",gap:14,padding:"15px 16px",background:C1,borderRadius:12,cursor:"pointer",marginBottom:2}}>
          <span style={{fontSize:18}}>{icon}</span>
          <span style={{fontSize:14,color:"#ddd",fontWeight:500}}>{label}</span>
          <span style={{marginLeft:"auto",color:MT,fontSize:18}}>›</span>
        </div>
      ))}
    </div>
    <Btn ghost onClick={onLogout}>Cerrar sesión</Btn>
    <div style={{textAlign:"center",marginTop:20,fontSize:11,color:C3,fontFamily:"'DM Mono',monospace"}}>ShaveSmart v1.0 · Costa Rica 🇨🇷</div>
  </div>
);

// ── ROOT ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [phase,setPhase]   = useState("splash");
  const [user,setUser]     = useState(null);
  const [nav,setNav]       = useState("explore");
  const [screen,setScreen] = useState("list");
  const [shop,setShop]     = useState(null);
  const [barber,setBarber] = useState(null);
  const [bShop,setBShop]   = useState(null);

  const login  = name => { setUser(name); setPhase("app"); };
  const logout = ()   => { setUser(null); setPhase("auth"); setNav("explore"); setScreen("list"); };

  const goShop   = s    => { setShop(s); setScreen("shop"); };
  const goBarber = (b,s)=> { setBarber(b); setBShop(s); setScreen("barber"); };
  const goBack   = ()   => { if(screen==="barber") setScreen(bShop?"shop":"list"); else setScreen("list"); };
  const switchNav = t   => { setNav(t); setScreen("list"); };

  const NAV = [{k:"explore",icon:"🔍",l:"Explorar"},{k:"citas",icon:"📅",l:"Citas"},{k:"panel",icon:"✂️",l:"Mi Panel"},{k:"perfil",icon:"👤",l:"Perfil"}];

  return (
    <div style={{width:"100%",maxWidth:430,margin:"0 auto",height:"100vh",background:BK,display:"flex",flexDirection:"column",fontFamily:"'DM Sans',sans-serif",color:"#fff",boxShadow:"0 0 80px rgba(0,0,0,.9)",position:"relative",overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{display:none;}
        input{background:transparent;color:#fff;}
        input::placeholder{color:#555;}
      `}</style>

      {phase==="splash" && <Splash onDone={()=>setPhase("auth")}/>}

      {phase==="auth" && (
        <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column"}}>
          <Auth onLogin={login}/>
        </div>
      )}

      {phase==="app" && <>
        {/* Header */}
        <div style={{background:C1,borderBottom:`1px solid ${C2}`,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8}}><img src={LOGO} alt="logo" style={{width:34,height:34,borderRadius:8,objectFit:"cover"}}/><div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,letterSpacing:-.5}}>Shave<span style={{fontStyle:"italic",color:Y}}>Smart</span></div></div>
            <div style={{fontSize:10,color:C3,fontFamily:"'DM Mono',monospace",letterSpacing:2}}>COSTA RICA</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{position:"relative",fontSize:20,cursor:"pointer"}}>🔔<div style={{position:"absolute",top:-2,right:-2,width:8,height:8,borderRadius:"50%",background:Y}}/></div>
            <div style={{width:36,height:36,borderRadius:"50%",background:Y,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:BK,fontFamily:"'DM Mono',monospace",fontSize:14}}>{(user||"U")[0].toUpperCase()}</div>
          </div>
        </div>

        {/* Content */}
        <div style={{flex:1,overflowY:"auto"}}>
          {nav==="explore"&&screen==="list" &&<Explore onShop={goShop} onBarber={goBarber}/>}
          {nav==="explore"&&screen==="shop" &&shop   &&<ShopDetail shop={shop} onBack={()=>setScreen("list")} onBarber={goBarber}/>}
          {nav==="explore"&&screen==="barber"&&barber&&<BarberProfile barber={barber} shop={bShop} onBack={goBack} onBooked={()=>switchNav("citas")}/>}
          {nav==="citas"  &&<MisCitas/>}
          {nav==="panel"  &&<PanelBarbero/>}
          {nav==="perfil" &&<Perfil user={user} onLogout={logout}/>}
        </div>

        {/* Bottom Nav */}
        <div style={{background:C1,borderTop:`1px solid ${C2}`,display:"flex",flexShrink:0}}>
          {NAV.map(n=>{
            const active=nav===n.k;
            return(
              <button key={n.k} onClick={()=>switchNav(n.k)} style={{flex:1,padding:"10px 4px 8px",border:"none",background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",position:"relative"}}>
                {active&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:32,height:3,background:Y,borderRadius:2}}/>}
                <span style={{fontSize:19}}>{n.icon}</span>
                <span style={{fontSize:10,fontWeight:600,color:active?Y:MT,letterSpacing:.3}}>{n.l}</span>
              </button>
            );
          })}
        </div>
      </>}
    </div>
  );
}
