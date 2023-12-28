import "./UserPosts.scss";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faSquarePlus,
  faUser,
  faHeart,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

type Props = {};

const UserPostFollow = (props: Props) => {
  const [UsersData, setUsersData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("https://userapideployda.onrender.com/users").then((res) => {
      setUsersData(res.data);
    });
    // dispatch(getUsersData() as any);
  }, []);

  console.log(UsersData);
  interface Myposter {
    imgsrc: string;
    imgtitle: string;
    id: string;
    userId: string;
    storyimage: string;
    storytitle: string;
  }

  let loginolanUserinUsername = localStorage.getItem("loginUser");
  console.log(loginolanUserinUsername);

  let loginolanuserim = UsersData.find(
    (user: { username: string }) => user.username == loginolanUserinUsername
  );
  console.log(loginolanuserim);

  let userinMyFollowArrayi = loginolanuserim?.myfollow || [];
  console.log(userinMyFollowArrayi);

  let userinMyFollowArrayindakiIdler = userinMyFollowArrayi.map(
    (user: { id: string }) => String(user.id)

  );
  console.log(userinMyFollowArrayindakiIdler);

  let FindUsersById = UsersData.filter((user: { id: string }) =>
  userinMyFollowArrayindakiIdler.includes(String(user.id))
);
console.log("FindUsersById:", FindUsersById);

const navigate = useNavigate();

  return (
    <section id="user_posters">
      <div
        className="container"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {/* <div>
                  <div className="circle_profile_page">{ }</div>
                  <div>username</div>
              </div> */}

        {FindUsersById.map((user) => (
          <div
            key={user.id}
            className="posts-user-card dd"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {user.myposter!.map((poster: Myposter, index: number) => (
              <>
                <Card
                  sx={{
                    width: 345,
                    backgroundColor: "black",
                    borderRadius: "10px",
                    color: "white",
                  }}
                  className="cardddim"
                  
                  onClick={()=>{
                    navigate(`/detailuserpage/${user.username}`)
                  }}
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
                      image={user.profileimg}
                      title="green iguana"
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{ paddingTop: "10px" }}
                    >
                      {user.username}
                    </Typography>
                  </div>

                  <CardMedia
                    sx={{ height: 240 }}
                    image={poster.imgsrc}
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
                        {poster.imgtitle}
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
              </>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserPostFollow;
