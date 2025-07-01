import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import Case from './pages/case-report-page/case.jsx'
import CaseFrontend from './pages/case-report-page/case-frontend.jsx'
import HomeSDW from './pages/home-sdw.jsx'
import HomeAdmin from './pages/home-admin.jsx'
import Archive from './pages/archive.jsx'

//we need to add routes pa here for going to other pages so the actual routes are here we add the module Case to load that page
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/testcase" element={<Case />} />
        <Route path="/case-frontend" element={<CaseFrontend />} />

        <Route path="/home-sdw" element={<HomeSDW />} />
        <Route path="/home-admin" element={<HomeAdmin />} />
        <Route path="/archive" element={<Archive />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)