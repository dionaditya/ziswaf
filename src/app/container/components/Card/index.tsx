import React from "react";

interface IPropsCard {
  title: string;
  body: string;
}

export const Card: React.FC<IPropsCard> = ({ children, title, body }) => {
  return (
    <div className="card animate fadeLeft">
      <div className="card-content">
        <h4 className="card-title">{title}</h4>
        <div className="row">
          <div className="col s12 m6 6">
            <p className="mb-2">{body}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
