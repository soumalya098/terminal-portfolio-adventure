
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Code, Package, Image as ImageIcon } from 'lucide-react';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../config/firebase';
import ProjectGallery from '../components/projects/ProjectGallery';

type Project = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  images?: string[];
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  
  // Empty default projects array
  const defaultProjects: Project[] = [];

  // Load projects from Firebase
  useEffect(() => {
    const loadProjects = async () => {
      setIsPageLoading(true);
      try {
        const projectsQuery = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc")
        );
        
        const querySnapshot = await getDocs(projectsQuery);
        const firebaseProjects = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || '',
            description: data.description || '',
            image: data.image || '',
            images: Array.isArray(data.images) ? data.images : [data.image].filter(Boolean),
            technologies: Array.isArray(data.technologies) ? data.technologies : [],
            features: Array.isArray(data.features) ? data.features : [],
            liveUrl: data.liveUrl,
            githubUrl: data.githubUrl,
            featured: !!data.featured
          } as Project;
        });
        
        setAllProjects([...defaultProjects, ...firebaseProjects]);
      } catch (error) {
        console.error('Error loading projects:', error);
        setAllProjects(defaultProjects);
      } finally {
        setIsPageLoading(false);
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

  const openGallery = () => {
    if (activeProject?.images && activeProject.images.length > 0) {
      setGalleryOpen(true);
    }
  };

  const featuredProjects = allProjects.filter(project => project.featured);
  const regularProjects = allProjects.filter(project => !project.featured);

  return (
    <div className="min-h-screen py-20">
      <div className="section-container">
        <h1 className="text-4xl font-bold heading-gradient mb-4 text-center animate-fade-in">
          Projects
        </h1>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          Here are some of the projects I've worked on. Each project represents different 
          skills and technologies I've mastered throughout my journey.
        </p>

        {isPageLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="glass p-8 rounded-full animate-pulse">
              <span className="text-white/70">Loading projects...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Projects */}
            {featuredProjects.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6 border-l-4 border-portfolio-accent pl-3 animate-fade-in">
                  Featured Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  {featuredProjects.map((project, index) => (
                    <div 
                      key={project.id} 
                      className="glass overflow-hidden transform transition-all duration-500 hover:scale-[1.02] animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="h-60 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                        <p className="text-white/70 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="skill-badge transition-all duration-300 hover:bg-white/10">
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
                                className="p-2 glass rounded-full hover:bg-white/10 transition-colors transform hover:scale-110 duration-300"
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
                                className="p-2 glass rounded-full hover:bg-white/10 transition-colors transform hover:scale-110 duration-300"
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
            ) : null}

            {/* Other Projects */}
            {regularProjects.length > 0 ? (
              <>
                <h2 className="text-2xl font-semibold text-white mb-6 border-l-4 border-portfolio-accent pl-3 animate-fade-in">
                  All Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularProjects.map((project, index) => (
                    <div 
                      key={project.id} 
                      className="project-card transform transition-all duration-500 hover:scale-[1.03] animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="h-48 overflow-hidden rounded-lg mb-4">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                      <p className="text-white/70 text-sm mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span key={techIndex} className="skill-badge text-xs px-2 py-0.5 transition-all duration-300 hover:bg-white/10">
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
                              className="p-1.5 glass rounded-full hover:bg-white/10 transition-colors transform hover:scale-110 duration-300"
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
                              className="p-1.5 glass rounded-full hover:bg-white/10 transition-colors transform hover:scale-110 duration-300"
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
              </>
            ) : (
              <div className="glass p-10 text-center animate-fade-in">
                <h2 className="text-2xl font-semibold text-white mb-4">No Projects Yet</h2>
                <p className="text-white/70 mb-6">
                  I'm currently working on adding projects to my portfolio.
                  Check back soon to see what I've been building!
                </p>
                <div className="flex justify-center">
                  <Link to="/contact" className="button-primary transform transition hover:scale-105 duration-300 flex items-center gap-2">
                    Let's Connect <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            )}
          </>
        )}

        {/* Project Details Modal */}
        {activeProject && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-40 backdrop-blur-sm animate-fade-in">
            <div className="bg-portfolio-background-alt glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl animate-fade-in">
              <div className="h-64 sm:h-80 overflow-hidden relative group">
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {activeProject.images && activeProject.images.length > 1 && (
                  <button
                    onClick={openGallery}
                    className="absolute bottom-4 right-4 p-3 glass rounded-lg bg-black/50 text-white flex items-center gap-2 hover:bg-black/70 transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>View Gallery ({activeProject.images.length})</span>
                  </button>
                )}
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">{activeProject.title}</h3>
                  <button 
                    onClick={closeProjectDetails}
                    className="p-2 glass rounded-full hover:bg-white/10 transition-colors transform hover:scale-110 duration-300"
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
                      className="button-primary flex items-center gap-2 transform transition hover:scale-105 duration-300"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                  {activeProject.githubUrl && (
                    <a 
                      href={activeProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="button-outline flex items-center gap-2 transform transition hover:scale-105 duration-300"
                    >
                      <Github className="w-4 h-4" /> View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Gallery Modal */}
        {activeProject && activeProject.images && (
          <ProjectGallery 
            images={activeProject.images} 
            isOpen={galleryOpen} 
            onClose={() => setGalleryOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Projects;
