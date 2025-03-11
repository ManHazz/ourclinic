import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./Home.jsx";
import PatientTab from "./PatientTab.jsx";
import SchedulesTab from "./Schedulestab.jsx";
import AppointmentTab from "./AppointmentTab.jsx";
import MedicineTab from "./MedicineTab.jsx";

const router = createBrowserRouter([
  { path: "/home", element: <Home /> },
  { path: "/patients", element: <PatientTab /> },
  { path: "/schedules", element: <SchedulesTab /> },
  { path: "/appointments", element: <AppointmentTab /> },
  { path: "/medicines", element: <MedicineTab /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
