import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, TextArea, DateInput } from "../../Components/TextField";

function CounsellingForm() {

    /********** TEST DATA **********/

    const [data, setData] = useState({
        form_num: "4",
        first_name: "Hephzi-Bah",
        middle_name: "Gamac",
        last_name: "Tolentino",
        ch_number: "12356473",
        grade_year_level: "",
        school: "",
        address: "",
        subproject: "",
        area_self_help: "",
        counselling_date: "",
        reason_for_counselling: "",
        corrective_action: "",
        recommendation: "",
        sm_comments: "",
    });

    /********** TEST DATA **********/

    /********** USE STATES **********/

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
    const [counselling_date, setCounsellingDate] = useState(
        data?.counselling_date || "",
    );
    const [reason_for_counselling, setReasonForCounselling] = useState(
        data?.reason_for_counselling || "",
    );
    const [corrective_action, setCorrectiveAction] = useState(
        data?.corrective_action || "",
    );
    const [recommendation, setRecommendation] = useState(
        data?.recommendation || "",
    );
    const [sm_comments, setSMComments] = useState(data?.sm_comments || "");

    /********** USE STATES **********/

    return (
        <main className="flex max-w-7xl flex-col items-center justify-center gap-10 px-10">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">Counselling Form</h3>

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
                                label="Grade/Year Level"
                                value={grade_year_level}
                                setValue={setGradeYearLevel}
                            ></TextInput>
                            <TextInput
                                label="School"
                                value={school}
                                setValue={setSchool}
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
                        <div className="flex flex-col gap-5">
                            <TextInput
                                label="Sub-Project"
                                value={subproject}
                                setValue={setSubproject}
                            ></TextInput>
                            <TextInput
                                label="Area/Self-Help Group"
                                value={area_self_help}
                                setValue={setAreaSelfHelp}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col gap-5">
                            <DateInput
                                label="Date of Counselling"
                                value={counselling_date}
                                setValue={setCounsellingDate}
                            ></DateInput>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reason for Counselling and Corrective Action */}
            <section className="flex w-full items-end gap-10">
                <TextArea
                    label="Purpose/Reason for Counselling"
                    value={reason_for_counselling}
                    setValue={setReasonForCounselling}
                ></TextArea>
                <TextArea
                    label="Corrective and/or Disciplinary Action To Be Taken"
                    value={corrective_action}
                    setValue={setCorrectiveAction}
                ></TextArea>
            </section>

            {/* Recommendation and Comments */}
            <section className="flex w-full flex-col gap-15">
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
            <div className="flex w-[22.5rem] justify-between">
                <button className="btn-outline-rounded">Cancel</button>
                <button className="btn-primary">Create Intervention</button>
            </div>
        </main>
    );
}
export default CounsellingForm;
