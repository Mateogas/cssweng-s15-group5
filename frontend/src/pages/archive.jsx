import { useState, useEffect } from "react";
import SideItem from "../Components/SideItem";
import ClientEntry from "../Components/ClientEntry";
import WorkerEntry from "../Components/WorkerEntry";
import SideBar from "../Components/SideBar";
import { fetchAllCases } from "../fetch-connections/case-connection";
import { fetchHeadView, fetchSession, fetchSupervisorView } from "../fetch-connections/account-connection";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";

function Archive() {
    const navigate = useNavigate();

    const [allCases, setAllCases] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [archiveEmp, setArchiveEmp] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [user, setUser] = useState(null);

    const [currentSPU, setCurrentSPU] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("cases");

    const [loadingStage, setLoadingStage] = useState(0);
    const [loadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        document.title = `Archive`;
    }, []);

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

    useEffect(() => {
        const loadSessionAndCases = async () => {
            try {
                setLoadingStage(0); // red
                const sessionData = await fetchSession();
                const currentUser = sessionData.user;
                setUser(currentUser);

                if (!currentUser || !["head", "supervisor"].includes(currentUser.role)) {
                    navigate("/unauthorized");
                    return;
                }

                setLoadingStage(1); // blue

                const cases = await fetchAllCases();
                setAllCases(cases);

                if (currentUser.role === "supervisor") {
                    const employees = await fetchSupervisorView();
                    setAllEmployees(employees.employees);
                }

                setLoadingStage(2); // green
                setLoadingComplete(true);
            } catch (err) {
                console.error("Error loading archive page:", err);
                navigate("/unauthorized");
            }
        };

        loadSessionAndCases();
    }, []);

    useEffect(() => {
        let filtered = [...allCases].filter((client) => !client.is_active);

        if (user?.role === "supervisor") {
            filtered = filtered.filter((client) => {
                const isSameSPU = client.spu === user.spu_name;
                const assignedSDWExists = allEmployees.some(
                    (employee) => employee.id === client.assigned_sdw 
                );
                return isSameSPU && assignedSDWExists;
            });
        }

        if (currentSPU !== "") {
            filtered = filtered.filter((client) => client.spu === currentSPU);
        }

        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((client) => {
                const fullName = client.name.toLowerCase();
                const chNumberStr = client.sm_number?.toString() || "";
                return fullName.includes(query) || chNumberStr.includes(query);
            });
        }

        if (sortBy === "name") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "sm_number") {
            filtered.sort((a, b) => a.sm_number - b.sm_number);
        }

        if (sortOrder === "desc") {
            filtered.reverse();
        }

        setCurrentData(filtered);
    }, [allCases, currentSPU, sortBy, sortOrder, searchQuery, allEmployees]);

    useEffect(() => {
        const fetchEmployees = async () => {
            if (viewMode !== "employees") return;

            try {
                let response = null;

                if (user?.role === "head") {
                    response = await fetchHeadView();
                } else if (user?.role === "supervisor") {
                    response = await fetchSupervisorView();
                }

                if (!response || !response.employees) return;

                let filtered = response.employees.filter(emp => emp.is_active === false);

                if (currentSPU !== "") {
                    filtered = filtered.filter(emp => emp.spu === currentSPU);
                }

                if (sortBy === "name") {
                    filtered.sort((a, b) =>
                        `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
                    );
                }

                if (sortOrder === "desc") {
                    filtered.reverse();
                }

                setAllEmployees(response.employees);
                setArchiveEmp(filtered);
            } catch (error) {
                console.error("Failed to fetch employees:", error);
            }
        };

        fetchEmployees();
    }, [viewMode, currentSPU, sortBy, sortOrder]);

    const loadingColor = loadingStage === 0 ? "red" : loadingStage === 1 ? "blue" : "green";
    if (!loadingComplete) return <Loading color={loadingColor} />;


    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 w-full max-w-[1280px] mx-auto flex justify-between items-center py-5 px-8 bg-white">
                <a href="/" className="main-logo">
                    <div className="main-logo-setup folder-logo"></div>
                    <div className="flex flex-col">
                        <p className="main-logo-text-nav-sub mb-[-1rem]">Unbound Manila Foundation Inc.</p>
                        <p className="main-logo-text-nav">Case Management System</p>
                    </div>
                </a>

                <div className="flex gap-5 items-center bg-purple-100 rounded-full px-8 py-4 w-full max-w-[40rem] font-label">
                    <div className="nav-search"></div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="focus:outline-none flex-1"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <main className="min-h-[calc(100vh-4rem)] w-full flex mt-[9rem]">
                <SideBar user={user} />

                <div className="flex flex-col w-full gap-15 ml-[15rem]">
                    <div className="flex justify-between gap-10">
                        <div className="flex gap-5 justify-between items-center w-full">
                            <div className="flex gap-5 w-full">
                                <select
                                    className="text-input font-label max-w-[150px]"
                                    value={viewMode}
                                    id="view-toggle"
                                    onChange={(e) => setViewMode(e.target.value)}
                                >
                                    <option value="cases">Cases</option>
                                    <option value="employees">Employees</option>
                                </select>

                                {user?.role === "head" && <select
                                    className="text-input font-label max-w-[30rem]"
                                    value={currentSPU}
                                    id="spu"
                                    onChange={(e) => setCurrentSPU(e.target.value)}
                                >
                                    <option value="">All SPUs</option>
                                    {projectLocation.map((project) => (
                                        <option
                                            key={project.projectCode}
                                            value={project.projectCode}
                                        >
                                            {project.name} ({project.projectCode})
                                        </option>
                                    ))}
                                </select>}

                                <select
                                    className="text-input font-label max-w-[20rem]"
                                    value={sortBy}
                                    id="filter"
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="">Sort By</option>
                                    <option value="name">Name</option>
                                    {viewMode === "cases" && (
                                        <option value="sm_number">CH Number</option>
                                    )}
                                </select>

                                <button
                                    className="btn-outline font-bold-label"
                                    onClick={() =>
                                        setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
                                    }
                                >
                                    <div className="icon-static-setup order-button"></div>
                                </button>
                            </div>

                            {user?.role == "sdw" && <button
                                onClick={() => navigate("/create-case")}
                                className="btn-outline font-bold-label flex gap-4 whitespace-nowrap">
                                <p>+</p>
                                <p>New Case</p>
                            </button>}
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        {viewMode === "cases" ? (
                            <>
                                <div className="grid grid-cols-[2fr_1fr_2fr] items-center border-b border-gray-400 pb-2 mb-2">
                                    <p className="font-bold-label ml-[20%]">Name</p>
                                    <p className="font-bold-label text-center">CH Number</p>
                                    <p className="font-bold-label text-center">SDW Assigned</p>
                                </div>

                                {currentData.length === 0 ? (
                                    <p className="font-bold-label mx-auto">No Clients Found</p>
                                ) : (
                                    currentData.map((client) => (
                                        <ClientEntry
                                            key={client.id}
                                            id={client.id}
                                            sm_number={client.sm_number}
                                            spu={client.spu}
                                            name={client.name}
                                            assigned_sdw_name={client.assigned_sdw_name}
                                            archive={true}
                                        />
                                    ))
                                )}
                            </>
                        ) : (
                            <>
                                <div className="grid grid-cols-[2fr_1fr_2fr] items-center border-b border-gray-400 pb-2 mb-2">
                                    <p className="font-bold-label ml-[20%]">Worker</p>
                                    <p className="font-bold-label text-center">Type</p>
                                    <p className="font-bold-label text-center">SPU</p>
                                </div>

                                {archiveEmp.length === 0 ? (
                                    <p className="font-bold-label mx-auto">No Employees Found</p>
                                ) : (
                                    archiveEmp.map((worker, index) => (
                                        <WorkerEntry
                                            key={`${worker._id}-${index}`}
                                            id={worker.id}
                                            // sdw_id={worker.sdw_id}
                                            name={worker.name}
                                            role={worker.role}
                                            spu_id={worker.spu}
                                            archive={true}
                                        />
                                    ))
                                )}
                            </>
                        )}
                    </div>
                    {/* <button className="font-bold-label mx-auto">Show More</button> */}
                </div>
            </main>
        </>
    );
}

export default Archive;