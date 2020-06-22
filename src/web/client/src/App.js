import React from "react";
import "./App.css";
import "./bootstrap-gunmetal.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Herblore from "./components/herblore";
import { Switch, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

function App() {
  return (
    <div>
      <header>
        <Navbar variant="dark" bg="dark" expand="lg">
          <Link to="/" className="navbar-brand">
            OSRS Tools
          </Link>

          <Navbar.Toggle aria-controls="navbarSupportedContent" />

          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="mr-auto">
              <Link to="/diaries" className="nav-link">
                Diary
              </Link>
              <Link to="/herblore" className="nav-link">
                Herblore
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>

      <Container className="p-3" var="fluid">
        <Switch>
          <Route exact path="/" render={() => <p>Home page</p>} />
          <Route exact path="/herblore" component={Herblore} />
          <Route
            exact
            path="/diaries"
            render={() => <p>Diaries placeholder</p>}
          />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
