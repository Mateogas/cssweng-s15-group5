import React from "react"

const FamilyCard = ({ member, index, selectedFamily, setSelectedFamily,
    editingFamilyValue, setEditingFamilyValue, familyMembers, setFamilyMembers,
    // handleDeleteFamilyMember, setFamilyToDelete,
    handleDeleteFamilyMember,
    setShowModal, setModalTitle, setModalBody, setModalImageCenter,
    setModalConfirm, setModalOnConfirm, editable , className = ""
}) => {

    const isEditing = selectedFamily === index

    const handleInputChange = (field, value) => {
        setEditingFamilyValue({ ...editingFamilyValue, [field]: value })
    }

    const handleSave = () => {
        const updated = [...familyMembers]
        updated[index] = { ...editingFamilyValue }
        setFamilyMembers(updated)
        setSelectedFamily(null)
    }

    const handleDelete = () => {
        const updated = familyMembers.filter((_, i) => i !== index)
        setFamilyMembers(updated)
        setSelectedFamily(null)
    }

    return (
        <div className={`flex flex-col gap-5 min-w-[45rem] drop-shadow-card px-[2rem] py-[3rem] rounded-xl outline-gray ${className}`}>
            <div className="flex justify-between items-center gap-4">
                {isEditing ? (
                    <h3 className="header-sub">Editing Member</h3>
                ) : (
                    <h3 className="header-sub">{member.last || '-'}, {member.first || '-'} {member.middle || '-'}</h3>
                )}

                { editable && (
                    <button className={isEditing ? "icon-button-setup x-button" : 'icon-button-setup dots-button'} onClick={() => {
                        if (isEditing) {
                            setSelectedFamily(null)
                        } else {
                            setEditingFamilyValue({ ...member })
                            setSelectedFamily(index)
                        }
                    }}>
                    </button>
                )}
            </div>

            <div className="grid grid-cols-[max-content_1fr] gap-5 text-sm font-label">
                {[
                    { label: 'First Name', key: 'first', type: 'text' },
                    { label: 'Middle Name', key: 'middle', type: 'text' },
                    { label: 'Last Name', key: 'last', type: 'text' },
                    { label: 'Age', key: 'age', type: 'number' },
                    { label: 'Income', key: 'income', type: 'text' },
                    { label: 'Civil Status', key: 'civilStatus', type: 'text' },
                    { label: 'Occupation', key: 'occupation', type: 'text' },
                    { label: 'Educational Attainment', key: 'education', type: 'text' },
                    { label: 'Relationship to Client', key: 'relationship', type: 'text' },
                ].map(({ label, key, type }) => (
                    <React.Fragment key={key}>
                        <div className="font-bold-label">{label}</div>
                        {isEditing ? (
                            <input
                                type={type}
                                className="text-input"
                                value={editingFamilyValue[key] || ''}
                                onChange={(e) => handleInputChange(key, e.target.value)}
                            />
                        ) : (
                            `: ${member[key] || '-'}`
                        )}
                    </React.Fragment>
                ))}

                <div className="font-bold-label">Deceased</div>
                <input
                    type="checkbox"
                    checked={isEditing ? (editingFamilyValue.deceased || false) : (member.deceased || false)}
                    disabled={!isEditing}
                    onChange={(e) => {
                        if (isEditing) {
                            handleInputChange('deceased', e.target.checked);
                        }
                    }} />

            </div>

            {isEditing && (
                <div className='flex justify-between items-center'>
                    <button className='mt-5 icon-button-setup trash-button'
                        onClick={() => {
                            const idToDelete = member.id;

                            setModalTitle("Delete Family Member");
                            setModalBody("Are you sure you want to delete this family member?");
                            setModalImageCenter(<div className='warning-icon mx-auto'></div>);
                            setModalConfirm(true);

                            setModalOnConfirm(() => () => {
                                handleDeleteFamilyMember(idToDelete);
                            });
        
                            setShowModal(true);
                        }}>
                    </button>
                    <button
                        className='btn-transparent-rounded'
                        onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    )
}

export default FamilyCard
