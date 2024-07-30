import React from "react";
import { Link } from "react-router-dom";
import "./Common.css";
import defaultImage from "../../assets/default-image.png";

export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            {/* Add image here */}
            <img src={defaultImage} alt="Logo" className="navbar-logo" />
            <span className="navbar-text"></span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Show Articles
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="create-article">
                  Create Article +
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
