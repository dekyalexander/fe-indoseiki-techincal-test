import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const auth = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
