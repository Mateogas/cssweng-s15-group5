import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TextInput, TextArea } from "../../Components/TextField";
import Signature from "../../Components/Signature";

// API Import
import  {   fetchFinInterventionData,
            createFinancialForm,
            editFinancialForm,
            fetchAutoFillFinancialData,
            deleteCorrespInterventionForm
        }
from '../../fetch-connections/financialForm-connection'; 

import { generateFinancialAssessmentForm  } from "../../generate-documents/generate-documents";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function FinancialAssessmentForm() {

    // ===== START :: Setting Data ===== //

    const query = useQuery();
    const action = query.get('action') || ""; 
    const caseID = query.get('caseID') || ""; 
    const formID = query.get('formID') || ""; 

    console.log("Case ID: ", caseID);
    console.log("Form ID: ", formID);

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
        area_and_subproject: "",
        other_assistance_detail: "",
        problem_presented: "",
        recommendation: "",
    });

    const all_assistance = [
        "Funeral Assistance to the Family Member",
        "Medical Assistance to the Family Member",
        "Food Assistance",
        "IGP Capital",
        "Funeral Assistance to the Sponsored Member",
        "Medical Assistance to the Sponsored Member",
        "Home Improvement/Needs",
        "Other: Please Indicate Below",
    ];

    const [type_of_assistance, setTypeOfAssistance] = useState([]);

    // ===== START :: Create New Form ===== // 

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            const returnData = await fetchAutoFillFinancialData(caseID);
            const caseData = returnData.returningData;

            console.log(caseData)

            setRawCaseData(caseData);

            setData((prev) => ({
                ...prev,
                form_num: caseData.intervention_number || "",
                first_name: caseData.first_name || "",
                middle_name: caseData.middle_name || "",
                last_name: caseData.last_name || "",
                ch_number: caseData.sm_number || "",
                area_and_subproject: caseData.spu || "",
            }));

            setLoading(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        setFormNum(data.form_num || "");
        setFirstName(data.first_name || "");
        setMiddleName(data.middle_name || "");
        setLastName(data.last_name || "");
        setCHNumber(data.ch_number || "");
        setAreaAndSubproject(data.area_and_subproject || "");
    }, [data]);

    // ===== END :: Create New Form ===== // 

    // ===== START :: View Form ===== //
    
    const viewForm = action !== 'create' ? true : false;

    if (viewForm) {
        useEffect(() => {
            const loadFormData = async () => {
                setLoading(true);

                const returnFormData = await fetchFinInterventionData(
                    caseID, formID
                );
                const formData = returnFormData.form;

                console.log("form Data", formData);

                setRawFormData(formData);

                setData((prev) => ({
                    ...prev,
                    form_num: formData.intervention_number || "",
                    date: formData.createdAt || "",
                    problem_presented: formData.problem_presented || "",
                    recommendation: formData.recommendation || "",
                    other_assistance_detail: formData.other_assistance_detail || "",
                }));
        
                setTypeOfAssistance(formData.type_of_assistance);
                setLoading(false);
            };
            loadFormData();
        }, []);

        useEffect(() => {
            setFormNum(data.form_num || "");
            setOtherAssistance(data.other_assistance_detail || "");
            setProblemPresented(data.problem_presented || "");
            setRecommendation(data.recommendation || "");
        }, [data]);
    }
    
    // ===== END :: View Form ===== //

    // ===== END :: Setting Data ===== // 

    // ===== START :: Backend Connection ===== //
    
    // < START :: Create Form > //

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        const requiredFields = {
            type_of_assistance,
            problem_presented,
            recommendation
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

        if (type_of_assistance.length === 0) {
            newErrors["type_of_assistance"] = "Please select at least one type of assistance.";
        }
        
        if (type_of_assistance.includes("Other: Please Indicate Below")) {
            newErrors["other_assistance_detail"] = "Please indicate the type of assistance.";
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
            type_of_assistance,
            other_assistance_detail,
            area_and_subproject,
            problem_presented,
            recommendation
        };

        console.log("Payload: ", payload);

        const response = await createFinancialForm(caseID, payload); 
    };

    // < END :: Create Form > //

    // < START :: Edit Form > //

    const handleUpdate = async () => {
        const updatedPayload = {
            type_of_assistance,
            other_assistance_detail,
            area_and_subproject,
            problem_presented,
            recommendation
        };

        console.log("Payload: ", updatedPayload);

        const response = await editFinancialForm(formID, updatedPayload); 
    };

    // < END :: Edit Form > //

    // < START :: Delete Form > //

    const handleDelete = async () => {

        const response = await deleteCorrespInterventionForm(formID); 
    };

    // < END :: Edit Form > //

    // ===== END :: Backend Connection ===== //

    // ===== START :: Use States ===== //
    
    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [area_and_subproject, setAreaAndSubproject] = useState(
        data?.area_and_subproject || "",
    );
    const [other_assistance_detail, setOtherAssistance] = useState(data?.other_assistance_detail || "");
    const [problem_presented, setProblemPresented] = useState(
        data?.problem_presented || "",
    );
    const [recommendation, setRecommendation] = useState(
        data?.recommendation || "",
    );
    const [showConfirm, setShowConfirm] = useState(false);
    
    // ===== END :: USE STATES ===== //

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

    const handleCheckboxChange = (value) => {
        setTypeOfAssistance((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value],
        );
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
                Assessment Form for Special Family Assistance
            </h3>

            {/* Type of Assistance */}
            <section className="flex w-full flex-col gap-12">
                <h4 className="header-sm">Type of Assistance</h4>
                <div className={`flex justify-center gap-20 px-8 ${errors["type_of_assistance"] ? "py-12 border rounded-xl border-red-500" : ""}`}>
                    <div className="flex flex-col gap-4">
                        {all_assistance.slice(0, 4).map((item, index) => (
                            <label key={`assistance_${index}`} className="body-base flex gap-4">
                                <input
                                    type="checkbox"
                                    id={`assistance_${index}`}
                                    value={item}
                                    checked={type_of_assistance.includes(item)}
                                    onChange={(e) => {
                                        handleCheckboxChange(e.target.value)
                                        handleChange("Type of Assistance")(e)
                                    }}
                                    disabled = {viewForm}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4">
                        {all_assistance.slice(4, 8).map((item, index) => (
                            <label key={`assistance_${index}`} className="body-base flex gap-4">
                                <input
                                    type="checkbox"
                                    id={`assistance_${index}`}
                                    value={item}
                                    checked={type_of_assistance.includes(item)}
                                    onChange={(e) => {
                                        handleCheckboxChange(e.target.value);
                                        handleChange("Type of Assistance")(e);
                                    }}
                                    disabled = {viewForm}
                                />
                                {item}
                            </label>
                        ))}
                        
                        <textarea
                            id="other_assistance_detail"
                            name="other_assistance_detail"
                            value={other_assistance_detail}
                            onChange={(e) => {
                                setOtherAssistance(e.target.value);
                                handleChange("Type of Assistance")(e);
                            }}
                            placeholder="Form of Assistance"
                            className={`body-base text-input h-32 w-full ${errors["other_assistance_detail"] ? "text-input-error" : ""}`}
                            disabled = {viewForm}
                        ></textarea>
                        {errors["other_assistance_detail"] && (
                            <div className="text-red-500 text-sm self-end">
                                {errors["other_assistance_detail"]}
                            </div>
                        )}
                    </div>
                </div>
                {errors["type_of_assistance"] && (
                    <div className="text-red-500 text-sm self-end">
                        {errors["type_of_assistance"]}
                    </div>
                )}
                {savedTime && sectionEdited === "Type of Assistance" && (
                    <p className="text-sm self-end mt-2">{savedTime}</p>
                )}
            </section>

            {/* Identifying Information */}
            <section className="flex w-full flex-col items-center gap-12">
                <h4 className="header-sm w-full">Identifying Information</h4>
                <div className="flex w-full flex-col gap-8 rounded-[0.8rem] border border-[var(--border-color)] p-8">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">Sponsored Member</h4>
                    </div>
                    <div className="inline-flex items-start justify-center gap-16">
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
                            <TextInput
                                label="Area and Sub-Project"
                                value={area_and_subproject}
                                disabled={true}
                            ></TextInput>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Presented */}
            <section className="flex w-full">
                <TextArea
                    label="Problem Presented"
                    value={problem_presented}
                    setValue={setProblemPresented}
                    error={errors["problem_presented"]}
                    disabled = {viewForm}
                ></TextArea>
            </section>

            {/* Recommendation */}
            <section className="flex w-full">
                <TextArea
                    label="Recommendation"
                    value={recommendation}
                    setValue={setRecommendation}
                    error={errors["recommendation"]}
                    disabled = {viewForm}
                ></TextArea>
            </section>

            {/* Signature */}
            {/*<div className="flex w-full flex-col gap-16 px-16 pt-24">
                <div className="flex w-full justify-between">
                    <Signature label="Prepared by:" signer="Social Development Worker"></Signature>
                    <Signature label="Noted by:" signer="OIC-Cluster Coordinator"></Signature>
                </div>
                
                <div className="flex w-full justify-between">
                    <Signature label="Checked and Reviewed by:" signer="Finance Staff"></Signature>
                </div>
            </div>*/}

            {/* Buttons */}
            <div className="flex w-full justify-center gap-20">
                {viewForm ? (
                    <>
                        <button
                            className="btn-primary font-bold-label w-min"
                            onClick={() => 
                               generateFinancialAssessmentForm(formID)
                            }
                        >
                            Download Form
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

export default FinancialAssessmentForm;
