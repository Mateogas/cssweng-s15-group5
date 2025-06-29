import React from "react";

const Signature = ({ label, signer }) => {
    return (
        <div className="flex w-96 flex-col gap-6">
            <h4 className="header-sm">{label}</h4>
            <div className="w-full gap-4">
                <h4 className="header-sm">
                    ___________________________________
                </h4>
                <div className="flex flex-col items-center gap-1">
                    <p className="label-base">{signer}</p>
                    <p className="body-base">(Signature over Printed Name)</p>
                </div>
            </div>
        </div>
    );
};

export default Signature;
