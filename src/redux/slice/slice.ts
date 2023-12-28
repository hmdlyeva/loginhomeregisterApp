import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import axios, { AxiosResponse } from "axios";

export interface User {
  id?: string;
  // myposter?: [];
  name: string;
  surname: string;
  // age: number;
  // country: string;
  // info: string;
  username: string;
  // gender: string;
  password: string;
  // bio: string;
  email: string;
  number: string;
  // isLogin:boolean;
  // ispublic: boolean;
  // ntfctncontent?:string,
}



export const getUsersData = createAsyncThunk("users/getUsersData", async () => {
  const token = JSON.parse(localStorage.getItem('token') || '{}')
  const response: AxiosResponse<User[]> = await axios.get(
    "https://userapideployda.onrender.com/users", {
      headers:{
        Authorization:`barear ${token.token}`,
        RefreshToken:`barear ${token.refToken}`
      }
    }
  );
  return response.data;
});

export const postUsersData = createAsyncThunk(
  "users/postUsersData",
  async (newUser: User) => {
    console.log(newUser);
    const response: AxiosResponse<User[], void> = await axios.post(
      "https://userapideployda.onrender.com/users",
      {
        ...newUser,
        id: uuidv4(),
      }
    );
    //  .then((res) => console.log(res));
    return response.data;
  }
);

interface MyFollow {
  id: string;
  userId: string;
  geden: string;
}

interface Myposter {
  id: string;
  userId: string;
  imgsrc: string;
  imgtitle: string;
}

export const updateMyFollow = createAsyncThunk(
  "users/updateMyFollow",
  async ({
    userId,
    geden,
    myfollow,
  }: {
    userId: string;
    geden: string;
    myfollow: MyFollow;
  }) => {
    const user = await axios.get(
      `https://userapideployda.onrender.com/users/${userId}`
    );

    const newMyFollowArray = [...user.data.myfollow, myfollow];

    const response: AxiosResponse<User> = await axios.patch(
      `https://userapideployda.onrender.com/users/${userId}`,
      { myfollow: newMyFollowArray }
    );
    return response.data;
  }
);

export const getUpdateduser = createAsyncThunk(
  "users/getUpdateduser",
  async ({
    userId,
    profileImg,
    bio,
    info,
  }: {
    userId: string;
    profileImg: string;
    bio: string;
    info: string;
  }) => {
    const response: AxiosResponse<User> = await axios.patch(
      `https://userapideployda.onrender.com/users/${userId}`,
      { profileimg: profileImg, bio: bio, info: info }
    );
    return response.data;
  }
);

export const getUpdateduserByPost = createAsyncThunk(
  "users/getUpdateduserByPost",
  async ({
    userId,
    imgsrc,
    imgtitle,
    myposter,
  }: {
    userId: string;
    imgsrc: string;
    imgtitle: string;
    myposter: Myposter;
  }) => {
    const user = await axios.get(
      `https://userapideployda.onrender.com/users/${userId}`
    );

    const newMyPosterArray = [...user.data.myposter, myposter];


    const response: AxiosResponse<User> = await axios.patch(
      `https://userapideployda.onrender.com/users/${userId}`,
      { myposter: newMyPosterArray}
    );
    return response.data;
  }
);

export const deleteUserFromMyFollow = createAsyncThunk(
  "users/deleteUserFromMyFollow",
  async ({ userId, loggedInUserId }: { userId: string; loggedInUserId: string }) => {
    const loggedInUser = await axios.get(
      `https://userapideployda.onrender.com/users/${loggedInUserId}`
    );

    const updatedMyFollowArray = loggedInUser.data.myfollow.filter(
      (user: { id: string }) => user.id !== userId
    );

    const response: AxiosResponse<User> = await axios.patch(
      `https://userapideployda.onrender.com/users/${loggedInUserId}`,
      { myfollow: updatedMyFollowArray }
    );
    return response.data;
  }
);


export interface UserState {
  user: User;
  users: User[];
  isLogin: boolean;
}
export interface Id {
  _id: string;
}
const initialState: UserState = {
  user: {
    name: "",
    surname: "",
    username: "",
    password: "",
    email: "",
    number: "",
    // isLogin: false
  },
  users: [],
  isLogin: false,
};

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<User>) => {
      const { payload } = action;
      let obj: User = {
        name: payload.name,
        surname: payload.surname,
        username: payload.username,
        password: payload.password,
        email: payload.email,
        number: payload.number,
        // isLogin:payload.isLogin
      };
      state.user = obj;
    },
    login: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getUsersData.rejected, (state, action) => {
        console.error("Failed to get news data:", action.error);
      })
      .addCase(postUsersData.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(postUsersData.rejected, (state, action) => {
        console.error("Failed to post user data:", action.error);
      })
      .addCase(updateMyFollow.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const userIndex = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        }
      })
      .addCase(updateMyFollow.rejected, (state, action) => {
        console.error("Failed to update myfollow:", action.error);
      })
      .addCase(getUpdateduser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const userIndex = state.users.findIndex((user) => user.id === updatedUser.id);
        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        }
      })
      .addCase(getUpdateduser.rejected, (state, action) => {
        console.error("Failed to update user profile:", action.error);
      }).addCase(getUpdateduserByPost.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const userIndex = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        }
      })
      .addCase(getUpdateduserByPost.rejected, (state, action) => {
        console.error("Failed to update user by post:", action.error);
      });
  },
});

export const { getUser, login } = UserSlice.actions;

export default UserSlice.reducer;
