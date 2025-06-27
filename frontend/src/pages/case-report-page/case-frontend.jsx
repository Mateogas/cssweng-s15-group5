import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FamilyCard from '../../Components/FamilyCard';

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
        assessment: "Yes, very very qualified to wield firearms in public!"
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const [familyMembers, setFamilyMembers] = useState([
        {
            name: 'Ana Victoria Angat',
            age: 20,
            income: 100000.00,
            civilStatus: 'Single',
            occupation: 'Software Developer',
            education: 'Undergraduate',
            relationship: 'Sister'
        },
        {
            name: 'Marvin Ivan Mangubat',
            age: 21,
            income: 0.00,
            civilStatus: 'Divorced',
            occupation: 'Unemployed',
            education: 'Undergraduate',
            relationship: 'Sister'
        },
        {
            name: 'Jose Miguel Espinosa',
            age: 21,
            income: 100000.00,
            civilStatus: 'Single',
            occupation: 'Producer',
            education: 'Undergraduate',
            relationship: 'Brother'
        }
    ]);

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

    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        setAge(calculateAge(dob));
    }, [dob]);

    const [selectedFamily, setSelectedFamily] = useState(null);
    const [editingFamilyValue, setEditingFamilyValue] = useState({})

    const handleAddFamilyMember = () => {
        const newMember = {
            name: '',
            age: '',
            income: '',
            civilStatus: '',
            occupation: '',
            education: '',
            relationship: ''
        };

        setFamilyMembers(prev => [newMember, ...prev]);
        setSelectedFamily(0);
        setEditingFamilyValue(newMember);
    };


    const [drafts, setDrafts] = useState({
        problemPresented: problemPresented,
        historyProblem: historyProblem,
        observationFindings: observationFindings,
        caseAssessment: caseAssessment,
        caseRecommendation: caseRecommendation,
        caseEvalutation: caseEvalutation
    });
    const handleUpdateProblemsFindings = async () => {
        try {
            setLoading(true);

            const response = await fetch('/api/cases/update-problems-findings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sm_number: data.sm_number,
                    problem_presented: drafts.problemPresented,
                    observation_findings: drafts.observationFindings,
                    history_problem: drafts.historyProblem,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update problems and findings');
            }

            const result = await response.json();
            console.log("Problems and findings updated successfully:", result);
            
            // Update the state with the new drafts
            setProblemPresented(drafts.problemPresented);
            setHistoryProblem(drafts.historyProblem);
            setObservationFindings(drafts.observationFindings);
            setEditingField(null);
        } catch (error) {
            console.error("Error updating problems and findings:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className='flex flex-col gap-20'>
            <button className="flex items-center gap-5 px-4 py-2 font-bold-label">
                <img src="/arrow-left.svg" alt="arrow" className="w-8 h-8" />
                Back
            </button>

            <header className='flex flex-col gap-5'>
                <div className='flex justify-between'>
                    <h1 className="header-main">{data.first_name} {data.middle_name}, {data.last_name}</h1>

                    <button className="btn-blue font-bold-label drop-shadow-base">Download</button>
                </div>

                <h2 className='header-sub'>{data.sm_number}</h2>

                <button className='btn-outline-rounded font-bold-label'>Assign SDW</button>
            </header>

            <section className='flex flex-col gap-8'>
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

            <section className='flex flex-col gap-8'>
                <h1 className="header-main">Family Composition</h1>

                <button className="btn-primary font-bold-label drop-shadow-base"
                    onClick={handleAddFamilyMember}>Add New Family Member</button>

                <div className="flex justify-between gap-10">
                    <div className="flex gap-8 flex-wrap">
                        {familyMembers.map((member, index) => (
                            <FamilyCard key={index} index={index} member={member} selectedFamily={selectedFamily}
                                setSelectedFamily={setSelectedFamily} editingFamilyValue={editingFamilyValue}
                                setEditingFamilyValue={setEditingFamilyValue} familyMembers={familyMembers}
                                setFamilyMembers={setFamilyMembers} />
                        ))}

                    </div>
                </div>

            </section>

            <section className='flex flex-col gap-8'>
                <div className="flex justify-between items-center gap-4">

                    <h1 className="header-main">Problems and Findings</h1>
                    <button onClick={() => {
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
                        <img src="/dots.svg" alt="dots" className="w-8 h-8" />
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
                    <button className="btn-primary font-bold-label drop-shadow-base my-3 mx-auto"
                        onClick={() => handleUpdateProblemsFindings()}>
                        Submit Changes
                    </button>
                )}

            </section>

            <section className='flex flex-col gap-8'>
                <div className="flex justify-between items-center gap-4">

                    <h1 className="header-main">Assessment</h1>
                    <button onClick={() => {
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
                        <img src="/dots.svg" alt="dots" className="w-8 h-8" />
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
                    <button className="btn-primary font-bold-label drop-shadow-base my-3 mx-auto"
                        onClick={() => {
                            setCaseAssessment(drafts.caseAssessment);
                            setEditingField(null);
                        }}>
                        Submit Changes
                    </button>
                )}
            </section>

            <section className='flex flex-col gap-8'>
                <div className="flex justify-between items-center gap-4">

                    <h1 className="header-main">Evaluation and Recommendation</h1>
                    <button onClick={() => {
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
                            setEditingField('assessment-fields');
                        }
                    }}>
                        <img src="/dots.svg" alt="dots" className="w-8 h-8" />
                    </button>

                </div>


                <div className="grid grid-cols-2 gap-10">
                    <div className='flex flex-col gap-4'>
                        <h3 className="header-sub">Evaluation</h3>

                        {editingField === 'assessment-fields' ? (
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

                        {editingField === 'assessment-fields' ? (
                            <textarea className="text-input font-label"
                                value={drafts.caseRecommendation}
                                onChange={(e) =>
                                    setDrafts((prev) => ({ ...prev, caseRecommendation: e.target.value }))} />
                        ) : (
                            <p className='font-label'>{caseRecommendation || '-'}</p>
                        )}
                    </div>

                </div>

                {editingField == "assessment-fields" && (
                    <button className="btn-primary font-bold-label drop-shadow-base my-3 mx-auto"
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
    );
}

export default CaseFrontend