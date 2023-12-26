import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useSelector, useDispatch } from "react-redux";
import { postUsersData, getUsersData, login } from "../../redux/slice/slice";
import type { RootState } from "../../redux/store/store";
import YupPassword from "yup-password";
YupPassword(Yup);
import * as Yup from "yup";

import axios from "axios";
import { useNavigate } from "react-router-dom";

interface user {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  number: string;
}

const LoginPage = (props: user) => {
  const [UsersData, setUsersData] = useState([]);     
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setUsersData(res.data);
    });
  }, []);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Too Short!")
        .max(15, "Too Long!")
        .required("Required"),

      password: Yup.string()
        .min(
          8,
          "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
        )
        .minLowercase(1, "password must contain at least 1 lower case letter")
        .minUppercase(1, "password must contain at least 1 upper case letter")
        .minNumbers(1, "password must contain at least 1 number")
        .minSymbols(1, "password must contain at least 1 special character")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/login", values)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data);
        });

      // console.log(UsersData);
      let Find = UsersData.find(
        (elem: { password: string; username: string }) =>
          elem.password == values.password && elem.username == values.username
      );
      if (Find) {
        dispatch(login(true));
        alert("welcome user");
        navigate("/");
      } else {
        alert("user not found");
        // navigate("/register");
      }
    },
  });

  return (
    <div>
      <h1 style={{ color: "black" }}>Login</h1>

      <form onSubmit={formik.handleSubmit}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="Username"
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.errors.username ? (
              <div style={{ color: "red" }}>{formik.errors.username}</div>
            ) : null}

            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
          </div>
        </Box>

        <Button
          type="submit"
          style={{ backgroundColor: "orange" }}
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
