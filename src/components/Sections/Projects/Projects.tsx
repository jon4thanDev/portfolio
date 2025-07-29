"use client";
import React, { useState } from "react";
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
} from "lucide-react";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: "ICS Next Build Corp",
      description:
        "A comprehensive website for a construction company with dynamic content and management system.",
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
      id: 2,
      title: "St. Gabrielle HRS",
      description:
        "A comprehensive human resources solutions website with job listings, inquiry forms, and partner showcase for a recruitment firm.",
      status: "Completed",
      type: "Freelance",
      role: "Frontend Developer",
      duration: "October 2023 - February 2024",
      image: "/projects/stgabriellehrs.jpg",
      icon: "👥",
      technologies: ["Next.js", "React", "SCSS", "HTML", "JavaScript"],
      features: [
        {
          title: "Wireframe Design",
          description:
            "Created comprehensive wireframes and design mockups using Figma for the entire website structure and user flow.",
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
          <h2 className={styles.title}>My Projects</h2>
          <p className={styles.subtitle}>
            Here are some of the projects I&apos;ve worked on recently
          </p>
        </div>

        <div className={styles.projectSelector}>
          {projects.map((project, index) => (
            <button
              key={project.id}
              className={`${styles.projectTab} ${
                activeProject === index ? styles.active : ""
              }`}
              onClick={() => setActiveProject(index)}
            >
              {project.title}
            </button>
          ))}
        </div>

        <div className={styles.projectLayout} key={activeProject}>
          {/* Left Column - Project Overview */}
          <div className={styles.leftColumn}>
            <div className={styles.projectCard}>
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

            <div className={styles.techStack}>
              <h4 className={styles.techTitle}>Tech Stack</h4>
              <div className={styles.techTags}>
                {currentProject.technologies.map((tech, index) => (
                  <span key={index} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Features/Process */}
          <div className={styles.rightColumn}>
            <div className={styles.featuresGrid}>
              {currentProject.features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
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
