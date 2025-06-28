import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function CaseEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    
    // Form state - REMOVED case information fields as requested
    const [formData, setFormData] = useState({
        sm_number: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        sex: 'female',
        dob: '',
        pob: '',
        civil_status: 'Single',
        edu_attainment: '',
        religion: '',
        occupation: '',
        contact_no: '',
        present_address: '',
        is_active: 'yes'
    });

    // Fetch existing case data
    useEffect(() => {
    const fetchCase = async () => {
        try {
            setLoading(true);
            // CHANGED: Use the existing route to fetch data
            const response = await fetch(`/api/cases/${id}`);
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const caseData = await response.json();
            setOriginalData(caseData);
            
            // Format date for input field
            const formattedDate = caseData?.dob ? new Date(caseData.dob).toISOString().split('T')[0] : '';
            
            // Set form data with existing values - EXCLUDING case information fields
            setFormData({
                sm_number: caseData.sm_number || '',
                first_name: caseData.first_name || '',
                middle_name: caseData.middle_name || '',
                last_name: caseData.last_name || '',
                sex: caseData.sex || 'female',
                dob: formattedDate,
                pob: caseData.pob || '',
                civil_status: caseData.civil_status || 'Single',
                edu_attainment: caseData.edu_attainment || '',
                religion: caseData.religion || '',
                occupation: caseData.occupation || '',
                contact_no: caseData.contact_no || '',
                present_address: caseData.present_address || '',
                is_active: caseData.is_active || 'yes'
            });
            
        } catch (err) {
            console.error('Error fetching case:', err);
            setError('Failed to load case data');
        } finally {
            setLoading(false);
        }
    };
    
    if (id) {
        fetchCase();
    }
    }, [id]);
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        
        try {
            // Using /api/cases/edit/:id as you requested
            const response = await fetch(`/api/cases/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `API error: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('Case updated successfully:', result);
            
            // Navigate back to the case detail page
            navigate(`/cases/${id}`);
            
        } catch (err) {
            console.error('Error updating case:', err);
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};
    // Handle cancel - go back to case detail
    const handleCancel = () => {
        navigate(`/cases/${id}`);
    };
    
    if (loading) {
        return (
            <main className='flex flex-col gap-8 p-8'>
                <div className="text-center">Loading case data...</div>
            </main>
        );
    }

    if (!originalData) {
        return (
            <main className='flex flex-col gap-8 p-8'>
                <div className="text-center text-red-500">Case not found</div>
            </main>
        );
    }
    
    return (
        <main className='flex flex-col gap-8 p-8'>
            <button 
                className="flex items-center gap-5 px-4 py-2 font-bold-label w-fit"
                onClick={handleCancel}
            >
                <img src="/arrow-left.svg" alt="arrow" className="w-8 h-8" />
                Back to Case Details
            </button>
            
            <h1 className="header-main">Edit Case: {originalData.first_name} {originalData.last_name}</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error: {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <section className="flex flex-col gap-8">
                    <h2 className="header-sub">Basic Information</h2>
                    
                    <div className="flex justify-between gap-8">
                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="sm_number">SM Number</label>
                            <input
                                type="text"
                                id="sm_number"
                                name="sm_number"
                                value={formData.sm_number}
                                onChange={handleChange}
                                className="text-input font-label bg-gray-100"
                                disabled // SM number shouldn't be editable
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-between gap-8">
                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="text-input font-label"
                                required
                            />
                        </div>
                        
                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="middle_name">Middle Name</label>
                            <input
                                type="text"
                                id="middle_name"
                                name="middle_name"
                                value={formData.middle_name}
                                onChange={handleChange}
                                className="text-input font-label"
                            />
                        </div>
                        
                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="text-input font-label"
                                required
                            />
                        </div>
                    </div>
                </section>
                
                <section className="flex flex-col gap-8">
                    <h2 className="header-sub">Personal Information</h2>
                    
                    <div className="flex justify-between gap-8">
                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="sex">Sex</label>
                            <select
                                id="sex"
                                name="sex"
                                value={formData.sex}
                                onChange={handleChange}
                                className="text-input font-label"
                                required
                            >
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>
                        
                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="dob">Date of Birth</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className="text-input font-label"
                                required
                            />
                        </div>
                        
                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="civil_status">Civil Status</label>
                            <select
                                id="civil_status"
                                name="civil_status"
                                value={formData.civil_status}
                                onChange={handleChange}
                                className="text-input font-label"
                                required
                            >
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Widowed">Widowed</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Separated">Separated</option>
                            </select>
                        </div>
                        
                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="pob">Place of Birth</label>
                            <input
                                type="text"
                                id="pob"
                                name="pob"
                                value={formData.pob}
                                onChange={handleChange}
                                className="text-input font-label"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-between gap-8">
                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="religion">Religion</label>
                            <input
                                type="text"
                                id="religion"
                                name="religion"
                                value={formData.religion}
                                onChange={handleChange}
                                className="text-input font-label"
                            />
                        </div>
                        
                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="edu_attainment">Educational Attainment</label>
                            <input
                                type="text"
                                id="edu_attainment"
                                name="edu_attainment"
                                value={formData.edu_attainment}
                                onChange={handleChange}
                                className="text-input font-label"
                            />
                        </div>
                        
                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="occupation">Occupation</label>
                            <input
                                type="text"
                                id="occupation"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                className="text-input font-label"
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-between gap-8">
                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="contact_no">Contact Number</label>
                            <input
                                type="text"
                                id="contact_no"
                                name="contact_no"
                                value={formData.contact_no}
                                onChange={handleChange}
                                className="text-input font-label"
                            />
                        </div>
                        
                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="present_address">Present Address</label>
                            <textarea
                                id="present_address"
                                name="present_address"
                                value={formData.present_address}
                                onChange={handleChange}
                                className="text-input font-label"
                                rows="2"
                            ></textarea>
                        </div>

                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-label" htmlFor="is_active">Case Status</label>
                            <select
                                id="is_active"
                                name="is_active"
                                value={formData.is_active}
                                onChange={handleChange}
                                className="text-input font-label"
                            >
                                <option value="yes">Active</option>
                                <option value="no">Inactive</option>
                            </select>
                        </div>
                    </div>
                </section>
                
                <div className="flex justify-end gap-4 mt-8">
                    <button 
                        type="button" 
                        onClick={handleCancel}
                        className="btn-outline-rounded font-bold-label"
                        disabled={saving}
                    >
                        Cancel
                    </button>
                    
                    <button 
                        type="submit" 
                        className="btn-blue font-bold-label drop-shadow-base"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </main>
    );
}

export default CaseEdit;