import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/index.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ThemeProvider from "./theme/index.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
