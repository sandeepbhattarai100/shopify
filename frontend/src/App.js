
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import About from './pages/About';
import Error from './pages/Error';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/user/Dashboard';
import { PrivateRoute } from './components/routes/Private';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
// import { AdminRoute } from './components/routes/AdminRoute';
import CreateProduct from './pages/admin/CreateProduct';
import CreateCategory from './pages/admin/CreateCategory';
import User from './pages/admin/User';
import Analytics from './pages/admin/Analytics';
import Cart from './pages/user/Cart';




function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        {/* user */}
        <Route path='/dashboard' element={<PrivateRoute />} >

          <Route path='user' element={<Dashboard />} />
          <Route path='user/cart' element={<Cart />} />

        </Route>
        {/* admin */}
        <Route path='/dashboard' element={<AdminRoute />} >
          <Route path='admin' element={<AdminDashboard />}></Route>
          <Route path='admin/create-product' element={<CreateProduct />}></Route>
          <Route path='admin/create-category' element={<CreateCategory />}></Route>
          <Route path='admin/user' element={<User />}></Route>
          <Route path='admin/analytics' element={<Analytics />}></Route>
        </Route >
        <Route path='*' element={<Error />} />
      </Routes>


    </>
  );
}

export default App;
