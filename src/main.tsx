import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app.tsx";

import "./locales/configs.ts";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
