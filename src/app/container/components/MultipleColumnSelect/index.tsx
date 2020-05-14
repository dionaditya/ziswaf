import React, { useEffect } from "react";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import _ from "lodash";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { green } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    padding: "10px",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const MySelect = (props) => {
  const {
    options,
    handleChange,
    checked,
    label,
    placeholderInput,
    withSearch,
    debounce,
    debounceSchool,
    ...rest
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [transformOption, setTransformOption] = React.useState([
    {
      name: "",
      label: "",
    },
  ]);
  const [value, setValue] = React.useState("");

  const transfromValueSearch = () => {
    if (value === "" || debounce) {
      return transformOption;
    } else {
      return transformOption.filter((val) =>
        val.label.toLowerCase().includes(value.toLowerCase())
      );
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setTransformOption(options);
  }, [checked, options]);

  const onChange = (event) => {
    if (debounce) {
      const valueInput = event.target.value;

      debounceSchool(valueInput);
      setValue(valueInput);
    } else {
      const valueInput = event.target.value;

      setValue(valueInput);
    }
  };

  if (withSearch) {
    return (
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          style={{
            background: "#F2F2F2",
            color: "#4B4B4B",
            height: 42,
            fontSize: 12,
            width: "100%",
          }}
          onClick={handleClick}
          {...rest}
        >
          <span className="col">{label}</span>
          <KeyboardArrowDown style={{ color: "#878787" }} />
        </Button>
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <TextField
            value={value}
            onChange={onChange}
            name="search"
            style={{
              width: "100%",
            }}
            placeholder={placeholderInput}
            onKeyPress={e => {
              if(e.keyCode === 13) {
                onChange(e)
              }
            }}
          />
          <Box
            style={{
              overflowX: "hidden",
              overflowY: "auto",
              maxHeight: "350px",
            }}
          >
            {transfromValueSearch().map((option, i) => {
              const isChecked = checked.filter((item) => {
                return item.name === option.name;
              });
              if (isChecked.length <= 0) {
                return (
                  <Box key={i}>
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          onChange={!props.checkboxDisabled ? handleChange : {}}
                          name={option.label}
                          checked={false}
                          value={option.name}
                          disabled={props.checkboxDisabled}
                          {...rest}
                        />
                      }
                      label={option.label}
                    />
                  </Box>
                );
              } else {
                return (
                  <Box key={i}>
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          onChange={!props.checkboxDisabled ? handleChange : {}}
                          name={option.label}
                          checked={true}
                          value={option.name}
                          disabled={props.checkboxDisabled}
                          {...rest}
                        />
                      }
                      label={option.label}
                    />
                  </Box>
                );
              }
            })}
          </Box>
        </StyledMenu>
      </div>
    );
  } else {
    return (
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          style={{
            background: "#F2F2F2",
            color: "#4B4B4B",
            height: 42,
            fontSize: 12,
            width: "100%",
          }}
          onClick={handleClick}
          {...rest}
        >
          <span className="col">{label}</span>
          <KeyboardArrowDown style={{ color: "#878787" }} />
        </Button>
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {transformOption.map((option, i) => {
            const isChecked = checked.filter((item) => {
              return item.name === option.name;
            });
            if (isChecked.length <= 0) {
              return (
                <Box key={i}>
                  <FormControlLabel
                    control={
                      <GreenCheckbox
                        onChange={!props.checkboxDisabled ? handleChange : {}}
                        name={option.label}
                        checked={false}
                        value={option.name}
                        disabled={props.checkboxDisabled}
                        {...rest}
                      />
                    }
                    label={option.label}
                  />
                </Box>
              );
            } else {
              return (
                <Box key={i}>
                  <FormControlLabel
                    control={
                      <GreenCheckbox
                        onChange={!props.checkboxDisabled ? handleChange : {}}
                        name={option.label}
                        checked={true}
                        value={option.name}
                        disabled={props.checkboxDisabled}
                        {...rest}
                      />
                    }
                    label={option.label}
                  />
                </Box>
              );
            }
          })}
        </StyledMenu>
      </div>
    );
  }
};

export default MySelect;
