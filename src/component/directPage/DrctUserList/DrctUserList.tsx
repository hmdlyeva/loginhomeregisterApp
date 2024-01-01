import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { postUsersData, getUsersData, login } from "../../../redux/slice/slice";
import type { RootState } from "../../../redux/store/store";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { string } from "yup";
type Props = {};

interface messageArr {
  acceptedmessage: string;
}
interface User {
  id: string;
  username: string;
  profileimg: string;
  message: messageArr[];
}

const DrctUserList = () => {
  const [UserssData, setUserssData] = useState<User[]>([]);
  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setUserssData(res.data);
    });
  }, []);

  let Mainusername = localStorage.getItem("loginUser");

  let LoginOlanUser = UserssData.find(
    (user: { username: string }) =>
      user.username == Mainusername
  );

  let messagemArr: string[] = [];

  if (LoginOlanUser) {
    messagemArr = LoginOlanUser.message;
    console.log(messagemArr);
  }

  let messagemdeuserler = messagemArr.map((user: { id: any }) => user.id);
  console.log(messagemdeuserler);

  let loginOlanUserinMessageArrayindakiUserler = UserssData.filter((user) =>
    messagemdeuserler.includes(user.id)
  );

  let acceptedmessajlar = messagemArr.map(
    (user: { acceptedmessage: any }) => user.acceptedmessage
  );

  console.log(loginOlanUserinMessageArrayindakiUserler);

  return (
    <section id="user_list">
      <div className="users_lists">
        {loginOlanUserinMessageArrayindakiUserler
          ? loginOlanUserinMessageArrayindakiUserler.map(
              (user: {
                username: string;
                profileimg: string;
                message: messageArr[];
              }) => {
                return (
                  <Card
                    sx={{
                      maxWidth: "100%",
                      display: "flex",
                      padding: "20px",
                      justifyContent: "space-between",
                    }}
                    key={user.username}
                  >
                    <div style={{ display: "flex", gap: "20px" }}>
                      <CardMedia
                        sx={{ height: 100, width: 100, borderRadius: 50 }}
                        image={user.profileimg}
                        title="users profileimg"
                      />

                      <div style={{ paddingTop: "15px" }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {user.username}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {acceptedmessajlar}
                        </Typography>
                      </div>
                    </div>

                    <CardContent>
                      <CardActions
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          border: "1px solid lightgray",
                        }}
                      >
                        <Button
                          style={{
                            paddingRight: "40px",
                            backgroundColor: "inherit",
                          }}
                        >
                          1
                        </Button>
                      </CardActions>
                    </CardContent>
                  </Card>
                );
              }
            )
          : null}
      </div>
    </section>
  );
};

export default DrctUserList;
