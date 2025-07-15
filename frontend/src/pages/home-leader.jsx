import { useState, useEffect } from "react";
import SideBar from "../Components/SideBar";
import WorkerEntry from "../Components/WorkerEntry";
import RegisterWorker from "../Components/RegisterWorker";
import {
  fetchHeadViewBySpu,
  fetchHeadViewBySupervisor,
  fetchSession
} from "../fetch-connections/account-connection";

function HomeLeader() {
  const [allData, setAllData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentSPU, setCurrentSPU] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState(null);

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
    const loadUserAndEmployees = async () => {
      const sessionData = await fetchSession();
      console.log("Session:", sessionData);
      setUser(sessionData.user);

      let employees = [];

      if (sessionData.user?.role === "head") {
        const spuToUse = currentSPU;
        console.log("Head view SPU:", spuToUse);
        if (spuToUse) {
          const data = await fetchHeadViewBySpu(spuToUse);
          employees = data.employees || [];
        }
      } else if (sessionData.user?.role === "super") {
        const data = await fetchHeadViewBySupervisor(sessionData.user._id);
        employees = data || [];
      }

      console.log("Fetched employees:", employees);
      setAllData(employees);
    };

    loadUserAndEmployees();
  }, [currentSPU, isRegisterOpen]);

  useEffect(() => {
    let filtered = [...allData];

    if (currentSPU !== "") {
      filtered = filtered.filter((w) => w.spu_id === currentSPU);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((w) => {
        const name = `${w.name}`.toLowerCase();
        const idStr = w.sdw_id?.toString() || "";
        return name.includes(query) || idStr.includes(query);
      });
    }

    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "sdw_id") {
      filtered.sort((a, b) => a.sdw_id - b.sdw_id);
    } else if (sortBy === "role") {
      filtered.sort((a, b) => a.role.localeCompare(b.role));
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
          console.log("New worker added:", newWorker);
        }}
        projectLocations={projectLocation}
      />

      <div className="fixed top-0 left-0 right-0 z-50 w-full max-w-[1280px] mx-auto flex justify-between items-center py-5 px-8 bg-white">
        <a href="/home-leader" className="main-logo main-logo-text-nav">
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
          <h1 className="header-main">Teams</h1>
          <div className="flex justify-between gap-10">
            <div className="flex gap-5 justify-between items-center w-full">
              <div className="flex gap-5 w-full">
                {user?.role == "head" && (
                  <select
                    className="text-input font-label max-w-[30rem]"
                    value={currentSPU}
                    onChange={(e) => setCurrentSPU(e.target.value)}
                  >
                    <option value="">Select SPU</option>
                    {projectLocation.map((spu) => (
                      <option key={spu.projectCode} value={spu.projectCode}>
                        {spu.name} ({spu.projectCode})
                      </option>
                    ))}
                  </select>
                )}

                <select
                  className="text-input font-label max-w-[20rem]"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="name">Name</option>
                  <option value="sdw_id">SDW ID</option>
                  <option value="role">Role</option>
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

              {user?.role == "head" && (
                <button
                  className="btn-outline font-bold-label flex gap-4 whitespace-nowrap"
                  onClick={() => setIsRegisterOpen(true)}
                >
                  <p>+</p>
                  <p>Add Account</p>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col w-full gap-3">
            <div className="grid grid-cols-[2fr_1fr_2fr] items-center border-b border-gray-400 pb-2 mb-2">
              <p className="font-bold-label ml-[20%]">Worker</p>
              <p className="font-bold-label text-center">Type</p>
              <p className="font-bold-label text-center">SPU</p>
            </div>

            {user?.role === "head" && currentSPU === "" ? (
              <p className="font-bold-label mx-auto">
                No Sub-Project Unit Selected
              </p>
            ) : currentData.length === 0 ? (
              <p className="font-bold-label mx-auto">No Workers Found</p>
            ) : (
              currentData.map((worker) => (
                <WorkerEntry
                  key={worker._id}
                  id={worker.id}
                  sdw_id={worker.sdw_id}
                  name={worker.name}
                  role={worker.role}
                  spu_id={
                    projectLocation.find(
                      (spu) => spu.projectCode === worker.spu_id
                    )?.name || "Unassigned"
                  }
                />
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default HomeLeader;
