import UserLogin from "./pages/user/Login/UserLogin";
import HomePage from "./pages/user/homePage/HomePage";
import OTPPage from "./pages/user/OTPPage/OTPPage";
import UserSignup from "./pages/user/Signup/UserSignup";
import { ProtectedRoute } from "./utils/Protect";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLogin } from "./pages/admin/Login/AdminLogin";
import AdminDashboard from "./pages/admin/Login/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<UserSignup />} />
        <Route path="/verify-otp" element={<OTPPage />} />
        <Route path="/sign-in" element={<UserLogin />} />

        <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
          <Route path="/user/home" element={<HomePage />} />
        </Route>

        <Route path="/admin/sign-in" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
