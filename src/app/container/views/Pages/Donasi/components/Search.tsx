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
import { getUserInfo } from '@/app/infrastructures/misc/Cookies';


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
  let userAccess = getUserInfo();
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
    controller.fetchRegency()
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
              {userAccess.user_id !== 1  ?
                (
                  <>
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
                  </>
                ) : null
              }
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