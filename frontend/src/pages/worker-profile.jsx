import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSDWs } from "../fetch-connections/case-connection";
import { fetchEmployeeById, updateEmployeeById } from "../fetch-connections/account-connection";
import SimpleModal from "../Components/SimpleModal";
import { fetchSDWViewById, fetchHeadViewBySupervisor, fetchHeadViewBySpu } from "../fetch-connections/account-connection";
import WorkerEntry from "../Components/WorkerEntry";
import ClientEntry from "../Components/ClientEntry";
import { fetchSession } from "../fetch-connections/account-connection";
import { logoutUser } from "../fetch-connections/account-connection";
import ChangePassword from "../Components/ChangePassword";
import { updateEmployeePasswordById } from "../fetch-connections/account-connection";
import { fetchEmployeeBySDWId, fetchEmployeeByUsername } from "../fetch-connections/account-connection";
import { fetchAllSpus } from "../fetch-connections/spu-connection";
import NotFound from "./NotFound";

export default function WorkerProfile() {
    const navigate = useNavigate();
    const { workerId } = useParams();
    const [supervisors, setSupervisors] = useState([]);
    const [socialDevelopmentWorkers, setSocialDevelopmentWorkers] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [modalImageCenter, setModalImageCenter] = useState(null);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [modalOnConfirm, setModalOnConfirm] = useState(() => { });
    const [modalOnClose, setModalOnClose] = useState(() => null);

    const [handledClients, setHandledClients] = useState([]);
    const [handledWorkers, setHandledWorkers] = useState([]);

    const [user, setUser] = useState(null);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        username: "",
        email: "",
        contact_no: "",
        // sdw_id: "",
        area: "",
        spu_id: "",
        spu_name: "",
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
        // sdw_id: "",
        area: "",
        spu_id: "",
        spu_name: "",
        role: "",
        manager: "",
    });

    const [editingField, setEditingField] = useState(null);

    const [projectLocation, setProjectLocation] = useState([])
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const loadWorker = async () => {
            if (!workerId) {
                setLoading(false);
                return;
            };

            const { ok, data: empData } = await fetchEmployeeById(workerId);

            if (ok) {
                console.log("Fetched worker:", empData);

                setData({
                    _id: empData._id,
                    first_name: empData.first_name || "",
                    middle_name: empData.middle_name || "",
                    last_name: empData.last_name || "",
                    username: empData.username || "",
                    email: empData.email || "",
                    contact_no: empData.contact_no || "",
                    // sdw_id: empData.sdw_id || "",
                    area: empData.area || "",
                    spu_id: empData.spu_id.spu_name || "",
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
                    // sdw_id: empData.sdw_id || "",
                    area: empData.area || "",
                    spu_id: empData.spu_id.spu_name || "",
                    role: empData.role || "",
                    manager: empData.manager || "",
                });
                setLoading(false);
            } else {
                setNotFound(true);
                setLoading(false);
                return;
            }
        };

        loadWorker();

        // console.log("drafts", drafts);
    }, [workerId]);

    useEffect(() => {
        const loadSession = async () => {
            const sessionData = await fetchSession();
            setUser(sessionData?.user || null);
            console.log("Session:", sessionData?.user);
        };

        loadSession();
    }, []);

    useEffect(() => {
        const loadSDWs = async () => {
            const sdws = await fetchSDWs();
            setSocialDevelopmentWorkers(sdws);
        };
        loadSDWs();

        const loadSPUs = async () => {
            const spus = await fetchAllSpus();
            setProjectLocation(spus);
        };

        loadSPUs();
    }, []);

    useEffect(() => {
        const filtered = socialDevelopmentWorkers.filter(
            (w) => w.spu_id === drafts.spu_id && w.role === 'supervisor'
        );
        setSupervisors(filtered);
    }, [drafts.spu_id, drafts.role, socialDevelopmentWorkers]);

    useEffect(() => {
        if (drafts.role === "supervisor" || drafts.role === "head") {
            setDrafts((prev) => ({ ...prev, manager: "" }));
        }
    }, [drafts.role]);

    useEffect(() => {
        if (!data.role || !workerId) return;

        const loadHandled = async () => {
            if (data.role === "sdw") {
                const res = await fetchSDWViewById(workerId);
                setHandledClients(res || []);
            } else if (data.role === "supervisor") {
                const res = await fetchHeadViewBySupervisor(workerId);
                setHandledWorkers(res || []);
            } else if (data.role === "head") {
                const res = await fetchHeadViewBySpu(data.spu_id);
                setHandledWorkers(res.employees || []);
            }
        };

        loadHandled();
    }, [data.role, data.spu_id, workerId]);

    const resetFields = () => {
        setDrafts({
            first_name: data.first_name || "",
            middle_name: data.middle_name || "",
            last_name: data.last_name || "",
            username: data.username || "",
            email: data.email || "",
            contact_no: data.contact_no || "",
            // sdw_id: data.sdw_id || "",
            area: data.area || "",
            spu_id: data.spu_id || "",
            role: data.role || "",
            manager: data.manager || "",
        });
        setEditingField(null);
    };

    function formatListWithAnd(arr) {
        if (arr.length === 0) return "";
        if (arr.length === 1) return arr[0];
        if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
        const last = arr[arr.length - 1];
        return `${arr.slice(0, -1).join(", ")}, and ${last}`;
    }

    const checkEmployeeCore = async () => {
        const missing = [];

        if (!drafts.first_name || drafts.first_name.trim() === "") {
            missing.push("First Name");
        } else if (/\d/.test(drafts.first_name)) {
            missing.push("First Name must not contain numbers");
        }

        // if (!drafts.middle_name || drafts.middle_name.trim() === "") {
        //     missing.push("Middle Name");
        // } else 

        if (/\d/.test(drafts.middle_name)) {
            missing.push("Middle Name must not contain numbers");
        }

        if (!drafts.last_name || drafts.last_name.trim() === "") {
            missing.push("Last Name");
        } else if (/\d/.test(drafts.last_name)) {
            missing.push("Last Name must not contain numbers");
        }

        if (!drafts.username || drafts.username.trim() === "") {
            missing.push("Username");
        } else {
            const check = await fetchEmployeeByUsername(drafts.username);
            console.log("Fetched employee by Username:", check);

            if (check.ok && check.data) {
                console.log(
                    "Comparing found username:", check.data.username,
                    "vs current employee username:", data.username
                );

                if (check.data.username.trim() !== data.username.trim()) {
                    missing.push(`Username already exists and belongs to another employee`);
                }
            }
        }

        if (!drafts.email || drafts.email.trim() === "") {
            missing.push("Email");
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(drafts.email)) {
                missing.push("Email must be valid");
            }
        }

        if (!drafts.contact_no) {
            missing.push("Contact Number");
        } else if (!/^\d{11}$/.test(drafts.contact_no)) {
            missing.push("Contact Number must be 11 digits");
        }

        // if (!drafts.sdw_id) {
        //     missing.push("SDW ID");
        // } else if (isNaN(Number(drafts.sdw_id))) {
        //     missing.push("SDW ID must be numeric");
        // } else if (Number(drafts.sdw_id) <= 0) {
        //     missing.push("SDW ID must be greater than zero");
        // } else {
        //     // Check uniqueness
        //     const check = await fetchEmployeeBySDWId(Number(drafts.sdw_id));
        //     console.log("Fetched employee by SDW ID:", check);

        //     if (check.ok && check.data) {
        //         console.log(
        //             "Comparing found SDW ID:", String(check.data.sdw_id),
        //             "vs current employee SDW ID:", String(data.sdw_id)
        //         );

        //         if (String(check.data.sdw_id).trim() !== String(data.sdw_id).trim()) {
        //             missing.push(`SDW ID already exists and belongs to another employee`);
        //         }
        //     }
        // }


        if (!drafts.spu_id) {
            missing.push("SPU Project");
        }

        const hasSPUChanged = drafts.spu_id !== data.spu_id;

        if (hasSPUChanged) {
            if (data.role === "sdw" && handledClients.length > 0) {
                setModalTitle("SPU Change Not Allowed");
                setModalBody("This SDW is currently assigned to clients. Please reassign all clients before changing SPU.");
                setModalImageCenter(<div className="warning-icon mx-auto"></div>);
                setModalConfirm(false);
                setShowModal(true);
                return false;
            }

            if (data.role === "supervisor" && handledWorkers.length > 0) {
                setModalTitle("SPU Change Not Allowed");
                setModalBody("This supervisor is currently managing SDWs. Please reassign all workers before changing SPU.");
                setModalImageCenter(<div className="warning-icon mx-auto"></div>);
                setModalConfirm(false);
                setShowModal(true);
                return false;
            }
        }

        if (!drafts.role) {
            missing.push("Role");
        }

        if (drafts.role === "sdw") {
            if (!drafts.manager || drafts.manager.trim() === "") {
                drafts.manager = "";
                missing.push("Supervisor must be selected for SDW role");
            } else {
                const validSupervisorIds = socialDevelopmentWorkers
                    .filter((w) => w.spu_id === drafts.spu_id && w.role === "supervisor")
                    .map((w) => w._id || w.id);

                if (!validSupervisorIds.includes(drafts.manager)) {
                    missing.push("Supervisor is not valid for the selected SPU");
                }
            }
        }


        if (drafts.role !== "sdw") {
            drafts.manager = null;
        }

        if (missing.length > 0) {
            setModalTitle("Invalid Fields");
            setModalBody(`The following fields are missing or invalid: ${formatListWithAnd(missing)}`);
            setModalImageCenter(<div className="warning-icon mx-auto"></div>);
            setModalConfirm(false);
            setShowModal(true);
            return false;
        }

        const isSelf = user?._id === workerId;
        const demotion = data.role === "head" && drafts.role !== "head";
        if (isSelf && demotion) {
            return "demotion";
        }

        return true;
    };

    const handleLogout = async () => {
        const ok = await logoutUser();
        if (ok) {
            navigate("/");
        } else {
            setModalTitle("Logout Failed");
            setModalBody("An error occurred while trying to log you out. Please try again.");
            setModalImageCenter(<div className="warning-icon mx-auto"></div>);
            setModalConfirm(false);
            setShowModal(true);
        }
    };

    if (loading) return null;

    return (
        <>
            {notFound ? (
                <NotFound message="The profile you are looking for does not exist." />
            ) : (
                <>
                    <ChangePassword
                        isOpen={isChangePasswordOpen}
                        onClose={() => setIsChangePasswordOpen(false)}
                        onSubmit={async (passwordData) => {
                            const { ok, data } = await updateEmployeePasswordById(workerId, passwordData);

                            if (ok) {
                                setIsChangePasswordOpen(false);
                            } else {
                                setModalTitle("Error");
                                setModalBody(data.message || "Failed to update password.");
                                setModalImageCenter(<div className="warning-icon mx-auto"></div>);
                                setShowModal(true);
                            }
                        }}
                        userId={workerId}
                    />

                    <SimpleModal
                        isOpen={showModal}
                        onClose={() => {
                            if (modalOnClose) modalOnClose();
                            setShowModal(false);
                            setModalTitle("");
                            setModalBody("");
                            setModalImageCenter(null);
                            setModalConfirm(false);
                            setModalOnConfirm(() => { });
                            setModalOnClose(() => null);
                        }}
                        title={modalTitle}
                        bodyText={modalBody}
                        imageCenter={modalImageCenter}
                        confirm={modalConfirm}
                        onConfirm={() => {
                            modalOnConfirm?.();
                            setShowModal(false);
                        }}
                    />

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
                                            <label className="font-bold-label"><span className='text-red-500'>*</span> First Name</label>
                                            <input
                                                placeholder="First Name"
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
                                                placeholder="Middle Name"
                                                value={drafts.middle_name}
                                                onChange={(e) =>
                                                    setDrafts((prev) => ({ ...prev, middle_name: e.target.value }))
                                                }
                                                className="text-input font-label w-full"
                                            />
                                        </div>

                                        <div className="flex flex-col w-full">
                                            <label className="font-bold-label"><span className='text-red-500'>*</span> Last Name</label>
                                            <input
                                                type="text"
                                                placeholder="Last Name"
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
                                            <label className="font-bold-label"><span className='text-red-500'>*</span> Username</label>
                                            <input
                                                type="text"
                                                placeholder="Username"
                                                value={drafts.username}
                                                onChange={(e) =>
                                                    setDrafts((prev) => ({ ...prev, username: e.target.value }))
                                                }
                                                className="text-input font-label w-full"
                                            />
                                        </div>

                                        <div className="flex flex-col w-full">
                                            <label className="font-bold-label"><span className='text-red-500'>*</span> Email</label>
                                            <input
                                                type="text"
                                                placeholder="Email"
                                                value={drafts.email}
                                                onChange={(e) =>
                                                    setDrafts((prev) => ({ ...prev, email: e.target.value }))
                                                }
                                                className="text-input font-label w-full"
                                            />
                                        </div>

                                        <div className="flex flex-col w-full">
                                            <label className="font-bold-label"><span className='text-red-500'>*</span> Contact Number</label>
                                            <input
                                                type="text"
                                                placeholder="Contact Number"
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
                                        {/* <div className="flex flex-col w-full">
                                    <label className="font-bold-label"><span className='text-red-500'>*</span> SDW ID</label>
                                    <input
                                        type="text"
                                        value={drafts.sdw_id}
                                        onChange={(e) =>
                                            setDrafts((prev) => ({ ...prev, sdw_id: e.target.value }))
                                        }
                                        className="text-input font-label w-full"
                                    />
                                </div> */}

                                        <div className="flex flex-col w-full">
                                            <label className="font-bold-label"><span className='text-red-500'>*</span> SPU Project</label>
                                            <select
                                                className="text-input font-label"
                                                value={drafts.spu_id}
                                                onChange={(e) =>
                                                    setDrafts((prev) => ({ ...prev, spu_id: e.target.value }))
                                                }
                                            >
                                                <option value="">Select SPU</option>
                                                {projectLocation.map((spu) => (
                                                    <option key={spu._id} value={spu.spu_name}>
                                                        {spu.spu_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex flex-col w-full">
                                            <label className="font-bold-label">Area of Assignment</label>
                                            <input
                                                type="text"
                                                value={drafts.area}
                                                placeholder="Area of Assignment"
                                                onChange={(e) =>
                                                    setDrafts((prev) => ({ ...prev, area: e.target.value }))
                                                }
                                                className="text-input font-label w-full"
                                            />
                                        </div>

                                        <div className="flex flex-col w-full">
                                            <label className="font-bold-label"><span className='text-red-500'>*</span> Role</label>
                                            <select
                                                disabled={user?.role !== "head"}
                                                className="text-input font-label"
                                                value={drafts.role}
                                                onChange={(e) =>
                                                    setDrafts((prev) => ({ ...prev, role: e.target.value }))
                                                }
                                            >
                                                <option value="">Select Role</option>
                                                {user?.role == "head" && <option value="head">Head</option>}
                                                <option value="supervisor">Supervisor</option>
                                                <option value="sdw">Social Development Worker</option>
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
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>)}
                                    </div>

                                    <button
                                        className="btn-transparent-rounded my-3 ml-auto"
                                        onClick={async () => {
                                            const isValid = await checkEmployeeCore();
                                            if (isValid === false) return;

                                            const payload = {
                                                ...drafts,
                                                manager: drafts.manager === "" || drafts.manager?.trim() === "" ? null : drafts.manager,
                                            };


                                            if (isValid === "demotion") {
                                                setModalTitle("Role Demotion");
                                                setModalBody("You are about to change your own role from Head to another role. You will lose access to employee data changing and other head-exclusive privileges. Are you sure you want to proceed?");
                                                setModalImageCenter(<div className="warning-icon mx-auto"></div>);
                                                setModalConfirm(true);

                                                setModalOnConfirm(() => async () => {
                                                    const { ok, data: result } = await updateEmployeeById(workerId, payload);
                                                    if (ok) {
                                                        setModalTitle("Success");
                                                        setModalBody("Worker profile updated successfully!");
                                                        setModalImageCenter(<div className="success-icon mx-auto"></div>);
                                                        setModalConfirm(false);
                                                        setShowModal(true);

                                                        const onUpdate = () => {
                                                            setData(result.employee);
                                                            setEditingField(null);

                                                            setTimeout(() => window.location.reload(), 500);
                                                        };

                                                        setModalOnConfirm(() => onUpdate);
                                                        setModalOnClose(() => onUpdate);
                                                    }
                                                    else {
                                                        setModalTitle("Error");
                                                        setModalBody(result.message || "Failed to update worker.");
                                                        setModalImageCenter(<div className="warning-icon mx-auto"></div>);
                                                        setModalConfirm(false);
                                                        setShowModal(true);
                                                    }
                                                });
                                                setModalOnClose(() => { });
                                                setShowModal(true);
                                                return;
                                            } else {
                                                const { ok, data: result } = await updateEmployeeById(workerId, payload);
                                                if (ok) {
                                                    setModalTitle("Success");
                                                    setModalBody("Worker profile updated successfully!");
                                                    setModalImageCenter(<div className="success-icon mx-auto"></div>);
                                                    setModalConfirm(false);
                                                    setShowModal(true);

                                                    const onUpdate = () => {
                                                        setData(result.employee);
                                                        setEditingField(null);
                                                    };

                                                    setModalOnConfirm(() => onUpdate);
                                                    setModalOnClose(() => onUpdate);
                                                }
                                                else {
                                                    setModalTitle("Error");
                                                    setModalBody(result.message || "Failed to update worker.");
                                                    setModalImageCenter(<div className="warning-icon mx-auto"></div>);
                                                    setModalConfirm(false);
                                                    setShowModal(true);
                                                }
                                            }
                                        }}
                                    >
                                        Submit Changes
                                    </button>

                                </>
                            ) : (
                                <>
                                    <p className="font-label mt-[-1rem] mb-[-1rem]">{data.area || "-"}</p>
                                    <div className="flex justify-between items-center">
                                        <h1 className="header-main">{data.first_name || "-"} {data.middle_name || "-"}, {data.last_name || "-"}</h1>
                                        {(user?.role == "head" || data.manager == user?._id) && <button
                                            className="icon-button-setup dots-button"
                                            onClick={() => setEditingField("core-fields")}
                                        ></button>}
                                    </div>

                                    <div className="font-label grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
                                        <p><span className="font-bold-label">Username:</span> {data.username || "-"}</p>
                                        <p><span className="font-bold-label">Email:</span> {data.email || "-"}</p>
                                        <p><span className="font-bold-label">Contact No.:</span> {data.contact_no || "-"}</p>

                                        {/* <p><span className="font-bold-label">SDW ID:</span> {data.sdw_id || "-"}</p> */}
                                        <p><span className="font-bold-label">SPU Project:</span> {data.spu_id || "-"}</p>
                                        <p><span className="font-bold-label">Role:</span> {data.role == "head" ? "Head" : data.role == "super" ? "Supervisor" : "Social Development Worker"}</p>

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

                        <section className="flex flex-col gap-5">
                            {data.role === "sdw" && (
                                <>
                                    <h2 className="header-sub">Clients Assigned</h2>

                                    <div className="grid grid-cols-[2fr_1fr_2fr] items-center border-b border-gray-400 pb-2 mb-2">
                                        <p className="font-bold-label ml-[20%]">Name</p>
                                        <p className="font-bold-label text-center">CH Number</p>
                                        <p className="font-bold-label text-center">SDW Assigned</p>
                                    </div>

                                    {handledClients.length === 0 ? (
                                        <p className="font-bold-label mx-auto">No Clients Found</p>
                                    ) : (
                                        handledClients.map((client) => (
                                            <ClientEntry
                                                key={client.id}
                                                id={client.id}
                                                sm_number={client.sm_number}
                                                spu={client.spu}
                                                name={client.name}
                                                assigned_sdw_name={client.assigned_sdw_name}
                                            />
                                        ))
                                    )}
                                </>
                            )}

                            {(data.role === "supervisor" || data.role === "head") && (
                                <>
                                    <h2 className="header-sub">
                                        {data.role === "head" ? "Workers in SPU" : "Workers Supervised"}
                                    </h2>

                                    <div className="grid grid-cols-[2fr_1fr_2fr] items-center border-b border-gray-400 pb-2 mb-2">
                                        <p className="font-bold-label ml-[20%]">Worker</p>
                                        <p className="font-bold-label text-center">Type</p>
                                        <p className="font-bold-label text-center">SPU</p>
                                    </div>

                                    {handledWorkers.length === 0 ? (
                                        <p className="font-bold-label mx-auto">No Workers Found</p>
                                    ) : (
                                        handledWorkers.map((worker) => (
                                            <WorkerEntry
                                                key={worker._id}
                                                id={worker.id}
                                                // sdw_id={worker.sdw_id}
                                                name={
                                                    worker.name ||
                                                    `${worker.first_name} ${worker.middle_name || ""} ${worker.last_name}`
                                                }
                                                role={worker.role}
                                                spu_id={worker.spu_id}
                                            />
                                        ))
                                    )}
                                </>
                            )}
                        </section>

                        <div className="flex justify-between">
                            {(user?._id == workerId) && (
                                <button
                                    className="btn-outline font-bold-label drop-shadow-base my-3 mr-20"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            )}


                            {user?.role && data?.role && data?._id && (
                                ((user.role === "head" && (data._id === user._id || data.role !== "head")) ||
                                    data.manager === user._id) && (
                                    <button
                                        className="btn-outline font-bold-label drop-shadow-base my-3"
                                        onClick={() => setIsChangePasswordOpen(true)}
                                    >
                                        Change Password
                                    </button>
                                )
                            )}





                            {user?.role == "head" && <button className="ml-auto btn-primary font-bold-label drop-shadow-base my-3">
                                Terminate Worker
                            </button>}
                        </div>
                    </main>
                </>)}
        </>
    );
}

//