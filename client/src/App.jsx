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
import { ProductEditPage } from "./pages/admin/ProductEditPage";
import { ResetPasswordPage } from "./pages/user/ResetPasswordPage";
import { OTPPageResetPassword } from "./pages/user/OTPPageResetPassword";
import { ResetPasswordConfirmPage } from "./pages/user/ResetPasswordConfirmPage";
import { CategoryPage } from "./pages/admin/CategoryPage";
import { CategoryAddPage } from "./pages/admin/CategoryAddPage";
import { UsersPage } from "./pages/admin/UsersPage";
import { ProductDetailsPage } from "./pages/user/ProductDetailsPage";
import { BrandPage } from "./pages/admin/BrandPage";
import { BrandAddPage } from "./pages/admin/BrandAddPage";
import { UserLoginAuth } from "./utils/UserLoginAuth";
import { ProductListPage } from "./pages/user/ProductListPage";
import { CartPage } from "./pages/user/CartPage";
import { ProductsVariantsAddPage } from "./pages/admin/ProductsVariantsAddPage";
import { UserProfilePage } from "./pages/user/profile/UserProfilePage";
import { UserAddressPage } from "./pages/user/profile/UserAddressPage";
import { UserChangePassword } from "./pages/user/profile/UserChangePassword";
import { CheckoutPage } from "./pages/user/CheckoutPage";
import { PaymentPage } from "./pages/user/PaymentPage";
import { OrderSuccessPage } from "./pages/user/OrderSuccessPage";
import { OrdersPage } from "./pages/user/profile/OrdersPage";
import { OrderDetailsPage } from "./pages/user/profile/OrderDetailspage";
import { OrdersListPage } from "./pages/admin/OrdersListPage";
import { OrderManagePage } from "./pages/admin/OrderManagePage";
import { OfferPage } from "./pages/admin/OfferPage";
import { OfferAddPage } from "./pages/admin/OfferAddPage";
import { SalesReportPage } from "./pages/admin/SalesReportPage";
import { WishListPage } from "./pages/user/WishListPage";
import { WalletPage } from "./pages/user/profile/WalletPage";
import { ReturnItemsPage } from "./pages/admin/ReturnItemsPage";
import { CouponPage } from "./pages/admin/CouponPage";
import { CouponAddPage } from "./pages/admin/CouponAddPage";
import { OfferEditPage } from "./pages/admin/OfferEditPage";
import { CouponEditPage } from "./pages/admin/CouponEditPage";
import { ErrorPage } from "./pages/user/ErrorPage";
import { PaymentFailedPage } from "./pages/user/PaymentFailedPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route element={<UserLoginAuth />}>
          <Route path="/verify-otp" element={<OTPPage />} />
          <Route path="/sign-up" element={<UserSignupPage />} />
          <Route path="/sign-in" element={<UserLoginPage />} />
        </Route>
        <Route path="/admin/sign-in" element={<AdminLogin />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-verify-otp" element={<OTPPageResetPassword />} />
        <Route
          path="/confirm-reset-password"
          element={<ResetPasswordConfirmPage />}
        />

        {/* User Protected Routes */}
        {/* <Route
          element={<UserProtectedRoute allowedRoles={["user", "admin"]} />}
        > */}
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/*" element={<ErrorPage />} />

        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
        <Route path="/product-list" element={<ProductListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/address" element={<UserAddressPage />} />
        <Route path="/change-password" element={<UserChangePassword />} />
        <Route path="/change-password" element={<UserChangePassword />} />
        <Route path="/checkout-page" element={<CheckoutPage />} />
        <Route path="/payment-page" element={<PaymentPage />} />
        <Route path="/order-success-page" element={<OrderSuccessPage />} />
        <Route path="/my-orders" element={<OrdersPage />} />
        <Route path="/order-details/:orderId" element={<OrderDetailsPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/payment-failed-page" element={<PaymentFailedPage />} />
        {/* </Route>rs */}

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
          <Route
            path="/admin/category/add-category"
            element={<CategoryAddPage />}
          />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/brands" element={<BrandPage />} />
          <Route path="/admin/brands/add-brands" element={<BrandAddPage />} />
          <Route
            path="/admin/products/add-variants/:productId"
            element={<ProductsVariantsAddPage />}
          />
          <Route path="/admin/orders" element={<OrdersListPage />} />
          <Route
            path="/admin/orders/order-manage/:orderId"
            element={<OrderManagePage />}
          />
          <Route path="/admin/offers" element={<OfferPage />} />
          <Route path="/admin/offers/add-offer" element={<OfferAddPage />} />
          <Route
            path="/admin/offers/edit-offer/:id"
            element={<OfferEditPage />}
          />
          <Route path="/admin/sales-report" element={<SalesReportPage />} />
          <Route path="/admin/returns" element={<ReturnItemsPage />} />
          <Route path="/admin/coupons" element={<CouponPage />} />
          <Route path="/admin/coupons/add-coupon" element={<CouponAddPage />} />
          <Route
            path="/admin/coupons/edit-coupon/:id"
            element={<CouponEditPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
