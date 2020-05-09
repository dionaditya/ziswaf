import React from "react";
import { ChartCategories } from "../Chart";
import formatPrice, { formatNumbers, separatorNumbers } from "@/app/infrastructures/misc/Utils";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";

const colorsCategoryDonatur = ["#3ACA60", "#FFA500", "#1976D2"];
const stepsTytle = {
  fontSize: 22,
  fontWeight: 800,
  color: "#3c4144",
  fontFamily: "roboto",
  marginBottom: 10,
};
const stepProgress = {
  fontSize: 16,
  color: "#6a708b",
  fontFamily: "roboto",
};

const totalsDonation = {
  fontSize: 14,
  color: "#6a708b",
  fontFamily: "roboto",
};

const totalsNominalDonation = {
  fontSize: 18,
  fontWeight: 800,
  color: "#6a708b",
  fontFamily: "roboto",
};

const CardPrognosis = ({ value }) => {
  const {
    name,
    totalPercentage,
    totalRowCount,
    totals,
    data,
    category,
    index,
  } = value;
  return (
    <div className="col s4">
      <div
        className="card cursor-pointer"
        style={{
          borderRadius: 10,
          boxShadow: "none",
          border: "1px solid #e6e6e6",
          padding: "10px 15px",
          height: "auto",
        }}
      >
        <div style={stepsTytle}>{name}</div>
        <span style={stepProgress}>
          Pencapaian Prognosis:
          <span style={{ fontWeight: "bold" }}>
            {" "}
            {totalPercentage ? separatorNumbers(totalPercentage) : 0}%{" "}
          </span>
        </span>
        <div
          style={{
            margin: "5px 0px",
            height: 5,
            borderRadius: 2,
            width: `100%`,
            backgroundColor: "#EBEBEB",
          }}
        >
          <div
            style={{
              height: 5,
              borderRadius: 2,
              width: `${totalPercentage > 100 ? 100 : totalPercentage}%`,
              backgroundColor: `${colorsCategoryDonatur[index]}`,
            }}
          ></div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={totalsDonation}>Total Donasi</span>
            <span style={totalsNominalDonation}>
              {formatNumbers(totalRowCount)}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={totalsDonation}>Total Dana</span>
            <span style={totalsNominalDonation}>{formatPrice(totals)}</span>
          </div>
        </div>
        <ChartCategories
          type="line"
          width="100%"
          series={data}
          categories={category}
          colors={[colorsCategoryDonatur[index]]}
        />
      </div>
    </div>
  );
};
const SummaryByCategory = ({
  summary,
  dataRetail,
  categoriesRetail,
  dataUpz,
  categoriesUpz,
  dataCorporate,
  categoriesCorporate,
}) => {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
        <CardPrognosis
          value={{
            name: "Retail",
            totalPercentage: summary.totalPersentRetail,
            totalRowCount: summary.totalRetailRowCount,
            totals: summary.totalRetail,
            data: dataRetail,
            category: categoriesRetail,
            index: 0,
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <CardPrognosis
          value={{
            name: "Corporate",
            totalPercentage: summary.totalPersentCorporate,
            totalRowCount: summary.totalCorporateRowCount,
            totals: summary.totalCorporate,
            data: dataCorporate,
            category: categoriesCorporate,
            index: 1,
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <CardPrognosis
          value={{
            name: "UPZ",
            totalPercentage: summary.totalPersentUpz,
            totalRowCount: summary.totalUpzRowCount,
            totals: summary.totalUpz,
            data: dataUpz,
            category: categoriesUpz,
            index: 2,
          }}
        />
      </GridItem>
    </GridContainer>
  );
};

export default SummaryByCategory;
