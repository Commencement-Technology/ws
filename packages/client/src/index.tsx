import "core-js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <div>Hello World!</div>
  </StrictMode>
);
