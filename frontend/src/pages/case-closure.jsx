import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signature from "../Components/Signature";
import { TextInput, TextArea } from "../Components/TextField";

function CaseClosure() {
    const [data, setData] = useState({
        form_num: "4",
        first_name: "Hepzhi-Bah",
        middle_name: "Gamac",
        last_name: "Tolentino",
        ch_number: "12356473",
        dob: "2000-01-10",
        religion: "Roman Catholic",
        address: "",
        spu: "FDQ",
        closure_date: "",
        reason_for_retirement: "",
        sm_notification: "",
        evaluation: "",
        recommendation: "",
    });

    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [dob, setDOB] = useState(data?.dob || "");
    const [religion, setReligion] = useState(data?.religion || "");
    const [address, setAddress] = useState(data?.address || "");
    const [spu, setSPU] = useState(data?.spu || "");
    const [closure_date, setClosureDate] = useState(data?.closure_date || "");

    return (
        <main className="flex max-w-7xl flex-col items-center justify-center gap-10 px-10">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">Case Closure Report</h3>

        </main>
    );
}

export default CaseClosure;
