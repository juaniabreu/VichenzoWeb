
import './App.css'
import Login from './auth/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Header from './pages/Header'
import { ProductoProvider } from './services/ProductContext'
import ProductList from './pages/user/ProductList'
import ShoppingCart from './pages/user/ShoppingCart'
import { CartProvider } from './services/CartContext'
import Admin from './pages/admin/Admin'

function App() {

  return (
    <>
    <BrowserRouter>
    <ProductoProvider>
      <CartProvider>
    <Header/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/productos" element={<ProductList/>}/>
        <Route path='/checkout' element={<ShoppingCart/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
      </CartProvider>
      </ProductoProvider>
    </BrowserRouter>      
    </>
  )
}

export default App
