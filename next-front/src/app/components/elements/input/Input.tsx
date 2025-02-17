"use client";
import React from "react";

type InputFieldProps = {
  label: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: { value: string | number; label: string }[];
};

const InputField: React.FC<InputFieldProps> = ({ label, type = "text", value, onChange, options }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      {options ? (
        <select value={value} onChange={onChange}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default InputField;
