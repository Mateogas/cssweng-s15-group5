import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signature from "../../Components/Signature";
import TextArea from "../../Components/TextArea";

function CounsellingForm() {
    const [data, setData] = useState({
        form_num: "4",
        first_name: "Hephzi-Bah",
        middle_name: "Gamac",
        last_name: "Tolentino",
        ch_number: "12356473",
        grade_year_level: "",
        school: "",
        address: "",
        subproject: "",
        area_self_help: "",
        counselling_date: "",
    });

    const [last_name, setLastName] = useState(data?.last_name || "");
    const [middle_name, setMiddleName] = useState(data?.middle_name || "");
    const [first_name, setFirstName] = useState(data?.first_name || "");
    const [ch_number, setCHNumber] = useState(data?.ch_number || "");
    const [form_num, setFormNum] = useState(data?.form_num || "");
    const [grade_year_level, setGradeYearLevel] = useState(
        data?.grade_year_level || "",
    );
    const [school, setSchool] = useState(data?.school || "");
    const [address, setAddress] = useState(data?.address || "");
    const [subproject, setSubproject] = useState(data?.subproject || "");
    const [area_self_help, setAreaSelfHelp] = useState(
        data?.area_self_help || "",
    );
    const [counselling_date, setCounsellingDate] = useState(
        data?.counselling_date || "",
    );

    return (
        <main>
            
        </main>
    );
}
 export default CounsellingForm;