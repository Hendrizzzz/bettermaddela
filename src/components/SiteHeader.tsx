"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceLinks = [
  ["/services/certificates", "dropdown-certificates"],
  ["/services/business", "dropdown-business"],
  ["/services/tax-payments", "dropdown-tax-payments"],
  ["/services/social-services", "dropdown-social-services"],
  ["/services/health", "dropdown-health"],
  ["/services/agriculture", "dropdown-agriculture"],
  ["/services/infrastructure", "dropdown-infrastructure"],
  ["/services/education", "dropdown-education"],
  ["/services/public-safety", "dropdown-public-safety"],
  ["/services/environment", "dropdown-environment"],
] as const;

const legislativeLinks = [
  ["/legislative/ordinance-framework", "dropdown-ordinance-framework"],
  ["/legislative/resolution-framework", "dropdown-resolution-framework"],
] as const;

function isMobileNavigation() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches;
}

export function SiteHeader() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const scrollPositionRef = useRef(0);

  const unlockBodyScroll = useCallback(() => {
    if (!document.body.classList.contains("mobile-menu-open")) return;
    document.body.classList.remove("mobile-menu-open");
    document.body.style.top = "";
    window.scrollTo(0, scrollPositionRef.current);
  }, []);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    unlockBodyScroll();
  }, [unlockBodyScroll]);

  const openMenu = useCallback(() => {
    scrollPositionRef.current = window.scrollY;
    document.body.classList.add("mobile-menu-open");
    document.body.style.top = `-${scrollPositionRef.current}px`;
    setMobileMenuOpen(true);
  }, []);

  const toggleDropdown = useCallback((index: number, event: MouseEvent<HTMLAnchorElement>) => {
    if (!isMobileNavigation()) return;
    if (openDropdown === index) return;
    event.preventDefault();
    setOpenDropdown(index);
  }, [openDropdown]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape" || !mobileMenuOpen) return;
      closeMenu();
      toggleRef.current?.focus();
    }

    function handleOutsideClick(event: globalThis.MouseEvent) {
      const target = event.target as Node;
      if (
        mobileMenuOpen && navRef.current && !navRef.current.contains(target) &&
        toggleRef.current && !toggleRef.current.contains(target)
      ) closeMenu();
    }

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [closeMenu, mobileMenuOpen]);

  useEffect(() => {
    function handleResize() {
      if (!isMobileNavigation()) closeMenu();
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("mobile-menu-open");
      document.body.style.top = "";
    };
  }, [closeMenu]);

  const renderLanguageControls = (mobile = false) => (
    <div className={mobile ? "mobile-lang-actions" : "lang-selector"}>
      <button type="button" className={`btn btn-secondary btn-sm lang-btn ${language === "en" ? "active" : ""}`} onClick={() => setLanguage("en")} aria-pressed={language === "en"} aria-label={t("lang-to-en")}>EN</button>
      <button type="button" className={`btn btn-secondary btn-sm lang-btn ${language === "fil" ? "active" : ""}`} onClick={() => setLanguage("fil")} aria-pressed={language === "fil"} aria-label={t("lang-to-fil")}>FIL</button>
    </div>
  );

  return (
    <header className="site-header" lang={language === "fil" ? "fil" : "en"}>
      <div className="container header-inner">
        <div className="logo-container">
          <Link href="/" aria-label="BetterMaddela home">
            <img
              src="/assets/images/logo/better-maddela-logo.svg"
              alt="BetterMaddela logo"
              className="logo-img"
            />
          </Link>
        </div>

        <button ref={toggleRef} type="button" className="mobile-menu-toggle" aria-controls="primary-navigation" aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? t("a11y-close-nav") : t("a11y-open-nav")} onClick={() => (mobileMenuOpen ? closeMenu() : openMenu())}>
          <i className={`bi ${mobileMenuOpen ? "bi-x-lg" : "bi-list"}`} aria-hidden="true" />
        </button>

        <nav ref={navRef} id="primary-navigation" className={`main-nav ${mobileMenuOpen ? "active" : ""}`} aria-label={t("a11y-main-nav")}>
          {renderLanguageControls(true)}
          <ul>
            <li><Link href="/" className={pathname === "/" ? "active" : ""}>{t("nav-home")}</Link></li>
            <li className={`has-dropdown ${openDropdown === 0 ? "dropdown-open" : ""}`}>
              <Link href="/services" className={pathname.startsWith("/services") ? "active" : ""} aria-haspopup="true" aria-expanded={openDropdown === 0} onClick={(event) => toggleDropdown(0, event)}>{t("nav-services")}</Link>
              <ul className="dropdown-menu">
                {serviceLinks.map(([href, key]) => <li key={href}><Link href={href}>{t(key)}</Link></li>)}
              </ul>
            </li>
            <li><Link href="/government" className={pathname.startsWith("/government") ? "active" : ""}>{t("nav-government")}</Link></li>
            <li><Link href="/statistics" className={pathname.startsWith("/statistics") ? "active" : ""}>{t("nav-statistics")}</Link></li>
            <li className={`has-dropdown ${openDropdown === 1 ? "dropdown-open" : ""}`}>
              <Link href="/legislative" className={pathname.startsWith("/legislative") ? "active" : ""} aria-haspopup="true" aria-expanded={openDropdown === 1} onClick={(event) => toggleDropdown(1, event)}>{t("nav-legislative")}</Link>
              <ul className="dropdown-menu">
                {legislativeLinks.map(([href, key]) => <li key={href}><Link href={href}>{t(key)}</Link></li>)}
              </ul>
            </li>
            <li><Link href="/budget" className={pathname.startsWith("/budget") ? "active" : ""}>{t("nav-transparency")}</Link></li>
            <li><Link href="/contact" className={pathname.startsWith("/contact") ? "active" : ""}>{t("nav-contact")}</Link></li>
          </ul>
        </nav>

        <div className="header-actions">{renderLanguageControls()}</div>
      </div>
    </header>
  );
}
