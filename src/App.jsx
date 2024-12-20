import "./App.css";
import Login from "./auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./pages/Header";
import { ProductoProvider } from "./services/ProductContext";
import ProductList from "./pages/user/ProductList";
import ShoppingCart from "./pages/user/ShoppingCart";
import { CartProvider } from "./services/CartContext";
import Admin from "./pages/admin/Admin";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { ProtectedRoute } from "./services/ProtectedRoute";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
        <ProductoProvider>
          <CartProvider>
            {user && <Header />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/productos"
                element={
                  <ProtectedRoute
                    isAllowed={
                      !!user &&
                      (user.authorities.includes("ROLE_USER") ||
                        user.authorities.includes("ROLE_ADMIN"))
                    }
                  >
                    <ProductList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute
                    isAllowed={
                      !!user &&
                      (user.authorities.includes("ROLE_USER") ||
                        user.authorities.includes("ROLE_ADMIN"))
                    }
                  >
                    <ShoppingCart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute
                    isAllowed={
                      !!user && user.authorities.includes("ROLE_ADMIN")
                    }
                  >
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </CartProvider>
        </ProductoProvider>
    </>
  );
}

export default App;
