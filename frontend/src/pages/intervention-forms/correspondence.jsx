import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextInput, TextArea, DateInput } from "../../Components/TextField";

// API Import
import  {   fetchCorrespFormData, 
            createCorrespForm,
            addCorrespInterventionPlan,
            editCorrespForm,
        }
from '../../fetch-connections/correspFormConnection'; 

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CorrespondenceForm() {
    
    // ===== START :: Setting Data ===== //

    const query = useQuery();
    const action = query.get('action'); // "create", "edit", or "delete"
    const caseID = query.get('caseID'); 
    const formID = query.get('formID') || "";

    const [loading, setLoading] = useState(true);
    const [rawCaseData, setRawCaseData] = useState(null);
    const [rawFormData, setRawFormData] = useState(null);

    const [data, setData] = useState({
        form_num: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        ch_number: "",
        date: "",
        dob: "",
        address: "",
        name_of_sponsor: "",
        subproject: "",
        date_of_sponsorship: "",
        identified_problem: "",
        assesment: "",
        objective: "",
        recommendation: "",
    });

    const [intervention_plans, setInterventionPlan] = useState([]);

    // < START :: Auto-Filled Data > //

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            const returnData = await fetchCorrespFormData(caseID, formID);
            const caseData = returnData.sponsored_member

            console.log("Case Data: ", caseData)

            setRawCaseData(caseData);

            setData((prev) => ({
                ...prev,
                first_name: caseData.first_name || "",
                middle_name: caseData.middle_name || "",
                last_name: caseData.last_name || "",
                ch_number: caseData.sm_number || "",
                dob: caseData.dob || "",
                address: caseData.present_address || "",
                subproject: caseData.spu || "",
            }));

            setLoading(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        setFirstName(data.first_name || "");
        setMiddleName(data.middle_name || "");
        setLastName(data.last_name || "");
        setCHNumber(data.ch_number || "");
        setDOB(data.dob || "");
        setAddress(data.address || "");
        setSubproject(data.subproject || "");
    }, [data]);

    // < END :: Auto-Filled Data > //

    // < START :: View Form > //

    const viewForm = action !== 'create' ? true : false;

    if (viewForm) {
        useEffect(() => {
            const loadFormData = async () => {
                setLoading(true);
    
                const returnFormData = await fetchCorrespFormData(
                    caseID, formID
                );
                const formData = returnFormData.form;
    
                console.log("form Data", formData);
    
                setRawFormData(formData);
    
                setData((prev) => ({
                    ...prev,
                    date: formData.createdAt || "",
                    name_of_sponsor: formData.name_of_sponsor || "",
                    date_of_sponsorship: formData.date_of_sponsorship || "",
                    identified_problem: formData.identified_problem || "",
                    assesment: formData.assesment || "",
                    objective: formData.objective || "",
                    recommendation: formData.recommendation || "",
                }));
    
                setInterventionPlan(formData.intervention_plans)
        
                setLoading(false);
            };
            loadFormData();
        }, []);

        useEffect(() => {
            setSponsorName(data.name_of_sponsor || "");
            setSponsorshipDate(data.date_of_sponsorship || "");
            setIdentifiedProblem(data.identified_problem || "");
            setAssessment(data.assesment || "");
            setObjective(data.objective || "");
            setRecommendation(data.recommendation || "");
        }, [data]);
    }

    // < END :: View Form > //

    useEffect(() => {
        if (data?.date_of_sponsorship) {
            const date = new Date(data.date_of_sponsorship);
            if (!isNaN(date)) {
                setSponsorshipDate(formatter.format(date));
            }
        }
    }, [data]);

    useEffect(() => {
        if (data?.dob) {
            const date = new Date(data.dob);
            if (!isNaN(date)) {
                setDOB(formatter.format(date));
            }
        }
    }, [data]);

    const formatter = new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    // ===== END :: Setting Data ===== // 

    // ===== START :: Backend Connection ===== //
        
    // < START :: Create Form > //

    const handleCreate = async () => {
        const payload = {
            name_of_sponsor,
            date_of_sponsorship,
            identified_problem,
            assesment,
            objective,
            recommendation,
            intervention_plans
        };

        console.log("Payload: ", payload);

        const response = await createCorrespForm(caseID, payload); 
    };

    // < END :: Create Form > //

    // < START :: Edit Form > //

    const handleUpdate = async () => {
        const updatedPayload = {
            name_of_sponsor,
            date_of_sponsorship,
            identified_problem,
            assesment,
            objective,
            recommendation,
            intervention_plans
        };

        console.log("Payload: ", updatedPayload);

        const response = await editCorrespForm(formID, updatedPayload); 
    };

    // < END :: Edit Form > //

    // < START :: Delete Form > //

    /*
    const handleDelete = async () => {
        
        const response = await editCorrespForm(formID, updatedPayload); 
    };
    */

    // < END :: Delete Form > //

    // ===== END :: Backend Connection ===== //

    // ===== START :: Use States ===== // 

    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [dob, setDOB] = useState(data?.dob || "");
    const [address, setAddress] = useState(data?.address || "");
    const [name_of_sponsor, setSponsorName] = useState(data?.name_of_sponsor || "");
    const [subproject, setSubproject] = useState(data?.subproject || "");
    const [date_of_sponsorship, setSponsorshipDate] = useState(
        data?.date_of_sponsorship || "",
    );
    const [identified_problem, setIdentifiedProblem] = useState(
        data?.identified_problem || "",
    );
    const [assesment, setAssessment] = useState(data?.assesment || "");
    const [objective, setObjective] = useState(data?.objective || "");
    const [recommendation, setRecommendation] = useState(
        data?.recommendation || "",
    );

    // ===== END :: Use States ===== // 

    // ===== START :: Local Functions ===== //

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

    // ===== END :: Local Functions ===== //

    if (!data) return <div>No data found.</div>;

    return (
        <main className="flex w-full flex-col items-center justify-center gap-16 rounded-lg border border-[var(--border-color)] p-16">
            <div className="flex w-full justify-between">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-5 label-base arrow-group">
                        <div className="arrow-left-button"></div>
                        Go Back
                    </button>
                    <h4 className="header-sm self-end">Form #: {form_num}</h4>
                </div>
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
                        </div>
                        <div className="flex flex-col gap-8">
                            <TextInput
                                label="CH ID #"
                                value={ch_number}
                                disabled={true}
                            ></TextInput>
                            <DateInput
                                label="Date of Birth"
                                value={dob}
                                disabled={true}
                            ></DateInput>
                            <div className="flex gap-16">
                                <p className="label-base w-72">Address</p>
                                <textarea
                                    value={address}
                                    disabled={true}
                                    className="body-base text-area h-32 cursor-not-allowed bg-gray-200"
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
                                value={name_of_sponsor}
                                setValue={setSponsorName}
                                handleChange={handleChange("General Information")}
                            ></TextInput>
                            <TextInput
                                label="Sub-Project"
                                value={subproject}
                                setValue={setSubproject}
                                disabled={true}
                                handleChange={handleChange("General Information")}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col gap-8">
                            <DateInput
                                label="Date of Sponsorship"
                                value={date_of_sponsorship}
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
                    value={assesment}
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
                        {intervention_plans.map((item, index) => (
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
                {viewForm ? (
                    <button
                        className="btn-primary font-bold-label w-min"
                        onClick={handleUpdate}
                    >
                        Save Changes
                    </button>
                ) : (
                    <button
                        className="btn-primary font-bold-label w-min"
                        onClick={handleCreate}
                    >
                        Create Intervention
                    </button>
                )}
            </div>
        </main>
    );
}
export default CorrespondenceForm;
