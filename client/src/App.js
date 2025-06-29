import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import Placeorder from './pages/Placeorder';
import Order from './pages/Order';

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
            <Route path="/profile" component={Profile} />
            <Route path="/product/:id" component={Product} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/placeorder" component={Placeorder} />
            <Route path="/order/:id" component={Order} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
