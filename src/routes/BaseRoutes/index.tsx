import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { UserSignupPage } from "@/pages/UserSignupPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { ProductListPage } from "@/pages/ProductListPage";
import { ProductPage } from "@/pages/ProductPage";
import { CartPage } from "@/pages/CartPage";
import  CheckoutPage  from "@/pages/CheckoutPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { OrdersPlacedPage } from "@/pages/OrdersPlacedPage";
import { AddressPage } from "@/pages/AddressPage";
//import { NotFoundPage } from "@/pages/NotFoundPage";

export function BaseRoutes() {
  return (
      <>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<UserSignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
            <Route path="/address" element={<AddressPage />} />

          {/* Protected Routes */}
          <Route element={<AuthenticatedRoutes />}>

            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/*<Route path="/orders" element={<OrdersPlacedPage />} />*/}
            {/*<Route path="/address" element={<AddressPage />} />*/}
          </Route>
        </Routes>
      </>
  );
}
