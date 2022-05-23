import './App.css';
import Home from './pages/Home/Home';
import { Routes, Route } from "react-router-dom";
import Header from './pages/Shared/Header/Header';
import Footer from './pages/Shared/Footer/Footer';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { Toaster } from 'react-hot-toast';
import Blog from './pages/Blog/Blog';

function App() {
  return (
    <div className="">

      <Header />
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
