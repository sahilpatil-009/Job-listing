import React from "react";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

const approuter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
const App = () => {
  return (
    <main>
      <RouterProvider router={approuter} />
    </main>
  );
};

export default App;
