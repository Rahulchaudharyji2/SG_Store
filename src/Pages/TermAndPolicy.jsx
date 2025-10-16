import React from "react";

// --- Styling Definitions ---
// In a real application, you'd likely use a separate CSS file or a CSS-in-JS library.
// These inline styles are for a clean, modern, and readable appearance.

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    lineHeight: "1.6",
    color: "#333", // Dark text for readability
  },
  header: {
    borderBottom: "3px solid #007bff", // Primary color border
    paddingBottom: "10px",
    marginBottom: "30px",
    color: "#007bff", // Primary brand color
    fontWeight: "700",
    fontSize: "2.5em",
  },
  section: {
    marginBottom: "30px",
    padding: "15px",
    borderLeft: "4px solid #f0f0f0", // Subtle separation for sections
  },
  sectionTitle: {
    color: "#333",
    fontSize: "1.5em",
    marginBottom: "15px",
    fontWeight: "600",
  },
  paragraph: {
    marginBottom: "15px",
    textAlign: "justify", // Justified text for a professional look
  },
  list: {
    marginLeft: "20px",
    padding: "0",
    listStyleType: "disc",
  },
  listItem: {
    marginBottom: "10px",
  },
  highlight: {
    fontWeight: "700",
    color: "#dc3545", // Use a warning/alert color for key disclaimers
  },
  successHighlight: {
    fontWeight: "700",
    color: "#28a745", // Use a success color for positive resolutions
  },
  subSectionTitle: {
    fontSize: "1.2em",
    fontWeight: "600",
    marginTop: "20px",
    marginBottom: "10px",
    color: "#555",
  },
  contactInfo: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #e9ecef",
  },
};

