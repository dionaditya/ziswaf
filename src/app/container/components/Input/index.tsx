import React from "react";

interface IPropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (event: any) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

export const Input: React.FC<IPropsInput> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  ...rest
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

Input.defaultProps = {
  type: "text"
};
