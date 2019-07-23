import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import List from "./components/List";
import Starship from "./components/Starship";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App container">
      <Router>

        <Link to="/">
          <h1 className="grey-text text-darken-2"><strong><i className="fab fa-old-republic"></i> SW SHIPPING</strong></h1>
        </Link>
        <Route path="/" exact component={List} />
        <Route path="/starships/:id" component={Starship} />
      </Router>
    </div>
  );
};

export default App;
