import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const STORE = "MANJEET FF GAMER";
const UPI = "freefirelikes@naviaxis";
const PAYEE = "MANJEET KUMAR";
const TELEGRAM = "https://t.me/+C32BNx_GNr5mNzFl";

const items = [
  {id:"freefire",name:"Free Fire",subtitle:"Diamonds top-up",group:"Gaming Top Ups",icon:"💎",className:"ff",discount:"15% Savings",price:"From ₹72",desc:"Choose a diamond package and enter your Free Fire Player UID."},
  {id:"google",name:"Google Play",subtitle:"Recharge & gift cards",group:"Giftcards",icon:"▶",className:"google",discount:"14% Savings",price:"Ask for price",desc:"Google Play gift card denominations and region availability are confirmed by support."},
  {id:"roblox",name:"Roblox",subtitle:"Robux",group:"Gaming Top Ups",icon:"◈",className:"roblox",discount:"16% Savings",price:"Ask for price",desc:"Ask support for available Robux packages."},
  {id:"amazon",name:"Amazon Pay",subtitle:"Gift cards",group:"Giftcards",icon:"a",className:"amazon",discount:"4.4% Savings",price:"Ask for price",desc:"Ask support for available Amazon Pay gift card denominations."},
  {id:"flipkart",name:"Flipkart",subtitle:"Gift cards",group:"Giftcards",icon:"f",className:"flipkart",discount:"12.5% Savings",price:"Ask for price",desc:"Ask support for available Flipkart gift card denominations."},
  {id:"bgmi",name:"BGMI",subtitle:"UC top-up",group:"Gaming Top Ups",icon:"🪖",className:"bgmi",discount:"20% Savings",price:"Ask for price",desc:"Ask support for current BGMI UC packages and availability."},
  {id:"valorant",name:"Valorant",subtitle:"VP / game points",group:"Game Keys",icon:"🎯",className:"valorant",discount:"Special offer",price:"Ask for price",desc:"Ask support for Valorant Points region and price."},
  {id:"minecraft",name:"Minecraft",subtitle:"Game key",group:"Game Keys",icon:"⛏️",className:"minecraft",discount:"Special offer",price:"Ask for price",desc:"Ask support for current Minecraft key availability."},
  {id:"pubg",name:"PUBG Mobile",subtitle:"UC top-up",group:"Gaming Top Ups",icon:"🎮",className:"pubg",discount:"Special offer",price:"Ask for price",desc:"Ask support for current PUBG Mobile UC availability."}
];

const packs = [
  {n:100,p:72,t:"STARTER"},{n:310,p:223.20,t:"POPULAR"},
  {n:520,p:374.40,t:"VALUE"},{n:1060,p:763.20,t:"BEST VALUE"},
  {n:2180,p:1569.60,t:"HOT"},{n:5600,p:4032,t:"MEGA PACK"}
];

