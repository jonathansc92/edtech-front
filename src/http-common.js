import axios from "axios";
export default axios.create({
  // baseURL: process.env.API,
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-type": "application/json"
  }
});