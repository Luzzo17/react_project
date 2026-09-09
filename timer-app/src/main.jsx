import ReactDOM from "react-dom/client";
import "./index.css";
import "./responsive.css";
import { HashRouter } from "react-router-dom";
import App from "./App";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
