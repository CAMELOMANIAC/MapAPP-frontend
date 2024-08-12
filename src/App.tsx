import { BrowserRouter, Route, Routes } from "react-router-dom";
import BottomNavigationLayout from "./components/BottomNavigationLayout";
import { lazy, Suspense } from "react";
import BottomButtonLayout from "./components/BottomButtonLayout";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AccountRecovery = lazy(() => import("./pages/AccountRecovery"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<BottomNavigationLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<Home />} />
          </Route>
          <Route path="/login" element={<BottomButtonLayout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/register" element={<BottomButtonLayout />}>
            <Route index element={<Register />} />
          </Route>
          <Route path="/account_recovery">
            <Route index element={<AccountRecovery />} />
          </Route>
          <Route path="/test" element={<BottomButtonLayout />}>
            <Route index element={<AccountRecovery />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
