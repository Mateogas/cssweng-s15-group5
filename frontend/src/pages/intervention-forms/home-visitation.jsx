import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signature from "../../Components/Signature";
import { TextInput, TextArea } from "../../Components/TextField";

function HomeVisitationForm() {
    const [data, setData] = useState({
        form_num: "3",
        first_name: "Hepzhi-Bah",
        middle_name: "Gamac",
        last_name: "Tolentino",
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
                            ></TextInput>
                            <TextInput
                                label="First Name"
                                value={first_name}
                                setValue={setFirstName}
                            ></TextInput>
                            <TextInput
                                label="Middle Name"
                                value={middle_name}
                                setValue={setMiddleName}
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
                                    onChange={(e) => setFamilyType(e.target.value)}
                                    className="label-base text-input"
                                >
                                    <option value="" className="body-base">Select</option>
                                    <option value="nuclear" className="body-base">Nuclear</option>
                                    <option value="extended" className="body-base">Extended</option>
                                    <option value="blended" className="body-base">Blended</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-5 rounded-[0.5rem] border border-[var(--border-color)] p-5">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">General Information</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-10">
                        <div className="flex flex-col gap-5">
                            <TextInput
                                label="Date"
                                value={date}
                                setValue={setDate}
                            ></TextInput>
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
        </main>
    );
}

export default HomeVisitationForm;
