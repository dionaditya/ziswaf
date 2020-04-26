import React from "react";
import { Link } from "react-router-dom";
import BackNav from "@/app/container/components/BackNav";

const ContentBar: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <div className="card-content" style={{ background: "#6DB400" }}>
        <div className="row">
          <Link to="/dashboard">
            <div className="white-text ml-1">
              <BackNav />
            </div>
          </Link>
        </div>
        <div className="row">
          <h5 className="white-text ml-1 font-weight-700">Input Madrasah</h5>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContentBar;
