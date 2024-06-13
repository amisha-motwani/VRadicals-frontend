import React, { Suspense, useEffect } from "react";
import { HashRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./scss/style.scss";
import "./index.css";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticate = sessionStorage.getItem("auth-token");
  const location = useLocation();

  if (isAuthenticate) {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/" />;
  }
};


const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
        
          {/* Protected Routes */}
          <Route
            path="*"
            name="Home"
            element={<PrivateRoute element={DefaultLayout} />}
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
