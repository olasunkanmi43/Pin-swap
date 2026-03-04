import { useState } from "react";
import "./BuyPin.css";
import "./shared.css";

const NETWORKS = [
  { id: "mtn", name: "MTN", colorClass: "buyppin__network-btn--mtn" },
  { id: "airtel", name: "Airtel", colorClass: "buyppin__network-btn--airtel" },
  { id: "glo", name: "Glo", colorClass: "buyppin__network-btn--glo" },
  {
    id: "9mobile",
    name: "9mobile",
    colorClass: "buyppin__network-btn--9mobile",
  },
];

const AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

export default function BuyPin({ navigate }) {
  const [network, setNetwork] = useState(null);
  const [amount, setAmount] = useState(null);
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState(null);

  const handleProceed = () => {
    if (network && amount && phone.length >= 10) setStep(2);
  };
  const handlePay = () => {
    setTimeout(() => {
      setPin(Math.random().toString().slice(2, 18).match(/.{4}/g).join("-"));
      setStep(3);
    }, 1500);
  };
  const reset = () => {
    setNetwork(null);
    setAmount(null);
    setPhone("");
    setStep(1);
    setPin(null);
  };

  const disabled = !network || !amount || phone.length < 10;

  return (
    <div className="buyppin">
      <div className="buyppin__inner">
        <button className="back-btn" onClick={() => navigate("home")}>
          ← Back
        </button>
        <h2 className="buyppin__title">Buy Recharge PIN</h2>
        <p className="buyppin__subtitle">
          Get a shareable PIN code — never send VTU by mistake again.
        </p>

        <div className="buyppin__card">
          {/* ── Step 1: Select options ── */}
          {step === 1 && (
            <>
              <span className="field-label">Select Network</span>
              <div className="buyppin__network-grid">
                {NETWORKS.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setNetwork(n.id)}
                    className={`buyppin__network-btn ${n.colorClass} ${
                      network === n.id ? "buyppin__network-btn--active" : ""
                    }`}
                  >
                    {n.name}
                  </button>
                ))}
              </div>

              <span className="field-label">Select Amount (₦)</span>
              <div className="buyppin__amount-grid">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAmount(a)}
                    className={`buyppin__amount-btn ${
                      amount === a ? "buyppin__amount-btn--active" : ""
                    }`}
                  >
                    ₦{a.toLocaleString()}
                  </button>
                ))}
              </div>

              <span className="field-label">Your Phone Number (receipt)</span>
              <input
                className="field-input field-input--mono field-input--mb-large"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="080XXXXXXXX"
              />

              <button
                className={`primary-btn ${
                  disabled ? "primary-btn--disabled" : ""
                }`}
                onClick={handleProceed}
                disabled={disabled}
              >
                Proceed to Payment →
              </button>
            </>
          )}

          {/* ── Step 2: Confirm & Pay ── */}
          {step === 2 && (
            <>
              <div className="buyppin__summary">
                <SummaryRow label="Network" value={network?.toUpperCase()} />
                <SummaryRow
                  label="Amount"
                  value={`₦${amount?.toLocaleString()}`}
                />
                <SummaryRow label="Phone" value={phone} />
                <div className="buyppin__summary-divider">
                  <SummaryRow
                    label="Total"
                    value={`₦${amount?.toLocaleString()}`}
                    accent
                  />
                </div>
              </div>
              <button className="primary-btn" onClick={handlePay}>
                Pay with Paystack ✓
              </button>
              <button
                className="back-btn"
                style={{ marginTop: 12, display: "block" }}
                onClick={() => setStep(1)}
              >
                ← Edit Order
              </button>
            </>
          )}

          {/* ── Step 3: PIN Revealed ── */}
          {step === 3 && (
            <div className="buyppin__success">
              <div className="buyppin__success-emoji">🎉</div>
              <h3 className="buyppin__success-title">Your PIN is Ready!</h3>
              <p className="buyppin__success-sub">
                Share this PIN with anyone to recharge their line.
              </p>
              <div className="buyppin__pin">{pin}</div>
              <p className="buyppin__pin-meta">
                {network?.toUpperCase()} · ₦{amount?.toLocaleString()} · Valid
                for 30 days
              </p>
              <button className="primary-btn" onClick={reset}>
                Buy Another PIN
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, accent }) {
  return (
    <div className="buyppin__summary-row">
      <span className="buyppin__summary-label">{label}</span>
      <span
        className={`buyppin__summary-value ${
          accent ? "buyppin__summary-value--accent" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
