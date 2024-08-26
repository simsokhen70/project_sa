"use client";
import React from 'react';
import ProjectDetails from "@/components/projects/ProjectDetail";
import { useRouter } from 'next/navigation';

const ProjectPage: React.FC = () => {
  const router = useRouter();
  const project = {
    id: 1,
    name: 'E-commerce Platform',
    description: 'A fully-featured online store with inventory management and payment processing.',
    status: 'Live',
    lastDeployed: '2 hours ago',
    gitBranch: 'main',
    team: ['John Doe', 'Jane Smith', 'Bob Johnson'],
    environments: ['Production', 'Staging', 'Development']
  };

  const handleBack = () => {
    router.push('/web')
  };

  const handleDeploy = () => {
    
  };

  return (
    <ProjectDetails
      project={project}
      onBack={handleBack}
      onDeploy={handleDeploy}
    />
  );
};

export default ProjectPage;