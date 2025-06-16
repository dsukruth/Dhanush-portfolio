
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { personalInfo } from '../data/portfolioData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`
    },
    {
      icon: Phone,
      title: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: personalInfo.linkedin,
      href: `https://${personalInfo.linkedin}`
    },
    {
      icon: MapPin,
      title: 'Location',
      value: personalInfo.location,
      href: '#'
    }
  ];

  return (
    <section id="contact" className="py-32 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6 tracking-tight">
            Let's Connect
          </h2>
          <div className="w-16 h-0.5 bg-gray-900 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            I'm always interested in discussing new opportunities, innovative projects, or potential collaborations. Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Information */}
          <div>
            <h3 className="text-3xl font-light text-gray-900 mb-12">Get in Touch</h3>
            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, title, value, href }) => (
                <a
                  key={title}
                  href={href}
                  className="flex items-center space-x-6 p-6 bg-white rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 group"
                  target={href.startsWith('http') ? '_blank' : '_self'}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <div className="p-4 bg-gray-900 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm font-medium">{title}</div>
                    <div className="text-gray-900 font-semibold text-lg">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12 p-8 bg-gray-900 rounded-2xl">
              <h4 className="text-xl font-semibold text-white mb-4">Available for Opportunities</h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Currently seeking full-time opportunities in:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Product Management</li>
                <li>• AI/ML Engineering</li>
                <li>• Software Engineering</li>
                <li>• Data Science</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-3 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-gray-50 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-3 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-gray-50 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-3 font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-gray-50 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3"
              >
                <span>Send Message</span>
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
