import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { captureAttribution } from "./lib/attribution";

// Read utm_* / gclid off the landing URL before any client-side navigation
// can replace the query string (see lib/attribution.ts).
captureAttribution();

createRoot(document.getElementById("root")!).render(<App />);
