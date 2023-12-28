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
import "./UserList.scss";
interface UserListProps {
  inpValue: string;
}

const UserList: React.FC<UserListProps> = ({ inpValue }) => {
  console.log(inpValue);
  const [UserssData, setUserssData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setUserssData(res.data);
    });
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(UserssData);

  let loginolanUserinUsername = localStorage.getItem("loginUser");
  console.log(loginolanUserinUsername);

  let newFilteredDatam = UserssData.filter(
    (user: { username: string }) => user.username != loginolanUserinUsername
  );

  let FindUserByinpValue = newFilteredDatam.filter(
    (user: { username: string }) =>
      user.username.toLowerCase().includes(inpValue?.toLowerCase())
  );
  console.log(FindUserByinpValue);
  return (
    <section id="user_list">
      <div className="users_lists">
        {inpValue
          ? FindUserByinpValue.map(
              (user: { username: string; profileimg: string; bio: string }) => {
                return (
                  <Card
                    sx={{
                      maxWidth: "100%",
                      display: "flex",
                      padding: "20px",
                      justifyContent: "space-between",
                    }}
                    key={user.username}
                    onClick={()=>{
                      navigate(`/detailuserpage/${user.username}`)
                    }}
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
                          {user.bio}
                        </Typography>
                      </div>
                    </div>

                    <CardContent>
                      <CardActions>
                        <Button size="small">Follow</Button>
                        <Button size="small">Message</Button>
                      </CardActions>
                    </CardContent>
                  </Card>
                );
              }
            )
          : newFilteredDatam.map(
              (user: { username: string; profileimg: string; bio: string }) => {
                return (
                  <Card
                    sx={{
                      maxWidth: "100%",
                      display: "flex",
                      padding: "20px",
                      justifyContent: "space-between",
                    }}
                    key={user.username}
                    onClick={()=>{
                      navigate(`/detailuserpage/${user.username}`)
                    }}
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
                          {user.bio}
                        </Typography>
                      </div>
                    </div>

                    <CardContent>
                      <CardActions>
                        <Button size="small">Follow</Button>
                        <Button size="small">Message</Button>
                      </CardActions>
                    </CardContent>
                  </Card>
                );
              }
            )}
      </div>
    </section>
  );
};

export default UserList;
