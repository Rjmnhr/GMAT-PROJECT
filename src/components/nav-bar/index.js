import React from "react";

const NavBar = () => {
  return (
    <header id="header" class="fixed-top">
      <div class="container d-flex align-items-center">
        <h1 class="logo me-auto">
          <a href="/">
            Adeft<span>.</span>
          </a>
        </h1>

        <a href="/" class="logo me-auto">
          <img src="assets/img/logo.png" alt="" />
        </a>

        <nav class="nav-menu d-none d-lg-block">
          <ul>
            <li class="active">
              <a href="#header">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>

            <li>
              <a href="#team">Team</a>
            </li>
            <li>
              <a href="#faq">Frequently Asked Questions</a>
            </li>

            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="https://adeftconsulting.com.au/mba/login">
                Login or Register
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
