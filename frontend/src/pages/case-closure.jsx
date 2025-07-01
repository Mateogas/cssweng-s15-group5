import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, TextArea } from "../Components/TextField";

function CaseClosure() {
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
        reason_for_retirement: "",
        sm_notification: "",
        evaluation: "",
        recommendation: "",
    });

    const [sm_awareness, setSMAwareness] = useState("");

    const handleCheckboxChange = (value) => {
        setSMAwareness(value);
    };

    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [dob, setDOB] = useState(data?.dob || "");
    const [religion, setReligion] = useState(data?.religion || "");
    const [address, setAddress] = useState(data?.address || "");
    const [spu, setSPU] = useState(data?.spu || "");
    const [closure_date, setClosureDate] = useState(data?.closure_date || "");
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

    return (
        <main className="flex max-w-7xl flex-col items-center justify-center gap-10 px-10">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">Case Closure Report</h3>

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
                            <TextInput
                                label="CH ID #"
                                value={ch_number}
                                setValue={setCHNumber}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col gap-5">
                            <TextInput
                                label="Date of Birth"
                                value={dob}
                                setValue={setDOB}
                            ></TextInput>
                            <TextInput
                                label="Religion"
                                value={religion}
                                setValue={setReligion}
                            ></TextInput>
                            <div className="flex gap-10">
                                <p className="label-base w-44">Address</p>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="text-area"
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
                        <TextInput
                            label="Name of SPU/Cluster"
                            value={spu}
                            setValue={setSPU}
                        ></TextInput>
                        <TextInput
                            label="Date of Closure"
                            value={closure_date}
                            setValue={setClosureDate}
                        ></TextInput>
                    </div>
                </div>
            </section>

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

            <section className="flex w-full">
                <TextArea
                    label="Evaluation"
                    sublabel="Based on the intervention plans including Case Management Results"
                    value={evaluation}
                    setValue={setEvaluation}
                ></TextArea>
            </section>

            <section className="flex w-full">
                <TextArea
                    label="Recommendation"
                    sublabel="Retirement, Transfer to another project, and/or to Virtual Subproject"
                    value={evaluation}
                    setValue={setEvaluation}
                ></TextArea>
            </section>

            <div className="flex w-[22.5rem] justify-between mt-10">
                <button className="btn-outline-rounded">Cancel</button>
                <button className="btn-primary">Close Case</button>
            </div>
        </main>
    );
}

export default CaseClosure;
