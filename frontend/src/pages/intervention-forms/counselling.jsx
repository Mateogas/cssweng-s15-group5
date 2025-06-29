import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signature from "../../Components/Signature";
import TextArea from "../../Components/TextArea";

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
                            <div className="flex items-center gap-10">
                                <p className="label-base w-44">Last Name</p>
                                <input
                                    type="text"
                                    value={last_name}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    className="body-base text-input w-64"
                                />
                            </div>
                            <div className="flex items-center gap-10">
                                <p className="label-base w-44">First Name</p>
                                <input
                                    type="text"
                                    value={first_name}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    className="body-base text-input w-64"
                                />
                            </div>
                            <div className="flex items-center gap-10">
                                <p className="label-base w-44">Middle Name</p>
                                <input
                                    type="text"
                                    value={middle_name}
                                    onChange={(e) =>
                                        setMiddleName(e.target.value)
                                    }
                                    className="body-base text-input w-64"
                                />
                            </div>
                            <div className="flex items-center gap-10">
                                <p className="label-base w-44">CH ID #</p>
                                <input
                                    type="text"
                                    value={ch_number}
                                    onChange={(e) =>
                                        setCHNumber(e.target.value)
                                    }
                                    className="body-base text-input w-64"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-10">
                                <p className="label-base w-44">Grade/Year Level</p>
                                <input
                                    type="text"
                                    value={grade_year_level}
                                    onChange={(e) =>
                                        setGradeYearLevel(e.target.value)
                                    }
                                    className="body-base text-input w-64"
                                />
                            </div>
                            <div className="flex items-center gap-10">
                                <p className="label-base w-44">School</p>
                                <input
                                    type="text"
                                    value={school}
                                    onChange={(e) =>
                                        setSchool(e.target.value)
                                    }
                                    className="body-base text-input w-64"
                                />
                            </div>
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
