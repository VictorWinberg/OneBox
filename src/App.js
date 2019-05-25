import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Client from "./client";
import Login from "./client/login";
import Host from "./host";

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={Client} />
    <Route path="/login" component={Login} />
    <Route path="/host" component={Host} />
  </BrowserRouter>
);

export default App;
