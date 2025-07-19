import { useState, useEffect } from "react";
import SideItem from "../Components/SideItem";
import ClientEntry from "../Components/ClientEntry";
import SideBar from "../Components/SideBar";
import { fetchAllCases } from "../fetch-connections/case-connection";
import { fetchSession } from "../fetch-connections/account-connection";
import { useNavigate } from "react-router-dom";

function Archive() {
    const navigate = useNavigate();
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    const [currentSPU, setCurrentSPU] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentData, setCurrentData] = useState([]);

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
            const sessionData = await fetchSession();
            console.log('Session:', sessionData);
            setUser(sessionData.user);

            const cases = await fetchAllCases();
            setAllData(cases);
        };

        loadSessionAndCases();
    }, []);

    useEffect(() => {
        let filtered = [...allData];

        filtered = filtered.filter((client) => !client.is_active);

        if (user) {
            if (user?.role === "supervisor") {
                filtered = filtered.filter((client) => client.spu === user?.spu_id);
            } else if (user?.role === "sdw") {
                filtered = filtered.filter((client) => {
                    return client.assigned_sdw_name?.includes(user?.first_name);
                });
            }
        }

        if (currentSPU !== "") {
            filtered = filtered.filter((client) => client.spu === currentSPU);
        }

        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((client) => {
                const fullName = client.name.toLowerCase();
                const chNumberStr = client.sm_number?.toString() || '';
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
        console.log(currentData);
    }, [allData, currentSPU, sortBy, sortOrder, searchQuery]);

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 w-full max-w-[1280px] mx-auto flex justify-between items-center py-5 px-8 bg-white">
                <a href="/home-sdw" className="main-logo main-logo-text-nav">
                    <div className="main-logo-setup folder-logo"></div>
                    SCSR
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
                                {user?.role === "head" && <select
                                    className="text-input font-label max-w-[30rem]"
                                    value={currentSPU}
                                    id="spu"
                                    onChange={(e) => setCurrentSPU(e.target.value)}
                                >
                                    <option value="">Select SPU</option>
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
                                    <option value="sm_number">SM Number</option>
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

                    </div>

                    {/* <button className="font-bold-label mx-auto">Show More</button> */}
                </div>
            </main>
        </>
    );
}

export default Archive;