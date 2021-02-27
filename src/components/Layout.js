import React, { useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import useLocalStorage from "react-use-localstorage";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const Container = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isLogged, setIsLogged] = useLocalStorage("isLogged", "false");
  const history = useHistory();
  const toggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  const logout = () => {
    setIsLogged("false");
    history.push("/login");
  };
  useEffect(() => {
    if (isLogged === "false") {
      history.push("/login");
    }
  }, [isLogged, history]);
  if (isLogged === "true") {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={isCollapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<ShoppingOutlined />} active={true}>
              Products
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background header"
            style={{ padding: 0 }}
          >
            {React.createElement(
              isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <Button onClick={logout}>Logout</Button>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
  return <></>;
};
export default Container;
