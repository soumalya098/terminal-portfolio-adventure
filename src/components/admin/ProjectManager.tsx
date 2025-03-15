
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Pencil, Trash2, X, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import ImageUploader from './ImageUploader';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

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
  const [error, setError] = useState<string | null>(null);

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setError(null);
        const projectsSnapshot = await getDocs(collection(db, "projects"));
        const projectsList = projectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        
        // Sort projects by createdAt (newest first)
        projectsList.sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() ? a.createdAt.toDate() : new Date(0);
          const dateB = b.createdAt?.toDate?.() ? b.createdAt.toDate() : new Date(0);
          return dateB.getTime() - dateA.getTime();
        });
        
        setProjects(projectsList);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
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

  // Technology and feature management functions
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');

  const addTechnology = () => {
    if (!editingProject || !newTech.trim()) return;
    
    setEditingProject(prev => {
      if (prev) {
        return {
          ...prev,
          technologies: [...prev.technologies, newTech.trim()]
        };
      }
      return null;
    });
    setNewTech('');
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

  const addFeature = () => {
    if (!editingProject || !newFeature.trim()) return;
    
    setEditingProject(prev => {
      if (prev) {
        return {
          ...prev,
          features: [...prev.features, newFeature.trim()]
        };
      }
      return null;
    });
    setNewFeature('');
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

  if (error) {
    return (
      <div className="text-center p-10 text-red-400">
        <AlertCircle size={40} className="mx-auto mb-4" />
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-portfolio-accent rounded"
        >
          Try Again
        </button>
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
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        className="flex-grow bg-white/5 border border-white/10 rounded-l-md p-3 text-white"
                        placeholder="e.g., React, Node.js"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTechnology();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={addTechnology}
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
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        className="flex-grow bg-white/5 border border-white/10 rounded-l-md p-3 text-white"
                        placeholder="e.g., User authentication"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addFeature();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={addFeature}
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
            <div className="overflow-x-auto">
              <Table className="w-full border-collapse text-white">
                <TableHeader>
                  <TableRow className="border-b border-white/10">
                    <TableHead className="text-white">Project</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-white text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map(project => (
                    <TableRow 
                      key={project.id} 
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 rounded overflow-hidden">
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{project.title}</div>
                            <div className="text-xs text-white/60 line-clamp-1">{project.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {project.featured ? (
                          <span className="px-2 py-1 bg-portfolio-accent/20 text-portfolio-accent rounded-full text-xs">
                            Featured
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-white/10 text-white/60 rounded-full text-xs">
                            Standard
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {project.createdAt?.toDate ? 
                          new Date(project.createdAt.toDate()).toLocaleDateString() : 
                          'Unknown date'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
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
                        
                        {showDeleteConfirm === project.id && (
                          <div className="absolute right-10 mt-2 p-3 border border-red-500/30 rounded bg-black/90 text-sm z-10 w-60">
                            <div className="flex items-start gap-2">
                              <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
