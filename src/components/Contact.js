const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        We’d love to hear from you. Reach out anytime!
      </p>

      <div className="contact-cards">
        <div className="contact-card">
          <h3>📞 Phone</h3>
          <p>+91 85739 43970</p>
        </div>

        <div className="contact-card">
          <h3>📧 Email</h3>
          <p>inzamamm128@bbdu.ac.in</p>
        </div>

        <div className="contact-card">
          <h3>📍 Location</h3>
          <p>Lucknow, India</p>
        </div>
      </div>

      <div className="contact-form">
        <h2>Send us a message</h2>

        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>

        <button>Send Message</button>
      </div>
    </div>
  );
};

export default Contact;
