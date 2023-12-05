import React from "react";

const NavBar = () => {
  return (
    <header
      style={{ boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.1)" }}
      id="header"
      className="fixed-top"
    >
      <div class="container d-flex justify-content-between align-items-center">
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
              <a href="/#header">Home</a>
            </li>
            <li>
              <a href="/profiler">Profiler</a>
            </li>
            <li>
              <a href="/dashboard">GMAT</a>
            </li>

            <li>
              <a href="/#about">About</a>
            </li>
            <li>
              <a href="/#services">Services</a>
            </li>

            <li>
              <a href="/videos">Videos</a>
            </li>
            <li>
              <a href="/#contact">Contact</a>
            </li>
            <li>
              <a href="/login-app">Login</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
