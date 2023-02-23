import {BrowserRouter , Route, Routes} from 'react-router-dom'
import {Login, Customer, Seller, AddProduct, Admin, MyCart, SellerLogin, AdminLogin} from './Pages'
function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/customer' element={<Customer/>}/>
        <Route path='/customer/:id' element={<Customer/>}/>
        <Route path='/customer/myCart' element={<MyCart/>}/>
        <Route path='/seller' element={<Seller/>}/>
        <Route path='/seller/addProduct' element={<AddProduct/>}/>
        <Route path='/sellerLogin' element={<SellerLogin/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
