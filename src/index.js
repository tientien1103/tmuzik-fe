import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import store from "./app/store";
import { Provider } from "react-redux";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
