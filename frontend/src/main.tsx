// Package Imports
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// CSS
import "./main.css";

// Routes Index
import { router } from "./router/index.tsx";

// Toast Imports
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      theme="colored"
      transition={Bounce}
    />
  </>
);
