import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import "./index.css";

const updateServiceWorker = registerSW({
  immediate: true,
  onOfflineReady() {
    window.dispatchEvent(new Event("revolution-pwa-offline-ready"));
  },
  onNeedRefresh() {
    void updateServiceWorker(true);
  },
});

createRoot(document.getElementById("root")!).render(<App />);
