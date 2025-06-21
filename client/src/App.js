import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <main className="py-3">
        <Container>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
        </Container>
      </main>
    </Router>
  );
};

export default App;