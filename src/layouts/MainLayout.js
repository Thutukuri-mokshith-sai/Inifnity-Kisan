import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-grow-1 p-4">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainLayout;
