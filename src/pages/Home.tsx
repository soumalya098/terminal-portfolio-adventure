
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2 space-y-6 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold heading-gradient">
                Hi, I'm <span className="text-white">Ambrose</span>
              </h1>
              <h2 className="text-xl sm:text-2xl text-white/80">
                Full-stack Developer
              </h2>
              <p className="text-white/70 max-w-md text-base sm:text-lg">
                I build modern , ai based websites and applications using python and java script.
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="https://github.com/pyl1nx" target="_blank" rel="noopener noreferrer" 
                  className="p-2 glass rounded-full hover:bg-white/10 transition-colors">
                  <Github className="text-white h-5 w-5" />
                </a>
                <a href="https://linkedin.com/pyl1nx" target="_blank" rel="noopener noreferrer" 
                  className="p-2 glass rounded-full hover:bg-white/10 transition-colors">
                  <Linkedin className="text-white h-5 w-5" />
                </a>
                <a href="mailto:ambrose.linux+coder@gmail.com" 
                  className="p-2 glass rounded-full hover:bg-white/10 transition-colors">
                  <Mail className="text-white h-5 w-5" />
                </a>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/projects" className="button-primary">
                  View Projects
                </Link>
                <Link to="/contact" className="button-outline">
                  Contact Me
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in flex justify-center md:justify-end">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-portfolio-accent/50 shadow-[0_0_25px_rgba(157,70,255,0.3)]">
                <img
                  src="https://i.postimg.cc/fkPy5KLM/IMG-20250309-192643-546.jpg&auto=format&fit=crop&w=774&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-glass-gradient backdrop-blur-[5px]">
        <div className="section-container">
          <h2 className="text-3xl font-bold heading-gradient mb-8 text-center">
            About Me
          </h2>
          <div className="glass p-6 sm:p-8 max-w-3xl mx-auto">
            <p className="mb-4 text-white/90">
              I'm currently diving into the world of Python, AI, and web development. I'm passionate about learning new technologies and building innovative projects. Always eager to grow and explore the vast potential of coding!
            </p>
            <div className="mt-6 pt-4 border-t border-white/10">
              <h3 className="text-xl font-semibold text-portfolio-secondary mb-3">Currently working on</h3>
              <div className="glass bg-black/20 p-4 rounded-md">
                <p className="text-white/80">
                  <span className="text-portfolio-accent">→</span> An AI-powered content management system
                </p>
                <p className="text-white/80 mt-1">
                  <span className="text-portfolio-accent">→</span> Learning Rust for backend performance optimization
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <a 
                href="/resume.pdf" 
                className="button-outline flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
