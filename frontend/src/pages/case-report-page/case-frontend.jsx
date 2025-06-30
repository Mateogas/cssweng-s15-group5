import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer';

import FamilyCard from '../../Components/FamilyCard';
import SimpleModal from '../../Components/SimpleModal';
import NavLabelButton from '../../Components/NavLabelButton';

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
        sub_id: "CEB-02",

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
            subLocations: [
                { sub_id: "MNL-01", name: "Tondo" },
                { sub_id: "MNL-02", name: "Sampaloc" },
                { sub_id: "MNL-03", name: "Ermita" }
            ]
        },
        {
            name: "Cebu",
            projectCode: "CEB",
            subLocations: [
                { sub_id: "CEB-01", name: "Lapu-Lapu" },
                { sub_id: "CEB-02", name: "Mandaue" },
                { sub_id: "CEB-03", name: "Talamban" }
            ]
        },
        {
            name: "Davao",
            projectCode: "DVO",
            subLocations: [
                { sub_id: "DVO-01", name: "Buhangin" },
                { sub_id: "DVO-02", name: "Talomo" },
                { sub_id: "DVO-03", name: "Toril" }
            ]
        },
        {
            name: "Baguio",
            projectCode: "BAG",
            subLocations: [
                { sub_id: "BAG-01", name: "Loakan" },
                { sub_id: "BAG-02", name: "Irisan" },
                { sub_id: "BAG-03", name: "Pacdal" }
            ]
        },
        {
            name: "Iloilo",
            projectCode: "ILO",
            subLocations: [
                { sub_id: "ILO-01", name: "Jaro" },
                { sub_id: "ILO-02", name: "Mandurriao" },
                { sub_id: "ILO-03", name: "Molo" }
            ]
        },
        {
            name: "Zamboanga",
            projectCode: "ZAM",
            subLocations: [
                { sub_id: "ZAM-01", name: "Ayala" },
                { sub_id: "ZAM-02", name: "Putik" },
                { sub_id: "ZAM-03", name: "Tetuan" }
            ]
        }
    ]);


    const [socialDevelopmentWorkers, setSocialDevelopmentWorkers] = useState([
        { id: 12345678, username: "juan delacruz", spu_id: "MNL" },
        { id: 23456789, username: "maria santos", spu_id: "CEB" },
        { id: 34567890, username: "pedro ramos", spu_id: "DVO" },
        { id: 45678901, username: "ana reyes", spu_id: "BAG" },
        { id: 56789012, username: "carlos morales", spu_id: "ILO" },
        { id: 67890123, username: "lucia rodriguez", spu_id: "ZAM" }
    ]);

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

    const [dob, setDob] = useState(data?.dob || '');
    const [age, setAge] = useState(calculateAge(data?.dob));
    const [civilStatus, setCivilStatus] = useState(data?.civil_status || '');
    const [education, setEducation] = useState(data?.edu_attainment || '');

    const [sex, setSex] = useState(data?.sex || '');
    const [pob, setPob] = useState(data?.pob || '');
    const [religion, setReligion] = useState(data?.religion || '');
    const [occupation, setOccupation] = useState(data?.occupation || '');

    const [presentAddress, setPresentAddress] = useState(data?.present_address || '');
    const [contactNo, setContactNo] = useState(data?.contact_no || '');
    const [relationship, setRelationship] = useState(data?.relationship_to_client || '');

    const [problemPresented, setProblemPresented] = useState(data?.problem_presented || '');
    const [observationFindings, setObservationFindings] = useState(data?.observation_findings || '');
    const [historyProblem, setHistoryProblem] = useState(data?.history_problem || '');
    const [caseAssessment, setCaseAssessment] = useState(data?.assessment || '');

    const [caseEvalutation, setCaseEvalutation] = useState(data?.evaluation || '');
    const [caseRecommendation, setCaseRecommendation] = useState(data?.recommendation || '');

    const [selectedClassification, setSelectedClassification] = useState("");

    const [editingField, setEditingField] = useState(null);

    const [currentSection, setCurrentSection] = useState("identifying-data");

    useEffect(() => {
        setAge(calculateAge(dob));
    }, [dob]);

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

    const [editedLocale, setEditedLocale] = useState(false);

    const checkNewLocales = () => {
        const missing = [];

        console.log(data.sub_id);

        if (!data.spu_id) missing.push('SPU Project');
        if (!data.sub_id) missing.push('Sub-Project');
        if (!data.sdw_id) missing.push('Social Development Worker');
        if (!data.classifications || data.classifications.length === 0) missing.push('at least one Classification');

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

    // For validation of the location/sdw details
    useEffect(() => {
        const currentSPU = projectLocation.find((p) => p.projectCode === data.spu_id);
        const validSubIds = currentSPU ? currentSPU.subLocations.map(sub => sub.sub_id) : [];

        if (!validSubIds.includes(data.sub_id)) {
            setData((prev) => ({
                ...prev,
                sub_id: ""
            }));
        }

        const validSDWIds = socialDevelopmentWorkers
            .filter((sdw) => sdw.spu_id === data.spu_id)
            .map((sdw) => sdw.id);

        if (!validSDWIds.includes(data.sdw_id)) {
            setData((prev) => ({
                ...prev,
                sdw_id: ""
            }));
        }
    }, [data.spu_id, projectLocation, socialDevelopmentWorkers]);


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

    const [drafts, setDrafts] = useState({
        problemPresented: problemPresented,
        historyProblem: historyProblem,
        observationFindings: observationFindings,
        caseAssessment: caseAssessment,
        caseRecommendation: caseRecommendation,
        caseEvalutation: caseEvalutation
    });

    return (
        <>
            <SimpleModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    // Optional: clear states if needed
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

                <header className='flex flex-col gap-5'>
                    <div className='flex justify-between items-center'>
                        {data.is_active == "yes" ?
                            <div className='rounded-full bg-[var(--color-green)] font-bold-label p-2 px-8'
                                style={{ color: "white" }}>Active</div> :
                            <div className='rounded-full bg-[var(--accent-dark)] font-bold-label p-2 px-8'
                                style={{ color: "white" }}>Inactive</div>}
                        <button className="btn-blue font-bold-label drop-shadow-base">Download</button>
                    </div>

                    <div className='flex justify-between'>
                        <h1 className="header-main">{data.first_name} {data.middle_name}, {data.last_name}</h1>
                    </div>

                    <h2 className='header-sub'>{data.sm_number}</h2>

                    <div className='flex justify-between gap-10'>
                        <div className='flex gap-5 items-center w-full'>
                            <p className='font-bold-label'>SPU Project:</p>
                            <select
                                className="text-input font-label flex-1"
                                value={data.spu_id}
                                id="spu"
                                onChange={(e) =>{
                                    setEditedLocale(true);
                                    setData((prev) => ({
                                        ...prev,
                                        spu_id: e.target.value
                                    }))}
                                }>
                                <option value="">Select SPU</option>
                                {projectLocation.map((project) => (
                                    <option key={project.projectCode} value={project.projectCode}>
                                        {project.name} ({project.projectCode})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='flex gap-5 items-center w-full'>
                            <p className='font-bold-label'>Sub-Project:</p>
                            <select
                                className="text-input font-label flex-1"
                                value={data.sub_id}
                                id="sub"
                                onChange={(e) =>{
                                    setEditedLocale(true);
                                    setData((prev) => ({
                                        ...prev,
                                        sub_id: e.target.value
                                    }))}
                                }>
                                <option value="">Select Sub-Project</option>
                                {projectLocation.find((p) => p.projectCode === data.spu_id)?.subLocations.map((sub) => (
                                    <option key={sub.sub_id} value={sub.sub_id}>
                                        {sub.name} ({sub.sub_id})
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className='flex justify-between gap-10'>
                        <div className='flex gap-5 items-center max-w-[65rem] w-full self-start'>
                            <p className='font-bold-label'>Social Development Worker:</p>
                            <select
                                className="text-input font-label flex-1"
                                value={data.sdw_id}
                                id="sdw"
                                onChange={(e) =>{
                                    setEditedLocale(true);
                                    setData((prev) => ({
                                        ...prev,
                                        sdw_id: parseInt(e.target.value, 10)
                                    }))}
                                }>
                                <option value="">Select SDW</option>
                                {socialDevelopmentWorkers
                                    .filter((sdw) => sdw.spu_id === data.spu_id)
                                    .map((sdw) => (
                                        <option key={sdw.id} value={sdw.id}>
                                            {sdw.username} ({sdw.id})
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="flex flex-col w-full">
                            <p className="font-bold-label mb-2">Classifications:</p>

                            <div className="flex items-center">
                                <select
                                    className="text-input font-label"
                                    value={selectedClassification}
                                    onChange={(e) => setSelectedClassification(e.target.value)}>
                                    <option value="">Select Classification</option>
                                    {classificationList.map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>

                                <button type="button" className="btn-primary font-bold-label ml-5 !w-[4.5rem] !h-[4.5rem]"
                                    onClick={() => {
                                        if (
                                            selectedClassification &&
                                            !data.classifications.includes(selectedClassification)
                                        ) {
                                            setEditedLocale(true);
                                            setData((prev) => ({
                                                ...prev,
                                                classifications: [...prev.classifications, selectedClassification],
                                            }));
                                            setSelectedClassification("");
                                        }
                                    }}>+
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                                {data.classifications.map((item) => (
                                    <div key={item} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full">
                                        <span className="font-label">{item}</span>
                                        <button type="button" className="text-red-500 font-bold"
                                            onClick={() => {
                                                setData((prev) => ({
                                                    ...prev,
                                                    classifications: prev.classifications.filter((c) => c !== item),
                                                }));
                                            }}>✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {editedLocale && <button className="btn-transparent-rounded my-3"
                        onClick={() => {
                            if (checkNewLocales()) {
                                setEditedLocale(false);
                                console.log('Valid, go update db');
                            }
                        }}>
                        Submit Changes
                    </button>}
                </header>

                <section className='flex flex-col gap-8' id="identifying-data" ref={ref1}>
                    <h1 className="header-main">Identifying Data</h1>

                    <div className="flex justify-between gap-20">
                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                value={age}
                                readOnly
                                className="text-input font-label"
                            />
                        </div>

                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="dob">Date of Birth</label>
                            <input
                                type="date"
                                id="dob"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="text-input font-label"
                            />
                        </div>

                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="civil">Civil Status</label>
                            <input
                                type="text"
                                id="civil"
                                value={civilStatus}
                                onChange={(e) => setCivilStatus(e.target.value)}
                                className="text-input font-label"
                            />
                        </div>

                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="education">Educational Attainment</label>
                            <input
                                type="text"
                                id="education"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                                className="text-input font-label"
                            />
                        </div>
                    </div>

                    <div className='flex justify-between gap-20'>
                        <div className='flex flex-col gap-5 w-full'>
                            <p className='font-label'>Sex</p>
                            <input
                                type="text"
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                                className='text-input font-label'
                            />
                        </div>

                        <div className='flex flex-col gap-5 w-full'>
                            <p className='font-label'>Place of Birth</p>
                            <input
                                type="text"
                                value={pob}
                                onChange={(e) => setPob(e.target.value)}
                                className='text-input font-label'
                            />
                        </div>

                        <div className='flex flex-col gap-5 w-full'>
                            <p className='font-label'>Religion</p>
                            <input
                                type="text"
                                value={religion}
                                onChange={(e) => setReligion(e.target.value)}
                                className='text-input font-label'
                            />
                        </div>

                        <div className='flex flex-col gap-5 w-full'>
                            <p className='font-label'>Occupation</p>
                            <input
                                type="text"
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                                className='text-input font-label'
                            />
                        </div>
                    </div>

                    <div className="flex justify-between gap-20">
                        <div className="flex flex-col gap-5 w-full">
                            <p className="font-label">Present Address</p>
                            <textarea
                                className="text-input font-label"
                                placeholder="Taft. Avenue, Metro Manila"
                                value={presentAddress}
                                onChange={(e) => setPresentAddress(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex flex-col gap-5 w-full">
                            <p className="font-label">Contact No.</p>
                            <input
                                type="text"
                                className="text-input font-label"
                                placeholder="0000 000 0000"
                                value={contactNo}
                                onChange={(e) => setContactNo(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-5 w-full">
                            <p className="font-label">Relationship to Client</p>
                            <input
                                type="text"
                                className="text-input font-label"
                                placeholder="Sister"
                                value={relationship}
                                onChange={(e) => setRelationship(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                <section className='flex flex-col gap-8' id="family-composition" ref={ref2}>
                    <h1 className="header-main">Family Composition</h1>

                    <button className="btn-primary font-bold-label drop-shadow-base"
                        onClick={handleAddFamilyMember}>Add New Family Member</button>

                    <div className="flex justify-between gap-10">
                        <div
                            ref={sliderRef}
                            className="flex gap-8 outline-gray w-full rounded-lg p-6 overflow-x-auto cursor-grab"
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
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
                                setDrafts({
                                    problemPresented,
                                    historyProblem,
                                    observationFindings,
                                    caseAssessment,
                                    caseEvalutation,
                                    caseRecommendation
                                });
                                setEditingField(null);
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
                                <p className='font-label'>{problemPresented || '-'}</p>
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
                                <p className='font-label'>{historyProblem || '-'}</p>
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
                                <p className='font-label'>{observationFindings || '-'}</p>
                            )}
                        </div>

                    </div>

                    {editingField == "history-fields" && (
                        <button className="btn-transparent-rounded my-3 ml-auto"
                            onClick={() => {
                                setProblemPresented(drafts.problemPresented);
                                setHistoryProblem(drafts.historyProblem);
                                setObservationFindings(drafts.observationFindings);
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
                                setDrafts({
                                    problemPresented,
                                    historyProblem,
                                    observationFindings,
                                    caseAssessment,
                                    caseEvalutation,
                                    caseRecommendation
                                });
                                setEditingField(null);
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
                                <p className='font-label'>{caseAssessment || '-'}</p>
                            )}
                        </div>
                    </div>

                    {editingField == "assessment-field" && (
                        <button className="btn-transparent-rounded my-3 ml-auto"
                            onClick={() => {
                                setCaseAssessment(drafts.caseAssessment);
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
                                setDrafts({
                                    problemPresented,
                                    historyProblem,
                                    observationFindings,
                                    caseAssessment,
                                    caseEvalutation,
                                    caseRecommendation
                                });
                                setEditingField(null);
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
                                <p className='font-label'>{caseEvalutation || '-'}</p>
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
                                <p className='font-label'>{caseRecommendation || '-'}</p>
                            )}
                        </div>

                    </div>

                    {editingField == "evaluation-fields" && (
                        <button className="btn-transparent-rounded my-3 ml-auto"
                            onClick={() => {
                                setCaseEvalutation(drafts.caseEvalutation);
                                setCaseRecommendation(drafts.caseRecommendation);
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