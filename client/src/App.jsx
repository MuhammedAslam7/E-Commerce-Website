import { UserLoginPage } from "./pages/user/UserLoginPage";
import { UserHomePage } from "./pages/user/UserHomePage";
import { OTPPage } from "./pages/user/OTPPage";
import { UserSignupPage } from "./pages/user/UserSignupPage";
import { UserProtectedRoute } from "./utils/UserProtectedRoute";
import { AdminProtectedRoute } from "./utils/AdminProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ProductPage } from "./pages/admin/ProductPage";
import { ProductAddPage } from "./pages/admin/ProductAddPage";
import { SamplePage } from "./pages/SamplePage";
import { ProductEditPage } from "./pages/admin/ProductEditPage";
import { ResetPasswordPage } from "./pages/user/ResetPasswordPage";
import { OTPPageResetPassword } from "./pages/user/OTPPageResetPassword";
import { ResetPasswordConfirmPage } from "./pages/user/ResetPasswordConfirmPage";
import { CategoryPage } from "./pages/admin/CategoryPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/sign-up" element={<UserSignupPage />} />
        <Route path="/verify-otp" element={<OTPPage />} />
        <Route path="/sign-in" element={<UserLoginPage />} />
        <Route path="/admin/sign-in" element={<AdminLogin />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-verify-otp" element={<OTPPageResetPassword />} />
        <Route
          path="/confirm-reset-password"
          element={<ResetPasswordConfirmPage />}
        />
        <Route path="/sample" element={<SamplePage />} />

        <Route
          //  User Protected Routes
          element={<UserProtectedRoute allowedRoles={["user", "admin"]} />}
        >
          <Route path="/user/home" element={<UserHomePage />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<AdminProtectedRoute allowedRoles={"admin"} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ProductPage />} />
          <Route
            path="/admin/products/add-products"
            element={<ProductAddPage />}
          />
          <Route
            path="/admin/products/edit-products/:id"
            element={<ProductEditPage />}
          />
          <Route path="/admin/category" element={<CategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
