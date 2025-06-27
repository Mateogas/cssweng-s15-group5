import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CaseCreate() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Form state
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
        problem_presented: '',
        observation_findings: '',
        recommendation: '',
        history_problem: '',
        evaluation: '',
        is_active: 'yes'
    });
    
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch('/api/cases/case-create', {
                method: 'POST',
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
            console.log('Case created successfully:', result);
            
            // Navigate back to the case listing page
            navigate('/');
            
        } catch (err) {
            console.error('Error creating case:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <main className='flex flex-col gap-8 p-8'>
            <button 
                className="flex items-center gap-5 px-4 py-2 font-bold-label w-fit"
                onClick={() => navigate('/')}
            >
                <img src="/arrow-left.svg" alt="arrow" className="w-8 h-8" />
                Back to Cases
            </button>
            
            <h1 className="header-main">Create New Case</h1>
            
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
                    </div>
                </section>
                
                <section className="flex flex-col gap-8">
                    <h2 className="header-sub">Case Information</h2>
                    
                    <div className="flex flex-col gap-5 w-full">
                        <label className="font-label" htmlFor="problem_presented">Problem Presented</label>
                        <textarea
                            id="problem_presented"
                            name="problem_presented"
                            value={formData.problem_presented}
                            onChange={handleChange}
                            className="text-input font-label"
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    
                    <div className="flex flex-col gap-5 w-full">
                        <label className="font-label" htmlFor="observation_findings">Observation Findings</label>
                        <textarea
                            id="observation_findings"
                            name="observation_findings"
                            value={formData.observation_findings}
                            onChange={handleChange}
                            className="text-input font-label"
                            rows="3"
                        ></textarea>
                    </div>
                    
                    <div className="flex flex-col gap-5 w-full">
                        <label className="font-label" htmlFor="history_problem">History of the Problem</label>
                        <textarea
                            id="history_problem"
                            name="history_problem"
                            value={formData.history_problem}
                            onChange={handleChange}
                            className="text-input font-label"
                            rows="3"
                        ></textarea>
                    </div>
                    
                    <div className="flex flex-col gap-5 w-full">
                        <label className="font-label" htmlFor="recommendation">Recommendation</label>
                        <textarea
                            id="recommendation"
                            name="recommendation"
                            value={formData.recommendation}
                            onChange={handleChange}
                            className="text-input font-label"
                            rows="3"
                        ></textarea>
                    </div>
                    
                    <div className="flex flex-col gap-5 w-full">
                        <label className="font-label" htmlFor="evaluation">Evaluation</label>
                        <textarea
                            id="evaluation"
                            name="evaluation"
                            value={formData.evaluation}
                            onChange={handleChange}
                            className="text-input font-label"
                            rows="3"
                        ></textarea>
                    </div>
                </section>
                
                <div className="flex justify-end gap-4 mt-8">
                    <button 
                        type="button" 
                        onClick={() => navigate('/')}
                        className="btn-outline-rounded font-bold-label"
                    >
                        Cancel
                    </button>
                    
                    <button 
                        type="submit" 
                        className="btn-blue font-bold-label drop-shadow-base"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Case'}
                    </button>
                </div>
            </form>
        </main>
    );
}

export default CaseCreate;