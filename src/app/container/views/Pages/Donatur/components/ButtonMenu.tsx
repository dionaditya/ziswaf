import React from 'react'
import GridItem from "@/app/container/commons/Grid/GridItem";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import ButtonFilter from "@/app/container/commons/CustomButtons/Button.tsx";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";

const ButtonMenuNav = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleCloseMenu = () => {
        setAnchorEl(null);
      };
    
    return(
        <GridItem xs={12} sm={12} md={6}>
              <Box display="flex" justifyContent="flex-end" mb={4} mt={2}>
                <ButtonFilter
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  endIcon={<Icon>expand_more</Icon>}
                  style={{
                    backgroundColor: "#6DB400",
                    color: "#FFFF",
                  }}
                >
                  Input Donatur
                </ButtonFilter>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  <Link to="/dashboard/donatur-perorangan" style={{
                    textDecoration: 'none'
                  }}>
                    <MenuItem
                      style={{
                        color: "#000000",
                        textDecoration: "none !important",
                      }}
                      onClick={handleCloseMenu}
                    >
                      Perorangan
                    </MenuItem>
                  </Link>
                  <Link to="/dashboard/donatur-perusahaan" style={{
                    textDecoration: 'none'
                  }}>
                    <MenuItem
                      style={{
                        color: "#000000",
                        textDecoration: "none !important",
                      }}
                      onClick={handleCloseMenu}
                    >
                      Perusahaan/Organisasi
                    </MenuItem>
                  </Link>
                </Menu>
              </Box>
            </GridItem>
    )
}

export default ButtonMenuNav