import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WorkerProfile() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "Hephzi-Bah",
        is_active: "yes",
        sdw_id: 12345678,

        super_id: 23456789,
        spu_id: "CEB",
    });

    const [drafts, setDrafts] = useState({
        username: data.username || "",
        spu_id: data.spu_id || "",
        super_id: data.super_id || "",
        sdw_id: data.sdw_id || "",
    });


    const resetFields = () => {
        setDrafts({
            username: data.username || "",
            spu_id: data.spu_id || "",
            super_id: data.spu_id || "",

            sdw_id: data.sdw_id || "",
        });
        setEditingField(null);
    };

    const [editingField, setEditingField] = useState(null);

    const [projectLocation, setProjectLocation] = useState([
        {
            name: "Manila",
            projectCode: "MNL",
        },
        {
            name: "Cebu",
            projectCode: "CEB",
        },
        {
            name: "Davao",
            projectCode: "DVO",
        },
        {
            name: "Baguio",
            projectCode: "BAG",
        },
        {
            name: "Iloilo",
            projectCode: "ILO",
        },
        {
            name: "Zamboanga",
            projectCode: "ZAM",
        }
    ]);

    const [socialDevelopmentWorkers, setSocialDevelopmentWorkers] = useState([
        { id: 12345678, username: "juan delacruz", spu_id: "MNL" },
        { id: 23456789, username: "maria santos", spu_id: "CEB" },
        { id: 34567890, username: "pedro ramos", spu_id: "DVO" },
        { id: 45678901, username: "ana reyes", spu_id: "BAG" },
        { id: 56789012, username: "carlos morales", spu_id: "ILO" },
        { id: 67890123, username: "lucia rodriguez", spu_id: "ZAM" }
    ]);

    const [activityList, setActivityList] = useState([
        {
            "spu": "FDQ",
            "staff_responsible": "Radny Asis Intino",
            "ch_id": "12356473",
            "first_name": "Gabrielle Madison",
            "middle_name": "Francisco",
            "gender": "Female",
            "birth_date": "06/04/2005",
            "age": 20,
            "creation_date": "05/26/2025"
        },
        {
            "spu": "FDQ",
            "staff_responsible": "Radny Asis Intino",
            "ch_id": "12356473",
            "first_name": "Gabrielle Madison",
            "middle_name": "Francisco",
            "gender": "Female",
            "birth_date": "06/04/2005",
            "age": 20,
            "creation_date": "05/26/2025"
        },
        {
            "spu": "FDQ",
            "staff_responsible": "Radny Asis Intino",
            "ch_id": "12356473",
            "first_name": "Gabrielle Madison",
            "middle_name": "Francisco",
            "gender": "Female",
            "birth_date": "06/04/2005",
            "age": 20,
            "creation_date": "05/26/2025"
        },
        {
            "spu": "FDQ",
            "staff_responsible": "Radny Asis Intino",
            "ch_id": "12356473",
            "first_name": "Gabrielle Madison",
            "middle_name": "Francisco",
            "gender": "Female",
            "birth_date": "06/04/2005",
            "age": 20,
            "creation_date": "05/26/2025"
        },
        {
            "spu": "FDQ",
            "staff_responsible": "Radny Asis Intino",
            "ch_id": "12356473",
            "first_name": "Gabrielle Madison",
            "middle_name": "Francisco",
            "gender": "Female",
            "birth_date": "06/04/2005",
            "age": 20,
            "creation_date": "05/26/2025"
        },
        {
            "spu": "FDQ",
            "staff_responsible": "Radny Asis Intino",
            "ch_id": "12356473",
            "first_name": "Gabrielle Madison",
            "middle_name": "Francisco",
            "gender": "Female",
            "birth_date": "06/04/2005",
            "age": 20,
            "creation_date": "05/26/2025"
        }
    ])


    const [showModal, setShowModal] = useState(false);

    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [modalConfirm, setModalConfirm] = useState(false);
    const [modalOnConfirm, setModalOnConfirm] = useState(() => { });
    const [modalImageCenter, setModalImageCenter] = useState(null);

    const checkInputs = () => {
        const missing = [];

        if (!drafts.spu_id) missing.push('SPU Project');
        // if (!drafts.sub_id) missing.push('Sub-Project'); // if needed
        if (!drafts.sdw_id) missing.push('Social Development Worker');
        if (!drafts.classifications || drafts.classifications.length === 0)
            missing.push('at least one Classification');

        const validSDWIds = socialDevelopmentWorkers
            .filter((sdw) => sdw.spu_id === drafts.spu_id)
            .map((sdw) => sdw.id);

        if (drafts.sdw_id && !validSDWIds.includes(drafts.sdw_id)) {
            missing.push('valid Social Development Worker for selected SPU');
        }

        if (missing.length > 0) {
            setModalTitle('Invalid Fields');
            setModalBody(`The following fields are missing or invalid: ${formatListWithAnd(missing)}`);
            setModalImageCenter(<div className='warning-icon mx-auto'></div>);
            setModalConfirm(false);
            setShowModal(true);
            return false;
        }

        return true;
    };

    return (<>
        <main className='flex flex-col gap-20 pt-15'>
            <div className='w-full max-w-[1280px] mx-auto flex justify-between 
                items-center bg-white py-3 px-4 '>
                <button className="flex items-center gap-5 px-4 py-2 font-bold-label arrow-group"
                    onClick={() => {
                        navigate('/home-sdw');
                    }}>
                    <div className="arrow-left-button"></div>
                    Back
                </button>
            </div>

            <section className='flex flex-col gap-5' id="core-fields">
                {editingField === "core-fields" && (
                    <div className='flex justify-between items-center'>

                        <h1 className="header-main">Core Details</h1>
                        <button
                            className={editingField === "core-fields" ? "icon-button-setup x-button" : "icon-button-setup dots-button"}
                            onClick={() => {
                                if (editingField) {
                                    resetFields();
                                } else {
                                    setEditingField("core-fields");
                                }
                            }}
                        ></button>
                    </div>
                )}

                {editingField === "core-fields" ? (
                    <>
                        <div className="flex gap-5 w-full">
                            <div className="flex flex-col gap-5 w-full">
                                <label className="font-bold-label">Username</label>
                                <input
                                    type="text"
                                    value={drafts.username}
                                    placeholder="Username"
                                    onChange={(e) => setDrafts(prev => ({ ...prev, username: e.target.value }))}
                                    className="text-input font-label w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 w-full">
                            <label className="font-bold-label">SDW ID</label>
                            <input
                                type="text"
                                value={drafts.sdw_id}
                                onChange={(e) => setDrafts(prev => ({ ...prev, sdw_id: e.target.value }))}
                                className="text-input font-label w-full max-w-[30rem]"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex justify-between items-center'>
                            <h1 className="header-main">{`${data.username}`}</h1>
                            <button
                                className={editingField === "core-fields" ? "icon-button-setup x-button" : "icon-button-setup dots-button"}
                                onClick={() => {
                                    if (editingField) {
                                        resetFields();
                                    } else {
                                        setEditingField("core-fields");
                                    }
                                }}
                            ></button>
                        </div>
                        <h2 className='header-sub'>{data.sdw_id}</h2>
                    </>
                )}

                <div className='flex justify-between gap-10 flex-wrap'>
                    {/* SPU Project */}
                    <div className='flex flex-col w-full md:w-[48%]'>
                        {editingField === "core-fields" ? (
                            <>
                                <label className='font-bold-label'>SPU Project</label>
                                <select
                                    className="text-input font-label"
                                    value={drafts.spu_id}
                                    onChange={(e) => setDrafts(prev => ({ ...prev, spu_id: e.target.value }))}
                                >
                                    <option value="">Select SPU</option>
                                    {projectLocation.map((project) => (
                                        <option key={project.projectCode} value={project.projectCode}>
                                            {project.name} ({project.projectCode})
                                        </option>
                                    ))}
                                </select>
                            </>
                        ) : (
                            <p className="font-label">
                                <span className="font-bold-label">SPU Project:</span>{" "}
                                {projectLocation.find(p => p.projectCode === data.spu_id)?.name || "-"}
                            </p>
                        )}
                    </div>

                    {/* Supervisor */}
                    <div className='flex flex-col w-full md:w-[48%]'>
                        {editingField === "core-fields" ? (
                            <>
                                <label className='font-bold-label'>Supervisor</label>
                                <select
                                    className="text-input font-label"
                                    value={drafts.super_id}
                                    onChange={(e) => setDrafts(prev => ({ ...prev, super_id: parseInt(e.target.value, 10) }))}
                                >
                                    <option value="">Select SDW</option>
                                    {socialDevelopmentWorkers
                                        .filter((sdw) => sdw.spu_id === drafts.spu_id)
                                        .map((sdw) => (
                                            <option key={sdw.id} value={sdw.id}>
                                                {sdw.username} ({sdw.id})
                                            </option>
                                        ))}
                                </select>
                            </>
                        ) : (
                            <p className="font-label">
                                <span className="font-bold-label">Supervisor:</span>{" "}
                                {socialDevelopmentWorkers.find(w => w.id === data.super_id)?.username || "-"}
                            </p>
                        )}
                    </div>

                    {editingField === "core-fields" && (
                        <button
                            className="btn-transparent-rounded my-3 ml-auto"
                            onClick={() => {
                                if (!checkInputs()) return;

                                setData(prev => ({
                                    ...prev,
                                    username: drafts.username,
                                    sdw_id: drafts.sdw_id,
                                    classifications: drafts.classifications || [],
                                }));
                                setEditingField(null);
                            }}
                        >
                            Submit Changes
                        </button>

                    )}
                </div>
            </section>

            <section className='flex flex-col gap-5' id="activity">
                <div className="flex justify-between items-center">
                    <h1 className="header-main">Summary</h1>
                    <button className="btn-green font-bold-label drop-shadow-base">
                        Export

                    </button>
                </div>

                <div className="grid grid-cols-[1fr_2fr_1fr_2fr_2fr_1fr_2fr_1fr_2fr] items-center border-b border-gray-400 pb-2 mb-2">
                    <p className="font-bold-label text-center">SPU</p>
                    <p className="font-bold-label text-center">Staff Responsible</p>
                    <p className="font-bold-label text-center">CH ID</p>
                    <p className="font-bold-label text-center">First Name</p>
                    <p className="font-bold-label text-center">Last Name</p>
                    <p className="font-bold-label text-center">Gender</p>
                    <p className="font-bold-label text-center">Birth Date</p>
                    <p className="font-bold-label text-center">Age</p>
                    <p className="font-bold-label text-center">Creation Date</p>
                </div>

                <div className="flex flex-col gap-10">
                    {activityList.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[1fr_2fr_1fr_2fr_2fr_1fr_2fr_1fr_2fr] items-center border-b border-gray-200 pb-2"
                        >
                            <p className="font-label text-center">{item.spu}</p>
                            <p className="font-label text-center">{item.staff_responsible}</p>
                            <p className="font-label text-center">{item.ch_id}</p>
                            <p className="font-label text-center">{item.first_name}</p>
                            <p className="font-label text-center">{item.middle_name}</p>
                            <p className="font-label text-center">{item.gender}</p>
                            <p className="font-label text-center">{item.birth_date}</p>
                            <p className="font-label text-center">{item.age}</p>
                            <p className="font-label text-center">{item.creation_date}</p>
                        </div>
                    ))}

                </div>
            </section>

            <button className="btn-primary font-bold-label drop-shadow-base my-3 ml-auto">
                Terminate Worker
            </button>
        </main>
    </>)
}