import React from "react";
import formatPrice from "@/app/infrastructures/misc/Utils";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";

const DonationTypeChartLegend = ({ series, selected, onClick, colors }) => {
  const findData = (serie) => {
    const check = selected.some((select) => select.name === serie.name);
    return check;
  };
  return (
    <>
      {series.map((value, i) => {
          return (
            <GridItem xs={12} sm={12} md={4} style={{marginTop: 5, marginBottom: 5}}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 15px",
                  cursor: "pointer",
                  border: `1px solid ${
                    findData(value) ? colors[i] : "#e2e2e2"
                  }`,
                  borderRadius: "3px",
                  boxShadow: "none",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  onClick(e, value);
                }}
              >
                <div>
                  <div
                    className="legend"
                    style={{
                      width: "15px",
                      height: "15px",
                      border: `2px solid ${colors[i]}`,
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div
                  style={{ flex: 1, marginLeft: 10, flexDirection: "column" }}
                >
                  <div style={{ margin: 0 }}>
                    <span style={{ fontSize: 12 }}>
                      {value.name}
                    </span>
                  </div>
                  <div style={{ margin: 0 }}>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#454545",
                      }}
                    >
                      {formatPrice(value.total)}
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: "24px", color: "#647088" }}>
                  {value.compareData ? value.compareData : 0}%
                </div>
              </div>
            </GridItem>
          );
      })}
    </>
  );
};

export default DonationTypeChartLegend;
