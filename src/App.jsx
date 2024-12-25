import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/router";
import { useState } from "react";
import { createContext } from "react";
export const LoginRegisterContext = createContext();
function App() {
  const [loginRegister, setLoginRegister] = useState("login");
  return (
    <div style={{ width: "100%" }}>
      <LoginRegisterContext.Provider
        value={{ loginRegister, setLoginRegister }}
      >
        <RouterProvider router={router} />
      </LoginRegisterContext.Provider>
    </div>
  );
}

export default App;
