import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TextInput, TextArea, DateInput } from "../../Components/TextField";
import Signature from "../../Components/Signature";

// API Import
import  {   fetchCorrespFormData, 
            createCorrespForm,
            addCorrespInterventionPlan,
            editCorrespForm,
            fetchAutoFillCorrespData,
            deleteCorrespInterventionForm
        }
from '../../fetch-connections/correspFormConnection'; 

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CorrespondenceForm() {
    
    // ===== START :: Setting Data ===== //

    const query = useQuery();
    const action = query.get('action') || ""; 
    const caseID = query.get('caseID') || ""; 
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

            const returnData = await fetchAutoFillCorrespData(caseID);
            const caseData = returnData.returningData;

            console.log("Case Data: ", caseData)

            setRawCaseData(caseData);

            setData((prev) => ({
                ...prev,
                first_name: caseData.first_name || "",
                middle_name: caseData.middle_name || "",
                last_name: caseData.last_name || "",
                ch_number: caseData.sm_number || "",
                dob: caseData.dob || "",
                address: caseData.address || "",
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
                console.log("FORM ID: ", formID);
    
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

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        const requiredFields = {
            name_of_sponsor,
            date_of_sponsorship,
            identified_problem,
            assesment,
            objective,
            recommendation,
            intervention_plans
        };

        Object.entries(requiredFields).forEach(([field, value]) => {

            if (
                value === undefined ||               
                value === null ||                    
                value === "" ||                    
                (typeof value === "string" && !value.trim())
            ) {
            newErrors[field] = "Missing input";
            }
        });

        if (!Array.isArray(intervention_plans) || intervention_plans.length === 0) {
            newErrors.intervention_plans = "At least one intervention is required";
        } else {
            intervention_plans.forEach((plan, index) => {
            if (!plan.action || !plan.action.trim()) {
                newErrors[`intervention_plans_${index}_action`] = `Missing input`;
            }
            if (!plan.time_frame || !plan.time_frame.trim()) {
                newErrors[`intervention_plans_${index}_time_frame`] = `Missing input`;
            }
            if (!plan.results || !plan.results.trim()) {
                newErrors[`intervention_plans_${index}_results`] = `Missing input`;
            }
            if (!plan.person_responsible || !plan.person_responsible.trim()) {
                newErrors[`intervention_plans_${index}_person_responsible`] = `Missing input`;
            }
            });
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        const isValid = validateForm();

        if (!isValid) {
            // window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        };

        try {
            console.log("Form Submitted");
            await handleCreate();
            navigate(`/case/${caseID}`);
        } catch (err) {
            console.error("Submission failed:", err);
        }

    };

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

    
    const handleDelete = async () => {
        
        const response = await deleteCorrespInterventionForm(formID); 
    };
    

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
    const [showConfirm, setShowConfirm] = useState(false);
    

    // ===== END :: Use States ===== // 

    // ===== START :: Local Functions ===== //

    const navigate = useNavigate();

    const [savedTime, setSavedTime] = useState(null);
    const timeoutRef = useRef(null);
    const [sectionEdited, setSectionEdited] = useState("");

    const [showErrorOverlay, setShowErrorOverlay] = useState(false);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
        setShowErrorOverlay(true);

        const timer = setTimeout(() => {
            setShowErrorOverlay(false);
        }, 2000);

        return () => clearTimeout(timer);
        }
    }, [errors]);

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
                        onClick={() => navigate(`/case/${caseID}`)} 
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
                                error={errors["name_of_sponsor"]}
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
                                error={errors["date_of_sponsorship"]}
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
                    error={errors["identified_problem"]}
                ></TextArea>
            </section>

            {/* Assessment and Objective */}
            <section className="flex w-full gap-16">
                <TextArea
                    label="SDW's Assessment"
                    value={assesment}
                    setValue={setAssessment}
                    error={errors["assesment"]}
                ></TextArea>
                <TextArea
                    label="Objective/s"
                    value={objective}
                    setValue={setObjective}
                    error={errors["objective"]}
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
                    <div className={`flex flex-col flex-wrap gap-4 ${errors["intervention_plans"] ? "py-12 border rounded-xl border-red-500" : ""}`}>
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
                                        error={errors[`intervention_plans_${index}_action`]}
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
                                        error={errors[`intervention_plans_${index}_time_frame`]}
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
                                        error={errors[`intervention_plans_${index}_results`]}
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
                                        error={errors[`intervention_plans_${index}_person_responsible`]}
                                    ></TextArea>
                                </div>
                                <button
                                    onClick={() => deleteIntervention(index)}
                                    className="icon-button-setup trash-button px-10"
                                ></button>
                            </div>
                        ))}
                    </div>
                    {errors["intervention_plans"] && (
                        <div className="text-red-500 text-sm self-end">
                            {errors["intervention_plans"]}
                        </div>
                    )}
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
                    error={errors["recommendation"]}
                ></TextArea>
            </section>

            {/* Signature */}
            <div className="flex w-full flex-col gap-16 px-16 pt-24">
                <div className="flex w-full justify-between">
                    <Signature label="Prepared by:" signer="Social Development Worker"></Signature>
                    <Signature label="Attested by:" signer="SM/Parent/SHG Leader"></Signature>
                </div>
                
                <div className="flex w-full justify-between">
                    <Signature label="Approved by:" signer="SPU Coordinator"></Signature>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex w-full justify-center gap-20">
                {viewForm ? (
                    <>
                        <button
                            className="btn-outline font-bold-label"
                            onClick={() => 
                                setShowConfirm(true)
                            }
                        >
                            Delete Form
                        </button>
                        <button
                            className="btn-primary font-bold-label w-min"
                            onClick={async () => {
                                await handleUpdate();
                                navigate(`/case/${caseID}`);
                            }}
                        >
                            Save Changes
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="btn-outline font-bold-label"
                            onClick={() => navigate(`/case/${caseID}`)}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn-primary font-bold-label w-min"
                            onClick={async (e) => {
                                await handleSubmit(e);
                            }}
                        >
                            Create Intervention
                        </button>
                    </>
                )}

                {/* Confirm Delete Form */}
                {showConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="flex flex-col bg-white p-16 rounded-lg shadow-xl w-full max-w-3xl mx-4 gap-8">
                            <h2 className="header-md font-semibold mb-4">Delete Form</h2>
                            <p className="label-base mb-6">Are you sure you want to delete this form?</p>
                            <div className="flex justify-end gap-4">
                                
                                {/* Cancel */}
                                <button
                                    onClick={() => 
                                        setShowConfirm(false)
                                    }
                                    className="btn-outline font-bold-label"
                                >
                                    Cancel
                                </button>

                                {/* Delete Form */}
                                <button
                                    onClick={async () => {
                                        await handleDelete();
                                        setShowConfirm(false);
                                        navigate(`/case/${caseID}`);
                                    }}
                                    className="btn-primary font-bold-label"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Missing / Invalid Input */}
                {showErrorOverlay && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full mx-4 p-8 flex flex-col items-center gap-12
                                    animate-fadeIn scale-100 transform transition duration-300">
                    <div className="flex items-center gap-4 border-b-1 ]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-[2.4rem] w-[2.4rem] text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01M4.93 19h14.14a2 2 0 001.84-2.75L13.41 4.58a2 2 0 00-3.41 0L3.09 16.25A2 2 0 004.93 19z"
                            />
                        </svg>
                        <h2 className="header-sm font-bold text-red-600 text-center">
                            Missing / Invalid Input Detected
                        </h2>
                    </div>
                    <p className="body-base text-[var(--text-color)] text-center max-w-xl">
                        Please fill out all required fields before submitting the form.
                    </p>
                    <p className="body-base text-[var(--text-color)] text-center max-w-xl">
                        Write N/A if necessary.
                    </p>
                    </div>
                </div>
                )}
            </div>
        </main>
    );
}
export default CorrespondenceForm;
