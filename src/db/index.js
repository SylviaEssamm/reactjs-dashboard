import { createServer } from "miragejs";
import products from "./products.json";
import users from "./users.json";
const mockAPI = () => {
  createServer({
    routes() {
      this.namespace = "api";
      this.get(
        "/products",
        () => {
          return products;
        },
        {
          timing: 1000,
        }
      );
      this.post("/products/search", (_, b) => {
        const { filter } = JSON.parse(b.requestBody);

        return products.filter((product) => {
          let valid = true;
          if (
            filter.search &&
            !product.name.toLowerCase().includes(filter.search.toLowerCase())
          ) {
            valid = false;
          }
          if (filter.availableOnly && product.isExpire) {
            valid = false;
          }
          if (product.discountPrice) {
            if (
              !(
                product.discountPrice >= filter.price.min &&
                product.discountPrice <= filter.price.max
              )
            ) {
              valid = false;
            }
          } else {
            if (
              !(
                product.price >= filter.price.min &&
                product.price <= filter.price.max
              )
            ) {
              valid = false;
            }
          }
          return valid;
        });
      });
      this.post("/login", (_, b) => {
        const body = JSON.parse(b.requestBody);
        console.log(body);
        let isExist = users.find((user) => {
          return (
            user.username == body.username && user.password == body.password
          );
        });

        if (isExist) {
          return {
            isSuccess: true,
          };
        }
        return {
          isSuccess: false,
        };
      });
    },
  });
};

export default mockAPI;
