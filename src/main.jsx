import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { LanguageProvider } from "./i18n/LanguageProvider";

const root = createRoot(document.getElementById("root"));

root.render(
  <LanguageProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </LanguageProvider>
);
