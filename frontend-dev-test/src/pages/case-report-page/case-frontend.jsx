import { useState, useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'

function CaseFrontend() {
    //these just instantiates variables into nulls and their defaults
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [dob, setDob] = useState('');
    const [age, setAge] = useState(0);
    const [civilStatus, setCivilStatus] = useState('');
    const [education, setEducation] = useState('');
    const [sex, setSex] = useState('');
    const [pob, setPob] = useState('');
    const [religion, setReligion] = useState('');
    const [occupation, setOccupation] = useState('');

    const [presentAddress, setPresentAddress] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [relationship, setRelationship] = useState('');

    const [familyMembers, setFamilyMembers] = useState([]);
    //this was made by jm
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
            // This is the main function that fetches the data from the call and assigns variables
            useEffect(() => {
            const fetchCase = async () => {
                try {
                    setLoading(true);
                    const caseId = id || "1"; 
                    const response = await fetch(`/api/cases/${caseId}`);

                    if (!response.ok) {
                        throw new Error(`API error: ${response.status}`);
                    }
                    
                    const caseData = await response.json();
                    //this just sets everything like assigning value to variable
                    setData(caseData);
                    
                    const formattedDate = caseData?.dob ? new Date(caseData.dob).toISOString().split('T')[0] : '';
                    setDob(formattedDate);
                    setAge(calculateAge(caseData?.dob));
                    setCivilStatus(caseData?.civil_status || '');
                    setEducation(caseData?.edu_attainment || '');
                    setSex(caseData?.sex || '');
                    setPob(caseData?.pob || '');
                    setReligion(caseData?.religion || '');
                    setOccupation(caseData?.occupation || '');
                    setPresentAddress(caseData?.present_address || '');
                    setContactNo(caseData?.contact_no || '');
                    setRelationship(caseData?.relationship_to_client || '');
                            if (caseData.family_members && caseData.family_members.length > 0) {
                            const formattedMembers = caseData.family_members.map(member => ({
                        name: `${member.first_name} ${member.last_name}`,
                        age: calculateAge(member.dob),
                        income: member.income || 'N/A',
                        civilStatus: member.civil_status || 'N/A',
                        occupation: member.occupation || 'N/A',
                        education: member.edu_attainment || 'N/A',
                        relationship: member.relationship_to_sm || 'N/A'
                    }));
                    setFamilyMembers(formattedMembers);
        }
                } catch (err) {
                    console.error('Error fetching case:', err);
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            
            fetchCase();
        }, []);


    

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
    if (loading) {
    return <div className="p-4">Loading case data...</div>;
}

if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
}

if (!data) {
    return <div className="p-4">No case data found</div>;
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