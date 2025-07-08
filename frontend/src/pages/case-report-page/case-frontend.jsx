import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer';

import FamilyCard from '../../components/FamilyCard';
import SimpleModal from '../../components/SimpleModal';
import NavLabelButton from '../../components/NavLabelButton';

// API Imports
import {    fetchCaseData, 
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
    const [data, setData] = useState({
        first_name: "Hephzi-Bah",
        middle_name: "Gamac",
        last_name: "Tolentino",
        sm_number: "12356473",
        sex: "F",
        dob: "2000-01-10",
        civil_status: "Single",
        edu_attainment: "Senior High School",
        occupation: "Teacher",
        pob: "Manila",
        religion: "Roman Catholic",
        contact_no: "0917 123 4567",
        present_address: "Taft Avenue, Metro Manila",
        relationship_to_client: "Sister",
        problem_presented: "Client struggles with adjustment to new environment.",
        observation_findings: "Client appears anxious and has limited coping strategies.",
        recommendation: "Recommend follow-up sessions and group support.",
        history_problem: "History of relocation, social withdrawal.",
        evaluation: "Initial evaluation suggests mild adjustment disorder.",
        is_active: "yes",
        assessment: "Yes, very very qualified to wield firearms in public!",

        sdw_id: 23456789,
        spu_id: "CEB",
        // sub_id: "CEB-02",

        classifications: ["Solo Parent", "Street Child", "Abandoned Child"]
    });

    const [familyMembers, setFamilyMembers] = useState([
        {
            id: 1,
            first: 'Ana',
            middle: 'Victoria',
            last: 'Angat',
            age: 20,
            income: 100000.00,
            civilStatus: 'Single',
            occupation: 'Software Developer',
            education: 'Undergraduate',
            relationship: 'Sister',
            deceased: false
        },
        {
            id: 2,
            first: 'Marvin',
            middle: 'Ivan',
            last: 'Mangubat',
            age: 21,
            income: 0.00,
            civilStatus: 'Divorced',
            occupation: 'Unemployed',
            education: 'Undergraduate',
            relationship: 'Sister',
            deceased: false
        },
        {
            id: 3,
            first: 'Jose',
            middle: 'Miguel',
            last: 'Espinosa',
            age: 21,
            income: 100000.00,
            civilStatus: 'Single',
            occupation: 'Producer',
            education: 'Undergraduate',
            relationship: 'Brother',
            deceased: false
        },
        {
            id: 4,
            first: 'Jose2',
            middle: 'Miguel2',
            last: 'Espinosa2',
            age: 21,
            income: 100000.00,
            civilStatus: 'Single',
            occupation: 'Producer',
            education: 'Undergraduate',
            relationship: 'Brother',
            deceased: false
        }
    ]);

    const [projectLocation, setProjectLocation] = useState([
        {
            name: "Manila",
            projectCode: "MNL",
            // subLocations: [
            //     { sub_id: "MNL-01", name: "Tondo" },
            //     { sub_id: "MNL-02", name: "Sampaloc" },
            //     { sub_id: "MNL-03", name: "Ermita" }
            // ]
        },
        {
            name: "Cebu",
            projectCode: "CEB",
            // subLocations: [
            //     { sub_id: "CEB-01", name: "Lapu-Lapu" },
            //     { sub_id: "CEB-02", name: "Mandaue" },
            //     { sub_id: "CEB-03", name: "Talamban" }
            // ]
        },
        {
            name: "Davao",
            projectCode: "DVO",
            // subLocations: [
            //     { sub_id: "DVO-01", name: "Buhangin" },
            //     { sub_id: "DVO-02", name: "Talomo" },
            //     { sub_id: "DVO-03", name: "Toril" }
            // ]
        },
        {
            name: "Baguio",
            projectCode: "BAG",
            // subLocations: [
            //     { sub_id: "BAG-01", name: "Loakan" },
            //     { sub_id: "BAG-02", name: "Irisan" },
            //     { sub_id: "BAG-03", name: "Pacdal" }
            // ]
        },
        {
            name: "Iloilo",
            projectCode: "ILO",
            // subLocations: [
            //     { sub_id: "ILO-01", name: "Jaro" },
            //     { sub_id: "ILO-02", name: "Mandurriao" },
            //     { sub_id: "ILO-03", name: "Molo" }
            // ]
        },
        {
            name: "Zamboanga",
            projectCode: "ZAM",
            // subLocations: [
            //     { sub_id: "ZAM-01", name: "Ayala" },
            //     { sub_id: "ZAM-02", name: "Putik" },
            //     { sub_id: "ZAM-03", name: "Tetuan" }
            // ]
        }
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
        "Low Income Family"
    ]);



    const [age, setAge] = useState(calculateAge(data?.dob));

    const [drafts, setDrafts] = useState({
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
        caseEvalutation: data.evaluation || ""
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
            caseEvalutation: data.evaluation || ""
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
        if (inView1) setCurrentSection('identifying-data');
        else if (inView2) setCurrentSection('family-composition');
        else if (inView3) setCurrentSection('problems-findings');
        else if (inView4) setCurrentSection('interventions');
        else if (inView5) setCurrentSection('assessments');
        else if (inView6) setCurrentSection('evaluation-recommendation');


    }, [inView1, inView2, inView3, inView4, inView5, inView6]);


    const sliderRef = useRef(null);

    const handleMouseDown = (e) => {
        const slider = sliderRef.current;
        slider.isDown = true;
        slider.startX = e.pageX - slider.offsetLeft;
        slider.scrollLeft = slider.scrollLeft;
        slider.classList.add('cursor-grabbing');
        slider.style.userSelect = 'none';
    };

    const handleMouseLeave = () => {
        const slider = sliderRef.current;
        slider.isDown = false;
        slider.classList.remove('cursor-grabbing');
        slider.style.userSelect = '';
    };

    const handleMouseUp = () => {
        const slider = sliderRef.current;
        slider.isDown = false;
        slider.classList.remove('cursor-grabbing');
        slider.style.userSelect = '';
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
            (today.getMonth() === birthday.getMonth() && today.getDate() >= birthday.getDate());

        if (!birthdayDone) {
            age--;
        }

        return age;
    }

    const [selectedClassification, setSelectedClassification] = useState("");

    const [editingField, setEditingField] = useState(null);

    const [currentSection, setCurrentSection] = useState("identifying-data");

    const [selectedFamily, setSelectedFamily] = useState(null);
    const [editingFamilyValue, setEditingFamilyValue] = useState({})

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
        if (arr.length === 0) return '';
        if (arr.length === 1) return arr[0];
        if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
        const last = arr[arr.length - 1];
        return `${arr.slice(0, -1).join(', ')}, and ${last}`;
    }

    const checkNewLocales = () => {
        const missing = [];

        if (!drafts.spu_id) missing.push('SPU Project');
        // if (!drafts.sub_id) missing.push('Sub-Project'); // if needed
        if (!drafts.sdw_id) missing.push('Social Development Worker');
        if (!drafts.classifications || drafts.classifications.length === 0)
            missing.push('at least one Classification');

        const validSDWIds = socialDevelopmentWorkers
            .filter((sdw) => sdw.spu_id === drafts.spu_id)
            .map((sdw) => sdw.id);

        if (drafts.sdw_id && !validSDWIds.includes(drafts.sdw_id)) {
            missing.push('valid Social Development Worker for selected SPU');
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



    const handleAddFamilyMember = () => {
        const newId = familyCounter + 1;
        const newMember = {
            id: newId,
            name: '',
            age: '',
            income: '',
            civilStatus: '',
            occupation: '',
            education: '',
            relationship: '',
            deceased: false
        };

        setFamilyMembers(prev => [newMember, ...prev]);
        setSelectedFamily(0);
        setEditingFamilyValue(newMember);
        setFamilyCounter(newId);
    };

    const handleDeleteFamilyMember = (familyToDelete) => {
        const updated = familyMembers.filter(member => member.id !== familyToDelete);
        setFamilyMembers(updated);
        setFamilyToDelete(null);
        setFamilyConfirm(false);
        setSelectedFamily(null);
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

            <main className='flex flex-col gap-20 pt-15'>
                {/* <div className='flex flex-1 top-0 justify-between fixed bg-white z-98 max-w-[1280px] py-3 mx-auto'> */}
                <div className='fixed top-0 left-0 right-0 z-50 w-full max-w-[1280px] mx-auto flex justify-between 
                items-center bg-white py-3 px-4 '>
                    <button className="flex items-center gap-5 px-4 py-2 font-bold-label arrow-group">
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

                <section className='flex flex-col gap-5' id="core-fields">
                    <div className='flex justify-between items-center'>
                        {data.is_active === "yes" ? (
                            <div className='rounded-full bg-[var(--color-green)] font-bold-label p-2 px-8 !text-white'>Active</div>
                        ) : (
                            <div className='rounded-full bg-[var(--accent-dark)] font-bold-label p-2 px-8 !text-white'>Inactive</div>
                        )}
                        <button className="btn-blue font-bold-label drop-shadow-base">Download</button>
                    </div>

                    {editingField === "core-fields" && (
                        <div className='flex justify-between items-center'>

                            <h1 className="header-main">Core Details</h1>
                            <button
                                className={editingField === "core-fields" ? "icon-button-setup x-button" : "icon-button-setup dots-button"}
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
                                    <label className="font-bold-label">First Name</label>
                                    <input
                                        type="text"
                                        value={drafts.first_name}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, first_name: e.target.value }))}
                                        className="text-input font-label w-full"
                                    />
                                </div>

                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label">Middle Name</label>
                                    <input
                                        type="text"
                                        value={drafts.middle_name}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, middle_name: e.target.value }))}
                                        className="text-input font-label w-full"
                                    />
                                </div>

                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label">Last Name</label>
                                    <input
                                        type="text"
                                        value={drafts.last_name}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, last_name: e.target.value }))}
                                        className="text-input font-label w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 w-full">
                                <label className="font-bold-label">SM Number</label>
                                <input
                                    type="text"
                                    value={drafts.sm_number}
                                    onChange={(e) => setDrafts(prev => ({ ...prev, sm_number: e.target.value }))}
                                    className="text-input font-label w-full max-w-[30rem]"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex justify-between items-center'>
                                <h1 className="header-main">{`${data.first_name} ${data.middle_name} ${data.last_name}`}</h1>
                                <button
                                    className={editingField === "core-fields" ? "icon-button-setup x-button" : "icon-button-setup dots-button"}
                                    onClick={() => {
                                        if (editingField) {
                                            resetFields();
                                        } else {
                                            setEditingField("core-fields");
                                        }
                                    }}
                                ></button>
                            </div>
                            <h2 className='header-sub'>{data.sm_number}</h2>
                        </>
                    )}

                    <div className='flex justify-between gap-10 flex-wrap'>
                        {/* SPU Project */}
                        <div className='flex flex-col w-full md:w-[48%]'>
                            {editingField === "core-fields" ? (
                                <>
                                    <label className='font-bold-label'>SPU Project</label>
                                    <select
                                        className="text-input font-label"
                                        value={drafts.spu_id}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, spu_id: e.target.value }))}
                                    >
                                        <option value="">Select SPU</option>
                                        {projectLocation.map((project) => (
                                            <option key={project.projectCode} value={project.projectCode}>
                                                {project.name} ({project.projectCode})
                                            </option>
                                        ))}
                                    </select>
                                </>
                            ) : (
                                <p className="font-label">
                                    <span className="font-bold-label">SPU Project:</span>{" "}
                                    {projectLocation.find(p => p.projectCode === data.spu_id)?.name || "-"}
                                </p>
                            )}
                        </div>

                        {/* Social Development Worker */}
                        <div className='flex flex-col w-full md:w-[48%]'>
                            {editingField === "core-fields" ? (
                                <>
                                    <label className='font-bold-label'>Social Development Worker</label>
                                    <select
                                        className="text-input font-label"
                                        value={drafts.sdw_id}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, sdw_id: e.target.value }))}
                                    >
                                        <option value="">Select SDW</option>
                                        {socialDevelopmentWorkers
                                            .filter((sdw) => sdw.spu_id === drafts.spu_id)
                                            .map((sdw) => (
                                                <option key={sdw.id} value={sdw.id}>
                                                    {sdw.username} 
                                                </option>
                                            ))}
                                    </select>
                                </>
                            ) : (
                                <p className="font-label">
                                    <span className="font-bold-label">Social Development Worker:</span>{" "}
                                    {socialDevelopmentWorkers.find(w => w.id === data.sdw_id)?.username || "-"}
                                </p>
                            )}
                        </div>
                    </div>


                    <div className='flex flex-col w-full'>
                        <label className="font-bold-label mb-2">Classifications</label>
                        {editingField === "core-fields" ? (
                            <>
                                <div className="flex items-center max-w-[65rem] w-full self-start">
                                    <select
                                        className="text-input font-label"
                                        value={selectedClassification}
                                        onChange={(e) => setSelectedClassification(e.target.value)}
                                    >
                                        <option value="">Select Classification</option>
                                        {classificationList.map((item) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        className="btn-primary font-bold-label ml-5 !w-[4.5rem] !h-[4.5rem]"
                                        onClick={() => {
                                            if (selectedClassification && !drafts.classifications.includes(selectedClassification)) {
                                                setDrafts(prev => ({
                                                    ...prev,
                                                    classifications: [...prev.classifications, selectedClassification],
                                                }));
                                                setSelectedClassification("");
                                            }
                                        }}
                                    >+</button>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-3">
                                    {drafts.classifications.map((item) => (
                                        <div key={item} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full">
                                            <span className="font-label">{item}</span>
                                            <button
                                                type="button"
                                                className="text-red-500 font-bold"
                                                onClick={() => {
                                                    setDrafts(prev => ({
                                                        ...prev,
                                                        classifications: prev.classifications.filter(c => c !== item),
                                                    }));
                                                }}
                                            >✕</button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {data.classifications.map((item) => (
                                    <span key={item} className="font-label bg-gray-200 px-3 py-1 rounded-full">{item}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    {editingField === "core-fields" && (
                        <button
                            className="btn-transparent-rounded my-3 ml-auto"
                            onClick={() => {
                                if (!checkNewLocales()) return;

                                try {
                                    const updatedFields = {
                                        first_name: drafts.first_name,
                                        middle_name: drafts.middle_name,
                                        last_name: drafts.last_name,
                                        sm_number: drafts.sm_number,
                                        spu_id: drafts.spu_id,
                                        sdw_id: drafts.sdw_id,
                                        classifications: drafts.classifications || [],
                                    };

                                    const updated = await updateCoreCaseData(updatedFields,data._id);

                                setData(prev => ({
                                    ...prev,
                                    first_name: drafts.first_name,
                                    middle_name: drafts.middle_name,
                                    last_name: drafts.last_name,
                                    sm_number: drafts.sm_number,
                                    spu_id: drafts.spu_id,
                                    sdw_id: drafts.sdw_id,
                                    classifications: drafts.classifications || [],
                                }));
                                setEditingField(null);
                            }}
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
                                editingField === 'identifying-fields'
                                    ? "icon-button-setup x-button"
                                    : 'icon-button-setup dots-button'
                            }
                            onClick={() => {
                                if (editingField) {
                                    resetFields();
                                } else {
                                    setEditingField('identifying-fields');
                                }
                            }}
                        ></button>
                    </div>

                    {editingField === 'identifying-fields' ? (
                        <>
                            <div className="flex justify-between gap-20">
                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label" htmlFor="age">Age</label>
                                    <input
                                        type="number"
                                        id="age"
                                        value={age}
                                        readOnly
                                        className="text-input font-label"
                                    />
                                </div>

                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label" htmlFor="dob">Date of Birth</label>
                                    <input
                                        type="date"
                                        id="dob"
                                        value={drafts.dob || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, dob: e.target.value }))}
                                        className="text-input font-label"
                                    />
                                </div>

                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label" htmlFor="civil">Civil Status</label>
                                    <input
                                        type="text"
                                        id="civil"
                                        value={drafts.civilStatus || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, civilStatus: e.target.value }))}
                                        className="text-input font-label"
                                    />
                                </div>

                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label" htmlFor="education">Educational Attainment</label>
                                    <input
                                        type="text"
                                        id="education"
                                        value={drafts.education || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, education: e.target.value }))}
                                        className="text-input font-label"
                                    />
                                </div>
                            </div>

                            <div className='flex justify-between gap-20'>
                                <div className='flex flex-col gap-5 w-full'>
                                    <label className="font-bold-label">Sex</label>
                                    <input
                                        type="text"
                                        value={drafts.sex || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, sex: e.target.value }))}
                                        className='text-input font-label'
                                    />
                                </div>

                                <div className='flex flex-col gap-5 w-full'>
                                    <label className="font-bold-label">Place of Birth</label>
                                    <input
                                        type="text"
                                        value={drafts.pob || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, pob: e.target.value }))}
                                        className='text-input font-label'
                                    />
                                </div>

                                <div className='flex flex-col gap-5 w-full'>
                                    <label className="font-bold-label">Religion</label>
                                    <input
                                        type="text"
                                        value={drafts.religion || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, religion: e.target.value }))}
                                        className='text-input font-label'
                                    />
                                </div>

                                <div className='flex flex-col gap-5 w-full'>
                                    <label className="font-bold-label">Occupation</label>
                                    <input
                                        type="text"
                                        value={drafts.occupation || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, occupation: e.target.value }))}
                                        className='text-input font-label'
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between gap-20">
                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label">Present Address</label>
                                    <textarea
                                        className="text-input font-label"
                                        placeholder="Taft Avenue, Metro Manila"
                                        value={drafts.presentAddress || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, presentAddress: e.target.value }))}
                                    ></textarea>
                                </div>

                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label">Contact No.</label>
                                    <input
                                        type="text"
                                        className="text-input font-label"
                                        placeholder="0000 000 0000"
                                        value={drafts.contactNo || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, contactNo: e.target.value }))}
                                    />
                                </div>

                                <div className="flex flex-col gap-5 w-full">
                                    <label className="font-bold-label">Relationship to Client</label>
                                    <input
                                        type="text"
                                        className="text-input font-label"
                                        placeholder="Sister"
                                        value={drafts.relationship || ""}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, relationship: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    className="btn-transparent-rounded my-3 ml-auto"
                                    onClick={async () => {
                                        try {
                                            const updatedFields = {
                                                dob: drafts.dob,
                                                civil_status: drafts.civilStatus,
                                                edu_attainment: drafts.education,
                                                sex: drafts.sex,
                                                pob: drafts.pob,
                                                religion: drafts.religion,
                                                occupation: drafts.occupation,
                                                present_address: drafts.presentAddress,
                                                contact_no: drafts.contactNo,
                                                relationship_to_client: drafts.relationship,
                                            };

                                            const updated = await updateIdentifyingCaseData(updatedFields,data._id);
                                            
                                            setData(prev => ({
                                                ...prev,
                                                dob: drafts.dob,
                                                civil_status: drafts.civilStatus,
                                                edu_attainment: drafts.education,
                                                sex: drafts.sex,
                                                pob: drafts.pob,
                                                religion: drafts.religion,
                                                occupation: drafts.occupation,
                                                present_address: drafts.presentAddress,
                                                contact_no: drafts.contactNo,
                                                relationship_to_client: drafts.relationship,
                                            }));
                                            setEditingField(null);
                                        } catch (error) {
                                            console.error('Error updating case data:', error);
                                            
                                        }
                                    }}
                                >
                                    Submit Changes
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6 font-label">
                                <p><span className="font-bold-label">Age:</span> {age || "-"}</p>
                                <p><span className="font-bold-label">Date of Birth:</span> {drafts.dob || "-"}</p>
                                <p><span className="font-bold-label">Sex:</span> {drafts.sex || "-"}</p>
                                <p><span className="font-bold-label">Contact No.:</span> {drafts.contactNo || "-"}</p>
                                <p><span className="font-bold-label">Educational Attainment:</span> {drafts.education || "-"}</p>
                                <p><span className="font-bold-label">Occupation:</span> {drafts.occupation || "-"}</p>
                                <p><span className="font-bold-label">Civil Status:</span> {drafts.civilStatus || "-"}</p>
                                <p><span className="font-bold-label">Religion:</span> {drafts.religion || "-"}</p>
                                <p><span className="font-bold-label">Relationship to Client:</span> {drafts.relationship || "-"}</p>
                                <p><span className="font-bold-label">Present Address:</span> {drafts.presentAddress || "-"}</p>
                                <p><span className="font-bold-label">Place of Birth:</span> {drafts.pob || "-"}</p>
                            </div>

                        </>
                    )}
                </section>


                <section className='flex flex-col gap-8' id="family-composition" ref={ref2}>
                    <h1 className="header-main">Family Composition</h1>

                    <button className="btn-primary font-bold-label drop-shadow-base"
                        onClick={handleAddFamilyMember}>Add New Family Member</button>

                    <div className="flex justify-between gap-10">
                        <div
                            // ref={sliderRef}
                            className="flex gap-8 outline-gray w-full rounded-lg p-6 overflow-x-auto"
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
                                    setEditingFamilyValue={setEditingFamilyValue}
                                    familyMembers={familyMembers}
                                    setFamilyMembers={setFamilyMembers}

                                    handleDeleteFamilyMember={handleDeleteFamilyMember}
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

                <section className='flex flex-col gap-8' id="problems-findings" ref={ref3}>
                    <div className="flex justify-between items-center gap-4">

                        <h1 className="header-main">Problems and Findings</h1>
                        <button className={editingField == 'history-fields' ? "icon-button-setup x-button" : 'icon-button-setup dots-button'} onClick={() => {
                            if (editingField) {
                                resetFields();
                            } else {
                                setEditingField('history-fields');
                            }
                        }}>
                        </button>

                    </div>


                    <div className="grid grid-cols-2 gap-10">
                        <div className='flex flex-col gap-4'>
                            <h3 className="header-sub">Problem Presented</h3>

                            {editingField === 'history-fields' ? (
                                <textarea className="text-input font-label"
                                    value={drafts.problemPresented}
                                    onChange={(e) =>
                                        setDrafts((prev) => ({ ...prev, problemPresented: e.target.value }))} />
                            ) : (
                                <p className='font-label'>{data.problem_presented || '-'}</p>
                            )}
                        </div>


                        <div className='flex flex-col gap-4'>
                            <h3 className="header-sub">History of the Problem</h3>

                            {editingField === 'history-fields' ? (
                                <textarea className="text-input font-label"
                                    value={drafts.historyProblem}
                                    onChange={(e) =>
                                        setDrafts((prev) => ({ ...prev, historyProblem: e.target.value }))} />
                            ) : (
                                <p className='font-label'>{data.history_problem || '-'}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-4'>
                            <h3 className="header-sub">Findings</h3>

                            {editingField === 'history-fields' ? (
                                <textarea className="text-input font-label"
                                    value={drafts.observationFindings}
                                    onChange={(e) =>
                                        setDrafts((prev) => ({ ...prev, observationFindings: e.target.value }))} />
                            ) : (
                                <p className='font-label'>{data.observation_findings || '-'}</p>
                            )}
                        </div>

                    </div>

                    {editingField == "history-fields" && (
                        <button className="btn-transparent-rounded my-3 ml-auto"
                            onClick={() => {
                                setData(prev => ({
                                    ...prev,
                                    problem_presented: drafts.problemPresented,
                                    history_problem: drafts.historyProblem,
                                    observation_findings: drafts.observationFindings
                                }));
                                setEditingField(null);

                            }}>
                            Submit Changes
                        </button>
                    )}

                </section>

                <section className='flex flex-col gap-8' id="interventions" ref={ref4}>
                    <h1 className="header-main">Interventions</h1>

                </section>

                <section className='flex flex-col gap-8' id="assessments" ref={ref5}>
                    <div className="flex justify-between items-center gap-4">

                        <h1 className="header-main">Assessment</h1>
                        <button className={editingField == 'assessment-field' ? "icon-button-setup x-button" : 'icon-button-setup dots-button'} onClick={() => {
                            if (editingField) {
                                resetFields();
                            } else {
                                setEditingField('assessment-field');
                            }
                        }}>
                        </button>

                    </div>

                    <div className="grid grid-cols-1 gap-10">

                        <div className='flex flex-col gap-4'>
                            {editingField === 'assessment-field' ? (
                                <textarea className="text-input font-label"
                                    value={drafts.caseAssessment}
                                    onChange={(e) =>
                                        setDrafts((prev) => ({ ...prev, caseAssessment: e.target.value }))} />
                            ) : (
                                <p className='font-label'>{data.assessment || '-'}</p>
                            )}
                        </div>
                    </div>

                    {editingField == "assessment-field" && (
                        <button className="btn-transparent-rounded my-3 ml-auto"
                            onClick={() => {
                                setData(prev => ({
                                    ...prev,
                                    assessment: drafts.caseAssessment
                                }));
                                setEditingField(null);
                            }}>
                            Submit Changes
                        </button>

                    )}
                </section>

                <section className='flex flex-col gap-8' id="evaluation-recommendation" ref={ref6}>
                    <div className="flex justify-between items-center gap-4">

                        <h1 className="header-main">Evaluation and Recommendation</h1>
                        <button className={editingField == 'evaluation-fields' ? "icon-button-setup x-button" : 'icon-button-setup dots-button'} onClick={() => {
                            if (editingField) {
                                resetFields()
                            } else {
                                setEditingField('evaluation-fields');
                            }
                        }}>
                        </button>

                    </div>


                    <div className="grid grid-cols-2 gap-10">
                        <div className='flex flex-col gap-4'>
                            <h3 className="header-sub">Evaluation</h3>

                            {editingField === 'evaluation-fields' ? (
                                <textarea className="text-input font-label"
                                    value={drafts.caseEvalutation}
                                    onChange={(e) =>
                                        setDrafts((prev) => ({ ...prev, caseEvalutation: e.target.value }))} />
                            ) : (
                                <p className='font-label'>{data.evaluation || '-'}</p>
                            )}
                        </div>


                        <div className='flex flex-col gap-4'>
                            <h3 className="header-sub">Recommendation</h3>

                            {editingField === 'evaluation-fields' ? (
                                <textarea className="text-input font-label"
                                    value={drafts.caseRecommendation}
                                    onChange={(e) =>
                                        setDrafts((prev) => ({ ...prev, caseRecommendation: e.target.value }))} />
                            ) : (
                                <p className='font-label'>{data.recommendation || '-'}</p>
                            )}
                        </div>

                    </div>

                    {editingField == "evaluation-fields" && (
                        <button className="btn-transparent-rounded my-3 ml-auto"
                            onClick={() => {
                                setData(prev => ({
                                    ...prev,
                                    evaluation: drafts.caseEvalutation,
                                    recommendation: drafts.caseRecommendation
                                }));
                                setEditingField(null);
                            }}>
                            Submit Changes
                        </button>


                    )}

                </section>

                <button className="btn-primary font-bold-label drop-shadow-base my-3 ml-auto">
                    Terminate Case
                </button>

            </main>
        </>
    );
}

export default CaseFrontend