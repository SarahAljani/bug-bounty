import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Suspense } from "react";
import { ModalsProvider } from "@mantine/modals";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback="...Loading">
        <MantineProvider withGlobalStyles withNormalizeCSS >
          <ModalsProvider>
            <App />
          </ModalsProvider>
        </MantineProvider>
      </Suspense>
    </Provider>
  </StrictMode>
);
