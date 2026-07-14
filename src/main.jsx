import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "@fontsource/inter";
import "@fontsource/atkinson-hyperlegible-next";

import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);