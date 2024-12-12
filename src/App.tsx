import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import BottomButtonLayout from "./components/layouts/BottomButtonLayout";
import BottomNavigationLayout from "./components/layouts/BottomNavigationLayout";
import LoadingScreen from "./components/ui/LoadingScreen";
import IdRecovery from "./pages/IdRecovery";
import NotFound from "./pages/NotFound";
import PwdRecovery from "./pages/PwdRecovery";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Search = lazy(() => import("./pages/Search"));
const Location = lazy(() => import("./pages/Location"));
const Mypage = lazy(() => import("./pages/Mypage"));
const Write = lazy(() => import("./pages/Write"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <BottomNavigationLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
    ],
  },
  {
    path: "/location",
    children: [
      {
        element: <BottomNavigationLayout xMargin="0px" />,
        children: [{ index: true, element: <Location /> }],
      },
      {
        path: "write",
        element: <BottomNavigationLayout />,
        children: [{ index: true, element: <Write /> }],
      },
    ],
  },
  {
    path: "/mypage",
    element: <BottomNavigationLayout xMargin="0px" />,
    children: [{ index: true, element: <Mypage /> }],
  },
  {
    path: "/login",
    element: <BottomButtonLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/register",
    element: <BottomButtonLayout />,
    children: [{ index: true, element: <Register /> }],
  },
  {
    path: "/account_recovery",
    element: <BottomButtonLayout />,
    children: [
      { path: "id", element: <IdRecovery /> },
      { path: "pwd", element: <PwdRecovery /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;
