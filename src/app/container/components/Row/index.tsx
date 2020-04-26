import React from "react";

export const Row = ({ children, rest }) => (
  <div className="row" {...rest}>
    {children}
  </div>
);
