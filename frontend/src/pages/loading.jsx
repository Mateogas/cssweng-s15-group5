import { useEffect, useState } from 'react';

function Loading({ color = "red" }) {
    const colorMap = {
        green: "var(--color-green)",
        blue: "var(--color-blue)",
        red: "var(--color-primary)",
    };

    const ringColor = colorMap[color] || "var(--color-primary)";

    return <div className="w-full h-screen flex items-center justify-center bg-white gap-10">
        <p style={{ color: "var(--color-black)" }} className="header-main">
            Loading...
        </p>
        <div
            className="loader-conic"
            style={{
                background: `conic-gradient(${ringColor} 0deg 270deg, transparent 270deg 360deg)`
            }}
        ></div>
    </div>;
}

export default Loading;
