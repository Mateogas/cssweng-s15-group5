import React from "react"

const FamilyCard = ({
    member,
    index,
    selectedFamily,
    setSelectedFamily,
    editingFamilyValue,
    setEditingFamilyValue,
    familyMembers,
    setFamilyMembers,
    handleDeleteFamilyMember,
    setShowModal,
    setModalTitle,
    setModalBody,
    setModalImageCenter,
    setModalConfirm,
    setModalOnConfirm
}) => {

    const isEditing = selectedFamily === index

    const handleInputChange = (field, value) => {
        setEditingFamilyValue({ ...editingFamilyValue, [field]: value })
    }

    const handleSave = () => {
        const requiredFields = [
            { key: 'first', label: 'First Name' },
            { key: 'middle', label: 'Middle Name' },
            { key: 'last', label: 'Last Name' },
            { key: 'income', label: 'Income' },
            { key: 'occupation', label: 'Occupation' },
            { key: 'education', label: 'Educational Attainment' },
            { key: 'relationship', label: 'Relationship to Client' },
        ];

        function formatListWithAnd(arr) {
            if (arr.length === 0) return '';
            if (arr.length === 1) return arr[0];
            if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
            const last = arr[arr.length - 1];
            return `${arr.slice(0, -1).join(', ')}, and ${last}`;
        }

        const missing = [];

        requiredFields.forEach(field => {
            if (!editingFamilyValue[field.key] || editingFamilyValue[field.key].toString().trim() === "") {
                missing.push(field.label);
            }
        });

        if (editingFamilyValue.age !== undefined) {
            const ageValue = parseInt(editingFamilyValue.age, 10);
            if (isNaN(ageValue)) {
                missing.push('Age must be a number');
            } else if (ageValue < 0) {
                missing.push('Age cannot be negative');
            }
        }

        if (missing.length > 0) {
            setModalTitle('Invalid Fields');
            setModalBody(`The following fields are missing or invalid: ${formatListWithAnd(missing)}`);
            setModalImageCenter(<div className='warning-icon mx-auto'></div>);
            setModalConfirm(false);
            setShowModal(true);
            return;
        }

        const updated = [...familyMembers];
        updated[index] = { ...editingFamilyValue };
        setFamilyMembers(updated);
        setSelectedFamily(null);

        setModalTitle('Success!');
        setModalBody('Family member was successfully updated.');
        setModalImageCenter(<div className='success-icon mx-auto'></div>);
        setModalConfirm(false);
        setShowModal(true);
    };


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
                    <h3 className="header-sub">
                        {member.last || '-'}, {member.first || '-'} {member.middle || '-'}
                    </h3>
                )}

                <button
                    className={isEditing ? "icon-button-setup x-button" : 'icon-button-setup dots-button'}
                    onClick={() => {
                        if (isEditing) {
                            setSelectedFamily(null)
                        } else {
                            setEditingFamilyValue({ ...member })
                            setSelectedFamily(index)
                        }
                    }}
                ></button>
            </div>

            <div className="grid grid-cols-[max-content_1fr] gap-5 items-center text-sm font-label">
                {[
                    { label: 'First Name', key: 'first', type: 'text', required: true },
                    { label: 'Middle Name', key: 'middle', type: 'text', required: true },
                    { label: 'Last Name', key: 'last', type: 'text', required: true },
                    { label: 'Age', key: 'age', type: 'number' },
                    { label: 'Income', key: 'income', type: 'text', required: true },
                    { label: 'Civil Status', key: 'civilStatus', type: 'civil-select' },
                    { label: 'Occupation', key: 'occupation', type: 'text', required: true },
                    { label: 'Educational Attainment', key: 'education', type: 'text', required: true },
                    { label: 'Relationship to Client', key: 'relationship', type: 'text', required: true },
                    { label: 'Status', key: 'status', type: 'select' },
                ].map(({ label, key, type, required }) => (
                    <React.Fragment key={key}>
                        <div className="font-bold-label">{required && isEditing && <span className="text-red-500">*</span>} {label}</div>
                        {isEditing ? (
                            type === 'select' ? (
                                <select
                                    className="text-input"
                                    value={editingFamilyValue[key] || ''}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="living">Living</option>
                                    <option value="deceased">Deceased</option>
                                </select>
                            ) : type === 'civil-select' ? (
                                <select
                                    className="text-input"
                                    value={editingFamilyValue[key] || ''}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                >
                                    <option value="">Select Civil Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Separated">Separated</option>
                                    <option value="Widowed">Widowed</option>
                                </select>
                            ) : (
                                <input
                                    type={type}
                                    placeholder={label}
                                    className="text-input"
                                    value={editingFamilyValue[key] || ''}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                />
                            )
                        ) : (
                            key === 'status' || key === 'civilStatus'
                                ? `: ${member[key] ? member[key][0].toUpperCase() + member[key].slice(1) : '-'}`
                                : `: ${member[key] || '-'}`
                        )}
                    </React.Fragment>
                ))}
            </div>

            {isEditing && (
                <div className='flex justify-between items-center'>
                    <button
                        className='mt-5 icon-button-setup trash-button'
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
                        }}
                    ></button>
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
