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
  const response: AxiosResponse<User[]> = await axios.get(
    "https://userapideployda.onrender.com/users"
  );
  return response.data;
});

export const postUsersData = createAsyncThunk(
  "users/postUsersData",
  async (newUser: User) => {
    console.log(newUser);
    const response: AxiosResponse<User[], void> = await axios
      .post("https://userapideployda.onrender.com/users", {
        ...newUser,
        id: uuidv4(),
      })
    //  .then((res) => console.log(res));
    return response.data;
  }
);

export interface UserState {
  user: User;
  users: User[];
  isLogin:boolean
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
  isLogin: false
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
    login:(state, action: PayloadAction<boolean>)=>{
      state.isLogin = action.payload
    }
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
      });
  },
});

export const { getUser,login } = UserSlice.actions;

export default UserSlice.reducer;
