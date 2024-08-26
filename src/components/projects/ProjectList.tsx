"use client";
import React, { useState } from 'react';
import { Plus, MoreVertical, Rocket, Clock, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const projects = [
  { id: 1, name: 'E-commerce Platform', status: 'deployed', lastDeploy: '2 hours ago' },
  { id: 2, name: 'CRM System', status: 'in progress', lastDeploy: '1 day ago' },
  { id: 3, name: 'Mobile App Backend', status: 'queued', lastDeploy: '3 days ago' },
];

const ProjectCard = ({ project, onClick }) => {
  const statusColor = {
    deployed: 'text-green-600 bg-green-100',
    'in progress': 'text-white bg-warning',
    queued: 'text-blue-600 bg-blue-100',
  };

  const StatusIcon = {
    deployed: Check,
    'in progress': Clock,
    queued: Rocket,
  };

  const Icon = StatusIcon[project.status];

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(project.id)}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            // Handle more options click
          }}
        >
          <MoreVertical size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className={`flex items-center ${statusColor[project.status]} px-3 py-1 rounded-full`}>
          <Icon size={16} className="mr-2" />
          <span className="text-sm font-medium capitalize">{project.status}</span>
        </div>
        <span className="text-sm text-gray-500">Last deploy: {project.lastDeploy}</span>
      </div>
    </div>
  );
};

const CreateProjectModal = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle project creation logic here
    console.log('Creating project:', projectName);
    setProjectName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProjectList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleProjectClick = (projectId) => {
    router.push(`/web/project`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center"
        >
          <Plus size={20} className="mr-2" />
          New Project
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={handleProjectClick}
          />
        ))}
      </div>
      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProjectList;