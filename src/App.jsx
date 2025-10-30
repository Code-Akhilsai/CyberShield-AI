import "./App.css";
import Home from "./Home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Loginpage.jsx";
import SignupPage from "./SignupPage.jsx";
import ThreatDetectionPage from "./ThreatDetectionPage.jsx";
import DashboardPage from "./DashboardPage.jsx";
import ProtectedRoute from "./ProtectedRoute";
import Splash from "./Splash.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/ThreatDetectionPage" element={<ThreatDetectionPage />} />
      </Route>
    </Routes>
  );
}

export default App;
