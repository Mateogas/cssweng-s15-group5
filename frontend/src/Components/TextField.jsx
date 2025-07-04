import React from "react";

export const TextInput = ({ label, value, setValue, handleChange, disabled = false }) => {
    return (
        <div className="flex items-center gap-10">
            <p className="label-base w-44">{label}</p>
            <input
                type="text"
                value={value}
                onChange={handleChange || ((e) => setValue?.(e.target.value))}
                disabled={disabled}
                className={`body-base text-input w-64 ${disabled ? "cursor-not-allowed bg-gray-200" : ""}`}
            />
        </div>
    );
};

export const DateInput = ({ label, value, setValue, disabled = false }) => {
    return (
        <div className="flex items-center gap-10">
            <p className="label-base w-44">{label}</p>
            <input
                type="date"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
                className={`body-base text-input w-64 ${disabled ? "cursor-not-allowed bg-gray-200" : ""}`}
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
    disabled = false,
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
                className={`text-area ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
            ></textarea>
        </section>
    );
};
