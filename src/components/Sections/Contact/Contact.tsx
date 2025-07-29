"use client";

import { useState } from "react";
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
          <h2 className={styles.title}>Let&apos;s Connect</h2>
          <p className={styles.subtitle}>
            Open to new opportunities and exciting full-time roles
          </p>

          <div className={styles.content}>
            <div className={styles.contactInfo}>
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

            <div className={styles.contactForm}>
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
