import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CaseListing() {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCases = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/cases/allcases');
                
                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }
                
                const casesData = await response.json();
                setCases(casesData);
            } catch (err) {
                console.error('Error fetching cases:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchCases();
    }, []);

    const handleViewCase = (caseId) => {
        navigate(`/cases/${caseId}`);
    };

    const handleEditCase = (e, caseId) => {
         e.stopPropagation();
        navigate(`/case/edit/${caseId}`); 
        
    };

    if (loading) {
        return <div className="p-4">Loading cases...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    if (!cases || cases.length === 0) {
        return <div className="p-4">No cases found</div>;
    }

    return (
        <main className='flex flex-col gap-8 p-8'>
            <header className='flex justify-between items-center'>
                <h1 className="header-main">Case Directory</h1>
                <button className="btn-blue font-bold-label drop-shadow-base"
                onClick = {() => navigate('/case-create')}>Create New Case</button>
            </header>

            <section className='flex flex-col gap-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {cases.map((caseItem) => (
                        <div key={caseItem.id} 
                             className='border rounded-lg p-6 shadow-md hover:shadow-lg cursor-pointer relative'
                             onClick={() => handleViewCase(caseItem.id)}>
                            <h2 className='text-xl font-bold mb-2'>{caseItem.name}</h2>
                            {caseItem.sm_number && (
                                <p className='text-gray-600'>ID: {caseItem.sm_number}</p>
                            )}
                            <p className='mt-4 text-blue-600 mb-4'>Click to view details</p>
                            
                            {/* Edit Button */}
                            <div className='flex gap-2 mt-4'>
                                <button
                                    onClick={(e) => handleEditCase(e, caseItem.id)}
                                    className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-bold-label'
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default CaseListing;