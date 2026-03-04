import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import BuyPin from "./BuyPin";
import AirtimeToCash from "./AirtimeToCash";
import VTUTopup from "./VTUTopup";
import Auth from "./Auth";
import Footer from "./Footer";

export default function App() {
  const [page, setPage] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);

  const navigate = (p, extra = {}) => {
    if (extra.authMode) setAuthMode(extra.authMode);
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuth = (userData) => {
    setUser(userData);
    setPage("home");
  };
  const handleLogout = () => {
    setUser(null);
    setPage("home");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <div className="app-wrapper">
        <Navbar
          user={user}
          navigate={navigate}
          onLogout={handleLogout}
          currentPage={page}
        />
        {page === "home" && <Hero navigate={navigate} user={user} />}
        {page === "buy-pin" && <BuyPin navigate={navigate} user={user} />}
        {page === "airtime-cash" && (
          <AirtimeToCash navigate={navigate} user={user} />
        )}
        {page === "vtu-topup" && <VTUTopup navigate={navigate} user={user} />}
        {page === "auth" && (
          <Auth mode={authMode} onAuth={handleAuth} navigate={navigate} />
        )}
        <Footer navigate={navigate} />
      </div>
    </>
  );
}
