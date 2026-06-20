"use client";

import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/recipes", label: "Recipes" },
    { href: "/quotes", label: "Quotes" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 transition-all">
      <div className="container">
        <Link href="/" className="navbar-brand fw-extrabold fs-4 d-flex align-items-center gap-2" style={{ letterSpacing: "-0.5px" }}>
          Trying
        </Link>
        
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li className="nav-item" key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link px-3 rounded-pill transition-all ${
                      isActive ? "active bg-secondary fw-semibold text-white" : "text-white-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Authentication State Section */}
          <div className="d-flex align-items-center gap-3">
            {status === "loading" ? (
              <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="visually-hidden">Loading session...</span>
              </div>
            ) : session ? (
              <>
                <span className="text-white-50 small d-none d-md-inline">
                  Welcome, <strong className="text-white">{session.user?.name || session.user?.email}</strong>
                </span>
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline-danger btn-sm rounded-pill px-4 py-2 fw-semibold transition-all hover-lift"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={handleSignIn}
                className="btn btn-primary btn-sm rounded-pill px-4 py-2 fw-semibold transition-all hover-lift"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
