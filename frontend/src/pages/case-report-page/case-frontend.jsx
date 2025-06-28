import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CaseFrontend() {
    const [data, setData] = useState(null)
    const [familyMembers, setFamilyMembers] = useState([]);

    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [civilStatus, setCivilStatus] = useState('');
    const [education, setEducation] = useState('');
    const [sex, setSex] = useState('');
    const [pob, setPob] = useState('');
    const [religion, setReligion] = useState('');
    const [occupation, setOccupation] = useState('');
    const [presentAddress, setPresentAddress] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [relationship, setRelationship] = useState('');

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // This is a function that fetches data from our backend mongodb
    const fetchCaseData = async () => {
        setLoading(true)
        setError(null)

        // Fetch the api case then save the res as response
        try {
            const response = await fetch('/api/cases')
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`)
            }

            const caseData = await response.json()
            setData(caseData)
        } catch (err) {
            console.error('Error fetching case data:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

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

    useEffect(() => {
        fetchCaseData();
    }, []);

    useEffect(() => {
        if (data) {
            setDob(data.dob || '');
            setAge(calculateAge(data.dob));
            setCivilStatus(data.civil_status || '');
            setEducation(data.edu_attainment || '');
            setSex(data.sex || '');
            setPob(data.pob || '');
            setReligion(data.religion || '');
            setOccupation(data.occupation || '');
            setPresentAddress(data.present_address || '');
            setContactNo(data.contact_no || '');
            setRelationship(data.relationship_to_client || '');

            fetchFamilyMembers();
        }
    }, [data]);

    useEffect(() => {
        setAge(calculateAge(dob));
    }, [dob]);

    // ====== START :: FAMILY COMPOSITION ======= //

    const fetchFamilyMembers = async () => {
        try {
            const response = await fetch(`/api/cases/get-family-compositon/${data._id}`)
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`)
            }

            const familyMembers = await response.json()
            setFamilyMembers(familyMembers)
        } catch (err) {
            console.error('Error fetching family members:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

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

    const updateFamilyMember = async (famID, updatedData) => {
        try {
            const response = await fetch(`/api/cases/edit-family-composition/${data._id}/${famID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update family member');
            }

            return await response.json(); 
        } catch (error) {
            console.error('Error updating family member:', error);
            throw error;
        }
    };

    const deleteFamilyMember = async(famID) => {
        try {
            const response = await fetch(`/api/cases/delete-family-member/${data._id}/${famID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete family member');
            }

            return await response.json(); 
        } catch (error) {
            console.error('Error deleting family member:', error);
            throw error;
        }
    }

    const addFamilyMember = async(updatedData) => {
        try {
            const response = await fetch(`/api/cases/add-family-member/${data._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update family member');
            }

            return await response.json(); 
        } catch (error) {
            console.error('Error adding family member:', error);
            throw error;
        }
    }

    /**
     *   Formats the currency
     * 
     *   @param {*} value : Value to be formatted (assumed Number)
     *   @returns : The formatted string
     * 
     *   [NOTE]: Applied this in income display; changed the income input to of type number
     */
    function currency_Formatter(value) {
        if (typeof value !== "number") return "PHP0.00";
        return value.toLocaleString("en-PH", {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // ====== END :: FAMILY COMPOSITION ======= //

    if (data) {
        return (
            <main className='flex flex-col gap-20'>
                <button className="flex items-center gap-5 px-4 py-2 font-bold-label">
                    <img src="/arrow-left.svg" alt="arrow" className="w-8 h-8" />
                    Back
                </button>

                <header className='flex flex-col gap-5'>
                    <div className='flex justify-between'>
                        <h1 className="header-main">{data.last_name}, {data.first_name} {data.middle_name}</h1>

                        <button className="btn-blue font-bold-label drop-shadow-base">Download</button>
                    </div>

                    <h2 className='header-sub'>CH Number: {data.sm_number}</h2>

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
                                            <input type="number"
                                                className="text-input"
                                                value={editingFamilyValue.income || ''}
                                                onChange={(e) =>
                                                    setEditingFamilyValue({ ...editingFamilyValue, income: e.target.value })
                                                }
                                            />
                                        ) : (
                                            `: ${currency_Formatter(member.income)}`
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
                                                onClick={async () => {
                                                    const updated = await deleteFamilyMember(familyMembers[selectedFamily].id)

                                                    setFamilyMembers(updated)
                                                    setSelectedFamily(null)
                                                }}>
                                                <img src="/trash.svg" alt="trash" className="w-8 h-8" />
                                            </button>

                                            <button className='font-bold-label'
                                                style={{ color: "var(--color-primary)" }}
                                                onClick={async () => {
                                                    console.log(familyMembers[selectedFamily].id);
                                                    var updatedMember
                                                    if (!familyMembers[selectedFamily].id) 
                                                        updatedMember = await addFamilyMember(editingFamilyValue);
                                                    else 
                                                        updatedMember = await updateFamilyMember(familyMembers[selectedFamily].id, editingFamilyValue);

                                                    const updated = [...familyMembers]
                                                    updated[selectedFamily] = updatedMember

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
    } else {
        return (
            <div>
                No Data Yet.
            </div>
        )
    }
}

export default CaseFrontend