import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Components/SideBar";
import WorkerEntry from "../Components/WorkerEntry";
import ClientEntry from "../Components/ClientEntry";

import { fetchSession } from "../fetch-connections/account-connection";
import { fetchAllSDWs } from "../fetch-connections/account-connection";
import { fetchAllCases } from "../fetch-connections/case-connection";
import { fetchAllSpus } from "../fetch-connections/spu-connection";

export default function SpuPage() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [sdws, setSdws] = useState([]);
    const [cases, setCases] = useState([]);
    const [spus, setSpus] = useState([]);
    const [loading, setLoading] = useState(true);

    const [collapsedSpus, setCollapsedSpus] = useState({});

    useEffect(() => {
        const loadData = async () => {
            try {
                const sessionData = await fetchSession();
                setUser(sessionData?.user || null);

                const [allSpus, allSdws, allCases] = await Promise.all([
                    fetchAllSpus(),
                    fetchAllSDWs(),
                    fetchAllCases(),
                ]);

                setSpus(allSpus || []);
                setSdws(allSdws || []);
                setCases(allCases || []);
            } catch (err) {
                console.error("Error loading SPU data page:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    console.log(spus, sdws, cases);

    const toggleSpu = (id) => {
        setCollapsedSpus((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };


    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 w-full max-w-[1280px] mx-auto flex justify-between items-center py-5 px-8 bg-white">
                <a href="/" className="main-logo main-logo-text-nav">
                    <div className="main-logo-setup folder-logo"></div>
                    <div className="flex flex-col">
                        <p className="main-logo-text-nav-sub mb-[-1rem]">Unbound Manila Foundation Inc.</p>
                        <p className="main-logo-text-nav">Case Management System</p>
                    </div>
                </a>
            </div>

            <main className="min-h-[calc(100vh-4rem)] w-full flex mt-[9rem]">
                <SideBar user={user} />

                <div className="flex flex-col w-full gap-10 ml-[15rem] px-8 pb-20">
                    <h1 className="header-main">SPU Overview</h1>

                    {loading ? (
                        <p className="font-label">Loading SPU data...</p>
                    ) : (
                        spus.map((spu) => {
                            const spuWorkers = sdws.filter((worker) => worker.spu_id === spu.spu_name);
                            const spuCases = cases.filter((c) => c.spuObjectId === spu._id);
                            const isCollapsed = collapsedSpus[spu._id];

                            console.log("SPU", spu);
                            console.log("sdw", spuWorkers);
                            console.log("cases", spuCases);

                            return (
                                <div
                                    key={spu._id}
                                    className="border border-gray-300 rounded-lg shadow-sm p-6 mb-10"
                                >
                                    {/* Header Row */}
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <h2 className="header-sub">{spu.spu_name}</h2>
                                            <p className="font-label">
                                                {spuWorkers.length} worker(s), {spuCases.length} case(s)
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => toggleSpu(spu._id)}
                                            className={`icon-button-setup chevron-button ${isCollapsed ? "" : "rotate"}`}
                                            aria-label="Toggle SPU content"
                                        />
                                    </div>

                                    {/* Collapsible Content */}
                                    <div className={`transition-all duration-300 overflow-hidden ${isCollapsed ? "max-h-0" : "max-h-[1000px]"}`}>
                                        {/* Workers */}
                                        <div className="mb-6">
                                            <h3 className="font-bold-label mb-2">Workers:</h3>
                                            {spuWorkers.length === 0 ? (
                                                <p className="font-label">No workers assigned.</p>
                                            ) : (
                                                spuWorkers.map((worker) => (
                                                    <WorkerEntry
                                                        key={worker._id}
                                                        id={worker._id}
                                                        name={`${worker.first_name} ${worker.last_name}`}
                                                        role={worker.role}
                                                        spu_id={worker.spu_id}
                                                    />
                                                ))
                                            )}
                                        </div>

                                        {/* Cases */}
                                        <div>
                                            <h3 className="font-bold-label mb-2">Cases:</h3>
                                            {spuCases.length === 0 ? (
                                                <p className="font-label">No cases recorded.</p>
                                            ) : (
                                                spuCases.map((client) => (
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
                                        </div>
                                    </div>
                                </div>
                            );
                        })

                    )}
                </div>
            </main>
        </>
    );
}
