import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import FamilyCard from "../../Components/FamilyCard";
import SimpleModal from '../../Components/SimpleModal';
import NavLabelButton from '../../components/NavLabelButton';

import { fetchSession } from "../../fetch-connections/account-connection";
import { createNewCase } from "../../fetch-connections/case-connection";

// API Imports
import {
    fetchCaseData,
    fetchFamilyMembers,
    fetchCaseBySMNumber,
    editProblemsFindings,
    editAssessment,
    editEvalReco,
    updateCoreCaseData,
    updateIdentifyingCaseData,
    fetchSDWs,
}
    from '../../fetch-connections/case-connection';

// Financial Intervention API Imports
import {
    fetchAllFinInterventions
} from "../../fetch-connections/financialForm-connection";

// Counselling Intervention API Imports
import {
    fetchAllCounselingInterventionsByMemberId
} from "../../fetch-connections/intervention-connection";

// Counselling Intervention API Imports
import {
    fetchAllCorrespInterventions
} from "../../fetch-connections/correspFormConnection";

// Progress Reports API Imports
import {
    fetchProgressReportsForCase
} from "../../fetch-connections/progress-report-connection";

function CaseFrontend({ creating = false }) {
    // console.log(creating);

    const navigate = useNavigate();
    const { clientId } = useParams();

    const [user, setUser] = useState(null);

    const [data, setData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        sm_number: "",
        sex: "",
        dob: "",
        civil_status: "",
        edu_attainment: "",
        occupation: "",
        pob: "",
        religion: "",
        contact_no: "",
        present_address: "",
        relationship_to_client: "",
        problem_presented: "",
        observation_findings: "",
        recommendation: "",
        history_problem: "",
        evaluation: "",
        is_active: "",
        assessment: "",
        assigned_sdw: "",
        spu: "",
        classifications: []
    });

    const [familyMembers, setFamilyMembers] = useState([]);

    useEffect(() => {
        const loadCaseData = async () => {
            if (!clientId) return;

            const fetchedData = await fetchCaseData(clientId);
            //console.log("FETCHED DATA", fetchedData);

            setData({
                ...fetchedData,
                assigned_sdw: fetchedData.assigned_sdw?._id || ""
            });

            setDrafts({
                first_name: fetchedData.first_name || "",
                middle_name: fetchedData.middle_name || "",
                last_name: fetchedData.last_name || "",
                sm_number: fetchedData.sm_number || "",
                spu: fetchedData.spu || "",
                assigned_sdw: fetchedData.assigned_sdw._id || "",
                classifications: fetchedData.classifications || [],

                dob: fetchedData.dob || "",
                civil_status: fetchedData.civil_status || "",
                edu_attainment: fetchedData.edu_attainment || "",
                sex: fetchedData.sex || "",
                pob: fetchedData.pob || "",
                religion: fetchedData.religion || "",
                occupation: fetchedData.occupation || "",
                present_address: fetchedData.present_address || "",
                contact_no: fetchedData.contact_no || "",
                relationship_to_client: fetchedData.relationship_to_client || "",

                problem_presented: fetchedData.problem_presented || "",
                history_problem: fetchedData.history_problem || "",
                observation_findings: fetchedData.observation_findings || "",
                assessment: fetchedData.assessment || "",
                recommendation: fetchedData.recommendation || "",
                evaluation: fetchedData.evaluation || "",
            });

            setAge(calculateAge(fetchedData.dob));
        };

        const loadFamilyData = async () => {
            if (!clientId) return;

            const fetchedData = await fetchFamilyMembers(clientId);

            setFamilyMembers(fetchedData);
        };

        loadCaseData();
        loadFamilyData();
    }, [clientId]);

    const [projectLocation, setProjectLocation] = useState([
        {
            name: "AMP",
            projectCode: "AMP",
        },
        {
            name: "FDQ",
            projectCode: "FDQ",
        },
        {
            name: "MPH",
            projectCode: "MPH",
        },
        {
            name: "MS",
            projectCode: "MS",
        },
        {
            name: "AP",
            projectCode: "AV",
        },
        {
            name: "MM",
            projectCode: "MM",
        },
        {
            name: "MMP",
            projectCode: "MMP",
        },
    ]);

    const [socialDevelopmentWorkers, setSocialDevelopmentWorkers] = useState([]);

    useEffect(() => {
        const loadSDWs = async () => {
            const sdws = await fetchSDWs();
            setSocialDevelopmentWorkers(sdws);

            // console.log("LOADING SDW", sdws);
        };
        loadSDWs();
    }, []);

    const [classificationList, setClassificationList] = useState([
        "Child",
        "Youth",
        "Older Adult"
    ]);

    const [age, setAge] = useState(calculateAge(data?.dob));

    const [drafts, setDrafts] = useState({
        first_name: data.first_name || "",
        middle_name: data.middle_name || "",
        last_name: data.last_name || "",
        sm_number: data.sm_number || "",
        spu: data.spu || "",
        assigned_sdw: data.assigned_sdw || "",
        classifications: data.classifications || [],
        is_active: data.is_active || "",

        dob: data.dob || "",
        civil_status: data.civil_status || "",
        edu_attainment: data.edu_attainment || "",
        sex: data.sex || "",
        pob: data.pob || "",
        religion: data.religion || "",
        occupation: data.occupation || "",
        present_address: data.present_address || "",
        contact_no: data.contact_no || "",
        relationship_to_client: data.relationship_to_client || "",

        problem_presented: data.problem_presented || "",
        history_problem: data.history_problem || "",
        observation_findings: data.observation_findings || "",
        assessment: data.assessment || "",
        recommendation: data.recommendation || "",
        evaluation: data.evaluation || "",
    });

    const resetFields = () => {
        // console.log("RESET FIEDLS", data.assigned_sdw._id);

        setDrafts({
            first_name: data.first_name || "",
            middle_name: data.middle_name || "",
            last_name: data.last_name || "",
            sm_number: data.sm_number || "",
            spu: data.spu || "",
            assigned_sdw: data.assigned_sdw._id || "",
            classifications: data.classifications || [],

            dob: data.dob || "",
            civil_status: data.civil_status || "",
            edu_attainment: data.edu_attainment || "",
            sex: data.sex || "",
            pob: data.pob || "",
            religion: data.religion || "",
            occupation: data.occupation || "",
            present_address: data.present_address || "",
            contact_no: data.contact_no || "",
            relationship_to_client: data.relationship_to_client || "",

            problem_presented: data.problem_presented || "",
            history_problem: data.history_problem || "",
            observation_findings: data.observation_findings || "",
            assessment: data.assessment || "",
            recommendation: data.recommendation || "",
            evaluation: data.evaluation || "",
        });

        setEditingField(null);
    };


    useEffect(() => {
        setAge(calculateAge(drafts.dob));
    }, [drafts.dob]);

    const [ref1, inView1] = useInView({ threshold: 0.5 });
    const [ref2, inView2] = useInView({ threshold: 0.5 });
    const [ref3, inView3] = useInView({ threshold: 0.5 });
    const [ref4, inView4] = useInView({ threshold: 0.5 });
    const [ref5, inView5] = useInView({ threshold: 0.5 });
    const [ref6, inView6] = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (inView1) setCurrentSection("identifying-data");
        else if (inView2) setCurrentSection("family-composition");
        else if (inView3) setCurrentSection("problems-findings");
        else if (inView4) setCurrentSection("interventions");
        else if (inView5) setCurrentSection("assessments");
        else if (inView6) setCurrentSection("evaluation-recommendation");
    }, [inView1, inView2, inView3, inView4, inView5, inView6]);

    const sliderRef = useRef(null);

    const handleMouseDown = (e) => {
        const slider = sliderRef.current;
        slider.isDown = true;
        slider.startX = e.pageX - slider.offsetLeft;
        slider.scrollLeft = slider.scrollLeft;
        slider.classList.add("cursor-grabbing");
        slider.style.userSelect = "none";
    };

    const handleMouseLeave = () => {
        const slider = sliderRef.current;
        slider.isDown = false;
        slider.classList.remove("cursor-grabbing");
        slider.style.userSelect = "";
    };

    const handleMouseUp = () => {
        const slider = sliderRef.current;
        slider.isDown = false;
        slider.classList.remove("cursor-grabbing");
        slider.style.userSelect = "";
    };

    const handleMouseMove = (e) => {
        const slider = sliderRef.current;
        if (!slider.isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - slider.startX) * 0.05; // adjust speed
        slider.scrollLeft -= walk;
    };

    useEffect(() => {
        const loadSession = async () => {
            const sessionData = await fetchSession();
            const currentUser = sessionData?.user || null;
            setUser(currentUser);
            console.log("Session:", currentUser);

            if (creating && currentUser) {
                setDrafts(prev => ({
                    ...prev,
                    spu: currentUser.spu_id || "",
                    assigned_sdw: currentUser._id || "",
                }));
            }
        };
        loadSession();
    }, [creating]);

    //console.log(drafts);

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

    const [selectedClassification, setSelectedClassification] = useState("");

    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        if (creating) {
            setEditingField("all");
        }
    }, [creating]);

    const [currentSection, setCurrentSection] = useState("identifying-data");

    const [selectedFamily, setSelectedFamily] = useState(null);
    const [editingFamilyValue, setEditingFamilyValue] = useState({});

    const [familyCounter, setFamilyCounter] = useState(familyMembers.length);

    const [familyToDelete, setFamilyToDelete] = useState(null);

    const [familyConfirm, setFamilyConfirm] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [modalConfirm, setModalConfirm] = useState(false);
    const [modalOnConfirm, setModalOnConfirm] = useState(() => { });
    const [modalImageCenter, setModalImageCenter] = useState(null);

    function formatListWithAnd(arr) {
        if (arr.length === 0) return "";
        if (arr.length === 1) return arr[0];
        if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
        const last = arr[arr.length - 1];
        return `${arr.slice(0, -1).join(", ")}, and ${last}`;
    }

    function showSuccess(message) {
        setModalTitle('Success!');
        setModalBody(message);
        setModalImageCenter(<div className='success-icon mx-auto'></div>);
        setModalConfirm(false);
        setShowModal(true);
    }

    const checkCore = async () => {
        const missing = [];

        if (!drafts.first_name || drafts.first_name.trim() === "") {
            missing.push("First Name");
        } else if (/\d/.test(drafts.first_name)) {
            missing.push("First Name must not contain numbers");
        }

        if (!drafts.middle_name || drafts.middle_name.trim() === "") {
            missing.push("Middle Name");
        } else if (/\d/.test(drafts.middle_name)) {
            missing.push("Middle Name must not contain numbers");
        }

        if (!drafts.last_name || drafts.last_name.trim() === "") {
            missing.push("Last Name");
        } else if (/\d/.test(drafts.last_name)) {
            missing.push("Last Name must not contain numbers");
        }

        if (!drafts.sm_number) {
            missing.push("SM Number");
        } else if (isNaN(Number(drafts.sm_number))) {
            missing.push("SM Number must only be numeric");
        } else if (Number(drafts.sm_number) < 0) {
            missing.push("SM Number cannot be negative");
        }

        if (drafts.sm_number) {
            const check = await fetchCaseBySMNumber(Number(drafts.sm_number));
            console.log("Fetched case by SM:", check);

            if (check.found) {
                console.log(
                    "Comparing found sm_number:", String(check.data.sm_number),
                    "vs current draft sm_number:", String(drafts.sm_number)
                );

                if (String(check.data.sm_number).trim() !== String(data.sm_number).trim()) {
                    // Same SM Number used by a different case → block
                    missing.push(`SM Number already exists and belongs to another case`);
                } else {
                    // Same SM Number as current case → allow
                    console.log("SM Number belongs to same case — valid");
                }
            } else {
                console.log("SM Number is unique — valid");
            }
        }

        if (!drafts.spu) missing.push("SPU Project");
        if (!drafts.assigned_sdw) missing.push("Social Development Worker");

        const validSDWIds = socialDevelopmentWorkers
            .filter((sdw) => sdw.spu_id === drafts.spu)
            .map((sdw) => sdw.id);

        if (drafts.assigned_sdw && !validSDWIds.includes(drafts.assigned_sdw)) {
            missing.push("valid Social Development Worker for selected SPU");
        }


        if (missing.length > 0) {
            setModalTitle("Invalid Fields");
            setModalBody(`The following fields are missing or invalid: ${formatListWithAnd(missing)}`);
            setModalImageCenter(<div className="warning-icon mx-auto"></div>);
            setModalConfirm(false);
            setShowModal(true);
            return false;
        }

        return true;
    };

    useEffect(() => {
        const validSDWIds = socialDevelopmentWorkers
            .filter((sdw) => sdw.spu_id === drafts.spu)
            .map((sdw) => sdw.id);

        if (drafts.assigned_sdw && !validSDWIds.includes(drafts.assigned_sdw)) {
            setDrafts((prev) => ({
                ...prev
            }));
        }
    }, [drafts.spu, drafts.assigned_sdw, socialDevelopmentWorkers]);


    function checkIdentifying() {
        const missing = [];

        if (!drafts.dob) {
            missing.push('Date of Birth');
        } else {
            const selectedDate = new Date(drafts.dob);
            const today = new Date();
            if (selectedDate > today) {
                missing.push('Date of Birth cannot be in the future');
            }
        }

        if (!drafts.sex) {
            missing.push('Sex');
        }

        if (!drafts.civil_status) {
            missing.push('Civil Status');
        }

        if (!drafts.present_address || drafts.present_address.trim() === "") {
            missing.push("Present Address");
        }

        if (!drafts.pob || drafts.pob.trim() === "") {
            missing.push("Place of Birth");
        }

        if (drafts.contact_no && drafts.contact_no.length !== 11) {
            missing.push('Contact No. must be exactly 11 digits');
        }

        if (missing.length > 0) {
            setModalTitle('Invalid Fields');
            setModalBody(`The following fields are missing or invalid: ${formatListWithAnd(missing)}`);
            setModalImageCenter(<div className="warning-icon mx-auto"></div>);
            setModalConfirm(false);
            setShowModal(true);
            return false;
        }

        return true;
    }


    const handleAddFamilyMember = () => {
        const newMember = {
            first: "",
            middle: "",
            last: "",
            age: "",
            income: "",
            civilStatus: "",
            occupation: "",
            education: "",
            relationship: "",
            status: "Living",
            newlyCreated: true,
        };

        setFamilyMembers((prev) => [newMember, ...prev]);
        setSelectedFamily(0);
        setEditingFamilyValue(newMember);
    };

    const handleDeleteFamilyMember = (familyToDelete) => {
        const updated = familyMembers.filter(
            (member) => member.id !== familyToDelete,
        );
        setFamilyMembers(updated);
        setFamilyToDelete(null);
        setFamilyConfirm(false);
        setSelectedFamily(null);
    };

    const [intervention_selected, setInterventionSelected] = useState("");

    const [home_visitations, setHomeVisitations] = useState([
        /*{
            intervention: "Home Visitation",
            date: "May 05, 2025",
        },
        {
            intervention: "Home Visitation",
            date: "May 23, 2025",
        },
        {
            intervention: "Home Visitation",
            date: "June 02, 2025",
        },*/
    ]);

    const [counsellings, setCounsellings] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const fetchedCounsellingData = await fetchAllCounselingInterventionsByMemberId(clientId);
            //console.log("Fetched Counselling: ", fetchedCounsellingData);

            const formatter = new Intl.DateTimeFormat('en-CA', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            });

            const counsellingInterventions = fetchedCounsellingData.interventions.map(item => {
                const date = new Date(item.intervention.createdAt);

                return {
                    formID: item.intervention._id,
                    route: "counselling-form",
                    intervention: item.interventionType,
                    date: isNaN(date) ? '' : formatter.format(date),
                };
            });

            //console.log("Counselling Data: ", counsellingInterventions);

            setCounsellings(counsellingInterventions);
        };


        loadData();
    }, []);

    const [financial_assistances, setFinancialAssistances] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const fetchedFinancialData = await fetchAllFinInterventions(clientId);
            //console.log("Fetched Financial: ", fetchedFinancialData);

            const formatter = new Intl.DateTimeFormat('en-CA', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            });

            const financialInterventions = fetchedFinancialData.map(item => {
                // const date = new Date(item.intervention.createdAt);

                return {
                    formID: item.id,
                    route: "financial-assessment-form",
                    intervention: "Financial Assistance",
                    // date: isNaN(date) ? '' : formatter.format(date),
                    date: "May 05, 2025",
                };
            });

            //console.log("Financial Data: ", financialInterventions);

            setFinancialAssistances(financialInterventions);
        };


        loadData();
    }, []);

    const [correspondences, setCorrespondences] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const fetchedCorrespondenceData = await fetchAllCorrespInterventions(clientId);
            //console.log("Fetched Correspondence: ", fetchedCorrespondenceData);

            const formatter = new Intl.DateTimeFormat('en-CA', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            });

            const correspondenceInterventions = fetchedCorrespondenceData.map(item => {
                // const date = new Date(item.intervention.createdAt);

                return {
                    formID: item.id,
                    route: "correspondence-form",
                    intervention: "Correspondence",
                    // date: isNaN(date) ? '' : formatter.format(date),
                    date: "July 04, 2025",
                };
            });

            //console.log("Correspondence Data: ", correspondenceInterventions);

            setCorrespondences(correspondenceInterventions);
        };

        loadData();
    }, []);

    const interventions = {
        "Home Visitation": home_visitations,
        "Counselling": counsellings,
        "Financial Assistance": financial_assistances,
        "Correspondences": correspondences,
    };

    const [progress_reports, setProgressReports] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const fetchedProgressData = await fetchProgressReportsForCase(clientId);
            //console.log("Fetched Progress Reports: ", fetchedProgressData);

            const formatter = new Intl.DateTimeFormat('en-CA', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            });

            const progressReportsData = fetchedProgressData.map(item => {
                const date = new Date(item.created_at);

                return {
                    formID: item._id,
                    name: "Progress Report",
                    route: "progress-reports",
                    date: isNaN(date) ? '' : formatter.format(date),
                };
            });

            //console.log("Progress Report Data: ", progressReportsData);

            setProgressReports(progressReportsData);
        };

        loadData();
    }, []);

    const handleNewIntervention = (caseID) => {

        const path = `/intervention-form/?action=create&caseID=${caseID}`;

        navigate(path);

        // navigate(`/intervention-form?selected=${encodeURIComponent(key)}`);
    };

    const handleNewProgressReport = (caseID) => {

        const path = `/progress-report/?action=create&caseID=${caseID}`;

        navigate(path);

        // navigate(`/intervention-form?selected=${encodeURIComponent(key)}`);
    };

    const handleInterventionNavigation = (intervention, caseID, formID) => {

        const path = `/${intervention}/?action=view&caseID=${caseID}&formID=${formID}`;

        navigate(path);

        // navigate(`/intervention-form?selected=${encodeURIComponent(key)}`);
    };

    const handleProgressReportNavigation = (caseID, formID) => {

        const path = `/progress-report/?action=view&caseID=${caseID}&formID=${formID}`;

        navigate(path);

        // navigate(`/intervention-form?selected=${encodeURIComponent(key)}`);
    };

    // <p className="font-label">
    //     <span className="font-bold-label">
    //         Social Development Worker:
    //     </span>{" "}
    //     {socialDevelopmentWorkers.find(
    //         (w) => w.id === data.assigned_sdw,
    //     )?.username || "-"}
    // </p>

    // useEffect(() => {
    //     console.log("SOC DEV WORK", socialDevelopmentWorkers);
    //     console.log("DATA:", data);

    //     let found = socialDevelopmentWorkers.find(
    //         (w) => w.id === data.assigned_sdw
    //     );
    //     console.log("FOUND:", found);


    // }, [drafts])

    const submitNewCase = async () => {
        const coreValid = await checkCore();

        if (!coreValid) {
            setModalOnConfirm(() => () => {
                document.getElementById("core-fields")?.scrollIntoView({ behavior: "smooth" });
            });
            return;
        }

        const identifyingValid = checkIdentifying();

        if (!identifyingValid) {
            setModalOnConfirm(() => () => {
                document.getElementById("identifying-data")?.scrollIntoView({ behavior: "smooth" });
            });
            return;
        }

        const payload = {
            ...drafts,
            is_active: true,
        };

        // console.log("Payload for new case:", payload);

        const { ok, data } = await createNewCase(payload);
        // console.log("Create new case response:", data);


        if (ok && data?.case?._id) {
            showSuccess("New case created successfully!");
            navigate(`/`);
        } else {
            console.error("Invalid _id:", data.case);
            setModalTitle("Error");
            setModalBody(data.message || "An unexpected error occurred.");
            setModalImageCenter(<div className="warning-icon mx-auto"></div>);
            setModalConfirm(false);
            setShowModal(true);
        }

    };

    return (
        <>
            <SimpleModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setModalTitle("");
                    setModalBody("");
                    setModalImageCenter(null);
                    setModalConfirm(false);
                    setModalOnConfirm(() => { });
                }}
                title={modalTitle}
                bodyText={modalBody}
                imageCenter={modalImageCenter}
                confirm={modalConfirm}
                onConfirm={() => {
                    modalOnConfirm?.();
                    setShowModal(false);
                }}
            />

            <main className="flex flex-col gap-20 pt-15">
                {/* <div className='flex flex-1 top-0 justify-between fixed bg-white z-98 max-w-[1280px] py-3 mx-auto'> */}
                <div className="fixed top-0 right-0 left-0 z-50 mx-auto flex w-full max-w-[1280px] items-center justify-between bg-white px-4 py-3">
                    <button
                        className="font-bold-label arrow-group flex items-center gap-5 px-4 py-2"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <div className="arrow-left-button"></div>
                        Back
                    </button>

                    <div className="flex gap-5">
                        <NavLabelButton
                            title="Identifying Data"
                            iconClass="identifying-button"
                            sectionId="identifying-data"
                            currentSection={currentSection}
                            setCurrentSection={setCurrentSection}
                        />

                        <NavLabelButton
                            title="Family Composition"
                            iconClass="family-button"
                            sectionId="family-composition"
                            currentSection={currentSection}
                            setCurrentSection={setCurrentSection}
                        />

                        <NavLabelButton
                            title="Problems and Findings"
                            iconClass="findings-button"
                            sectionId="problems-findings"
                            currentSection={currentSection}
                            setCurrentSection={setCurrentSection}
                        />

                        {!creating && <NavLabelButton
                            title="Interventions"
                            iconClass="interventions-button"
                            sectionId="interventions"
                            currentSection={currentSection}
                            setCurrentSection={setCurrentSection}
                        />}

                        <NavLabelButton
                            title="Assessments"
                            iconClass="assessment-button"
                            sectionId="assessments"
                            currentSection={currentSection}
                            setCurrentSection={setCurrentSection}
                        />

                        <NavLabelButton
                            title="Evaluation and Recommendation"
                            iconClass="evaluations-button"
                            sectionId="evaluation-recommendation"
                            currentSection={currentSection}
                            setCurrentSection={setCurrentSection}
                        />
                    </div>
                </div>

                <section className="flex flex-col gap-5" id="core-fields">
                    {!creating && <div className="flex items-center justify-between">
                        {data.is_active === true ? (
                            <div className="font-bold-label rounded-full bg-[var(--color-green)] p-2 px-8 !text-white">
                                Active
                            </div>
                        ) : (
                            <div className="font-bold-label rounded-full bg-[var(--accent-dark)] p-2 px-8 !text-white">
                                Inactive
                            </div>
                        )}
                        <button className="btn-blue font-bold-label drop-shadow-base"
                            data-cy='download-case'>
                            Download
                        </button>
                    </div>}

                    {(editingField === "all" || editingField === "core-fields") && (
                        <div className="flex items-center justify-between">
                            <h1 className="header-main">Core Details</h1>
                            {!creating && <button
                                className={
                                    editingField === "core-fields"
                                        ? "icon-button-setup x-button"
                                        : "icon-button-setup dots-button"
                                }
                                onClick={() => {
                                    if (editingField) {
                                        resetFields();
                                    } else {
                                        setEditingField("core-fields");
                                    }
                                }}
                            ></button>}
                        </div>
                    )}

                    {(editingField === "all" || editingField === "core-fields") ? (
                        <>
                            <div className="flex gap-5 w-full">
                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label"><span className='text-red-500'>*</span> First Name</label>
                                    <input
                                        type="text"
                                        value={drafts.first_name}
                                        placeholder='First Name'
                                        onChange={(e) => setDrafts(prev => ({ ...prev, first_name: e.target.value }))}
                                        className="text-input font-label w-full"
                                        data-cy='fname'
                                    />
                                </div>

                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label"><span className='text-red-500'>*</span> Middle Name</label>
                                    <input
                                        type="text"
                                        value={drafts.middle_name}
                                        placeholder='Middle Name'
                                        onChange={(e) => setDrafts(prev => ({ ...prev, middle_name: e.target.value }))}
                                        className="text-input font-label w-full"
                                        data-cy='mname'
                                    />
                                </div>

                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label"><span className='text-red-500'>*</span> Last Name</label>
                                    <input
                                        type="text"
                                        value={drafts.last_name}
                                        placeholder='Last Name'
                                        onChange={(e) => setDrafts(prev => ({ ...prev, last_name: e.target.value }))}
                                        className="text-input font-label w-full"
                                        data-cy='lname'
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 w-full">
                                <label className="font-bold-label"><span className='text-red-500'>*</span> SM Number</label>
                                <input
                                    type="text"
                                    value={drafts.sm_number}
                                    placeholder='SM Number'
                                    onChange={(e) => setDrafts(prev => ({ ...prev, sm_number: e.target.value }))}
                                    className="text-input font-label w-full max-w-[30rem]"
                                    data-cy='sm-number'
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between">
                                <h1 className="header-main">{`${data.first_name} ${data.middle_name} ${data.last_name}`}</h1>
                                {<button
                                    className={
                                        editingField === "core-fields"
                                            ? "icon-button-setup x-button"
                                            : "icon-button-setup dots-button"
                                    }
                                    onClick={() => {
                                        if (editingField) {
                                            resetFields();
                                        } else {
                                            setEditingField("core-fields");
                                        }
                                    }}
                                    data-cy='edit-core-details-section'
                                ></button>}
                            </div>
                            <h2 className="header-sub">{data.sm_number}</h2>
                        </>
                    )}

                    <div className="flex flex-wrap justify-between gap-10">
                        {/* SPU Project */}
                        <div className="flex w-full flex-col md:w-[48%]">
                            {(editingField === "all" || editingField === "core-fields") ? (
                                <>
                                    <label className='font-bold-label'><span className='text-red-500'>*</span> SPU Project</label>
                                    <select
                                        className="text-input font-label"
                                        value={drafts.spu}
                                        disabled={creating}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({
                                                ...prev,
                                                spu: e.target.value,
                                            }))
                                        }
                                        data-cy='spu'
                                    >
                                        <option value="">Select SPU</option>
                                        {projectLocation.map((project) => (
                                            <option
                                                key={project.projectCode}
                                                value={project.projectCode}
                                            >
                                                {project.name} (
                                                {project.projectCode})
                                            </option>
                                        ))}
                                    </select>
                                </>
                            ) : (
                                <p className="font-label">
                                    <span className="font-bold-label">
                                        SPU Project:
                                    </span>{" "}
                                    {projectLocation.find(
                                        (p) => p.projectCode === data.spu,
                                    )?.name || "-"}
                                </p>
                            )}
                        </div>

                        {/* Social Development Worker */}
                        <div className="flex w-full flex-col md:w-[48%]">
                            {(editingField === "all" || editingField === "core-fields") ? (
                                <>
                                    <label className='font-bold-label'><span className='text-red-500'>*</span> Social Development Worker</label>
                                    <select
                                        className="text-input font-label"
                                        disabled={creating}
                                        value={drafts.assigned_sdw}
                                        onChange={(e) => {
                                            setDrafts((prev) => ({
                                                ...prev,
                                                assigned_sdw: e.target.value,
                                            }))
                                        }
                                        }
                                        data-cy="assigned-sdw"
                                    >
                                        <option value="">Select SDW</option>
                                        {socialDevelopmentWorkers
                                            .filter((sdw) => sdw.spu_id === drafts.spu)
                                            .map((sdw) => (
                                                <option key={sdw.id} value={sdw.id}>
                                                    {sdw.username} ({sdw.sdw_id})
                                                </option>
                                            ))}
                                    </select>

                                </>
                            ) : (
                                <p className="font-label">
                                    <span className="font-bold-label">
                                        Social Development Worker:
                                    </span>{" "}
                                    {socialDevelopmentWorkers.find(
                                        (w) => w.id === data.assigned_sdw,
                                    )?.username || "-"}
                                </p>

                            )}
                        </div>
                    </div>

                    <div className='flex flex-col w-full'>
                        <label className="font-bold-label mb-2">Classifications</label>
                        {(editingField === "all" || editingField === "core-fields") ? (
                            <>
                                <div className="flex w-full max-w-[65rem] items-center self-start">
                                    <select
                                        className="text-input font-label"
                                        value={selectedClassification}
                                        onChange={(e) =>
                                            setSelectedClassification(
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select Classification
                                        </option>
                                        {classificationList.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        className="btn-primary font-bold-label ml-5 !h-[4.5rem] !w-[4.5rem]"
                                        onClick={() => {
                                            if (
                                                selectedClassification &&
                                                !drafts.classifications.includes(
                                                    selectedClassification,
                                                )
                                            ) {
                                                setDrafts((prev) => ({
                                                    ...prev,
                                                    classifications: [
                                                        ...prev.classifications,
                                                        selectedClassification,
                                                    ],
                                                }));
                                                setSelectedClassification("");
                                            }
                                        }}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {drafts.classifications.map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1"
                                        >
                                            <span className="font-label">
                                                {item}
                                            </span>
                                            <button
                                                type="button"
                                                className="font-bold text-red-500"
                                                onClick={() => {
                                                    setDrafts((prev) => ({
                                                        ...prev,
                                                        classifications:
                                                            prev.classifications.filter(
                                                                (c) =>
                                                                    c !== item,
                                                            ),
                                                    }));
                                                }}
                                                data-cy='cancel-core-details-section'
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {data.classifications.map((item) => (
                                    <span
                                        key={item}
                                        className="font-label rounded-full bg-gray-200 px-3 py-1"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {editingField === "core-fields" && (
                        <button
                            className="btn-transparent-rounded my-3 ml-auto"
                            onClick={async () => {
                                const valid = await checkCore();
                                if (!valid) return;

                                // console.log("CURRENT DRAFTS", drafts);

                                try {
                                    const updated = await updateCoreCaseData(drafts, clientId);

                                    // console.log("UPDATED: ", updated);

                                    setData((prev) => ({
                                        ...prev,
                                        first_name: updated.first_name || drafts.first_name,
                                        middle_name: updated.middle_name || drafts.middle_name,
                                        last_name: updated.last_name || drafts.last_name,
                                        sm_number: updated.sm_number || drafts.sm_number,
                                        spu: updated.spu || drafts.spu,
                                        assigned_sdw: updated.assigned_sdw || drafts.assigned_sdw,
                                        classifications: updated.classifications || drafts.classifications || [],
                                    }));

                                    setEditingField(null);
                                    showSuccess("Core details were successfully updated!");
                                } catch (error) {
                                    setModalTitle("Update Error");
                                    setModalBody(error.message || "An unexpected error occurred.");
                                    setModalImageCenter(<div className="warning-icon mx-auto"></div>);
                                    setModalConfirm(false);
                                    setShowModal(true);
                                }
                            }}
                            data-cy="submit-core-details-section"
                        >
                            Submit Changes
                        </button>
                    )}
                </section>

                <section className='flex flex-col gap-8' id="identifying-data" ref={ref1}>
                    <div className="flex justify-between items-center">
                        <h1 className="header-main">Identifying Data</h1>
                        {user?.role == "sdw" && !creating && <button
                            className={
                                editingField === "identifying-fields"
                                    ? "icon-button-setup x-button"
                                    : "icon-button-setup dots-button"
                            }
                            onClick={() => {
                                if (editingField) {
                                    resetFields();
                                } else {
                                    setEditingField("identifying-fields");
                                }
                            }}
                            data-cy='edit-identifying-data-section'
                        ></button>}
                    </div>

                    {(editingField === "all" || editingField === "identifying-fields") ? (
                        <>
                            <div className="flex justify-between gap-20">
                                <div className="flex w-full flex-col gap-5">
                                    <label className="font-bold-label" htmlFor="age">Age</label>
                                    <input
                                        type="number"
                                        id="age"
                                        value={age}
                                        readOnly
                                        disabled
                                        className="text-input font-label"
                                        data-cy='age'
                                    />
                                </div>

                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label"><span className='text-red-500'>*</span> Date of Birth</label>
                                    <input
                                        type="date"
                                        value={drafts.dob || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, dob: e.target.value }))}
                                        className="text-input font-label"
                                        data-cy='dob'
                                    />
                                </div>

                                <div className='flex flex-col gap-5 w-full'>
                                    <label className="font-bold-label"><span className='text-red-500'>*</span> Sex</label>
                                    <select
                                        className='text-input font-label'
                                        value={drafts.sex || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, sex: e.target.value }))}
                                        data-cy='sex'
                                    >
                                        <option value="">Select Sex</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                <div className="flex w-full flex-col gap-5">
                                    <label className="font-bold-label">Contact No.</label>
                                    <input
                                        type="text"
                                        className="text-input font-label"
                                        placeholder="Contact No."
                                        value={drafts.contact_no || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, contact_no: e.target.value }))}
                                        data-cy='contact-num'
                                    />
                                </div>
                            </div>

                            <div className='flex justify-between gap-20'>
                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label">Educational Attainment</label>
                                    <input
                                        type="text"
                                        placeholder='Educational Attainment'
                                        value={drafts.edu_attainment || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, edu_attainment: e.target.value }))}
                                        data-cy='educational-attainment'
                                        className="text-input font-label"
                                    />
                                </div>

                                <div className='flex flex-col gap-5 w-full'>
                                    <label className="font-bold-label">Occupation</label>
                                    <input
                                        type="text"
                                        value={drafts.occupation || ""}
                                        placeholder='Occupation'
                                        onChange={(e) => setDrafts(prev => ({ ...prev, occupation: e.target.value }))}
                                        className='text-input font-label'
                                        data-cy='occupation'
                                    />
                                </div>

                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label"><span className='text-red-500'>*</span> Civil Status</label>
                                    <select
                                        className="text-input font-label"
                                        value={drafts.civil_status || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, civil_status: e.target.value }))}
                                        data-cy='civil-status'
                                    >
                                        <option value="">Select Civil Status</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Separated">Separated</option>
                                        <option value="Widowed">Widowed</option>
                                    </select>
                                </div>

                                <div className='flex flex-col gap-5 w-full'>
                                    <label className="font-bold-label">Religion</label>
                                    <input
                                        type="text"
                                        value={drafts.religion || ""}
                                        placeholder='Religion'
                                        onChange={(e) => setDrafts(prev => ({ ...prev, religion: e.target.value }))}
                                        className='text-input font-label'
                                        data-cy='religion'
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between gap-20">
                                <div className="flex w-full flex-col gap-5">
                                    <label className="font-bold-label">Relationship to Client</label>
                                    <input
                                        type="text"
                                        className="text-input font-label"
                                        placeholder="Relationship to Client"
                                        value={drafts.relationship_to_client || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, relationship_to_client: e.target.value }))}
                                        data-cy='relationship'
                                    />
                                </div>

                                <div className="flex w-full flex-col gap-5">
                                    <label className="font-bold-label"><span className='text-red-500'>*</span> Present Address</label>
                                    <textarea
                                        className="text-input font-label resize-y min-h-[20rem]"
                                        placeholder="Present Address"
                                        value={drafts.present_address || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, present_address: e.target.value }))}
                                        data-cy='address'
                                    ></textarea>
                                </div>

                                <div className='flex flex-col gap-5 w-full'>
                                    <label className="font-bold-label"><span className='text-red-500'>*</span> Place of Birth</label>
                                    <input
                                        type="text"
                                        value={drafts.pob || ""}
                                        placeholder='Place of Birth'
                                        onChange={(e) => setDrafts(prev => ({ ...prev, pob: e.target.value }))}
                                        className='text-input font-label'
                                        data-cy='pob'
                                    />
                                </div>
                            </div>

                            {!creating && <div className="flex justify-end">
                                <button
                                    className="btn-transparent-rounded my-3 ml-auto"
                                    onClick={async () => {
                                        const valid = checkIdentifying();
                                        if (!valid) return;

                                        try {
                                            const updated = await updateIdentifyingCaseData(drafts, clientId);

                                            setData((prev) => ({
                                                ...prev,
                                                dob: updated.dob || drafts.dob,
                                                civil_status: updated.civil_status || drafts.civil_status,
                                                edu_attainment: updated.edu_attainment || drafts.edu_attainment,
                                                sex: updated.sex || drafts.sex,
                                                pob: updated.pob || drafts.pob,
                                                religion: updated.religion || drafts.religion,
                                                occupation: updated.occupation || drafts.occupation,
                                                present_address: updated.present_address || drafts.present_address,
                                                contact_no: updated.contact_no || drafts.contact_no,
                                                relationship_to_client: updated.relationship_to_client || drafts.relationship_to_client,
                                            }));

                                            setEditingField(null);
                                            showSuccess("Identifying data was successfully updated!");
                                        } catch (error) {
                                            setModalTitle("Update Error");
                                            setModalBody(error.message || "An unexpected error occurred.");
                                            setModalImageCenter(<div className="warning-icon mx-auto"></div>);
                                            setModalConfirm(false);
                                            setShowModal(true);
                                        }
                                    }}
                                    data-cy="submit-identifying-data-section"
                                >
                                    Submit Changes
                                </button>
                            </div>}
                        </>
                    ) : (
                        <div className="font-label grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
                            <p><span className="font-bold-label">Age:</span> {age == 0 ? 0 : age || "-"}</p>
                            <p><span className="font-bold-label">Date of Birth:</span> {data.dob || "-"}</p>
                            <p><span className="font-bold-label">Sex:</span> {data.sex || "-"}</p>
                            <p><span className="font-bold-label">Contact No.:</span> {data.contact_no || "-"}</p>
                            <p><span className="font-bold-label">Educational Attainment:</span> {data.edu_attainment || "-"}</p>
                            <p><span className="font-bold-label">Occupation:</span> {data.occupation || "-"}</p>
                            <p><span className="font-bold-label">Civil Status:</span> {data.civil_status || "-"}</p>
                            <p><span className="font-bold-label">Religion:</span> {data.religion || "-"}</p>
                            <p><span className="font-bold-label">Relationship to Client:</span> {data.relationship_to_client || "-"}</p>
                            <p><span className="font-bold-label">Present Address:</span> {data.present_address || "-"}</p>
                            <p><span className="font-bold-label">Place of Birth:</span> {data.pob || "-"}</p>
                        </div>
                    )}
                </section>

                <section
                    className="flex flex-col gap-8"
                    id="family-composition"
                    ref={ref2}
                >
                    <h1 className="header-main">Family Composition</h1>

                    {creating && <p className="font-label">Family Composition can be filled out on created cases.</p>}

                    {!creating && <>
                        {user?.role == "sdw" && <button
                            className="btn-primary font-bold-label drop-shadow-base"
                            onClick={handleAddFamilyMember}
                            data-cy='add-family-member'
                        >
                            Add New Family Member
                        </button>}

                        <div className="flex justify-between gap-10">
                            <div
                                // ref={sliderRef}
                                className="outline-gray flex w-full gap-8 overflow-x-auto rounded-lg p-6"
                            // onMouseDown={handleMouseDown}
                            // onMouseLeave={handleMouseLeave}
                            // onMouseUp={handleMouseUp}
                            // onMouseMove={handleMouseMove}
                            >
                                {familyMembers.map((member, index) => (
                                    <FamilyCard
                                        key={index}
                                        clientId={clientId}
                                        index={index}
                                        member={member}
                                        selectedFamily={selectedFamily}
                                        setSelectedFamily={setSelectedFamily}
                                        editingFamilyValue={editingFamilyValue}
                                        setEditingFamilyValue={
                                            setEditingFamilyValue
                                        }
                                        familyMembers={familyMembers}
                                        setFamilyMembers={setFamilyMembers}
                                        handleDeleteFamilyMember={
                                            handleDeleteFamilyMember
                                        }
                                        // setFamilyToDelete={setFamilyToDelete}

                                        setShowModal={setShowModal}
                                        setModalTitle={setModalTitle}
                                        setModalBody={setModalBody}
                                        setModalImageCenter={setModalImageCenter}
                                        setModalConfirm={setModalConfirm}
                                        setModalOnConfirm={setModalOnConfirm}

                                        editable={user.role}
                                    />
                                ))}
                            </div>
                        </div>
                    </>}
                </section>

                <section
                    className="flex flex-col gap-8"
                    id="problems-findings"
                    ref={ref3}
                >
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="header-main">Problems and Findings</h1>
                        {user?.role == "sdw" && !creating && <button
                            className={
                                editingField === "history-fields"
                                    ? "icon-button-setup x-button"
                                    : "icon-button-setup dots-button"
                            }
                            onClick={() => {
                                if (editingField) {
                                    resetFields();
                                } else {
                                    setEditingField("history-fields");
                                }
                            }}
                            data-cy="edit-problems-findings-section"
                        ></button>}
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        <div className="flex flex-col gap-4">
                            <h3 className="header-sub">Problem Presented</h3>

                            {(editingField === "all" || editingField === "history-fields") ? (
                                <textarea
                                    className="text-input font-label resize-y min-h-[20rem]"
                                    value={drafts.problem_presented}
                                    placeholder="Problem Presented"
                                    onChange={(e) =>
                                        setDrafts((prev) => ({
                                            ...prev,
                                            problem_presented: e.target.value,
                                        }))
                                    }
                                    data-cy="problem"
                                />
                            ) : (
                                <p className="font-label" data-cy="disp-problem">
                                    {data.problem_presented || "-"}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="header-sub">History of the Problem</h3>

                            {(editingField === "all" || editingField === "history-fields") ? (
                                <textarea
                                    className="text-input font-label resize-y min-h-[20rem]"
                                    placeholder="History of the Problem"
                                    value={drafts.history_problem}
                                    onChange={(e) =>
                                        setDrafts((prev) => ({
                                            ...prev,
                                            history_problem: e.target.value,
                                        }))
                                    }
                                    data-cy="problem-history"
                                />
                            ) : (
                                <p className="font-label" data-cy="disp-problem-history">
                                    {data.history_problem || "-"}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="header-sub">Findings</h3>

                            {(editingField === "all" || editingField === "history-fields") ? (
                                <textarea
                                    className="text-input font-label resize-y min-h-[20rem]"
                                    placeholder="Findings"
                                    value={drafts.observation_findings}
                                    onChange={(e) =>
                                        setDrafts((prev) => ({
                                            ...prev,
                                            observation_findings: e.target.value,
                                        }))
                                    }
                                    data-cy="finding"
                                />
                            ) : (
                                <p className="font-label" data-cy="disp-finding">
                                    {data.observation_findings || "-"}
                                </p>
                            )}
                        </div>
                    </div>

                    {editingField === "history-fields" && (
                        <button
                            className="btn-transparent-rounded my-3 ml-auto"
                            onClick={async () => {
                                try {
                                    const updated = await editProblemsFindings(clientId, {
                                        problem_presented: drafts.problem_presented,
                                        history_problem: drafts.history_problem,
                                        observation_findings: drafts.observation_findings,
                                    });

                                    setData((prev) => ({
                                        ...prev,
                                        problem_presented: updated.problemPresented || drafts.problem_presented,
                                        history_problem: updated.historyProblem || drafts.history_problem,
                                        observation_findings: updated.observationFindings || drafts.observation_findings,
                                    }));

                                    setEditingField(null);
                                    showSuccess("Problems and Findings were successfully updated!");
                                } catch (error) {
                                    console.error("❌ Update failed:", error);
                                    setModalTitle("Update Error");
                                    setModalBody(error.message || "An unexpected error occurred.");
                                    setModalImageCenter(<div className="warning-icon mx-auto"></div>);
                                    setModalConfirm(false);
                                    setShowModal(true);
                                }
                            }}
                            data-cy="submit-problems-findings-section"
                        >
                            Submit Changes
                        </button>

                    )}
                </section>

                {!creating && <section
                    className="flex flex-col gap-8"
                    id="interventions"
                    ref={ref4}
                >
                    <h1 className="header-main">Interventions</h1>
                    {user?.role == "sdw" && <button
                        name="add_intervention"
                        id="add_intervention"
                        onClick={() => navigate("/intervention-form")}
                        className="btn-primary font-bold-label self-center"
                        data-cy='add-intervention'
                    >
                        New Intervention
                    </button>}
                    <div className="flex justify-between">
                        <select
                            name="services"
                            id="services"
                            value={intervention_selected}
                            onChange={(e) =>
                                setInterventionSelected(e.target.value)
                            }
                            className="label-base text-input max-w-96"
                            data-cy='intervention-type'
                        >
                            <option value="" className="body-base">
                                Select Intervention
                            </option>
                            {Object.entries(interventions).map(
                                ([key, value], index) => (
                                    <option
                                        key={index}
                                        value={key}
                                        className="body-base"
                                    >
                                        {key}
                                    </option>
                                ),
                            )}
                        </select>
                    </div>
                    <div className="flex w-full flex-col">
                        <div className="flex w-full flex-col gap-40 border-b border-[var(--border-color)]">
                            <div className="flex justify-between px-2.5">
                                <p className="label-base w-80">Intervention</p>
                                <p className="label-base w-80">Date</p>
                            </div>
                        </div>
                        <div className="flex w-full flex-col flex-wrap gap-2.5">
                            {interventions[intervention_selected]?.length > 0 ? (
                                interventions[intervention_selected]?.map(
                                    (item, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handleInterventionNavigation(
                                                    item.route,
                                                    clientId,
                                                    item.formID,
                                                )
                                            }
                                            className="flex h-16 items-center justify-between rounded-lg p-2.5 text-left hover:bg-[var(--bg-color-dark)]"
                                            data-cy={`intervention-item-${item.intervention}-${index}`}
                                        >
                                            <p className="label-base w-80">
                                                {item.intervention} {index + 1}
                                            </p>
                                            <p className="label-base w-80">
                                                {item.date}
                                            </p>
                                        </button>
                                    ),
                                )
                            ) : intervention_selected && (
                                <p className="body-base self-center mt-8">No Interventions Available</p>
                            )
                            }
                            <button
                                className="btn-primary label-base self-center mt-8"
                                onClick={() =>
                                    handleNewIntervention(
                                        clientId
                                    )
                                }>
                                New Intervention
                            </button>
                        </div>
                    </div>
                </section>}

                {!creating && <section
                    className="flex flex-col gap-8"
                    id="interventions"
                    ref={ref4}
                >
                    <div className="flex justify-between">
                        <h1 className="header-main">Progress Reports</h1>
                    </div>
                    {user?.role == "sdw" && <button
                        name="add_progress_report"
                        id="add_progress_report"
                        onClick={() => navigate("/progress-report")}
                        className="btn-primary font-bold-label self-center"
                        data-cy='add-progress-report'
                    >
                        New Progress Report
                    </button>}
                    <div className="flex w-full flex-col">
                        <div className="flex w-full flex-col gap-40 border-b border-[var(--border-color)]">
                            <div className="flex justify-between px-2.5">
                                <p className="label-base w-80">
                                    Progress Report
                                </p>
                                <p className="label-base w-80">Date</p>
                            </div>
                        </div>
                        <div className="flex w-full flex-col flex-wrap gap-2.5">
                            {progress_reports?.length > 0 ? (
                                progress_reports?.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            handleProgressReportNavigation(
                                                clientId,
                                                item.formID,
                                            )
                                        }
                                        className="flex h-16 items-center justify-between rounded-lg p-2.5 text-left hover:bg-[var(--bg-color-dark)]"
                                        data-cy={`progress-report-item-${item.name}-${index}`}
                                    >
                                        <p className="label-base w-80" data-cy={`disp-progress-report-item-${item.name}-${index}`}>
                                            {item.name} {index + 1}
                                        </p>
                                        <p className="label-base w-80">
                                            {item.date}
                                        </p>
                                    </button>
                                ))
                            ) : (
                                <p className="body-base self-center mt-8">No Progress Reports Available</p>
                            )}
                            <button
                                className="btn-primary label-base self-center mt-8"
                                onClick={() =>
                                    handleNewProgressReport(
                                        clientId
                                    )
                                }>
                                New Progress Report
                            </button>
                        </div>
                    </div>
                </section>}

                <section
                    className="flex flex-col gap-8"
                    id="assessments"
                    ref={ref5}
                >
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="header-main">Assessment</h1>
                        {user?.role == "sdw" && !creating && <button
                            className={
                                editingField === "assessment-field"
                                    ? "icon-button-setup x-button"
                                    : "icon-button-setup dots-button"
                            }
                            onClick={() => {
                                if (editingField) {
                                    resetFields();
                                } else {
                                    setEditingField("assessment-field");
                                }
                            }}
                            data-cy="assessment-section"
                        ></button>}
                    </div>

                    <div className="grid grid-cols-1 gap-10">
                        <div className="flex flex-col gap-4">
                            {(editingField === "all" || editingField === "assessment-field") ? (
                                <textarea
                                    className="text-input font-label resize-y min-h-[20rem]"
                                    value={drafts.assessment || ""}
                                    placeholder="Assessment"
                                    onChange={(e) =>
                                        setDrafts((prev) => ({
                                            ...prev,
                                            assessment: e.target.value,
                                        }))
                                    }
                                    data-cy="assessment"
                                />
                            ) : (
                                <p className="font-label" data-cy="disp-assessment">
                                    {data.assessment || "-"}
                                </p>
                            )}
                        </div>
                    </div>

                    {editingField === "assessment-field" && (
                        <button
                            className="btn-transparent-rounded my-3 ml-auto"
                            onClick={async () => {
                                try {
                                    const updated = await editAssessment(clientId, {
                                        assessment: drafts.assessment,
                                    });

                                    setData((prev) => ({
                                        ...prev,
                                        assessment: updated.assessment || drafts.assessment,
                                    }));

                                    setEditingField(null);
                                    showSuccess("Assessment was successfully updated!");
                                } catch (error) {
                                    console.error("❌ Update failed:", error);
                                    setModalTitle("Update Error");
                                    setModalBody(error.message || "An unexpected error occurred.");
                                    setModalImageCenter(<div className="warning-icon mx-auto"></div>);
                                    setModalConfirm(false);
                                    setShowModal(true);
                                }
                            }}
                            data-cy="submit-assessment-section"
                        >
                            Submit Changes
                        </button>
                    )}
                </section>

                <section
                    className="flex flex-col gap-8"
                    id="evaluation-recommendation"
                    ref={ref6}
                >
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="header-main">
                            Evaluation and Recommendation
                        </h1>
                        {!creating && user?.role == "sdw" && <button
                            className={
                                editingField === "evaluation-fields"
                                    ? "icon-button-setup x-button"
                                    : "icon-button-setup dots-button"
                            }
                            onClick={() => {
                                if (editingField) {
                                    resetFields();
                                } else {
                                    setEditingField("evaluation-fields");
                                }
                            }}
                            data-cy="edit-evaluation-recommendation-section"
                        ></button>}
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        <div className="flex flex-col gap-4">
                            <h3 className="header-sub">Evaluation</h3>

                            {(editingField === "all" || editingField === "evaluation-fields") ? (
                                <textarea
                                    className="text-input font-label resize-y min-h-[20rem]"
                                    value={drafts.evaluation}
                                    placeholder="Evaluation"
                                    onChange={(e) =>
                                        setDrafts((prev) => ({
                                            ...prev,
                                            evaluation: e.target.value,
                                        }))
                                    }
                                    data-cy="evaluation"
                                />
                            ) : (
                                <p className="font-label" data-cy="disp-evaluation">
                                    {data.evaluation || "-"}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="header-sub">Recommendation</h3>

                            {(editingField === "all" || editingField === "evaluation-fields") ? (
                                <textarea
                                    className="text-input font-label resize-y min-h-[20rem]"
                                    value={drafts.recommendation}
                                    placeholder="Recommendation"
                                    onChange={(e) =>
                                        setDrafts((prev) => ({
                                            ...prev,
                                            recommendation: e.target.value,
                                        }))
                                    }
                                    data-cy="recommendation"
                                />
                            ) : (
                                <p className="font-label" data-cy="disp-recommendation">
                                    {data.recommendation || "-"}
                                </p>
                            )}
                        </div>
                    </div>

                    {editingField === "evaluation-fields" && (
                        <button
                            className="btn-transparent-rounded my-3 ml-auto"
                            onClick={async () => {
                                try {
                                    const updated = await editEvalReco(clientId, {
                                        evaluation: drafts.evaluation,
                                        recommendation: drafts.recommendation,
                                    });

                                    setData((prev) => ({
                                        ...prev,
                                        evaluation: drafts.evaluation,
                                        recommendation: drafts.recommendation,
                                    }));
                                    setEditingField(null);
                                    showSuccess("Evaluation and Recommendation were successfully updated.");
                                } catch (error) {
                                    console.error("❌ Update failed:", error);
                                    setModalTitle("Update Error");
                                    setModalBody(error.message || "An unexpected error occurred.");
                                    setModalImageCenter(<div className="warning-icon mx-auto"></div>);
                                    setModalConfirm(false);
                                    setShowModal(true);
                                }
                            }}
                            data-cy="submit-evaluation-recommendation-section"
                        >
                            Submit Changes
                        </button>


                    )}
                </section>

                {creating && <button className="btn-blue header-sub drop-shadow-base my-3 mb-20 mx-auto"
                    onClick={submitNewCase}
                    data-cy='create-case'>
                    Create Case
                </button>}

                {!creating && <button onClick={() => navigate("/case-closure")} className="btn-primary font-bold-label drop-shadow-base my-3 ml-auto"
                    data-cy='terminate-case'>
                    Terminate Case
                </button>}
            </main>
        </>
    );
}

export default CaseFrontend;
