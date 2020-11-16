import React, { Component } from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateUser from "./components/CreateUser";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/createUser" component={CreateUser} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
