'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Phone",
      details: [
        "+1 (555) 123-4567",
        "+1 (555) 987-6543"
      ]
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      details: [
        "info@luxuryhotel.com",
        "reservations@luxuryhotel.com"
      ]
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      details: [
        "123 Luxury Avenue",
        "Paradise City, PC 12345"
      ]
    },
    {
      icon: <Clock size={24} />,
      title: "Hours",
      details: [
        "24/7 Front Desk",
        "Check-in: 3 PM | Check-out: 11 AM"
      ]
    }
  ];

  const faqs = [
    {
      question: "What are your check-in and check-out times?",
      answer: "Check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in and late check-out can be arranged based on availability."
    },
    {
      question: "Do you offer airport transfers?",
      answer: "Yes, we provide luxury airport transfer services. Please contact our concierge at least 24 hours in advance to arrange your transportation."
    },
    {
      question: "Is breakfast included in the room rate?",
      answer: "Yes, all our room rates include our signature breakfast buffet served at our main restaurant from 6:30 AM to 10:30 AM daily."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contact Info Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get in touch with our team for any inquiries about our services, special requests, or assistance with your booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <div className="text-blue-400 mb-4">{info.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-400">{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
                <p className="text-gray-600">
                  We'll get back to you within 24 hours
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We'll respond to your message soon.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[150px]"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="font-semibold mb-2 flex items-start">
                      <MessageSquare className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 ml-7">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[400px] bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31103.936188194075!2d77.57445193476562!3d12.972361800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1679c4616049%3A0x21e7060fdb88a82b!2sJW%20Marriott%20Hotel%20Bengaluru!5e0!3m2!1sen!2sin!4v1734600104191!5m2!1sen!2sin" width="1600" height="400"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>        </div>
      </div>
    </div>
  );
}