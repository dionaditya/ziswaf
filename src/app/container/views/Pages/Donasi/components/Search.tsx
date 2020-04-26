import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import ModalFilter from "./ModalFilter";
import { DonationContext } from '../Controller';
import MySelect from '@/app/container/components/MultipleColumnSelect';
import { DonationTableColumns } from '@/domain/entities/AllOptions';
import GridContainer from '@/app/container/commons/Grid/GridContainer';
import Button from "@/app/container/commons/CustomButtons/Button.tsx"
import GridItem from '@/app/container/commons/Grid/GridItem';
import IconButton from "@material-ui/core/IconButton";
import { Box, makeStyles, Theme, createStyles, Paper, Typography, useMediaQuery } from '@material-ui/core';
import classes from '*.module.css';
import { Search, Add } from '@material-ui/icons';
import SearchInput from '@/app/container/commons/SearchInput';
import FilterListIcon from "@material-ui/icons/FilterList";
import ButtonDrop from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const listColumnOptions = DonationTableColumns.map(val => {
  return {
    name: val[0],
    label: val[1]
  }
})


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: "#ffff",
    },
    loadingReset: {
      color: "#00923F",
    },
    wrapper: {
      width: "100%",
      minWidth: "100%",
    },
    container: {
      padding: "0px 0px",
    },
    columns: {
      marginRight: "6px",
    },
    title: {
      fontWeight: "bold",
    },
    wrapper_menu: {
      display: "grid",
      gridTemplateColumns: "0.5fr 1fr",
      minWidth: "100%",
    },
  })
);



