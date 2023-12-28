import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import "./../profilePage/ProfileUser.scss";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faSquarePlus,
  faUser,
  faHeart,
  faComment,
} from "@fortawesome/free-regular-svg-icons";

import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { updateMyFollow } from "../../redux/slice/slice";

interface UserLogin {
  username: string;
  profileimg: string;
  bio: string;
  info: string;
}

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));
type Props = {};

const DetailUser = (props: Props) => {
  let loginUsername = localStorage.getItem("loginUser");
  // console.log(loginUsername);
  const [UsersData, setUsersData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setUsersData(res.data);
    });
  }, []);

  let LoginUser = UsersData.find(
    (elem: { username: string }) => elem.username == loginUsername
  );

  console.log(LoginUser);

  const { username } = useParams<{ username: string }>();

  console.log(username);

  let findDetailedUserbyUsername = UsersData.find(
    (user) => user.username == username
  );

  const dispatch = useDispatch();
  // let loginUserPostArr = findDetailedUserbyUsername.myposter.map((post) => post.id);
  //   let loginUserFollwerArr = findDetailedUserbyUsername.menifollow.map(
  //     (menifollow) => menifollow.id
  //   );

  //   let loginUserMyFollowArr = LoginUser!.myfollow.map((myfollow) => myfollow.id);
  //   console.log(loginUserMyFollowArr);

  // let loginuserinmyfollowundakidetailuser = loginUserMyFollowArr.find((id)=>id == findDetailedUserbyUsername.id)

  // console.log(loginuserinmyfollowundakidetailuser);
  return (
    <section id="profile_user_page">
      <Navbar />
      <div className="profile_user_page">
        {findDetailedUserbyUsername ? (
          <>
            <div className="hero_section">
              <div className="container heroo_section">
                <div className="left_hero">
                  <CardMedia
                    className="circle_user_pp_image"
                    image={findDetailedUserbyUsername.profileimg}
                    title="users profileimg"
                  />

                  <div className="user_details">
                    <h2>{findDetailedUserbyUsername.username}</h2>
                    <p>{findDetailedUserbyUsername.bio}</p>
                    <p>{findDetailedUserbyUsername.info}</p>
                  </div>
                </div>

                <div className="post_follow">
                  <div className="post_followers_following">
                    <div className="post_user_detail">
                      <h2>2</h2>
                      {/* <h2>{loginUserPostArr.length}</h2> */}
                      <h2>Posts</h2>
                    </div>
                    <div className="follower_user_detail">
                      <h2>1</h2>
                      {/* <h2>{loginUserFollwerArr.length}</h2> */}
                      <h2>Followers</h2>
                    </div>
                    <div className="following_user_detail">
                      <h2>1</h2>
                      {/* <h2>{loginUserMyFollowArr.length}</h2> */}
                      <h2>Following</h2>
                    </div>
                  </div>
                  <div
                    style={{
                      paddingTop: "50px",
                      display: "flex",
                      justifyContent: "center",
                      gap: "30px",
                    }}
                  >
                    {/* {
                    loginuserinmyfollowundakidetailuser? null :  */}
                    <Button
                      variant="outlined"
                      onClick={() => {

                        alert("are u sure?")
                        if (LoginUser && findDetailedUserbyUsername) {
                            dispatch(
                              updateMyFollow({
                                userId: LoginUser.id,
                                geden: findDetailedUserbyUsername.id,
                                myfollow: {
                                  id: findDetailedUserbyUsername.id
                                },
                            }) as any
                          );
                        }
                      }}
                    >
                      Follow
                    </Button>
                    {/* } */}

                    <Button variant="outlined">message</Button>
                    <Button variant="outlined" startIcon={<DeleteIcon />}>
                      Block
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="users_posters" style={{ backgroundColor: "black" }}>
              <div className="user_posters_login container">
                {LoginUser
                  ? findDetailedUserbyUsername.myposter.map((post) => {
                      return (
                        <Card
                          sx={{
                            width: 345,
                            backgroundColor: "black",
                            borderRadius: "10px",
                            color: "white",
                          }}
                          className="userinposterleri"
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              paddingBottom: "10px",
                              padding: "10px",
                            }}
                          >
                            <CardMedia
                              sx={{
                                height: 60,
                                width: 60,
                                borderRadius: "50%",
                              }}
                              image={findDetailedUserbyUsername.profileimg}
                              title="green iguana"
                            />
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              style={{ paddingTop: "10px" }}
                            >
                              {username}
                            </Typography>
                          </div>

                          <CardMedia
                            sx={{ height: 240 }}
                            image={post.imgsrc}
                            title="green iguana"
                          />

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <CardContent>
                              <Typography variant="h6" component="div">
                                {post.imgtitle}
                              </Typography>
                            </CardContent>

                            <CardActions
                              style={{
                                display: "flex",
                              }}
                            >
                              <Button style={{ width: "30px" }}>
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  style={{
                                    color: "#005eff",
                                    fontSize: "20px",
                                    marginLeft: "90px",
                                  }}
                                />
                              </Button>
                              <Button style={{ width: "30px" }}>
                                <FontAwesomeIcon
                                  icon={faComment}
                                  style={{
                                    color: "#005eff",
                                    fontSize: "20px",
                                    marginRight: "-30px",
                                  }}
                                />
                              </Button>
                            </CardActions>
                          </div>
                        </Card>
                      );
                    })
                  : null}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default DetailUser;
