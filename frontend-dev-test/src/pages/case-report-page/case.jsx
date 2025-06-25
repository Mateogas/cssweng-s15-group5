import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Case() {
// these are basically variables this is how u use them in react
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editMode, setEditMode] = useState({})
  const [editData, setEditData] = useState({})
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
      setData(caseData)
    } catch (err) {
      console.error('Error fetching case data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // allows us to edit a specific field of a case
  const handleEdit = (caseId, field) => {
    // Initialize edit data if not already done
    if (!editData[caseId]) {
      const caseToEdit = data.find(item => item._id === caseId)
      setEditData({
        ...editData,
        [caseId]: { ...caseToEdit }
      })
    }
    
    // Toggle edit mode for the specific field
    setEditMode({
      ...editMode,
      [caseId]: {
        ...editMode[caseId],
        [field]: true
      }
    })
  }

  // saves the changes made in the edit mode (not to the backend yet)
  const handleChange = (caseId, field, value) => {
    setEditData({
      ...editData,
      [caseId]: {
        ...editData[caseId],
        [field]: value
      }
    })
  }

  /**
   * saves the changes made in the edit mode to the backend
   * 
   * POST /api/cases/:caseId/:field
   *    caseId is the ID of the case being edited
   *    field is the specific field being edited (problem_presented, observation_findings, etc.)
   * 
   * */
  const handleSave = async (caseId, field) => {
    setLoading(true)
    try {
      const fieldValue = editData[caseId][field]
      
      // Send update to backend
      const response = await fetch(`/api/cases/${caseId}/${field}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sm_number: editData[caseId].sm_number,
          [field]: fieldValue
        })
      })

      if (!response.ok) {
        throw new Error(`Update failed: ${response.status}`)
      }

      // Update the data state with the edited value
      setData(data.map(item => 
        item._id === caseId ? { ...item, [field]: fieldValue } : item
      ))
      
      // Exit edit mode
      setEditMode({
        ...editMode,
        [caseId]: {
          ...editMode[caseId],
          [field]: false
        }
      })
    } catch (err) {
      console.error('Error updating case:', err)
      setError(err.message)
    } finally {
      setLoading(false)//just sets loading variable as false since we are done getting
    }
  }

  const handleCancel = (caseId, field) => {
    // Exit edit mode without saving
    setEditMode({
      ...editMode,
      [caseId]: {
        ...editMode[caseId],
        [field]: false
      }
    })
    
    // Revert any changes
    if (editData[caseId]) {
      const originalCase = data.find(item => item._id === caseId)
      setEditData({
        ...editData,
        [caseId]: { ...originalCase }
      })
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
      
      <div className="results-area">
        {loading && <p>Loading data...</p>}
        {error && <p className="error">Error: {error}</p>}
        {data && (
          <div className="data-display">
            <h3>Case Data Retrieved:</h3>
            {data.map((caseItem) => {
              const caseId = caseItem._id
              const isEditing = editMode[caseId] || {}
              const editedCase = editData[caseId] || caseItem
              
              return (
                <div 
                  key={caseId}
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ marginTop: '0' }}>Personal Details</h4>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <p>
                        <strong>Place of Birth:</strong> 
                        {isEditing['personal'] ? (
                          <input 
                            type="text" 
                            value={editedCase.pob || ''} 
                            onChange={(e) => handleChange(caseId, 'pob', e.target.value)}
                          />
                        ) : (
                          <span> {caseItem.pob}</span>
                        )}
                      </p>
                      <p>
                        <strong>Religion:</strong> 
                        {isEditing['personal'] ? (
                          <input 
                            type="text" 
                            value={editedCase.religion || ''} 
                            onChange={(e) => handleChange(caseId, 'religion', e.target.value)}
                          />
                        ) : (
                          <span> {caseItem.religion}</span>
                        )}
                      </p>
                      <p>
                        <strong>Education:</strong> 
                        {isEditing['personal'] ? (
                          <input 
                            type="text" 
                            value={editedCase.edu_attainment || ''} 
                            onChange={(e) => handleChange(caseId, 'edu_attainment', e.target.value)}
                          />
                        ) : (
                          <span> {caseItem.edu_attainment}</span>
                        )}
                      </p>
                      <p>
                        <strong>Occupation:</strong> 
                        {isEditing['personal'] ? (
                          <input 
                            type="text" 
                            value={editedCase.occupation || ''} 
                            onChange={(e) => handleChange(caseId, 'occupation', e.target.value)}
                          />
                        ) : (
                          <span> {caseItem.occupation}</span>
                        )}
                      </p>
                      <p>
                        <strong>Contact:</strong> 
                        {isEditing['personal'] ? (
                          <input 
                            type="text" 
                            value={editedCase.contact_no || ''} 
                            onChange={(e) => handleChange(caseId, 'contact_no', e.target.value)}
                          />
                        ) : (
                          <span> {caseItem.contact_no}</span>
                        )}
                      </p>
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
                    
                    <p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>Problem:</strong>
                        {isEditing['problem_presented'] ? (
                          <div>
                            <button onClick={() => handleSave(caseId, 'problem_presented')}>Save</button>
                            <button onClick={() => handleCancel(caseId, 'problem_presented')}>Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => handleEdit(caseId, 'problem_presented')}>Edit</button>
                        )}
                      </div>
                      {isEditing['problem_presented'] ? (
                        <textarea 
                          value={editedCase.problem_presented || ''} 
                          onChange={(e) => handleChange(caseId, 'problem_presented', e.target.value)}
                          style={{ width: '100%', minHeight: '60px', marginTop: '8px' }}
                        />
                      ) : (
                        <div style={{ marginTop: '8px' }}>{caseItem.problem_presented}</div>
                      )}
                    </p>
                    
                    <p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>Observations:</strong>
                        {isEditing['observation_findings'] ? (
                          <div>
                            <button onClick={() => handleSave(caseId, 'observation_findings')}>Save</button>
                            <button onClick={() => handleCancel(caseId, 'observation_findings')}>Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => handleEdit(caseId, 'observation_findings')}>Edit</button>
                        )}
                      </div>
                      {isEditing['observation_findings'] ? (
                        <textarea 
                          value={editedCase.observation_findings || ''} 
                          onChange={(e) => handleChange(caseId, 'observation_findings', e.target.value)}
                          style={{ width: '100%', minHeight: '60px', marginTop: '8px' }}
                        />
                      ) : (
                        <div style={{ marginTop: '8px' }}>{caseItem.observation_findings}</div>
                      )}
                    </p>
                    
                    <p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>Recommendation:</strong>
                        {isEditing['recommendation'] ? (
                          <div>
                            <button onClick={() => handleSave(caseId, 'recommendation')}>Save</button>
                            <button onClick={() => handleCancel(caseId, 'recommendation')}>Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => handleEdit(caseId, 'recommendation')}>Edit</button>
                        )}
                      </div>
                      {isEditing['recommendation'] ? (
                        <textarea 
                          value={editedCase.recommendation || ''} 
                          onChange={(e) => handleChange(caseId, 'recommendation', e.target.value)}
                          style={{ width: '100%', minHeight: '60px', marginTop: '8px' }}
                        />
                      ) : (
                        <div style={{ marginTop: '8px' }}>{caseItem.recommendation}</div>
                      )}
                    </p>
                  </div>

                  {/* History section */}
                  <div style={{ 
                    backgroundColor: 'white',
                    padding: '12px',
                    borderRadius: '6px' 
                  }}>
                    <h4 style={{ marginTop: '0' }}>History & Evaluation</h4>
                    
                    <p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>History:</strong>
                        {isEditing['history_problem'] ? (
                          <div>
                            <button onClick={() => handleSave(caseId, 'history_problem')}>Save</button>
                            <button onClick={() => handleCancel(caseId, 'history_problem')}>Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => handleEdit(caseId, 'history_problem')}>Edit</button>
                        )}
                      </div>
                      {isEditing['history_problem'] ? (
                        <textarea 
                          value={editedCase.history_problem || ''} 
                          onChange={(e) => handleChange(caseId, 'history_problem', e.target.value)}
                          style={{ width: '100%', minHeight: '60px', marginTop: '8px' }}
                        />
                      ) : (
                        <div style={{ marginTop: '8px' }}>{caseItem.history_problem}</div>
                      )}
                    </p>
                    
                    <p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>Evaluation:</strong>
                        {isEditing['evaluation'] ? (
                          <div>
                            <button onClick={() => handleSave(caseId, 'evaluation')}>Save</button>
                            <button onClick={() => handleCancel(caseId, 'evaluation')}>Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => handleEdit(caseId, 'evaluation')}>Edit</button>
                        )}
                      </div>
                      {isEditing['evaluation'] ? (
                        <textarea 
                          value={editedCase.evaluation || ''} 
                          onChange={(e) => handleChange(caseId, 'evaluation', e.target.value)}
                          style={{ width: '100%', minHeight: '60px', marginTop: '8px' }}
                        />
                      ) : (
                        <div style={{ marginTop: '8px' }}>{caseItem.evaluation}</div>
                      )}
                    </p>
                    <p>
                      <strong>Status:</strong> 
                      <span style={{color: caseItem.is_active === "no" ? "red" : "green"}}>
                        {caseItem.is_active === "no" ? "Inactive" : "Active"}
                      </span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Case