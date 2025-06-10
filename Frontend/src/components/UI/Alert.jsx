import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";


const Alert = ({ type = "success", message, onClose }) => {
    const bgColor = {
        success: "bg-green-100 border-green-400 text-green-700",
        error: "bg-red-100 border-red-400 text-red-700",
        warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
        info: "bg-blue-100 border-blue-400 text-blue-700",
    };

    return (
        <div
            className={`${bgColor[type]} border px-4 py-3 rounded relative mb-4`}
            role="alert"
        >
            <span className="block sm:inline">{message}</span>
            {onClose && (
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <XMarkIcon className="h-5 w-5 cursor-pointer" onClick={onClose} />
                </span>
            )}
        </div>
    );
};

export default Alert;
