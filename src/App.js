import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Client from "./Client";
import Host from "./Host";

const App = () => (
  <BrowserRouter>
    <Route path="/" component={Client} />
    <Route path="/host" component={Host} />
  </BrowserRouter>
);

export default App;
