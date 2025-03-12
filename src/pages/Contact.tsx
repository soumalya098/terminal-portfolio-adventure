
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="section-container">
        <h1 className="text-4xl font-bold heading-gradient mb-4 text-center">
          Get In Touch
        </h1>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">
          Feel free to reach out for collaborations, opportunities, or just to say hello!
          I'm always open to discussing new projects and ideas.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="glass p-8 animate-fade-in">
            <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 glass rounded-full bg-portfolio-primary/20">
                  <Mail className="w-5 h-5 text-portfolio-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <a href="mailto:example@portfolio.com" className="text-white/70 hover:text-portfolio-accent transition-colors">
                    example@portfolio.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 glass rounded-full bg-portfolio-primary/20">
                  <Phone className="w-5 h-5 text-portfolio-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Phone</h3>
                  <a href="tel:+11234567890" className="text-white/70 hover:text-portfolio-accent transition-colors">
                    +1 (123) 456-7890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 glass rounded-full bg-portfolio-primary/20">
                  <MapPin className="w-5 h-5 text-portfolio-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Location</h3>
                  <p className="text-white/70">
                    San Francisco, California, USA
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-lg font-medium text-white mb-4">Connect on Social Media</h3>
              <div className="flex gap-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-full hover:bg-white/10 transition-colors"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-full hover:bg-white/10 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-full hover:bg-white/10 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-white/10">
              <h3 className="text-lg font-medium text-white mb-3">Preferred Contact Method</h3>
              <p className="text-white/70">
                The quickest way to reach me is via email. I typically respond within 24 hours.
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="glass p-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold text-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-white/80 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-md outline-none focus:border-portfolio-accent transition-colors text-white"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white/80 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-md outline-none focus:border-portfolio-accent transition-colors text-white"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-white/80 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-md outline-none focus:border-portfolio-accent transition-colors text-white"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white/80 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-md outline-none focus:border-portfolio-accent transition-colors text-white resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center gap-2 w-full p-3 rounded-md transition-all duration-300 
                  ${isSubmitting ? 'bg-portfolio-primary/50 cursor-not-allowed' : 'bg-portfolio-primary hover:bg-portfolio-accent'}`}
              >
                {isSubmitting ? (
                  <>Processing<span className="animate-pulse">...</span></>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
