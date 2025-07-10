import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, TextArea } from "../../Components/TextField";

// API Import
import  {   fetchCaseData, 
            fetchFormData,
            createHomeVis
        }
from '../../fetch-connections/homeVisitation-connection'; 

function FinancialAssessmentForm() {

    // ===== START :: Setting Data ===== //
    const [loading, setLoading] = useState(true);
    const [rawCaseData, setRawCaseData] = useState(null);
    const [rawFatherData, setRawFatherData] = useState(null);
    const [rawMotherData, setRawMotherData] = useState(null);
    const [rawOtherFamilyData, setRawOtherFamilyData] = useState(null);

    const [data, setData] = useState({
        form_num: "3",
        first_name: "",
        middle_name: "",
        last_name: "",
        ch_number: "",
        date: "",
        area_and_subproject: "",
        problem_presented: "",
        recommendation: "",
    });

    const all_assistance = [
        "Funeral Assistance to the Family Member",
        "Medical Assistance to the Family Member",
        "Food Assistance",
        "IGP Capital",
        "Funeral Assistance to the Sponsored Member",
        "Medical Assistance to the Sponsored Member",
        "Home Improvement/Needs",
        "Other: Please Indicate Below",
    ];

    const [type_of_assistance, setTypeOfAssistance] = useState([]);

    // ===== START :: Create New Form ===== // 

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            // [TO UPDATE] :: Case ID
            const returnData = await fetchCaseData('6849646feaa08161083d1aec');
            const caseData = returnData.case

            console.log(caseData)

            setRawCaseData(caseData);

            setData((prev) => ({
                ...prev,
                first_name: caseData.first_name || "",
                middle_name: caseData.middle_name || "",
                last_name: caseData.last_name || "",
                ch_number: caseData.sm_number || "",
                area_and_subproject: caseData.spu || "",
            }));

            setLoading(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        setFirstName(data.first_name || "");
        setMiddleName(data.middle_name || "");
        setLastName(data.last_name || "");
        setCHNumber(data.ch_number || "");
        setAreaAndSubproject(data.area_and_subproject || "");
    }, [data]);

    // ===== END :: Create New Form ===== // 

    // ===== START :: View Form ===== //
    
        useEffect(() => {
            const loadFormData = async () => {
                setLoading(true);
    
                // [TO UPDATE] :: Form ID
                const returnFormData = await fetchFormData(
                    "6849646feaa08161083d1aec",
                    "686e92a63c1f53d3ee659677",
                );
                const formData = returnFormData.form;
    
                console.log("form Data", formData);
    
                setRawFormData(formData);
    
                setData((prev) => ({
                    ...prev,
                    date: formData.createdAt || "",
                    area_and_subproject: formData.area_and_subproject || "",
                    problem_presented: formData.problem_presented || "",
                    recommendation: formData.recommendation || "",
                }));
        
                setLoading(false);
            };
            loadFormData();
        }, []);
    
        useEffect(() => {
            setAreaAndSubproject(data.area_and_subproject || "");
            setProblemPresented(data.problem_presented || "");
            setRecommendation(data.recommendation || "");
        }, [data]);
    
        /*useEffect(() => {
            if (data?.date) {
                const date = new Date(data.date);
                if (!isNaN(date)) {
                    setDate(formatter.format(date));
                }
            }
        }, [data]);
    
        const formatter = new Intl.DateTimeFormat('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });*/
    
        // ===== END :: View Form ===== //

    // ===== END :: Setting Data ===== // 

    // ===== START :: TEST DATA ===== //
    /*
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
    */
    // ===== END :: TEST DATA ===== //

    // ===== END :: Use States ===== //
    
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
    
    // ===== END :: USE STATES ===== //

    // ===== START :: Local Functions ===== //

    const navigate = useNavigate();

    const [savedTime, setSavedTime] = useState(null);
    const timeoutRef = useRef(null);
    const [sectionEdited, setSectionEdited] = useState("");

    const handleChange = (section) => (e) => {
        setSectionEdited(section);

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        setSavedTime(`Saved at ${timeString}`);

        if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
        setSavedTime(null);
        }, 3000);
    };

    const handleCheckboxChange = (value) => {
        setTypeOfAssistance((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value],
        );
    };

    // ===== END :: Local Functions ===== //

    if (!data) return <div>No data found.</div>;

    return (
        <main className="flex w-full flex-col items-center justify-center gap-16 rounded-lg border border-[var(--border-color)] p-16">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">
                Assessment Form for Special Family Assistance
            </h3>

            {/* Type of Assistance */}
            <section className="flex w-full flex-col gap-12">
                <h4 className="header-sm">Type of Assistance</h4>
                <div className="flex justify-center gap-20 px-8">
                    <div className="flex flex-col gap-4">
                        {all_assistance.slice(0, 4).map((item, index) => (
                            <label key={`assistance_${index}`} className="body-base flex gap-4">
                                <input
                                    type="checkbox"
                                    id={`assistance_${index}`}
                                    value={item}
                                    checked={type_of_assistance.includes(item)}
                                    onChange={(e) => {
                                        handleCheckboxChange(e.target.value)
                                        handleChange("Type of Assistance")(e)
                                    }}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4">
                        {all_assistance.slice(4, 8).map((item, index) => (
                            <label key={`assistance_${index}`} className="body-base flex gap-4">
                                <input
                                    type="checkbox"
                                    id={`assistance_${index}`}
                                    value={item}
                                    checked={type_of_assistance.includes(item)}
                                    onChange={(e) => {
                                        handleCheckboxChange(e.target.value);
                                        handleChange("Type of Assistance")(e);
                                    }}
                                />
                                {item}
                            </label>
                        ))}
                        
                        <textarea
                            id="other_assistance"
                            name="other_assistance"
                            value={other_assistance}
                            onChange={(e) => {
                                setOtherAssistance(e.target.value);
                                handleChange("Type of Assistance")(e);
                            }}
                            placeholder="Form of Assistance"
                            className="text-input h-32 w-full"
                        ></textarea>
                    </div>
                </div>
                {savedTime && sectionEdited === "Type of Assistance" && (
                    <p className="text-sm self-end mt-2">{savedTime}</p>
                )}
            </section>

            {/* Identifying Information */}
            <section className="flex w-full flex-col items-center gap-12">
                <h4 className="header-sm w-full">Identifying Information</h4>
                <div className="flex w-full flex-col gap-8 rounded-[0.8rem] border border-[var(--border-color)] p-8">
                    <div className="flex border-b border-[var(--border-color)]">
                        <h4 className="header-sm">Sponsored Member</h4>
                    </div>
                    <div className="inline-flex items-center justify-center gap-16">
                        <div className="flex flex-col gap-8">
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
                        <div className="flex flex-col gap-8">
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
            <div className="flex w-full justify-center gap-20">
                <button
                    className="btn-outline font-bold-label"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </button>
                <button className="btn-primary font-bold-label" onClick={() => navigate(-1)}>
                    Create Intervention
                </button>
            </div>
        </main>
    );
}

export default FinancialAssessmentForm;
