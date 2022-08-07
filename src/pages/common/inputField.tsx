import { TextField } from "@mui/material";
import { getIn } from "formik";
import { isValidString } from "../utils/utils";

function InputField(props: any) {
  const { label, name, type, nested, formik } = props;
  if (nested) {
    const splitName = isValidString(name) && name.split(".");
    return (
      <div className="form-control">
        <TextField
          id={name}
          name={name}
          label={label}
          type={type}
          value={`${formik?.values[splitName[0]][splitName[1]]}`}
          onChange={formik.handleChange}
          error={Boolean(getIn(Touch, name) && getIn(Error, name))}
          helperText={Boolean(getIn(Touch, name) && getIn(Error, name))}
          variant="outlined"
          size="small"
          fullWidth
        />
      </div>
    );
  } else {
    return (
      <div className="form-control">
        <TextField
          id={name}
          name={name}
          label={label}
          type={type}
          value={`${formik?.values[name]}`}
          onChange={formik.handleChange}
          error={formik?.touched[name] && Boolean(formik?.errors[name])}
          helperText={formik?.touched[name] && formik?.errors[name]}
          variant="outlined"
          size="small"
          fullWidth
        />
      </div>
    );
  }
}

export default InputField;
