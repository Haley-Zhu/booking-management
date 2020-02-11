import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./components/Routes";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <Routes /> */}
        Hello
      </Provider>
    );
  }
}

export default App;
