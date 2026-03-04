import { useState } from "react";
import "./Auth.css";
import "./shared.css";

export default function Auth({ mode, onAuth, navigate }) {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.email || !form.password)
      return setError("Please fill all required fields.");
    if (!isLogin && !form.name) return setError("Name is required.");
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth({
        name: form.name || form.email.split("@")[0],
        email: form.email,
      });
    }, 1200);
  };

  return (
    <div className="auth">
      <div className="auth__inner">
        <button className="back-btn" onClick={() => navigate("home")}>
          ← Back to Home
        </button>

        <div className="auth__card">
          {/* Header */}
          <div className="auth__header">
            <div className="auth__logo">P</div>
            <h2 className="auth__title">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="auth__desc">
              {isLogin
                ? "Login to manage your transactions"
                : "Join PinSwap and start swapping"}
            </p>
          </div>

          {/* Toggle */}
          <div className="auth__toggle">
            {["Login", "Sign Up"].map((t, i) => (
              <button
                key={t}
                onClick={() => {
                  setIsLogin(i === 0);
                  setError("");
                }}
                className={`auth__toggle-btn ${
                  isLogin === (i === 0) ? "auth__toggle-btn--active" : ""
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {!isLogin && (
            <Field
              label="Full Name"
              placeholder="Your full name"
              value={form.name}
              onChange={(v) => set("name", v)}
            />
          )}
          <Field
            label="Email"
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={(v) => set("email", v)}
          />
          {!isLogin && (
            <Field
              label="Phone Number"
              type="tel"
              placeholder="080XXXXXXXX"
              value={form.phone}
              onChange={(v) => set("phone", v)}
              mono
            />
          )}
          <Field
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(v) => set("password", v)}
          />

          {error && <div className="auth__error">{error}</div>}

          <button
            className={`primary-btn ${loading ? "primary-btn--disabled" : ""}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Creating account..."
              : isLogin
              ? "Login →"
              : "Create Account →"}
          </button>

          <p className="auth__switch">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              className="auth__switch-link"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>

        <p className="auth__trust">
          🔒 Secured with 256-bit encryption · Trusted by 10,000+ Nigerians
        </p>
      </div>
    </div>
  );
}

function Field({ label, type = "text", placeholder, value, onChange, mono }) {
  return (
    <div className="auth__field">
      <label className="auth__field-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`auth__field-input ${mono ? "auth__field-input--mono" : ""}`}
      />
    </div>
  );
}
