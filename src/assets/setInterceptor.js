import React from "react";
import axios from "axios";

export const setInterceptor = (token) => {
  if (!token) return false;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return true;
};
