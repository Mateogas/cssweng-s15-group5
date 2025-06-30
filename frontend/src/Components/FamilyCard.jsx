import React from "react"

const FamilyCard = ({ member, index, selectedFamily, setSelectedFamily,
    editingFamilyValue, setEditingFamilyValue, familyMembers, setFamilyMembers }) => {

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
        <div className="flex flex-col gap-5 w-[40rem] drop-shadow-card px-[2rem] py-[3rem] rounded-xl outline-gray">
            <div className="flex justify-between items-center gap-4">
                {isEditing ? (
                    <input
                        type="text"
                        value={editingFamilyValue.name || ''}
                        className="text-input font-bold-label text-xl"
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                ) : (
                    <h3 className="header-sub">{member.name || '-'}</h3>
                )}

                <button
                    onClick={() => {
                        if (isEditing) {
                            setSelectedFamily(null)
                        } else {
                            setEditingFamilyValue({ ...member })
                            setSelectedFamily(index)
                        }
                    }}
                >
                    <img src="/dots.svg" alt="dots" className="w-8 h-8" />
                </button>
            </div>

            <div className="grid grid-cols-[max-content_1fr] gap-5 text-sm font-label">
                {[
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
            </div>

            {isEditing && (
                <div className='flex justify-between items-center'>
                    <button className='mt-5' onClick={handleDelete}>
                        <img src="/trash.svg" alt="trash" className="w-8 h-8" />
                    </button>
                    <button
                        className='font-bold-label'
                        style={{ color: "var(--color-primary)" }}
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    )
}

export default FamilyCard
