import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import SendIcon from "@mui/icons-material/Send";

import Typography from "@mui/material/Typography";

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
type Props = {};

const SendStoryUser = (props: Props) => {
  return (
    <section id="send_story_user">
      <div className="send_story_user">
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
            label="Story Image Addres"
            variant="standard"
          />

          <TextField
            id="standard-basic"
            label="Story Title"
            variant="standard"
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
          >
            Send
          </Button>
        </Box>
      </div>
    </section>
  );
};

export default SendStoryUser;
