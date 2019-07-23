import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import List from "./components/List";
import Starship from "./components/Starship";

const App = () => {
  return (
    <div className="App">
      <Router>
      <h1>SW Shipping</h1>
        <Route path="/" exact component={List} />
        <Route path="/starships/:id" component={Starship} />
      </Router>
    </div>
  );
};

export default App;
