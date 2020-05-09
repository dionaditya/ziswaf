import React, { useContext } from "react";
import cx from "classnames";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { ReportContext } from "../../Controller";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import LaunchIcon from '@material-ui/icons/Launch';
import moment from 'moment';
import SelectWithSearch from '@/app/container/components/SelectWithSearch';
import MySelect from '@/app/container/components/MultipleColumnSelect';
import qs from 'qs';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      display: "flex",
      justifyContent: "flex-start",
    },
    contentTabs: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 15px",
      fontSize: 14,
      color: "#4A4A4A",
      cursor: "pointer",
      marginRight: 5,
    },
    tabActive: {
      borderBottom: "2px solid #00923F",
    },
    filterDate: {
      fontSize: 12,
      color: "#4A4A4A",
      cursor: "pointer",
      marginRight: 5,
      display: 'flex',
      alignItems: 'center'
    }
  })
);

const tabs = [
  {
    name: "Laporan General",
    link: "general",
  },
  {
    name: "Laporan Divisi",
    link: "division",
  },
  {
    name: "Laporan Keuangan & Barang",
    link: "finance",
  },
];

const TopNavigation = () => {
  const controller = useContext(ReportContext);
  const classes = useStyles();
  const dateSelected = controller.filterData['dateSelected'];
  const location = useLocation();
  const queryString: number = qs.parse(location.search, { delimiter: ';' });




  const formatDate = (date) => {
    return date ? (controller.role === 1 ? moment(date).format('MMM YYYY') : moment(date).format('DD/MM/YY')) : 0;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer>
          <GridItem
            xs={12}
            sm={6}
            md={6}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <div className={classes.tabs}>
              {tabs.map((tab) => (
                <div
                  className={cx(classes.contentTabs, {
                    [classes.tabActive]: controller.reportType === tab.link,
                  })}
                  onClick={() => controller.setReportType(tab.link)}
                >
                  {tab.name}
                </div>
              ))}
            </div>
          </GridItem>
          <GridItem
            xs={12}
            sm={6}
            md={6}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <GridContainer>
              <GridItem xs={12} sm={6} md={6} style={{ display: "flex", alignItems: 'center', justifyContent: "flex-end" }}>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <span className={classes.filterDate}>from  {formatDate(dateSelected['start_date'])}</span>
                  <span className={classes.filterDate}>to {formatDate(dateSelected['end_date'])}</span>
                </Box>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button
                    color="success"
                    style={{ backgroundColor: "#00923F", fontWeight: 800 }}
                    // disabled
                    onClick={() => controller.handleExportPdf()}
                  >
                    <LaunchIcon />
                    EXPORT TO PDF
                  </Button>
                </Box>
              </GridItem>
            </GridContainer>
          </GridItem>
          {queryString['?city'] === undefined ?
            <div /> :
            <GridItem xs={12} sm={12} md={12}>
              <Box display="flex" flexDirection="row" justifyContent="flex-end" style={{ marginTop: '20px' }}>
                <Box style={{ marginTop: '10px' }}>
                  <span style={{ fontSize: '14px', color: '#757575', fontWeight: 'bold', marginRight: '30px' }}>Unit Ma'had</span>
                </Box>
                <Box>
                  <MySelect
                    label={queryString['unit'] !== "Semua" ? queryString['unit'] : "Semua Unit Ma'had"}
                    disabled={true}
                    options={[]}
                    handleChange={(e) => { }}
                    checked={["1"]}
                  />
                </Box>
                <Box style={{ marginTop: '10px' }}>
                  <span style={{ fontSize: '14px', color: '#757575', fontWeight: 'bold', marginRight: '30px', marginLeft: '30px' }}>Kota</span>
                </Box>
                <Box>
                  <MySelect
                    label={queryString['?city'] !== "Semua" ? queryString['?city'] : "Semua Kota"}
                    options={[]}
                    disabled={true}
                    handleChange={(e) => { }}
                    checked={["1"]}
                  />
                </Box>
              </Box>
            </GridItem>}
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default TopNavigation;
