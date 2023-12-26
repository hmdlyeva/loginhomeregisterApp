import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersData, login } from "./../../redux/slice/slice";
import type { RootState } from "./../../redux/store/store";
import Homepage from "../../component/home/Homepage";

const HomePage = () => {
  const dispatch = useDispatch();

  const isLogin = useSelector((state: RootState) => state.users.isLogin);
console.log(isLogin);
  return isLogin ? <Homepage /> : null;
};

export default HomePage;
