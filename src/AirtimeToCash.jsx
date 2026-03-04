import { useState } from "react";
import "./AirtimeToCash.css";
import "./shared.css";

const NETWORKS = ["MTN", "Airtel", "Glo", "9mobile"];
const RATES = { MTN: 0.78, Airtel: 0.75, Glo: 0.72, "9mobile": 0.7 };
const BANKS = [
  "Access Bank",
  "GTBank",
  "First Bank",
  "Zenith Bank",
  "UBA",
  "Kuda",
  "Opay",
  "Palmpay",
];

export default function AirtimeToCash({ navigate }) {
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState({ bank: "", number: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const cashValue = amount
    ? Math.floor(parseFloat(amount) * (RATES[network] || 0))
    : 0;
  const valid =
    network &&
    parseFloat(amount) >= 100 &&
    account.bank &&
    account.number.length === 10 &&
    account.name;

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 2000);
  };

  const resetAll = () => {
    setDone(false);
    setNetwork("");
    setAmount("");
    setAccount({ bank: "", number: "", name: "" });
  };

  /* ── Success screen ── */
  if (done)
    return (
      <div className="atc__success">
        <div className="atc__success-inner">
          <div className="atc__success-emoji">💰</div>
          <h2 className="atc__success-title">Transfer Initiated!</h2>
          <p>
            <span className="atc__success-amount">
              ₦{cashValue.toLocaleString()}
            </span>{" "}
            will arrive in your account within 5 minutes.
          </p>
          <p className="atc__success-detail">
            {account.bank} · {account.number}
          </p>
          <button className="primary-btn" onClick={resetAll}>
            Convert More Airtime
          </button>
        </div>
      </div>
    );

  return (
    <div className="atc">
      <div className="atc__inner">
        <button className="back-btn" onClick={() => navigate("home")}>
          ← Back
        </button>
        <h2 className="atc__title">Airtime → Cash</h2>
        <p className="atc__subtitle">
          Convert your leftover airtime balance into real cash. Sent straight to
          your bank.
        </p>

        <div className="atc__card">
          {/* Rate badges */}
          <div className="atc__rates">
            {NETWORKS.map((n) => (
              <span key={n} className="atc__rate-badge">
                {n} {(RATES[n] * 100).toFixed(0)}%
              </span>
            ))}
          </div>

          <span className="field-label">Select Network</span>
          <div className="atc__network-grid">
            {NETWORKS.map((n) => (
              <button
                key={n}
                onClick={() => setNetwork(n)}
                className={`atc__network-btn ${
                  network === n ? "atc__network-btn--active" : ""
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <span className="field-label">Airtime Amount (₦)</span>
          <input
            type="number"
            className="field-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Minimum ₦100"
          />

          {amount && network && (
            <div className="atc__preview">
              <span className="atc__preview-label">You'll receive</span>
              <span className="atc__preview-amount">
                ₦{cashValue.toLocaleString()}
              </span>
            </div>
          )}

          <span className="field-label">Bank Details</span>
          <select
            className="field-select"
            value={account.bank}
            onChange={(e) => setAccount({ ...account, bank: e.target.value })}
          >
            <option value="">Select your bank</option>
            {BANKS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <input
            className="field-input field-input--mono"
            value={account.number}
            onChange={(e) => setAccount({ ...account, number: e.target.value })}
            placeholder="Account Number"
            maxLength={10}
          />
          <input
            className="field-input"
            value={account.name}
            onChange={(e) => setAccount({ ...account, name: e.target.value })}
            placeholder="Account Name"
          />

          <button
            className={`primary-btn ${
              !valid || loading ? "primary-btn--disabled" : ""
            }`}
            onClick={handleSubmit}
            disabled={!valid || loading}
          >
            {loading
              ? "Processing..."
              : `Convert ₦${
                  amount || "0"
                } → ₦${cashValue.toLocaleString()} Cash`}
          </button>
        </div>
      </div>
    </div>
  );
}
