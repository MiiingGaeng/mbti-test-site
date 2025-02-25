import axios from "axios";

export const authApi = axios.create({
  baseURL: "https://www.nbcamp-react-auth.link"
});

export const jsonApi = axios.create({
  baseURL: "https://free-descriptive-innovation.glitch.me"
});
