import axios from "axios";
const client = axios.create({
  baseURL: "/api",
});
client.interceptors.request.use((r) => {
  window.NProgress.start();
  return r;
});
client.interceptors.response.use((r) => {
  window.NProgress.done();
  return r;
});

export const getProducts = async () => {
  return client.get("/products").then(({ data }) => data);
};

export const searchProducts = async (filter) => {
  return client.post("/products/search", { filter });
};

export const login = async (user) => {
  return client.post("/login", user);
};
