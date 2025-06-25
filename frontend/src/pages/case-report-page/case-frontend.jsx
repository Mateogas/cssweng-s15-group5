import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
        is_active: "yes"
    });


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
                            <div key={index} className="flex flex-col gap-5 w-[40rem] drop-shadow-card px-[2rem] py-[3rem] rounded-xl outline-gray">
                                <div className='flex justify-between items-center gap-4'>
                                    {selectedFamily === index ? (
                                        <input
                                            type="text"
                                            value={editingFamilyValue.name || ''}
                                            className="text-input font-bold-label text-xl"
                                            onChange={(e) =>
                                                setEditingFamilyValue({ ...editingFamilyValue, name: e.target.value })
                                            }
                                        />
                                    ) : (
                                        <h3 className="header-sub">{member.name}</h3>
                                    )}
                                    <button onClick={() => {
                                        if (selectedFamily === index) {
                                            setSelectedFamily(null)
                                        } else {
                                            setEditingFamilyValue({ ...member })
                                            setSelectedFamily(index)
                                        }
                                    }}>

                                        <img src="/dots.svg" alt="dots" className="w-8 h-8" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-[max-content_1fr] gap-5 text-sm font-label">
                                    <div className="font-bold-label">Age</div>
                                    {selectedFamily === index ? (
                                        <input type="number"
                                            className="text-input"
                                            value={editingFamilyValue.age || ''}
                                            onChange={(e) =>
                                                setEditingFamilyValue({ ...editingFamilyValue, age: e.target.value })
                                            }
                                        />
                                    ) : (
                                        `: ${member.age}`
                                    )}

                                    <div className="font-bold-label">Income</div>
                                    {selectedFamily === index ? (
                                        <input type="text"
                                            className="text-input"
                                            value={editingFamilyValue.income || ''}
                                            onChange={(e) =>
                                                setEditingFamilyValue({ ...editingFamilyValue, income: e.target.value })
                                            }
                                        />
                                    ) : (
                                        `: ${member.income}`
                                    )}

                                    <div className="font-bold-label">Civil Status</div>
                                    {selectedFamily === index ? (
                                        <input type="text"
                                            className="text-input"
                                            value={editingFamilyValue.civilStatus || ''}
                                            onChange={(e) =>
                                                setEditingFamilyValue({ ...editingFamilyValue, civilStatus: e.target.value })
                                            }
                                        />
                                    ) : (
                                        `: ${member.civilStatus}`
                                    )}

                                    <div className="font-bold-label">Occupation</div>
                                    <div>{selectedFamily === index ? (
                                        <input type="text"
                                            className="text-input"
                                            value={editingFamilyValue.occupation || ''}
                                            onChange={(e) =>
                                                setEditingFamilyValue({ ...editingFamilyValue, occupation: e.target.value })
                                            }
                                        />
                                    ) : (
                                        `: ${member.occupation}`
                                    )}
                                    </div>

                                    <div className="font-bold-label">Educational Attainment</div>
                                    {selectedFamily === index ? (
                                        <input type="text"
                                            className="text-input"
                                            value={editingFamilyValue.education || ''}
                                            onChange={(e) =>
                                                setEditingFamilyValue({ ...editingFamilyValue, education: e.target.value })
                                            }
                                        />
                                    ) : (
                                        `: ${member.education}`
                                    )}

                                    <div className="font-bold-label">Relationship to Client</div>
                                    {selectedFamily === index ? (
                                        <input type="text"
                                            className="text-input"
                                            value={editingFamilyValue.relationship || ''}
                                            onChange={(e) =>
                                                setEditingFamilyValue({ ...editingFamilyValue, relationship: e.target.value })
                                            }
                                        />
                                    ) : (
                                        `: ${member.relationship}`
                                    )}
                                </div>

                                {selectedFamily === index && (
                                    <div className='flex justify-between items-center'>
                                        <button className='mt-5'
                                            onClick={() => {
                                                const updated = familyMembers.filter((_, i) => i !== index)
                                                setFamilyMembers(updated)
                                                setSelectedFamily(null)
                                            }}>
                                            <img src="/trash.svg" alt="trash" className="w-8 h-8" />
                                        </button>

                                        <button className='font-bold-label'
                                            style={{ color: "var(--color-primary)" }}
                                            onClick={() => {
                                                const updated = [...familyMembers]
                                                updated[index] = { ...editingFamilyValue }
                                                setFamilyMembers(updated)
                                                setSelectedFamily(null)
                                            }}>
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </section>

        </main>
    );
}

export default CaseFrontend