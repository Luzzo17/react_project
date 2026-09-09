import { Route, Routes } from "react-router-dom";
import Timer from "./components/Timer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Consigli from "./pages/Consigli";
import "./App.css";
import Images from "./components/Images";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Navbar />
      <Images />
      <main className="App" style={{ marginTop: '20vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/consigli" element={<Consigli />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
