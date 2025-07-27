import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TextInput, TextArea, DateInput } from "../../Components/TextField";
import Signature from "../../Components/Signature";

// API Imports
import {
    fetchCaseData,
    fetchCounselingIntervention,
    addCounselingIntervention,
    editCounselingIntervention,
    deleteCounselingIntervention
} from "../../fetch-connections/intervention-connection";
import { editAssessment } from "../../fetch-connections/case-connection";
import { generateCounselingForm } from "../../generate-documents/generate-documents";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CounselingForm() {

    // ===== START :: Setting Data ===== //

    const query = useQuery();
    const action = query.get('action') || ""; 
    const caseID = query.get('caseID') || ""; 
    const formID = query.get('formID') || ""; 

    const [data, setData] = useState({
        form_num: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        ch_number: "",
        grade_year_level: "",
        school: "",
        address: "",
        subproject: "",
        area_self_help: "",
        counseling_date: "",
        reason_for_counseling: "",
        corrective_action: "",
        recommendation: "",
        sm_comments: "",
    });

    const [newformID, setnewformID] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [noFormFound, setNoFormFound] = useState(false);
    const [noCaseFound, setNoCaseFound] = useState(false);

    /********** TEST DATA **********/

    /********** USE STATES **********/

    // < START :: Auto-Filled Data > //

    // [TO UPDATE] :: Temporary state
    const viewForm = action !== 'create' ? true : false;

    // LOAD DATA
    if (!viewForm) {
        useEffect(() => {
            const loadData = async () => {
                // setLoading(true);
                const fetchedData = await fetchCaseData(caseID);
                if (!fetchedData) {
                    setNoCaseFound(true)
                    return
                }
                setData(fetchedData);
                // setLoading(false);

                setFormNum(fetchedData.intervention_number || 1);
                setLastName(fetchedData.last_name || "");
                setMiddleName(fetchedData.middle_name || "");
                setFirstName(fetchedData.first_name || "");
                setCHNumber(fetchedData.ch_number || "");
                setGradeYearLevel(fetchedData.grade_year_level || "");
                setSchool(fetchedData.school || "");
                setAddress(fetchedData.address || "");
                setSubproject(fetchedData.subproject.spu_name || "");
                setAreaSelfHelp(fetchedData.area_self_help || "");
                setCounselingDate(fetchedData.counseling_date || "");
                setReasonForCounseling(fetchedData.reason_for_counseling || "");
                setCorrectiveAction(fetchedData.corrective_action || "");
                setRecommendation(fetchedData.recommendation || "");
                setSMComments(fetchedData.sm_comments || "");
            };
            
            loadData();
        }, []);
    }

    // < END :: Auto-Filled Data > //

    // < START :: View Form > //

    // View Form
    if (viewForm) {
        useEffect(() => {
            const loadData = async () => {
                // setLoading(true);
                const fetchedData = await fetchCounselingIntervention(caseID, formID);
                if (!fetchedData) {
                    setNoFormFound(true)
                    return
                }
                setData(fetchedData);
                // setLoading(false);

                console.log("Fetched Counselling Form: ", fetchedData);

                setLastName(fetchedData.last_name || "");
                setMiddleName(fetchedData.middle_name || "");
                setFirstName(fetchedData.first_name || "");
                setCHNumber(fetchedData.ch_number || "");
                setFormNum(fetchedData.intervention_number || "");
                setGradeYearLevel(fetchedData.grade_year_level || "");
                setSchool(fetchedData.school || "");
                setAddress(fetchedData.address || "");
                setSubproject(fetchedData.subproject|| "");
                setAreaSelfHelp(fetchedData.area_self_help || "");
                setCounselingDate(fetchedData.counseling_date || "");
                setReasonForCounseling(fetchedData.reason_for_counseling || "");
                setCorrectiveAction(fetchedData.corrective_action || "");
                setRecommendation(fetchedData.recommendation || "");
                setSMComments(fetchedData.sm_comments || "");
            };
            
            loadData();
        }, []);
    }

    // < END :: View Form > //

    // ===== END :: Setting Data ===== //

    // ===== START :: Backend Connection ===== //
    
    // < START :: Create Form > //

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        const requiredFields = {
            grade_year_level,
            school,
            area_self_help,
            counseling_date,
            reason_for_counseling,
            corrective_action,
            recommendation,
            sm_comments
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

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        const isValid = validateForm();

        if (!isValid) {
            // window.scrollTo({ top: 0, behavior: "smooth" });
            return false;
        };

        try {
            console.log("Form Submitted");
            const created = await handleCreate();
            return created;
        } catch (err) {
            console.error("Submission failed:", err);
            return true;
        }

    };

    const handleCreate = async () => {
        const payload = {
            grade_year_level,
            school,
            area_self_help,
            counseling_date,
            reason_for_counseling,
            corrective_action,
            recommendation,
            sm_comments
        };
        // console.log("Payload: ", payload);

        const response = await addCounselingIntervention(payload, caseID); 
        if (response?.intervention?._id) {
            setnewformID(response.intervention._id);
            return true;
        } else {
            return false;
        }
    };

    // < END :: Create Form > //

    // < START :: Edit Form > //

    const handleUpdate = async () => {
        const updatedPayload = {
            grade_year_level,
            school,
            area_self_help,
            counseling_date,
            reason_for_counseling,
            corrective_action,
            recommendation,
            sm_comments
        };

        // console.log("Payload: ", updatedPayload);
        const response = await editCounselingIntervention(updatedPayload, formID); 
    };

    // < END :: Edit Form > //

    // < START :: Delete Form > //

    const handleDelete = async () => {
        const response = await deleteCounselingIntervention(formID); 
    };

    // < END :: Delete Form > //

    // ===== END :: Backend Connection ===== //

    // ===== START :: Use States ===== //

    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [grade_year_level, setGradeYearLevel] = useState(
        data?.grade_year_level || "",
    );
    const [school, setSchool] = useState(data?.school || "");
    const [address, setAddress] = useState(data?.address || "");
    const [subproject, setSubproject] = useState(data?.subproject || "");
    const [area_self_help, setAreaSelfHelp] = useState(
        data?.area_self_help || "",
    );
    const [counseling_date, setCounselingDate] = useState(
        data?.counseling_date || "",
    );
    const [reason_for_counseling, setReasonForCounseling] = useState(
        data?.reason_for_counseling || "",
    );
    const [corrective_action, setCorrectiveAction] = useState(
        data?.corrective_action || "",
    );
    const [recommendation, setRecommendation] = useState(
        data?.recommendation || "",
    );
    const [sm_comments, setSMComments] = useState(data?.sm_comments || "");
    const [showConfirm, setShowConfirm] = useState(false);

    // ===== END :: Use States ===== //

    // ===== START :: Local Functions  ===== //

    const navigate = useNavigate();

    const [savedTime, setSavedTime] = useState(null);
    const timeoutRef = useRef(null);
    const [sectionEdited, setSectionEdited] = useState("");

    const [showErrorOverlay, setShowErrorOverlay] = useState(false);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            setShowErrorOverlay(true);
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

    // ===== END :: Local Functions  ===== //

    if (!data) return <div>No data found.</div>;

    if (noFormFound) {
        return (
            <main className="flex justify-center w-full p-16">
            <div className="flex w-full flex-col items-center justify-center gap-16 rounded-lg border border-[var(--border-color)] p-16">
                <div className="flex w-full justify-between">
                    <button 
                        onClick={() => navigate(`/case/${caseID}`)} 
                        className="flex items-center gap-5 label-base arrow-group">
                        <div className="arrow-left-button"></div>
                        Go Back
                    </button>
                </div>
                <h3 className="header-md">Counselling Form</h3>
                <p className="text-3xl red"> No form found. </p>
            </div>
            </main>
        )
    }

    if (noCaseFound) {
        return (
            <main className="flex justify-center w-full p-16">
            <div className="flex w-full flex-col items-center justify-center gap-16 rounded-lg border border-[var(--border-color)] p-16">
                <div className="flex w-full justify-between">
                    <button 
                        onClick={() => navigate(`/case/${caseID}`)} 
                        className="flex items-center gap-5 label-base arrow-group">
                        <div className="arrow-left-button"></div>
                        Go Back
                    </button>
                </div>
                <h3 className="header-md">Counselling Form</h3>
                <p className="text-3xl red"> No case found. </p>
            </div>
            </main>
        )
    }

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
            <h3 className="header-md">Counselling Form</h3>

            {/* Sponsored Member and General Info */}
            <section className="flex w-full flex-col gap-16">
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
                            <TextInput
                                label="CH ID #"
                                value={ch_number}
                                disabled={true}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col gap-8">
                            <TextInput
                                label="Grade/Year Level"
                                value={grade_year_level}
                                setValue={setGradeYearLevel}
                                handleChange={handleChange("Sponsored Member")}
                                error={errors["grade_year_level"]}
                                disabled={viewForm}
                            ></TextInput>
                            <TextInput
                                label="School"
                                value={school}
                                setValue={setSchool}
                                handleChange={handleChange("Sponsored Member")}
                                error={errors["school"]}
                                disabled={viewForm}
                            ></TextInput>
                            <div className="flex gap-16">
                                <p className="label-base w-72">Address</p>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    disabled={true}
                                    className={"body-base text-input w-96 cursor-not-allowed bg-gray-200"}
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
                    <div className="inline-flex items-start justify-center gap-16">
                        <div className="flex flex-col gap-8">
                            <TextInput
                                label="Sub-Project"
                                value={subproject}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="Area/Self-Help Group"
                                value={area_self_help}
                                setValue={setAreaSelfHelp}
                                handleChange={handleChange("General Information")}
                                error={errors["area_self_help"]}
                                disabled={viewForm}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col gap-8">
                            <DateInput
                                label="Date of Counseling"
                                value={counseling_date}
                                setValue={setCounselingDate}
                                handleChange={handleChange("General Information")}
                                error={errors["counseling_date"]}
                                disabled={viewForm}
                            ></DateInput>
                        </div>
                    </div>
                    {savedTime && sectionEdited === "General Information" && (
                        <p className="text-sm self-end mt-2">{savedTime}</p>
                    )}
                </div>
            </section>

            <section className="flex w-full items-end gap-10">
                <TextArea
                    label="Purpose/Reason for Counseling"
                    value={reason_for_counseling}
                    setValue={setReasonForCounseling}
                    error={errors["reason_for_counseling"]}
                    disabled={viewForm}
                ></TextArea>
                <TextArea
                    label="Corrective and/or Disciplinary Action To Be Taken"
                    value={corrective_action}
                    setValue={setCorrectiveAction}
                    error={errors["corrective_action"]}
                    disabled={viewForm}
                ></TextArea>
            </section>

            {/* Recommendation and Comments */}
            <section className="flex w-full flex-col gap-16">
                <TextArea
                    label="Recommendation for Improvement (Intervention)"
                    sublabel="Sponsor Member (SM)"
                    description="Please Note: Failure to improve performance or further violation of policy will result in additional disciplinary action up to and possible retirement."
                    value={recommendation}
                    setValue={setRecommendation}
                    error={errors["recommendation"]}
                    disabled={viewForm}
                ></TextArea>
                <TextArea
                    label="SM's Comments/Remarks"
                    value={sm_comments}
                    setValue={setSMComments}
                    error={errors["sm_comments"]}
                    disabled={viewForm}
                ></TextArea>
            </section>

            {/* Signature */}
            {/*<div className="flex w-full justify-between px-16 pt-24">
                <Signature label="Prepared by:" signer="Social Development Worker"></Signature>
            </div>*/}

            {/* Buttons */}
            <div className="flex w-full justify-center gap-20">
                {viewForm ? (
                    <>
                        <button
                            className="btn-primary font-bold-label w-min"
                            onClick={() => {
                                generateCounselingForm(formID)
                            }}
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
                                const success = await handleSubmit(e);
                                if (success) setShowSuccessModal(true);
                            }}
                        >
                            Create Intervention
                        </button>
                    </>
                )}

                {/* Saved Intervention */}
                {showSuccessModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="flex flex-col bg-white p-16 rounded-lg shadow-xl w-full max-w-3xl mx-4 gap-8">
                            <h2 className="header-sm font-semibold mb-4">Counseling Form #{form_num} Saved</h2>
                            <div className="flex justify-end gap-4">
                                {/* Go Back to Case */}
                                <button
                                    onClick={() => {
                                        setShowSuccessModal(false);
                                        navigate(`/case/${caseID}`);
                                    }}
                                    className="btn-outline font-bold-label"
                                >
                                    Go Back to Case
                                </button>

                                {/* View Form */}
                                <button
                                    onClick={() => {
                                        setShowSuccessModal(false);
                                        navigate(`/counselling-form/?action=view&caseID=${caseID}&formID=${newformID}`);
                                    }}
                                    className="btn-primary font-bold-label"
                                >
                                    View Form
                                </button>
                            </div>
                        </div>
                    </div>
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

                    {/* OK Button */}
                    <button
                        onClick={() => setShowErrorOverlay(false)}
                        className="bg-red-600 text-white text-2xl px-6 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        OK
                    </button>
                    </div>
                </div>
                )}
            </div>

            {!viewForm && (
                <div className="-mt-8">
                    <p className="text-2xl text-red-600 font-semibold text-center mt-2">
                        ⚠️ Warning: This form cannot be edited or deleted after saving. Make sure your inputs are correct. ⚠️
                    </p>
                </div>
            )}
        </main>
    );
}
export default CounselingForm;
