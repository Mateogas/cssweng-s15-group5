import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TextInput, TextArea, DateInput } from "../Components/TextField";
import Signature from "../Components/Signature";

// API Import
import  {   fetchCaseData,
            fetchCaseClosureData, 
            createCaseClosureForm,
            terminateCase,
            deleteCaseClosureForm
        }
from '../fetch-connections/caseClosure-connection'; 

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CaseClosure() {

    // ===== START :: Setting Data ===== // 

    const query = useQuery();
    const action = query.get('action') || ""; 
    const caseID = query.get('caseID') || ""; 
    const formID = query.get('formID') || ""; 

    const [loading, setLoading] = useState(true);
    const [rawCaseData, setRawCaseData] = useState(null);
    const [rawFormData, setRawFormData] = useState(null);

    const [data, setData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        ch_number: "",
        dob: "",
        religion: "",
        address: "",
        spu: "",
        closure_date: "",
        sponsorship_date: "",
        reason_for_retirement: "",
        sm_awareness: "",
        sm_notification: "",
        evaluation: "",
        recommendation: "",
    });

    // < START :: Create New Form > //

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            const returnData = await fetchCaseData(caseID);
            const caseData = returnData.case || returnData

            setRawCaseData(caseData);
            setData((prev) => ({
                ...prev,
                first_name: caseData.first_name || "",
                middle_name: caseData.middle_name || "",
                last_name: caseData.last_name || "",

                ch_number: caseData.sm_number || "",
                dob: caseData.dob || "",
                religion: caseData.religion || "",
                address: caseData.present_address || "",
                spu: caseData.spu || "",
            }));
            setLoading(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        setLastName(data.last_name || "");
        setMiddleName(data.middle_name || "");
        setFirstName(data.first_name || "");
        setCHNumber(data.ch_number || "");
        setDOB("");
        setAge("");
        setReligion(data.religion || "");
        setAddress(data.address || "");
        setSPU(data.spu || "");
    }, [data]);

    // < END :: Create New Form > //

    // < START :: View Form > //
    
    const viewForm = action !== 'create' ? true : false;
    const [sdw_view, setSDWView] = useState(true);

    if (viewForm) {
        useEffect(() => {
            const loadData = async () => {
                setLoading(true);
    
                const returnData = await fetchCaseClosureData(caseID);
                const formData = returnData.form
    
                console.log("Form Data", formData)
    
                setRawFormData(formData);

                const user_sdw = returnData.active_user_role === "sdw" ? true : false;

                setSDWView(user_sdw);
    
                setData((prev) => ({
                    ...prev,
                    closure_date: formData.closure_date || "",
                    sponsorship_date: formData.sponsorship_date || "",
                    reason_for_retirement: formData.reason_for_retirement || "",
                    sm_awareness: formData.sm_awareness || "",
                    sm_notification: formData.sm_notification || "",
                    evaluation: formData.evaluation || "",
                    recommendation: formData.recommendation || "",
                }));
                
                setServicesProvided(formData.services_provided || []);
                setLoading(false);
            };
            loadData();
        }, []);
    
        useEffect(() => {
            setClosureDate(data.closure_date || "");
            setSponsorshipDate(data.closure_date || "");
            setReasonForRetirement(data.reason_for_retirement || "");
            setSMAwareness(data.sm_awareness || "");
            setSMNotification(data.sm_notification || "");
            setEvaluation(data.evaluation || "");
            setRecommendation(data.recommendation || "");
        }, [data]);
    
    }

    // < END :: View Form > //

    useEffect(() => {
        if (data?.dob) {
            const date = new Date(data.dob);
            if (!isNaN(date)) {
                setDOB(formatter.format(date));
                setAge(calculateAge(data.dob));
            }
        }
    }, [data]);

    useEffect(() => {
        if (data?.closure_date) {
            const date = new Date(data.closure_date);
            if (!isNaN(date)) {
                setClosureDate(formatter.format(date));
            }
        }
    }, [data]);

    useEffect(() => {
        if (data?.sponsorship_date) {
            const date = new Date(data.sponsorship_date);
            if (!isNaN(date)) {
                setSponsorshipDate(formatter.format(date));
            }
        }
    }, [data]);

    const formatter = new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const services = [
        "Sponsorship Program",
        "Social Development Program",
        "Home Visitation",
        "Counselling",
        "Financial Assistance",
        "Correspondence",
    ];

    // ===== END :: Setting Data ===== // 

    // ===== START :: Backend Connection ===== //
        
    // < START :: Create Form > //

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        const requiredFields = {
            closure_date,
            sponsorship_date,
            reason_for_retirement,
            sm_awareness,
            sm_notification,
            evaluation,
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

        services_provided.forEach((item, index) => {
            if (!item.description || item.description.trim() === "") {
                newErrors[item.service] = "Missing input";
            }

            console.log(item.service);
        })

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
            closure_date,
            sponsorship_date,
            reason_for_retirement,
            sm_awareness,
            sm_notification,
            services_provided,
            evaluation,
            recommendation
        };

        console.log("Payload: ", payload);

        const response = await createCaseClosureForm(payload, caseID); 
    };

    // < END :: Create Form > //
    
    // < START :: Edit Form > //

    /*
    const handleUpdate = async () => {
        const payload = {
            closure_date,
            sponsorship_date,
            reason_for_retirement,
            sm_awareness,
            sm_notification,
            services_provided,
            evaluation,
            recommendation
        };

        console.log("Payload: ", payload);

        const response = await createCaseClosureForm(payload, caseID); 
    };
    */

    // < END :: Edit Form > //

    // < START :: Delete Form > //

    const handleDelete = async () => {
        try {
            const response = await deleteCaseClosureForm(caseID); 
        } catch (err) {
            console.error("Failed to delete case:", err);
        }
    };

    // < END :: Delete Form > //

    // < START :: Terminate Case > //

    const handleTermination = async () => {
        try {
            const response = await terminateCase(caseID); 
        } catch (err) {
            console.error("Failed to terminate case:", err);
        }
    };

    // < END :: Terminate Case > //

    // ===== END :: Backend Connection ===== //

    // ===== START :: Use States ===== //

    const deleteService = (indexToDelete) => {
        setServicesProvided((prev) => prev.filter((_, i) => i !== indexToDelete));
    };

    const handleCheckboxChange = (value) => {
        setSMAwareness(value);
    };

    function calculateAge(dateValue) {
        const birthday = new Date(dateValue);
        const today = new Date();

        let age = today.getFullYear() - birthday.getFullYear();

        const birthdayDone =
            today.getMonth() > birthday.getMonth() ||
            (today.getMonth() === birthday.getMonth() &&
                today.getDate() >= birthday.getDate());

        if (!birthdayDone) {
            age--;
        }

        return age;
    }

    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [dob, setDOB] = useState("");
    const [age, setAge] = useState("");
    const [religion, setReligion] = useState(data?.religion || "");
    const [address, setAddress] = useState(data?.address || "");
    const [spu, setSPU] = useState(data?.spu || "");
    const [closure_date, setClosureDate] = useState(data?.closure_date || "");
    const [sponsorship_date, setSponsorshipDate] = useState(
        data?.sponsorship_date || "",
    );
    const [reason_for_retirement, setReasonForRetirement] = useState(
        data?.reason_for_retirement || "",
    );
    const [sm_awareness, setSMAwareness] = useState(
        data?.sm_notification || "",
    );
    const [sm_notification, setSMNotification] = useState(
        data?.sm_notification || "",
    );
    const [evaluation, setEvaluation] = useState(data?.evaluation || "");
    const [recommendation, setRecommendation] = useState(
        data?.recommendation || "",
    );
    const [service_selected, setServiceSelected] = useState("");
    const [services_provided, setServicesProvided] = useState([
        {
            service: "Sponsorship Program",
            description: "",
        },
        {
            service: "Social Development Program",
            description: "",
        },
    ]);
    const [showConfirm, setShowConfirm] = useState(false);

    // ===== END :: Use States ===== //

    // ===== START :: Functions ===== //

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

    const handleAddService = (item) => {
        const new_service = {
            service: item,
            description: "",
        };

        setServicesProvided((prev) =>
            prev.some((entry) => entry.service === item)
                ? prev
                : [...prev, new_service],
        );
    };

    const updateDescription = (index, value) => {
        setServicesProvided((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, description: value } : item,
            ),
        );
    };

    function calculateAge(dateValue) {
        const birthday = new Date(dateValue);
        const today = new Date();

        let age = today.getFullYear() - birthday.getFullYear();

        const birthdayDone =
            today.getMonth() > birthday.getMonth() ||
            (today.getMonth() === birthday.getMonth() &&
                today.getDate() >= birthday.getDate());

        if (!birthdayDone) {
            age--;
        }

        return age;
    }

    // ===== END :: Functions ===== //

     return (
        <main className="flex w-full justify-center p-16">
            <div className="flex w-full flex-col items-center justify-center gap-16 rounded-lg border border-[var(--border-color)] p-16">
                <div className="flex w-full justify-between">
                    <button 
                        onClick={() => navigate(`/case/${caseID}`)} 
                        className="flex items-center gap-5 label-base arrow-group">
                        <div className="arrow-left-button"></div>
                        Go Back
                    </button>
                </div>
                <h3 className="header-md">Case Closure Report</h3>

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
                                    label="Age"
                                    value={age}
                                    disabled={true}
                                ></TextInput>
                                <TextInput
                                    label="Religion"
                                    value={religion}
                                    disabled={true}
                                ></TextInput>
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
                    </div>
                    <div className="flex w-full flex-col gap-8 rounded-[0.8rem] border border-[var(--border-color)] p-8">
                        <div className="flex border-b border-[var(--border-color)]">
                            <h4 className="header-sm">General Information</h4>
                        </div>
                        <div className="inline-flex items-center justify-center gap-16">
                            <div className="flex flex-col gap-8">
                                <TextInput
                                    label="Name of SPU/Cluster"
                                    value={spu}
                                    disabled={true}
                                ></TextInput>
                            </div>
                            <div className="flex flex-col gap-8">
                                <DateInput
                                    label="Date of Closure"
                                    value={closure_date}
                                    setValue={setClosureDate}
                                    handleChange={handleChange("General Information")}
                                    disabled={viewForm}
                                    error={errors["closure_date"]}
                                ></DateInput>
                                <DateInput
                                    label="Date Sponsored"
                                    value={sponsorship_date}
                                    setValue={setSponsorshipDate}
                                    handleChange={handleChange("General Information")}
                                    disabled={viewForm}
                                    error={errors["sponsorship_date"]}
                                ></DateInput>
                            </div>
                        </div>
                        {savedTime && sectionEdited === "General Information" && (
                            <p className="text-sm self-end mt-2">{savedTime}</p>
                        )}
                    </div>
                </section>

                {/* Reason for Retirement and SM Notification */}
                <section className="flex w-full flex-col gap-8">
                    <TextArea
                        label="Reasons for Retirement"
                        sublabel="Indicate reason based on the result of the case conference"
                        value={reason_for_retirement}
                        setValue={setReasonForRetirement}
                        disabled={viewForm}
                        error={errors["reason_for_retirement"]}
                    ></TextArea>
                    <div className="flex w-full items-center gap-12">
                        <div className="flex flex-col">
                            <div className={`flex min-w-lg flex-col gap-8 ${errors["sm_awareness"] ? "p-12 border rounded-xl border-red-500" : ""}`}>
                                <p className="body-base">
                                    Is the client or SM aware of case closure?
                                </p>
                                <div className="flex gap-12">
                                    <label className="flex items-center body-base gap-4">
                                        <input
                                            type="checkbox"
                                            name="sm_awareness"
                                            value="yes"
                                            checked={sm_awareness === "yes"  || sm_awareness === true}
                                            onChange={(e) =>
                                                handleCheckboxChange(e.target.value)
                                            }
                                            disabled={viewForm}
                                        />
                                        Yes
                                    </label>
                                    <label className="flex items-center body-base gap-4">
                                        <input
                                            type="checkbox"
                                            name="sm_awareness"
                                            value="no"
                                            checked={sm_awareness === "no" || sm_awareness === false}
                                            onChange={(e) =>
                                                handleCheckboxChange(e.target.value)
                                            }
                                            disabled={viewForm}
                                        />
                                        No
                                    </label>
                                </div>
                            </div>
                            {errors["sm_awareness"] && (
                                <div className="text-red-500 text-sm self-end">
                                    {errors["sm_awareness"]}
                                </div>
                            )}
                        </div>
                        <TextArea
                            sublabel="If yes, how was the client notified"
                            value={sm_notification}
                            setValue={setSMNotification}
                            disabled={viewForm}
                            error={sm_awareness === "yes" ? errors["sm_notification"] : undefined}
                        ></TextArea>
                    </div>
                </section>

                {/* Services Provided */}
                <section className="flex w-full flex-col gap-16">
                    <div className="flex w-full flex-col gap-8">
                        <h3 className="header-md">
                            Services Provided and Progress Toward SM's/Family
                            Goals
                        </h3>
                        <h4 className="header-sm">
                            Did the foundation religiously provide the holistic
                            development to each sponsored member through its
                            program?
                        </h4>
                        {viewForm ? ("") : 
                        (<select
                            name="services"
                            id="services"
                            value={service_selected}
                            onChange={(e) => handleAddService(e.target.value)}
                            className="label-base text-input max-w-xl"
                        >
                            <option value="" className="body-base">
                                Add Service
                            </option>
                            {services.slice(2).map((service, index) => (
                                <option
                                    key={index}
                                    value={service}
                                    className="body-base"
                                >
                                    {service}
                                </option>
                            ))}
                        </select>)
                        }
                        <div className="flex flex-wrap gap-16">
                            {services_provided.map((item, index) => (
                                <div key={index} className="flex w-full justify-between items-center px-4 gap-6">
                                    <TextArea
                                        label={item.service}
                                        value={item.description}
                                        handleChange={(e) =>
                                            updateDescription(index, e.target.value)
                                        }
                                        disabled={viewForm}
                                        error={errors[item.service]}
                                    ></TextArea>
                                    {viewForm ? ("") : 
                                        (index !== 0 && index !== 1) && (
                                            <button
                                                onClick={() => deleteService(index)}
                                                className="icon-button-setup trash-button px-10"
                                            ></button>
                                        )
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Evaluation */}
                <section className="flex w-full">
                    <TextArea
                        label="Evaluation"
                        sublabel="Based on the intervention plans including Case Management Results"
                        value={evaluation}
                        setValue={setEvaluation}
                        disabled={viewForm}
                        error={errors["evaluation"]}
                    ></TextArea>
                </section>

                {/* Recommendation */}
                <section className="flex w-full">
                    <TextArea
                        label="Recommendation"
                        sublabel="Retirement, Transfer to another project, and/or to Virtual Subproject"
                        value={recommendation}
                        setValue={setRecommendation}
                        disabled={viewForm}
                        error={errors["recommendation"]}
                    ></TextArea>
                </section>

                {/* Signature */}
                {/*<div className="flex w-full flex-col gap-16 px-16 pt-24">
                    <div className="flex w-full justify-between">
                        <Signature label="Prepared by:" signer="Social Development Worker" date={true}></Signature>
                        <Signature label="Conforme by:" signer="SM/Guardian" date={true}></Signature>
                    </div>
                    
                    <div className="flex w-full justify-between">
                        <Signature label="Noted by:" signer="SPC Coordinator"date={true}></Signature>
                    </div>
                </div>*/}

                {/* Buttons */}
                {sdw_view ? (
                    <div className="flex w-full justify-center gap-20">
                        {viewForm ? (
                            <>
                                <button
                                    className="btn-outline font-bold-label"
                                    onClick={async () => {
                                        await handleDelete();
                                        navigate(`/case/${caseID}`);
                                    }
                                    }
                                >
                                    Delete Request
                                </button>
                                {/*
                                <button
                                    className="btn-primary font-bold-label w-min"
                                    onClick={() => {
                                        navigate(`/case/${caseID}`); 
                                    }}
                                >
                                    Save Changes
                                </button>
                                */}
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
                                    onClick={() => {
                                        if (validateForm()) {
                                            setShowConfirm(true)
                                        }
                                    }}
                                >
                                    Create Request
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="flex w-full justify-center items-center gap-20">
                        <button
                            className="label-base btn-outline"
                            onClick={async () => {
                                await handleDelete();
                                navigate(`/case/${caseID}`)
                            }}
                        >
                            Reject Termination
                        </button>
                        <button
                            className="label-base btn-primary"
                            onClick={() => setShowConfirm(true)}
                        >
                            Approve Termination
                        </button>
                    </div>
                )}
            

                {/* Confirm Close Case */}
                {showConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="flex flex-col bg-white p-16 rounded-lg shadow-xl w-full max-w-3xl mx-4 gap-8">
                            {sdw_view ? (
                                <>
                                    <h2 className="header-md font-semibold mb-4">Close Case</h2>
                                    <p className="label-base mb-6">Are you sure you want to close this case?</p>
                                </>
                            ) : (
                                <>
                                    <h2 className="header-md font-semibold mb-4">Terminate Case</h2>
                                    <p className="label-base mb-6">Are you sure you want to terminate this case?</p>
                                </>
                            )}
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

                                {/* Close Case */}
                                {sdw_view ? (
                                    <button
                                        onClick={async (e) => {
                                            await handleSubmit(e);
                                            setShowConfirm(false);
                                            navigate(`/case/${caseID}`);
                                        }}
                                        className="btn-primary font-bold-label"
                                    >
                                        Confirm
                                    </button>
                                ) : (
                                    <button
                                        onClick={async () => {
                                            await handleTermination();
                                            setShowConfirm(false);
                                            navigate(`/case/${caseID}`);
                                        }}
                                        className="btn-primary font-bold-label"
                                    >
                                        Confirm
                                    </button>
                                )}
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

export default CaseClosure;