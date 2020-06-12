import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./routes/Routes";
import TopNav from './routes/topNav';
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <TopNav /> */}
        <Routes />
      </Provider>
    );
  }
}

export default App;
