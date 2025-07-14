import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TextInput, TextArea, DateInput } from "../../Components/TextField";
import Signature from "../../Components/Signature"
import FamilyCard from "../../Components/FamilyCard";

// API Import
import {
    fetchCaseData,
    fetchFormData,
    createHomeVis,
    editHomeVis,
} from "../../fetch-connections/homeVisitation-connection";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function HomeVisitationForm() {

    // ===== START :: Setting Data ===== //

    const query = useQuery();
    const action = query.get('action') || ""; 
    const caseID = query.get('caseID') || ""; 
    const formID = query.get('formID') || "";  

    console.log("Home Visit");
    console.log("Home Visit Case ID: ", caseID);

    const [loading, setLoading] = useState(true);
    const [rawCaseData, setRawCaseData] = useState(null);
    const [rawFatherData, setRawFatherData] = useState(null);
    const [rawMotherData, setRawMotherData] = useState(null);
    const [rawOtherFamilyData, setRawOtherFamilyData] = useState(null);
    const [rawFormData, setRawFormData] = useState(null);

    const [data, setData] = useState({
        form_num: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        grade_year_course: "",
        years_in_program: "",
        date: "",
        community: "",
        sponsor_name: "",
        family_type: "",
        father_first_name: "",
        father_middle_name: "",
        father_last_name: "",
        father_work: "",
        father_income: "",
        mother_first_name: "",
        mother_middle_name: "",
        mother_last_name: "",
        mother_work: "",
        mother_income: "",
        sm_progress: "",
        family_progress: "",
        recommendation: "",
        agreement: "",
    });

    const [familyMembers, setFamilyMembers] = useState([]);

    // < START :: Auto-Filled Data > //

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            const returnData = await fetchCaseData(caseID);
            const caseData = returnData.case
            const fatherData = returnData.father
            const motherData = returnData.mother
            const otherFamilyData = returnData.otherFamily

            console.log("Case Data: ", caseData);

            setRawCaseData(caseData);
            setRawFatherData(fatherData);
            setRawMotherData(motherData);
            setRawOtherFamilyData(otherFamilyData);

            setData((prev) => ({
                ...prev,
                first_name: caseData.first_name || "",
                middle_name: caseData.middle_name || "",
                last_name: caseData.last_name || "",

                father_first_name: fatherData?.first_name || "",
                father_middle_name: fatherData?.middle_name || "",
                father_last_name: fatherData?.last_name || "",
                father_work: fatherData?.occupation || "",
                father_income: fatherData?.income || "",

                mother_first_name: motherData?.first_name || "",
                mother_middle_name: motherData?.middle_name || "",
                mother_last_name: motherData?.last_name || "",
                mother_work: motherData?.occupation || "",
                mother_income: motherData?.income || "",
            }));

            setFamilyMembers(otherFamilyData);
            setLoading(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        setFirstName(data.first_name || "");
        setMiddleName(data.middle_name || "");
        setLastName(data.last_name || "");

        setFatherFirstName(data.father_first_name || "");
        setFatherMiddleName(data.father_middle_name || "");
        setFatherLastName(data.father_last_name || "");
        setFatherWork(data.father_work || "");
        setFatherIncome(data.father_income || "");

        setMotherFirstName(data.mother_first_name || "");
        setMotherMiddleName(data.mother_middle_name || "");
        setMotherLastName(data.mother_last_name || "");
        setMotherWork(data.mother_work || "");
        setMotherIncome(data.mother_income || "");
    }, [data]);

    // < END :: Auto-Filled Data > //

    // < START :: View Form > //

    const viewForm = action !== 'create' ? true : false;

    if (viewForm) {
        useEffect(() => {
            const loadFormData = async () => {
                setLoading(true);

                const returnFormData = await fetchFormData(
                    caseID,
                    formID,
                );
                const formData = returnFormData.form;

                console.log("Form Data", formData);

                setRawFormData(formData);

                setData((prev) => ({
                    ...prev,
                    grade_year_course: formData.grade_year_course || "",
                    years_in_program: formData.years_in_program || "",
                    date: formData.createdAt || "",
                    community: formData.community || "",
                    sponsor_name: formData.sponsor_name || "",
                    family_type: formData.family_type || "",
                    sm_progress: formData.sm_progress || "",
                    family_progress: formData.family_progress || "",
                    observation_findings: formData.observation_findings || [],
                    interventions: formData.interventions || [],
                    recommendation: formData.recommendations || "",
                    agreement: formData.agreement || "",
                }));

                setLoading(false);
            };
            loadFormData();
        }, []);

        useEffect(() => {
            setGradeYearCourse(data.grade_year_course || "");
            setYearsInProgram(data.years_in_program || "");
            setDate(data.date || "");
            setCommunity(data.community || "");
            setSponsorName(data.sponsor_name || "");
            setFamilyType(data.family_type || "");
            setSMProgress(data.sm_progress || "");
            setFamilyProgress(data.family_progress || "");
            setObservationFindings(data.observation_findings || []);
            setInterventions(data.interventions || []);
            setRecommendation(data.recommendation || "");
            setAgreement(data.agreement || "");
        }, [data]);
    }

    // < END :: View Form > //

    useEffect(() => {
        if (data?.date) {
            const date = new Date(data.date);
            if (!isNaN(date)) {
                setDate(formatter.format(date));
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
            form_num,
            first_name,
            middle_name,
            last_name,

            grade_year_course,
            years_in_program,

            date,
            community,
            sponsor_name,

            family_type,
            father_first_name,
            father_middle_name,
            father_last_name,
            father_work,
            father_income,
            rawFatherData,

            mother_first_name,
            mother_middle_name,
            mother_last_name,
            mother_work,
            mother_income,
            rawMotherData,

            rawOtherFamilyData,

            sm_progress,
            family_progress,
            recommendation,
            agreement,

            familyMembers,
            observation_findings,
            interventions,
        };

        console.log("Payload: ", payload);

        const response = await createHomeVis(payload, caseID); 
    };

    // < END :: Create Form > //

    // < START :: Edit Form > //

    const handleUpdate = async () => {
        const updatedPayload = {
            form_num,
            first_name,
            middle_name,
            last_name,

            grade_year_course,
            years_in_program,

            date,
            community,
            sponsor_name,

            family_type,
            father_first_name,
            father_middle_name,
            father_last_name,
            father_work,
            father_income,
            rawFatherData,

            mother_first_name,
            mother_middle_name,
            mother_last_name,
            mother_work,
            mother_income,
            rawMotherData,

            rawOtherFamilyData,

            sm_progress,
            family_progress,
            recommendation,
            agreement,

            familyMembers,
            observation_findings,
            interventions,
        };

        console.log("Payload: ", updatedPayload);

        const response = await editHomeVis(updatedPayload, caseID, formID); 
    };

    // < END :: Edit Form > //

    // ===== END :: Backend Connection ===== //

    // ===== START :: Modals ===== //

    const [showModal, setShowModal] = useState(false);

    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [modalConfirm, setModalConfirm] = useState(false);
    const [modalOnConfirm, setModalOnConfirm] = useState(() => {});
    const [modalImageCenter, setModalImageCenter] = useState(null);

    // ===== END :: Modals ===== //

    // ===== START :: Local Functions ===== //

    const navigate = useNavigate();

    const [savedTime, setSavedTime] = useState(null);
    const timeoutRef = useRef(null);
    const [sectionEdited, setSectionEdited] = useState("");

    const handleChange = (section) => (e) => {
        setSectionEdited(section);

        const now = new Date();
        const timeString = now.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        });
        setSavedTime(`Saved at ${timeString}`);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setSavedTime(null);
        }, 3000);
    };

    const handleAddObservation = () => {
        const newObservation = "";

        setObservationFindings((prev) => [...prev, newObservation]);
    };

    const updateObservations = (index, value) => {
        setObservationFindings((prev) =>
            prev.map((item, i) => (i === index ? value : item)),
        );
    };

    const deleteObservation = (indexToDelete) => {
        setObservationFindings((prev) =>
            prev.filter((_, i) => i !== indexToDelete),
        );
    };

    const handleAddIntervention = () => {
        const newIntervention = "";

        setInterventions((prev) => [...prev, newIntervention]);
    };

    const updateInterventions = (index, value) => {
        setInterventions((prev) =>
            prev.map((item, i) => (i === index ? value : item)),
        );
    };

    const deleteIntervention = (indexToDelete) => {
        setInterventions((prev) => prev.filter((_, i) => i !== indexToDelete));
    };

    // ===== END :: Local Functions ===== //

    /**
     *   Formats the currency
     *
     *   @param {*} value : Value to be formatted (assumed Number)
     *   @returns : The formatted string
     *
     *   [NOTE]: Applied this in income display; changed the income input to of type number
     */
    function currency_Formatter(value) {
        if (typeof value !== "number") return "PHP0.00";
        return value.toLocaleString("en-PH", {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    // ===== START :: Use States ===== //

    const [observation_findings, setObservationFindings] = useState([]);
    const [interventions, setInterventions] = useState([]);
    
    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [grade_year_course, setGradeYearCourse] = useState(
        data?.grade_year_course || "",
    );
    const [years_in_program, setYearsInProgram] = useState(
        data?.years_in_program || "",
    );
    const [date, setDate] = useState(data?.date || "");
    const [community, setCommunity] = useState(data?.community || "");
    const [sponsor_name, setSponsorName] = useState(data?.sponsor_name || "");
    const [family_type, setFamilyType] = useState(data?.family_type || "");
    const [father_first_name, setFatherFirstName] = useState(
        data?.father_first_name || "",
    );
    const [father_middle_name, setFatherMiddleName] = useState(
        data?.father_middle_name || "",
    );
    const [father_last_name, setFatherLastName] = useState(
        data?.father_last_name || "",
    );
    const [father_work, setFatherWork] = useState(data?.father_work || "");
    const [father_income, setFatherIncome] = useState(
        data?.father_income || "",
    );
    const [mother_first_name, setMotherFirstName] = useState(
        data?.mother_first_name || "",
    );
    const [mother_middle_name, setMotherMiddleName] = useState(
        data?.mother_middle_name || "",
    );
    const [mother_last_name, setMotherLastName] = useState(
        data?.mother_last_name || "",
    );
    const [mother_work, setMotherWork] = useState(data?.mother_work || "");
    const [mother_income, setMotherIncome] = useState(
        data?.mother_income || "",
    );
    const [sm_progress, setSMProgress] = useState(data?.sm_progress || "");
    const [family_progress, setFamilyProgress] = useState(
        data?.family_progress || "",
    );
    const [recommendation, setRecommendation] = useState(
        data?.recommendation || "",
    );
    const [agreement, setAgreement] = useState(data?.agreement || "");

    const [selectedFamily, setSelectedFamily] = useState(null);
    const [editingFamilyValue, setEditingFamilyValue] = useState({});

    // ===== END :: Use States ===== //

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
            <h3 className="header-md">Home Visitation Report</h3>

            {/* Sponsored Member */}
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
                                label="Grade/Year Course"
                                value={grade_year_course}
                                setValue={setGradeYearCourse}
                                handleChange={handleChange(
                                    "Sponsored Member",
                                )}
                            ></TextInput>
                            <TextInput
                                label="Year/s in the Program"
                                value={years_in_program}
                                setValue={setYearsInProgram}
                                handleChange={handleChange(
                                    "Sponsored Member",
                                )}
                            ></TextInput>
                            <div className="flex items-center gap-16">
                                <p className="label-base w-64">Family Type</p>
                                <select
                                    name="family_type"
                                    id="family_type"
                                    value={family_type}
                                    onChange={(e) => {
                                        handleChange("Sponsored Member")(e);
                                        setFamilyType(e.target.value);
                                    }}
                                    className="label-base text-input"
                                >
                                    <option value="" className="body-base">
                                        Select
                                    </option>
                                    <option
                                        value="Nuclear"
                                        className="body-base"
                                    >
                                        Nuclear
                                    </option>
                                    <option
                                        value="Extended"
                                        className="body-base"
                                    >
                                        Extended
                                    </option>
                                    <option
                                        value="Blended"
                                        className="body-base"
                                    >
                                        Blended
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {savedTime && sectionEdited === "Sponsored Member" && (
                        <p className="mt-2 self-end text-sm">{savedTime}</p>
                    )}
                </div>
            </section>

            {/* General Info */}
            <section className="flex w-full flex-col gap-16">
                <div className="flex w-full flex-col gap-8 rounded-[0.8rem] border border-[var(--border-color)] p-8">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">General Information</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-16">
                        <div className="flex flex-col gap-8">
                            <DateInput
                                label="Date"
                                value={date}
                                setValue={setDate}
                                handleChange={handleChange(
                                    "General Information",
                                )}
                            ></DateInput>
                            <TextInput
                                label="Community"
                                value={community}
                                setValue={setCommunity}
                                handleChange={handleChange(
                                    "General Information",
                                )}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col gap-8">
                            <TextInput
                                label="Sponsor Name"
                                value={sponsor_name}
                                setValue={setSponsorName}
                                handleChange={handleChange(
                                    "General Information",
                                )}
                            ></TextInput>
                        </div>
                    </div>
                    {savedTime && sectionEdited === "General Information" && (
                        <p className="mt-2 self-end text-sm">{savedTime}</p>
                    )}
                </div>
            </section>

            {/* Father and Mother */}
            <section className="flex w-full gap-16">
                <div className="flex w-full flex-col gap-8 rounded-[0.8rem] border border-[var(--border-color)] p-8">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">Father</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-16">
                        <div className="flex flex-col gap-8">
                            <TextInput
                                label="Last Name"
                                value={father_last_name}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="First Name"
                                value={father_first_name}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="Middle Name"
                                value={father_middle_name}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="Work"
                                value={father_work}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="Income"
                                value={currency_Formatter(father_income)}
                                disabled={true}
                            ></TextInput>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-8 rounded-[0.8rem] border border-[var(--border-color)] p-8">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">Mother</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-16">
                        <div className="flex flex-col gap-8">
                            <TextInput
                                label="Last Name"
                                value={mother_last_name}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="First Name"
                                value={mother_first_name}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="Middle Name"
                                value={mother_middle_name}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="Work"
                                value={mother_work}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="Income"
                                value={currency_Formatter(mother_income)}
                                disabled={true}
                            ></TextInput>
                        </div>
                    </div>
                </div>
            </section>

            {/* Family Members */}
            <section className="flex w-full flex-col gap-16">
                <h3 className="header-md">
                    Members and/or Other Members of the Family
                </h3>

                <div className="flex w-full justify-between gap-16">
                    <div className="outline-gray flex w-full gap-8 overflow-x-auto rounded-lg p-6">
                        <div
                            className="flex gap-8"
                            style={{ minWidth: "max-content" }}
                        >
                            {familyMembers.map((member, index) => (
                                <FamilyCard
                                    key={index}
                                    index={index}
                                    member={member}
                                    selectedFamily={selectedFamily}
                                    editingFamilyValue={editingFamilyValue}
                                    familyMembers={familyMembers}
                                    setShowModal={setShowModal}
                                    setModalTitle={setModalTitle}
                                    setModalBody={setModalBody}
                                    setModalImageCenter={setModalImageCenter}
                                    setModalConfirm={setModalConfirm}
                                    setModalOnConfirm={setModalOnConfirm}
                                    editable={false}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Progress in Goals */}
            <section className="flex w-full flex-col gap-8">
                <h3 className="header-md">
                    Progress in the Family based on their Family Goals
                </h3>
                <div className="flex w-full gap-16">
                    <TextArea
                        label="SM"
                        value={sm_progress}
                        setValue={setSMProgress}
                    ></TextArea>
                    <TextArea
                        label="Family"
                        value={family_progress}
                        setValue={setFamilyProgress}
                    ></TextArea>
                </div>
            </section>

            {/* Observation/Findings */}
            <section className="flex w-full flex-col gap-8">
                <h4 className="header-sm">Worker's Observation/Findings</h4>
                {Array.isArray(observation_findings) &&
                    observation_findings.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <p className="body-base pr-4">{index + 1}.</p>
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                    updateObservations(index, e.target.value);
                                    handleChange("Observations")(e);
                                }}
                                className="body-base text-area w-full"
                            />
                            <button
                                onClick={() => deleteObservation(index)}
                                className="icon-button-setup trash-button px-10"
                            ></button>
                        </div>
                    ))}
                <button
                    className="btn-primary font-bold-label"
                    onClick={handleAddObservation}
                >
                    Add Observation/Findings
                </button>
                {savedTime && sectionEdited === "Observations" && (
                    <p className="mt-2 self-end text-sm">{savedTime}</p>
                )}
            </section>

            {/* Interventions Made */}
            <section className="flex w-full flex-col gap-8">
                <h4 className="header-sm">Interventions Made</h4>
                {interventions.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <p className="body-base pr-4">{index + 1}.</p>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                                updateInterventions(index, e.target.value);
                                handleChange("Interventions")(e);
                            }}
                            className="body-base text-area w-full"
                        />
                        <button
                            onClick={() => deleteIntervention(index)}
                            className="icon-button-setup trash-button px-10"
                        ></button>
                    </div>
                ))}
                <button
                    className="btn-primary font-bold-label"
                    onClick={handleAddIntervention}
                >
                    Add Intervention
                </button>
                {savedTime && sectionEdited === "Interventions" && (
                    <p className="mt-2 self-end text-sm">{savedTime}</p>
                )}
            </section>

            {/* Recommendation and Agreement */}
            <section className="flex w-full flex-col gap-8">
                <div className="flex w-full gap-16">
                    <TextArea
                        label="Recommendations"
                        value={recommendation}
                        setValue={setRecommendation}
                    ></TextArea>
                    <TextArea
                        label="Agreement (if any)"
                        value={agreement}
                        setValue={setAgreement}
                    ></TextArea>
                </div>
            </section>

            {/* Signature */}
            <div className="flex w-full justify-between px-16 pt-24">
                <Signature label="Visited by:"></Signature>
                <Signature label="Attested by:"></Signature>
            </div>

            {/* Buttons */}
            <div className="flex w-full justify-center gap-20">
                <button
                    className="label-base btn-outline font-bold-label"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </button>
                {viewForm ? (
                    <button
                        className="label-base btn-primary font-bold-label w-min"
                        onClick={handleUpdate}
                    >
                        Save Changes
                    </button>
                ) : (
                    <button
                        className="label-base btn-primary font-bold-label w-min"
                        onClick={handleCreate}
                    >
                        Create Intervention
                    </button>
                )}
            </div>
        </main>
    );
}

export default HomeVisitationForm;
