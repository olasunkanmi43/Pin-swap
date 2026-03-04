import "./Footer.css";

const NAV_LINKS = [
  { label: "Buy PIN", page: "buy-pin" },
  { label: "Airtime → Cash", page: "airtime-cash" },
  { label: "VTU Top-up", page: "vtu-topup" },
];

const COMPANY_LINKS = [
  "About Us",
  "Contact",
  "Privacy Policy",
  "Terms of Service",
];

const NETWORKS = [
  { name: "MTN Nigeria", color: "#ffcc00" },
  { name: "Airtel Nigeria", color: "#ff4444" },
  { name: "Glo Mobile", color: "#4caf50" },
  { name: "9mobile", color: "#00c853" },
];

export default function Footer({ navigate }) {
  return (
    <footer className="footer">
      {/* Top section */}
      <div className="footer__top">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo" onClick={() => navigate("home")}>
            <div className="footer__logo-icon">P</div>
            <span className="footer__logo-text">
              PinSwap<span className="footer__logo-dot">.</span>
            </span>
          </div>
          <p className="footer__tagline">
            Nigeria's simplest fix for the "wrong airtime" problem. Buy PINs,
            convert airtime to cash, or top up anyone, anywhere.
          </p>
          <div className="footer__socials">
            {["𝕏", "in", "ig"].map((s) => (
              <button key={s} className="footer__social-btn">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="footer__col-title">Services</h4>
          <div className="footer__links">
            {NAV_LINKS.map(({ label, page }) => (
              <button
                key={page}
                className="footer__link"
                onClick={() => navigate(page)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="footer__col-title">Company</h4>
          <div className="footer__links">
            {COMPANY_LINKS.map((item) => (
              <button key={item} className="footer__link">
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Networks */}
        <div>
          <h4 className="footer__col-title">Networks</h4>
          <div className="footer__links">
            {NETWORKS.map(({ name, color }) => (
              <div key={name} className="footer__network-item">
                <div
                  className="footer__network-dot"
                  style={{ background: color }}
                />
                <span className="footer__network-name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p className="footer__copyright">
          © {new Date().getFullYear()} PinSwap. All rights reserved.
        </p>
        <div className="footer__credit">
          <span className="footer__credit-label">Crafted by</span>
          <span className="footer__credit-name">Olasunkanmi</span>
          <span className="footer__credit-icon">⚡</span>
        </div>
      </div>
    </footer>
  );
}
