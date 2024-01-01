import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import "./ProfileUser.scss";
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

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteUserFromMyFollow, getUpdateduser } from "./../../redux/slice/slice";
import { useNavigate } from "react-router-dom";
interface UserLogin {
  username: string;
  profileimg: string;
  bio: string;
  info: string;
}

interface follow{
  id:string
}
interface Posters{
  id:string,
  imgsrc:string,
  imgtitle:string
}
interface User {
  id: string;
  username: string;
  profileimg: string;
  // message: messageArr[];
  menifollow: follow[]
  myfollow:follow[],
  myposter:Posters[]
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 490,
  bgcolor: "white",
  border: "1px solid",
  boxShadow: 24,
  p: 4,
  borderRadius: 7,
};

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const ProfilePage = (props: UserLogin) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setProfileImg(LoginUser?.profileimg || "");
    setBio(LoginUser?.bio || "");
    setInfo(LoginUser?.info || "");
  };
  const handleClose = () => setOpen(false);

  const [profileImg, setProfileImg] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [info, setInfo] = React.useState("");

  const handleSend = async () => {
    dispatch(
      getUpdateduser({
        userId: LoginUser?.id || "",
        profileImg: profileImg,
        bio: bio,
        info: info,
      }) as any
    );

    handleClose();
  };

  const [openFollower, setOpenFollower] = React.useState(false);
  const handleOpenFollowers = () => {
    setOpenFollower(true);
  };
  const handleCloseFollower = () => setOpenFollower(false);

  const [openFollowing, setOpenFollowing] = React.useState(false);
  const handleOpenFollowing = () => {
    setOpenFollowing(true);
  };
  const handleCloseFollowing = () => setOpenFollowing(false);

  const navigate = useNavigate();
  let loginUsername = localStorage.getItem("loginUser");
  // console.log(loginUsername);
  const [UsersData, setUsersData] = useState<User[]>([]);
  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setUsersData(res.data);
    });
  }, []);

  let LoginUser = UsersData.find(
    (elem: { username: string }) => elem.username == loginUsername
  );
  const dispatch = useDispatch();

  //////////////////////////////////////////////

  let meniFollowArr: string[] = [];

  if (LoginUser) {
    meniFollowArr = LoginUser.menifollow;
    console.log(meniFollowArr);
  }

    let loginUserFollwerArr = meniFollowArr.map(
      (user: { id: string }) => String(user.id)
    );
  console.log(loginUserFollwerArr);

  let findmenifollowarrdakiusersbyid = UsersData.filter((user:{id:string})=>
  loginUserFollwerArr.includes(String(user.id)))

  console.log(findmenifollowarrdakiusersbyid);


  let myposterArr: string[] = [];

  if (LoginUser) {
    myposterArr = LoginUser.myposter;
    console.log(myposterArr);
  }

  let myfollowArr: string[] = [];

  if (LoginUser) {
    myfollowArr = LoginUser.myfollow;
    console.log(myfollowArr);
  }

  let loginUserPostArr = myposterArr.map((post) => post.id);

  let loginUserMyFollowArr = myfollowArr.map((user: { id: string }) =>
    String(user.id)
  );

  let findmyfollowarrdakiusersbyid = UsersData.filter((user: { id: string }) =>
    loginUserMyFollowArr.includes(String(user.id))
  );

