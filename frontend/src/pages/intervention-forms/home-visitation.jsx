import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, TextArea } from "../../Components/TextField";

// API Import
import  {   fetchCaseData, 
            createHomeVis
        }
from '../../fetch-connections/homeVisitation-connection'; 

function HomeVisitationForm() {
    // ===== START :: Setting Data ===== // 
    const [loading, setLoading] = useState(true);
    const [rawCaseData, setRawCaseData] = useState(null);
    const [rawFatherData, setRawFatherData] = useState(null);
    const [rawMotherData, setRawMotherData] = useState(null);
    const [rawOtherFamilyData, setRawOtherFamilyData] = useState(null);

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

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            // [TO UPDATE] :: Case ID
            const returnData = await fetchCaseData('6849646feaa08161083d1aec');
            const caseData = returnData.case
            const fatherData = returnData.father
            const motherData = returnData.mother
            const otherFamilyData = returnData.otherFamily

            setRawCaseData(caseData);
            setRawFatherData(fatherData);
            setRawMotherData(motherData);
            setRawOtherFamilyData(otherFamilyData);

            setData((prev) => ({
                ...prev,
                first_name: caseData.first_name || "",
                middle_name: caseData.middle_name || "",
                last_name: caseData.last_name || "",

                father_first_name: fatherData.first_name || "",
                father_middle_name: fatherData.middle_name || "",
                father_last_name: fatherData.last_name || "",
                father_work: fatherData.occupation || "",
                father_income: fatherData.income || "",

                mother_first_name: motherData.first_name || "",
                mother_middle_name: motherData.middle_name || "",
                mother_last_name: motherData.last_name || "",
                mother_work: motherData.occupation || "",
                mother_income: motherData.income || "",
            }));
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
    // ===== END :: Setting Data ===== // 

    // ===== START :: Backend Connection ===== //
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
            interventions
        };
        const response = await createHomeVis(payload);
    };
    // ===== END :: Backend Connection ===== //

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
            maximumFractionDigits: 2
        });
    }

    const [familyMembers, setFamilyMembers] = useState([
        {
            name: "Ana Victoria Angat",
            age: 20,
            income: 100000.0,
            civilStatus: "Single",
            occupation: "Software Developer",
            education: "Undergraduate",
            relationship: "Sister",
        },
        {
            name: "Marvin Ivan Mangubat",
            age: 21,
            income: 0.0,
            civilStatus: "Divorced",
            occupation: "Unemployed",
            education: "Undergraduate",
            relationship: "Sister",
        },
        {
            name: "Jose Miguel Espinosa",
            age: 21,
            income: 100000.0,
            civilStatus: "Single",
            occupation: "Producer",
            education: "Undergraduate",
            relationship: "Brother",
        },
    ]);

    const [observation_findings, setObservationFindings] = useState([
        "Observation 1",
        "Observation 2",
        "Observation 3",
    ]);

    const [interventions, setInterventions] = useState([
        "Intervention 1",
        "Intervention 2",
        "Intervention 3",
    ]);

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

    if (!data) return <div>No data found.</div>;

    return (
        <main className="flex max-w-7xl flex-col items-center justify-center gap-10 px-10">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">Home Visitation Report</h3>

            <section className="flex w-full flex-col gap-10">
                <div className="flex w-full flex-col gap-5 rounded-[0.5rem] border border-[var(--border-color)] p-5">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">Sponsored Member</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-10">
                        <div className="flex flex-col gap-5">
                            <TextInput
                                label="Last Name"
                                value={last_name}
                                setValue={setLastName}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="First Name"
                                value={first_name}
                                setValue={setFirstName}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="Middle Name"
                                value={middle_name}
                                setValue={setMiddleName}
                                disabled={true}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col gap-5">
                            <TextInput
                                label="Grade/Year Course"
                                value={grade_year_course}
                                setValue={setGradeYearCourse}
                            ></TextInput>
                            <TextInput
                                label="Year/s in the Program"
                                value={years_in_program}
                                setValue={setYearsInProgram}
                            ></TextInput>
                            <div className="flex items-center gap-10">
                                <p className="label-base w-44">Family Type</p>
                                <select
                                    name="family_type"
                                    id="family_type"
                                    value={family_type}
                                    onChange={(e) =>
                                        setFamilyType(e.target.value)
                                    }
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
                </div>
            </section>

            <section className="flex w-full flex-col gap-10">
                <div className="flex w-full flex-col gap-5 rounded-[0.5rem] border border-[var(--border-color)] p-5">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">General Information</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-10">
                        <div className="flex flex-col gap-5">
                            <label className="label-base">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="text-input"
                            />
                            <TextInput
                                label="Community"
                                value={community}
                                setValue={setCommunity}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col gap-5">
                            <TextInput
                                label="Sponsor Name"
                                value={sponsor_name}
                                setValue={setSponsorName}
                            ></TextInput>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex w-full gap-10">
                <div className="flex w-full flex-col gap-5 rounded-[0.5rem] border border-[var(--border-color)] p-5">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">Father</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-10">
                        <div className="flex flex-col gap-5">
                            <TextInput
                                label="Last Name"
                                value={father_last_name}
                                setValue={setFatherLastName}
                            ></TextInput>
                            <TextInput
                                label="First Name"
                                value={father_first_name}
                                setValue={setFatherFirstName}
                            ></TextInput>
                            <TextInput
                                label="Middle Name"
                                value={father_middle_name}
                                setValue={setFatherMiddleName}
                            ></TextInput>
                            <TextInput
                                label="Work"
                                value={father_work}
                                setValue={setFatherWork}
                            ></TextInput>
                            <TextInput
                                label="Income"
                                value={currency_Formatter(father_income)}
                                setValue={setFatherIncome}
                            ></TextInput>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-5 rounded-[0.5rem] border border-[var(--border-color)] p-5">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">Mother</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-10">
                        <div className="flex flex-col gap-5">
                            <TextInput
                                label="Last Name"
                                value={mother_last_name}
                                setValue={setMotherLastName}
                            ></TextInput>
                            <TextInput
                                label="First Name"
                                value={mother_first_name}
                                setValue={setMotherFirstName}
                            ></TextInput>
                            <TextInput
                                label="Middle Name"
                                value={mother_middle_name}
                                setValue={setMotherMiddleName}
                            ></TextInput>
                            <TextInput
                                label="Work"
                                value={mother_work}
                                setValue={setMotherWork}
                            ></TextInput>
                            <TextInput
                                label="Income"
                                value={currency_Formatter(mother_income)}
                                setValue={setMotherIncome}
                            ></TextInput>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col w-full gap-5">
                <h3 className="header-md">
                    Progress in the Family based on their Family Goals
                </h3>
                <div className="flex w-full gap-10">
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

            <section className="flex flex-col w-full gap-5">
                <div className="flex w-full gap-10">
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

            <div className="flex w-[22.5rem] justify-between">
                <button className="btn-outline-rounded">Cancel</button>
                <button 
                    className="btn-primary" 
                    onClick={handleCreate}
                    >
                    Create Intervention
                </button>
            </div>
        </main>
    );
}

export default HomeVisitationForm;
