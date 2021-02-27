import React from "react";
import { Form, Input, Button } from "antd";
import { Typography } from "antd";
import { login } from "../services/api";
import { useHistory } from "react-router-dom";
const Login = () => {
  const router = useHistory();
  const onFinish = (values) => {
    console.log("Success:", values);
    login(values).then(({ data: { isSuccess } }) => {
      if (isSuccess) {
        router.push("/products");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login">
      <Typography.Title
        style={{
          marginBottom: "5px",
        }}
      >
        Login
      </Typography.Title>
      <Typography.Text
        style={{
          color: "#9FA5AF",
        }}
      >
        Sign In to your account
      </Typography.Text>
      <div class="login_form">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="passowrd"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
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
};

export default Login;
