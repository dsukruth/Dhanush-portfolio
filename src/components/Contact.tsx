
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { personalInfo } from '../data/portfolioData';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    ...(personalInfo.phone ? [{
      icon: Phone,
      title: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`
    }] : []),
    {
      icon: Mail,
      title: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`
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
                disabled={isSubmitting}
                className="liquid-glass-button w-full px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .liquid-glass-button {
            position: relative;
            overflow: hidden;
          }

          .liquid-glass-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.3),
              rgba(255, 255, 255, 0.1),
              transparent
            );
            transition: left 0.6s ease;
            z-index: 1;
          }

          .liquid-glass-button::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
            backdrop-filter: blur(10px);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 0;
          }

          .liquid-glass-button:hover::before {
            left: 100%;
          }

          .liquid-glass-button:hover::after {
            opacity: 1;
          }

          .liquid-glass-button:active {
            transform: scale(0.98);
            box-shadow: 
              inset 0 4px 8px rgba(0, 0, 0, 0.1),
              0 4px 12px rgba(31, 38, 135, 0.2);
          }

          .liquid-glass-button > * {
            position: relative;
            z-index: 2;
          }
        `
      }} />
    </section>
  );
};

export default Contact;
