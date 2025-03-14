
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../config/firebase';
import ImageUploader from '../components/admin/ImageUploader';
import ProjectManager from '../components/admin/ProjectManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProjectFormData = {
  title: string;
  description: string;
  image: string;
  images: string[];
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
};

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectData, setProjectData] = useState<ProjectFormData>({
    title: '',
    description: '',
    image: '',
    images: [],
    technologies: [],
    features: [],
    liveUrl: '',
    githubUrl: '',
    featured: false,
  });
  const [newTechnology, setNewTechnology] = useState('');
  const [newFeature, setNewFeature] = useState('');

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/');
      toast.error("Unauthorized access. Please use the terminal to access admin page.");
    }
  }, [navigate]);

  // Set the main image whenever images array changes
  useEffect(() => {
    if (projectData.images.length > 0) {
      setProjectData(prev => ({ ...prev, image: prev.images[0] }));
    }
  }, [projectData.images]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProjectData(prev => ({ ...prev, [name]: checked }));
  };

  const addTechnology = () => {
    if (newTechnology.trim()) {
      setProjectData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const removeTechnology = (index: number) => {
    setProjectData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setProjectData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setProjectData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const projectToSave = {
        ...projectData,
        createdAt: serverTimestamp(),
      };
      
      if (!projectToSave.title || !projectToSave.description || projectToSave.images.length === 0) {
        toast.error("Please fill in all required fields and upload at least one image");
        setIsSubmitting(false);
        return;
      }
      
      // Log the attempt to help with debugging
      console.log("Attempting to save project to Firestore:", projectToSave);
      
      await addDoc(collection(db, "projects"), projectToSave);
      
      toast.success("Project added successfully!");
      setProjectData({
        title: '',
        description: '',
        image: '',
        images: [],
        technologies: [],
        features: [],
        liveUrl: '',
        githubUrl: '',
        featured: false,
      });
    } catch (error) {
      console.error("Error adding project:", error);
      if (error instanceof Error) {
        toast.error(`Error adding project: ${error.message}`);
        console.log("Detailed error information:", error);
      } else {
        toast.error("An unknown error occurred when adding the project");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/');
    toast.info("Logged out successfully");
  };

  // Fix: Correctly handle the image array update by ensuring the type is string[]
  const handleImagesUpdate = (newImages: string[]) => {
    setProjectData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  return (
    <div className="min-h-screen py-20">
      <div className="section-container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold heading-gradient">Admin Dashboard</h1>
          <button 
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="glass p-6 rounded-xl animate-fade-in">
          <Tabs defaultValue="add" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="add" className="text-base">Add New Project</TabsTrigger>
              <TabsTrigger value="manage" className="text-base">Manage Projects</TabsTrigger>
            </TabsList>
            
            <TabsContent value="add">
              <h2 className="text-2xl font-semibold mb-6 border-l-4 border-portfolio-accent pl-3">
                Add New Project
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white mb-2">Project Title <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        name="title"
                        value={projectData.title}
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
                        value={projectData.liveUrl}
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
                        value={projectData.githubUrl}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white"
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={projectData.featured}
                        onChange={handleCheckboxChange}
                        className="mr-2 h-5 w-5"
                      />
                      <label htmlFor="featured" className="text-white">
                        Featured Project
                      </label>
                    </div>
                    
                    <ImageUploader 
                      images={projectData.images} 
                      setImages={handleImagesUpdate}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white mb-2">Description <span className="text-red-400">*</span></label>
                      <textarea
                        name="description"
                        value={projectData.description}
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
                          value={newTechnology}
                          onChange={(e) => setNewTechnology(e.target.value)}
                          className="flex-grow bg-white/5 border border-white/10 rounded-l-md p-3 text-white"
                          placeholder="e.g., React, Node.js"
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
                        {projectData.technologies.map((tech, index) => (
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
                        {projectData.features.map((feature, index) => (
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
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="button-primary px-8 py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Adding Project...' : 'Add Project'}
                  </button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="manage">
              <ProjectManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
