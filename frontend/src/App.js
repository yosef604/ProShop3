import {BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UsersListScreen from './screens/UsersListScreen'
import EditUserScreen from './screens/EditUserScreen'
import ProductsListScreen from './screens/ProductsListScreen'
import EditProductScreen from './screens/EditProductScreen'
import AdminOrdersListScreen from './screens/AdminOrdersListScreen'

const App = () => {
  return (
    <Router>
    <Header />
    <Container>
    <main className='py-3'>
      <Route path='/placeorder' component={PlaceOrderScreen} />
      <Route path='/order/:id' component={OrderScreen} />
      <Route path='/payment' component={PaymentMethodScreen} />
      <Route path='/shipping' component={ShippingScreen} />
      <Route path='/profile' component={ProfileScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/login' component={LoginScreen} />
      <Route path='/products/:id' component={ProductScreen} />
      <Route path='/cart/:id?' component={CartScreen} />
      <Route path='/admin/userslist' component={UsersListScreen} />
      <Route path='/admin/productslist' component={ProductsListScreen} exact />
      <Route path='/admin/productslist/:pageNumber' component={ProductsListScreen} exact />
      <Route path='/admin/orderslist' component={AdminOrdersListScreen} />
      <Route path='/admin/user/:id/edit' component={EditUserScreen} />
      <Route path='/admin/product/:id/edit' component={EditProductScreen} />
      <Route path='/search/:keyword' component={HomeScreen} exact />
      <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
      <Route path='/page/:pageNumber' component={HomeScreen} />
      <Route path='/' component={HomeScreen} exact />
    </main>
    </Container>
    <Footer />
    </Router>
  )

}

export default App;
