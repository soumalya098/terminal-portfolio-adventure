
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

const Home: React.FC = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);
        
        if (isVisible) {
          element.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Initial check
    animateOnScroll();
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2 space-y-6 animate-fade-in">
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                  Hi, I'm <span className="heading-gradient font-bold relative inline-block">
                    John Doe
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-portfolio-secondary to-portfolio-accent transform scale-x-0 transition-transform duration-700 ease-in-out origin-left group-hover:scale-x-100"></span>
                  </span>
                </h1>
                <h2 className="text-xl sm:text-2xl text-white font-medium">
                  Full-stack Developer
                </h2>
                <p className="text-gray-200 text-base sm:text-lg max-w-md">
                  I build modern, responsive web applications using cutting-edge technologies.
                  Focused on creating clean, efficient, and user-friendly experiences.
                </p>
              </div>
              
              <div className="flex space-x-4 pt-2">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                  className="p-2 glass rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-110 hover:rotate-6">
                  <Github className="text-white h-5 w-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                  className="p-2 glass rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-110 hover:rotate-6">
                  <Linkedin className="text-white h-5 w-5" />
                </a>
                <a href="mailto:example@email.com" 
                  className="p-2 glass rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-110 hover:rotate-6">
                  <Mail className="text-white h-5 w-5" />
                </a>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/projects" className="button-primary transform transition hover:scale-105 duration-300 flex items-center gap-2">
                  View Projects <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="button-outline transform transition hover:scale-105 duration-300">
                  Contact Me
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 animate-fade-in flex justify-center md:justify-end">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-portfolio-accent/50 shadow-[0_0_25px_rgba(157,70,255,0.3)] transition-all duration-500 hover:shadow-[0_0_35px_rgba(157,70,255,0.5)] hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button onClick={scrollToAbout} className="p-3 glass rounded-full hover:bg-white/10 transition-colors">
              <ChevronDown className="text-white h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-20 bg-glass-gradient backdrop-blur-[5px]">
        <div className="section-container">
          <h2 className="text-3xl font-bold text-white mb-8 text-center animate-on-scroll opacity-0">
            About Me
          </h2>
          
          <div className="glass p-8 sm:p-10 max-w-4xl mx-auto animate-on-scroll opacity-0 transform transition-all duration-700 hover:shadow-[0_5px_30px_rgba(157,70,255,0.2)]">
            <div className="space-y-6">
              <p className="text-gray-200 leading-relaxed">
                I'm a passionate web developer with over 5 years of experience creating dynamic 
                and responsive applications. My journey in web development began with curiosity 
                and has evolved into expertise across the full stack.
              </p>
              
              <p className="text-gray-200 leading-relaxed">
                I specialize in React, TypeScript, Node.js, and modern frontend frameworks. 
                I'm constantly learning and exploring new technologies to improve my skills 
                and create better digital experiences.
              </p>
              
              <p className="text-gray-200 leading-relaxed">
                When I'm not coding, I enjoy hiking, photography, and contributing to open-source 
                projects. I believe in writing clean, maintainable code and solving complex problems 
                with simple, elegant solutions.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-xl font-semibold text-portfolio-secondary mb-4">Currently working on</h3>
              <div className="glass bg-black/20 p-5 rounded-md space-y-3 transform transition-all duration-500 hover:translate-x-2">
                <p className="text-gray-200 flex items-start">
                  <span className="text-portfolio-accent mr-2">→</span> 
                  <span>An AI-powered content management system with advanced analytics</span>
                </p>
                <p className="text-gray-200 flex items-start">
                  <span className="text-portfolio-accent mr-2">→</span> 
                  <span>Learning Rust for backend performance optimization and WebAssembly integration</span>
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <a 
                href="/resume.pdf" 
                className="button-outline flex items-center gap-2 transform transition hover:scale-105 duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume <ArrowRight size={16} />
              </a>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 animate-on-scroll opacity-0 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_5px_20px_rgba(157,70,255,0.15)]">
              <h3 className="text-xl font-semibold text-portfolio-secondary mb-3">Frontend</h3>
              <p className="text-gray-200 mb-4">Building beautiful, responsive UIs with modern frameworks</p>
              <div className="flex flex-wrap gap-2">
                <span className="skill-badge">React</span>
                <span className="skill-badge">TypeScript</span>
                <span className="skill-badge">Tailwind CSS</span>
              </div>
            </div>
            
            <div className="glass p-6 animate-on-scroll opacity-0 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_5px_20px_rgba(157,70,255,0.15)]">
              <h3 className="text-xl font-semibold text-portfolio-secondary mb-3">Backend</h3>
              <p className="text-gray-200 mb-4">Creating robust APIs and server-side applications</p>
              <div className="flex flex-wrap gap-2">
                <span className="skill-badge">Node.js</span>
                <span className="skill-badge">Express</span>
                <span className="skill-badge">Firebase</span>
              </div>
            </div>
            
            <div className="glass p-6 animate-on-scroll opacity-0 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_5px_20px_rgba(157,70,255,0.15)]">
              <h3 className="text-xl font-semibold text-portfolio-secondary mb-3">DevOps</h3>
              <p className="text-gray-200 mb-4">Deploying and maintaining applications in the cloud</p>
              <div className="flex flex-wrap gap-2">
                <span className="skill-badge">Docker</span>
                <span className="skill-badge">CI/CD</span>
                <span className="skill-badge">AWS</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
