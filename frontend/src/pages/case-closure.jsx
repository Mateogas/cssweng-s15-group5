import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, TextArea, DateInput } from "../Components/TextField";

function CaseClosure() {
    /********** TEST DATA **********/

    const [data, setData] = useState({
        form_num: "4",
        first_name: "Hepzhi-Bah",
        middle_name: "Gamac",
        last_name: "Tolentino",
        ch_number: "12356473",
        dob: "2000-01-10",
        religion: "Roman Catholic",
        address: "",
        spu: "FDQ",
        closure_date: "",
        sponsorship_date: "",
        reason_for_retirement: "",
        sm_notification: "",
        evaluation: "",
        recommendation: "",
    });

    const services = [
        "Sponsorship Program",
        "Social Development Program",
        "Home Visitation",
        "Counselling",
        "Financial Assistance",
        "Correspondence",
    ];

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

    /********** TEST DATA **********/

    /********** USE STATES **********/

    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [dob, setDOB] = useState(data?.dob || "");
    const [age, setAge] = useState(calculateAge(data?.dob));
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
    const [sm_awareness, setSMAwareness] = useState("");
    const [sm_notification, setSMNotification] = useState(
        data?.sm_notification || "",
    );
    const [service_selected, setServiceSelected] = useState("");
    const [evaluation, setEvaluation] = useState(data?.evaluation || "");
    const [recommendation, setRecommendation] = useState(
        data?.recommendation || "",
    );

    /********** USE STATES **********/

    /********** FUNCTIONS **********/

    const navigate = useNavigate();

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

    /********** FUNCTIONS **********/

    return (
        <main className="flex justify-center px-20 py-20">
            <div className="flex w-full flex-col items-center justify-center gap-10 rounded-lg border border-[var(--border-color)] p-10">
                <h4 className="header-sm self-end">Form #: {form_num}</h4>
                <h3 className="header-md">Case Closure Report</h3>
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
                                <TextInput
                                    label="CH ID #"
                                    value={ch_number}
                                    disabled={true}
                                ></TextInput>
                            </div>
                            <div className="flex flex-col gap-5">
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
                                <div className="flex gap-10">
                                    <p className="label-base w-44">Address</p>
                                    <textarea
                                        value={address}
                                        disabled={true}
                                        className="text-area cursor-not-allowed bg-gray-200"
                                    ></textarea>
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
                                    label="Name of SPU/Cluster"
                                    value={spu}
                                    disabled={true}
                                ></TextInput>
                            </div>
                            <div className="flex flex-col gap-5">
                                <DateInput
                                    label="Date of Closure"
                                    value={closure_date}
                                    setValue={setClosureDate}
                                ></DateInput>
                                <DateInput
                                    label="Date Sponsored"
                                    value={sponsorship_date}
                                    setValue={setSponsorshipDate}
                                ></DateInput>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Reason for Retirement and SM Notification */}
                <section className="flex w-full flex-col gap-5">
                    <TextArea
                        label="Reasons for Retirement"
                        sublabel="Indicate reason based on the result of the case conference"
                        value={reason_for_retirement}
                        setValue={setReasonForRetirement}
                    ></TextArea>
                    <div className="flex w-full items-center gap-12">
                        <div className="flex min-w-80 flex-col gap-5">
                            <p className="body-base">
                                Is the client or SM aware of case closure?
                            </p>
                            <div className="flex gap-8">
                                <label className="flex items-center gap-2.5">
                                    <input
                                        type="checkbox"
                                        name="sm_awareness"
                                        value="yes"
                                        checked={sm_awareness === "yes"}
                                        onChange={(e) =>
                                            handleCheckboxChange(e.target.value)
                                        }
                                    />
                                    Yes
                                </label>
                                <label className="flex items-center gap-2.5">
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
                <section className="flex w-full flex-col gap-10">
                    <div className="flex w-full flex-col gap-5">
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
                            className="label-base text-input max-w-96"
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
                        <div className="flex flex-wrap gap-10">
                            {services_provided.map((item, index) => (
                                <TextArea
                                    key={index}
                                    label={item.service}
                                    value={item.description}
                                    handleChange={(e) =>
                                        updateDescription(index, e.target.value)
                                    }
                                ></TextArea>
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
                {/* Buttons */}
                <div className="mt-10 flex w-[22.5rem] justify-between">
                    <button
                        className="btn-outline-rounded"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn-primary"
                        onClick={() => navigate(-1)}
                    >
                        Close Case
                    </button>
                </div>
            </div>
        </main>
    );
}

export default CaseClosure;
