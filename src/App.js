import './App.css';
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home/Home';
import Header from './pages/Shared/Header/Header';
import Footer from './pages/Shared/Footer/Footer';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Blog from './pages/Blog/Blog';
import NotFound from './pages/Shared/NotFound/NotFound';
import Portfolio from './pages/Portfolio/Portfolio';
import Purchase from './pages/Purchase/Purchase';
import RequiredAuth from './pages/Shared/RequiredAuth/RequiredAuth';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import AddReview from './pages/Dashboard/AddReview/AddReview';
import DashboardContent from './pages/Dashboard/DashboardContent/DashboardContent';
import MyOrders from './pages/Dashboard/MyOrders/MyOrders';
import MyProfile from './pages/Dashboard/MyProfile/MyProfile';

function App() {
  return (
    <div className="">

      <Header />
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* required auth */}
        <Route path="/tool/:toolId" element={
          <RequiredAuth>
            <Purchase />
          </RequiredAuth>
        } />

        <Route path="/blog" element={<Blog />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* dashboard routes */}
        <Route path="/dashboard" element={
              <RequiredAuth> <Dashboard /> </RequiredAuth> }>  

          <Route index element={<DashboardContent />}></Route>
          <Route path='add-review' element={<AddReview />}></Route>
          <Route path='my-orders' element={<MyOrders />}></Route>
          <Route path='profile' element={<MyProfile />}></Route>

        </Route>
        {/* dashboard routes */}




        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
