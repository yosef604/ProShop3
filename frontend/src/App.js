import {BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

const App = () => {
  return (
    <Router>
    <Header />
    <Container>
    <main className='py-3'>
      <Route path='/' component={HomeScreen} exact />
      <Route path='/products/:id' component={ProductScreen} />
    </main>
    </Container>
    <Footer />
    </Router>
  )

}

export default App;