/////////////////////////////////////////
  return (
    <section id="profile_user_page">
      <Navbar />
      <div className="profile_user_page">
        {LoginUser ? (
          <>
            <div className="hero_section">
              <div className="container heroo_section">
                <div className="left_hero">
                  <CardMedia
                    className="circle_user_pp_image"
                    image={LoginUser.profileimg}
                    title="users profileimg"
                  />

                  <div className="user_details">
                    <h2>{LoginUser.username}</h2>
                    <p>{LoginUser.bio}</p>
                    <p>{LoginUser.info}</p>
                  </div>
                </div>

                <div className="post_follow">
                  <div className="post_followers_following">
                    <div className="post_user_detail">
                      {/* <h2>3</h2> */}
                      <h2>{loginUserPostArr.length}</h2>
                      <h2>Posts</h2>
                    </div>
                    <div className="follower_user_detail">
                      {/* <h2>1</h2> */}
                      <h2>{loginUserFollwerArr.length}</h2>
                      <h2 onClick={handleOpenFollowers}>Followers</h2>

                      <Modal
                      open={openFollower}
                      onClose={handleCloseFollower}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        sx={style}
                        component="form"
                        noValidate
                        autoComplete="off"

                      >
                       
                     {  findmenifollowarrdakiusersbyid.map(
              (user: { username: string; profileimg: string; bio: string }) => {
                return (
                       <Card
                    sx={{
                      maxWidth: "100%",
                      display: "flex",
                      padding: "20px",
                      justifyContent: "space-between",
                      backgroundColor:"black"
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

                      <div style={{ paddingTop: "15px" , color:"white"}}>
                        <Typography style={{ marginTop: "15px"}} gutterBottom variant="h5" component="div">
                          {user.username}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {user.bio}
                        </Typography>
                      </div>
                    </div>

                    <CardContent>
                      <CardActions>
                        <Button size="small">Delete</Button>
                        <Button size="small">Message</Button>
                      </CardActions>
                    </CardContent>
                  </Card>

);
}
)}

                       
                      </Box>
                    </Modal>
                    </div>
                    <div className="following_user_detail">
                      {/* <h2>1</h2> */}
                      <h2>{loginUserMyFollowArr.length}</h2>
                      <h2 onClick={handleOpenFollowing}>Following</h2>

                      <Modal
                        open={openFollowing}
                        onClose={handleCloseFollowing}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={style}
                          component="form"
                          noValidate
                          autoComplete="off"
                        >
                          {findmyfollowarrdakiusersbyid.map(
                            (user: {
                              username: string;
                              profileimg: string;
                              bio: string;
                            }) => {
                              

                              return (
                                <Card
                                  sx={{
                                    maxWidth: "100%",
                                    display: "flex",
                                    padding: "20px",
                                    justifyContent: "space-between",
                                    backgroundColor: "black",
                                  }}
                                  key={user.username}
                                  onClick={() => {
                                    navigate(
                                      `/detailuserpage/${user.username}`
                                    );
                                  }}
                                >
                                  <div style={{ display: "flex", gap: "20px" }}>
                                    <CardMedia
                                      sx={{
                                        height: 100,
                                        width: 100,
                                        borderRadius: 50,
                                      }}
                                      image={user.profileimg}
                                      title="users profileimg"
                                    />

                                    <div
                                      style={{
                                        paddingTop: "15px",
                                        color: "white",
                                      }}
                                    >
                                      <Typography
                                        style={{ marginTop: "15px" }}
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                      >
                                        {user.username}
                                      </Typography>

                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        {user.bio}
                                      </Typography>
                                    </div>
                                  </div>

                                  <CardContent>
                                    <CardActions>
                                      <Button
                                        size="small"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          alert("are u sure?");
                                          dispatch(
                                            deleteUserFromMyFollow({
                                              userId: user.id, 
                                              loggedInUserId:
                                                LoginUser?.id || "",
                                            }) as any
                                          );
                                        }}
                                      >
                                        Delete
                                      </Button>
                                      <Button size="small">Message</Button>
                                    </CardActions>
                                  </CardContent>
                                </Card>
                              );
                            }
                          )}
                        </Box>
                      </Modal>
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
                    <Button variant="outlined" onClick={handleOpen}>
                      Edit profile
                    </Button>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        sx={style}
                        component="form"
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          label="Profile img addres"
                          variant="standard"
                          onChange={(e) => setProfileImg(e.target.value)}
                        />

                        <TextField
                          id="standard-basic"
                          label="Bio"
                          variant="standard"
                          style={{ marginLeft: "18px" }}
                          onChange={(e) => setBio(e.target.value)}
                        />
                        <TextField
                          id="standard-basic"
                          label="Info"
                          variant="standard"
                          style={{ marginTop: "18px" }}
                          onChange={(e) => setInfo(e.target.value)}
                        />

                        <Button
                          variant="contained"
                          // endIcon={<SendIcon />}
                          style={{
                            width: "110px",
                            marginTop: "28px",
                            marginLeft: "90px",
                          }}
                          onClick={handleSend}
                        >
                          Send
                        </Button>
                      </Box>
                    </Modal>

                    <Button variant="outlined" startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="users_posters" style={{ backgroundColor: "black" }}>
              <div className="user_posters_login container">
                {LoginUser
                  ? LoginUser.myposter.map((post) => {
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
                              image={LoginUser.profileimg}
                              title="green iguana"
                            />
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              style={{ paddingTop: "10px" }}
                            >
                              {loginUsername}
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
                {LoginUser
                  ? LoginUser.myposter.map((post) => {
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
                              image={LoginUser.profileimg}
                              title="green iguana"
                            />
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              style={{ paddingTop: "10px" }}
                            >
                              {loginUsername}
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
                {LoginUser
                  ? LoginUser.myposter.map((post) => {
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
                              image={LoginUser.profileimg}
                              title="green iguana"
                            />
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              style={{ paddingTop: "10px" }}
                            >
                              {loginUsername}
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

export default ProfilePage;
