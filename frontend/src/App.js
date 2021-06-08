import {BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

const App = () => {
  return (
    <Router>
    <Header />
    <Container>
    <main className='py-3'>
      <Route path='/register' component={RegisterScreen} />
      <Route path='/login' component={LoginScreen} />
      <Route path='/products/:id' component={ProductScreen} />
      <Route path='/cart/:id?' component={CartScreen} />
      <Route path='/' component={HomeScreen} exact />
    </main>
    </Container>
    <Footer />
    </Router>
  )

}

export default App;
