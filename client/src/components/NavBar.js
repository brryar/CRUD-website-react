import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link style={{ textDecoration: "none" }} to="/" className="navbar-brand">
            CMS
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav">
              <Link style={{ textDecoration: "none" }} to="/" className="nav-link active" aria-current="page">
                Products List
              </Link>
              <Link style={{ textDecoration: "none" }} to="/add" className="nav-link active" aria-current="page">
                Add Product
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
