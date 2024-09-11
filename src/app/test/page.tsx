import Image from 'next/image'
import React from 'react'
import gif from "../../../public/6LM.gif";
import DeploymentComponent from '@/components/Deploy/DeploymentComponent';
const Page = () => {
  return (
    <div className='w-full h-full mt-32'>
        <DeploymentComponent />
    </div>
  )
}

export default Page