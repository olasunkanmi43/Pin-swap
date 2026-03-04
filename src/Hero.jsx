import "./Hero.css";

export default function Hero({ navigate }) {
  const features = [
    {
      icon: "🃏",
      title: "Buy Recharge PIN",
      desc: "Get shareable PIN codes for MTN, Airtel, Glo & 9mobile instantly.",
      page: "buy-pin",
      colorClass: "hero__feature-card--green",
    },
    {
      icon: "💸",
      title: "Airtime → Cash",
      desc: "Convert unwanted airtime balance to cash. Sent to your bank in minutes.",
      page: "airtime-cash",
      colorClass: "hero__feature-card--blue",
    },
    {
      icon: "⚡",
      title: "VTU Top-up",
      desc: "Send direct airtime or data to any number across all networks.",
      page: "vtu-topup",
      colorClass: "hero__feature-card--orange",
    },
  ];

  const steps = [
    { step: "01", text: "Choose a network & amount" },
    { step: "02", text: "Pay securely with Paystack" },
    { step: "03", text: "Receive your PIN code instantly" },
    { step: "04", text: "Share the PIN with anyone" },
  ];

  return (
    <main className="hero">
      {/* ── Hero Banner ── */}
      <section className="hero__section">
        <div className="hero__glow" />
        <div className="hero__badge">🇳🇬 BUILT FOR NIGERIANS</div>

        <h1 className="hero__title">
          Stop the
          <br />
          <span className="hero__title-gradient">Airtime Mistake.</span>
        </h1>

        <p className="hero__subtitle">
          When your people mistakenly send VTU instead of a recharge card —
          PinSwap has the fix. Buy PINs, swap airtime for cash, or top-up the
          right way.
        </p>

        <div className="hero__buttons">
          <button
            className="hero__btn-primary"
            onClick={() => navigate("buy-pin")}
          >
            Buy Recharge PIN →
          </button>
          <button
            className="hero__btn-secondary"
            onClick={() => navigate("airtime-cash")}
          >
            Convert Airtime to Cash
          </button>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="hero__features">
        <div className="hero__feature-grid">
          {features.map(({ icon, title, desc, page, colorClass }) => (
            <div
              key={page}
              className={`hero__feature-card ${colorClass}`}
              onClick={() => navigate(page)}
            >
              <div className="hero__feature-icon">{icon}</div>
              <h3 className="hero__feature-title">{title}</h3>
              <p className="hero__feature-desc">{desc}</p>
              <div className="hero__feature-cta">Get started →</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="hero__how">
        <h2 className="hero__how-title">How it works</h2>
        <div className="hero__steps">
          {steps.map(({ step, text }) => (
            <div key={step}>
              <div className="hero__step-circle">{step}</div>
              <p className="hero__step-text">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
