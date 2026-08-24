import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MediaProvider } from "./context/mediaContext.tsx";
import { MediaFilterProvider } from "./context/mediaFilter.tsx";
import { InterfaceProvider } from "./context/interfaceContext.tsx";
import { MediaSearchProvider } from "./context/mediaSearchContext.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InterfaceProvider>
      <MediaProvider>
        <MediaFilterProvider>
          <MediaSearchProvider>
            <BrowserRouter basename={import.meta.env.VITE_BASE || "/"}>
              <App />
            </BrowserRouter>
          </MediaSearchProvider>
        </MediaFilterProvider>
      </MediaProvider>
    </InterfaceProvider>
  </StrictMode>,
);
