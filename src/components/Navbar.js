import React from "react";
import appIcon from "../assets/asl-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container-fluid" justifycontent="space-between">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src={appIcon}
            role="presentation"
            width="70"
            height="70"
            className="app-logo d-inline-block align-text-top"
          />
          <span className="app-name ms-4">ASL Quiz App</span>
        </a>
        <FontAwesomeIcon
          icon={faUserCircle}
          className="right-align me-4 account-icon"
          size="xl"
          inverse
        />
      </div>
    </nav>
  );
};

export default Navbar;
