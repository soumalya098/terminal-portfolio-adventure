
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Pencil, Trash2, X, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import ImageUploader from './ImageUploader';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: any;
};

const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsSnapshot = await getDocs(collection(db, "projects"));
        const projectsList = projectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        
        // Sort projects by createdAt (newest first)
        projectsList.sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(0);
          const dateB = b.createdAt?.toDate?.() || new Date(0);
          return dateB.getTime() - dateA.getTime();
        });
        
        setProjects(projectsList);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleEditProject = (project: Project) => {
    setEditingProject({ ...project });
  };

  const handleUpdateProject = async () => {
    if (!editingProject) return;
    
    setIsUpdating(true);
    try {
      const projectRef = doc(db, "projects", editingProject.id);
      const { id, ...projectData } = editingProject;
      
      await updateDoc(projectRef, projectData);
      
      // Update the projects list
      setProjects(prevProjects => 
        prevProjects.map(p => 
          p.id === id ? editingProject : p
        )
      );
      
      toast.success("Project updated successfully");
      setEditingProject(null);
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
      setShowDeleteConfirm(null);
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingProject) return;
    
    const { name, value } = e.target;
    setEditingProject(prev => prev ? ({ ...prev, [name]: value }) : null);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProject) return;
    
    const { name, checked } = e.target;
    setEditingProject(prev => prev ? ({ ...prev, [name]: checked }) : null);
  };

  const handleImagesUpdate = (newImages: string[]) => {
    if (!editingProject) return;
    
    setEditingProject(prev => {
      if (prev) {
        return {
          ...prev,
          images: newImages,
          image: newImages.length > 0 ? newImages[0] : prev.image
        };
      }
      return null;
    });
  };

  const addTechnology = (technology: string) => {
    if (!editingProject || !technology.trim()) return;
    
    setEditingProject(prev => {
      if (prev) {
        return {
          ...prev,
          technologies: [...prev.technologies, technology.trim()]
        };
      }
      return null;
    });
  };

  const removeTechnology = (index: number) => {
    if (!editingProject) return;
    
    setEditingProject(prev => {
      if (prev) {
        return {
          ...prev,
          technologies: prev.technologies.filter((_, i) => i !== index)
        };
      }
      return null;
    });
  };

  const addFeature = (feature: string) => {
    if (!editingProject || !feature.trim()) return;
    
    setEditingProject(prev => {
      if (prev) {
        return {
          ...prev,
          features: [...prev.features, feature.trim()]
        };
      }
      return null;
    });
  };

  const removeFeature = (index: number) => {
    if (!editingProject) return;
    
    setEditingProject(prev => {
      if (prev) {
        return {
          ...prev,
          features: prev.features.filter((_, i) => i !== index)
        };
      }
      return null;
    });
  };

  const cancelEditing = () => {
    setEditingProject(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="w-8 h-8 border-2 border-portfolio-accent border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-white">Loading projects...</span>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6 border-l-4 border-portfolio-accent pl-3">
        Manage Existing Projects
      </h2>
      
      {projects.length === 0 ? (
        <div className="glass p-8 text-center">
          <p className="text-white/80">No projects found. Add your first project using the form above.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {editingProject ? (
            <div className="glass p-6 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium text-white">Editing: {editingProject.title}</h3>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="p-2 rounded-full hover:bg-white/10"
                >
                  <X size={20} className="text-white/70" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">Project Title <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      name="title"
                      value={editingProject.title}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Live Demo URL (Optional)</label>
                    <input
                      type="url"
                      name="liveUrl"
                      value={editingProject.liveUrl || ''}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white"
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">GitHub URL (Optional)</label>
                    <input
                      type="url"
                      name="githubUrl"
                      value={editingProject.githubUrl || ''}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured-edit"
                      name="featured"
                      checked={editingProject.featured}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-5 w-5"
                    />
                    <label htmlFor="featured-edit" className="text-white">
                      Featured Project
                    </label>
                  </div>
                  
                  <ImageUploader 
                    images={editingProject.images} 
                    setImages={handleImagesUpdate}
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">Description <span className="text-red-400">*</span></label>
                    <textarea
                      name="description"
                      value={editingProject.description}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white h-32"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Technologies</label>
                    <div className="flex">
                      <input
                        type="text"
                        id="new-tech-edit"
                        className="flex-grow bg-white/5 border border-white/10 rounded-l-md p-3 text-white"
                        placeholder="e.g., React, Node.js"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTechnology((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('new-tech-edit') as HTMLInputElement;
                          addTechnology(input.value);
                          input.value = '';
                        }}
                        className="bg-portfolio-accent px-4 rounded-r-md"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {editingProject.technologies.map((tech, index) => (
                        <div key={index} className="skill-badge flex items-center">
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(index)}
                            className="ml-2 text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Features</label>
                    <div className="flex">
                      <input
                        type="text"
                        id="new-feature-edit"
                        className="flex-grow bg-white/5 border border-white/10 rounded-l-md p-3 text-white"
                        placeholder="e.g., User authentication"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addFeature((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('new-feature-edit') as HTMLInputElement;
                          addFeature(input.value);
                          input.value = '';
                        }}
                        className="bg-portfolio-accent px-4 rounded-r-md"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      {editingProject.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/5 p-2 rounded">
                          <span>{feature}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-xs text-red-400"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-4 py-2 border border-white/20 rounded text-white hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateProject}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-portfolio-accent rounded text-white flex items-center gap-2 hover:bg-portfolio-accent/80 transition-colors"
                >
                  {isUpdating ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white border-r-transparent animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div key={project.id} className="glass p-4 hover:shadow-[0_5px_20px_rgba(157,70,255,0.15)] transition-all duration-300">
                  <div className="relative h-40 mb-3 rounded overflow-hidden border border-white/10">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                    {project.featured && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-portfolio-accent/90 text-white text-xs rounded">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-medium text-white mb-2">{project.title}</h3>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/80">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/80">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        title="Edit project"
                      >
                        <Pencil size={16} className="text-white" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(project.id)}
                        className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 size={16} className="text-white" />
                      </button>
                    </div>
                    
                    <span className="text-xs text-white/50">
                      {project.createdAt?.toDate ? 
                        new Date(project.createdAt.toDate()).toLocaleDateString() : 
                        'Unknown date'}
                    </span>
                  </div>
                  
                  {showDeleteConfirm === project.id && (
                    <div className="mt-3 p-2 border border-red-500/30 rounded bg-red-500/10 text-sm">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={16} className="text-red-400 mt-0.5" />
                        <div>
                          <p className="text-white mb-2">Are you sure you want to delete this project?</p>
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => setShowDeleteConfirm(null)}
                              className="px-2 py-1 text-xs bg-white/10 rounded hover:bg-white/20 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="px-2 py-1 text-xs bg-red-500/70 text-white rounded hover:bg-red-500 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
