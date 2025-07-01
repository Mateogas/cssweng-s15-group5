import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signature from "../../Components/Signature";
import { TextInput, TextArea } from "../../Components/TextField";

function CorrespondenceForm() {
    const [data, setData] = useState({
        form_num: "7",
        first_name: "Hephzi-Bah",
        middle_name: "Gamac",
        last_name: "Tolentino",
        ch_number: "12356473",
        dob: "2000-01-10",
        school: "",
        address: "",
        sponsor_name: "",
        subproject: "",
        date_of_sponsorship: "",
    });

    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [dob, setDOB] = useState(data?.dob || "");
    const [school, setSchool] = useState(data?.school || "");
    const [address, setAddress] = useState(data?.address || "");
    const [sponsor_name, setSponsorName] = useState(data?.sponsor_name || "");
    const [subproject, setSubproject] = useState(data?.subproject || "");
    const [date_of_sponsorship, setDateOfSponsorship] = useState(data?.date_of_sponsorship || "");
    
    return (
        <main className="flex max-w-7xl flex-col items-center justify-center gap-10 px-10">
            <h4 className="header-sm self-end">Form #: {form_num}</h4>
            <h3 className="header-md">SMs, Families, and SHGs Intervention Plan</h3>
        </main>
    );
}
export default CorrespondenceForm;