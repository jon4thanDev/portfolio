"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Hero.module.scss";
import { FileText } from "lucide-react";

const Hero = () => {
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const experienceRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute('data-animate-id');
            if (elementId) {
              setAnimatedElements(prev => new Set(prev).add(elementId));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const refs = [headingRef, experienceRef, actionsRef];
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

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
          <h1 
            ref={headingRef}
            data-animate-id="heading"
            className={`${styles.mainHeading} ${animatedElements.has('heading') ? styles.animate : ''}`}
          >
            <div className={styles.greetingLine}>
              Hello! 👋 I&apos;m Jonathan, and i&apos;m a
            </div>
            <div className={styles.roleHighlight}>Full Stack Developer</div>
          </h1>

          {/* Experience Description */}
          <p 
            ref={experienceRef}
            data-animate-id="experience"
            className={`${styles.experience} ${animatedElements.has('experience') ? styles.animate : ''}`}
          >
            With <span className={styles.highlight}>2 years</span> of experience
            crafting exceptional web experiences. I build{" "}
            <span className={styles.highlight}>modern</span>,{" "}
            <span className={styles.highlight}>secured</span>, and{" "}
            <span className={styles.highlight}>scalable</span> digital
            solutions. My passion lies in creating intuitive user interfaces and
            robust backend systems that deliver seamless experiences.
          </p>

          {/* Action Button */}
          <div 
            ref={actionsRef}
            data-animate-id="actions"
            className={`${styles.actions} ${animatedElements.has('actions') ? styles.animate : ''}`}
          >
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
