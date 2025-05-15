// src/router.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Transfer from "./pages/Transfer";
import Airtime from "./pages/Airtime";
import SchoolFees from "./pages/SchoolFees";
import AddMoney from "./pages/AddMoney";
import TVSubscription from "./pages/TVSubscription";
import CustomerCare from "./pages/CustomerCare";
import Me from "./pages/Me";
import MainLayout from "./layout/MainLayout";

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes Wrapped with MainLayout */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/transfer"
        element={
          <MainLayout>
            <Transfer />
          </MainLayout>
        }
      />
      <Route
        path="/airtime"
        element={
          <MainLayout>
            <Airtime />
          </MainLayout>
        }
      />
      <Route
        path="/school-fees"
        element={
          <MainLayout>
            <SchoolFees />
          </MainLayout>
        }
      />
      <Route
        path="/add-money"
        element={
          <MainLayout>
            <AddMoney />
          </MainLayout>
        }
      />
      <Route
        path="/tv-subscription"
        element={
          <MainLayout>
            <TVSubscription />
          </MainLayout>
        }
      />
      <Route
        path="/customer-care"
        element={
          <MainLayout>
            <CustomerCare />
          </MainLayout>
        }
      />
      <Route
        path="/me"
        element={
          <MainLayout>
            <Me />
          </MainLayout>
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;
