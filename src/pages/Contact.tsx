
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, CheckCircle } from 'lucide-react';
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);
        
        if (isVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Initial check
    setTimeout(animateOnScroll, 100); // Slight delay to ensure DOM is ready
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

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
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-20 pt-28 bg-portfolio-background overflow-hidden text-gray-100">
      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          Get In Touch
        </h1>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Feel free to reach out for collaborations, opportunities, or just to say hello!
          I'm always open to discussing new projects and ideas.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="glass p-8 animate-on-scroll visible opacity-100 transition-opacity duration-700 transform transition-all duration-500 hover:shadow-[0_5px_30px_rgba(157,70,255,0.15)]">
            <h2 className="text-2xl font-semibold text-white mb-8 relative">
              Contact Information
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-portfolio-accent"></span>
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="p-3 glass rounded-full bg-portfolio-primary/20 group-hover:bg-portfolio-primary/30 transition-colors">
                  <Mail className="w-5 h-5 text-portfolio-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                  <a 
                    href="mailto:example@portfolio.com" 
                    className="text-gray-300 hover:text-portfolio-accent transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-portfolio-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                  >
                    example@portfolio.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-5 group">
                <div className="p-3 glass rounded-full bg-portfolio-primary/20 group-hover:bg-portfolio-primary/30 transition-colors">
                  <Phone className="w-5 h-5 text-portfolio-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Phone</h3>
                  <a 
                    href="tel:+11234567890" 
                    className="text-gray-300 hover:text-portfolio-accent transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-portfolio-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                  >
                    +91 **********
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-5 group">
                <div className="p-3 glass rounded-full bg-portfolio-primary/20 group-hover:bg-portfolio-primary/30 transition-colors">
                  <MapPin className="w-5 h-5 text-portfolio-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Location</h3>
                  <p className="text-gray-300">
                    India
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-lg font-medium text-white mb-5 relative">
                Connect on Social Media
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-portfolio-accent/60"></span>
              </h3>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/pyl1nx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://linkedin.com/pyl1nx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://x.com/pyl1nx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-white/10">
              <h3 className="text-lg font-medium text-white mb-3">Preferred Contact Method</h3>
              <p className="text-gray-300">
                The quickest way to reach me is via email. I typically respond within 24 hours.
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="glass p-8 animate-on-scroll visible opacity-100 transition-opacity duration-700 transform transition-all duration-500 hover:shadow-[0_5px_30px_rgba(157,70,255,0.15)]">
            <h2 className="text-2xl font-semibold text-white mb-8 relative">
              Send a Message
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-portfolio-accent"></span>
            </h2>
            
            {isSubmitted ? (
              <div className="h-[calc(100%-4rem)] flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 glass rounded-full bg-portfolio-accent/20 mb-4">
                  <CheckCircle className="w-12 h-12 text-portfolio-accent" />
                </div>
                <h3 className="text-xl font-medium text-white">Message Sent Successfully!</h3>
                <p className="text-gray-300 max-w-md">
                  Thank you for reaching out. I'll get back to you as soon as possible!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">Name</label>
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
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
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
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white mb-2">Subject</label>
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
                  <label htmlFor="message" className="block text-white mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-md outline-none focus:border-portfolio-accent transition-colors text-white resize-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center gap-2 w-full p-3 rounded-md transition-all duration-300 text-white
                    ${isSubmitting ? 'bg-portfolio-primary/50 cursor-not-allowed' : 'bg-portfolio-primary hover:bg-portfolio-accent transform hover:scale-[1.01]'}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 rounded-full border-2 border-white border-r-transparent animate-spin"></div>
                      Processing
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        
        {/* Map or Additional Info Section */}
        <div className="mt-16 glass p-8 animate-on-scroll visible opacity-100 transition-opacity duration-700">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Find Me Here</h2>
          <div className="aspect-video w-full bg-white/5 rounded-lg overflow-hidden relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017946778!3d37.75781499156358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1659620651893!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
