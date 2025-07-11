import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, DateInput, TextArea } from "../Components/TextField";

// API Import
import  {   fetchProgressReport, 
            addProgressReport,
            editProgressReport
        } 
from '../fetch-connections/progress-report-connection'; 

function ProgressReport() {

    // ===== START :: Setting Data ===== //

    const [loading, setLoading] = useState(true);
    const [rawCaseData, setRawCaseData] = useState(null);
    const [rawFormData, setRawFormData] = useState(null);
    

    const [data, setData] = useState({
        form_num: "3",
        first_name: "",
        middle_name: "",
        last_name: "",
        ch_number: "",
        date: "",
        dob: "",
        sponsor_name: "",
        sponsorship_date: "",
        subproject: "",
        date_accomplished: "",
        period_covered: "",
        sm_update: "",
        family_update: "",
        services_to_family: "",
        participation: "",
    });

    // < START :: Auto-Filled Data > //

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            // [TO UPDATE] :: Case ID
            const returnData = await fetchProgressReport('686e92a43c1f53d3ee659636');
            const caseData = returnData

            console.log(caseData)

            setRawCaseData(caseData);

            setData((prev) => ({
                ...prev,
                first_name: caseData.first_name || "",
                middle_name: caseData.middle_name || "",
                last_name: caseData.last_name || "",
                ch_number: caseData.sm_number || "",
                dob: caseData.dob || "",
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
        setSubproject(data.subproject || "");
    }, [data]);

    // < END :: Auto-Filled Data > //

    // < START :: View Form > //

    // [TO UPDATE] :: Temporary state
    const viewForm = true;

    if (viewForm) {
        useEffect(() => {
            const loadData = async () => {
                setLoading(true);
    
                // [TO UPDATE] :: Case ID
                const returnData = await fetchProgressReport('687172244bf09e0e26d6899a');
                const formData = returnData
    
                console.log(formData)
    
                setRawFormData(formData);
    
                setData((prev) => ({
                    ...prev,
                    sponsor_name: formData.sponsor_name || "",
                    sponsorship_date: formData.sponsorship_date || "",
                    date_accomplished: formData.date_accomplished || "",
                    period_covered: formData.period_covered || "",
                    sm_update: formData.sm_update || "",
                    family_update: formData.family_update || "",
                    services_to_family: formData.services_to_family || "",
                    participation: formData.participation || "",
                }));
                
                setRelationToSponsor(formData.relation_to_sponsor)
                setLoading(false);
            };
            loadData();
        }, []);

        useEffect(() => {
            setSponsorName(data.sponsor_name || "");
            setSponsorshipDate(data.sponsorship_date || "");
            setDateAccomplished(data.date_accomplished || "");
            setPeriodCovered(data.period_covered || "");
            setSMUpdate(data.sm_update || "");
            setFamilyUpdate(data.family_update || "");
            setServicesToFamily(data.services_to_family || "");
            setParticipation(data.participation || "");
        }, [data]);
    }

    // < END :: View Form > //

    useEffect(() => {
        if (data?.dob) {
            const date = new Date(data.dob);
            if (!isNaN(date)) {
                setDOB(formatter.format(date));
            }
        }
    }, [data]);

    useEffect(() => {
        if (data?.date_accomplished) {
            const date = new Date(data.date_accomplished);
            if (!isNaN(date)) {
                setDateAccomplished(formatter.format(date));
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
        
    const questions = [
        { id: "know_sponsor_name", text: "Knows his/her sponsor's name?" },
        { id: "cooperative", text: "Cooperative with the program?" },
        { id: "personalized_letter", text: "Writes personalized letters in a timely manner?" },
    ];
    
    const options = ["Yes", "Sometimes", "No"];
    
    // ===== END :: Setting Data ===== //

    // ===== START :: Backend Connection ===== //
        
    // < START :: Create Form > //

    const handleCreate = async () => {
        const payload = {
            sponsor_name,
            sponsorship_date,
            date_accomplished,
            period_covered,
            sm_update,
            family_update,
            services_to_family,
            participation,
            relation_to_sponsor
        };

        console.log("Payload: ", payload);

        // [TO UPDATE] :: Case ID
        const response = await addProgressReport(payload, "6849646feaa08161083d1aec"); 
    };

    // < END :: Create Form > //

    // < START :: Edit Form > //

    const handleUpdate = async () => {
        const updatedPayload = {
            sponsor_name,
            sponsorship_date,
            date_accomplished,
            period_covered,
            sm_update,
            family_update,
            services_to_family,
            participation,
            relation_to_sponsor
        };

        console.log("Payload: ", updatedPayload);

        // [TO UPDATE] :: Form ID
        const response = await editProgressReport("687172244bf09e0e26d6899a", updatedPayload); 
    };

    // < END :: Edit Form > //

    // ===== END :: Backend Connection ===== //

    // ===== START :: Use States ===== //

    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [dob, setDOB] = useState("");
    const [age, setAge] = useState("");
    const [sponsor_name, setSponsorName] = useState(data?.sponsor_name || "");
    const [sponsorship_date, setSponsorshipDate] = useState(
        data?.sponsorship_date || "",
    );
    const [subproject, setSubproject] = useState(data?.subproject || "");
    const [date_accomplished, setDateAccomplished] = useState(
        data?.date_accomplished || "",
    );
    const [period_covered, setPeriodCovered] = useState(
        data?.period_covered || "",
    );
    const [sm_update, setSMUpdate] = useState(data?.sm_update || "");
    const [family_update, setFamilyUpdate] = useState(
        data?.family_update || "",
    );
    const [services_to_family, setServicesToFamily] = useState(
        data?.services_to_family || "",
    );
    const [participation, setParticipation] = useState(
        data?.participation || "",
    );
    const [relation_to_sponsor, setRelationToSponsor] = useState({});

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

    const handleCheckboxChange = (questionID, value) => {
        setRelationToSponsor((prev) => ({
            ...prev,
            [questionID]: value,
        }));
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
        <main className="flex justify-center p-32">
            <div className="flex w-full flex-col items-center justify-center gap-16 rounded-lg border border-[var(--border-color)] p-16">
                <h4 className="header-sm self-end">Form #: {form_num}</h4>
                <h3 className="header-md">Individual Progress Report</h3>

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
                                <TextInput
                                    label="Age"
                                    value={age}
                                    disabled={true}
                                ></TextInput>
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
                                    label="Sub-Project"
                                    value={subproject}
                                    disabled={true}
                                ></TextInput>
                                <DateInput
                                    label="Date Accomplished"
                                    value={date_accomplished}
                                    setValue={setDateAccomplished}
                                    handleChange={handleChange("General Information")}
                                ></DateInput>
                                <TextInput
                                    label="Period Covered"
                                    value={period_covered}
                                    setValue={setPeriodCovered}
                                    handleChange={handleChange("General Information")}
                                ></TextInput>
                            </div>
                            <div className="flex flex-col gap-8">
                                <TextInput
                                    label="Name of Sponsor"
                                    value={sponsor_name}
                                    setValue={setSponsorName}
                                    handleChange={handleChange("General Information")}
                                ></TextInput>
                                <DateInput
                                    label="Sponsorship Begin Date"
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

                {/* Update/Developmert */}
                <section className="flex w-full flex-col gap-16">
                    <div className="flex w-full flex-col gap-8">
                        <h3 className="header-md">Update/Development</h3>
                        <h4 className="header-sm">
                            e.g. Education, Health, Socio-Economic, Behavioral,
                            Social, etc.
                        </h4>
                    </div>
                    <div className="flex w-full gap-16">
                        <TextArea
                            label="Sponsored Member (observation)"
                            value={sm_update}
                            setValue={setSMUpdate}
                        ></TextArea>
                        <TextArea
                            label="Family"
                            value={family_update}
                            setValue={setFamilyUpdate}
                        ></TextArea>
                    </div>
                </section>

                {/* Services to Family */}
                <section className="flex w-full">
                    <TextArea
                        label="Services Rendered to the Family"
                        value={services_to_family}
                        setValue={setServicesToFamily}
                    ></TextArea>
                </section>

                {/* Participation */}
                <section className="flex w-full">
                    <TextArea
                        label="Participation in the Community"
                        sublabel="Include care for the environment"
                        value={participation}
                        setValue={setParticipation}
                    ></TextArea>
                </section>

                {/* Relationship to Sponsor and Unbound */}
                <section className="flex w-full flex-col gap-8">
                    <h4 className="header-sm">
                        Relationship to Sponsor & Unbound
                    </h4>
                    <div className="flex gap-x-40 gap-y-16 flex-wrap">
                        {questions.map((q) => (
                            <div
                                key={q.id}
                                className="flex flex-col justify-end gap-8"
                            >
                                <p className="body-base">{q.text}</p>
                                <div className="flex gap-12">
                                    {options.map((option) => (
                                        <label
                                            key={option}
                                            className="flex items-center gap-4 body-base"
                                        >
                                            <input
                                                type="checkbox"
                                                name={q.id}
                                                value={option}
                                                checked={
                                                    relation_to_sponsor[q.id] === option
                                                }
                                                onChange={(e) => {
                                                    handleCheckboxChange(
                                                        q.id,
                                                        option,
                                                    );
                                                    handleChange("Relation to Sponsor and Unbound")(e);
                                                }}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    {savedTime && sectionEdited === "Relation to Sponsor and Unbound" && (
                        <p className="text-sm self-end mt-2">{savedTime}</p>
                    )}
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
                            Create Progress Report
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}

export default ProgressReport;
