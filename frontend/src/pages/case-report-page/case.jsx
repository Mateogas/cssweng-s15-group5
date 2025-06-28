import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Case() {
// these are basically variables this is how u use them in react
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()


  //this is a function that fetches data from our backend mongodb
  const fetchCaseData = async () => {
    setLoading(true)//these instatiates them
    setError(null)

    //basically we fetch the api case then save the res as response
    try {
      const response = await fetch('/api/cases')
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      //here we get the json file containing our data
      const caseData = await response.json()
      setData(caseData)//instantiates caseData into data variable
    } catch (err) {
      console.error('Error fetching case data:', err)
      setError(err.message)//sets variable error with the eror message we got
    } finally {
      setLoading(false)//just sets loading variable as false since we are done getting
    }
  }

  return (
    <div className="case-container">
      <h2>Case Testing Page</h2>

      //use the function
      <button onClick={fetchCaseData}>
        Fetch Case Data from Backend
      </button>
      
      <button onClick={() => navigate('/')}>
        Back to Home
      </button>
      //here we just use the variables we got from fetching and use normal html js and ccs shits
      <div className="results-area">
        {loading && <p>Loading data...</p>}
        {error && <p className="error">Error: {error}</p>}
            {data && (
            <div className="data-display">
                <h3>Case Data Retrieved:</h3>
                {data.map((caseItem) => (
                <div 
                    key={caseItem._id}
                    style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '20px',
                    margin: '20px 0',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    backgroundColor: '#f9f9f9'
                    }}
                >
                    {/* Header section */}
                    <div style={{ 
                    borderBottom: '2px solid #0066cc',
                    marginBottom: '15px',
                    paddingBottom: '10px'
                    }}>
                    <h3 style={{ color: '#0066cc' }}>
                        {caseItem.first_name} {caseItem.middle_name} {caseItem.last_name}
                    </h3>
                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '15px' 
                    }}>
                        <span><strong>ID:</strong> {caseItem.sm_number}</span>
                        <span><strong>Sex:</strong> {caseItem.sex}</span>
                        <span><strong>DOB:</strong> {new Date(caseItem.dob).toLocaleDateString()}</span>
                        <span><strong>Status:</strong> {caseItem.civil_status}</span>
                    </div>
                    </div>

                    {/* Personal details section */}
                    <div style={{ 
                    backgroundColor: 'white',
                    padding: '12px',
                    borderRadius: '6px',
                    marginBottom: '15px'
                    }}>
                    <h4 style={{ marginTop: '0' }}>Personal Details</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <p><strong>Place of Birth:</strong> {caseItem.pob}</p>
                        <p><strong>Religion:</strong> {caseItem.religion}</p>
                        <p><strong>Education:</strong> {caseItem.edu_attainment}</p>
                        <p><strong>Occupation:</strong> {caseItem.occupation}</p>
                        <p><strong>Contact:</strong> {caseItem.contact_no}</p>
                    </div>
                    </div>

                    {/* Case details section */}
                    <div style={{ 
                    backgroundColor: 'white',
                    padding: '12px',
                    borderRadius: '6px',
                    marginBottom: '15px'
                    }}>
                    <h4 style={{ marginTop: '0' }}>Case Details</h4>
                    <p><strong>Problem:</strong> {caseItem.problem_presented}</p>
                    <p><strong>Observations:</strong> {caseItem.observation_findings}</p>
                    <p><strong>Recommendation:</strong> {caseItem.recommendation}</p>
                    </div>

                    {/* History section */}
                    <div style={{ 
                    backgroundColor: 'white',
                    padding: '12px',
                    borderRadius: '6px' 
                    }}>
                    <h4 style={{ marginTop: '0' }}>History & Evaluation</h4>
                    <p><strong>History:</strong> {caseItem.history_problem}</p>
                    <p><strong>Evaluation:</strong> {caseItem.evaluation}</p>
                    <p><strong>Status:</strong> {caseItem.is_active === "no" ? 
                        <span style={{color: "red"}}>Inactive</span> : 
                        <span style={{color: "green"}}>Active</span>}
                    </p>
                    </div>
                </div>
                ))}
            </div>
            )}
      </div>
    </div>
  )
}

export default Case