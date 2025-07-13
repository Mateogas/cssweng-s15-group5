import { useState, useEffect } from "react";
import SideItem from "../Components/SideItem"
import ClientEntry from "../Components/ClientEntry";
import SideBar from "../Components/SideBar";

function HomeSDW() {
    const [allData, setAllData] = useState([
        {
            first_name: "Hephzi-Bah",
            middle_name: "Gamac",
            last_name: "Tolentino",
            sm_number: 12356473,
            is_active: "yes",
            sdw_id: 900001,
            spu_id: "MNL",
        },
        {
            first_name: "John",
            middle_name: "David",
            last_name: "Santos",
            sm_number: 22356474,
            is_active: "no",
            sdw_id: 900002,
            spu_id: "CEB",
        },
        {
            first_name: "Maria",
            middle_name: "Clara",
            last_name: "Reyes",
            sm_number: 32356475,
            is_active: "yes",
            sdw_id: 900003,
            spu_id: "DVO",
        },
        {
            first_name: "Miguel",
            middle_name: "Luis",
            last_name: "Gonzales",
            sm_number: 42356476,
            is_active: "no",
            sdw_id: 900004,
            spu_id: "BAG",
        },
        {
            first_name: "Sophia",
            middle_name: "Isabel",
            last_name: "Mendoza",
            sm_number: 52356477,
            is_active: "yes",
            sdw_id: 900005,
            spu_id: "ILO",
        },
        {
            first_name: "Enrico",
            middle_name: "Jose",
            last_name: "Lopez",
            sm_number: 62356478,
            is_active: "no",
            sdw_id: 900001,
            spu_id: "ZAM",
        },
        {
            first_name: "Althea",
            middle_name: "Rose",
            last_name: "Cruz",
            sm_number: 72356479,
            is_active: "yes",
            sdw_id: 900002,
            spu_id: "MNL",
        },
        {
            first_name: "Gabriel",
            middle_name: "Santos",
            last_name: "Delos Reyes",
            sm_number: 82356480,
            is_active: "yes",
            sdw_id: 900003,
            spu_id: "CEB",
        },
        {
            first_name: "Diana",
            middle_name: "Mae",
            last_name: "Fernandez",
            sm_number: 92356481,
            is_active: "no",
            sdw_id: 900004,
            spu_id: "DVO",
        },
        {
            first_name: "Patrick",
            middle_name: "Joseph",
            last_name: "Garcia",
            sm_number: 10235648,
            is_active: "yes",
            sdw_id: 900005,
            spu_id: "BAG",
        },
        {
            first_name: "Andrea",
            middle_name: "Marie",
            last_name: "Valdez",
            sm_number: 11235648,
            is_active: "no",
            sdw_id: 900001,
            spu_id: "ILO",
        },
        {
            first_name: "Samuel",
            middle_name: "Noel",
            last_name: "Torres",
            sm_number: 12235648,
            is_active: "yes",
            sdw_id: 900002,
            spu_id: "ZAM",
        },
        {
            first_name: "Cassandra",
            middle_name: "Faith",
            last_name: "Martinez",
            sm_number: 13235648,
            is_active: "no",
            sdw_id: 900003,
            spu_id: "MNL",
        },
        {
            first_name: "Nathan",
            middle_name: "Allan",
            last_name: "Ramos",
            sm_number: 14235648,
            is_active: "yes",
            sdw_id: 900004,
            spu_id: "CEB",
        },
        {
            first_name: "Bianca",
            middle_name: "Grace",
            last_name: "Gutierrez",
            sm_number: 15235648,
            is_active: "yes",
            sdw_id: 900005,
            spu_id: "DVO",
        },
    ]);

    const [socialDevWorkers, setSocialDevWorkers] = useState([
        {
            sdw_id: 900001,
            username: "gmadisonkelsey",
        },
        {
            sdw_id: 900002,
            username: "alexander.cortez",
        },
        {
            sdw_id: 900003,
            username: "rachelle.mendez",
        },
        {
            sdw_id: 900004,
            username: "marklouis_torres",
        },
        {
            sdw_id: 900005,
            username: "sophia.luna",
        },
    ]);

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

    const [currentSPU, setCurrentSPU] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [currentData, setCurrentData] = useState(allData);
    const [sortOrder, setSortOrder] = useState("desc");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        let filtered = [...allData];

        filtered = filtered.filter((client) => client.is_active === "yes");


        if (currentSPU !== "") {
            filtered = filtered.filter((client) => client.spu_id === currentSPU);
        }

        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((client) => {
                const fullName = `${client.first_name} ${client.middle_name} ${client.last_name}`.toLowerCase();
                const smNumberStr = client.sm_number.toString();
                return (
                    fullName.includes(query) ||
                    smNumberStr.includes(query)
                );
            });
        }

        if (sortBy === "name") {
            filtered.sort((a, b) => {
                const nameA = `${a.first_name} ${a.middle_name} ${a.last_name}`.toLowerCase();
                const nameB = `${b.first_name} ${b.middle_name} ${b.last_name}`.toLowerCase();
                return nameA.localeCompare(nameB);
            });
        } else if (sortBy === "sm_number") {
            filtered.sort((a, b) => a.sm_number - b.sm_number);
        }

        if (sortOrder === "desc") {
            filtered.reverse();
        }

        setCurrentData(filtered);
    }, [allData, currentSPU, sortBy, sortOrder, searchQuery]);


    return (
        <>
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
                                    <option value="sm_number">SM Number</option>
                                </select>

                                <button
                                    className="btn-outline font-bold-label"
                                    onClick={() => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))}>
                                    <div className="icon-static-setup order-button"></div>
                                </button>
                            </div>

                            <button className="btn-outline font-bold-label flex gap-4 whitespace-nowrap">
                                <p>+</p>
                                <p>New Case</p>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <div className="grid grid-cols-[2fr_1fr_2fr] items-center border-b border-gray-400 pb-2 mb-2">
                            <p className="font-bold-label ml-[20%]">Name</p>
                            <p className="font-bold-label text-center">CH Number</p>
                            <p className="font-bold-label text-center">SDW Assigned</p>
                        </div>

                        {currentData.map((client) => (
                            <ClientEntry
                                key={client.sm_number}
                                id={client.sm_number}
                                smNumber={client.sm_number}
                                firstName={client.first_name}
                                middleName={client.middle_name}
                                lastName={client.last_name}
                                chNumber={client.sm_number}
                                sdwAssigned={
                                    socialDevWorkers.find(w => w.sdw_id === client.sdw_id)?.username || "Unassigned"
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

export default HomeSDW