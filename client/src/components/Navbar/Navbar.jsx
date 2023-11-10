import React from "react";
import styles from "./Navbar.module.css";
import LightLogo from "../assets/images/logo-light.png";
import DarkLogo from "../assets/images/logo-dark.png";
import { ShoppingCart, Settings, LogIn, R } from "react-feather";
import "../assets/sass/_topbar.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header id="topnav" className="defaultscroll sticky mb-5">
      <div className="container">
        <div>
          <Link className="logo" to={""}>
            <span className="logo-light-mode">
              <img src={DarkLogo} className="l-dark" height={60} />
              <img src={LightLogo} className="l-light" height={60} />
            </span>
            <img src={LightLogo} height={60} className="logo-dark-mode" />
          </Link>
        </div>
        <div className="menu-extras">
          <div className="menu-item">
            <a className="navbar-toggle" id="isToggle" onclick="toggleMenu()">
              <div className="lines">
                <span />
                <span />
                <span />
              </div>
            </a>
          </div>
        </div>
        <ul className="buy-button list-inline mb-0">
          <li className="list-inline-item mb-0">
            <a
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <div className="login-btn-primary">
                <span className="btn btn-icon btn-pills btn-soft-primary">
                  <LogIn />
                </span>
              </div>
              <div className="login-btn-light">
                <span className="btn btn-icon btn-pills btn-light">
                  <LogIn />
                </span>
              </div>
            </a>
          </li>
          <li className="list-inline-item ps-1 mb-0">
            <a href="#" target="_blank">
              <div className="login-btn-primary">
                <span className="btn btn-icon btn-pills btn-primary">
                  <ShoppingCart />
                </span>
              </div>

              <div className="login-btn-light">
                <span className="btn btn-icon btn-pills btn-light">
                  <ShoppingCart />
                </span>
              </div>
            </a>
          </li>
        </ul>
        <div id="navigation">
          <ul className="navigation-menu nav-light">
            <li>
              <Link to={""} className="sub-menu-item">
                Home
              </Link>
            </li>
            <li>
              <Link to={"trainers"} className="sub-menu-item">
                {" "}
                Trainers
              </Link>
            </li>
            <li>
              <a href="corporate-services.html" className="sub-menu-item">
                Services
              </a>
            </li>
            <li className="has-submenu parent-parent-menu-item">
              <a href="/user/searchForMore">Search for info</a>
            </li>
            <li className="has-submenu parent-parent-menu-item">
              <a href="#">Pages</a>
              <span className="menu-arrow" />
              <ul className="submenu">
                <li>
                  <a href="corporate-team.html" className="sub-menu-item">
                    {" "}
                    Team
                  </a>
                </li>
                <li>
                  <a href="corporate-pricing.html" className="sub-menu-item">
                    Pricing
                  </a>
                </li>
                <li className="has-submenu parent-menu-item">
                  <a href="#"> Blog </a>
                  <span className="submenu-arrow" />
                  <ul className="submenu">
                    <li>
                      <a href="corporate-blog.html" className="sub-menu-item">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="corporate-blog-detail.html"
                        className="sub-menu-item"
                      >
                        Blog Detail
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