const TermsAndPolicyPage = () => {
  const lastUpdated = "September 30, 2025"; // Placeholder: update this manually

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>
        Terms and Policy
        <p
          style={{
            fontSize: "0.5em",
            color: "#6c757d",
            fontWeight: "400",
            marginTop: "5px",
          }}
        >
          Last Updated: {lastUpdated}
        </p>
      </h1>

      <div style={styles.section}>
        <p style={styles.paragraph}>
          By using this website, the user has{" "}
          <strong style={{ color: "#007bff" }}>unconditionally accepted</strong>{" "}
          the terms and conditions of use as given hereunder and/or elsewhere in
          the site.
        </p>
        <p style={styles.paragraph}>
          Welcome to <strong style={{ color: "#007bff" }}>SG</strong>. By
          accessing or using our website, you agree to comply with and be bound
          by these Terms and Conditions. If you do not agree with these terms,
          please refrain from using our website.
        </p>
        <p style={styles.paragraph}>
          The user is advised to carefully read all the information on products
          and services as provided in relevant sections and in the{" "}
          <strong style={{ color: "#007bff" }}>FAQ</strong>.
        </p>
        <p style={styles.paragraph}>
          <strong style={{ color: "#007bff" }}>SG</strong> reserves the right to
          modify these Terms and Conditions at any time. Any changes will be
          posted on this page, and the date of the most recent revision will be
          indicated at the top of the page.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>1. Product Condition Disclaimer</h2>

        <p style={styles.paragraph}>
          At <strong style={{ color: "#007bff" }}>SG</strong>, we prioritize
          delivering products in excellent condition. However, please note the
          following crucial disclaimers:
        </p>

        <ul style={styles.list}>
          <li style={styles.listItem}>
            <strong style={styles.highlight}>Customer-Induced Damage:</strong>{" "}
            If a product is damaged due to intentional actions or negligence by
            the customer,{" "}
            <strong style={styles.highlight}>
              SG will not be responsible for replacement or repair.
            </strong>
          </li>
          <li style={styles.listItem}>
            <strong style={styles.successHighlight}>
              Delivery or SG Team-Induced Damage:
            </strong>{" "}
            If a product is damaged during delivery or due to an error by our
            team,{" "}
            <strong style={styles.successHighlight}>
              SG will offer a replacement at no additional cost
            </strong>{" "}
            to the customer.
          </li>
        </ul>


        <p style={styles.paragraph}>
          We strongly recommend{" "}
          <strong style={{ color: "#007bff" }}>
            inspecting the product immediately upon delivery
          </strong>
          . If you notice any damage, please contact our customer support
          immediately to initiate a resolution.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>2. Product Replacement Policy</h2>

        <p style={styles.paragraph}>
          <strong style={{ color: "#007bff" }}>SG</strong> is a registered
          entity under the name of{" "}
          <strong style={{ color: "#007bff" }}>Sambhav Goyal</strong>. We are
          committed to delivering high-quality products to our customers.
        </p>

        <h3 style={styles.subSectionTitle}>Replacement Timeline:</h3>

        <ul style={styles.list}>
          <li style={styles.listItem}>
            <strong style={styles.successHighlight}>
              Within 3 Days of Delivery:
            </strong>{" "}
            If you encounter any manufacturing defects or quality issues with
            the product within 3 days of delivery, we will replace the product
            at no additional cost. To initiate a replacement, please contact our
            customer support promptly.
          </li>
          <li style={styles.listItem}>
            <strong style={styles.highlight}>After 3 Days of Delivery:</strong>{" "}
            After the 3-day period, we are{" "}
            <strong style={styles.highlight}>
              unable to offer a replacement
            </strong>{" "}
            for the product. However, you may still reach out to our customer
            support for assistance, and we will endeavor to provide guidance or
            solutions where possible.
          </li>
        </ul>
        <h3 style={styles.subSectionTitle}>Refund Policy:</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <strong style={styles.successHighlight}>
              Refunds are applicable within 3 days of product delivery
            </strong>{" "}
             only in cases of damaged, defective, or wrong items received.
          </li>
          <li style={styles.listItem}>
            <strong style={styles.highlight}>To be eligible for a refund</strong>{" "}
            the product must be unused and returned in its original packaging.{" "}
            <li>

            <strong style={styles.highlight}>
              Once we receive and inspect the returned product, the refund will be processed to your original payment method within 5–7 business days.
            </strong>{" "}
            </li>
           
          </li>
          <li>
            	After the 3-day period, refunds will not be issued under any circumstances.
          </li>
        </ul>
        <h3 style={styles.subSectionTitle}>Order Cancellation & COD Policy</h3>
                <ul style={styles.list}>
          <li style={styles.listItem}>
           {" "}
            Strict No-Return for COD Abuse
{" "}
            <strong style={styles.highlight}>
              In case a customer places an order using Cash on Delivery (COD) and then cancels it at the last moment, such behavior will be considered an abuse of service. If this happens again, we reserve the right to refuse accepting any future orders from that customer.

            </strong>
          </li>
          <li style={styles.listItem}>
            <strong style={styles.successHighlight}>
             Penalty for COD Cancellations

            </strong>{" "}
            If a COD order is cancelled at the delivery stage (i.e. after dispatch), a non-refundable penalty of ₹99 will be levied and deducted from any refund or retained as a service charge.
{" "}
            <strong style={styles.successHighlight}>
              Prepaid Orders – Replacement / Refund Only

            </strong>{" "}
            For prepaid orders, cancellations or returns may be allowed under our regular return / refund policy. However, we shall not accept abrupt cancellations at the doorstep or during delivery. Any refund or replacement must go through the standard process and is subject to our policy terms.

          </li>
          <li style={styles.listItem}>
            <strong style={styles.successHighlight}>
             Respectful Conduct Expected


            </strong>{" "}
            We expect all customers to treat delivery personnel courteously. Any form of misbehavior or verbal abuse toward our delivery partners will be taken seriously, and we reserve the right to refuse service in the future in such cases.
{" "}

          </li>
        </ul>

        <h3 style={styles.subSectionTitle}>Important Note:</h3>
        <p style={styles.paragraph}>
          It is{" "}
          <strong style={{ color: "#007bff" }}>your responsibility</strong> to
          inspect the product upon delivery. If you notice any damage or issues,
          please inform our customer support immediately to facilitate a timely
          resolution.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>3. Contact Information</h2>
        <p style={styles.paragraph}>
          If you have any questions about these Terms and Conditions or
          experience any issues with your product, please contact us through the
          following channels:
        </p>

        <div style={styles.contactInfo}>
          <h4 style={{ margin: "0 0 10px 0", color: "#007bff" }}>
            Contact Options:
          </h4>
          <ul
            style={{ ...styles.list, listStyleType: "none", marginLeft: "0" }}
          >
            <li style={styles.listItem}>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:sggiftslove@gmail.com"
                style={{ color: "#007bff" }}
              >
                sggiftslove@gmail.com
              </a>
            </li>
            <li style={styles.listItem}>
              <strong>Chatbot:</strong> Utilize the chatbot available on our
              website for immediate assistance.
            </li>
            <li style={styles.listItem}>
              <strong>WhatsApp Business:</strong> Send a message to our official
              WhatsApp Business number for support (Number not provided, add
              here if available).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPolicyPage;
