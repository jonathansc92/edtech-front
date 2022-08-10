import axios from "axios";
export default axios.create({
  baseURL: process.env.API,
  headers: {
    "Content-type": "application/json"
  }
});