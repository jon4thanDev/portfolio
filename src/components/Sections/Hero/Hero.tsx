"use client";
import React from "react";
import styles from "./Hero.module.scss";
import { FileText } from "lucide-react";

const Hero = () => {
  const handleResumeClick = () => {
    // Add your resume link here
    window.open("/resume/Jonathan Resume.pdf", "_blank");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Greeting Bubble */}

          {/* Main Heading */}
          <h1 className={styles.mainHeading}>
            <div className={styles.greetingLine}>
              Hello! 👋 I&apos;m Jonathan, and i&apos;m a
            </div>
            <div className={styles.roleHighlight}>Full Stack Developer</div>
          </h1>

          {/* Experience Description */}
          <p className={styles.experience}>
            With <span className={styles.highlight}>2 years</span> of experience
            crafting exceptional web experiences. I build{" "}
            <span className={styles.highlight}>modern</span>,{" "}
            <span className={styles.highlight}>secured</span>, and{" "}
            <span className={styles.highlight}>scalable</span> digital
            solutions. My passion lies in creating intuitive user interfaces and
            robust backend systems that deliver seamless experiences.
          </p>

          {/* Action Button */}
          <div className={styles.actions}>
            <button className={styles.resumeBtn} onClick={handleResumeClick}>
              <span className={styles.btnIcon}>
                <FileText />
              </span>
              Resume
            </button>
          </div>
        </div>

        <div className={styles.visualElements}>
          <div className={styles.floatingElement}></div>
          <div className={styles.floatingElement}></div>
          <div className={styles.floatingElement}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
