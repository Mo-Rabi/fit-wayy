import React from "react";
import styles from "./Navbar.module.css";
import LightLogo from "../assets/images/logo-light.png";
import DarkLogo from "../assets/images/logo-dark.png";
import { ShoppingCart, Settings, Link } from "react-feather";
import "../assets/sass/_topbar.scss";

export default function Navbar() {
  return (
    <header id="topnav" className="defaultscroll sticky">
      <div className="container">
        <div>
          <a className="logo" href="index.html">
            <span className="logo-light-mode">
              <img src={DarkLogo} className="l-dark" height={24} />
              <img src={LightLogo} className="l-light" height={24} />
            </span>
            <img src={LightLogo} height={24} className="logo-dark-mode" />
          </a>
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
                  <Settings />
                </span>
              </div>
              <div className="login-btn-light">
                <span className="btn btn-icon btn-pills btn-light">
                  <Settings />
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
              <a href="index-corporate.html" className="sub-menu-item">
                Home
              </a>
            </li>
            <li>
              <a href="corporate-about.html" className="sub-menu-item">
                {" "}
                About Us
              </a>
            </li>
            <li>
              <a href="corporate-services.html" className="sub-menu-item">
                Services
              </a>
            </li>
            <li className="has-submenu parent-parent-menu-item">
              <a href="#">Know more</a>
              <span className="menu-arrow" />
              <ul className="submenu">
                <li>
                  <a href={'/user/calories'} className="sub-menu-item">
                    {" "}
                    Calories
                  </a>
                </li>
                <li>
                  <a href="/user/exercises" className="sub-menu-item">
                    Exercises
                  </a>
                </li>
                <li>
                  <a href="/user/recipes" className="sub-menu-item">
                    Recipes
                  </a>
                </li>
              </ul>
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
