import React, { useState } from 'react';
import './ContactForm.css';
import emailjs from 'emailjs-com';



const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Removed duplicate handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await emailjs.send(
      'resource_hub',
      'template_1hho8by',
      formData,
      'jecP8FAA948bWhEYK'
    );
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};
  return (
    <div className="contact-form-container">
      {submitted ? (
        <div className="success-message">
          <h3>Thank you!</h3>
          <p>We'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn primary">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};



export default ContactForm;