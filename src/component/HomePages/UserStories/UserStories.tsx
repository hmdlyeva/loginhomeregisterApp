import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUsersData, getUsersData } from "../../../redux/slice/slice";
import type { RootState } from "../../../redux/store/store";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import axios from "axios";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import './UserStory.scss'
type Props = {}
interface Mystory {
    storyimage: string;
    storytitle: string;
    id: string;
    userId: string;
}
const UserStories = (props: Props) => {
    // const userlerim = useSelector((state: RootState) => state.users.users);
    const [UsersData, setUsersData] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(
            "https://userapideployda.onrender.com/users"
        ).then((res) => {
            setUsersData(res.data)
        })
        // dispatch(getUsersData() as any);
    }, []);

    console.log(UsersData)


    return (
        <section id='users_stories'>
            <div className='container'>

                <Swiper
                    slidesPerView={5}
                    spaceBetween={0}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper margin-top"
                >

                    {UsersData.map((user) => (
                        <div key={user.id} className="story-user-card ">
                            {user.mystory!.map((story: Mystory, index: number) => (

                                <div>

                                    <SwiperSlide key={index} style={{ width: "103x" }} className="hh">
                                        <CardMedia
                                            sx={{ height: 100, width: 100, borderRadius: "50%", border: "1px solid " }}
                                            image={story.storyimage}
                                            title="post image"
                                        />
                                        <CardContent style={{ display: "flex", textAlign: "center", justifyContent: "center", width: "70px" }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {user.username}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>

                                        </CardActions>

                                    </SwiperSlide>

                                    <SwiperSlide key={index} style={{ width: "103x" }} className="hh">
                                        <CardMedia
                                            sx={{ height: 100, width: 100, borderRadius: "50%", border: "1px solid " }}
                                            image={story.storyimage}
                                            title="post image"
                                        />
                                        <CardContent style={{ display: "flex", textAlign: "center", justifyContent: "center", width: "70px" }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {user.username}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>

                                        </CardActions>

                                    </SwiperSlide>
                                </div>
                            ))}
                        </div>
                    ))}



                </Swiper>

            </div>
        </section>
    )
}

export default UserStories