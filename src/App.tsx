import { BrowserRouter, Route, Routes } from "react-router-dom";
import BottomNavigationLayout from "./components/BottomNavigationLayout";
import { lazy, Suspense } from "react";
import BottomButtonLayout from "./components/BottomButtonLayout";
import IdRecovery from "./pages/IdRecovery";
import NotFound from "./pages/NotFound";
import PwdRecovery from "./pages/PwdRecovery";
import LoadingScreen from "./components/LoadingScreen";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Search = lazy(() => import("./pages/Search"));
const Location = lazy(() => import("./pages/Location"));
const Mypage = lazy(() => import("./pages/Mypage"));
const Write = lazy(() => import("./pages/Write"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<BottomNavigationLayout />}>
            <Route index element={<Home />} />
            <Route path="/location" element={<Location />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/write" element={<Write />} />
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
