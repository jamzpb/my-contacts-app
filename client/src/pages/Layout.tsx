import React, { useEffect } from "react";
// @ts-expect-error: unreachable js
import { initAll } from "../styles/govuk-frontend-5.8.0.min.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";


const Layout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {

    document.body.classList.add("govuk-template__body", "js-enabled");

    if ("noModule" in HTMLScriptElement.prototype) {
      document.body.classList.add("govuk-frontend-supported");
    }

    initAll();
  }, []);

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <div className="govuk-main-wrapper" id="main-content">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
