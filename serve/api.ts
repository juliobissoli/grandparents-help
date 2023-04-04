import axios from "axios";

const headers = {"Content-Type": "text/plain;charset=utf-8" };

const api = axios.create({
//   baseURL: process.env.BASE_URL,
  baseURL: 'https://script.google.com/macros/s/AKfycbzuEPBjdFBnASbpDht92umRsihJsvwbI2tIIUiQZfcq82PP2BTpsCYEZq5Sn-J4W9Tj',
  headers,
});
export default api;