function App(){
  const [search,setSearch]=useState("");
  const [active,setActive]=useState("For You");
  const [chosen,setChosen]=useState(null);
  const [pack,setPack]=useState(packs[0]);
  const [uid,setUid]=useState("");
  const [server,setServer]=useState("India");
  const [qty,setQty]=useState(1);
  const [message,setMessage]=useState("");
  const [cart,setCart]=useState([]);
  const total=pack.p*qty;
  const filtered=useMemo(()=>items.filter(x=>(active==="For You"||x.group===active)&&(`${x.name} ${x.subtitle}`.toLowerCase().includes(search.toLowerCase()))),[active,search]);
  const groups=["For You","Gaming Top Ups","Giftcards","Game Keys"];
  const openItem=(item)=>{setChosen(item);setMessage("");if(item.id==="freefire")document.getElementById("order")?.scrollIntoView({behavior:"smooth"});};
  const money=(n)=>"₹"+Number(n).toLocaleString("en-IN",{maximumFractionDigits:2});
  const pay=()=>{
    if(!/^\d{6,15}$/.test(uid)){setMessage("Please enter a valid Player UID (6–15 digits).");return;}
    const id="MFF"+Date.now().toString().slice(-8);
    setCart([{id,uid,server,amount:total,diamonds:pack.n*qty},...cart].slice(0,4));
    setMessage(`Order ${id} prepared. Complete payment in your UPI app, then share the UTR/reference with Telegram support. Payment and delivery are manually checked.`);
    const q=new URLSearchParams({pa:UPI,pn:PAYEE,am:total.toFixed(2),cu:"INR",tn:`${STORE} ${id} UID ${uid}`});
    window.location.href="upi://pay?"+q.toString();
  };
  const copy=async()=>{try{await navigator.clipboard.writeText(UPI);setMessage("UPI ID copied.");}catch{setMessage("UPI ID: "+UPI);}};
  const card=(x)=> <button className={`tile ${x.className}`} key={x.id} onClick={()=>openItem(x)}>
    <span className="discount">{x.discount}</span><span className="tile-art">{x.icon}</span>
    <b>{x.name}</b><small>{x.subtitle}</small><span className="tile-arrow">↗</span>
  </button>;
  return <div className="site">
    <div className="cashback">UPTO 2% CASHBACK ON ALL PRODUCTS <span>×</span></div>
    <header className="top">
      <a className="logo" href="#home"><span className="logo-icon">M</span><span><b>MANJEET</b><small>✦ FF GAMER ✦</small></span></a>
      <label className="search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search for BGMI UC, Valorant & more"/></label>
      <a className="head-icon" href={TELEGRAM} target="_blank" rel="noreferrer" aria-label="Support">♧</a>
      <a className="head-icon" href="#account" onClick={e=>{e.preventDefault();setMessage("Login is not enabled yet. Contact support for help.");}}>♙</a>
    </header>
    <div className="marquee">Get Unlimited Free Fire Diamonds with MANJEET FF GAMER · Play more and save more · Explore gaming deals and gift cards</div>
    <main id="home">
      <section className="hero">
        <div className="hero-brand">✦ MANJEET<br/><b>FF GAMER</b></div>
        <div className="hero-copy"><span>WELCOME TO MANJEET FF GAMER</span><h1>YOUR GAME<br/>YOUR NEXT <em>LEVEL!</em></h1><p>Top up your favourite games with exclusive offers.</p><a href="#catalog" className="buy">BUY NOW <b>↗</b></a></div>
        <div className="moon">✦</div><div className="hero-person">⚡</div><div className="hero-bottom">FAST SUPPORT · GAMING DEALS · SECURE CHECKOUT</div>
      </section>
      <section className="for-you" id="catalog"><div className="section-head"><h2>For You</h2><span>FEATURED PICKS</span></div><div className="tiles featured">{items.slice(0,5).map(card)}</div></section>
      {groups.slice(1).map(group=><section className="catalog-section" key={group}>
        <div className="section-head"><h2>{group}</h2><button onClick={()=>setActive(group)}>View More ›</button></div>
        <div className="tiles">{items.filter(x=>x.group===group).map(card)}</div>
      </section>)}
      <section className="promo-strip"><div><small>MANJEET FF GAMER · SPECIAL DROP</small><h2>LEVEL UP YOUR<br/><em>GAMING EXPERIENCE</em></h2><p>Browse top-ups, gift cards and game keys.</p><a href="#catalog">EXPLORE STORE ↗</a></div><div className="promo-gem">💎</div></section>
      <section className="details-grid">
        <div className="guide"><small>STORE GUIDE</small><h3>How it works</h3><ol><li>Select a product or game.</li><li>Choose a package and enter your Player UID where required.</li><li>Pay using your UPI app.</li><li>Send the payment UTR/reference to support for manual confirmation.</li></ol><p className="warning">⚠ Never share your game password or OTP. Only your Player UID is required.</p></div>
        <div className="guide"><small>HELP & SAFETY</small><h3>Before you order</h3><p>Confirm product, region, price and availability before payment. Products other than Free Fire are enquiry-only until confirmed by support. Orders are manually checked; automatic payment verification and automatic fulfilment are not enabled.</p><a href={TELEGRAM} target="_blank" rel="noreferrer">CONTACT TELEGRAM SUPPORT ↗</a></div>
      </section>
      <section className="checkout" id="order">
        <div className="checkout-title"><span>🔥 Special gaming offers available</span><b>LIVE</b></div>
        <div className="checkout-head"><div><small>{chosen?.id==="freefire"||!chosen?"GARENA FREE FIRE":"SELECTED PRODUCT"}</small><h2>{chosen?.name||"Free Fire Diamonds"}</h2></div><span>{chosen?.icon||"💎"}</span></div>
        {(chosen?.id==="freefire"||!chosen)?<>
          <div className="label-row"><b>Select Options</b><span>₹72 / 100 💎</span></div>
          <div className="packs">{packs.map(p=><button key={p.n} className={pack.n===p.n?"pack selected":"pack"} onClick={()=>setPack(p)}><small>{p.t}</small><b>💎 {p.n.toLocaleString("en-IN")} Diamonds</b><strong>{money(p.p)}</strong></button>)}</div>
          <label className="field-label">Free Fire Player UID</label><input className="field" inputMode="numeric" value={uid} onChange={e=>setUid(e.target.value.replace(/\D/g,"").slice(0,15))} placeholder="Enter Player UID"/>
          <label className="field-label">Select Server / Region</label><select className="field" value={server} onChange={e=>setServer(e.target.value)}><option>India</option><option>Singapore</option><option>Other</option></select>
          <div className="qty"><span>Quantity</span><div><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><b>{qty}</b><button onClick={()=>setQty(Math.min(10,qty+1))}>+</button></div></div>
          <div className="total"><span>{pack.n.toLocaleString("en-IN")} Diamonds × {qty}</span><b>{money(total)}</b></div>
          <button className="pay" onClick={pay}>Pay {money(total)} via UPI ↗</button>
          <div className="upi"><span>UPI ID</span><b>{UPI}</b><button onClick={copy}>COPY</button></div><p className="fine">UPI app availability depends on your device. Payment is checked manually; paying does not mean top-up is automatically completed.</p>
          {cart.length>0&&<div className="recent"><b>Recent order on this device</b>{cart.map(x=><p key={x.id}>{x.id}<b>{money(x.amount)}</b><small>UID: {x.uid} · {x.server}</small></p>)}</div>}
        </>:<div className="enquiry"><div>{chosen.icon}</div><h3>{chosen.name}</h3><p>{chosen.desc}</p><p className="warning">Price and availability must be confirmed with support before payment.</p><a href={TELEGRAM} target="_blank" rel="noreferrer">ASK ON TELEGRAM ↗</a></div>}
        {message&&<div className="message" role="status">{message}</div>}
      </section>
      <div className="benefits"><div>🛡️ <b>UID-only checkout</b><small>No password required</small></div><div>⚡ <b>Quick UPI handoff</b><small>Open a supported UPI app</small></div><div>💬 <b>Support available</b><small>Contact us for order help</small></div></div>
    </main>
    <footer><div className="logo"><span className="logo-icon">M</span><span><b>MANJEET FF GAMER</b></span></div><p>Independent digital gaming store. Product availability and prices may change. Not affiliated with Garena, Google, Amazon, Flipkart, Roblox or other brands.</p><a href={TELEGRAM} target="_blank" rel="noreferrer">Telegram Support</a>　·　<a href="#catalog">Browse Store</a></footer>
  </div>;
}
createRoot(document.getElementById("root")).render(<App/>);