export const SearchDonation: React.FC<{}> = () => {
  const controller = useContext(DonationContext)
  const [showModal, setShowModal] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const xsmall = useMediaQuery("(min-width: 300px)" && "(max-width: 700px");
  const medium = useMediaQuery("(min-width: 701px)");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  const handleSearchFunc = (e) => {
    controller.eventSubmit(e)
  };


  const handleOpen = () => {
    setOpen(true);
    controller.fetchSchool()
    controller.fetchRegency()
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    // <React.Fragment>
    //   <GridContainer>
    //     <GridItem xs={12} sm={12} md={12}>
    //       <div className="row">
    //         <div className="col s12 l12 m12">
    //           <ModalFilter showModal={open} setShowModal={handleClose} />
    //           <div style={{
    //             padding: '20px 20px'
    //           }}>
    //             <div style={{ background: "#f7f9fa" }}>
    //               {/* <div className="row"> */}
    //               <GridItem xs={12} sm={12} md={12}>
    //                 <Box display="flex" justifyContent="center">
    //                   <GridItem xs={12} sm={12} md={3}>
    //                     <div className="col s12 l2 m2" style={{ padding: "0px 12px" }}>
    //                       <Button
    //                         node="button"
    //                         style={{
    //                           color: "#3A3B3F",
    //                           background: "#ffffff"
    //                         }}
    //                         // onClick={e => setShowModal(!showModal)}
    //                         onClick={handleOpen}
    //                       >
    //                         <div style={{
    //                           display: 'flex',
    //                           flexDirection: 'row'
    //                         }}>
    //                           <i className="material-icons prefix">filter_list</i>
    //                           <span className="ml-4">Filter</span>
    //                         </div>
    //                       </Button>
    //                     </div>
    //                   </GridItem>
    //                   <GridItem xs={12} sm={12} md={9}>
    //                     <div
    //                       className="Input-rounded col s12 l10 m10 white"
    //                       style={{ padding: "0px 12px", display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    //                     >
    //                       <i className="material-icons prefix">search</i>
    //                       <input
    //                         id="search"
    //                         name="search"
    //                         type="text"
    //                         placeholder="Cari Donasi"
    //                         onChange={e => {
    //                           controller.setFilterParam(prevState => ({
    //                             ...prevState,
    //                             search: e.target.value
    //                           }))
    //                         }}
    //                         onKeyPress={e => controller.eventSubmit(e)}
    //                       />
    //                     </div>
    //                   </GridItem>
    //                 </Box>
    //                 <GridContainer>
    //                   <GridItem xs={12} sm={12} md={8} >
    //                     <h2>Daftar Donasi</h2>
    //                   </GridItem>
    //                 </GridContainer>
    //                 <GridContainer>
    //                   <GridItem xs={12} sm={1} md={1}>
    //                     <h5>Column to Display</h5>
    //                   </GridItem>
    //                   <GridItem xs={12} sm={5} md={2}>
    //                     <MySelect
    //                       label={`${controller.displayColumns.data.length} to ${DonationTableColumns.length} column`}
    //                       options={listColumnOptions}
    //                       handleChange={e => controller.handleSelectedColumn(e)}
    //                       checked={controller.displayColumns.data}
    //                     />
    //                   </GridItem>
    //                   <GridItem xs={12} sm={6} md={8} >
    //                     <Box display="flex" flexDirection="row" justifyContent="flex-end">
    //                       <Button>
    //                         <div style={{
    //                           display: 'flex',
    //                           flexDirection: 'row'
    //                         }}>
    //                           <i className="material-icons prefix">filter_list</i>
    //                           <span className="ml-4">Filter</span>
    //                         </div>
    //                       </Button>
    //                     </Box>
    //                   </GridItem>
    //                 </GridContainer>
    //               </GridItem>
    //               {/* </div>
    //               <div className="row">
    //                 <div className="col s12 l12 m12">
    //                   <h5 className="black-text" style={{ fontWeight: "bold" }}>
    //                     Daftar Donasi
    //               </h5>
    //                 </div>
    //               </div>
    //               <div className="row">
    //                 <div className="col s6 valign-wrapper center-align">
    //                   <div className="col">
    //                     column to display
    //              </div>
    //                   <div className="col valign-wrapper center-align">
    //                     <MySelect
    //                       label={`${controller.displayColumns.data.length} to ${DonationTableColumns.length} column`}
    //                       options={listColumnOptions}
    //                       handleChange={e => controller.handleSelectedColumn(e)}
    //                       checked={controller.displayColumns.data}
    //                     />
    //                   </div>
    //                 </div> */}
    //               {/* <div className="col s12 l12 m12">
    //             <Dropdown
    //               style={{ color: "#6DB400" }}
    //               options={{
    //                 alignment: "right",
    //                 autoTrigger: true,
    //                 closeOnClick: true,
    //                 constrainWidth: true,
    //                 container: null,
    //                 coverTrigger: true,
    //                 hover: false,
    //                 inDuration: 150,
    //                 onCloseEnd: null,
    //                 onCloseStart: null,
    //                 onOpenEnd: null,
    //                 onOpenStart: null,
    //                 outDuration: 250
    //               }}
    //               trigger={
    //                 <Button
    //                   node="button"
    //                   className="right"
    //                   style={{
    //                     background: "#6DB400"
    //                   }}
    //                   waves="light"
    //                 >
    //                   <Icon right>expand_more</Icon>
    //                   Input Donasi
    //                   </Button>
    //               }
    //             >
    //               <Link to="/retail/donor">Input Retail</Link>
    //               <Link to="/corporate/donor">Input Corporate</Link>
    //               <Link to="/upz">Input Upz</Link>
    //             </Dropdown>
    //           </div> */}
    //               {/* </div> */}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </GridItem>
    //   </GridContainer>
    // </React.Fragment
    <Box className={classes.container}>
      <GridItem mr={4} ml={4} mt={4} mb={4}>
        <ModalFilter showModal={open} setShowModal={handleClose} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={2}>
            <Button
              style={{
                color: "#3A3B3F",
                height: 45,
              }}
              color="white"
              onClick={handleOpen}
            >
              <i className="material-icons" style={{ fontSize: 20 }}>
                filter_list
                    </i>{" "}
              <span
                style={{
                  color: "#3A3B3F",
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                FILTER
                    </span>
            </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={10}>
            <Box display="flex" flexDirection="row" width={1}>
              <Paper elevation={0} className={classes.wrapper}>
                <IconButton onClick={handleSearchFunc}>
                  <Search style={{ color: "#C2CFE0" }} />
                </IconButton>
                <SearchInput
                  placeholder="Cari Donasi"
                  name="search"
                  id="search"
                  type="text"
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      controller.eventSubmit(event);
                    }
                  }}
                  value={controller.filterParam.search}
                  onChange={e => {
                    controller.setFilterParam(prevState => ({
                      ...prevState,
                      search: e.target.value
                    }))
                  }}
                />
              </Paper>
            </Box>
          </GridItem>
        </GridContainer>
        <GridContainer mt={4}>
          <GridItem xs={12} sm={12} md={12} mt={2}>
            <Box mt={2}>
              <Typography variant="h5" className={classes.title} gutterBottom>
                Daftar Donasi
            </Typography>
            </Box>
          </GridItem>
        </GridContainer>
        <GridContainer alignItems="center">
          <GridItem xs={12} sm={12} md={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography className={classes.columns}>
                Columns to Display
            </Typography>
              <MySelect
                label={`${controller.displayColumns.data.length} to ${DonationTableColumns.length} column`}
                options={listColumnOptions}
                handleChange={e => controller.handleSelectedColumn(e)}
                checked={controller.displayColumns.data}
              />
            </Box>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Box display="flex" justifyContent="flex-end" mb={4} mt={2}>
              <Button
                style={{
                  backgroundColor: "#6DB400",
                  color: "#FFFF",
                }}
                onClick={handleClick}
                icon={<Add />}
              >
                <span>Input Donasi</span>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseAnchor}
              >
                <Link to="/dashboard/retail" style={{ textDecoration: 'none', color: 'black' }}>
                  <MenuItem onClick={handleClose}>Input Retail</MenuItem>
                </Link>
                <Link to="/dashboard/corporate/donor" style={{ textDecoration: 'none', color: 'black' }}>
                  <MenuItem onClick={handleClose}>Input Corporate</MenuItem>
                </Link>
                <Link to="/dashboard/upz" style={{ textDecoration: 'none', color: 'black' }}>
                  <MenuItem onClick={handleClose}>Input UPZ</MenuItem>
                </Link>
              </Menu>
            </Box>
          </GridItem>
        </GridContainer>
      </GridItem>
    </Box>
  )
}