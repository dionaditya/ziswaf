import React from "react";

export const Section = ({ children, rest }) => (
  <section {...rest}>{children}</section>
);
