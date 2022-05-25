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
import Payment from './pages/Dashboard/Payment/Payment';
import AllOrders from './pages/Dashboard/AllOrders/AllOrders';
import MakeAdmin from './pages/Dashboard/MakeAdmin/MakeAdmin';
import ManageTools from './pages/Dashboard/ManageTools/ManageTools';
import AddTool from './pages/Dashboard/AddTool/AddTool';
import RequiredAdmin from './pages/Shared/RequiredAdmin/RequiredAdmin';
import RequiredUser from './pages/Shared/RequiredUser/RequiredUser';

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

          {/* user routes */}
          <Route path='add-review' element={<RequiredUser><AddReview /></RequiredUser> }></Route>
          <Route path='my-orders' element={<RequiredUser><MyOrders /></RequiredUser>}></Route>
          <Route path='payment/:orderId' element={<RequiredUser><Payment /></RequiredUser>}></Route>

          {/* admin routes */}
          <Route path='all-orders' element={<RequiredAdmin><AllOrders /></RequiredAdmin>}></Route>
          <Route path='add-tool' element={<RequiredAdmin><AddTool /></RequiredAdmin>}></Route>
          <Route path='make-admin' element={<RequiredAdmin><MakeAdmin /></RequiredAdmin>}></Route>
          <Route path='tools' element={<RequiredAdmin><ManageTools /></RequiredAdmin>}></Route>

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
