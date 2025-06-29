import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [area_and_subproject, setAreaAndSubproject] = useState(
        data?.area_and_subproject || ""
    );
    const [type_of_assistance, setTypeOfAssistance] = useState(
        data?.type_of_assistance || ""
    );
    const [other_assistance, setOtherAssistance] = useState("");
    const [problem_presented, setProblemPresented] = useState(
        data?.problem_presented || ""
    );
    const [recommendation, setRecommendation] = useState(
        data?.recommendation || ""
    );

    return (
        <main className="flex flex-col gap-10 px-10 justify-center items-center max-w-7xl">
            <h4 className="header-sm">Form #: {form_num}</h4>
            <h3 className="header-md">
                Assessment Form for Special Family Assistance
            </h3>
            <section className="flex flex-col w-full gap-8">
                <h4 className="header-sm">Type of Assistance</h4>
                <div className="flex gap-20 px-5 justify-center">
                    <div className="flex flex-col gap-4">
                        <label
                            htmlFor="funeral_assist_family"
                            className="flex gap-2.5 body-base"
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
                            className="flex gap-2.5 body-base"
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
                            className="flex gap-2.5 body-base"
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
                            className="flex gap-2.5 body-base"
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
                            className="flex gap-2.5 body-base"
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
                            className="flex gap-2.5 body-base"
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
                            className="flex gap-2.5 body-base"
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
                            className="flex gap-2.5 body-base"
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

            <section classname="flex flex-col gap-8 w-full">
                <h4 className="header-sm">Identifying Information</h4>
                <div className="flex flex-col gap-5 p-5">
                    <div className="border-b border-[var(--border-color)] ">
                        <h4 className="header-sm">Sponsored Member</h4>
                    </div>
                    <div className="flex gap-10 items-center">
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-10 items-center">
                                <p className="label-base w-44">Last Name</p>
                                <input
                                    type="text"
                                    value={last_name}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    className="body-base text-input"
                                />
                            </div>
                            <div className="flex gap-10 items-center">
                                <p className="label-base w-44">First Name</p>
                                <input
                                    type="text"
                                    value={first_name}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    className="body-base text-input"
                                />
                            </div>
                            <div className="flex gap-10 items-center">
                                <p className="label-base w-44">Middle Name</p>
                                <input
                                    type="text"
                                    value={middle_name}
                                    onChange={(e) =>
                                        setMiddleName(e.target.value)
                                    }
                                    className="body-base text-input"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-10 items-center">
                                <p className="label-base w-44">CH ID #</p>
                                <input
                                    type="text"
                                    value={ch_number}
                                    onChange={(e) =>
                                        setCHNumber(e.target.value)
                                    }
                                    className="body-base text-input"
                                />
                            </div>
                            <div className="flex gap-10 items-center">
                                <p className="label-base w-44">
                                    Area and Sub-Project
                                </p>
                                <input
                                    type="text"
                                    value={area_and_subproject}
                                    onChange={(e) =>
                                        setAreaAndSubproject(e.target.value)
                                    }
                                    className="body-base text-input"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col w-full gap-3">
                <h4 className="header-sm">Problem Presented</h4>
                <textarea
                    value={problem_presented}
                    onChange={(e) => setProblemPresented(e.target.value)}
                    className="text-area"
                ></textarea>
            </section>
        </main>
    );
}

export default FinancialAssessmentForm;
