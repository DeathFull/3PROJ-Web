import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.uni-finance.fr/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
