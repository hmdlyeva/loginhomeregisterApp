import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import SendIcon from "@mui/icons-material/Send";

import Typography from "@mui/material/Typography";
import axios from "axios";
import { getUpdateduserByPost } from "../../../redux/slice/slice";
import { useDispatch } from "react-redux";
type Props = {};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const SendPostUser = (props: Props) => {

  const dispatch = useDispatch();
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
  

  const [imgsrc, setimgsrc] = React.useState("");
  const [imgtitle, setimgtitle] = React.useState("");


  const handleSend = async () => {
    dispatch(
      getUpdateduserByPost({
        userId: LoginUser!.id,
        myposter: {
          imgsrc: imgsrc,
          imgtitle: imgtitle,
        },
      }) as any
    );
  };
  return (
    <section id="send_post_user">
      <div className="send_post_user">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Post Image Addres"
            variant="standard"
            onChange={(e) => setimgsrc(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Post Title"
            variant="standard"
            onChange={(e) => setimgtitle(e.target.value)}
          />

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>

          {/* <Typography gutterBottom variant="h6" component="span">or</Typography> */}

          <Button
            variant="contained"
            endIcon={<SendIcon />}
            style={{ width: "110px" }}
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
      </div>
    </section>
  );
};

export default SendPostUser;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

function getUpdateduser(arg0: { userId: any; profileImg: string; bio: any; info: any; }): any {
  throw new Error("Function not implemented.");
}

function handleClose() {
  throw new Error("Function not implemented.");
}

