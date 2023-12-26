import './UserPosts.scss'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
type Props = {}


import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const UserPosts = (props: Props) => {


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

    interface Myposter {
        imgsrc: string;
        imgtitle: string;
        id: string;
        userId: string;
        storyimage: string;
        storytitle: string;
    }

    return (
        <section id='user_posters'>
            <div className="container">

                {/* <div>


                    <div className="circle_profile_page">{ }</div>
                    <div>username</div>

                </div> */}



                {UsersData.map((user) => (
                    <div key={user.id} className="posts-user-card dd">
                        {user.myposter!.map((poster: Myposter, index: number) => (


                            <Card key={index} sx={{ maxWidth: 1280 }} className='postcards'>
                                <CardContent style={{ display: "flex", gap: "10px" }}>

                                    <CardMedia
                                        sx={{ height: 100, width: 100, borderRadius: "50%", border: "1px solid " }}
                                        image={user.mystory.storyimage}
                                        title="post image"
                                    />

                                    <Typography gutterBottom variant="h5" component="div" style={{ display: "flex", alignItems: "center" }}>
                                        {user.username}
                                    </Typography>

                                </CardContent>
                                <CardMedia
                                    sx={{ height: 900, width: 1200 }}
                                    image={poster.imgsrc}
                                    title="post image"
                                />

                                <CardActions>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {poster.imgtitle}
                                    </Typography>
                                </CardActions>

                            </Card>

                        ))}
                    </div>
                ))}

            </div>
        </section>
    )
}

export default UserPosts