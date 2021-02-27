import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const Container = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const history = useHistory();
  const toggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={isCollapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />} active={true}>
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
          <Button onClick={() => history.push("/login")}>Log out</Button>
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
};
export default Container;
