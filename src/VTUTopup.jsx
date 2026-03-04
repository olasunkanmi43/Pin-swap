import { useState } from "react";
import "./VTUTopup.css";
import "./shared.css";

const NETWORKS = [
  { id: "MTN", colorClass: "vtu__network-btn--mtn" },
  { id: "Airtel", colorClass: "vtu__network-btn--airtel" },
  { id: "Glo", colorClass: "vtu__network-btn--glo" },
  { id: "9mobile", colorClass: "vtu__network-btn--9mobile" },
];
const AMOUNTS = [50, 100, 200, 500, 1000, 2000];
const DATA_PLANS = {
  MTN: [
    { label: "100MB", duration: "1 day", price: 100 },
    { label: "1GB", duration: "30 days", price: 300 },
    { label: "3GB", duration: "30 days", price: 750 },
    { label: "10GB", duration: "30 days", price: 1500 },
  ],
  Airtel: [
    { label: "200MB", duration: "1 day", price: 100 },
    { label: "1.5GB", duration: "30 days", price: 350 },
    { label: "4GB", duration: "30 days", price: 800 },
    { label: "12GB", duration: "30 days", price: 1800 },
  ],
  Glo: [
    { label: "500MB", duration: "1 day", price: 100 },
    { label: "2GB", duration: "30 days", price: 300 },
    { label: "5GB", duration: "30 days", price: 700 },
    { label: "15GB", duration: "30 days", price: 1500 },
  ],
  "9mobile": [
    { label: "150MB", duration: "1 day", price: 100 },
    { label: "1GB", duration: "30 days", price: 350 },
    { label: "3.5GB", duration: "30 days", price: 800 },
    { label: "11.5GB", duration: "30 days", price: 1800 },
  ],
};

export default function VTUTopup({ navigate }) {
  const [type, setType] = useState("airtime");
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState(null);
  const [plan, setPlan] = useState(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const plans = network ? DATA_PLANS[network] : DATA_PLANS.MTN;
  const valid =
    network && phone.length >= 10 && (type === "airtime" ? amount : plan);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1800);
  };
  const resetAll = () => {
    setDone(false);
    setPhone("");
    setAmount(null);
    setPlan(null);
  };

  /* Success screen */
  if (done) {
    const sentValue =
      type === "airtime"
        ? `₦${amount?.toLocaleString()} airtime`
        : `${plan?.label} data`;
    return (
      <div className="vtu__success">
        <div className="vtu__success-inner">
          <div className="vtu__success-emoji">✅</div>
          <h2 className="vtu__success-title">Top-up Successful!</h2>
          <p>
            <span className="vtu__success-value">{sentValue}</span> sent to{" "}
            {phone}
          </p>
          <p className="vtu__success-network">{network} Network</p>
          <button
            className="primary-btn primary-btn--orange"
            onClick={resetAll}
          >
            Send Another Top-up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vtu">
      <div className="vtu__inner">
        <button className="back-btn" onClick={() => navigate("home")}>
          ← Back
        </button>
        <h2 className="vtu__title">VTU Top-up</h2>
        <p className="vtu__subtitle">
          Send airtime or data directly to any Nigerian number.
        </p>

        <div className="vtu__card">
          {/* Type toggle */}
          <div className="vtu__toggle">
            {["airtime", "data"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setType(t);
                  setAmount(null);
                  setPlan(null);
                }}
                className={`vtu__toggle-btn ${
                  type === t ? "vtu__toggle-btn--active" : ""
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <span className="field-label">Select Network</span>
          <div className="vtu__network-grid">
            {NETWORKS.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  setNetwork(n.id);
                  setPlan(null);
                }}
                className={`vtu__network-btn ${n.colorClass} ${
                  network === n.id ? "vtu__network-btn--active" : ""
                }`}
              >
                {n.id}
              </button>
            ))}
          </div>

          <span className="field-label">Recipient Phone Number</span>
          <input
            className="field-input field-input--mono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="080XXXXXXXX"
          />

          {type === "airtime" ? (
            <>
              <span className="field-label">Amount (₦)</span>
              <div className="vtu__amount-grid">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAmount(a)}
                    className={`vtu__amount-btn ${
                      amount === a ? "vtu__amount-btn--active" : ""
                    }`}
                  >
                    ₦{a}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <span className="field-label">Select Data Plan</span>
              <div className="vtu__plans">
                {plans.map((p, i) => (
                  <div
                    key={i}
                    onClick={() => network && setPlan(p)}
                    className={[
                      "vtu__plan-item",
                      plan === p ? "vtu__plan-item--active" : "",
                      !network ? "vtu__plan-item--disabled" : "",
                    ].join(" ")}
                  >
                    <div>
                      <div
                        className={`vtu__plan-label ${
                          plan === p ? "vtu__plan-label--active" : ""
                        }`}
                      >
                        {p.label}
                      </div>
                      <div className="vtu__plan-duration">{p.duration}</div>
                    </div>
                    <div
                      className={`vtu__plan-price ${
                        plan === p ? "vtu__plan-price--active" : ""
                      }`}
                    >
                      ₦{p.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <button
            className={`primary-btn primary-btn--orange ${
              !valid || loading ? "primary-btn--disabled" : ""
            }`}
            onClick={handleSend}
            disabled={!valid || loading}
          >
            {loading
              ? "Sending..."
              : `Send ${
                  type === "airtime"
                    ? `₦${amount || 0} Airtime`
                    : plan
                    ? `${plan.label} Data`
                    : "Data"
                } →`}
          </button>
        </div>
      </div>
    </div>
  );
}
