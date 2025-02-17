"use client"; // クライアントコンポーネントにする

import React from "react";
import "./button.scss";

const Button = ({ label, onClick }: { label: string; onClick: (event: React.MouseEvent<HTMLButtonElement>) => void }) => {
    return (
        <button className="btn" onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
