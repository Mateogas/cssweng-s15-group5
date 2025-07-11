import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, TextArea, DateInput } from "../../Components/TextField";

// API Imports
import {
    fetchCaseData,
    fetchCounselingIntervention,
    addCounselingIntervention,
    editCounselingIntervention
} from "../../fetch-connections/intervention-connection";
import { editAssessment } from "../../fetch-connections/case-connection";

function CounselingForm() {

    // ===== START :: Setting Data ===== //

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

    // < START :: Auto-Filled Data > //

    // LOAD DATA
    useEffect(() => {
        const loadData = async () => {
            // setLoading(true);
            const fetchedData = await fetchCaseData('6849646feaa08161083d1aec');
            setData(fetchedData);
            // setLoading(false);

            setLastName(fetchedData.last_name || "");
            setMiddleName(fetchedData.middle_name || "");
            setFirstName(fetchedData.first_name || "");
            setCHNumber(fetchedData.ch_number || "");
            setFormNum(fetchedData.form_num || "");
            setGradeYearLevel(fetchedData.grade_year_level || "");
            setSchool(fetchedData.school || "");
            setAddress(fetchedData.address || "");
            setSubproject(fetchedData.subproject || "");
            setAreaSelfHelp(fetchedData.area_self_help || "");
            setCounselingDate(fetchedData.counseling_date || "");
            setReasonForCounseling(fetchedData.reason_for_counseling || "");
            setCorrectiveAction(fetchedData.corrective_action || "");
            setRecommendation(fetchedData.recommendation || "");
            setSMComments(fetchedData.sm_comments || "");
        };
        
        loadData();
    }, []);

    // < END :: Auto-Filled Data > //

    // < START :: View Form > //

    // [TO UPDATE] :: Temporary state
    const viewForm = true;

    // View Form
    if (viewForm) {
        useEffect(() => {
            const loadData = async () => {
                // setLoading(true);
                const fetchedData = await fetchCounselingIntervention('687158bbfc374d212d0e7270');
                setData(fetchedData);
                // setLoading(false);

                setLastName(fetchedData.last_name || "");
                setMiddleName(fetchedData.middle_name || "");
                setFirstName(fetchedData.first_name || "");
                setCHNumber(fetchedData.ch_number || "");
                setFormNum(fetchedData.form_num || "");
                setGradeYearLevel(fetchedData.grade_year_level || "");
                setSchool(fetchedData.school || "");
                setAddress(fetchedData.address || "");
                setSubproject(fetchedData.subproject || "");
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

        console.log("Payload: ", payload);

        // [TO UPDATE] :: Case ID
        const response = await addCounselingIntervention(payload, "6849646feaa08161083d1aec"); 
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

        console.log("Payload: ", updatedPayload);

        // [TO UPDATE] :: Form ID
        const response = await editCounselingIntervention(updatedPayload, "687158bbfc374d212d0e7270"); 
    };

    // < END :: Edit Form > //

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

    // ===== END :: Use States ===== //

    // ===== START :: Local Functions  ===== //

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

    // ===== END :: Local Functions  ===== //

    if (!data) return <div>No data found.</div>;

    return (
        <main className="flex w-full flex-col items-center justify-center gap-16 rounded-lg border border-[var(--border-color)] p-16">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">Counseling Form</h3>

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
                            <TextInput
                                label="Grade/Year Level"
                                value={grade_year_level}
                                setValue={setGradeYearLevel}
                                handleChange={handleChange("Sponsored Member")}
                            ></TextInput>
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
                                label="Sub-Project"
                                value={subproject}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="Area/Self-Help Group"
                                value={area_self_help}
                                setValue={setAreaSelfHelp}
                                handleChange={handleChange("General Information")}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col gap-8">
                            <DateInput
                                label="Date of Counseling"
                                value={counseling_date}
                                setValue={setCounselingDate}
                                handleChange={handleChange("General Information")}
                            ></DateInput>
                        </div>
                    </div>
                    {savedTime && sectionEdited === "General Information" && (
                        <p className="text-sm self-end mt-2">{savedTime}</p>
                    )}
                </div>
            </section>

            {/* Reason for Counseling and Corrective Action */}
            <section className="flex w-full items-end gap-16">
                <TextArea
                    label="Purpose/Reason for Counseling"
                    value={reason_for_counseling}
                    setValue={setReasonForCounseling}
                ></TextArea>
                <TextArea
                    label="Corrective and/or Disciplinary Action To Be Taken"
                    value={corrective_action}
                    setValue={setCorrectiveAction}
                ></TextArea>
            </section>

            {/* Recommendation and Comments */}
            <section className="flex w-full flex-col gap-16">
                <TextArea
                    label="Recommendation for Improvement (Intervention)"
                    sublabel="Sponsor Member (SM) Please Note:"
                    description="Failure to improve performance or further violation of policy will result in additional disciplinary action up to and possible retirement."
                    value={recommendation}
                    setValue={setRecommendation}
                ></TextArea>
                <TextArea
                    label="SM's Comments/Remarks"
                    value={sm_comments}
                    setValue={setSMComments}
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
export default CounselingForm;
