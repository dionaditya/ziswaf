import InputMask from "@/app/container/components/InputMask"
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "30px 0"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%",
      height: 20,
    },
  }),
);

const CustomInputMask = (props: any) => {
    const classes = useStyles();
    const handleChange = (event) => {
        console.log(event)
    }
    const value = 1
    return (
        <div className={classes.container}>
          <TextField
            id="maskExample"
            label="Mask Example"
            classes={classes.formControl}
            {...props}
            // InputProps={{
            //   inputComponent: InputMask,
            //   value:value,
            //   onChange: handleChange('textmask'),
            // }}
          />
        </div>
      );
}

export default CustomInputMask;