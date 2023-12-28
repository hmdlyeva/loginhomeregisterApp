import React, { useEffect, useState } from "react";
import Navbar from "../../navbar/Navbar";
import './Notification.scss'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
type Props = {};

const NotificationPage = (props: Props) => {

    const [UsersData, setUsersData] = useState([]);
    useEffect(() => {
      axios.get("https://userapideployda.onrender.com/users").then((res) => {
        setUsersData(res.data);
      });
      // dispatch(getUsersData() as any);
    }, []);
    let loginolanUserinUsername = localStorage.getItem("loginUser");
  console.log(loginolanUserinUsername);

  let loginolanuserim = UsersData.find(
    (user: { username: string }) => user.username == loginolanUserinUsername
  );
  console.log(loginolanuserim);


  return (
    <section id="notification_page">
      <Navbar />

      <div className="notification_page container">

      <h1>Notification</h1>

{
    loginolanuserim? loginolanuserim.notification!.map((ntfcn:{ntfctncontent:string})=>{
        return (
            <Card sx={{ width: "100%" , display:"flex", justifyContent:"space-between", padding:"10px"}}>

            <div style={{display:"flex"}}>
    
          <CardMedia
            sx={{ height: 140 , width:"140px", borderRadius:"50%"}}
            image={loginolanuserim.profileimg}
            title="green iguana"
          />
          
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{textAlign:"center", paddingTop:"10px"}}>
              {ntfcn.ntfctncontent}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Lizardsgvkj
            </Typography> */}
          </CardContent>
            </div>
    
    
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
    
        </Card>
        )
    }):null
}
     

      </div>
    </section>
  );
};

export default NotificationPage;
