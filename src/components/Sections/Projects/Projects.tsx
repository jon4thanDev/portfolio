"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Projects.module.scss";
import Image from "next/image";
import Link from "next/link";
import {
  Group,
  ShieldCheck,
  Sparkles,
  Image as ImageIcon,
  Send,
  Proportions,
  ExternalLink,
  MessageSquare,
  Smartphone,
  Bot,
  CreditCard,
  Users,
  Server,
  BarChart3,
  Settings,
  Zap,
} from "lucide-react";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

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

    const refs = [titleRef, subtitleRef, selectorRef, layoutRef, cardRef, techStackRef, featuresRef];
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

  // Trigger animations for project details when project changes and selector is already visible
  useEffect(() => {
    if (animatedElements.has('selector')) {
      // If the selector is already visible, trigger animations for project details
      const projectDetailIds = ['layout', 'card', 'techStack', 'features'];
      setAnimatedElements(prev => {
        const newSet = new Set(prev);
        projectDetailIds.forEach(id => newSet.add(id));
        return newSet;
      });
    }
  }, [activeProject]);

  const projects = [
    {
      id: 1,
      title: "Bills Payment by Core1Corp",
      description:
        "A bills payment system with biller management, device control, and third-party API integrations for seamless payment processing.",
      status: "In Progress",
      type: "Full-time",
      role: "Junior Developer",
      duration: "May 2024 - Present",
      icon: "💳",
      image: "/projects/bills-payment.jpg",
      technologies: [
        "Python",
        "FastAPI",
        "Next.js",
        "JWT",
        "Redis",
        "Docker",
        "Figma",
        "SCSS",
        "JavaScript",
        "React",
        "AWS",
      ],
      features: [
        {
          title: "Biller Management UI",
          description:
            "Created user interface for managing and creating biller accounts with intuitive payment workflows.",
          icon: <CreditCard size={30} />,
        },
        {
          title: "Device Management",
          description:
            "Developed comprehensive device management system for monitoring and controlling payment terminals.",
          icon: <Settings size={30} />,
        },
        {
          title: "Third-party API Integration",
          description:
            "Integrated multiple third-party APIs for payment processing, biller verification, and transaction handling.",
          icon: <Zap size={30} />,
        },
        {
          title: "Performance Optimization",
          description:
            "Optimized system performance through caching strategies, database queries, and frontend optimizations.",
          icon: <Sparkles size={30} />,
        },
        {
          title: "Analytics Dashboard",
          description:
            "Built comprehensive dashboard with charts and analytics for monitoring payment transactions and system performance.",
          icon: <BarChart3 size={30} />,
        },
        {
          title: "User Authentication",
          description:
            "Implemented secure user authentication system with JWT tokens and role-based access control.",
          icon: <ShieldCheck size={30} />,
        },
      ],
    },
    {
      id: 2,
      title: "PESONet by Core1Corp",
      description:
        "A banks financial transaction system for outward and inward processing with real-time communication capabilities and secure authentication.",
      status: "In Progress",
      type: "Full-time",
      role: "Junior Developer",
      duration: "August 2024 - Present",
      icon: "🏦",
      image: "/projects/pesonet.png",
      technologies: [
        "Python",
        "FastAPI",
        "Next.js",
        "JWT",
        "Redis",
        "Docker",
        "Figma",
        "SCSS",
        "JavaScript",
        "React",
        "AWS",
      ],
      features: [
        {
          title: "Transaction UI",
          description:
            "Created user interfaces for both outward and inward transaction processing with intuitive workflows.",
          icon: <CreditCard size={30} />,
        },
        {
          title: "User Authentication",
          description:
            "Implemented secure user authentication system with JWT tokens and role-based access control.",
          icon: <ShieldCheck size={30} />,
        },
        {
          title: "Device Authentication",
          description:
            "Developed device authentication system to ensure secure access and prevent unauthorized usage.",
          icon: <Smartphone size={30} />,
        },
        {
          title: "Role-Based Access Control",
          description:
            "Implemented RBAC system to manage user permissions and access levels across different modules.",
          icon: <Users size={30} />,
        },
        {
          title: "Automation Processing",
          description:
            "Built automation systems for inward transaction processing to improve efficiency and reduce manual work.",
          icon: <Bot size={30} />,
        },
        {
          title: "Real-time Communication",
          description:
            "Developed real-time messaging system for client and support team communication with instant notifications.",
          icon: <MessageSquare size={30} />,
        },
        {
          title: "Environment Management",
          description:
            "Set up and maintained production, staging, and development environments for secure deployment and testing.",
          icon: <Server size={30} />,
        },
      ],
    },
    {
      id: 3,
      title: "ICS Next Build Corp",
      description:
        "A construction company website with dynamic content management, project portfolio, and admin dashboard for business operations.",
      status: "Completed",
      type: "Freelance",
      role: "Full Stack Developer",
      duration: "April 2025 - June 2025",
      icon: "🏗️",
      image: "/projects/icsnextbuildcorp.jpg",
      technologies: [
        "React",
        "Next.js",
        "Node.js",
        "JWT",
        "SCSS",
        "Upstash Redis",
        "Google API",
        "Godaddy (Email)",
      ],
      features: [
        {
          title: "User Authentication",
          description:
            "Secure admin login system with JWT tokens and role-based access control.",
          icon: <ShieldCheck size={30} />,
        },
        {
          title: "Dynamic Content",
          description:
            "Dynamic project showcases, and company updates with real-time updates.",
          icon: <Sparkles size={30} />,
        },
        {
          title: "Content Management",
          description:
            "Admin panel for managing projects, services, team members, and company information.",
          icon: <Group size={30} />,
        },
        {
          title: "Project Portfolio",
          description:
            "Interactive project gallery with filtering by category and detailed project pages.",
          icon: <ImageIcon size={30} />,
        },
        {
          title: "Contact System",
          description:
            "Contact forms with email notifications and inquiry management system.",
          icon: <Send size={30} />,
        },
        {
          title: "Responsive Design",
          description:
            "Mobile-first responsive design optimized for all devices and screen sizes.",
          icon: <Proportions size={30} />,
        },
      ],

      additionalWork:
        "Implemented additional features including SEO optimization, image optimization, contact form automation, and comprehensive admin analytics dashboard for content performance tracking.",
      link: "https://icsnextbuildcorp.com",
    },
    {
      id: 4,
      title: "St. Gabrielle HRS",
      description:
        "A human resources solutions website featuring job listings, inquiry forms, and partner showcase for recruitment services.",
      status: "Completed",
      type: "Freelance",
      role: "Frontend Developer",
      duration: "October 2023 - February 2024",
      image: "/projects/stgabriellehrs.jpg",
      icon: "👥",
      technologies: ["Next.js", "React", "SCSS", "HTML", "JavaScript", "Figma"],
      features: [
        {
          title: "Wireframe Design",
          description:
            "Created wireframes and design mockups using Figma for the entire website structure and user flow.",
          icon: <ImageIcon size={30} />,
        },
        {
          title: "Responsive Design",
          description:
            "Mobile-first responsive design ensuring optimal user experience across all devices and screen sizes.",
          icon: <Proportions size={30} />,
        },
        {
          title: "Job Selection System",
          description:
            "Interactive job listings with filtering, search functionality, and detailed job descriptions for career opportunities.",
          icon: <Group size={30} />,
        },
        {
          title: "Google Sheets Integration",
          description:
            "Contact forms and inquiry submissions automatically saved to Google Sheets for efficient lead management.",
          icon: <Send size={30} />,
        },
        {
          title: "Partner Showcase",
          description:
            "Dynamic partner logos and company showcase section highlighting business relationships and credibility.",
          icon: <ShieldCheck size={30} />,
        },
        {
          title: "Modern UI/UX",
          description:
            "Contemporary design with smooth animations and intuitive navigation for optimal user engagement.",
          icon: <Sparkles size={30} />,
        },
      ],

      link: "https://stgabriellehrs.com/",
    },
  ];

  const currentProject = projects[activeProject];

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 
            ref={titleRef}
            data-animate-id="title"
            className={`${styles.title} ${animatedElements.has('title') ? styles.animate : ''}`}
          >
            My Projects
          </h2>
          <p 
            ref={subtitleRef}
            data-animate-id="subtitle"
            className={`${styles.subtitle} ${animatedElements.has('subtitle') ? styles.animate : ''}`}
          >
            Here are some of the projects I&apos;ve worked on recently
          </p>
        </div>

        <div 
          ref={selectorRef}
          data-animate-id="selector"
          className={`${styles.projectSelector} ${animatedElements.has('selector') ? styles.animate : ''}`}
        >
          {projects.map((project, index) => (
            <button
              key={project.id}
              className={`${styles.projectTab} ${
                activeProject === index ? styles.active : ""
              } ${animatedElements.has('selector') ? styles.animate : ''}`}
              onClick={() => setActiveProject(index)}
            >
              {project.title}
            </button>
          ))}
        </div>

        <div 
          ref={layoutRef}
          data-animate-id="layout"
          className={`${styles.projectLayout} ${animatedElements.has('layout') ? styles.animate : ''}`} 
          key={activeProject}
        >
          {/* Left Column - Project Overview */}
          <div className={styles.leftColumn}>
            <div 
              ref={cardRef}
              data-animate-id="card"
              className={`${styles.projectCard} ${animatedElements.has('card') ? styles.animate : ''}`}
            >
              {currentProject.image ? (
                <div className={styles.projectImage}>
                  <Image
                    src={currentProject.image}
                    alt={currentProject.title}
                    width={500}
                    height={500}
                  />
                </div>
              ) : (
                <div className={styles.projectIcon}>
                  <span>{currentProject.icon}</span>
                </div>
              )}
              <h3 className={styles.projectTitle}>{currentProject.title}</h3>
              <p className={styles.projectDescription}>
                {currentProject.description}
              </p>
              <div className={styles.projectStatus}>
                <span className={`${styles.statusTag} ${styles.statusActive}`}>
                  {currentProject.status}
                </span>
                <span className={`${styles.statusTag} ${styles.statusType}`}>
                  {currentProject.type}
                </span>
              </div>
              <div className={styles.projectDetails}>
                <div className={styles.projectRole}>
                  <span className={styles.roleLabel}>Role:</span>
                  <span className={styles.roleValue}>
                    {currentProject.role}
                  </span>
                </div>
                <div className={styles.projectDuration}>
                  <span className={styles.durationLabel}>Duration:</span>
                  <span className={styles.durationValue}>
                    {currentProject.duration}
                  </span>
                </div>
              </div>
              {currentProject.link && (
                <Link
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <ExternalLink />
                </Link>
              )}
            </div>

            <div 
              ref={techStackRef}
              data-animate-id="techStack"
              className={`${styles.techStack} ${animatedElements.has('techStack') ? styles.animate : ''}`}
            >
              <h4 className={styles.techTitle}>Tech Stack</h4>
              <div className={styles.techTags}>
                {currentProject.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className={`${styles.techTag} ${animatedElements.has('techStack') ? styles.animate : ''}`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Features/Process */}
          <div className={styles.rightColumn}>
            <div 
              ref={featuresRef}
              data-animate-id="features"
              className={styles.featuresGrid}
            >
              {currentProject.features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`${styles.featureCard} ${animatedElements.has('features') ? styles.animate : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div>
                    <h5 className={styles.featureTitle}>{feature.title}</h5>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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

export default Projects;
