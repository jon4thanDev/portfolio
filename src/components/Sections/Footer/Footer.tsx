"use client";
import styles from "./Footer.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.replace("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.logo}>
              <Image src="/logo.png" alt="Logo" width={80} height={80} />
            </h3>
            <p className={styles.description}>
              A passionate developer creating modern web experiences with
              cutting-edge technologies.
            </p>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.links}>
              <li>
                <button onClick={scrollToTop}>Home</button>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Connect</h4>
            <ul className={styles.links}>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/jonathan-jhonielyne-jamer-8bb530245/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:jonathanjamer123@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2025 Jonathan Jamer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
