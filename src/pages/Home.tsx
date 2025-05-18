
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

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-portfolio-background overflow-x-hidden text-gray-100">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative pt-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2 space-y-6">
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                  Hi, I'm <span className="heading-gradient font-bold relative inline-block">
                    Ambrose
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-portfolio-secondary to-portfolio-accent transform scale-x-0 transition-transform duration-700 ease-in-out origin-left group-hover:scale-x-100"></span>
                  </span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  Coding Enthusiast
                </h2>
                <p className="text-gray-300 text-base sm:text-lg max-w-md">
                  Learning to build modern, responsive web applications using HTML, CSS, JavaScript and Python.
                  Focused on creating clean, efficient, and user-friendly experiences.
                </p>
              </div>
              
              <div className="flex space-x-4 pt-2">
                <a href="https://github.com/pyL1nx" target="_blank" rel="noopener noreferrer" 
                  className="p-2 glass rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-110 hover:rotate-6">
                  <Github className="text-white h-5 w-5" />
                </a>
                <a href="https://linkedin.com/in/pyL1nx" target="_blank" rel="noopener noreferrer" 
                  className="p-2 glass rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-110 hover:rotate-6">
                  <Linkedin className="text-white h-5 w-5" />
                </a>
                <a href="mailto:Ambrose.linux+coder@gmail.com" 
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
            
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-portfolio-accent/50 shadow-[0_0_25px_rgba(157,70,255,0.3)] transition-all duration-500 hover:shadow-[0_0_35px_rgba(157,70,255,0.5)] hover:scale-105">
                <img
                  src="https://i.postimg.cc/63s1hfnT/IMG-20250516-WA0006.jpg"
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
      <section id="about-section" className="py-20 bg-portfolio-background/80 backdrop-blur-[5px] relative z-10">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center animate-on-scroll visible opacity-100 transition-opacity duration-700">
            About Me
          </h2>
          
          <div className="glass p-8 sm:p-10 max-w-4xl mx-auto animate-on-scroll visible opacity-100 transition-opacity duration-700 transform transition-all duration-700 hover:shadow-[0_5px_30px_rgba(157,70,255,0.2)]">
            <div className="space-y-6">
              <p className="text-gray-300 leading-relaxed">
                I'm Ambrose, a coding enthusiast who's been learning programming for about two years. 
                My journey in coding began with curiosity and has evolved into a passion for building 
                web applications and solving problems through code.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                I'm proficient in HTML, CSS, JavaScript, and Python. I enjoy learning new technologies 
                and frameworks to expand my skills and create better digital experiences.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, I enjoy exploring new technologies, contributing to open-source 
                projects, and continuously learning to improve my programming skills.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-xl font-semibold text-portfolio-secondary mb-4">Currently working on</h3>
              <div className="glass bg-black/20 p-5 rounded-md space-y-3 transform transition-all duration-500 hover:translate-x-2">
                <p className="text-gray-300 flex items-start">
                  <span className="text-portfolio-accent mr-2">→</span> 
                  <span>Personal web development projects to practice HTML, CSS and JavaScript</span>
                </p>
                <p className="text-gray-300 flex items-start">
                  <span className="text-portfolio-accent mr-2">→</span> 
                  <span>Learning more about Python for automation and data analysis</span>
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
            <div className="glass p-6 animate-on-scroll visible opacity-100 transition-opacity duration-700 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_5px_20px_rgba(157,70,255,0.15)]">
              <h3 className="text-xl font-semibold text-portfolio-secondary mb-3">Frontend</h3>
              <p className="text-gray-300 mb-4">Building responsive websites with modern web technologies</p>
              <div className="flex flex-wrap gap-2">
                <span className="skill-badge">HTML</span>
                <span className="skill-badge">CSS</span>
                <span className="skill-badge">JavaScript</span>
              </div>
            </div>
            
            <div className="glass p-6 animate-on-scroll visible opacity-100 transition-opacity duration-700 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_5px_20px_rgba(157,70,255,0.15)]">
              <h3 className="text-xl font-semibold text-portfolio-secondary mb-3">Backend</h3>
              <p className="text-gray-300 mb-4">Learning to create server-side applications</p>
              <div className="flex flex-wrap gap-2">
                <span className="skill-badge">Python</span>
                <span className="skill-badge">Basic APIs</span>
              </div>
            </div>
            
            <div className="glass p-6 animate-on-scroll visible opacity-100 transition-opacity duration-700 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_5px_20px_rgba(157,70,255,0.15)]">
              <h3 className="text-xl font-semibold text-portfolio-secondary mb-3">Tools</h3>
              <p className="text-gray-300 mb-4">Using development tools to improve workflow</p>
              <div className="flex flex-wrap gap-2">
                <span className="skill-badge">Git</span>
                <span className="skill-badge">Linux</span>
                <span className="skill-badge">VS Code</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
