import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getUsersData, login } from "./../../redux/slice/slice";
import type { RootState } from "./../../redux/store/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomePage.scss";
import Navbar from "../navbar/Navbar";
import UserStories from "../HomePages/UserStories/UserStories";
import UserPosts from "../HomePages/UserPosts/UserPosts";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserPostFollow from "../HomePages/UserPosts/UserPostFollow";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type Props = {};

interface user {
  id: string;
  name: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Homepage = (props: user) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [UsersData, setUsersData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://userapideployda.onrender.com/users", {
        headers: {
          Authorization: `barear ${token}`,
        },
      })
      .then((res) => {
        setUsersData(res.data);
      });
  }, []);

  return (
    <section id="home_section">
      <Navbar/>
      <div className="container switch_items">
        <Box sx={{ width: "100%" , paddingTop:"60px"}}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" , position:"fixed", paddingLeft:"70px", backgroundColor:"black", width:"100%", zIndex:3}}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="All User" {...a11yProps(0)} style={{color:"dodgerblue"}} />
              <Tab label="My follow" {...a11yProps(1)}  style={{color:"dodgerblue"}}/>
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>

            <UserPosts />

          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>

          <UserStories />
          <UserPostFollow/>

          </CustomTabPanel>
        </Box>
      </div>
    </section>
  );
};

export default Homepage;
