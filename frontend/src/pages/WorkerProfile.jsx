import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSDWs } from "../fetch-connections/case-connection";
import { fetchEmployeeById } from "../fetch-connections/account-connection";


export default function WorkerProfile() {
    const navigate = useNavigate();
    const { workerId } = useParams();
    const [supervisors, setSupervisors] = useState([]);
    const [socialDevelopmentWorkers, setSocialDevelopmentWorkers] = useState([]);

    const [data, setData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        username: "",
        email: "",
        contact_no: "",
        sdw_id: "",
        spu_id: "",
        role: "",
        manager: "",
    });

    const [drafts, setDrafts] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        username: "",
        email: "",
        contact_no: "",
        sdw_id: "",
        spu_id: "",
        role: "",
        manager: "",
    });

    const [editingField, setEditingField] = useState(null);

    const projectLocation = [
        { name: "AMP", projectCode: "AMP" },
        { name: "FDQ", projectCode: "FDQ" },
        { name: "MPH", projectCode: "MPH" },
        { name: "MS", projectCode: "MS" },
        { name: "AP", projectCode: "AP" },
        { name: "AV", projectCode: "AV" },
        { name: "MM", projectCode: "MM" },
        { name: "MMP", projectCode: "MMP" },
    ];

    const [activityList, setActivityList] = useState([]);

    useEffect(() => {
        const loadSDWs = async () => {
            const sdws = await fetchSDWs();
            setSocialDevelopmentWorkers(sdws);
        };
        loadSDWs();
    }, []);


    useEffect(() => {
        const loadWorker = async () => {
            if (!workerId) return;

            const { ok, data: empData } = await fetchEmployeeById(workerId);

            if (ok) {
                console.log("Fetched worker:", empData);

                setData({
                    first_name: empData.first_name || "",
                    middle_name: empData.middle_name || "",
                    last_name: empData.last_name || "",
                    username: empData.username || "",
                    email: empData.email || "",
                    contact_no: empData.contact_no || "",
                    sdw_id: empData.sdw_id || "",
                    spu_id: empData.spu_id || "",
                    role: empData.role || "",
                    manager: empData.manager || "",
                });

                setDrafts({
                    first_name: empData.first_name || "",
                    middle_name: empData.middle_name || "",
                    last_name: empData.last_name || "",
                    username: empData.username || "",
                    email: empData.email || "",
                    contact_no: empData.contact_no || "",
                    sdw_id: empData.sdw_id || "",
                    spu_id: empData.spu_id || "",
                    role: empData.role || "",
                    manager: empData.manager || "",
                });
            } else {
                console.error("Failed to fetch worker:", empData.message);
            }
        };

        loadWorker();
    }, [workerId]);

    useEffect(() => {
        const filtered = socialDevelopmentWorkers.filter(
            (w) => w.spu_id === drafts.spu_id && w.role === 'super'
        );
        setSupervisors(filtered);

        console.log(supervisors);
    }, [drafts.spu_id, drafts.role, socialDevelopmentWorkers]);

    useEffect(() => {
        if (drafts.role === "super" || drafts.role === "head") {
            setDrafts((prev) => ({ ...prev, manager: "" }));
        }
    }, [drafts.role]);


    const resetFields = () => {
        setDrafts({
            first_name: data.first_name || "",
            middle_name: data.middle_name || "",
            last_name: data.last_name || "",
            username: data.username || "",
            email: data.email || "",
            contact_no: data.contact_no || "",
            sdw_id: data.sdw_id || "",
            spu_id: data.spu_id || "",
            role: data.role || "",
            manager: data.manager || "",
        });
        setEditingField(null);
    };


    const checkInputs = () => {
        const missing = [];
        if (!drafts.spu_id) missing.push("SPU Project");
        if (!drafts.sdw_id) missing.push("Social Development Worker");
        if (missing.length > 0) {
            alert("Missing fields: " + missing.join(", "));
            return false;
        }
        return true;
    };

    return (
        <>
            <main className="flex flex-col gap-20 pt-15">
                <div className="w-full max-w-[1280px] mx-auto flex justify-between items-center bg-white py-3 px-4">
                    <button
                        className="flex items-center gap-5 px-4 py-2 font-bold-label arrow-group"
                        onClick={() => navigate("/")}
                    >
                        <div className="arrow-left-button"></div>
                        Back
                    </button>
                </div>

                <section className="flex flex-col gap-5" id="core-fields">
                    {editingField === "core-fields" && (
                        <div className="flex justify-between items-center">
                            <h1 className="header-main">Worker Profile</h1>
                            <button
                                className="icon-button-setup x-button"
                                onClick={resetFields}
                            ></button>
                        </div>
                    )}

                    {editingField === "core-fields" ? (
                        <>
                            <div className="flex gap-5 w-full">
                                <div className="flex flex-col w-full">
                                    <label className="font-bold-label">First Name</label>
                                    <input
                                        type="text"
                                        value={drafts.first_name}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({ ...prev, first_name: e.target.value }))
                                        }
                                        className="text-input font-label w-full"
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="font-bold-label">Middle Name</label>
                                    <input
                                        type="text"
                                        value={drafts.middle_name}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({ ...prev, middle_name: e.target.value }))
                                        }
                                        className="text-input font-label w-full"
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="font-bold-label">Last Name</label>
                                    <input
                                        type="text"
                                        value={drafts.last_name}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({ ...prev, last_name: e.target.value }))
                                        }
                                        className="text-input font-label w-full"
                                    />
                                </div>
                            </div>

                            {/* === Row 2 === */}
                            <div className="flex gap-5 w-full mt-5">
                                <div className="flex flex-col w-full">
                                    <label className="font-bold-label">Username</label>
                                    <input
                                        type="text"
                                        value={drafts.username}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({ ...prev, username: e.target.value }))
                                        }
                                        className="text-input font-label w-full"
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="font-bold-label">Email</label>
                                    <input
                                        type="text"
                                        value={drafts.email}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({ ...prev, email: e.target.value }))
                                        }
                                        className="text-input font-label w-full"
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="font-bold-label">Contact Number</label>
                                    <input
                                        type="text"
                                        value={drafts.contact_no}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({ ...prev, contact_no: e.target.value }))
                                        }
                                        className="text-input font-label w-full"
                                    />
                                </div>
                            </div>

                            {/* === Row 3 === */}
                            <div className="flex gap-5 w-full mt-5">
                                <div className="flex flex-col w-full">
                                    <label className="font-bold-label">SDW ID</label>
                                    <input
                                        type="text"
                                        value={drafts.sdw_id}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({ ...prev, sdw_id: e.target.value }))
                                        }
                                        className="text-input font-label w-full"
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="font-bold-label">SPU Project</label>
                                    <select
                                        className="text-input font-label"
                                        value={drafts.spu_id}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({ ...prev, spu_id: e.target.value }))
                                        }
                                    >
                                        <option value="">Select SPU</option>
                                        {projectLocation.map((project) => (
                                            <option key={project.projectCode} value={project.projectCode}>
                                                {project.name} ({project.projectCode})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="font-bold-label">Role</label>
                                    <select
                                        className="text-input font-label"
                                        value={drafts.role}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({ ...prev, role: e.target.value }))
                                        }
                                    >
                                        <option value="">Select Role</option>
                                        <option value="sdw">Social Development Worker</option>
                                        <option value="super">Supervisor</option>
                                        <option value="head">Head</option>
                                    </select>
                                </div>

                                {(drafts.role === "" || drafts.role === "sdw") && (<div className="flex flex-col w-full">
                                    <label className="font-bold-label">Manager</label>
                                    <select
                                        className="text-input font-label"
                                        value={drafts.manager}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({ ...prev, manager: e.target.value }))
                                        }
                                    >
                                        <option value="">Select Manager</option>
                                        {(drafts.role === "sdw" ? supervisors : socialDevelopmentWorkers).map(
                                            (person) => (
                                                <option key={person._id || person.id} value={person._id || person.id}>
                                                    {person.username
                                                        ? person.username
                                                        : `${person.first_name} ${person.middle_name || ""} ${person.last_name}`}
                                                    ({person._id || person.id})
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>)}
                            </div>

                            <button
                                className="btn-transparent-rounded my-3 ml-auto"
                                onClick={() => {
                                    if (!checkInputs()) return;
                                    setData({ ...drafts });
                                    setEditingField(null);
                                }}
                            >
                                Submit Changes
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-between items-center">
                                <h1 className="header-main">{data.first_name || "-"} {data.middle_name || "-"}, {data.last_name || "-"}</h1>
                                <button
                                    className="icon-button-setup dots-button"
                                    onClick={() => setEditingField("core-fields")}
                                ></button>
                            </div>

                            <div className="font-label grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
                                <p><span className="font-bold-label">Username:</span> {data.username || "-"}</p>
                                <p><span className="font-bold-label">Email:</span> {data.email || "-"}</p>
                                <p><span className="font-bold-label">Contact No.:</span> {data.contact_no || "-"}</p>

                                <p><span className="font-bold-label">SDW ID:</span> {data.sdw_id || "-"}</p>
                                <p><span className="font-bold-label">SPU Project:</span> {data.spu_id || "-"}</p>
                                <p><span className="font-bold-label">Role:</span> {data.role || "-"}</p>

                                {(data.role === "" || data.role === "sdw") && (
                                <p className="font-label">
                                    <span className="font-bold-label">Manager:</span>{" "}
                                    {socialDevelopmentWorkers.find(
                                    (w) => w._id === data.manager || w.id === data.manager
                                    )
                                    ? `${socialDevelopmentWorkers.find(
                                        (w) => w._id === data.manager || w.id === data.manager
                                        ).username}`
                                    : "-"}
                                </p>
                                )}

                            </div>
                        </>
                    )}
                </section>


                <button className="btn-primary font-bold-label drop-shadow-base my-3 ml-auto">
                    Terminate Worker
                </button>
            </main>
        </>
    );
}
