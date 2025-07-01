import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signature from "../../Components/Signature";
import { TextInput, TextArea } from "../../Components/TextField";

function FinancialAssessmentForm() {
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

    return (
        <main className="flex max-w-7xl flex-col items-center justify-center gap-10 px-10">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">
                Assessment Form for Special Family Assistance
            </h3>

            <section className="flex w-full flex-col gap-8">
                <h4 className="header-sm">Type of Assistance</h4>
                <div className="flex justify-center gap-20 px-5">
                    <div className="flex flex-col gap-4">
                        <label
                            htmlFor="funeral_assist_family"
                            className="body-base flex gap-2.5"
                        >
                            <input
                                type="checkbox"
                                id="funeral_assist_family"
                                name="type_of_assistance"
                                value="Funeral Assistance to the Family Member"
                            />
                            Funeral Assistance to the Family Member
                        </label>
                        <label
                            htmlFor="medical_assist_family"
                            className="body-base flex gap-2.5"
                        >
                            <input
                                type="checkbox"
                                id="medical_assist_family"
                                name="type_of_assistance"
                                value="Medical Assistance to the Family Member"
                            />
                            Medical Assistance to the Family Member
                        </label>
                        <label
                            htmlFor="food_assist"
                            className="body-base flex gap-2.5"
                        >
                            <input
                                type="checkbox"
                                id="food_assist"
                                name="type_of_assistance"
                                value="Food Assistance"
                            />
                            Food Assistance
                        </label>
                        <label
                            htmlFor="igp_cap"
                            className="body-base flex gap-2.5"
                        >
                            <input
                                type="checkbox"
                                id="igp_cap"
                                name="type_of_assistance"
                                value="IGP Capital"
                            />
                            IGP Capital
                        </label>
                    </div>
                    <div className="flex flex-col gap-4">
                        <label
                            htmlFor="funeral_assist_sponsored"
                            className="body-base flex gap-2.5"
                        >
                            <input
                                type="checkbox"
                                id="funeral_assist_sponsored"
                                name="type_of_assistance"
                                value="Funeral Assistance to the Sponsored Member"
                            />
                            Funeral Assistance to the Sponsored Member
                        </label>
                        <label
                            htmlFor="medical_assist_sponsored"
                            className="body-base flex gap-2.5"
                        >
                            <input
                                type="checkbox"
                                id="medical_assist_sponsored"
                                name="type_of_assistance"
                                value="Medical Assistance to the Sponsored Member"
                            />
                            Medical Assistance to the Sponsored Member
                        </label>
                        <label
                            htmlFor="home_improve"
                            className="body-base flex gap-2.5"
                        >
                            <input
                                type="checkbox"
                                id="home_improve"
                                name="type_of_assistance"
                                value="Home Improvement/Needs"
                            />
                            Home Improvement/Needs
                        </label>
                        <label
                            htmlFor="other_assist"
                            className="body-base flex gap-2.5"
                        >
                            <input
                                type="checkbox"
                                id="other_assist"
                                name="type_of_assistance"
                                value="Other"
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

            <section className="flex w-full flex-col items-center gap-8">
                <h4 className="header-sm w-full">Identifying Information</h4>
                <div className="flex w-max flex-col gap-5 rounded-[0.5rem] border border-[var(--border-color)] p-5">
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
                                label="CH ID #"
                                value={ch_number}
                                setValue={setCHNumber}
                            ></TextInput>
                            <TextInput
                                label="Area and Sub-Project"
                                value={area_and_subproject}
                                setValue={setAreaAndSubproject}
                            ></TextInput>
                        </div>
                    </div>
                </div>
            </section>

            <TextArea
                label="Problem Presented"
                value={problem_presented}
                setValue={setProblemPresented}
            ></TextArea>

            <TextArea
                label="Recommendation"
                value={recommendation}
                setValue={setRecommendation}
            ></TextArea>

            <div className="flex w-[22.5rem] justify-between">
                <button className="btn-outline-rounded">Cancel</button>
                <button className="btn-primary">Create Intervention</button>
            </div>
        </main>
    );
}

export default FinancialAssessmentForm;
