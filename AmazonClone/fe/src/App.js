import './App.css';
import NavBar from './components/header/NavBar';
import Newnav from './components/newnav/Newnav';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import SignIn from './components/signup/SignIn';
import SignUp from './components/signup/SignUp';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <NavBar />
    <Newnav />
    <Routes>
      <Route path='/' element={<Maincomp />}></Route>
      <Route path='/login' element={<SignIn />}></Route>
      <Route path='/register' element={<SignUp />}></Route>
      <Route path='/getproductsone/:id' element={<Cart />}></Route>
      <Route path='/buynow' element={<Buynow />}></Route>
    </Routes>
    <Footer />
    </>
  );
}

export default App;
