import React from "react";

interface IPropsButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "reset" | "button";
  value?: string | string[] | number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<IPropsButton> = ({
  type,
  onClick,
  children,
  ...rest
}) => {
  return (
    <button type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "button"
};
