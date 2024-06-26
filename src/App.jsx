import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import Login from "./pages/Authentication & Authorization/Login";
import { useAuth } from "./components/Authentication"; // Import the useAuth hook
import Sales from "./pages/Advanced Analysis/Sales";
import Top20 from "./pages/Advanced Analysis/Top20";
import Forecast_sales_and_profit from "./pages/Forecast/Forecast";
import Loss from "./pages/Advanced Analysis/Loss";
import Signup from "./pages/Authentication & Authorization/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Contact from "./pages/Contact_Us";
import DataTable from "./pages/Data_Table";

function App() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        //if authenticated
        {!isAuthenticated ? (
          <>
            <Route
              path="/"
              element={
                <>
                  <PageTitle title="Dashboard | Financial Planning" />
                  <Dashboard />
                </>
              }
            />
            <Route
              path="/Advance Analysis/Sales"
              element={
                <>
                  <PageTitle title="Sales | Financial Planning" />
                  <Sales />
                </>
              }
            />
            <Route
              path="/Advance Analysis/Top 20"
              element={
                <>
                  <PageTitle title="Top 20 | Financial Planning" />
                  <Top20 />
                </>
              }
            />
            <Route
              path="/Advance Analysis/Loss"
              element={
                <>
                  <PageTitle title="Loss | Financial Planning" />
                  <Loss />
                </>
              }
            />

            <Route
              path="/forecast"
              element={
                <>
                  <PageTitle title="Forecast | Financial Planning" />
                  <Forecast_sales_and_profit />
                </>
              }
            />
            <Route
              path="/contact_us"
              element={
                <>
                  <PageTitle title="Contact Us | Financial Planning" />
                  <Contact />
                </>
              }
            />
            <Route
              path="/data_table"
              element={
                <>
                  <PageTitle title="Data Table | Financial Planning" />
                  <DataTable />
                </>
              }
            />
          </>
        ) : (
          // If the user is not authenticated, render the Login route
          <>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
