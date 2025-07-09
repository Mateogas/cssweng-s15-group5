import { useState, useRef, useEffect } from "react";
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

    /********** FUNCTIONS **********/

    const navigate = useNavigate();

    const [savedTime, setSavedTime] = useState(null);
    const timeoutRef = useRef(null);
    const [sectionEdited, setSectionEdited] = useState("");

    const handleChange = (section) => (e) => {
        setSectionEdited(section);

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        setSavedTime(`Saved at ${timeString}`);

        if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
        setSavedTime(null);
        }, 3000);
    };

    const handleAddIntervention = () => {
        const new_intervention = {
            action: "",
            time_frame: "",
            results: "",
            person_responsible: "",
        };

        setInterventionPlan((prev) => [...prev, new_intervention]);
    };

    const updateIntervention = (index, key, value) => {
        setInterventionPlan((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [key]: value } : item,
            ),
        );
    };

    const deleteIntervention = (indexToDelete) => {
        setInterventionPlan((prev) => prev.filter((_, i) => i !== indexToDelete));
    };

    /********** FUNCTIONS **********/

    return (
        <main className="flex w-full flex-col items-center justify-center gap-16 rounded-lg border border-[var(--border-color)] p-16">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">
                SMs, Families, and SHGs Intervention Plan
            </h3>

            {/* Sponsored Member and General Info */}
            <section className="flex w-full flex-col gap-16">
                <div className="flex w-full flex-col gap-8 rounded-[0.8rem] border border-[var(--border-color)] p-8">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">Sponsored Member</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-16">
                        <div className="flex flex-col gap-8">
                            <TextInput
                                label="Last Name"
                                value={last_name}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="First Name"
                                value={first_name}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="Middle Name"
                                value={middle_name}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="CH ID #"
                                value={ch_number}
                                disabled={true}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col gap-8">
                            <DateInput
                                label="Date of Birth"
                                value={dob}
                                disabled={true}
                            ></DateInput>
                            <TextInput
                                label="School"
                                value={school}
                                setValue={setSchool}
                                handleChange={handleChange("Sponsored Member")}
                            ></TextInput>
                            <div className="flex gap-16">
                                <p className="label-base w-72">Address</p>
                                <textarea
                                    value={address}
                                    disabled={true}
                                    className="text-area h-32 cursor-not-allowed bg-gray-200"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    {savedTime && sectionEdited === "Sponsored Member" && (
                        <p className="text-sm self-end mt-2">{savedTime}</p>
                    )}
                </div>
                <div className="flex w-full flex-col gap-8 rounded-[0.8rem] border border-[var(--border-color)] p-8">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">General Information</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-16">
                        <div className="flex flex-col gap-8">
                            <TextInput
                                label="Name of Sponsor"
                                value={sponsor_name}
                                setValue={setSponsorName}
                                handleChange={handleChange("General Information")}
                            ></TextInput>
                            <TextInput
                                label="Sub-Project"
                                value={subproject}
                                setValue={setSubproject}
                                handleChange={handleChange("General Information")}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col gap-8">
                            <DateInput
                                label="Date of Sponsorship"
                                value={sponsorship_date}
                                setValue={setSponsorshipDate}
                                handleChange={handleChange("General Information")}
                            ></DateInput>
                        </div>
                    </div>
                    {savedTime && sectionEdited === "General Information" && (
                        <p className="text-sm self-end mt-2">{savedTime}</p>
                    )}
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
            <section className="flex w-full gap-16">
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

            {/* Intervention Plan */}
            <section className="flex w-full flex-col gap-16">
                <h3 className="header-md">Intervention Plan</h3>
                <div className="flex flex-col gap-2">
                    <div className="flex w-full flex-col gap-6 border-b border-[var(--border-color)]">
                        <div className="flex justify-between px-4 gap-6 pr-30">
                            <p className="label-base w-lg">Actions</p>
                            <p className="label-base w-sm">Time Frame</p>
                            <p className="label-base w-lg">Results</p>
                            <p className="label-base w-lg">
                                Person Responsible
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col flex-wrap gap-4">
                        {intervention_plan.map((item, index) => (
                            <div
                                key={index}
                                className="flex w-full justify-between items-center px-4 gap-6"
                            >
                                <div className="flex w-lg">
                                    <TextArea
                                        value={item.action}
                                        handleChange={(e) => {
                                            updateIntervention(
                                                index,
                                                "action",
                                                e.target.value,
                                            );
                                            handleChange("Intervention Plan")(e);
                                        }}
                                        showTime={false}
                                    ></TextArea>
                                </div>
                                <div className="flex w-sm">
                                    <TextArea
                                        value={item.time_frame}
                                        handleChange={(e) => {
                                            updateIntervention(
                                                index,
                                                "time_frame",
                                                e.target.value,
                                            );
                                            handleChange("Intervention Plan")(e);
                                        }}
                                        showTime={false}
                                    ></TextArea>
                                </div>
                                <div className="flex w-lg">
                                    <TextArea
                                        value={item.results}
                                        handleChange={(e) => {
                                            updateIntervention(
                                                index,
                                                "results",
                                                e.target.value,
                                            );
                                            handleChange("Intervention Plan")(e);
                                        }}
                                        showTime={false}
                                    ></TextArea>
                                </div>
                                <div className="flex w-lg">
                                    <TextArea
                                        value={item.person_responsible}
                                        handleChange={(e) => {
                                            updateIntervention(
                                                index,
                                                "person_responsible",
                                                e.target.value,
                                            );
                                            handleChange("Intervention Plan")(e);
                                        }}
                                        showTime={false}
                                    ></TextArea>
                                </div>
                                <button
                                    onClick={() => deleteIntervention(index)}
                                    className="icon-button-setup trash-button px-10"
                                ></button>
                            </div>
                        ))}
                    </div>
                    {savedTime && sectionEdited === "Intervention Plan" && (
                        <p className="text-sm self-end mt-2">{savedTime}</p>
                    )}
                </div>
                <button
                    name="add_intervention"
                    id="add_intervention"
                    onClick={handleAddIntervention}
                    className="btn-primary font-bold-label self-center"
                >
                    Add Intervention
                </button>
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
            <div className="flex w-full justify-center gap-20">
                <button
                    className="btn-outline font-bold-label"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </button>
                <button className="btn-primary font-bold-label" onClick={() => navigate(-1)}>
                    Create Intervention
                </button>
            </div>
        </main>
    );
}
export default CorrespondenceForm;
