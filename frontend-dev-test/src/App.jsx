import { useState } from 'react'

import viteLogo from '/vite.svg'            // Remove this if not used
import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()
  
  return (
    <>
      <h1 style={{color: 'red', fontSize: '32px'}}>TEST HEADER</h1>
      <div>
        <button 
          onClick={() => navigate('/case-frontend/68496470eaa08161083d1afe')}
          style={{ 
            padding: '20px', 
            backgroundColor: 'blue', 
            color: 'white',
            fontSize: '20px'
          }}
        >
          Test getting Case-profiles
        </button>
      </div>
    </>
  )
}

export default App