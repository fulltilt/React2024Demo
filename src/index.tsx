import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore, RootState } from "./store";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={setupStore({} as RootState)}>
      <App />
    </Provider>
  </React.StrictMode>
);
