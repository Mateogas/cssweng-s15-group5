// SideBar.jsx
import React from "react";
import { useState } from "react";

import SideItem from "./SideItem";
import ProfileModal from "./ProfileModal";

export default function SideBar() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <>
            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
            />
            <div className="side-nav fixed z-20">
                <SideItem
                    href="/home-sdw"
                    iconClass="home-button"
                    label="Home"
                    isActive={false}
                />

                <SideItem
                    href="/"
                    iconClass="progress-button"
                    label="Progress"
                    isActive={false}
                />

                <SideItem
                    href="/home-admin"
                    iconClass="family-button"
                    label="Team"
                    isActive={false}
                />

                <SideItem
                    href="/archive"
                    iconClass="archive-button"
                    label="Archive"
                    isActive={false}
                />

                <button className={`side-item`}
                    onClick={() => setIsProfileOpen(true)}>
                    <div className={`side-icon-setup identifying-button`}></div>
                    <p>Account</p>
                </button>
            </div>
        </>
    );
}
