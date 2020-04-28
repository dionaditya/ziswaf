import React from "react";
import formatPrice, { formatNumbers } from "@/app/infrastructures/misc/Utils";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    rows: {
      width: "auto",
      margin: 5,
    },
    label: {
      color: "#FFFFFF",
    },
    textRed: {
      color: "#F32835",
    },
    textGreen: {
      color: "#00ED42",
    },
  })
);
/**
 * Style
 */
const textTitleCard = {
  fontFamily: "roboto",
  fontSize: 14,
  color: "#FFF",
};

const SummaryDashboardReport = ({ summary, dataCompare }) => {
  const classes = useStyles();

  return (
    <GridContainer style={{ marginTop: 10 }}>
      <GridItem xs={12} sm={12} md={4} style={{ marginTop: 10 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "8rem",
            padding: 10,
            borderRadius: 5,
            backgroundColor: "#00923f",
          }}
          className="card valign-wrapper white-text text-center center-align"
        >
          <span style={textTitleCard}>Total Donasi Terkumpul</span>
          <h5
            className="white-text"
            style={{
              margin: 10,
              fontSize: 28,
              fontWeight: "bold",
              fontFamily: "roboto",
              color: "#FFFFFF",
            }}
          >
            {formatPrice(summary.total)}
          </h5>
          <div>
            {!dataCompare.totalUp ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  className="material-icons prefix red-text"
                  style={{ color: "#F20A18" }}
                >
                  keyboard_arrow_down
                </i>
                <span style={{ marginLeft: 10, color: "#FFF" }}>
                  {dataCompare.totalDown ? dataCompare.totalDown : 0} %
                </span>
              </div>
            ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="material-icons prefix"
                    style={{ color: "#00ED42" }}
                  >
                    keyboard_arrow_up
                </i>
                  <span style={{ marginLeft: 10, color: "#FFF" }}>
                    {!dataCompare.totalUp ? 0 : dataCompare.totalUp} %
                </span>
                </div>
              )}
          </div>
        </div>
      </GridItem>
      <GridItem xs={12} sm={12} md={8}>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4} style={{ marginTop: 10 }}>
            <div
              className="card accent-4 valign-wrappertext-center center-align"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "8rem",
                padding: 10,
                borderRadius: 5,
                backgroundColor: "#2C39C2",
              }}
            >
              <span style={textTitleCard}>Total Donasi Terinput</span>
              <h5
                style={{
                  margin: 10,
                  fontSize: 28,
                  fontWeight: "bold",
                  fontFamily: "roboto",
                  color: "#FFF",
                }}
              >
                {formatNumbers(summary.totalRowCount)}
              </h5>
              <div className="col">
                {!dataCompare.countUp ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className="material-icons prefix lighten-1"
                      style={{ color: "#F32835" }}
                    >
                      keyboard_arrow_down
                    </i>
                    <span style={{ color: "#F32835", marginLeft: 10 }}>
                      {formatNumbers(dataCompare.countDown)}{" "}
                    </span>
                  </div>
                ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <i
                        className="material-icons prefix lighten-1"
                        style={{ color: "#00ED42" }}
                      >
                        keyboard_arrow_up
                    </i>
                      <span style={{ color: "#00ED42", marginLeft: 10 }}>
                        {formatNumbers(dataCompare.countUp)}{" "}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </GridItem>
          <GridItem xs={6} sm={6} md={4} style={{ marginTop: 10 }}>
            <div
              className="card valign-wrappertext-center center-align"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "8rem",
                padding: 10,
                borderRadius: 5,
                backgroundColor: "#FFA500",
              }}
            >
              <span style={textTitleCard}>Total Donatur Terinput</span>
              <h5
                className="white-text"
                style={{
                  margin: 10,
                  fontSize: 28,
                  fontWeight: "bold",
                  fontFamily: "roboto",
                  color: "#FFFFFF",
                }}
              >
                {formatNumbers(summary.totalRowDonorCount)}
              </h5>
              <div className="col">
                {!dataCompare.donorUp ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className="material-icons prefix lighten-1"
                      style={{ color: "#F32835" }}
                    >
                      keyboard_arrow_down
                    </i>
                    <span style={{ color: "#F32835", marginLeft: 10 }}>
                      {formatNumbers(dataCompare.donorDown)}{" "}
                    </span>
                  </div>
                ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <i
                        className="material-icons prefix lighten-1"
                        style={{ color: "#00ED42" }}
                      >
                        keyboard_arrow_up
                    </i>
                      <span style={{ color: "#00ED42", marginLeft: 10 }}>
                        {formatNumbers(dataCompare.donorUp)}{" "}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </GridItem>
          <GridItem xs={6} sm={6} md={4} style={{ marginTop: 10 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "8rem",
                padding: 10,
                borderRadius: 5,
                backgroundColor: "#32CD32",
              }}
            >
              <span style={textTitleCard}>Total Donatur Baru</span>
              <h5
                style={{
                  margin: 10,
                  fontSize: 28,
                  fontWeight: "bold",
                  fontFamily: "roboto",
                  color: "#FFFFFF",
                }}
              >
                {formatNumbers(summary.totalRowNewDonorCount)}
              </h5>
              <div className="col">
                {!dataCompare.newDonorUp ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className="material-icons prefix lighten-1"
                      style={{ color: "#F32835" }}
                    >
                      keyboard_arrow_down
                    </i>
                    <span style={{ color: "#F32835", marginLeft: 10 }}>
                      {formatNumbers(dataCompare.newDonorDown)}{" "}
                    </span>
                  </div>
                ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <i className="material-icons prefix green-text lighten-1"
                        style={{ color: "#00ED42" }}
                      >
                        keyboard_arrow_up
                    </i>
                      <span style={{ color: "#00ED42", marginLeft: 10 }}>
                        {formatNumbers(dataCompare.newDonorUp)}{" "}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default SummaryDashboardReport;
