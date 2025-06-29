import React from "react"

const TextArea = ({ label, value, setValue}) => {
    return (
        <section className="flex w-full flex-col gap-3">
            <h4 className="header-sm">{label}</h4>
            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="text-area"
            ></textarea>
        </section>
    )
}

export default TextArea;