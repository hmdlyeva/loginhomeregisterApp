import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getUsersData, login } from "./../../redux/slice/slice";
import type { RootState } from "./../../redux/store/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomePage.scss"
import Navbar from "../navbar/Navbar";
import UserStories from "../HomePages/UserStories/UserStories";
import UserPosts from "../HomePages/UserPosts/UserPosts";
type Props = {};

interface user {
  id: string,
  name: string
}

const Homepage = (props: user) => {
  const [UsersData, setUsersData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    axios.get("https://userapideployda.onrender.com/users", {
      headers: {
        Authorization: `barear ${token}`
      }
    }).then((res) => {
      setUsersData(res.data);
    });
  }, []);

  return (
    <section id="home_section">
      <Navbar />

      {/* <h1 style={{ color: "black" }}>Home</h1>
        <button onClick={()=>{
          navigate("/login")
          // dispatch(login(false));
        }}>Log Out</button> */}
      {/* <ul>

          {
            UsersData ? UsersData.map((user,i) =>
              <li key={i}>{user.name}</li>
            ) : null
          }

        </ul> */}
      <UserStories />
      <UserPosts />
    </section>
  );
};

export default Homepage;
