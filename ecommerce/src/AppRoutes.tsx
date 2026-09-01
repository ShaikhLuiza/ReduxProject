import { Routes, Route } from "react-router-dom";

import App from "./App";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      <Footer />
    </>
  );
}

export default AppRoutes;