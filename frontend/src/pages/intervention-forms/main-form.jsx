import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { TextInput, TextArea } from "../../Components/TextField";

import FinancialAssessmentForm from "./financial-assessment";
import CounsellingForm from "./counselling";
import CorrespondenceForm from "./correspondence";
import HomeVisitationForm from "./home-visitation";

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

    const [searchParams] = useSearchParams();
    const defaultSelection = searchParams.get("selected") || "";
    const [intervention_selected, setInterventionSelected] = useState(defaultSelection);

    /********** USE STATES **********/

    return (
        <main className="flex w-full flex-col items-center justify-center gap-16 rounded-lg p-32">
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
