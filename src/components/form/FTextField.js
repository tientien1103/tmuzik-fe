import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

// UI library
// antdesign, bootstrap (react),

function FTextField({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        //field.onChange nghia la defaultValue.username = e.target.value
        return (
          <TextField
            variant="filled"
            focused
            size="large"
            {...field}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...other}
          />
        );
      }}
    />
  );
}

export default FTextField;
