import React from "react";
import Navbar from "../navbar/Navbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SendPostUser from "./sendPostUser/SendPostUser";
import SendStoryUser from "./sendStoryUser/SendStoryUser";

type Props = {};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

const SendPostPage = (props: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <section id="search_pagee" >
      <Navbar />

      <div className="switch_items">
        <Box sx={{ width: "100%", paddingTop: "60px" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              position: "fixed",
              paddingLeft: "70px",
              backgroundColor: "black",
              width: "100%",
            }}
          >
            <div className="container">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label="Post"
                  {...a11yProps(0)}
                  style={{ color: "dodgerblue" }}
                />
                <Tab
                  label="Story"
                  {...a11yProps(1)}
                  style={{ color: "dodgerblue" }}
                />
              </Tabs>
            </div>
          </Box>

          <div className="container" style={{paddingTop:"40px"}}>
            <CustomTabPanel value={value} index={0}>
              <SendPostUser />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SendStoryUser />
            </CustomTabPanel>
          </div>
        </Box>
      </div>
    </section>
  );
};

export default SendPostPage;
