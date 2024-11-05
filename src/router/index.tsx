import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from '../App';
import { Home, UserLayout, SignIn, SignUp, Contract, Exchange, Product, Transaction, Cart, EmailVerify } from "../modules";


const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign_up" element={<SignUp />} />
        <Route path="verify-email" element={<EmailVerify/>} />
        <Route path="user-layout" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="contract" element={<Contract />} />
          <Route path="product/:id" element={<Exchange />} />
          <Route path="product" element={<Product />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default Router
