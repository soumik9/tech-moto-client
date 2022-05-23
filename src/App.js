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

function App() {
  return (
    <div className="">

      <Header />
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tool/:toolId" element={<Purchase />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
