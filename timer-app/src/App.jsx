import { Route, Routes } from "react-router-dom";
import Timer from "./components/Timer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Consigli from "./pages/Consigli";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="App" style={{ marginTop: '15vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/consigli" element={<Consigli />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
