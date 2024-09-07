import { BrowserRouter, Route, Routes } from "react-router-dom";
import BottomNavigationLayout from "./components/BottomNavigationLayout";
import { lazy, Suspense } from "react";
import BottomButtonLayout from "./components/BottomButtonLayout";
import IdRecovery from "./pages/IdRecovery";
import NotFound from "./pages/NotFound";
import PwdRecovery from "./pages/PwdRecovery";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Write = lazy(() => import("./pages/Write"));
const Mypage = lazy(() => import("./pages/Mypage"));
const Location = lazy(() => import("./pages/Location"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<BottomNavigationLayout />}>
            <Route index element={<Home />} />
            <Route path="/location" element={<Location />} />
            <Route path="/write" element={<Write />} />
            <Route path="/mypage" element={<Mypage />} />
          </Route>
          <Route path="/login" element={<BottomButtonLayout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/register" element={<BottomButtonLayout />}>
            <Route index element={<Register />} />
          </Route>
          <Route path="/account_recovery" element={<BottomButtonLayout />}>
            {/* <Route index element={<AccountRecovery />} /> */}
            <Route path="id" element={<IdRecovery />} />
            <Route path="pwd" element={<PwdRecovery />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
