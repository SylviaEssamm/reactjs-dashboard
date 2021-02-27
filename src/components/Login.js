import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Typography } from "antd";
import { login } from "../services/api";
import { useHistory } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { toast } from "react-toastify";
const Login = () => {
  const router = useHistory();
  const [isLogged, setIsLogged] = useLocalStorage("isLogged", "false");
  const onFinish = (values) => {
    login(values).then(({ data: { isSuccess } }) => {
      setIsLogged(true);
      if (isSuccess) {
        toast.success("Login successfully");
        router.push("/products");
      } else {
        toast.error("Username or password is incorrect!");
      }
    });
  };
  useState(() => {
    if (isLogged === "true") {
      router.push("/products");
    }
  }, [isLogged]);
  if (isLogged === "false") {
    return (
      <div className="login">
        <Typography.Title className="login_title">Welcome!</Typography.Title>
        <Typography.Text
          style={{
            color: "#9FA5AF",
          }}
        >
          Sign in to your account
        </Typography.Text>
        <div class="login_form">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Login;
