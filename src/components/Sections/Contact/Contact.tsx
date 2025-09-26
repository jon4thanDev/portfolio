"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Contact.module.scss";
import { AtSign, MapPin, Phone, Send } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import Toast from "../../Toast/Toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error" | "loading";
    message: string;
    isVisible: boolean;
  }>({ type: "success", message: "", isVisible: false });
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);

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

    const refs = [titleRef, subtitleRef, contentRef, contactInfoRef, contactFormRef];
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showToast = (
    type: "success" | "error" | "loading",
    message: string
  ) => {
    setToast({ type, message, isVisible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  const sendEmail = async () => {
    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast(
          "success",
          data.message ||
            "Message sent successfully! I'll get back to you soon."
        );
        // Clear form on success
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        showToast(
          "error",
          data.error || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Contact form error:", error);
      showToast(
        "error",
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const debSendEmail = useDebouncedCallback(sendEmail, 200);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    showToast("loading", "Sending your message...");
    debSendEmail();
  };

  return (
    <>
      <section id="contact" className={styles.contact}>
        <div className={styles.container}>
          <h2 
            ref={titleRef}
            data-animate-id="title"
            className={`${styles.title} ${animatedElements.has('title') ? styles.animate : ''}`}
          >
            Let&apos;s Connect
          </h2>
          <p 
            ref={subtitleRef}
            data-animate-id="subtitle"
            className={`${styles.subtitle} ${animatedElements.has('subtitle') ? styles.animate : ''}`}
          >
            Open to new opportunities and exciting full-time roles
          </p>

          <div 
            ref={contentRef}
            data-animate-id="content"
            className={`${styles.content} ${animatedElements.has('content') ? styles.animate : ''}`}
          >
            <div 
              ref={contactInfoRef}
              data-animate-id="contactInfo"
              className={`${styles.contactInfo} ${animatedElements.has('contactInfo') ? styles.animate : ''}`}
            >
              <h3 className={styles.infoTitle}>Contact Information</h3>
              <p className={styles.infoDescription}>
                Feel free to reach out if you&apos;re looking for a developer,
                have a question, or just want to connect.
              </p>

              <div className={styles.contactItems}>
                <div className={styles.contactItem}>
                  <div className={styles.icon}>
                    <AtSign />
                  </div>
                  <div className={styles.itemContent}>
                    <h4>Email</h4>
                    <p>jonathanjamer123@gmail.com</p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.icon}>
                    <Phone />
                  </div>
                  <div className={styles.itemContent}>
                    <h4>Phone</h4>
                    <p>+63 961 745 1260</p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.icon}>
                    <MapPin />
                  </div>
                  <div className={styles.itemContent}>
                    <h4>Location</h4>
                    <p>Caloocan City, Philippines</p>
                  </div>
                </div>
              </div>

              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/jon4thanDev"
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/jonathan-jhonielyne-jamer-8bb530245/"
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div 
              ref={contactFormRef}
              data-animate-id="contactForm"
              className={`${styles.contactForm} ${animatedElements.has('contactForm') ? styles.animate : ''}`}
            >
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={styles.input}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows={5}
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className={styles.spinner}></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={5000}
      />
    </>
  );
};

export default Contact;
