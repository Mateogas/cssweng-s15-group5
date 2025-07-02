import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {useNavigate} from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()//we actually need this for routing to go to other pages since react is a single page only

  return (
    <>
      <h1 style={{color: 'red', fontSize: '32px'}}>TEST HEADER</h1>
      <div>
        <button 
          onClick={() => navigate('/')}
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
