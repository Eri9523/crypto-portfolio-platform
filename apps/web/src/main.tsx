import { createRoot } from "react-dom/client";
import { AppRouterProvider } from "./routes/provider";
import { diContainer } from "@monorepo-template/lib";
import { createAppConfig } from "./config/app-config";
import "./style.css";

try {
  const config = createAppConfig();
  diContainer.initialize(config);
} catch (error) {
  console.error("Failed to initialize application:", error);
}

const root = createRoot(document.getElementById("app")!);

root.render(<AppRouterProvider />);
