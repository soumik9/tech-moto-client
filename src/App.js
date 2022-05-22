import './App.css';
import Home from './pages/Home/Home';
import { Routes, Route } from "react-router-dom";
import Header from './pages/Shared/Header/Header';

function App() {
  return (
    <div className="">

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

    </div>
  );
}

export default App;
