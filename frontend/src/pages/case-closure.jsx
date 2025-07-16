import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TextInput, TextArea, DateInput } from "../Components/TextField";
import Signature from "../Components/Signature";

// API Import
import  {   fetchCaseData,
            fetchCaseClosureData, 
            createCaseClosureForm
        }
from '../fetch-connections/caseClosure-connection'; 

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CaseClosure() {

    // --- Temporary data --- //
    const sdw_view = true;

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
        dob: "",
        religion: "",
        address: "",
        spu: "",
        closure_date: "",
        sponsorship_date: "",
        reason_for_retirement: "",
        sm_notification: "",
        evaluation: "",
        recommendation: "",
    });

    // < START :: Create New Form > //

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            const returnData = await fetchCaseData(caseID);
            const caseData = returnData

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

    if (viewForm) {
        useEffect(() => {
            const loadData = async () => {
                setLoading(true);
    
                const returnData = await fetchCaseClosureData(caseID, formID);
                const formData = returnData.form
    
                console.log("Form Data", formData)
    
                setRawFormData(formData);
    
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

    // < END :: Create Form > //

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
    const [form_num, setFormNum] = useState(data?.form_num || "");
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
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-5 label-base arrow-group">
                        <div className="arrow-left-button"></div>
                        Go Back
                    </button>
                    <h4 className="header-sm self-end">Form #: {form_num}</h4>
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
                                ></DateInput>
                                <DateInput
                                    label="Date Sponsored"
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

                {/* Reason for Retirement and SM Notification */}
                <section className="flex w-full flex-col gap-8">
                    <TextArea
                        label="Reasons for Retirement"
                        sublabel="Indicate reason based on the result of the case conference"
                        value={reason_for_retirement}
                        setValue={setReasonForRetirement}
                    ></TextArea>
                    <div className="flex w-full items-center gap-12">
                        <div className="flex min-w-lg flex-col gap-8">
                            <p className="body-base">
                                Is the client or SM aware of case closure?
                            </p>
                            <div className="flex gap-12">
                                <label className="flex items-center body-base gap-4">
                                    <input
                                        type="checkbox"
                                        name="sm_awareness"
                                        value="yes"
                                        checked={sm_awareness}
                                        onChange={(e) =>
                                            handleCheckboxChange(e.target.value)
                                        }
                                    />
                                    Yes
                                </label>
                                <label className="flex items-center body-base gap-4">
                                    <input
                                        type="checkbox"
                                        name="sm_awareness"
                                        value="no"
                                        checked={sm_awareness === "no"}
                                        onChange={(e) =>
                                            handleCheckboxChange(e.target.value)
                                        }
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                        <TextArea
                            sublabel="If yes, how was the client notified"
                            value={sm_notification}
                            setValue={setSMNotification}
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
                        <select
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
                        </select>
                        <div className="flex flex-wrap gap-16">
                            {services_provided.map((item, index) => (
                                <div key={index} className="flex w-full justify-between items-center px-4 gap-6">
                                    <TextArea
                                        label={item.service}
                                        value={item.description}
                                        handleChange={(e) =>
                                            updateDescription(index, e.target.value)
                                        }
                                    ></TextArea>
                                    {(index !== 0 && index !== 1) && (
                                        <button
                                            onClick={() => deleteService(index)}
                                            className="icon-button-setup trash-button px-10"
                                        ></button>
                                    )}
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
                    ></TextArea>
                </section>

                {/* Recommendation */}
                <section className="flex w-full">
                    <TextArea
                        label="Recommendation"
                        sublabel="Retirement, Transfer to another project, and/or to Virtual Subproject"
                        value={recommendation}
                        setValue={setRecommendation}
                    ></TextArea>
                </section>

                {/* Signature */}
                <div className="flex w-full flex-col gap-16 px-16 pt-24">
                    <div className="flex w-full justify-between">
                        <Signature label="Prepared by:" signer="Social Development Worker" date={true}></Signature>
                        <Signature label="Conforme by:" signer="SM/Guardian" date={true}></Signature>
                    </div>
                    
                    <div className="flex w-full justify-between">
                        <Signature label="Noted by:" signer="SPC Coordinator"date={true}></Signature>
                    </div>
                </div>

                {/* Buttons */}
                {sdw_view ? (
                    <div className="flex w-full justify-center gap-20">
                        {viewForm ? (
                            <>
                                <button
                                    className="label-base btn-outline-rounded"
                                    onClick={() => navigate(-1)}
                                >
                                    Delete Request
                                </button>
                                <button
                                    className="label-base btn-primary"
                                    onClick={() => setShowConfirm(true)}
                                >
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="label-base btn-outline-rounded"
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="label-base btn-primary"
                                    onClick={() => setShowConfirm(true)}
                                >
                                    Create Request
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="flex w-full justify-center gap-20">
                        <button
                            className="label-base btn-outline-rounded"
                            onClick={() => navigate(-1)}
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
                        <div className="flex flex-col bg-white p-16 rounded-lg shadow-xl w-full max-w-2xl mx-4 gap-8">
                            <h2 className="header-md font-semibold mb-4">Close Case</h2>
                            <p className="label-base mb-6">Are you sure you want to close this case?</p>
                            <div className="flex justify-end gap-4">
                                
                                {/* Cancel */}
                                <button
                                    onClick={() => 
                                        setShowConfirm(false)
                                    }
                                    className="px-4 py-2 text-gray-600 hover:text-black"
                                >
                                    Cancel
                                </button>

                                {/* Close Case */}
                                <button
                                    onClick={async () => {
                                        await handleCreate();
                                        setShowConfirm(false);
                                        navigate(-1);
                                    }}
                                    className="px-4 py-2 btn-primary"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default CaseClosure;