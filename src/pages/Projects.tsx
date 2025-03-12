
import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Code, Package } from 'lucide-react';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../config/firebase';

type Project = {
  id: string | number;  // Update to accept string (Firestore ID) or number (default projects)
  title: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  
  // Default projects
  const defaultProjects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product management, cart functionality, user authentication, and payment processing.",
      image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1380&q=80",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      features: ["User authentication", "Shopping cart", "Payment processing", "Order history", "Admin dashboard"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
      features: ["Drag-and-drop task management", "Team collaboration", "Real-time updates", "Task filtering", "Notifications"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A personal portfolio website with an interactive terminal landing page, showcasing projects, skills, and contact information.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      features: ["Interactive terminal", "Project showcase", "Responsive design", "Animations", "Contact form"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "A weather application with detailed forecasts, location search, and interactive maps showing real-time weather data.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80",
      technologies: ["React", "Weather API", "Mapbox", "CSS Modules"],
      features: ["5-day forecast", "Location search", "Interactive maps", "Weather alerts", "Favorite locations"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      id: 5,
      title: "Blog Platform",
      description: "A full-featured blog platform with markdown support, comments, user profiles, and a custom content management system.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
      technologies: ["Next.js", "PostgreSQL", "Prisma", "NextAuth"],
      features: ["Markdown editor", "User authentication", "Comments", "Categories and tags", "SEO optimization"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description: "A fitness tracking application that helps users track workouts, set goals, and monitor progress with visualizations.",
      image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
      technologies: ["React Native", "Firebase", "Chart.js", "Expo"],
      features: ["Workout tracking", "Progress charts", "Goal setting", "Exercise library", "Workout plans"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    }
  ];

  // Load projects from Firebase
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsQuery = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc")
        );
        
        const querySnapshot = await getDocs(projectsQuery);
        const firebaseProjects = querySnapshot.docs.map(doc => {
          const data = doc.data();
          // Ensure the data conforms to our Project type
          return {
            id: doc.id,
            title: data.title || '',
            description: data.description || '',
            image: data.image || '',
            technologies: Array.isArray(data.technologies) ? data.technologies : [],
            features: Array.isArray(data.features) ? data.features : [],
            liveUrl: data.liveUrl,
            githubUrl: data.githubUrl,
            featured: !!data.featured
          } as Project;
        });
        
        // Combine with default projects
        setAllProjects([...defaultProjects, ...firebaseProjects]);
      } catch (error) {
        console.error('Error loading projects:', error);
        setAllProjects(defaultProjects);
      }
    };

    loadProjects();
  }, []);

  const openProjectDetails = (project: Project) => {
    setActiveProject(project);
  };

  const closeProjectDetails = () => {
    setActiveProject(null);
  };

  const featuredProjects = allProjects.filter(project => project.featured);
  const regularProjects = allProjects.filter(project => !project.featured);

  return (
    <div className="min-h-screen py-20">
      <div className="section-container">
        <h1 className="text-4xl font-bold heading-gradient mb-4 text-center">
          Projects
        </h1>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">
          Here are some of the projects I've worked on. Each project represents different 
          skills and technologies I've mastered throughout my journey.
        </p>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6 border-l-4 border-portfolio-accent pl-3">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {featuredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="glass overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${project.id * 100}ms` }}
                >
                  <div className="h-60 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-white/70 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="skill-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => openProjectDetails(project)}
                        className="text-portfolio-secondary hover:text-portfolio-accent transition-colors"
                      >
                        View Details
                      </button>
                      <div className="flex gap-3">
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4 text-white" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                            title="GitHub Repository"
                          >
                            <Github className="w-4 h-4 text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        <h2 className="text-2xl font-semibold text-white mb-6 border-l-4 border-portfolio-accent pl-3">
          All Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularProjects.map((project) => (
            <div 
              key={project.id} 
              className="project-card animate-fade-in"
              style={{ animationDelay: `${project.id * 100}ms` }}
            >
              <div className="h-48 overflow-hidden rounded-lg mb-4">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-white/70 text-sm mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span key={techIndex} className="skill-badge text-xs px-2 py-0.5">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="skill-badge text-xs px-2 py-0.5">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => openProjectDetails(project)}
                  className="text-sm text-portfolio-secondary hover:text-portfolio-accent transition-colors"
                >
                  View Details
                </button>
                <div className="flex gap-2">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 glass rounded-full hover:bg-white/10 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-white" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 glass rounded-full hover:bg-white/10 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5 text-white" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        {activeProject && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-portfolio-background-alt glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl animate-fade-in">
              <div className="h-64 sm:h-80 overflow-hidden">
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">{activeProject.title}</h3>
                  <button 
                    onClick={closeProjectDetails}
                    className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                <p className="text-white/80 mb-6">{activeProject.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-portfolio-secondary mb-3">
                      <Code className="w-5 h-5" /> Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="skill-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-portfolio-secondary mb-3">
                      <Package className="w-5 h-5" /> Key Features
                    </h4>
                    <ul className="list-disc pl-5 text-white/80 space-y-1">
                      {activeProject.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10">
                  {activeProject.liveUrl && (
                    <a 
                      href={activeProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="button-primary flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                  {activeProject.githubUrl && (
                    <a 
                      href={activeProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="button-outline flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" /> View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
