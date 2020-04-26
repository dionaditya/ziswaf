import React from "react";

interface IPropsRadio extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  value?: string | string[] | number;
  onChange: (value: any) => void;
}

export const Radio: React.FC<IPropsRadio> = ({ type, value, onChange }) => {
  return <input type={type} value={value} onChange={onChange} />;
};

Radio.defaultProps = {
  type: "radio"
};
