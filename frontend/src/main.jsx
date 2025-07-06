import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Case from "./pages/case-report-page/case.jsx";
import CaseFrontend from "./pages/case-report-page/case-frontend.jsx";
import HomeSDW from "./pages/home-sdw.jsx";
import HomeAdmin from "./pages/home-admin.jsx";
import Archive from "./pages/archive.jsx";

import FinancialAssessmentForm from "./pages/intervention-forms/financial-assessment.jsx";
import CounsellingForm from "./pages/intervention-forms/counselling.jsx";
import CorrespondenceForm from "./pages/intervention-forms/correspondence.jsx";
import HomeVisitationForm from "./pages/intervention-forms/home-visitation.jsx";
import ProgressReport from "./pages/progress-report.jsx";
import CaseClosure from "./pages/case-closure.jsx";
import "./index.css";

//we need to add routes pa here for going to other pages so the actual routes are here we add the module Case to load that page
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/testcase" element={<Case />} />

                <Route path="/case-frontend" element={<CaseFrontend />} />


                <Route path="/home-sdw" element={<HomeSDW />} />
                <Route path="/home-admin" element={<HomeAdmin />} />
                <Route path="/archive" element={<Archive />} />

                <Route
                    path="/financial-assessment-form"
                    element={<FinancialAssessmentForm />}
                />

                <Route path="/counselling-form" element={<CounsellingForm />} />
                <Route
                    path="/correspondence-form"
                    element={<CorrespondenceForm />}
                />
                <Route
                    path="/home-visitation-form"
                    element={<HomeVisitationForm />}
                />
                <Route
                    path="/progress-report"
                    element={<ProgressReport />}
                />
                <Route
                    path="/case-closure"
                    element={<CaseClosure />}
                />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);