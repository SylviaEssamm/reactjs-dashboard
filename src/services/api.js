import axios from "axios";
const client = axios.create({
  baseURL: "/api",
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
