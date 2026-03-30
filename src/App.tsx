import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Routes>
        {/* Halaman utama */}
        <Route index element={<LandingPage />} />
  
      </Routes>
    </>
  );
}

export default App;
