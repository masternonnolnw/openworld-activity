import Image from "next/image";
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { url } from "inspector";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { inputFieldValues } from "./const";
import { LoadingButton } from "@mui/lab";
export default function Form() {
  const initialFormValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    formSubmitted: false,
    success: false
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);

  const [loading, setLoading] = useState(false);

  const [resFromSubmit, setResFromSubmit] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const validate: any = (fieldValues = formValues) => {
    let temp: any = { ...errors };

    if ("firstName" in fieldValues) {
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";
    }

    if ("lastName" in fieldValues) {
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";
    }

    if ("username" in fieldValues) {
      temp.username = fieldValues.username ? "" : "This field is required.";
      if (fieldValues.username) {
        temp.username = /^[A-Za-z0-9]*$/.test(fieldValues.username)
          ? ""
          : "MUST contain only character or number.";
      }
    }

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is NOT valid.";
    }

    setErrors({
      ...temp
    });
  };

  const handleInputValue = (e: any) => {
    setResFromSubmit("");

    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    validate({ [name]: value });
  };
  const formIsValid = (fieldValues = formValues) => {
    const isValid =
      fieldValues.firstName &&
      fieldValues.lastName &&
      fieldValues.username &&
      fieldValues.email &&
      fieldValues.password &&
      fieldValues.confirmPassword &&
      resFromSubmit === "" &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (formIsValid()) {
      try {
        // const res: any = await axios.post(`${baseURL}/users`, {
        //   username: formValues.username,
        //   name: formValues.firstName,
        //   surname: formValues.lastName,
        //   email: formValues.email,
        //   password: formValues.password
        // });
        setLoading(false);
        handleOpenSnackBar();
      } catch (err: any) {
        setLoading(false);
        try {
          setResFromSubmit(err.response.data.message[0]);
        } catch (err) {
          console.error(err);
        }
      }
    }
  };
  return (
    <Box
      sx={{
        width: { xs: "340px", lg: "380px" },
        height: "auto",
        // ml: { xs: "auto", lg: "auto" },
        // mr: { xs: "auto", lg: "auto" },
        // mt: { xs: "10px", lg: "90px" },
        // ml: "auto",
        // mr: "auto",
        // mt: "90px",
        // mb: "auto",
        padding: { xs: "40px 50px 50px", lg: "40px 60px 60px" },
        gap: "40px",
        backgroundColor: "white",
        border: "1px solid #999999",
        borderRadius: "8px",
        flexDirection: "column"
      }}
    >
      <Typography
        sx={{
          width: "100%",
          textAlign: "center",
          height: "73px",

          fontFamily: "Prompt",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: { xs: "40px", md: "47px" },
          lineHeight: "73px",
          color: "black"
        }}
      >
        ลงทะเบียน
      </Typography>
      <Typography
        sx={{
          width: "100%",
          textAlign: "center",
          height: "21px",

          fontFamily: "Prompt",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "13px",
          lineHeight: "21px",
          mb: "9px",
          color: "black"
        }}
      >
        กรุณากรอกข้อมูลให้ครบถ้วน
      </Typography>

      <form onSubmit={handleFormSubmit}>
        {inputFieldValues.map((inputFieldValue, index) => {
          return (
            <TextField
              key={index}
              id={inputFieldValue.id}
              label={inputFieldValue.label}
              name={inputFieldValue.name}
              onBlur={handleInputValue}
              onChange={handleInputValue}
              variant="outlined"
              size="small"
              type="text"
              {...(errors[inputFieldValue.name] && {
                error: true,
                helperText: errors[inputFieldValue.name]
              })}
              InputLabelProps={{
                style: {
                  fontFamily: "Prompt",
                  fontStyle: "normal",
                  marginTop: "-4px",
                  color: "rgba(180, 180, 180, 1)"
                }
              }}
              InputProps={{
                style: {
                  fontFamily: "Prompt",
                  fontStyle: "normal",
                  padding: "0",
                  height: "32px",
                  paddingLeft: "3px"
                }
              }}
              sx={{ mt: "31px", width: "100%" }}
            />
          );
        })}
        <Typography
          sx={{
            mb: "5px",
            mt: "26px",
            fontFamily: "Prompt",
            fontStyle: "normal",
            fontSize: "13px",
            color: "red"
          }}
        >
          {resFromSubmit ? "*" : ""}
          {resFromSubmit}
        </Typography>
        <LoadingButton
          type="submit"
          loading={loading}
          // disabled={!formIsValid()}
          sx={{
            textTransform: "none",
            color: "white",
            backgroundColor: "#c7ac41",
            width: "100%",
            fontFamily: "Prompt",
            fontStyle: "normal",
            fontWeight: "300",
            "&:hover": {
              backgroundColor: "#9c8117"
            }
          }}
        >
          Submit
        </LoadingButton>
      </form>
    </Box>
  );
}
