"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./Skills.module.scss";
import Image from "next/image";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const techGridRef = useRef<HTMLDivElement>(null);
  const additionalSkillsRef = useRef<HTMLDivElement>(null);

  // Viewport animation observer
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

    const refs = [titleRef, subtitleRef, filtersRef, techGridRef, additionalSkillsRef];
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

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";
      setIsLightTheme(isLight);
    };

    // Check initial theme
    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // Function to get the appropriate icon path based on theme
  const getIconPath = (baseIcon: string) => {
    if (isLightTheme) return baseIcon;

    const lightIcons = [
      "nextjs",
      "expressjs",
      "rest-api",
      "github",
      "aws",
      "vercel",
    ];
    const iconName = baseIcon.split("/").pop()?.replace(".svg", "");

    if (iconName && lightIcons.includes(iconName)) {
      return baseIcon.replace(".svg", "-light.svg");
    }

    return baseIcon;
  };

  const technologies = [
    // Frontend
    { name: "React", icon: "/icons/react.svg", category: "frontend" },
    { name: "TypeScript", icon: "/icons/typescript.svg", category: "frontend" },
    { name: "JavaScript", icon: "/icons/javascript.svg", category: "frontend" },
    { name: "Next.js", icon: "/icons/nextjs.svg", category: "frontend" },
    { name: "HTML5", icon: "/icons/html5.svg", category: "frontend" },
    { name: "CSS3", icon: "/icons/css3.svg", category: "frontend" },
    { name: "SCSS", icon: "/icons/scss.svg", category: "frontend" },
    { name: "Tailwind", icon: "/icons/tailwind.svg", category: "frontend" },
    { name: "Bootstrap", icon: "/icons/bootstrap.svg", category: "frontend" },
    {
      name: "React Bootstrap",
      icon: "/icons/react-bootstrap.svg",
      category: "frontend",
    },

    // Backend
    { name: "Node.js", icon: "/icons/nodejs.svg", category: "backend" },
    { name: "Express.js", icon: "/icons/expressjs.svg", category: "backend" },
    { name: "Python", icon: "/icons/python.svg", category: "backend" },
    { name: "FastAPI", icon: "/icons/fastapi.svg", category: "backend" },
    { name: "WebSockets", icon: "/icons/websocket.svg", category: "backend" },
    { name: "Redis", icon: "/icons/redis.svg", category: "backend" },
    { name: "REST API", icon: "/icons/rest-api.svg", category: "backend" },

    // Tools & Others
    { name: "Git", icon: "/icons/git.svg", category: "tools" },
    { name: "GitHub", icon: "/icons/github.svg", category: "tools" },
    {
      name: "Github Actions",
      icon: "/icons/github-actions.svg",
      category: "tools",
    },
    { name: "Docker", icon: "/icons/docker.svg", category: "tools" },
    { name: "AWS", icon: "/icons/aws.svg", category: "tools" },
    { name: "Figma", icon: "/icons/figma.svg", category: "tools" },
    { name: "Vercel", icon: "/icons/vercel.svg", category: "tools" },
  ];

  const filteredTechnologies =
    activeCategory === "all"
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  const categories = [
    { id: "all", name: "All" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "tools", name: "Tools" },
  ];

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 
            ref={titleRef}
            data-animate-id="title"
            className={`${styles.title} ${animatedElements.has('title') ? styles.animate : ''}`}
          >
            Skills & Technologies
          </h2>
          <p 
            ref={subtitleRef}
            data-animate-id="subtitle"
            className={`${styles.subtitle} ${animatedElements.has('subtitle') ? styles.animate : ''}`}
          >
            Technologies and tools I work with daily
          </p>
        </div>

        <div 
          ref={filtersRef}
          data-animate-id="filters"
          className={`${styles.categoryFilters} ${animatedElements.has('filters') ? styles.animate : ''}`}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                activeCategory === category.id ? styles.active : ""
              } ${animatedElements.has('filters') ? styles.animate : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div 
          ref={techGridRef}
          data-animate-id="techGrid"
          className={`${styles.techGrid} ${animatedElements.has('techGrid') ? styles.animate : ''}`}
        >
          {filteredTechnologies.map((tech, index) => (
            <div 
              key={index} 
              className={`${styles.techItem} ${animatedElements.has('techGrid') ? styles.animate : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {tech.icon.startsWith("/") ? (
                <div className={styles.techIcon}>
                  <Image
                    src={getIconPath(tech.icon)}
                    alt={tech.name}
                    width={40}
                    height={40}
                  />
                </div>
              ) : (
                <span className={styles.techEmoji}>{tech.icon}</span>
              )}
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
        </div>

        <div 
          ref={additionalSkillsRef}
          data-animate-id="additionalSkills"
          className={`${styles.additionalSkills} ${animatedElements.has('additionalSkills') ? styles.animate : ''}`}
        >
          <h3 className={styles.additionalTitle}>Additional Skills</h3>
          <div className={styles.skillsGrid}>
            <div 
              className={`${styles.skillTag} ${animatedElements.has('additionalSkills') ? styles.animate : ''}`}
              style={{ animationDelay: '0.1s' }}
            >
              Responsive Design
            </div>
            <div 
              className={`${styles.skillTag} ${animatedElements.has('additionalSkills') ? styles.animate : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              Performance Optimization
            </div>
            <div 
              className={`${styles.skillTag} ${animatedElements.has('additionalSkills') ? styles.animate : ''}`}
              style={{ animationDelay: '0.3s' }}
            >
              Agile Development
            </div>
            <div 
              className={`${styles.skillTag} ${animatedElements.has('additionalSkills') ? styles.animate : ''}`}
              style={{ animationDelay: '0.4s' }}
            >
              CI/CD
            </div>
            <div 
              className={`${styles.skillTag} ${animatedElements.has('additionalSkills') ? styles.animate : ''}`}
              style={{ animationDelay: '0.5s' }}
            >
              Testing
            </div>
            <div 
              className={`${styles.skillTag} ${animatedElements.has('additionalSkills') ? styles.animate : ''}`}
              style={{ animationDelay: '0.6s' }}
            >
              Code Review
            </div>
            <div 
              className={`${styles.skillTag} ${animatedElements.has('additionalSkills') ? styles.animate : ''}`}
              style={{ animationDelay: '0.7s' }}
            >
              Documentation
            </div>
            <div 
              className={`${styles.skillTag} ${animatedElements.has('additionalSkills') ? styles.animate : ''}`}
              style={{ animationDelay: '0.8s' }}
            >
              Team Collaboration
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
