import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { TextInput, TextArea } from "../../Components/TextField";

import FinancialAssessmentForm from "./financial-assessment";
import CounselingForm from "./counseling";
import CorrespondenceForm from "./correspondence";
import HomeVisitationForm from "./home-visitation";

function InterventionForm() {
    /********** TEST DATA **********/

    const interventions = [
        {
            name: "Home Visitation",
            route: "home-visitation-form",
        },
        {
            name: "Counseling",
            route: "counseling-form",
        },
        {
            name: "Financial Assistance",
            route: "financial-assessment-form",
        },
        {
            name: "Correspondence",
            route: "correspondence-form",
        },
    ];

    /********** TEST DATA **********/

    /********** USE STATES **********/

    const { caseID } = useParams();
    const defaultSelection = "";
    const [intervention_selected, setInterventionSelected] =
        useState(defaultSelection);

    console.log("Case ID: ", caseID);

    const navigate = useNavigate();

    const handleSelectIntervention = (interventionName) => {
        const selected = interventions.find(
            (intervention) => intervention.name === interventionName
        );

        if (!selected) return;
    };

    /********** USE STATES **********/

    return (
        <main className="flex w-full flex-col items-center justify-center gap-16 rounded-lg p-16">
            <section className="flex w-full justify-between">
                <h3 className="header-md self-start">
                    Intervention/Helping Plan
                </h3>
                <select
                    name="services"
                    id="services"
                    value={intervention_selected}
                    onChange={(e) => {
                        setInterventionSelected(e.target.value);
                        {/*handleSelectIntervention(e.target.value);*/}
                    }}
                    className="label-base text-input max-w-96"
                >
                    <option value="" className="body-base">
                        Select Intervention
                    </option>
                    {interventions.map((intervention, index) => (
                        <option
                            key={index}
                            value={intervention.name}
                            className="body-base"
                        >
                            {intervention.name}
                        </option>
                    ))}
                </select>
            </section>

            <section className="flex w-full justify-center">
                {intervention_selected === "Home Visitation" && (
                    <HomeVisitationForm />
                )}
                {intervention_selected === "Counseling" && <CounselingForm />}
                {intervention_selected === "Financial Assistance" && (
                    <FinancialAssessmentForm />
                )}
                {intervention_selected === "Correspondence" && (
                    <CorrespondenceForm />
                )}
            </section>
        </main>
    );
}

export default InterventionForm;
