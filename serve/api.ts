import axios from "axios";

const headers = {"Content-Type": "text/plain;charset=utf-8" };

const api = axios.create({
//   baseURL: process.env.BASE_URL,
  baseURL: 'https://script.google.com/macros/s/AKfycbxpsiEqkJfMlCkgwE5o6JQLMr2KqvKOCGKtY4XtV8nPfy5qGRTYzEjzDs8Vw1H3813Y',
  headers,
});
export default api;
