import React from 'react';

function PrivacyPolicy() {
  const supportEmail = 'sggiftslove@gmail.com';

  return (
    <div className="privacy-policy-container">
      {/* Main Heading */}
      <h1>Privacy Policy</h1>

      {/* Introduction */}
      <p className="intro-paragraph">
        This Privacy Policy describes how <strong>SG</strong> manage personal information and respect your privacy. This policy may be amended from time to time.
      </p>

      {/* -------------------------------------------
      --- Section 1: Collection of Personal Information ---
      -------------------------------------------
      */}
      <hr />
      <h2>1. Collection of Personal Information</h2>
      <p>
        As a visitor to the Site, you can engage in many activities without providing any Personal Information.
      </p>
      <p>
        Depending upon the activity, some of the information that we ask you to provide is identified as <strong>mandatory</strong> and some as <strong>voluntary</strong>. If you do not provide the mandatory data with respect to a particular activity, you will not be able to engage in that activity.
      </p>
      <p>
        However, when you <strong>register</strong> to use a SG and <strong>order products</strong> as a SG customer, in order to provide the services to you, we may collect your contact information such as your <strong>name, phone numbers, address and email address</strong> as well as <strong>profile information</strong>, including your <strong>password, details about your purchases</strong> and <strong>details about your interactions</strong> with us.
      </p>

      {/* -------------------------------------------
      --- Section 2: Customer Service and Support Channels ---
      -------------------------------------------
      */}
      <hr />
      <h2>2. Customer Service and Support Channels</h2>
      <p>
        At SG, we are committed to providing exceptional customer service and support. To enhance your experience, we have integrated advanced technologies, including a chatbot and WhatsApp, to assist you promptly and efficiently.
      </p>

      {/* Chatbot Assistance Details */}
      <h3>3. Chatbot Assistance</h3>
      <p>The chatbot offers immediate assistance, including:</p>
      <ul>
        <li>4) Product information and recommendations</li>
        <li>5) FAQs and troubleshooting</li>
      </ul>
      <p>
        6) The chatbot operates <strong>24/7</strong>, ensuring that you have access to support at any time. While it can handle a wide range of queries, for more complex issues or personalized assistance, you may be directed to our human support team.
      </p>

      {/* WhatsApp Support Details */}
      <h3>7. WhatsApp Support</h3>
      <p>
        8) For personalized support or if you prefer to communicate via WhatsApp, we offer the option to connect directly with our customer service team. You can initiate a conversation by clicking the WhatsApp icon on our website or by saving our official WhatsApp number and reaching out to us.
      </p>

      {/* Data Collection in Chatbot/WhatsApp */}
      <p className="data-note">
        9) Please note that when you interact with our chatbot or contact us via WhatsApp, we may collect certain personal information, such as your <strong>name, contact details, and conversation history</strong>, to provide you with the best possible service. This information is handled in accordance with our Privacy Policy.
      </p>

      {/* -------------------------------------------
      --- Section 3: Email Support ---
      -------------------------------------------
      */}
      <hr />
      <h2>4. Email Support and Contact</h2>
      <p>
        11) For personalized assistance or if you prefer to communicate via email, you can reach our customer service team at <strong><a href={`mailto:${supportEmail}`}>{supportEmail}</a></strong>. We are committed to addressing your inquiries promptly and efficiently.
      </p>
      <p className="data-note">
        Please note that when you contact us via email, we may collect certain personal information, such as your <strong>name, email address, and the content of your message</strong>, to provide you with the best possible service. This information is handled in accordance with our Privacy Policy.
      </p>

      {/* Conclusion */}
      <p className="final-contact-paragraph">
        10) If you have any concerns or require further assistance, please do not hesitate to contact us through your preferred support channel.
      </p>

      {/* Inline styles for demonstration and easy viewing */}
      <style jsx>{`
        .privacy-policy-container {
          max-width: 960px; /* Wider for more content */
          margin: 40px auto; /* Centered with vertical spacing */
          padding: 30px;
          font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif; /* Modern, readable font */
          line-height: 1.7; /* Improved line spacing for readability */
          color: #333; /* Darker text for better contrast */
          background-color: #ffffff; /* Clean white background */
          border-radius: 8px; /* Slightly rounded corners */
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); /* Soft, subtle shadow */
        }

        h1 {
          font-size: 2.8em; /* Larger main title */
          color: #1a237e; /* Deep blue for a professional look */
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 2px solid #e0e0e0; /* Subtle separator */
        }

        h2 {
          font-size: 2.0em; /* Good size for main sections */
          color: #303f9f; /* Slightly lighter blue than h1 */
          margin-top: 40px;
          margin-bottom: 15px;
          border-left: 5px solid #3f51b5; /* Accent border */
          padding-left: 15px;
        }

        h3 {
          font-size: 1.5em; /* Sub-section headings */
          color: #424242; /* Dark grey for sub-headings */
          margin-top: 25px;
          margin-bottom: 10px;
        }

        p {
          margin-bottom: 15px;
          font-size: 1.05em; /* Slightly larger paragraph text */
        }

        .intro-paragraph {
          font-size: 1.15em;
          font-weight: 500; /* Slightly bolder for introduction */
          text-align: center;
          margin-bottom: 30px;
          color: #555;
        }

        ul {
          list-style-type: disc; /* Standard bullet points */
          margin-left: 30px;
          padding-left: 0;
          margin-bottom: 20px;
        }

        ul li {
          margin-bottom: 8px;
          font-size: 1.0em;
        }

        hr {
          border: none;
          border-top: 1px solid #e0e0e0; /* Light grey horizontal rule */
          margin: 35px 0;
        }

        /* The 'strong' tag is used for semantic bolding */
        strong {
          font-weight: bold; /* Ensure the string tag is bold */
          color: #000; /* Ensure bold text stands out */
        }

        a {
          color: #3f51b5; /* Link color */
          text-decoration: none; /* No underline by default */
        }

        a:hover {
          text-decoration: underline; /* Underline on hover */
        }

        .data-note {
          background-color: #e8f5e9; /* Light green background for important notes */
          border-left: 4px solid #4caf50; /* Green accent border */
          padding: 15px 20px;
          margin-top: 25px;
          margin-bottom: 25px;
          font-style: italic;
          color: #2e7d32; /* Darker green text */
        }

        .final-contact-paragraph {
          font-style: italic;
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px dashed #e0e0e0; /* Dashed line for separation */
          color: #616161;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .privacy-policy-container {
            margin: 20px auto;
            padding: 20px;
          }
          h1 {
            font-size: 2.2em;
          }
          h2 {
            font-size: 1.7em;
          }
          h3 {
            font-size: 1.3em;
          }
        }

        @media (max-width: 480px) {
          .privacy-policy-container {
            margin: 15px auto;
            padding: 15px;
          }
          h1 {
            font-size: 1.8em;
          }
          h2 {
            font-size: 1.5em;
          }
          h3 {
            font-size: 1.2em;
          }
          ul {
            margin-left: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default PrivacyPolicy;