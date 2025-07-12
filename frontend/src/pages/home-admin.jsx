import { useState, useEffect } from "react";
import SideItem from "../Components/SideItem"
import WorkerEntry from "../Components/WorkerEntry";
import RegisterWorker from "../Components/RegisterWorker";
import SideBar from "../Components/SideBar";

function HomeAdmin() {
    const [allData, setAllData] = useState([
        {
            sdw_id: 900001,
            username: "gmadisonkelsey",
            role: "admin",
            spu_id: "MNL",
        },
        {
            sdw_id: 900002,
            username: "alexander.cortez",
            role: "super",
            spu_id: "CEB",
        },
        {
            sdw_id: 900003,
            username: "rachelle.mendez",
            role: "sdw",
            spu_id: "DVO",
        },
        {
            sdw_id: 900004,
            username: "marklouis_torres",
            role: "sdw",
            spu_id: "BAG",
        },
        {
            sdw_id: 900005,
            username: "sophia.luna",
            role: "super",
            spu_id: "ILO",
        },
        {
            sdw_id: 900006,
            username: "lucas.martinez",
            role: "sdw",
            spu_id: "ZAM",
        },
        {
            sdw_id: 900007,
            username: "natalie.bautista",
            role: "sdw",
            spu_id: "MNL",
        },
        {
            sdw_id: 900008,
            username: "elijah.dominguez",
            role: "super",
            spu_id: "CEB",
        },
        {
            sdw_id: 900009,
            username: "kristine.velasquez",
            role: "admin",
            spu_id: "DVO",
        },
        {
            sdw_id: 900010,
            username: "noah.torralba",
            role: "sdw",
            spu_id: "BAG",
        },
        {
            sdw_id: 900011,
            username: "camille.delacruz",
            role: "sdw",
            spu_id: "ILO",
        },
        {
            sdw_id: 900012,
            username: "ethan.monteverde",
            role: "super",
            spu_id: "ZAM",
        },
        {
            sdw_id: 900013,
            username: "alyssa.gutierrez",
            role: "sdw",
            spu_id: "MNL",
        },
        {
            sdw_id: 900014,
            username: "ian.reyes",
            role: "admin",
            spu_id: "CEB",
        },
        {
            sdw_id: 900015,
            username: "mia.rodriguez",
            role: "sdw",
            spu_id: "DVO",
        },
    ]);

    const [projectLocation, setProjectLocation] = useState([
        {
            name: "AMP",
            projectCode: "AMP",
        },
        {
            name: "FDQ",
            projectCode: "FDQ",
        },
        {
            name: "MPH",
            projectCode: "MPH",
        },
        {
            name: "MS",
            projectCode: "MS",
        },
        {
            name: "AP",
            projectCode: "AP",
        },
        {
            name: "MM",
            projectCode: "MM",
        },
        {
            name: "MMP",
            projectCode: "MMP",
        },
    ]);

    const [currentSPU, setCurrentSPU] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [currentData, setCurrentData] = useState(allData);
    const [sortOrder, setSortOrder] = useState("desc");
    const [searchQuery, setSearchQuery] = useState("");

    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    useEffect(() => {
        let filtered = [...allData];

        if (currentSPU !== "") {
            filtered = filtered.filter((worker) => worker.spu_id === currentSPU);
        }

        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((worker) => {
                const username = `${worker.username}`.toLowerCase();
                const sdwNumberStr = worker.sdw_id.toString();
                return (
                    username.includes(query) ||
                    sdwNumberStr.includes(query)
                );
            });
        }

        if (sortBy === "name") {
            filtered.sort((a, b) => {
                const nameA = `${a.username}`.toLowerCase();
                const nameB = `${b.username}`.toLowerCase();
                return nameA.localeCompare(nameB);
            });
        } else if (sortBy === "sdw_id") {
            filtered.sort((a, b) => a.sdw_id - b.sdw_id);
        } else if (sortBy === "role") {
            filtered.sort((a, b) => {
                const nameA = `${a.role}`.toLowerCase();
                const nameB = `${b.role}`.toLowerCase();
                return nameA.localeCompare(nameB);
            });
        }

        if (sortOrder === "desc") {
            filtered.reverse();
        }

        setCurrentData(filtered);
    }, [allData, currentSPU, sortBy, sortOrder, searchQuery]);

    return (
        <>
            <RegisterWorker
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onRegister={(newWorker) => {
                    console.log("New worker data:", newWorker);
                }}
                projectLocations={projectLocation}
            />

            <div className="fixed top-0 left-0 right-0 z-50 w-full max-w-[1280px] mx-auto flex justify-between 
                items-center py-5 px-8 bg-white">
                <a href="/home-sdw" className="main-logo main-logo-text-nav">
                    <div className="main-logo-setup folder-logo "></div>
                    SCSR</a>

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
                <SideBar></SideBar>

                <div className="flex flex-col w-full gap-15 ml-[15rem]">
                    <div className='flex justify-between gap-10'>
                        <div className='flex gap-5 justify-between items-center w-full'>
                            <div className="flex gap-5 w-full">
                                <select
                                    className="text-input font-label max-w-[30rem]"
                                    value={currentSPU}
                                    id="spu"
                                    onChange={(e) => setCurrentSPU(e.target.value)}
                                >
                                    <option value="">Select SPU</option>
                                    {projectLocation.map((project) => (
                                        <option key={project.projectCode} value={project.projectCode}>
                                            {project.name} ({project.projectCode})
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className="text-input font-label max-w-[20rem]"
                                    value={sortBy}
                                    id="filter"
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="">Filter By</option>
                                    <option value="name">Name</option>
                                    <option value="sdw_id">SDW ID</option>
                                    <option value="role">Role</option>
                                </select>

                                <button
                                    className="btn-outline font-bold-label"
                                    onClick={() => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))}>
                                    <div className="icon-static-setup order-button"></div>
                                </button>
                            </div>

                            <button
                                className="btn-outline font-bold-label flex gap-4 whitespace-nowrap"
                                onClick={() => setIsRegisterOpen(true)}
                            >
                                <p>+</p>
                                <p>Add Account</p>
                            </button>

                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <div className="grid grid-cols-[2fr_1fr_2fr] items-center border-b border-gray-400 pb-2 mb-2">
                            <p className="font-bold-label ml-[20%]">Worker</p>
                            <p className="font-bold-label text-center">Type</p>
                            <p className="font-bold-label text-center">SPU</p>
                        </div>

                        {currentData.map((worker) => (
                            <WorkerEntry
                                key={worker.sdw_id}
                                id={worker.sdw_id}
                                spu_id={worker.spu_id}
                                username={worker.username}
                                role={worker.role}
                                spuAssigned={
                                    projectLocation.find(spu => spu.projectCode === worker.spu_id)?.name || "Unassigned"
                                }
                            />
                        ))}

                    </div>

                    <button className="font-bold-label mx-auto">Show More</button>

                </div>
            </main>
        </>
    )
}

export default HomeAdmin