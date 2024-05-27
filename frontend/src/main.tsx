// Package Imports
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// CSS
import "./main.css";

// Routes Index
import { router } from "./router/index.tsx";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(<RouterProvider router={router} />);
