import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import LanguageToggle from "../components/LanguageToggle";

export default function MainTemplate({ children }) {
  return (
    <div>
      <LanguageToggle />
      <NavBar />
      {children}
      <Footer />
    </div>
  )
}
