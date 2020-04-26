import React from "react";

interface IPropsCheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  checked: boolean;
  value?: string | string[] | number;
  onChange: (event: any) => void;
}

export const Checkbox: React.FC<IPropsCheckbox> = ({
  type,
  value,
  onChange,
  checked
}) => {
  return (
    <input checked={checked} type={type} value={value} onChange={onChange} />
  );
};

Checkbox.defaultProps = {
  type: "checkbox"
};
