"use client";
import React, { useState } from 'react';
import { ArrowLeft, GitBranch, Clock, Users, Rocket, Settings, Activity, Box } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  lastDeployed: string;
  gitBranch: string;
  team: string[];
  environments: string[];
}

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
  onDeploy: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onBack, onDeploy }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const TabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Team</h3>
              <div className="flex flex-wrap gap-2">
                {project.team.map((member, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {member}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      case 'environments':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Environments</h3>
            <div className="space-y-4">
              {project.environments.map((env, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <span className="font-medium">{env}</span>
                  <button className="text-blue-600 hover:text-blue-800">View Details</button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={20} className="mr-2" />
          Back to Projects
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{project?.name}</h1>
              <div className="flex items-center text-blue-100">
                <GitBranch size={16} className="mr-2" />
                <span className="mr-4">{project.gitBranch}</span>
                <Clock size={16} className="mr-2" />
                <span>Last deployed: {project.lastDeployed}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={onDeploy}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300"
              >
                <Rocket size={20} className="mr-2" />
                Deploy
              </button>
              <button className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-lg transition-colors duration-300">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-b">
          <nav className="flex">
            {['Overview', 'Environments', 'Analytics', 'Logs'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 font-medium ${
                  activeTab === tab.toLowerCase()
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <TabContent />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;