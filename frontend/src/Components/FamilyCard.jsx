import React from "react"

import { updateFamilyMember, addFamilyMember, deleteFamilyMember } from '../fetch-connections/case-connection'; 

/**
 *   Formats the currency
 * 
 *   @param {*} value : Value to be formatted (assumed Number)
 *   @returns : The formatted string
 * 
 *   [NOTE]: Applied this in income display; changed the income input to of type number
 */
function currency_Formatter(value) {
    if (typeof value !== "number") return "₱0.00";
    return value.toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

const FamilyCard = ({ member, index, selectedFamily, setSelectedFamily,
    editingFamilyValue, setEditingFamilyValue, familyMembers, setFamilyMembers,
    // handleDeleteFamilyMember, setFamilyToDelete,
    handleDeleteFamilyMember,
    setShowModal, setModalTitle, setModalBody, setModalImageCenter,
    setModalConfirm, setModalOnConfirm, data
}) => {

    const isEditing = selectedFamily === index

    const handleInputChange = (field, value) => {
        setEditingFamilyValue({ ...editingFamilyValue, [field]: value })
    }

    const handleSave = async() => {
        var updatedMember
        if (!familyMembers[selectedFamily].id) { 
            updatedMember = await addFamilyMember(editingFamilyValue);
        }
        else {
            updatedMember = await updateFamilyMember(familyMembers[selectedFamily].id, editingFamilyValue);
        }

        if (typeof updatedMember === 'string') {
            const updated = familyMembers.filter((_, i) => i !== index);
            setFamilyMembers(updated);
            setSelectedFamily(null);
        } else {
            const updated = [...familyMembers]
            updated[selectedFamily] = updatedMember

            setFamilyMembers(updated)
            setSelectedFamily(null)
        }
    }

    const handleDelete = () => {
        const updated = familyMembers.filter((_, i) => i !== index)
        setFamilyMembers(updated)
        setSelectedFamily(null)
    }

    return (
        <div className="flex flex-col gap-5 min-w-[45rem] drop-shadow-card px-[2rem] py-[3rem] rounded-xl outline-gray">
            <div className="flex justify-between items-center gap-4">
                {isEditing ? (
                    <h3 className="header-sub">Editing Member</h3>
                ) : (
                    <h3 className="header-sub">{member.last || '-'}, {member.first || '-'} {member.middle}</h3>
                )}

                <button className={isEditing ? "icon-button-setup x-button" : 'icon-button-setup dots-button'} onClick={() => {
                    if (isEditing) {
                        if (member.unsaved) {
                            const updated = familyMembers.filter((_, i) => i !== index);
                            setFamilyMembers(updated);
                        }
                        setSelectedFamily(null)
                    } else {
                        setEditingFamilyValue({ ...member })
                        setSelectedFamily(index)
                    }
                }}>
                </button>
            </div>

            <div className="grid grid-cols-[max-content_1fr] gap-5 text-sm font-label">
                {[
                    { label: 'First Name', key: 'first', type: 'text' },
                    { label: 'Middle Name', key: 'middle', type: 'text' },
                    { label: 'Last Name', key: 'last', type: 'text' },
                    { label: 'Age', key: 'age', type: 'number' },
                    { label: 'Income', key: 'income', type: 'number' },
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
                            `: ${
                                key === 'income'
                                    ? currency_Formatter(member[key])
                                    : member[key] || '-'
                            }`
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

                            setModalOnConfirm(() => async () => {
                                handleDeleteFamilyMember(idToDelete);

                                const updated = await deleteFamilyMember(familyMembers[selectedFamily].id)
                                setFamilyMembers(updated)
                                setSelectedFamily(null)
                            });
        
                            setShowModal(true);
                        }}>
                    </button>
                    <button
                        className='btn-transparent-rounded'
                        onClick={async() => { 
                            await handleSave() 
                        }}>
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    )
}

export default FamilyCard
