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
import SettingPage from "../pages/SettingPage";
import SavedArticlesPage from "../pages/SavedArticlesPage";
import FollowersListPage from "../features/users/FollowersListPage";
import FollowingListPage from "../features/users/FollowingListPage";
import AccountPage from "../pages/AccountPage";
import ProfilePage from "../features/users/ProfilePage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      {/* Public Routes */}
      <Route index element={<App />} />
      <Route path="/articles/:tag" element={<TagPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/users/profile/:id" element={<ProfilePage />} />


      {/* Private Routes */}
      <Route path="/user" element={<AuthLayout />}>
        <Route
          path="/user/account"
          element={<AccountPage />}
        />
        <Route
          path="/user/setting"
          element={<SettingPage />}
        />
        <Route
          path="/user/savedArticles"
          element={<SavedArticlesPage />}
        />
        <Route
          path="/user/followers"
          element={<FollowersListPage />}
        />
        <Route
          path="/user/following"
          element={<FollowingListPage />}
        />
      </Route>
    </Route>
  )
);
