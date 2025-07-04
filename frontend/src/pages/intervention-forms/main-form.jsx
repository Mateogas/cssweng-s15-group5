import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, TextArea } from "../../Components/TextField";
import FinancialAssessmentForm from "./financial-assessment";
import CounsellingForm from "./counselling";
import CorrespondenceForm from "./correspondence";
import HomeVisitationForm from "./home-visitation";
import ProgressReport from "../progress-report";
import CaseClosure from "../case-closure";

function InterventionForm() {
    /********** TEST DATA **********/

    const interventions = [
        "Home Visitation",
        "Counselling",
        "Financial Assistance",
        "Correspondence",
    ];

    /********** TEST DATA **********/

    /********** USE STATES **********/

    const [intervention_selected, setInterventionSelected] = useState("");

    /********** USE STATES **********/

    return (
        <main className="flex flex-col items-center justify-center gap-10 rounded-lg px-32 py-20">
            <section className="flex w-full justify-between">
                <h3 className="header-md self-start">
                    Intervention/Helping Plan
                </h3>
                <select
                    name="services"
                    id="services"
                    value={intervention_selected}
                    onChange={(e) => setInterventionSelected(e.target.value)}
                    className="label-base text-input max-w-96"
                >
                    <option value="" className="body-base">
                        Select Intervention
                    </option>
                    {interventions.map((service, index) => (
                        <option
                            key={index}
                            value={service}
                            className="body-base"
                        >
                            {service}
                        </option>
                    ))}
                </select>
            </section>

            <section className="flex w-full justify-center">
                {intervention_selected === "Home Visitation" && <HomeVisitationForm />}
                {intervention_selected === "Counselling" && <CounsellingForm />}
                {intervention_selected === "Financial Assistance" &&
                    <FinancialAssessmentForm />}
                {intervention_selected === "Correspondence" &&
                    <CorrespondenceForm />}
            </section>
        </main>
    );
}

export default InterventionForm;
