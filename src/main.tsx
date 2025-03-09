import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./components/App";
import { AppProvider } from "./contexts/AppContext/AppProvider";
import { ConfigProvider } from "antd";
import ru_RU from "antd/lib/locale/ru_RU";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={ru_RU}>
        <AppProvider>
          <App />
        </AppProvider>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
