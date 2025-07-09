import React from "react";
import { useEffect, useRef, useState } from 'react';

export const TextInput = ({ label, value, setValue, handleChange, disabled = false }) => {
    return (
        <div className="flex items-center gap-16">
            <p className="label-base w-72">{label}</p>
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    handleChange?.(e);
                    setValue?.(e.target.value);
                }}
                disabled={disabled}
                className={`body-base text-input w-96 ${disabled ? "cursor-not-allowed bg-gray-200" : ""}`}
            />
        </div>
    );
};

export const DateInput = ({ label, value, setValue, handleChange, disabled = false }) => {
    return (
        <div className="flex items-center gap-16">
            <p className="label-base w-72">{label}</p>
            <input
                type="date"
                value={value}
                onChange={(e) => {
                    handleChange?.(e);
                    setValue?.(e.target.value);
                }}
                disabled={disabled}
                className={`body-base text-input w-96 ${disabled ? "cursor-not-allowed bg-gray-200" : ""}`}
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
    showTime = true,
    disabled = false,
}) => {

    const [savedTime, setSavedTime] = useState(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (value === '') return; // don't show message for initial empty state

        const now = new Date();
        const timeString = now.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        });
        setSavedTime(`Saved at ${timeString}`);

        if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => setSavedTime(null), 3000);

        return () => clearTimeout(timeoutRef.current);
    }, [value]);

    return (
        <section className="flex w-full flex-col gap-5">
            <h4 className="header-sm">{label}</h4>
            {sublabel ? (
                <p className="label-base">
                    {sublabel}
                    {description ? (
                        <span className="body-base ml-16">{description}</span>
                    ) : null}
                </p>
            ) : null}
            <textarea
                value={value}
                onChange={handleChange || ((e) => setValue?.(e.target.value))}
                className={`text-area h-32 ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
            ></textarea>
            
            {showTime && savedTime && (
                <p className="text-sm self-end text-color-muted mt-1">{savedTime}</p>
            )}
        </section>
    );
};
