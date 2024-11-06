import UserLogin from "./pages/Login/UserLogin";
import OTPPage from "./pages/user/OTPPage/OTPPage";
import UserSignup from "./pages/user/Signup/UserSignup";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<UserSignup />} />
        <Route path="/verify-otp" element={<OTPPage />} />
        <Route path="/sign-in" element={<UserLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
