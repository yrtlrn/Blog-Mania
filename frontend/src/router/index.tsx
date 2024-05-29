// Package Imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Layout Imports
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";

// Page Imports
import App from "../app/App";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AuthTest from "../pages/AuthTest";
import TagPage from "../pages/TagPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      {/* Public Routes */}
      <Route index element={<App />} />
      <Route path="/articles/:tag" element={<TagPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Private Routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="/test" element={<AuthTest />} />
      </Route>
    </Route>
  )
);
