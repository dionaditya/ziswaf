import React from "react";

interface IPropsTextarea
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange: (event: any) => void;
}

export const Textarea: React.FC<IPropsTextarea> = ({
  children,
  onChange,
  ...rest
}) => {
  return (
    <textarea onChange={onChange} {...rest}>
      {children}
    </textarea>
  );
};
