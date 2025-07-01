import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signature from "../Components/Signature";
import { TextInput, TextArea } from "../Components/TextField";

function ProgressReport() {
    const [data, setData] = useState({
        form_num: "2",
        first_name: "Hepzhi-Bah",
        middle_name: "Gamac",
        last_name: "Tolentino",
        ch_number: "12356473",
        dob: "2000-01-10",
        sponsor_name: "",
        sponsorship_date: "",
        subproject: "FDQ",
        date_accomplished: "",
        period_covered: "",
        sm_update: "",
        family_update: "",
        services_to_family: "",
        participation: "",
        know_sponsor: "",
        cooperative: "",
        writes_letters: "",
    });

    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [dob, setDOB] = useState(data?.dob || "");
    const [sponsor_name, setSponsorName] = useState(data?.sponsor_name || "");
    const [sponsorship_date, setSponsorshipDate] = useState(data?.sponsorship_date || "");
    const [subproject, setSubproject] = useState(data?.subproject || "");
    const [date_accomplished, setDateAccomplished] = useState(data?.date_accomplished || "");
    const [period_covered, setPeriodCovered] = useState(data?.period_covered || "");
    const [sm_update, setSMUpdate] = useState(data?.sm_update || "");
    const [family_update, setFamilyUpdate] = useState(data?.family_update || "");
    const [services_to_family, setServicesToFamily] = useState(data?.services_to_family || "");
    const [participation, setParticipation] = useState(data?.participation || "");
    const [know_sponsor, setKnowSponsor] = useState(data?.know_sponsor || "");
    const [cooperative, setCooperative] = useState(data?.cooperative || "");
    const [writes_letters, setWritesLetters] = useState(data?.writes_letters || "");

    return (
        <main className="flex max-w-7xl flex-col items-center justify-center gap-10 px-10">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">Individual Progress Report</h3>
        </main>
    );
}

export default ProgressReport;
