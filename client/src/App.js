import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Product from './pages/Product';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/product/:id" component={Product} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
