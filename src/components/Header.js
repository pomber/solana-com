"use client";

import Navbar from "react-bootstrap/Navbar";
import { useRouter } from "@/hooks/useRouter";
import { Link } from "../utils/Link";
import { useEffect, useState } from "react";
import SolanaLogo from "../../public/src/img/logos-solana/logotype.inline.svg";
import Moon from "../../public/src/img/icons/Moon.inline.svg";
import Sun from "../../public/src/img/icons/Sun.inline.svg";
import HeaderList from "./header/HeaderList";
import { InkeepSearchBar } from "@/app/components/inkeep/inkeep-searchbar";
import { useTheme } from "@/themecontext";
import { useTranslations } from "next-intl";
import DevelopersNav from "./developers/DevelopersNav/DevelopersNav";
import styles from "./Header.module.scss";

const Header = ({ className = "", containerClassName = "" }) => {
  const router = useRouter();
  const { theme, toggleTheme, isThemePage } = useTheme();
  const t = useTranslations();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      if (isThemePage) {
        navbar.classList.remove("navbar-light", "navbar-dark");
        navbar.classList.add("navbar-" + theme);
      } else {
        navbar.classList.add("navbar-dark");
      }
    }
  }, [t, theme, isThemePage]);

  useEffect(() => {
    // Close mobile navigation on route change
    setExpanded(false);
  }, [router.asPath]);

  return (
    <>
      <header className={`position-sticky sticky-top ${className}`}>
        <Navbar
          id="navbar"
          expand="lg"
          variant=""
          expanded={expanded}
          onToggle={setExpanded}
        >
          <div className={`container-xl ${containerClassName}`}>
            <Link to="/" className="d-flex" aria-label="Solana">
              <SolanaLogo
                style={{ color: "var(--body-text)" }}
                width={149}
                height={22}
              />
            </Link>

            <div className="d-flex align-items-center">
              <Navbar.Toggle
                aria-controls="navbarCollapse"
                as="button"
                type="button"
              >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </Navbar.Toggle>
              <Navbar.Collapse id="navbarCollapse">
                <HeaderList />
              </Navbar.Collapse>
              <InkeepSearchBar />
              {isThemePage && (
                <button
                  className={styles.header__toggle}
                  onClick={toggleTheme}
                  aria-label={t("commands.toggle")}
                >
                  {theme === "light" && <Moon />}
                  {theme === "dark" && <Sun />}
                </button>
              )}
            </div>
          </div>
        </Navbar>
      </header>
      {/* Secondary nav for /developers/* and /docs/* */}
      {(router.asPath.includes("/developers") ||
        router.asPath.includes("/docs")) && (
        <DevelopersNav containerClassName={containerClassName} />
      )}
    </>
  );
};

export default Header;
