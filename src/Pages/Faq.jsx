import React, { useState } from "react";

function FAQPage() {
  const faqs = [
    {
      q: "What kind of gifts do you sell?",
      a: "At SG Gifts, we offer jewellery, photo frames, soft toys, and flowers — perfect for every occasion.",
    },
    {
      q: "How fast can I get my order delivered?",
      a: "Delivery takes 1–2 days. If your location is within 10 km, we’ll deliver within 24 hours. For any delay, you can contact us on WhatsApp Business for instant help.",
    },
    {
      q: "Do you provide same-day delivery?",
      a: "Yes! If you’re within 10 km of our store, you’ll get your gift the same day.",
    },
    {
      q: "What if I face an issue with the product?",
      a: "No worries. You can contact us anytime via WhatsApp Business or by email under the Contact Us section.",
    },
    {
      q: "Do you offer gift wrapping?",
      a: "Yes, all our products come with beautiful packaging at no extra charge.",
    },
    {
      q: "What payment options do you accept?",
      a: "We accept all major online payment methods. (If you want, you can also enable Cash on Delivery option.)",
    },
    {
      q: "Where can I track my order?",
      a: "You can track your order directly through our WhatsApp Business chat by visiting the option on our website.",
    },
    {
      q: "Why should I choose SG Gifts?",
      a: "Because every gift from SG Gifts is more than just a product — it’s carefully chosen to make your moments special, with fast delivery and reliable quality.",
    },
    {
      q: "What if the product is damaged when I receive it?",
      a: "We ensure safe packaging, but if your order is damaged, just send us a photo on WhatsApp or email within 24 hours, and we’ll replace it quickly.",
    },
    {
      q: "How do I know if my order is confirmed?",
      a: "Once you place an order, you’ll receive a confirmation on WhatsApp Business and email with all your order details.",
    },
    {
      q: "What if I entered the wrong address?",
      a: "Please contact us immediately through WhatsApp. If your order hasn’t been dispatched yet, we’ll update the address.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions (FAQs)</h1>

      <p className="intro-paragraph">
        Welcome to the <strong>SG Gifts</strong> FAQ section. Here you’ll find
        answers to the most common questions about our gifts, delivery,
        payments, and services.
      </p>

      <hr />

      {faqs.map((faq, i) => (
        <div key={i} className="faq-item">
          <div
            className="faq-question"
            onClick={() => toggle(i)}
            role="button"
            tabIndex={0}
          >
            <span>{faq.q}</span>
            <span className="faq-toggle">{openIndex === i ? "–" : "+"}</span>
          </div>

          {openIndex === i && <p className="faq-answer">{faq.a}</p>}
          <hr />
        </div>
      ))}

      <p className="final-contact-paragraph">
        Still have questions? Reach us anytime at{" "}
        <strong>
          <a href="mailto:sggiftslove@gmail.com">sggiftslove@gmail.com</a>
        </strong>{" "}
        or on our official WhatsApp Business chat.
      </p>

      {/* Inline CSS */}
      <style jsx>{`
        .faq-container {
          max-width: 960px;
          margin: 40px auto;
          padding: 30px;
          font-family: "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
          line-height: 1.7;
          color: #333;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        h1 {
          font-size: 2.8em;
          color: #1a237e;
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 2px solid #e0e0e0;
        }

        .intro-paragraph {
          font-size: 1.15em;
          font-weight: 500;
          text-align: center;
          margin-bottom: 30px;
          color: #555;
        }

        .faq-item {
          margin: 25px 0;
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.15em;
          font-weight: 600;
          cursor: pointer;
          color: #4e342e; /* Light brown theme */
          background-color: #fdf7f2;
          padding: 15px 20px;
          border-radius: 6px;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }

        .faq-question:hover {
          background-color: #f9efe7;
          box-shadow: 0 3px 10px rgba(181, 127, 80, 0.15);
        }

        .faq-toggle {
          font-size: 1.5em;
          color: #b57f50;
          font-weight: bold;
          margin-left: 10px;
        }

        .faq-answer {
          margin: 15px 10px 10px 20px;
          font-size: 1.05em;
          color: #444;
          background-color: #fffaf6;
          border-left: 4px solid #b57f50;
          padding: 15px 20px;
          border-radius: 5px;
        }

        hr {
          border: none;
          border-top: 1px solid #e0e0e0;
          margin: 25px 0;
        }

        a {
          color: #3f51b5;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        .final-contact-paragraph {
          font-style: italic;
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px dashed #e0e0e0;
          color: #616161;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .faq-container {
            margin: 20px auto;
            padding: 20px;
          }
          h1 {
            font-size: 2.2em;
          }
          .faq-question {
            font-size: 1.05em;
          }
        }

        @media (max-width: 480px) {
          .faq-container {
            margin: 15px auto;
            padding: 15px;
          }
          h1 {
            font-size: 1.8em;
          }
          .faq-question {
            font-size: 1em;
            flex-direction: column;
            align-items: flex-start;
          }
          .faq-toggle {
            margin-top: 8px;
          }
        }
      `}</style>
    </div>
  );
}

export default FAQPage;
