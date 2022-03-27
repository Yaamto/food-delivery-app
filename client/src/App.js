import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/authenticate/Login";
import Register from "./pages/authenticate/Register";
import MyOrders from "./pages/myOrder/MyOrders";
import Products from "./pages/admin/products/Products";
import Orders from "./pages/admin/orders/Orders";
import ProtectedRoutes from "./components/protectedRoute/ProtectedRoutes";
import Navbar from "./components/navbar/Navbar";
import AdminProtectedRoutes from "./components/protectedRoute/AdminProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />}>
      </Route>
      <Route path="/register" element={<Register />}>
      </Route>
      <Route path="/login" element={<Login />}>
      </Route>
      <Route path="/orders"
            element={
              <ProtectedRoutes>
                <MyOrders />           
              </ProtectedRoutes>
            }
        />
      {/* <Route path="/orders" element={<MyOrders />}>
      </Route> */}
 <Route path="/admin/products"
            element={
              <AdminProtectedRoutes>
                <Products />          
              </AdminProtectedRoutes>
            }
        />
         <Route path="/admin/orders"
            element={
              <AdminProtectedRoutes>
                <Orders />          
              </AdminProtectedRoutes>
            }
        />
      
      {/* <Route path="/admin/products" element={<Products />}>
      </Route> */}
      {/* <Route path="/admin/orders" element={<Orders />}>
      </Route> */}
    </Routes>
  </BrowserRouter>
  )
}

export default App;
