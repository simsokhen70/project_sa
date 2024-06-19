import React, { useEffect } from 'react'
import { redirect } from 'next/navigation'

function ProtectedRoute({children}) {
    useEffect(() => {
        setTimeout(() => {
            if (!localStorage.getItem('tid')) {
                redirect('https://bizweb.kosign.dev/signin');   
            }
    }, 1000);

      }, []);
}

export default ProtectedRoute