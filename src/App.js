import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Client from "./client";
import Host from "./host";

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={Client} />
    <Route path="/host" component={Host} />
  </BrowserRouter>
);

export default App;
