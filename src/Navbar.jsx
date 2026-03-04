import { useState } from "react";
import "./Navbar.css";

export default function Navbar({ user, navigate, onLogout, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Buy PIN", page: "buy-pin" },
    { label: "Airtime → Cash", page: "airtime-cash" },
    { label: "VTU Top-up", page: "vtu-topup" },
  ];

  const go = (page) => {
    navigate(page);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar__logo" onClick={() => go("home")}>
          <div className="navbar__logo-icon">P</div>
          <span className="navbar__logo-text">
            PinSwap<span className="navbar__logo-dot">.</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="navbar__links hide-mobile">
          {links.map(({ label, page }) => (
            <span
              key={page}
              onClick={() => go(page)}
              className={`navbar__link ${
                currentPage === page ? "navbar__link--active" : ""
              }`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="navbar__auth hide-mobile">
          {user ? (
            <>
              <span className="navbar__greeting">Hi, {user.name}</span>
              <button onClick={onLogout} className="btn btn--outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => go("auth")} className="btn btn--outline">
                Login
              </button>
              <button
                onClick={() => {
                  navigate("auth", { authMode: "signup" });
                  setMenuOpen(false);
                }}
                className="btn btn--solid"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="navbar__hamburger show-mobile"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <span className="navbar__hamburger-close">✕</span>
          ) : (
            <>
              <span className="navbar__hamburger-bar" />
              <span className="navbar__hamburger-bar" />
              <span className="navbar__hamburger-bar" />
            </>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu show-mobile">
          {links.map(({ label, page }) => (
            <div
              key={page}
              onClick={() => go(page)}
              className={`navbar__mobile-link ${
                currentPage === page ? "navbar__mobile-link--active" : ""
              }`}
            >
              {label}
            </div>
          ))}
          <div className="navbar__mobile-auth">
            {user ? (
              <button
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                }}
                className="btn btn--outline btn--full"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => go("auth")}
                  className="btn btn--outline btn--full"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("auth", { authMode: "signup" });
                    setMenuOpen(false);
                  }}
                  className="btn btn--solid btn--full"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
