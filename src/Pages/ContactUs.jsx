import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// --- Styling Definitions ---
const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "",
    padding: "60px 20px",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    lineHeight: "1.6",
  },
  contentBox: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexWrap: "wrap",
    gap: "40px",
    border: "2px solid #EBCB90",
  },
  header: {
    width: "100%",
    fontSize: "2.5em",
    color: "#333",
    marginBottom: "10px",
    borderBottom: "2px solid #EBCB90",
    paddingBottom: "15px",
  },
  formContainer: {
    flex: "2 1 450px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1em",
    transition: "border-color 0.3s",
  },
  textarea: {
    padding: "12px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1em",
    minHeight: "150px",
    resize: "vertical",
  },
  submitButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "14px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.1em",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  infoContainer: {
    flex: "1 1 300px",
    padding: "20px 0",
  },
  contactItem: {
    marginBottom: "25px",
  },
  contactTitle: {
    fontSize: "1.3em",
    fontWeight: "600",
    color: "#333",
    marginBottom: "5px",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "10px",
    color: "#007bff",
    fontSize: "1.2em",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "500",
  },
  address: {
    fontStyle: "normal",
    lineHeight: "1.8",
    color: "#666",
  },
  statusMessage: {
    padding: "15px",
    borderRadius: "5px",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

const ContactUsPage = () => {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(""); // "success", "error", "sending"

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("sending");

    emailjs
      .sendForm(
        "service_9trstrn", // 🔧 Replace with your EmailJS Service ID
        "template_1tnx946", // 🔧 Replace with your Template ID
        form.current,
        {
          publicKey: "7Xp4OswkTqIeUahKx", // 🔧 Replace with your Public Key
        }
      )
      .then(
        () => {
          setStatus("success");
          setSending(false);
          form.current.reset();
        },
        () => {
          setStatus("error");
          setSending(false);
        }
      );
  };

  const renderStatusMessage = () => {
    if (status === "sending") {
      return (
        <div
          style={{
            ...styles.statusMessage,
            backgroundColor: "#ffc107",
            color: "#333",
          }}
        >
          Sending message...
        </div>
      );
    }
    if (status === "success") {
      return (
        <div
          style={{
            ...styles.statusMessage,
            backgroundColor: "#28a745",
            color: "white",
          }}
        >
          ✅ Thank you! Your message has been sent successfully. We’ll respond
          soon.
        </div>
      );
    }
    if (status === "error") {
      return (
        <div
          style={{
            ...styles.statusMessage,
            backgroundColor: "#dc3545",
            color: "white",
          }}
        >
          ❌ Failed to send. Please try again or use direct email/WhatsApp.
        </div>
      );
    }
    return null;
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox}>
        <h1 style={styles.header}>📞 Get in Touch</h1>

        {/* Left: Contact Form */}
        <div style={styles.formContainer}>
          <h2 style={{ color: "#007bff", marginBottom: "20px" }}>
            Send Us a Message
          </h2>
          <p style={{ marginBottom: "20px" }}>
            Use the form below for general inquiries and support.
          </p>

          <form ref={form} onSubmit={sendEmail} style={styles.form}>
            <input
              style={styles.input}
              type="text"
              name="user_name"
              placeholder="Your Full Name"
              required
            />
            <input
              style={styles.input}
              type="email"
              name="user_email"
              placeholder="Your Email Address"
              required
            />
            <textarea
              style={styles.textarea}
              name="message"
              placeholder="Your Message or Inquiry"
              required
            ></textarea>

            <button
              style={{
                ...styles.submitButton,
                opacity: sending ? 0.7 : 1,
                cursor: sending ? "not-allowed" : "pointer",
              }}
              type="submit"
              disabled={sending}
            >
              {sending ? "Sending..." : "Send Message"}
            </button>

            {renderStatusMessage()}
          </form>
        </div>

        {/* Right: Contact Info */}
        <div style={styles.infoContainer}>
          <h2 style={{ color: "#007bff", marginBottom: "30px" }}>
            Direct Contact Options
          </h2>

          <div style={styles.contactItem}>
            <h3 style={styles.contactTitle}>
              <span style={styles.icon}>✉️</span> Email Support
            </h3>
            <a href="mailto:sggiftslove@gmail.com" style={styles.link}>
              sggiftslove@gmail.com
            </a>
            <p style={{ fontSize: "0.9em", color: "#666" }}>
              Responds within 24 hours (Business Days).
            </p>
          </div>

          <div style={styles.contactItem}>
            <h3 style={styles.contactTitle}>
              <span style={styles.icon}>📱</span> WhatsApp Business
            </h3>
            <a
              href="https://wa.me/9870451616"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              +91-9870451616
            </a>
            <p style={{ fontSize: "0.9em", color: "#666" }}>
              Quick responses during business hours.
            </p>
          </div>

          <div style={styles.contactItem}>
            <h3 style={styles.contactTitle}>
              <span style={styles.icon}>💬</span> Live Chat
            </h3>
            <p>
              For <strong>immediate assistance</strong>, look for the chat icon
              on our website.
            </p>
          </div>

          <div style={styles.contactItem}>
            <h3 style={styles.contactTitle}>
              <span style={styles.icon}>🏢</span> Office Address
            </h3>
            <address style={styles.address}>
              <strong>SG Enterprises</strong>
              <br />
              123 Business Park,
              <br />
              Delhi, India
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
