import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signature from "../../Components/Signature";
import { TextInput, TextArea } from "../../Components/TextField";

function CounsellingForm() {
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
    });

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

    return (
        <main className="flex max-w-7xl flex-col items-center justify-center gap-10 px-10">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">Counselling Form</h3>

            <section className="flex w-full gap-10">
                <div className="flex w-full flex-col gap-5 rounded-[0.5rem] border border-[var(--border-color)] p-5">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">Sponsored Member</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-10">
                        <div className="flex flex-col gap-5">
                            <TextInput label="Last Name" value={last_name} setValue={setLastName}></TextInput>
                            <TextInput label="First Name" value={first_name} setValue={setFirstName}></TextInput>
                            <TextInput label="Middle Name" value={middle_name} setValue={setMiddleName}></TextInput>
                            <TextInput label="CH ID #" value={ch_number} setValue={setCHNumber}></TextInput>
                        </div>
                        <div className="flex flex-col gap-5">
                            <TextInput label="Grade/Year Level" value={grade_year_level} setValue={setGradeYearLevel}></TextInput>
                            <TextInput label="School" value={school} setValue={setSchool}></TextInput>
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
            </section>
        </main>
    );
}
export default CounsellingForm;
