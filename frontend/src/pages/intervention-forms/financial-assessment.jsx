import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, TextArea } from "../../Components/TextField";

function FinancialAssessmentForm() {
    /********** TEST DATA **********/

    const [data, setData] = useState({
        form_num: "3",
        type_of_assistance: [
            "Food Assistance",
            "IGP Capital",
            "Medical Assistance to the Sponsored Member",
        ],
        first_name: "Hepzhi-Bah",
        middle_name: "Gamac",
        last_name: "Tolentino",
        ch_number: "12356473",
        area_and_subproject: "FDQ",
        problem_presented: "",
        recommendation: "",
    });

    const [type_of_assistance, setTypeOfAssistance] = useState([
        "Food Assistance",
        "IGP Capital",
        "Medical Assistance to the Sponsored Member",
    ]);

    /********** TEST DATA **********/

    /********** USE STATES **********/

    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [area_and_subproject, setAreaAndSubproject] = useState(
        data?.area_and_subproject || "",
    );
    const [other_assistance, setOtherAssistance] = useState("");
    const [problem_presented, setProblemPresented] = useState(
        data?.problem_presented || "",
    );
    const [recommendation, setRecommendation] = useState(
        data?.recommendation || "",
    );

    /********** USE STATES **********/

    /********** FUNCTIONS **********/

    const handleCheckboxChange = (value) => {
        setTypeOfAssistance((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value],
        );
    };

    /********** FUNCTIONS **********/

    return (
        <main className="flex max-w-7xl flex-col items-center justify-center gap-10 rounded-lg border border-[var(--border-color)] p-10">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">
                Assessment Form for Special Family Assistance
            </h3>

            {/* Type of Assistance */}
            <section className="flex w-full flex-col gap-8">
                <h4 className="header-sm">Type of Assistance</h4>
                <div className="flex justify-center gap-20 px-5">
                    <div className="flex flex-col gap-4">
                        <label className="body-base flex gap-2.5">
                            <input
                                type="checkbox"
                                id="funeral_assist_family"
                                value="Funeral Assistance to the Family Member"
                                checked={type_of_assistance.includes(
                                    "Funeral Assistance to the Family Member",
                                )}
                                onChange={(e) =>
                                    handleCheckboxChange(e.target.value)
                                }
                            />
                            Funeral Assistance to the Family Member
                        </label>
                        <label className="body-base flex gap-2.5">
                            <input
                                type="checkbox"
                                id="medical_assist_family"
                                value="Medical Assistance to the Family Member"
                                checked={type_of_assistance.includes(
                                    "Medical Assistance to the Family Member",
                                )}
                                onChange={(e) =>
                                    handleCheckboxChange(e.target.value)
                                }
                            />
                            Medical Assistance to the Family Member
                        </label>
                        <label className="body-base flex gap-2.5">
                            <input
                                type="checkbox"
                                id="food_assist"
                                value="Food Assistance"
                                checked={type_of_assistance.includes(
                                    "Food Assistance",
                                )}
                                onChange={(e) =>
                                    handleCheckboxChange(e.target.value)
                                }
                            />
                            Food Assistance
                        </label>
                        <label className="body-base flex gap-2.5">
                            <input
                                type="checkbox"
                                id="igp_cap"
                                value="IGP Capital"
                                checked={type_of_assistance.includes(
                                    "IGP Capital",
                                )}
                                onChange={(e) =>
                                    handleCheckboxChange(e.target.value)
                                }
                            />
                            IGP Capital
                        </label>
                    </div>
                    <div className="flex flex-col gap-4">
                        <label className="body-base flex gap-2.5">
                            <input
                                type="checkbox"
                                id="funeral_assist_sponsored"
                                value="Funeral Assistance to the Sponsored Member"
                                checked={type_of_assistance.includes(
                                    "Funeral Assistance to the Sponsored Member",
                                )}
                                onChange={(e) =>
                                    handleCheckboxChange(e.target.value)
                                }
                            />
                            Funeral Assistance to the Sponsored Member
                        </label>
                        <label className="body-base flex gap-2.5">
                            <input
                                type="checkbox"
                                id="medical_assist_sponsored"
                                value="Medical Assistance to the Sponsored Member"
                                checked={type_of_assistance.includes(
                                    "Medical Assistance to the Sponsored Member",
                                )}
                                onChange={(e) =>
                                    handleCheckboxChange(e.target.value)
                                }
                            />
                            Medical Assistance to the Sponsored Member
                        </label>
                        <label className="body-base flex gap-2.5">
                            <input
                                type="checkbox"
                                id="home_improve"
                                value="Home Improvement/Needs"
                                checked={type_of_assistance.includes(
                                    "Home Improvement/Needs",
                                )}
                                onChange={(e) =>
                                    handleCheckboxChange(e.target.value)
                                }
                            />
                            Home Improvement/Needs
                        </label>
                        <label className="body-base flex gap-2.5">
                            <input
                                type="checkbox"
                                id="other_assist"
                                value="Other"
                                checked={type_of_assistance.includes("Other")}
                                onChange={(e) =>
                                    handleCheckboxChange(e.target.value)
                                }
                            />
                            Other: Please Indicate Below
                        </label>
                        <textarea
                            id="other_assistance"
                            name="other_assistance"
                            value={other_assistance}
                            onChange={(e) => setOtherAssistance(e.target.value)}
                            placeholder="Form of Assistance"
                            className="text-input w-full"
                        ></textarea>
                    </div>
                </div>
            </section>

            {/* Identifying Information */}
            <section className="flex w-full flex-col items-center gap-8">
                <h4 className="header-sm w-full">Identifying Information</h4>
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
                            <TextInput
                                label="Area and Sub-Project"
                                value={area_and_subproject}
                                disabled={true}
                            ></TextInput>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Presented */}
            <section className="flex w-full">
                <TextArea
                    label="Problem Presented"
                    value={problem_presented}
                    setValue={setProblemPresented}
                ></TextArea>
            </section>

            {/* Recommendation */}
            <section className="flex w-full">
                <TextArea
                    label="Recommendation"
                    value={recommendation}
                    setValue={setRecommendation}
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

export default FinancialAssessmentForm;
