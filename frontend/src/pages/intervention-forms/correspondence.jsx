import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, TextArea, DateInput } from "../../Components/TextField";

function CorrespondenceForm() {
    
    /********** TEST DATA **********/

    const [data, setData] = useState({
        form_num: "7",
        first_name: "Hephzi-Bah",
        middle_name: "Gamac",
        last_name: "Tolentino",
        ch_number: "12356473",
        dob: "2000-01-10",
        school: "",
        address: "",
        sponsor_name: "",
        subproject: "",
        sponsorship_date: "",
        identified_problem: "",
        assessment: "",
        objective: "",
        recommendation: "",
    });

    const [intervention_plan, setInterventionPlan] = useState([
        {
            action: "action 1",
            time_frame: "7 Days",
            results: "results 1",
            person_responsible: "SDW 1",
        },
        {
            action: "action 2",
            time_frame: "2 Months",
            results: "results 2",
            person_responsible: "SDW 2",
        },
        {
            action: "action 3",
            time_frame: "3 Weeks",
            results: "results 3",
            person_responsible: "SDW 3",
        },
    ]);

    /********** TEST DATA **********/

    /********** USE STATES **********/

    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [dob, setDOB] = useState(data?.dob || "");
    const [school, setSchool] = useState(data?.school || "");
    const [address, setAddress] = useState(data?.address || "");
    const [sponsor_name, setSponsorName] = useState(data?.sponsor_name || "");
    const [subproject, setSubproject] = useState(data?.subproject || "");
    const [sponsorship_date, setSponsorshipDate] = useState(
        data?.sponsorship_date || "",
    );
    const [identified_problem, setIdentifiedProblem] = useState(
        data?.identified_problem || "",
    );
    const [assessment, setAssessment] = useState(data?.assessment || "");
    const [objective, setObjective] = useState(data?.objective || "");
    const [recommendation, setRecommendation] = useState(
        data?.recommendation || "",
    );

    /********** USE STATES **********/

    return (
        <main className="flex max-w-7xl flex-col items-center justify-center gap-10 px-10">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">
                SMs, Families, and SHGs Intervention Plan
            </h3>

            {/* Sponsored Member and General Info */}
            <section className="flex w-full flex-col gap-10">
                <div className="flex w-full flex-col gap-5 rounded-[0.5rem] border border-[var(--border-color)] p-5">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">Sponsored Member</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-10">
                        <div className="flex flex-col gap-5">
                            <TextInput
                                label="Last Name"
                                value={last_name}
                                setValue={setLastName}
                            ></TextInput>
                            <TextInput
                                label="First Name"
                                value={first_name}
                                setValue={setFirstName}
                            ></TextInput>
                            <TextInput
                                label="Middle Name"
                                value={middle_name}
                                setValue={setMiddleName}
                            ></TextInput>
                            <TextInput
                                label="CH ID #"
                                value={ch_number}
                                setValue={setCHNumber}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col gap-5">
                            <DateInput
                                label="Date of Birth"
                                value={dob}
                                setValue={setDOB}
                            ></DateInput>
                            <TextInput
                                label="School"
                                value={school}
                                setValue={setSchool}
                            ></TextInput>
                            <div className="flex gap-10">
                                <p className="label-base w-44">Address</p>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="text-area"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-5 rounded-[0.5rem] border border-[var(--border-color)] p-5">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">General Information</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-10">
                        <div className="flex flex-col gap-5">
                            <TextInput
                                label="Name of Sponsor"
                                value={sponsor_name}
                                setValue={setSponsorName}
                            ></TextInput>
                            <TextInput
                                label="Sub-Project"
                                value={subproject}
                                setValue={setSubproject}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col gap-5">
                            <DateInput
                                label="Date of Sponsorship"
                                value={sponsorship_date}
                                setValue={setSponsorshipDate}
                            ></DateInput>
                        </div>
                    </div>
                </div>
            </section>

            {/* Identified Problem */}
            <section className="flex w-full items-end">
                <TextArea
                    label="SM's Identified/Expressed Problem or Need"
                    value={identified_problem}
                    setValue={setIdentifiedProblem}
                ></TextArea>
            </section>

            {/* Assessment and Objective */}
            <section className="flex w-full gap-10">
                <TextArea
                    label="SDW's Assessment"
                    value={assessment}
                    setValue={setAssessment}
                ></TextArea>
                <TextArea
                    label="Objective/s"
                    value={objective}
                    setValue={setObjective}
                ></TextArea>
            </section>

            {/* Recommendation */}
            <section className="flex w-full items-end">
                <TextArea
                    label="Recommendation"
                    sublabel="(Indicate if SM's case needs a Case Conference)"
                    value={recommendation}
                    setValue={setRecommendation}
                ></TextArea>
            </section>

            {/* Buttons */}
            <div className="flex w-[22.5rem] justify-between">
                <button className="btn-outline-rounded">Cancel</button>
                <button className="btn-primary">Create Intervention</button>
            </div>
        </main>
    );
}
export default CorrespondenceForm;
