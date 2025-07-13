// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import {useNavigate} from 'react-router-dom'
// import './App.css'

// function App() {
//   const navigate = useNavigate()//we actually need this for routing to go to other pages since react is a single page only

//   return (
//     <>
//       <h1 style={{color: 'red', fontSize: '32px'}}>TEST HEADER</h1>
//       <div>
//         <button 
//           onClick={() => navigate('/testcase')}
//           style={{ 
//             padding: '20px', 
//             backgroundColor: 'blue', 
//             color: 'white',
//             fontSize: '20px'
//           }}
//         >
//           Test getting Case-profiles
//         </button>
//       </div>
//     </>
//   )
// }

// export default App

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSession } from './fetch-connections/account-connection';
import HomeSDW from './pages/home-sdw';
import HomeAdmin from './pages/home-admin';
import Login from './pages/login';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetchSession();
        console.log("Session:", res);

        if (res.user) {
          setUser(res.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Login />;  // or navigate to '/login'
  }

  if (user.role === 'admin') {
    return <HomeAdmin />;
  } else if (user.role === 'sdw') {
    return <HomeSDW />;
  } else {
    return <div>Unknown role</div>;
  }
}

export default App;
