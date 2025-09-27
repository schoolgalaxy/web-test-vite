import React, { useState } from 'react';
import { generateClient } from "aws-amplify/api";
import type { Schema } from '../../../amplify/data/resource';
import { useMemo } from 'react';
import debug from '../../util/debug';

import './FeedbackForm.css'; // Assuming a CSS file for styling

interface FeedbackFormData {
  subject: string;
  email: string;
  message: string;
}

const FeedbackForm: React.FC = () => {
  const client = useMemo(() => generateClient<Schema>(), []);
  const [formData, setFormData] = useState<FeedbackFormData>({
    subject: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the field as user types
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is mandatory';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is mandatory';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is mandatory';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);

    if (validateForm()) {
      try {
        const { data: newFeedback } = await client.models.Feedback.create({
          subject: formData.subject,
          email: formData.email,
          message: formData.message,
          timestamp: new Date().toISOString(),
        });
        debug.log('Feedback created:', newFeedback);
        setSubmitMessage('Feedback submitted successfully!');
        setFormData({
          subject: '',
          email: '',
          message: '',
        });
      } catch (error) {
        debug.error('Error submitting feedback:', error);
        setSubmitMessage('Failed to submit feedback. Please try again.');
      }
    } else {
      setSubmitMessage('Please correct the errors in the form.');
    }
  };

  return (
    <div className="middle-pane">
      <div className="feedback-form-content">
        <h2>Feedback Form</h2>
        {submitMessage && (
          <div className={`submit-message ${submitMessage.includes('successfully') ? 'success' : 'error'}`}>
            {submitMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            {errors.subject && <span className="error-message">{errors.subject}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
            ></textarea>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;