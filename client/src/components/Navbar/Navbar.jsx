import React from "react";
import styles from "./Navbar.module.css";


export default function Navbar() {
  return (
    <>
      {/* Navbar Start */}
      <header id="topnav" className="defaultscroll sticky">
        <div className="container">
          {/* Logo container*/}
          <a className="logo" href="index.html">
            <span className="logo-light-mode">
              <img
                src="../assets/images/logo-dark.png"
                className="l-dark"
                height={24}
                alt
              />
              <img
                src="../assets/images/logo-light.png"
                className="l-light"
                height={24}
                alt
              />
            </span>
            <img
              src="../assets/images/logo-light.png"
              height={24}
              className="logo-dark-mode"
              alt
            />
          </a>
          {/* End Logo container*/}
          <div className="menu-extras">
            <div className="menu-item">
              {/* Mobile menu toggle*/}
              <a className="navbar-toggle" id="isToggle" onclick="toggleMenu()">
                <div className="lines">
                  <span />
                  <span />
                  <span />
                </div>
              </a>
              {/* End mobile menu toggle*/}
            </div>
          </div>
          {/*Login button Start*/}
          <ul className="buy-button list-inline mb-0">
            <li className="list-inline-item mb-0">
              <a
                href="javascript:void(0)"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <div className="login-btn-primary">
                  <span className="btn btn-icon btn-pills btn-soft-primary">
                    <i data-feather="settings" className="fea icon-sm" />
                  </span>
                </div>
                <div className="login-btn-light">
                  <span className="btn btn-icon btn-pills btn-light">
                    <i data-feather="settings" className="fea icon-sm" />
                  </span>
                </div>
              </a>
            </li>
            <li className="list-inline-item ps-1 mb-0">
              <a href="https://1.envato.market/landrick" target="_blank">
                <div className="login-btn-primary">
                  <span className="btn btn-icon btn-pills btn-primary">
                    <i data-feather="shopping-cart" className="fea icon-sm" />
                  </span>
                </div>
                <div className="login-btn-light">
                  <span className="btn btn-icon btn-pills btn-light">
                    <i data-feather="shopping-cart" className="fea icon-sm" />
                  </span>
                </div>
              </a>
            </li>
          </ul>
          {/*Login button End*/}
          <div id="navigation">
            {/* Navigation Menu*/}
            <ul className="navigation-menu nav-light">
              <li>
                <a href="index.html" className="sub-menu-item">
                  Home
                </a>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <a href="javascript:void(0)">Landing</a>
                <span className="menu-arrow" />
                <ul className="submenu megamenu">
                  <li>
                    <ul>
                      <li className="megamenu-head">
                        <i className="uil uil-book-open fs-6 align-middle" />{" "}
                        Landing Pages
                      </li>
                      <li>
                        <a href="index-saas.html" className="sub-menu-item">
                          Saas
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-classic-saas.html"
                          className="sub-menu-item"
                        >
                          Classic Saas
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-modern-saas.html"
                          className="sub-menu-item"
                        >
                          Modern Saas{" "}
                          <span className="badge text-bg-success ms-2">
                            Animation
                          </span>
                          <span className="badge text-bg-danger">New</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-agency.html" className="sub-menu-item">
                          Agency
                        </a>
                      </li>
                      <li>
                        <a href="index-apps.html" className="sub-menu-item">
                          Application
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-classic-app.html"
                          className="sub-menu-item"
                        >
                          Classic App
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-modern-app.html"
                          className="sub-menu-item"
                        >
                          Modern App{" "}
                          <span className="badge text-bg-danger ms-2">New</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-studio.html" className="sub-menu-item">
                          Studio
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-marketing.html"
                          className="sub-menu-item"
                        >
                          Marketing
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-enterprise.html"
                          className="sub-menu-item"
                        >
                          Enterprise
                        </a>
                      </li>
                      <li>
                        <a href="index-services.html" className="sub-menu-item">
                          Service
                        </a>
                      </li>
                      <li>
                        <a href="index-payments.html" className="sub-menu-item">
                          Payments
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-it-solution.html"
                          className="sub-menu-item"
                        >
                          IT Solution{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-it-solution-two.html"
                          className="sub-menu-item"
                        >
                          IT Solution Two{" "}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li className="megamenu-head">
                        <i className="uil uil-book-open fs-6 align-middle" />{" "}
                        Landing Pages
                      </li>
                      <li>
                        <a
                          href="index-developer.html"
                          className="sub-menu-item"
                        >
                          Developer
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-seo-agency.html"
                          className="sub-menu-item"
                        >
                          SEO Agency
                        </a>
                      </li>
                      <li>
                        <a href="index-hospital.html" className="sub-menu-item">
                          Hospital
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-coworking.html"
                          className="sub-menu-item"
                        >
                          Coworking
                        </a>
                      </li>
                      <li>
                        <a href="index-business.html" className="sub-menu-item">
                          Business
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-modern-business.html"
                          className="sub-menu-item"
                        >
                          Modern Business
                        </a>
                      </li>
                      <li>
                        <a href="index-finance.html" className="sub-menu-item">
                          Finance{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-logistics.html"
                          className="sub-menu-item"
                        >
                          Delivery &amp; Logistics{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-social-marketing.html"
                          className="sub-menu-item"
                        >
                          Social Media
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-digital-agency.html"
                          className="sub-menu-item"
                        >
                          Digital Agency
                        </a>
                      </li>
                      <li>
                        <a href="index-customer.html" className="sub-menu-item">
                          Customer
                        </a>
                      </li>
                      <li>
                        <a href="index-software.html" className="sub-menu-item">
                          Software
                        </a>
                      </li>
                      <li>
                        <a href="index-yoga.html" className="sub-menu-item">
                          Yoga{" "}
                          <span className="badge text-bg-danger ms-2">New</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-gym.html" className="sub-menu-item">
                          GYM &amp; Fitness{" "}
                          <span className="badge text-bg-danger ms-2">New</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li className="megamenu-head">
                        <i className="uil uil-book-open fs-6 align-middle" />{" "}
                        Landing Pages
                      </li>
                      <li>
                        <a href="index-hotel.html" className="sub-menu-item">
                          Hotel
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-restaurant.html"
                          className="sub-menu-item"
                        >
                          Restaurant{" "}
                          <span className="badge text-bg-danger ms-2">New</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-construction.html"
                          className="sub-menu-item"
                        >
                          Construction
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-videocall.html"
                          className="sub-menu-item"
                        >
                          Video Conference{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-blockchain.html"
                          className="sub-menu-item"
                        >
                          Blockchain{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-crypto-two.html"
                          className="sub-menu-item"
                        >
                          Cryptocurrency Two{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-integration.html"
                          className="sub-menu-item"
                        >
                          Integration
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-task-management.html"
                          className="sub-menu-item"
                        >
                          Task Management{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-email-inbox.html"
                          className="sub-menu-item"
                        >
                          Email Inbox{" "}
                        </a>
                      </li>
                      <li>
                        <a href="index-travel.html" className="sub-menu-item">
                          Travel{" "}
                        </a>
                      </li>
                      <li>
                        <a href="index-course.html" className="sub-menu-item">
                          Course
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-online-learning.html"
                          className="sub-menu-item"
                        >
                          Online Learning
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-insurance.html"
                          className="sub-menu-item"
                        >
                          Insurance
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-furniture.html"
                          className="sub-menu-item"
                        >
                          Furniture{" "}
                          <span className="badge text-bg-danger ms-2">New</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li className="megamenu-head">
                        <i className="uil uil-book-open fs-6 align-middle" />{" "}
                        Landing Pages
                      </li>
                      <li>
                        <a href="index-law-firm.html" className="sub-menu-item">
                          Law Firm{" "}
                          <span className="badge text-bg-danger ms-2">New</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-single-product.html"
                          className="sub-menu-item"
                        >
                          Product
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-car-riding.html"
                          className="sub-menu-item"
                        >
                          Car Ride
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-landing-one.html"
                          className="sub-menu-item"
                        >
                          Landing One{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-landing-two.html"
                          className="sub-menu-item"
                        >
                          Landing Two{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-landing-three.html"
                          className="sub-menu-item"
                        >
                          Landing Three{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-landing-four.html"
                          className="sub-menu-item"
                        >
                          Landing Four
                        </a>
                      </li>
                      <li>
                        <a href="index-charity.html" className="sub-menu-item">
                          Charity{" "}
                          <span className="badge text-bg-danger ms-2">New</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-personal.html" className="sub-menu-item">
                          Personal
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-creative-personal.html"
                          className="sub-menu-item"
                        >
                          Creative Personal{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-freelancer.html"
                          className="sub-menu-item"
                        >
                          Freelance{" "}
                        </a>
                      </li>
                      <li>
                        <a href="index-event.html" className="sub-menu-item">
                          Event
                        </a>
                      </li>
                      <li>
                        <a href="index-ebook.html" className="sub-menu-item">
                          E-Book
                        </a>
                      </li>
                      <li>
                        <a href="index-onepage.html" className="sub-menu-item">
                          Saas{" "}
                          <span className="badge text-bg-warning ms-2">
                            Onepage
                          </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li className="megamenu-head">
                        <i className="uil uil-cube fs-6 align-middle" /> Full
                        Demos
                      </li>
                      <li>
                        <a
                          href="index-corporate.html"
                          className="sub-menu-item"
                        >
                          Corporate
                        </a>
                      </li>
                      <li>
                        <a href="index-crypto.html" className="sub-menu-item">
                          Cryptocurrency{" "}
                          <span className="badge text-bg-dark ms-2">Dark</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-shop.html" className="sub-menu-item">
                          Shop
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-portfolio.html"
                          className="sub-menu-item"
                        >
                          Portfolio{" "}
                          <span className="badge text-bg-info ms-2">
                            Updated
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="helpcenter-overview.html"
                          className="sub-menu-item"
                        >
                          Help Center
                        </a>
                      </li>
                      <li>
                        <a href="index-hosting.html" className="sub-menu-item">
                          Hosting &amp; Domain
                        </a>
                      </li>
                      <li>
                        <a href="index-job.html" className="sub-menu-item">
                          Jobs &amp; Careers
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-video-studio.html"
                          className="sub-menu-item"
                        >
                          Video Studio{" "}
                          <span className="badge text-bg-danger ms-2">New</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-real-estate.html"
                          className="sub-menu-item"
                        >
                          Real Estate
                        </a>
                      </li>
                      <li>
                        <a href="forums.html" className="sub-menu-item">
                          Forums
                        </a>
                      </li>
                      <li>
                        <a href="index-blog.html" className="sub-menu-item">
                          Blog or News
                        </a>
                      </li>
                      <li>
                        <a href="index-nft.html" className="sub-menu-item">
                          NFT Marketplace
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-photography.html"
                          className="sub-menu-item"
                        >
                          Photography{" "}
                          <span className="badge text-bg-dark ms-2">Dark</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <a href="javascript:void(0)">Pages</a>
                <span className="menu-arrow" />
                <ul className="submenu">
                  <li className="has-submenu parent-menu-item">
                    <a href="javascript:void(0)"> Company </a>
                    <span className="submenu-arrow" />
                    <ul className="submenu">
                      <li>
                        <a href="page-aboutus.html" className="sub-menu-item">
                          {" "}
                          About Us
                        </a>
                      </li>
                      <li>
                        <a
                          href="page-aboutus-two.html"
                          className="sub-menu-item"
                        >
                          {" "}
                          About Us Two{" "}
                        </a>
                      </li>
                      <li>
                        <a href="page-services.html" className="sub-menu-item">
                          Services
                        </a>
                      </li>
                      <li>
                        <a href="page-history.html" className="sub-menu-item">
                          History{" "}
                        </a>
                      </li>
                      <li>
                        <a href="page-team.html" className="sub-menu-item">
                          {" "}
                          Team
                        </a>
                      </li>
                      <li>
                        <a href="page-pricing.html" className="sub-menu-item">
                          Pricing
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <a href="javascript:void(0)"> Account </a>
                    <span className="submenu-arrow" />
                    <ul className="submenu">
                      <li>
                        <a
                          href="account-profile.html"
                          className="sub-menu-item"
                        >
                          Profile
                        </a>
                      </li>
                      <li>
                        <a
                          href="account-members.html"
                          className="sub-menu-item"
                        >
                          Members{" "}
                        </a>
                      </li>
                      <li>
                        <a href="account-works.html" className="sub-menu-item">
                          Works{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="account-messages.html"
                          className="sub-menu-item"
                        >
                          Messages{" "}
                        </a>
                      </li>
                      <li>
                        <a href="account-chat.html" className="sub-menu-item">
                          Chat{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="account-payments.html"
                          className="sub-menu-item"
                        >
                          Payments{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="account-setting.html"
                          className="sub-menu-item"
                        >
                          Setting
                        </a>
                      </li>
                      <li>
                        <a href="page-invoice.html" className="sub-menu-item">
                          Invoice
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <a href="javascript:void(0)"> Email Template</a>
                    <span className="submenu-arrow" />
                    <ul className="submenu">
                      <li>
                        <a
                          href="email-confirmation.html"
                          className="sub-menu-item"
                        >
                          Confirmation
                        </a>
                      </li>
                      <li>
                        <a
                          href="email-password-reset.html"
                          className="sub-menu-item"
                        >
                          Reset Password
                        </a>
                      </li>
                      <li>
                        <a href="email-alert.html" className="sub-menu-item">
                          Alert
                        </a>
                      </li>
                      <li>
                        <a href="email-invoice.html" className="sub-menu-item">
                          Invoice
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <a href="javascript:void(0)"> Blog </a>
                    <span className="submenu-arrow" />
                    <ul className="submenu">
                      <li>
                        <a href="blog-grid.html" className="sub-menu-item">
                          Blog Grid
                        </a>
                      </li>
                      <li>
                        <a
                          href="blog-grid-sidebar.html"
                          className="sub-menu-item"
                        >
                          Blog with Sidebar
                        </a>
                      </li>
                      <li>
                        <a href="blog-list.html" className="sub-menu-item">
                          Blog Listing
                        </a>
                      </li>
                      <li>
                        <a
                          href="blog-list-sidebar.html"
                          className="sub-menu-item"
                        >
                          Blog List &amp; Sidebar
                        </a>
                      </li>
                      <li>
                        <a href="blog-detail.html" className="sub-menu-item">
                          Blog Detail
                        </a>
                      </li>
                      <li>
                        <a
                          href="blog-detail-two.html"
                          className="sub-menu-item"
                        >
                          Blog Detail 2{" "}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <a href="javascript:void(0)"> Case Study </a>
                    <span className="submenu-arrow" />
                    <ul className="submenu">
                      <li>
                        <a href="page-cases.html" className="sub-menu-item">
                          All Cases{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="page-case-detail.html"
                          className="sub-menu-item"
                        >
                          Case Detail{" "}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="course-detail.html" className="sub-menu-item">
                      Course Detail{" "}
                    </a>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <a href="javascript:void(0)"> Auth Pages </a>
                    <span className="submenu-arrow" />
                    <ul className="submenu">
                      <li className="has-submenu child-menu-item">
                        <a href="javascript:void(0)"> Login </a>
                        <span className="submenu-arrow" />
                        <ul className="submenu">
                          <li>
                            <a href="auth-login.html" className="sub-menu-item">
                              Login
                            </a>
                          </li>
                          <li>
                            <a
                              href="auth-cover-login.html"
                              className="sub-menu-item"
                            >
                              Login Cover
                            </a>
                          </li>
                          <li>
                            <a
                              href="auth-login-three.html"
                              className="sub-menu-item"
                            >
                              Login Simple
                            </a>
                          </li>
                          <li>
                            <a
                              href="auth-bs-login.html"
                              className="sub-menu-item"
                            >
                              BS5 Login
                            </a>
                          </li>
                          <li>
                            <a
                              href="auth-login-bg-video.html"
                              className="sub-menu-item"
                            >
                              Login Five
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="has-submenu child-menu-item">
                        <a href="javascript:void(0)"> Signup </a>
                        <span className="submenu-arrow" />
                        <ul className="submenu">
                          <li>
                            <a
                              href="auth-signup.html"
                              className="sub-menu-item"
                            >
                              Signup
                            </a>
                          </li>
                          <li>
                            <a
                              href="auth-cover-signup.html"
                              className="sub-menu-item"
                            >
                              Signup Cover
                            </a>
                          </li>
                          <li>
                            <a
                              href="auth-signup-three.html"
                              className="sub-menu-item"
                            >
                              Signup Simple
                            </a>
                          </li>
                          <li>
                            <a
                              href="auth-bs-signup.html"
                              className="sub-menu-item"
                            >
                              BS5 Singup
                            </a>
                          </li>
                          <li>
                            <a
                              href="auth-signup-bg-video.html"
                              className="sub-menu-item"
                            >
                              Singup Five
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="has-submenu child-menu-item">
                        <a href="javascript:void(0)"> Reset password </a>
                        <span className="submenu-arrow" />
                        <ul className="submenu">
                          <li>
                            <a
                              href="auth-re-password.html"
                              className="sub-menu-item"
                            >
                              Reset Password
                            </a>
                          </li>
                          <li>
                            <a
                              href="auth-cover-re-password.html"
                              className="sub-menu-item"
                            >
                              Reset Password Cover
                            </a>
                          </li>
                          <li>
                            <a
                              href="auth-re-password-three.html"
                              className="sub-menu-item"
                            >
                              Reset Password Simple
                            </a>
                          </li>
                          <li>
                            <a
                              href="auth-bs-reset.html"
                              className="sub-menu-item"
                            >
                              BS5 Reset Password
                            </a>
                          </li>
                          <li>
                            <a
                              href="auth-reset-password-bg-video.html"
                              className="sub-menu-item"
                            >
                              Reset Pass Five
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <a href="javascript:void(0)"> Utility </a>
                    <span className="submenu-arrow" />
                    <ul className="submenu">
                      <li>
                        <a href="page-terms.html" className="sub-menu-item">
                          Terms of Services
                        </a>
                      </li>
                      <li>
                        <a href="page-privacy.html" className="sub-menu-item">
                          Privacy Policy
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <a href="javascript:void(0)"> Special</a>
                    <span className="submenu-arrow" />
                    <ul className="submenu">
                      <li>
                        <a
                          href="page-comingsoon.html"
                          className="sub-menu-item"
                        >
                          Coming Soon
                        </a>
                      </li>
                      <li>
                        <a
                          href="page-comingsoon2.html"
                          className="sub-menu-item"
                        >
                          Coming Soon Two
                        </a>
                      </li>
                      <li>
                        <a
                          href="page-maintenance.html"
                          className="sub-menu-item"
                        >
                          Maintenance
                        </a>
                      </li>
                      <li>
                        <a href="page-error.html" className="sub-menu-item">
                          Error
                        </a>
                      </li>
                      <li>
                        <a href="page-thankyou.html" className="sub-menu-item">
                          Thank you
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <a href="javascript:void(0)"> Contact </a>
                    <span className="submenu-arrow" />
                    <ul className="submenu">
                      <li>
                        <a
                          href="page-contact-detail.html"
                          className="sub-menu-item"
                        >
                          Contact Detail
                        </a>
                      </li>
                      <li>
                        <a
                          href="page-contact-one.html"
                          className="sub-menu-item"
                        >
                          Contact One
                        </a>
                      </li>
                      <li>
                        <a
                          href="page-contact-two.html"
                          className="sub-menu-item"
                        >
                          Contact Two
                        </a>
                      </li>
                      <li>
                        <a
                          href="page-contact-three.html"
                          className="sub-menu-item"
                        >
                          Contact Three
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <a href="javascript:void(0)"> Multi Level Menu</a>
                    <span className="submenu-arrow" />
                    <ul className="submenu">
                      <li>
                        <a href="javascript:void(0)" className="sub-menu-item">
                          Level 1.0
                        </a>
                      </li>
                      <li className="has-submenu child-menu-item">
                        <a href="javascript:void(0)"> Level 2.0 </a>
                        <span className="submenu-arrow" />
                        <ul className="submenu">
                          <li>
                            <a
                              href="javascript:void(0)"
                              className="sub-menu-item"
                            >
                              Level 2.1
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0)"
                              className="sub-menu-item"
                            >
                              Level 2.2
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="footer.html" className="sub-menu-item">
                      Footer Layouts{" "}
                    </a>
                  </li>
                </ul>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <a href="javascript:void(0)">Demos</a>
                <span className="menu-arrow" />
                <ul className="submenu megamenu">
                  <li>
                    <ul>
                      <li>
                        <a
                          href="index-corporate.html"
                          className="sub-menu-item"
                        >
                          <div className="text-lg-center">
                            <span className="d-none d-lg-block">
                              <img
                                src="assets/images/demos/corporate.png"
                                className="img-fluid rounded shadow-md"
                                alt
                              />
                            </span>
                            <span className="mt-lg-2 d-block">Corporate</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="index-crypto.html" className="sub-menu-item">
                          <div className="text-lg-center">
                            <span className="d-none d-lg-block">
                              <img
                                src="assets/images/demos/crypto.png"
                                className="img-fluid rounded shadow-md"
                                alt
                              />
                            </span>
                            <span className="mt-lg-2 d-block">
                              Cryptocurrency{" "}
                              <span className="badge text-bg-dark ms-2">
                                Dark
                              </span>
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-real-estate.html"
                          className="sub-menu-item"
                        >
                          <div className="text-lg-center">
                            <span className="d-none d-lg-block">
                              <img
                                src="assets/images/demos/real.png"
                                className="img-fluid rounded shadow-md"
                                alt
                              />
                            </span>
                            <span className="mt-lg-2 d-block">Real Estate</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li>
                        <a href="index-shop.html" className="sub-menu-item">
                          <div className="text-lg-center">
                            <span className="d-none d-lg-block">
                              <img
                                src="assets/images/demos/shop.png"
                                className="img-fluid rounded shadow-md"
                                alt
                              />
                            </span>
                            <span className="mt-lg-2 d-block">Shop</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-portfolio.html"
                          className="sub-menu-item"
                        >
                          <div className="text-lg-center">
                            <span className="d-none d-lg-block">
                              <img
                                src="assets/images/demos/portfolio.png"
                                className="img-fluid rounded shadow-md"
                                alt
                              />
                            </span>
                            <span className="mt-lg-2 d-block">
                              Portfolio{" "}
                              <span className="badge text-bg-info ms-2">
                                Updated
                              </span>
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-photography.html"
                          className="sub-menu-item"
                        >
                          <div className="text-lg-center">
                            <span className="d-none d-lg-block">
                              <img
                                src="assets/images/demos/photography.png"
                                className="img-fluid rounded shadow-md"
                                alt
                              />
                            </span>
                            <span className="mt-lg-2 d-block">
                              Photography{" "}
                              <span className="badge text-bg-dark ms-2">
                                Dark
                              </span>
                            </span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li>
                        <a
                          href="helpcenter-overview.html"
                          className="sub-menu-item"
                        >
                          <div className="text-lg-center">
                            <span className="d-none d-lg-block">
                              <img
                                src="assets/images/demos/help-center.png"
                                className="img-fluid rounded shadow-md"
                                alt
                              />
                            </span>
                            <span className="mt-lg-2 d-block">Help Center</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="index-hosting.html" className="sub-menu-item">
                          <div className="text-lg-center">
                            <span className="d-none d-lg-block">
                              <img
                                src="assets/images/demos/hosting.png"
                                className="img-fluid rounded shadow-md"
                                alt
                              />
                            </span>
                            <span className="mt-lg-2 d-block">
                              Hosting &amp; Domain
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a
                          href="index-video-studio.html"
                          className="sub-menu-item"
                        >
                          <div className="text-lg-center">
                            <span className="d-none d-lg-block">
                              <img
                                src="assets/images/demos/video-studio.png"
                                className="img-fluid rounded shadow-md"
                                alt
                              />
                            </span>
                            <span className="mt-lg-2 d-block">
                              Video Studio{" "}
                              <span className="badge text-bg-danger ms-2">
                                New
                              </span>
                            </span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li>
                        <a href="index-job.html" className="sub-menu-item">
                          <div className="text-lg-center">
                            <span className="d-none d-lg-block">
                              <img
                                src="assets/images/demos/job.png"
                                className="img-fluid rounded shadow-md"
                                alt
                              />
                            </span>
                            <span className="mt-lg-2 d-block">
                              Job &amp; Career
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="forums.html" className="sub-menu-item">
                          <div className="text-lg-center">
                            <span className="d-none d-lg-block">
                              <img
                                src="assets/images/demos/forums.png"
                                className="img-fluid rounded shadow-md"
                                alt
                              />
                            </span>
                            <span className="mt-lg-2 d-block">Forums</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li>
                        <a href="index-blog.html" className="sub-menu-item">
                          <div className="text-lg-center">
                            <span className="d-none d-lg-block">
                              <img
                                src="assets/images/demos/blog.png"
                                className="img-fluid rounded shadow-md"
                                alt
                              />
                            </span>
                            <span className="mt-lg-2 d-block">Blog</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="index-nft.html" className="sub-menu-item">
                          <div className="text-lg-center">
                            <span className="d-none d-lg-block">
                              <img
                                src="assets/images/demos/nft.png"
                                className="img-fluid rounded shadow-md"
                                alt
                              />
                            </span>
                            <span className="mt-lg-2 d-block">
                              NFT Marketplace
                            </span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="has-submenu parent-parent-menu-item">
                <a href="javascript:void(0)">Components</a>
                <span className="menu-arrow" />
                <ul className="submenu megamenu">
                  <li>
                    <ul>
                      <li>
                        <a href="ui-button.html" className="sub-menu-item">
                          <i className="uil uil-cube fs-6 align-middle me-1" />{" "}
                          Buttons
                        </a>
                      </li>
                      <li>
                        <a href="ui-badges.html" className="sub-menu-item">
                          <i className="uil uil-award fs-6 align-middle me-1" />{" "}
                          Badges
                        </a>
                      </li>
                      <li>
                        <a href="ui-alert.html" className="sub-menu-item">
                          <i className="uil uil-info-circle fs-6 align-middle me-1" />{" "}
                          Alert
                        </a>
                      </li>
                      <li>
                        <a href="ui-dropdown.html" className="sub-menu-item">
                          <i className="uil uil-layers fs-6 align-middle me-1" />{" "}
                          Dropdowns
                        </a>
                      </li>
                      <li>
                        <a href="ui-typography.html" className="sub-menu-item">
                          <i className="uil uil-align-center-alt fs-6 align-middle me-1" />{" "}
                          Typography
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li>
                        <a href="ui-background.html" className="sub-menu-item">
                          <i className="uil uil-palette fs-6 align-middle me-1" />{" "}
                          Background
                        </a>
                      </li>
                      <li>
                        <a href="ui-text.html" className="sub-menu-item">
                          <i className="uil uil-text fs-6 align-middle me-1" />{" "}
                          Text Color
                        </a>
                      </li>
                      <li>
                        <a href="ui-accordion.html" className="sub-menu-item">
                          <i className="uil uil-list-ui-alt fs-6 align-middle me-1" />{" "}
                          Accordions
                        </a>
                      </li>
                      <li>
                        <a href="ui-card.html" className="sub-menu-item">
                          <i className="uil uil-postcard fs-6 align-middle me-1" />{" "}
                          Cards
                        </a>
                      </li>
                      <li>
                        <a
                          href="ui-tooltip-popover.html"
                          className="sub-menu-item"
                        >
                          <i className="uil uil-backspace fs-6 align-middle me-1" />{" "}
                          Tooltips &amp; Popovers
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li>
                        <a href="ui-shadow.html" className="sub-menu-item">
                          <i className="uil uil-square-full fs-6 align-middle me-1" />{" "}
                          Shadows
                        </a>
                      </li>
                      <li>
                        <a href="ui-border.html" className="sub-menu-item">
                          <i className="uil uil-border-out fs-6 align-middle me-1" />{" "}
                          Border
                        </a>
                      </li>
                      <li>
                        <a href="ui-carousel.html" className="sub-menu-item">
                          <i className="uil uil-slider-h-range fs-6 align-middle me-1" />{" "}
                          Carousel
                        </a>
                      </li>
                      <li>
                        <a href="ui-form.html" className="sub-menu-item">
                          <i className="uil uil-notes fs-6 align-middle me-1" />{" "}
                          Form Elements
                        </a>
                      </li>
                      <li>
                        <a href="ui-breadcrumb.html" className="sub-menu-item">
                          <i className="uil uil-sort-amount-down fs-6 align-middle me-1" />{" "}
                          Breadcrumb
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li>
                        <a href="ui-pagination.html" className="sub-menu-item">
                          <i className="uil uil-copy fs-6 align-middle me-1" />{" "}
                          Pagination
                        </a>
                      </li>
                      <li>
                        <a href="ui-avatar.html" className="sub-menu-item">
                          <i className="uil uil-image fs-6 align-middle me-1" />{" "}
                          Avatars
                        </a>
                      </li>
                      <li>
                        <a href="ui-nav-tabs.html" className="sub-menu-item">
                          <i className="uil uil-bars fs-6 align-middle me-1" />{" "}
                          Nav Tabs
                        </a>
                      </li>
                      <li>
                        <a href="ui-modals.html" className="sub-menu-item">
                          <i className="uil uil-vector-square fs-6 align-middle me-1" />{" "}
                          Modals
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li>
                        <a href="ui-tables.html" className="sub-menu-item">
                          <i className="uil uil-table fs-6 align-middle me-1" />{" "}
                          Tables
                        </a>
                      </li>
                      <li>
                        <a href="ui-icons.html" className="sub-menu-item">
                          <i className="uil uil-icons fs-6 align-middle me-1" />{" "}
                          Icons
                        </a>
                      </li>
                      <li>
                        <a href="ui-progressbar.html" className="sub-menu-item">
                          <i className="uil uil-brackets-curly fs-6 align-middle me-1" />{" "}
                          Progressbar
                        </a>
                      </li>
                      <li>
                        <a href="ui-lightbox.html" className="sub-menu-item">
                          <i className="uil uil-play-circle fs-6 align-middle me-1" />{" "}
                          Lightbox
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="has-submenu parent-menu-item">
                <a href="javascript:void(0)">Docs</a>
                <span className="menu-arrow" />
                <ul className="submenu">
                  <li>
                    <a href="documentation.html" className="sub-menu-item">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="changelog.html" className="sub-menu-item">
                      Changelog
                    </a>
                  </li>
                  <li>
                    <a href="widget.html" className="sub-menu-item">
                      Widget
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            {/*end navigation menu*/}
          </div>
          {/*end navigation*/}
        </div>
        {/*end container*/}
      </header>
      {/*end header*/}
      {/* Navbar End */}
    </>
  );
}
