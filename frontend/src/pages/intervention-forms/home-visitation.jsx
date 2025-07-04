import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, DateInput, TextArea } from "../../Components/TextField";
import FamilyCard from "../../Components/FamilyCard";

function HomeVisitationForm() {
    /********** TEST DATA **********/

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
            id: 1,
            first: "Ana",
            middle: "Victoria",
            last: "Angat",
            age: 20,
            income: 100000.0,
            civilStatus: "Single",
            occupation: "Software Developer",
            education: "Undergraduate",
            relationship: "Sister",
            deceased: false,
        },
        {
            id: 2,
            first: "Marvin",
            middle: "Ivan",
            last: "Mangubat",
            age: 21,
            income: 0.0,
            civilStatus: "Divorced",
            occupation: "Unemployed",
            education: "Undergraduate",
            relationship: "Sister",
            deceased: false,
        },
        {
            id: 3,
            first: "Jose",
            middle: "Miguel",
            last: "Espinosa",
            age: 21,
            income: 100000.0,
            civilStatus: "Single",
            occupation: "Producer",
            education: "Undergraduate",
            relationship: "Brother",
            deceased: false,
        },
        {
            id: 4,
            first: "Jose2",
            middle: "Miguel2",
            last: "Espinosa2",
            age: 21,
            income: 100000.0,
            civilStatus: "Single",
            occupation: "Producer",
            education: "Undergraduate",
            relationship: "Brother",
            deceased: false,
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

    /********** TEST DATA **********/

    /********** USE STATES **********/

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

    /********** USE STATES **********/

    /********** MODALS **********/

    const [showModal, setShowModal] = useState(false);

    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [modalConfirm, setModalConfirm] = useState(false);
    const [modalOnConfirm, setModalOnConfirm] = useState(() => {});
    const [modalImageCenter, setModalImageCenter] = useState(null);

    /********** MODALS **********/

    /********** FUNCTIONS **********/

    const handleAddFamilyMember = () => {
        const newMember = {
            name: "",
            age: "",
            income: "",
            civilStatus: "",
            occupation: "",
            education: "",
            relationship: "",
        };

        setFamilyMembers((prev) => [newMember, ...prev]);
        setSelectedFamily(0);
        setEditingFamilyValue(newMember);
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

    /********** FUNCTIONS **********/

    return (
        <main className="flex flex-col items-center justify-center gap-10 rounded-lg border border-[var(--border-color)] p-10">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">Home Visitation Report</h3>

            {/* Sponsored Member */}
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
                        <div className="flex flex-col gap-5">
                            <TextInput
                                label="Grade/Year Course"
                                value={grade_year_course}
                                disabled={true}
                            ></TextInput>
                            <TextInput
                                label="Year/s in the Program"
                                value={years_in_program}
                                disabled={true}
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
                                        value="nuclear"
                                        className="body-base"
                                    >
                                        Nuclear
                                    </option>
                                    <option
                                        value="extended"
                                        className="body-base"
                                    >
                                        Extended
                                    </option>
                                    <option
                                        value="blended"
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

            {/* General Info */}
            <section className="flex w-full flex-col gap-10">
                <div className="flex w-full flex-col gap-5 rounded-[0.5rem] border border-[var(--border-color)] p-5">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">General Information</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-10">
                        <div className="flex flex-col gap-5">
                            <DateInput
                                label="Date"
                                value={date}
                                setValue={setDate}
                            ></DateInput>
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

            {/* Father and Mother */}
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
                                value={father_income}
                                disabled={true}
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
                                value={mother_income}
                                disabled={true}
                            ></TextInput>
                        </div>
                    </div>
                </div>
            </section>

            {/* Family Members */}
            <section className="flex flex-col gap-10">
                <h3 className="header-md">
                    Members and/or Other Members of the Family
                </h3>

                <div className="flex justify-between gap-10">
                    <div className="outline-gray flex w-full flex-wrap gap-8 overflow-x-auto rounded-lg p-6">
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
            </section>

            {/* Progress in Goals */}
            <section className="flex w-full flex-col gap-5">
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

            {/* Observation/Findings */}
            <section className="flex w-full flex-col gap-5">
                <h4 className="header-sm">Worker's Observation/Findings</h4>
                {observation_findings.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <p className="body-base pr-2.5">{index + 1}.</p>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                                updateObservations(index, e.target.value)
                            }
                            className="body-base text-area w-full"
                        />
                        <button
                            onClick={() => deleteObservation(index)}
                            className="icon-button-setup trash-button px-10"
                        ></button>
                    </div>
                ))}
                <button className="btn-primary" onClick={handleAddObservation}>
                    Add Observation/Findings
                </button>
            </section>

            {/* Interventions Made */}
            <section className="flex w-full flex-col gap-5">
                <h4 className="header-sm">Interventions Made</h4>
                {interventions.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <p className="body-base pr-2.5">{index + 1}.</p>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                                updateInterventions(index, e.target.value)
                            }
                            className="body-base text-area w-full"
                        />
                        <button
                            onClick={() => deleteIntervention(index)}
                            className="icon-button-setup trash-button px-10"
                        ></button>
                    </div>
                ))}
                <button className="btn-primary" onClick={handleAddIntervention}>
                    Add Intervention
                </button>
            </section>

            {/* Recommendation and Agreement */}
            <section className="flex w-full flex-col gap-5">
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

            {/* Buttons */}
            <div className="flex w-[22.5rem] justify-between">
                <button className="btn-outline-rounded">Cancel</button>
                <button className="btn-primary">Create Intervention</button>
            </div>
        </main>
    );
}

export default HomeVisitationForm;
