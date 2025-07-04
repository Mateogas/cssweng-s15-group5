import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, TextArea, DateInput } from "../Components/TextField";

function ProgressReport() {
    /********** TEST DATA **********/

    const [data, setData] = useState({
        form_num: "2",
        first_name: "Hepzhi-Bah",
        middle_name: "Gamac",
        last_name: "Tolentino",
        ch_number: "12356473",
        dob: "2000-01-10",
        sponsor_name: "",
        sponsorship_date: "",
        subproject: "FDQ",
        date_accomplished: "",
        period_covered: "",
        sm_update: "",
        family_update: "",
        services_to_family: "",
        participation: "",
    });

    const relation_to_sponsor = [
        { id: "q1", text: "Knows his/her sponsor's name?" },
        { id: "q2", text: "Cooperative with the program?" },
        { id: "q3", text: "Writes personalized letters in a timely manner?" },
    ];

    const options = ["Yes", "Sometimes", "No"];

    /********** TEST DATA **********/

    /********** USE STATES **********/

    const [responses, setResponses] = useState({
        q1: "",
        q2: "",
        q3: "",
    });

    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [dob, setDOB] = useState(data?.dob || "");
    const [age, setAge] = useState(calculateAge(data?.dob));
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

    /********** USE STATES **********/

    /********** FUNCTIONS **********/

    const handleCheckboxChange = (questionID, value) => {
        setResponses((prev) => ({
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

    /********** FUNCTIONS **********/

    return (
        <main className="flex w-7xl flex-col items-center justify-center gap-10 rounded-lg border border-[var(--border-color)] p-10">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">Individual Progress Report</h3>

            {/* Sponsored Member and General Info */}
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

                <div className="flex w-full flex-col gap-5 rounded-[0.5rem] border border-[var(--border-color)] p-5">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">General Information</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-10">
                        <div className="flex flex-col gap-5">
                            <TextInput
                                label="Sub-Project"
                                value={subproject}
                                disabled={true}
                            ></TextInput>
                            <DateInput
                                label="Date Accomplished"
                                value={date_accomplished}
                                setValue={setDateAccomplished}
                            ></DateInput>
                            <TextInput
                                label="Period Covered"
                                value={period_covered}
                                setValue={setPeriodCovered}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col gap-5">
                            <TextInput
                                label="Name of Sponsor"
                                value={sponsor_name}
                                setValue={setSponsorName}
                            ></TextInput>
                            <DateInput
                                label="Sponsorship Begin Date"
                                value={sponsorship_date}
                                setValue={setSponsorshipDate}
                            ></DateInput>
                        </div>
                    </div>
                </div>
            </section>

            {/* Update/Developmert */}
            <section className="flex w-full flex-col gap-10">
                <div className="flex w-full flex-col gap-5">
                    <h3 className="header-md">Update/Development</h3>
                    <h4 className="header-sm">
                        e.g. Education, Health, Socio-Economic, Behavioral,
                        Social, etc.
                    </h4>
                </div>
                <div className="flex w-full gap-10">
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
            <section className="flex w-full flex-col gap-5">
                <h4 className="header-sm">Relationship to Sponsor & Unbound</h4>
                <div className="flex gap-24">
                    {relation_to_sponsor.map((q) => (
                        <div
                            key={q.id}
                            className="flex flex-col justify-end gap-5"
                        >
                            <p className="body-base">{q.text}</p>
                            <div className="flex gap-8">
                                {options.map((option) => (
                                    <label
                                        key={option}
                                        className="flex items-center gap-2.5"
                                    >
                                        <input
                                            type="checkbox"
                                            name={q.id}
                                            value={option}
                                            checked={responses[q.id] === option}
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    q.id,
                                                    option,
                                                )
                                            }
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Buttons */}
            <div className="mt-10 flex w-[22.5rem] justify-between">
                <button className="btn-outline-rounded">Cancel</button>
                <button className="btn-primary">Create Progress Report</button>
            </div>
        </main>
    );
}

export default ProgressReport;
