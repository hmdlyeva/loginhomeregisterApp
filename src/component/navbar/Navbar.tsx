import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faComments,
  faSquarePlus,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import {
  faHeart,
  faComment,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// type Props = {}

const Navbar = ({ setinpValue }: any) => {
  const navigate = useNavigate();
  //   const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("https://userapideployda.onrender.com/users")
  //     .then((res) => setUsers(res.data));
  // }, []);
  return (
    <div
      style={{
        backgroundColor: "black",
        position: "fixed",
        width: "100%",
        zIndex: "2",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <div className="container">
          <AppBar position="static" style={{ backgroundColor: "black" }}>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                <p
                  style={{ width: "42px" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Halu
                </p>
              </Typography>

              <div style={{ display: "flex", gap: "30px" }}>
                <FontAwesomeIcon
                  icon={faHouse}
                  style={{ color: "#005eff", fontSize: "25px" }}
                  onClick={() => {
                    navigate("/");
                  }}
                />

                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  style={{ color: "#005eff", fontSize: "25px" }}
                  onClick={() => {
                    navigate("/searchpage");
                  }}
                />

                <FontAwesomeIcon
                  icon={faComments}
                  style={{ color: "#005eff", fontSize: "25px" }}
                  onClick={() => {
                    navigate("/directpage");
                  }}
                />

                <FontAwesomeIcon
                  icon={faSquarePlus}
                  style={{ color: "#005eff", fontSize: "25px" }}
                  onClick={() => {
                    navigate("/sendposterspage");
                  }}
                />

                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    color: "#005eff",
                    fontSize: "25px",
                  }}
                  onClick={() => {
                    navigate("/profilepageuser");
                  }}
                />

                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{
                    color: "#005eff",
                    fontSize: "29px",
                  }}
                  onClick={() => {
                    navigate("/notificationuserpage");
                  }}
                />

                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  style={{ color: "#005eff", fontSize: "29px" }}
                  onClick={() => {
                    navigate("/login");
                    localStorage.removeItem("loginUser");
                    localStorage.removeItem("token");
                  }}
                />
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </Box>
    </div>
  );
};

export default Navbar;
