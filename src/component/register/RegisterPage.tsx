import React ,{ useEffect, useState } from "react";
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
import { postUsersData, getUsersData } from "../../redux/slice/slice";
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

const RegisterPage = (props: user) => {
//   const userlerim = useSelector((state: RootState) => state.users.users);
const [UsersData, setUsersData] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(
        "https://userapideployda.onrender.com/users"
      ).then((res)=>{
        setUsersData(res.data)
      })
      
    // dispatch(getUsersData() as any);
  }, []);

const navigate = useNavigate()

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      number: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Too Short!")
        .max(15, "Too Long!")
        .required("Required"),
      surname: Yup.string()
        .min(2, "Too Short!")
        .max(15, "Too Long!")
        .required("Required"),
      username: Yup.string()
        .min(2, "Too Short!")
        .max(15, "Too Long!")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      number: Yup.string()
        .max(10, "number must contain 10 characters")
        .min(10, "number must contain 10 characters")
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
        console.log(UsersData);
      let Find = UsersData.find(
        (elem: { email: string; username: string }) =>
          elem.email == values.email || elem.username == values.username
      );
      if (Find) {
        alert("this email or username already in use!");

      } else {
        alert("datam piyuuu");
        let obj = {
          name: values.name,
          surname: values.surname,
          username: values.username,
          email: values.email,
          password: values.password,
          number: values.number,
        //   isLogin:values.isLogin
        };
        console.log(obj);
        dispatch(postUsersData(obj) as any);
        navigate("/login")
      }
    },
  });

  return (
    <div>
      <h1 style={{ color: "black" }}>Register</h1>
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
              label="Name"
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.errors.name ? (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            ) : null}

            <TextField
              label="Surname"
              id="surname"
              name="surname"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.surname}
            />

            {formik.errors.surname ? (
              <div style={{ color: "red" }}>{formik.errors.surname}</div>
            ) : null}
          </div>
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
          <div>
            <TextField
              label="Email"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}

            <TextField
              label="Number"
              id="number"
              name="number"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.number}
            />
            {formik.errors.number ? (
              <div style={{ color: "red" }}>{formik.errors.number}</div>
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

export default RegisterPage;
