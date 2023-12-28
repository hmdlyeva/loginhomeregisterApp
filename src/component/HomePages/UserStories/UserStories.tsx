import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUsersData, getUsersData } from "../../../redux/slice/slice";
import type { RootState } from "../../../redux/store/store";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import axios from "axios";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import "./UserStory.scss";
type Props = {};
interface Mystory {
  storyimage: string;
  storytitle: string;
  id: string;
  userId: string;
}
const UserStories = (props: Props) => {
  // const userlerim = useSelector((state: RootState) => state.users.users);
  const [UsersData, setUsersData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("https://userapideployda.onrender.com/users").then((res) => {
      setUsersData(res.data);
    });
    // dispatch(getUsersData() as any);
  }, []);

  console.log(UsersData);

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

// FindUsersById.push(loginolanuserim)
//   let specificUserId = "14";
// let foundUser = UsersData.find((user) => user.id === specificUserId);
// console.log("Found User:", foundUser);

  return (
    <section id="users_stories">
      <div className="container">
        <Swiper
          slidesPerView={5}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper margin-top"
        >
          {FindUsersById.map(
            (user: { id: string; mystory: Mystory[]; username: string }) => (
              <div key={user.id} className="story-user-card ">
                {user.mystory!.map((story: Mystory, index: number) => (
                  <div>
                    <SwiperSlide
                      key={index}
                      style={{ width: "103px" }}
                      className="hh"
                    >
                      <CardMedia
                        sx={{
                          height: 100,
                          width: 100,
                          borderRadius: "50%",
                          border: "1px solid ",
                        }}
                        image={story.storyimage}
                        title="post image"
                      />
                      <CardContent
                        style={{
                          display: "flex",
                          textAlign: "center",
                          justifyContent: "center",
                          width: "70px",
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{ color: "white", paddingBottom: "14px" , paddingLeft:"20px"}}
                        >
                          {user.username}
                        </Typography>
                      </CardContent>
                      <CardActions></CardActions>
                    </SwiperSlide>
                  </div>
                ))}
              </div>
            )
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default UserStories;
