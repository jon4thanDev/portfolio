"use client";

import { useState } from "react";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.replace("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoText}>
            <Image src={"/logo.png"} alt="Logo" width={100} height={100} />
          </span>
        </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
          <ul className={styles.navList}>
            <li>
              <a onClick={scrollToTop} className={styles.navLink}>
                Home
              </a>
            </li>
            <li>
              <a href="#projects" className={styles.navLink}>
                Projects
              </a>
            </li>
            <li>
              <a href="#skills" className={styles.navLink}>
                Skills
              </a>
            </li>
            <li>
              <a href="#contact" className={styles.navLink}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <button
            className={`${styles.menuButton} ${
              isMenuOpen ? styles.menuButtonOpen : ""
            }`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
