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
import TagPage from "../pages/TagPage";
import ProfilePage from "../pages/ProfilePage";
import SettingPage from "../pages/SettingPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      {/* Public Routes */}
      <Route index element={<App />} />
      <Route path="/articles/:tag" element={<TagPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Private Routes */}
      <Route path="/user" element={<AuthLayout />}>
        <Route path="/user/profile" element={<ProfilePage />} />
        <Route path="/user/setting" element={<SettingPage />} />

      </Route>
    </Route>
  )
);
