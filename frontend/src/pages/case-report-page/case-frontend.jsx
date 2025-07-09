import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import FamilyCard from '../../components/FamilyCard';
import SimpleModal from '../../components/SimpleModal';
import NavLabelButton from '../../components/NavLabelButton';

// API Imports
import {
    fetchCaseData,
    fetchFamilyMembers,
    editProblemsFindings,
    editAssessment,
    editEvalReco,
    updateCoreCaseData,
    updateIdentifyingCaseData,
    fetchSDWs,
}
    from '../../fetch-connections/case-connection';

function CaseFrontend() {
    const navigate = useNavigate();
    const { clientId } = useParams();

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



    useEffect(() => {
        const loadCaseData = async () => {
            if (!clientId) return;
            const fetchedData = await fetchCaseData(clientId);
            setData(fetchedData);
            setDrafts({
                first_name: fetchedData.first_name || "",
                middle_name: fetchedData.middle_name || "",
                last_name: fetchedData.last_name || "",
                sm_number: fetchedData.sm_number || "",
                spu_id: fetchedData.spu_id || "",
                sdw_id: fetchedData.sdw_id || "",
                classifications: fetchedData.classifications || [],
                dob: fetchedData.dob || "",
                civilStatus: fetchedData.civil_status || "",
                education: fetchedData.edu_attainment || "",
                sex: fetchedData.sex || "",
                pob: fetchedData.pob || "",
                religion: fetchedData.religion || "",
                occupation: fetchedData.occupation || "",
                presentAddress: fetchedData.present_address || "",
                contactNo: fetchedData.contact_no || "",
                relationship: fetchedData.relationship_to_client || "",
                problemPresented: fetchedData.problem_presented || "",
                historyProblem: fetchedData.history_problem || "",
                observationFindings: fetchedData.observation_findings || "",
                caseAssessment: fetchedData.assessment || "",
                caseRecommendation: fetchedData.recommendation || "",
                caseEvalutation: fetchedData.evaluation || "",
            });
            setAge(calculateAge(fetchedData.dob));
        };

        loadCaseData();
    }, [clientId]);


    const [familyMembers, setFamilyMembers] = useState([
        {
            id: 1,
            first: "Ana",
            middle: "Victoria",
            last: "Angat",
            age: 20,
            income: 100000.00,
            civilStatus: 'Single',
            occupation: 'Software Developer',
            education: 'Undergraduate',
            relationship: 'Sister',
            status: "living"
        },
        {
            id: 2,
            first: "Marvin",
            middle: "Ivan",
            last: "Mangubat",
            age: 21,
            income: 0.00,
            civilStatus: 'Divorced',
            occupation: 'Unemployed',
            education: 'Undergraduate',
            relationship: 'Sister',
            status: "deceased"
        },
        {
            id: 3,
            first: "Jose",
            middle: "Miguel",
            last: "Espinosa",
            age: 21,
            income: 100000.00,
            civilStatus: 'Single',
            occupation: 'Producer',
            education: 'Undergraduate',
            relationship: 'Brother',
            status: "living"
        },
        {
            id: 4,
            first: "Jose2",
            middle: "Miguel2",
            last: "Espinosa2",
            age: 21,
            income: 100000.00,
            civilStatus: 'Single',
            occupation: 'Producer',
            education: 'Undergraduate',
            relationship: 'Brother',
            status: "deceased"
        }
    ]);

    const [projectLocation, setProjectLocation] = useState([
        {
            name: "Manila",
            projectCode: "MNL",
        },
        {
            name: "Cebu",
            projectCode: "CEB",
        },
        {
            name: "Davao",
            projectCode: "DVO",
        },
        {
            name: "Baguio",
            projectCode: "BAG",
        },
        {
            name: "Iloilo",
            projectCode: "ILO",
        },
        {
            name: "Zamboanga",
            projectCode: "ZAM",
        },
    ]);

    const [socialDevelopmentWorkers, setSocialDevelopmentWorkers] = useState([]);

    useEffect(() => {
        const loadSDWs = async () => {
            const sdws = await fetchSDWs();
            setSocialDevelopmentWorkers(sdws);
        };
        loadSDWs();
    }, []);

    const [classificationList, setClassificationList] = useState([
        "Teenage Pregnancy",
        "Out of School Youth",
        "Person with Disability",
        "Senior Citizen",
        "Solo Parent",
        "Street Child",
        "Abandoned Child",
        "Victim of Abuse",
        "Indigenous People",
        "Displaced Individual",
        "Low Income Family",
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
        setDrafts({
            first_name: data.first_name || "",
            middle_name: data.middle_name || "",
            last_name: data.last_name || "",
            sm_number: data.sm_number || "",
            spu_id: data.spu_id || "",
            sdw_id: data.sdw_id || "",
            classifications: data.classifications || [],

            dob: data.dob || "",
            civilStatus: data.civil_status || "",
            education: data.edu_attainment || "",
            sex: data.sex || "",
            pob: data.pob || "",
            religion: data.religion || "",
            occupation: data.occupation || "",
            presentAddress: data.present_address || "",
            contactNo: data.contact_no || "",
            relationship: data.relationship_to_client || "",

            problemPresented: data.problem_presented || "",
            historyProblem: data.history_problem || "",
            observationFindings: data.observation_findings || "",
            caseAssessment: data.assessment || "",
            caseRecommendation: data.recommendation || "",
            caseEvalutation: data.evaluation || "",
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

    const checkCore = () => {
        const missing = [];

        if (!drafts.first_name || drafts.first_name.trim() === "")
            missing.push("First Name");
        if (!drafts.middle_name || drafts.middle_name.trim() === "")
            missing.push("Middle Name");
        if (!drafts.last_name || drafts.last_name.trim() === "")
            missing.push("Last Name");

        if (!drafts.sm_number) {
            missing.push("SM Number");
        } else if (isNaN(Number(drafts.sm_number))) {
            missing.push("SM Number must only be numeric");
        } else if (Number(drafts.sm_number) < 0) {
            missing.push("SM Number cannot be negative");
        }

        if (!drafts.spu_id) missing.push("SPU Project");
        if (!drafts.sdw_id) missing.push("Social Development Worker");

        const validSDWIds = socialDevelopmentWorkers
            .filter((sdw) => sdw.spu_id === drafts.spu_id)
            .map((sdw) => sdw.id);

        if (drafts.sdw_id && !validSDWIds.includes(drafts.sdw_id)) {
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
            .filter((sdw) => sdw.spu_id === drafts.spu_id)
            .map((sdw) => sdw.id);

        if (drafts.sdw_id && !validSDWIds.includes(drafts.sdw_id)) {
            setDrafts((prev) => ({
                ...prev,
                sdw_id: "",
            }));
        }
    }, [drafts.spu_id, drafts.sdw_id, socialDevelopmentWorkers]);

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

        if (!drafts.sex || drafts.sex === "") {
            missing.push('Sex');
        }

        if (!drafts.civilStatus || drafts.civilStatus === "") {
            missing.push('Civil Status');
        }

        if (missing.length > 0) {
            setModalTitle('Invalid Fields');
            setModalBody(`The following fields are missing or invalid: ${formatListWithAnd(missing)}`);
            setModalImageCenter(<div className='warning-icon mx-auto'></div>);
            setModalConfirm(false);
            setShowModal(true);
            return false;
        }

        return true;
    }

    const handleAddFamilyMember = () => {
        const newId = familyCounter + 1;
        const newMember = {
            id: newId,
            name: "",
            age: "",
            income: "",
            civilStatus: "",
            occupation: "",
            education: "",
            relationship: "",
            deceased: false,
        };

        setFamilyMembers((prev) => [newMember, ...prev]);
        setSelectedFamily(0);
        setEditingFamilyValue(newMember);
        setFamilyCounter(newId);
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
        {
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
        },
    ]);

    const [counsellings, setCounsellings] = useState([
        {
            intervention: "Counselling",
            date: "April 27, 2025",
        },
        {
            intervention: "Counselling",
            date: "May 02, 2025",
        },
        {
            intervention: "Counselling",
            date: "June 13, 2025",
        },
    ]);

    const [financial_assistances, setFinancialAssistances] = useState([
        {
            intervention: "Financial Assistance",
            date: "March 15, 2025",
        },
        {
            intervention: "Financial Assistance",
            date: "March 21, 2025",
        },
        {
            intervention: "Financial Assistance",
            date: "April 07, 2025",
        },
    ]);

    const [correspondences, setCorrespondences] = useState([
        {
            intervention: "Correspondence",
            date: "June 03, 2025",
        },
        {
            intervention: "Correspondence",
            date: "June 19, 2025",
        },
        {
            intervention: "Correspondence",
            date: "July 04, 2025",
        },
    ]);

    const interventions = {
        "Home Visitation": home_visitations,
        Counselling: counsellings,
        "Financial Assistance": financial_assistances,
        Correspondences: correspondences,
    };

    const [progress_reports, setProgressReports] = useState([
        {
            name: "Progress Report",
            date: "May 16, 2025",
        },
        {
            name: "Progress Report",
            date: "June 17, 2025",
        },
        {
            name: "Progress Report",
            date: "July 02, 2025",
        },
    ]);

    const handleInterventionNavigation = (key) => {
        navigate(`/intervention-form?selected=${encodeURIComponent(key)}`);
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
                            navigate("/home-sdw");
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

                        <NavLabelButton
                            title="Interventions"
                            iconClass="interventions-button"
                            sectionId="interventions"
                            currentSection={currentSection}
                            setCurrentSection={setCurrentSection}
                        />

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
                    <div className="flex items-center justify-between">
                        {data.is_active === "yes" ? (
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
                    </div>

                    {editingField === "core-fields" && (
                        <div className="flex items-center justify-between">
                            <h1 className="header-main">Core Details</h1>
                            <button
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
                            ></button>
                        </div>
                    )}

                    {editingField === "core-fields" ? (
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
                                <button
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
                                ></button>
                            </div>
                            <h2 className="header-sub">{data.sm_number}</h2>
                        </>
                    )}

                    <div className="flex flex-wrap justify-between gap-10">
                        {/* SPU Project */}
                        <div className="flex w-full flex-col md:w-[48%]">
                            {editingField === "core-fields" ? (
                                <>
                                    <label className='font-bold-label'><span className='text-red-500'>*</span> SPU Project</label>
                                    <select
                                        className="text-input font-label"
                                        value={drafts.spu_id}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({
                                                ...prev,
                                                spu_id: e.target.value,
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
                                        (p) => p.projectCode === data.spu_id,
                                    )?.name || "-"}
                                </p>
                            )}
                        </div>

                        {/* Social Development Worker */}
                        <div className="flex w-full flex-col md:w-[48%]">
                            {editingField === "core-fields" ? (
                                <>
                                    <label className='font-bold-label'><span className='text-red-500'>*</span> Social Development Worker</label>
                                    <select
                                        className="text-input font-label"
                                        value={drafts.sdw_id}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({
                                                ...prev,
                                                sdw_id: parseInt(
                                                    e.target.value,
                                                    10,
                                                ),
                                            }))
                                        }
                                        data-cy='assigned-sdw'
                                    >
                                        <option value="">Select SDW</option>
                                        {socialDevelopmentWorkers
                                            .filter(
                                                (sdw) =>
                                                    sdw.spu_id ===
                                                    drafts.spu_id,
                                            )
                                            .map((sdw) => (
                                                <option
                                                    key={sdw.id}
                                                    value={sdw.id}
                                                >
                                                    {sdw.username} ({sdw.id})
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
                                        (w) => w.id === data.sdw_id,
                                    )?.username || "-"}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className='flex flex-col w-full'>
                        <label className="font-bold-label mb-2">Classifications</label>
                        {editingField === "core-fields" ? (
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
                                const valid = checkCore();
                                if (!valid) return;

                                try {
                                    const updated = await updateCoreCaseData(drafts, clientId);
                                    setData((prev) => ({
                                        ...prev,
                                        first_name: updated.first_name || drafts.first_name,
                                        middle_name: updated.middle_name || drafts.middle_name,
                                        last_name: updated.last_name || drafts.last_name,
                                        sm_number: updated.sm_number || drafts.sm_number,
                                        spu_id: updated.spu || drafts.spu_id,  // match your schema
                                        sdw_id: updated.assigned_sdw || drafts.sdw_id, // match your schema
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
                        <button
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
                        ></button>
                    </div>

                    {editingField === "identifying-fields" ? (
                        <>
                            <div className="flex justify-between gap-20">
                                <div className="flex w-full flex-col gap-5">
                                    <label
                                        className="font-bold-label"
                                        htmlFor="age"
                                    >
                                        Age
                                    </label>
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
                                    <label className="font-bold-label" htmlFor="dob"><span className='text-red-500'>*</span> Date of Birth</label>
                                    <input
                                        type="date"
                                        id="dob"
                                        value={drafts.dob || ""}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({
                                                ...prev,
                                                dob: e.target.value,
                                            }))
                                        }
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
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </div>

                                <div className="flex w-full flex-col gap-5">
                                    <label className="font-bold-label">
                                        Contact No.
                                    </label>
                                    <input
                                        type="text"
                                        className="text-input font-label"
                                        placeholder="Contact No."
                                        value={drafts.contactNo || ""}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({
                                                ...prev,
                                                contactNo: e.target.value,
                                            }))
                                        }
                                        data-cy='contact-num'
                                    />
                                </div>
                            </div>

                            <div className='flex justify-between gap-20'>
                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label" htmlFor="education">Educational Attainment</label>
                                    <input
                                        type="text"
                                        id="education"
                                        placeholder='Educational Attainment'
                                        value={drafts.education || ""}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({
                                                ...prev,
                                                education: e.target.value,
                                            }))
                                        }
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
                                    <label className="font-bold-label" htmlFor="civil"><span className='text-red-500'>*</span> Civil Status</label>
                                    <select
                                        className="text-input font-label"
                                        id="civil"
                                        value={drafts.civilStatus || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, civilStatus: e.target.value }))}
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
                                    <label className="font-bold-label">
                                        Relationship to Client
                                    </label>
                                    <input
                                        type="text"
                                        className="text-input font-label"
                                        placeholder="Relationship to Client"
                                        value={drafts.relationship || ""}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({
                                                ...prev,
                                                relationship: e.target.value,
                                            }))
                                        }
                                        data-cy='relationship'
                                    />
                                </div>

                                <div className="flex w-full flex-col gap-5">
                                    <label className="font-bold-label">
                                        Present Address
                                    </label>
                                    <textarea
                                        className="text-input font-label"
                                        placeholder="Present Address"
                                        value={drafts.presentAddress || ""}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({
                                                ...prev,
                                                presentAddress: e.target.value,
                                            }))
                                        }
                                        data-cy='address'
                                    ></textarea>
                                </div>

                                <div className='flex flex-col gap-5 w-full'>
                                    <label className="font-bold-label">Place of Birth</label>
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

                            <div className="flex justify-end">
                                <button
                                    className="btn-transparent-rounded my-3 ml-auto"
                                    onClick={() => {
                                        if (!checkIdentifying()) return;

                                        setData(prev => ({
                                            ...prev,
                                            dob: drafts.dob,
                                            civilStatus: drafts.civilStatus,
                                            education: drafts.education,
                                            sex: drafts.sex,
                                            pob: drafts.pob,
                                            religion: drafts.religion,
                                            occupation: drafts.occupation,
                                            presentAddress:
                                                drafts.presentAddress,
                                            contactNo: drafts.contactNo,
                                            relationship: drafts.relationship,
                                        }));
                                        // setAge(calculateAge(drafts.dob));
                                        setEditingField(null);
                                        showSuccess('Identifying data was successfully updated!');
                                    }}
                                    data-cy='submit-identifying-data-section'
                                >
                                    Submit Changes
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="font-label grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
                                <p data-cy='disp-age'>
                                    <span className="font-bold-label">
                                        Age:
                                    </span>{" "}
                                    {age == 0 ? 0 : age || "-"}
                                </p>
                                <p data-cy='disp-dob'>
                                    <span className="font-bold-label">
                                        Date of Birth:
                                    </span>{" "}
                                    {drafts.dob || "-"}
                                </p>
                                <p data-cy='disp-sex'>
                                    <span className="font-bold-label">
                                        Sex:
                                    </span>{" "}
                                    {drafts.sex || "-"}
                                </p>
                                <p data-cy='disp-contact-num'>
                                    <span className="font-bold-label">
                                        Contact No.:
                                    </span>{" "}
                                    {drafts.contactNo || "-"}
                                </p>
                                <p data-cy='disp-educational-attainment'>
                                    <span className="font-bold-label">
                                        Educational Attainment:
                                    </span>{" "}
                                    {drafts.education || "-"}
                                </p>
                                <p data-cy='disp-occupation'>
                                    <span className="font-bold-label">
                                        Occupation:
                                    </span>{" "}
                                    {drafts.occupation || "-"}
                                </p>
                                <p data-cy='disp-civil-status'>
                                    <span className="font-bold-label">
                                        Civil Status:
                                    </span>{" "}
                                    {drafts.civilStatus || "-"}
                                </p>
                                <p data-cy='disp-religion'>
                                    <span className="font-bold-label">
                                        Religion:
                                    </span>{" "}
                                    {drafts.religion || "-"}
                                </p>
                                <p data-cy='disp-relationship'>
                                    <span className="font-bold-label">
                                        Relationship to Client:
                                    </span>{" "}
                                    {drafts.relationship || "-"}
                                </p>
                                <p data-cy='disp-address'>
                                    <span className="font-bold-label">
                                        Present Address:
                                    </span>{" "}
                                    {drafts.presentAddress || "-"}
                                </p>
                                <p data-cy='disp-pob'>
                                    <span className="font-bold-label">
                                        Place of Birth:
                                    </span>{" "}
                                    {drafts.pob || "-"}
                                </p>
                            </div>
                        </>
                    )}
                </section>

                <section
                    className="flex flex-col gap-8"
                    id="family-composition"
                    ref={ref2}
                >
                    <h1 className="header-main">Family Composition</h1>

                    <button
                        className="btn-primary font-bold-label drop-shadow-base"
                        onClick={handleAddFamilyMember}
                        data-cy='add-family-member'
                    >
                        Add New Family Member
                    </button>

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
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    className="flex flex-col gap-8"
                    id="problems-findings"
                    ref={ref3}
                >
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="header-main">Problems and Findings</h1>
                        <button
                            className={
                                editingField == "history-fields"
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
                            data-cy='edit-problems-findings-section'
                        ></button>
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        <div className="flex flex-col gap-4">
                            <h3 className="header-sub">Problem Presented</h3>

                            {editingField === "history-fields" ? (
                                <textarea
                                    className="text-input font-label"
                                    value={drafts.problemPresented}
                                    placeholder='Problem Presented'
                                    onChange={(e) =>
                                        setDrafts((prev) => ({
                                            ...prev,
                                            problemPresented: e.target.value,
                                        }))
                                    }
                                    data-cy='problem'
                                />
                            ) : (
                                <p className="font-label" data-cy='disp-problem'>
                                    {data.problem_presented || "-"}
                                </p>
                            )}
                        </div>

                        <div className='flex flex-col gap-4'>
                            <h3 className="header-sub">History of the Problem</h3>

                            {editingField === 'history-fields' ? (
                                <textarea className="text-input font-label"
                                    placeholder='History of the Problem'
                                    value={drafts.historyProblem}
                                    onChange={(e) =>
                                        setDrafts((prev) => ({
                                            ...prev,
                                            historyProblem: e.target.value,
                                        }))
                                    }
                                    data-cy='problem-history'
                                />
                            ) : (
                                <p className="font-label" data-cy='disp-problem-history'>
                                    {data.history_problem || "-"}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="header-sub">Findings</h3>

                            {editingField === 'history-fields' ? (
                                <textarea className="text-input font-label"
                                    placeholder='Findings'
                                    value={drafts.observationFindings}
                                    onChange={(e) =>
                                        setDrafts((prev) => ({
                                            ...prev,
                                            observationFindings: e.target.value,
                                        }))
                                    }
                                    data-cy='finding'
                                />
                            ) : (
                                <p className="font-label" data-cy='disp-finding'>
                                    {data.observation_findings || "-"}
                                </p>
                            )}
                        </div>
                    </div>

                    {editingField == "history-fields" && (
                        <button
                            className="btn-transparent-rounded my-3 ml-auto"
                            onClick={() => {
                                setData((prev) => ({
                                    ...prev,
                                    problem_presented: drafts.problemPresented,
                                    history_problem: drafts.historyProblem,
                                    observation_findings:
                                        drafts.observationFindings,
                                }));
                                setEditingField(null);
                                showSuccess("Problems and Findings were successfully updated.")
                            }}
                            data-cy='submit-problems-findings-section'>
                            Submit Changes
                        </button>
                    )}
                </section>

                <section
                    className="flex flex-col gap-8"
                    id="interventions"
                    ref={ref4}
                >
                    <h1 className="header-main">Interventions</h1>
                    <button
                        name="add_intervention"
                        id="add_intervention"
                        onClick={() => navigate("/intervention-form")}
                        className="btn-primary font-bold-label self-center"
                        data-cy='add-intervention'
                    >
                        New Intervention
                    </button>
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
                            {interventions[intervention_selected]?.map(
                                (item, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            handleInterventionNavigation(
                                                item.intervention,
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
                            )}
                        </div>
                    </div>
                </section>

                <section
                    className="flex flex-col gap-8"
                    id="interventions"
                    ref={ref4}
                >
                    <div className="flex justify-between">
                        <h1 className="header-main">Progress Reports</h1>
                    </div>
                    <button
                        name="add_progress_report"
                        id="add_progress_report"
                        onClick={() => navigate("/progress-report")}
                        className="btn-primary font-bold-label self-center"
                        data-cy='add-progress-report'
                    >
                        New Progress Report
                    </button>
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
                            {progress_reports?.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => navigate("/progress-report")}
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
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    className="flex flex-col gap-8"
                    id="assessments"
                    ref={ref5}
                >
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="header-main">Assessment</h1>
                        <button
                            className={
                                editingField == "assessment-field"
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
                            data-cy='assessment-section'
                        ></button>
                    </div>

                    <div className="grid grid-cols-1 gap-10">
                        <div className="flex flex-col gap-4">
                            {editingField === "assessment-field" ? (
                                <textarea
                                    className="text-input font-label"
                                    value={drafts.caseAssessment}
                                    placeholder='Assessment'
                                    onChange={(e) =>
                                        setDrafts((prev) => ({
                                            ...prev,
                                            caseAssessment: e.target.value,
                                        }))
                                    }
                                    data-cy='assessment'
                                />
                            ) : (
                                <p className="font-label" data-cy='disp-assessment'>
                                    {data.assessment || "-"}
                                </p>
                            )}
                        </div>
                    </div>

                    {editingField == "assessment-field" && (
                        <button
                            className="btn-transparent-rounded my-3 ml-auto"
                            onClick={() => {
                                setData((prev) => ({
                                    ...prev,
                                    assessment: drafts.caseAssessment,
                                }));
                                setEditingField(null);
                                showSuccess("Assessment was successfully updated");
                            }}
                            data-cy='submit-assessment-section'
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
                        <button
                            className={
                                editingField == "evaluation-fields"
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
                            data-cy='edit-evaluation-recommendation-section'
                        ></button>
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        <div className="flex flex-col gap-4">
                            <h3 className="header-sub">Evaluation</h3>

                            {editingField === "evaluation-fields" ? (
                                <textarea
                                    className="text-input font-label"
                                    value={drafts.caseEvalutation}

                                    placeholder='Evaluation'
                                    onChange={(e) =>
                                        setDrafts((prev) => ({
                                            ...prev,
                                            caseEvalutation: e.target.value,
                                        }))
                                    }
                                    data-cy='evaluation'
                                />
                            ) : (
                                <p className="font-label" data-cy='disp-evaluation'>
                                    {data.evaluation || "-"}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="header-sub">Recommendation</h3>

                            {editingField === "evaluation-fields" ? (
                                <textarea
                                    className="text-input font-label"
                                    value={drafts.caseRecommendation}
                                    placeholder='Recommendation'
                                    onChange={(e) =>
                                        setDrafts((prev) => ({
                                            ...prev,
                                            caseRecommendation: e.target.value,
                                        }))
                                    }
                                    data-cy='recommendation'
                                />
                            ) : (
                                <p className="font-label" data-cy='disp-recommendation'>
                                    {data.recommendation || "-"}
                                </p>
                            )}
                        </div>
                    </div>

                    {editingField == "evaluation-fields" && (
                        <button
                            className="btn-transparent-rounded my-3 ml-auto"
                            onClick={() => {
                                setData((prev) => ({
                                    ...prev,
                                    evaluation: drafts.caseEvalutation,
                                    recommendation: drafts.caseRecommendation,
                                }));
                                setEditingField(null);
                                showSuccess("Evaluation and Recommendation were successfully updated.");
                            }}
                            data-cy='submit-evaluation-recommendation-section'>
                            Submit Changes
                        </button>
                    )}
                </section>

                <button onClick={() => navigate("/case-closure")} className="btn-primary font-bold-label drop-shadow-base my-3 ml-auto"
                    data-cy='terminate-case'>
                    Terminate Case
                </button>
            </main>
        </>
    );
}

export default CaseFrontend;
