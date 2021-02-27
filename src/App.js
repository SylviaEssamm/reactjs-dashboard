import "antd/dist/antd.min.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Router path="/products">
          <Products />
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
