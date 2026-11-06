import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const STORE_NAME = "MANJEET FF GAMER";
const UPI_ID = "freefirelikes@naviaxis";
const PAYEE_NAME = "MANJEET KUMAR";
const SUPPORT_URL = "https://t.me/+C32BNx_GNr5mNzFl";

// All diamond packs use the same rate: ₹72 per 100 diamonds.
const PACKS = [
  { diamonds: 100, tag: "STARTER" },
  { diamonds: 310, tag: "POPULAR" },
  { diamonds: 520, tag: "VALUE" },
  { diamonds: 1060, tag: "BEST VALUE" },
  { diamonds: 2180, tag: "HOT" },
  { diamonds: 5600, tag: "MEGA PACK" }
];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2
  }).format(amount);

const priceFor = (diamonds) => (diamonds / 100) * 72;

function App() {
  const [selected, setSelected] = useState(PACKS[0]);
  const [uid, setUid] = useState("");
  const [server, setServer] = useState("India");
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [notice, setNotice] = useState("");
  const [orders, setOrders] = useState([]);

  const filteredPacks = useMemo(
    () => PACKS.filter((pack) => String(pack.diamonds).includes(search.trim())),
    [search]
  );

  const total = priceFor(selected.diamonds) * quantity;

  function choosePack(pack) {
    setSelected(pack);
    setQuantity(1);
    document.getElementById("topup")?.scrollIntoView({ behavior: "smooth" });
  }

  function startPayment() {
    if (!/^\d{6,15}$/.test(uid.trim())) {
      setNotice("Please enter a valid Free Fire Player UID (6–15 digits).");
      return;
    }
    const orderId = "MFG" + Date.now().toString().slice(-9);
    const order = {
      id: orderId,
      uid: uid.trim(),
      server,
      diamonds: selected.diamonds * quantity,
      amount: total,
      status: "Payment started — awaiting manual confirmation"
    };
    setOrders((current) => [order, ...current]);
    const params = new URLSearchParams({
      pa: UPI_ID,
      pn: PAYEE_NAME,
      am: total.toFixed(2),
      cu: "INR",
      tn: `${STORE_NAME} ${orderId} UID ${uid.trim()}`
    });
    setNotice(`Order ${orderId} created. Complete payment in your UPI app, then share the UTR/payment screenshot with support for manual checking.`);
    window.location.href = `upi://pay?${params.toString()}`;
  }

  async function copyUpi() {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setNotice("UPI ID copied.");
    } catch {
      setNotice(`UPI ID: ${UPI_ID}`);
    }
  }

  function submitLogin(event) {
    event.preventDefault();
    setNotice("Login screen is a design preview. OTP/Google login needs an authentication backend.");
    setLoginOpen(false);
  }

  return (
    <div className="app-shell">
      <div className="top-strip">✦ GAMING DEALS • FAST SUPPORT • SECURE CHECKOUT ✦</div>

      <header className="navbar">
        <a className="brand" href="#home" aria-label="Manjeet FF Gamer home">
          <span className="brand-mark">M</span>
          <span><b>MANJEET</b><small>FF GAMER</small></span>
        </a>
        <div className="search-box">
          <span>⌕</span>
          <input
            aria-label="Search diamond packs"
            placeholder="Search Free Fire diamonds..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <button className="login-button" onClick={() => setLoginOpen(true)}>♙ <span>Login</span></button>
      </header>

      <div className="ticker">
        <span>FREE FIRE TOP-UP</span><i>•</i><span>ALL PACKS AT ₹72 / 100 DIAMONDS</span><i>•</i><span>MANUAL PAYMENT CONFIRMATION</span>
      </div>

      <main id="home" className="page">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">WELCOME TO THE BATTLE STORE</div>
            <h1>LEVEL UP YOUR <span>GAME.</span></h1>
            <p>Free Fire diamonds and gaming deals from MANJEET FF GAMER.</p>
            <a className="primary-button" href="#topup">SHOP DIAMONDS <b>↗</b></a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
            <div className="diamond">◆</div><div className="hero-caption">BOOYAH!</div>
            <div className="hero-number">FF</div>
          </div>
          <div className="hero-bottom">FAST • SIMPLE • PLAYER UID TOP-UP</div>
        </section>

        <section className="section-heading">
          <div><span className="section-kicker">SHOP BY CATEGORY</span><h2>🔥 Gaming Top Ups</h2></div>
          <span className="view-label">FEATURED STORE</span>
        </section>

        <section className="category-row">
          <button className="category-card active-category" onClick={() => document.getElementById("topup")?.scrollIntoView({ behavior: "smooth" })}>
            <span className="category-icon">💎</span><span><b>Free Fire Diamonds</b><small>Choose your diamond pack</small></span><strong>›</strong>
          </button>
          <div className="category-card muted-category"><span className="category-icon">🎮</span><span><b>More Games</b><small>Coming soon</small></span><strong>⌛</strong></div>
        </section>

        <div className="content-grid">
          <div className="left-column">
            <section className="promo-banner">
              <div className="promo-glow"></div>
              <span className="promo-label">MANJEET FF GAMER • SPECIAL DROP</span>
              <h2>DIAMONDS<br /><em>FOR YOUR NEXT WIN.</em></h2>
              <p>One simple rate for every diamond pack.</p>
              <div className="promo-price">₹72 <small>/ 100 diamonds</small></div>
              <a href="#topup" className="text-link">EXPLORE PACKS →</a>
              <div className="promo-crystal">💎</div>
            </section>

            <section className="info-panel">
              <div className="panel-title"><span>STORE GUIDE</span><b>Information</b></div>
              <p>Choose a package, enter your correct Free Fire Player UID and server, then pay using your UPI app.</p>
              <div className="how-title">How it works</div>
              <ol>
                <li>Select a diamond package.</li>
                <li>Enter your Player UID and server.</li>
                <li>Pay the displayed amount using UPI.</li>
                <li>Send your payment UTR/reference to support for manual confirmation.</li>
              </ol>
              <div className="notice-line">⚠️ Never share your game password or OTP. Only your Player UID is required.</div>
            </section>

            <section className="info-panel policy-panel">
              <div className="panel-title"><span>HELP & SAFETY</span><b>Before you order</b></div>
              <p>Check your UID and server carefully before paying. Incorrect UID/server orders may not be reversible. Orders are not automatically verified or fulfilled by this demo website.</p>
              <a className="support-link" href={SUPPORT_URL} target="_blank" rel="noreferrer">CONTACT TELEGRAM SUPPORT ↗</a>
            </section>
          </div>

          <aside className="purchase-panel" id="topup">
            <div className="panel-offer">🎁 <span>Special gaming offers available</span><b>LIVE</b></div>
            <div className="panel-heading"><div><small>GARENA FREE FIRE</small><h2>Free Fire Diamonds</h2></div><span className="diamond-small">◆</span></div>
            <div className="select-heading"><b>Select Options</b><span>₹72 / 100 💎</span></div>
            <div className="pack-grid">
              {filteredPacks.map((pack) => (
                <button
                  key={pack.diamonds}
                  className={`pack-card ${selected.diamonds === pack.diamonds ? "selected" : ""}`}
                  onClick={() => choosePack(pack)}
                >
                  {pack.tag && <span className="pack-tag">{pack.tag}</span>}
                  <span className="pack-gem">💎</span>
                  <b>{pack.diamonds.toLocaleString("en-IN")} Diamonds</b>
                  <strong>{money(priceFor(pack.diamonds))}</strong>
                </button>
              ))}
              {filteredPacks.length === 0 && <div className="empty-search">No pack found. Try 100, 310, 520...</div>}
            </div>

            <label className="field-label" htmlFor="uid">Free Fire Player UID</label>
            <input id="uid" className="text-field" inputMode="numeric" placeholder="Enter Player UID" value={uid} onChange={(event) => setUid(event.target.value.replace(/\D/g, "").slice(0, 15))} />
            <label className="field-label" htmlFor="server">Select Server / Region</label>
            <select id="server" className="text-field" value={server} onChange={(event) => setServer(event.target.value)}>
              <option>India</option><option>Singapore</option><option>Other</option>
            </select>

            <div className="quantity-row"><span>Quantity</span><div className="quantity-control">
              <button aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <b>{quantity}</b>
              <button aria-label="Increase quantity" onClick={() => setQuantity((q) => Math.min(10, q + 1))}>+</button>
            </div></div>

            <div className="bill-row"><span>{selected.diamonds.toLocaleString("en-IN")} Diamonds × {quantity}</span><b>{money(total)}</b></div>
            <button className="pay-button" onClick={startPayment}>Pay {money(total)} via UPI <span>↗</span></button>
            <div className="upi-row"><span>UPI ID</span><b>{UPI_ID}</b><button onClick={copyUpi}>COPY</button></div>
            <div className="payment-note">UPI app availability depends on your device. Payment is checked manually; paying does not mean the top-up is automatically completed.</div>
            {notice && <div className="notice-box" role="status">{notice}</div>}
            {orders.length > 0 && <div className="order-preview">
              <b>Recent order on this device</b>
              {orders.slice(0, 2).map((order) => <div className="order-item" key={order.id}><span>{order.id}<small>UID: {order.uid} • {order.server}</small></span><strong>{money(order.amount)}</strong></div>)}
            </div>}
          </aside>
        </div>

        <section className="bottom-benefits">
          <div><span>🛡️</span><b>UID-only checkout</b><small>No game password required</small></div>
          <div><span>⚡</span><b>Quick UPI handoff</b><small>Open a supported UPI app</small></div>
          <div><span>💬</span><b>Support available</b><small>Contact us for order help</small></div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand"><span className="brand-mark">M</span><b>MANJEET FF GAMER</b></div>
        <p>Independent gaming store. Not affiliated with or endorsed by Garena.</p>
        <div><a href={SUPPORT_URL} target="_blank" rel="noreferrer">Telegram Support</a><a href="#topup">Shop Diamonds</a></div>
        <small>© {new Date().getFullYear()} MANJEET FF GAMER. All rights reserved.</small>
      </footer>

      {loginOpen && <div className="modal-backdrop" onClick={() => setLoginOpen(false)}>
        <form className="login-modal" onSubmit={submitLogin} onClick={(event) => event.stopPropagation()}>
          <button type="button" className="modal-close" onClick={() => setLoginOpen(false)}>×</button>
          <span className="section-kicker">WELCOME BACK</span><h2>Login / Sign Up</h2>
          <p>Enter your mobile number to continue.</p>
          <div className="mobile-input"><span>🇮🇳 +91</span><input aria-label="Mobile number" inputMode="numeric" placeholder="Mobile number" value={mobile} onChange={(event) => setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))} /></div>
          <button className="pay-button" type="submit" disabled={mobile.length !== 10}>Continue</button>
          <small className="login-disclaimer">Demo login screen only. OTP and Google sign-in require backend authentication setup.</small>
        </form>
      </div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
