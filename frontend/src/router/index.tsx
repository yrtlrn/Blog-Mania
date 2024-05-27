import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../app/App";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route path="login" element={<LoginPage />} />

      {/* Private Routes */}
    </Route>
  )
);
