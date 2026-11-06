import React, {useState} from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const packs = [
  {name:"25 Diamonds", price:20, old:30, tag:"START"},
  {name:"50 Diamonds", price:38, old:55},
  {name:"100 Diamonds", price:75, old:95, tag:"POPULAR"},
  {name:"310 Diamonds", price:220, old:270},
  {name:"520 Diamonds", price:365, old:450},
  {name:"Weekly Membership", price:150, old:190, tag:"HOT"},
  {name:"1060 Diamonds", price:735, old:900},
  {name:"Monthly Membership", price:740, old:900, tag:"BEST"}
];

function App(){
  const [selected, setSelected] = useState(packs[0]);
  const [uid, setUid] = useState("");
  const [qty, setQty] = useState(1);
  const [showLogin, setShowLogin] = useState(false);
  const [phone, setPhone] = useState("");

  const total = selected.price * qty;

  function pay(){
    if(!uid.trim()){
      alert("Please enter your Free Fire UID first.");
      return;
    }
    const note = encodeURIComponent(`FF UID ${uid} - ${selected.name} x${qty}`);
    const upi = `upi://pay?pa=freefirelikes@naviaxis&pn=Manjeet%20FF%20Gamer&am=${total}&cu=INR&tn=${note}`;
    window.location.href = upi;
  }

  return <div>
    <div className="topbar">🔥 MANJEET FF GAMER — GAMING DEALS & TOP-UPS 🔥</div>
    <header>
      <div className="brand">⚡ <span>MANJEET</span> FF GAMER</div>
      <input className="search" placeholder="Search games & products..." />
      <button className="loginBtn" onClick={()=>setShowLogin(true)}>👤 Login</button>
    </header>
    <div className="ticker">Free Fire • Gaming Top-Ups • Special Deals • Secure Checkout</div>

    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">WELCOME TO</p>
          <h1>MANJEET <em>FF GAMER</em></h1>
          <p>Fast gaming top-up experience with exciting offers.</p>
          <a href="#topup">TOP UP NOW</a>
        </div>
        <div className="heroArt">🎮<br/><span>ANIME GAMING</span></div>
      </section>

      <h2 id="topup">🔥 Gaming Top Ups</h2>
      <div className="content">
        <section className="info">
          <div className="gameCard">
            <div className="gameIcon">💎</div>
            <div><small>Garena</small><h3>Free Fire Diamonds</h3><p>Enter your Player UID and select a package.</p></div>
          </div>
          <div className="animePanel">
            <div className="animeGlow"></div>
            <div className="animeText">ANIME<br/>GAMER</div>
          </div>

          <article>
            <h2>Information</h2>
            <p><b>For supported accounts only.</b></p>
            <p>Choose a package, enter the correct Free Fire UID and complete payment. Orders should only be fulfilled through an authorized top-up source or official reseller arrangement.</p>
            <h2>How it works</h2>
            <ol>
              <li>Select your preferred package.</li>
              <li>Enter your Free Fire UID.</li>
              <li>Pay the displayed amount.</li>
              <li>Keep your payment reference for support.</li>
            </ol>
          </article>
        </section>

        <aside className="checkout">
          <div className="reward">🎁 Special gaming offers available</div>
          <h3>Select Options</h3>
          <div className="packGrid">
            {packs.map((p,i)=><button key={i} onClick={()=>setSelected(p)}
              className={"pack "+(selected.name===p.name?"active":"")}>
              {p.tag && <b>{p.tag}</b>}
              <strong>{p.name}</strong>
              <span>₹{p.price}</span>
              <del>₹{p.old}</del>
            </button>)}
          </div>

          <label>Free Fire UID</label>
          <input value={uid} onChange={e=>setUid(e.target.value)} placeholder="Enter Player UID" />

          <div className="quantity">
            <span>Quantity</span>
            <button onClick={()=>setQty(Math.max(1,qty-1))}>−</button>
            <b>{qty}</b>
            <button onClick={()=>setQty(qty+1)}>+</button>
          </div>

          <div className="summary">
            <span>{selected.name} × {qty}</span>
            <strong>₹{total}</strong>
          </div>
          <button className="pay" onClick={pay}>Pay ₹{total} via UPI</button>
          <p className="note">UPI: freefirelikes@naviaxis</p>
          <p className="small">Payment success does not automatically guarantee fulfilment; verify orders securely before delivery.</p>
        </aside>
      </div>
    </main>

    {showLogin && <div className="overlay" onClick={()=>setShowLogin(false)}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <button className="close" onClick={()=>setShowLogin(false)}>×</button>
        <h2>Login / Sign Up</h2>
        <p>Enter your mobile number to continue.</p>
        <div className="phone"><span>🇮🇳 +91</span><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Mobile Number" /></div>
        <button className="continue" onClick={()=>alert("Connect a secure OTP provider before enabling real login.")}>Continue</button>
        <div className="or">— or —</div>
        <button className="google">ⓖ Continue with Google</button>
      </div>
    </div>}

    <footer>© 2026 Manjeet FF Gamer • Independent gaming store</footer>
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);
