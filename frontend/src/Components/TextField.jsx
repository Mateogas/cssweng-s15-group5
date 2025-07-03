import React from "react";

export const TextInput = ({ label, value, setValue }) => {
    return (
        <div className="flex items-center gap-10">
            <p className="label-base w-44">{label}</p>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="body-base text-input w-64"
            />
        </div>
    );
};

export const TextArea = ({
    label,
    sublabel,
    description,
    value,
    setValue,
    handleChange,
}) => {
    return (
        <section className="flex w-full flex-col gap-3">
            <h4 className="header-sm">{label}</h4>
            {sublabel ? (
                <p className="label-base">
                    {sublabel}
                    {description ? (
                        <span className="body-base ml-1">{description}</span>
                    ) : null}
                </p>
            ) : null}
            <textarea
                value={value}
                onChange={handleChange || ((e) => setValue?.(e.target.value))}
                className="text-area"
            ></textarea>
        </section>
    );
};
