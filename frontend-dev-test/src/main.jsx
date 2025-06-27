import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Case from './pages/case-report-page/case.jsx'
import CaseFrontend from './pages/case-report-page/case-frontend.jsx'
import CaseListing from './pages/case-report-page/case-listing.jsx'
import CaseCreate from './pages/case-report-page/case-create.jsx'
import './index.css'

//we need to add routes pa here for going to other pages so the actual routes are here we add the module Case to load that page
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cases" element={<CaseListing />} />
        <Route path="/case-create" element={<CaseCreate />} />
        <Route path="/cases/:id" element={<CaseFrontend />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)