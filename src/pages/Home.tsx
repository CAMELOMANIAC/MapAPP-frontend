import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDataStore } from "../utils/stores/userStore";

const Home = () => {
  const navigate = useNavigate();
  const { userName } = useUserDataStore((state) => ({
    userName: state.userName,
  }));

  //로그인이 되어있지 않다면 로그인 페이지로 이동
  useEffect(() => {
    if (!userName) {
      navigate("/login");
    }
  }, [navigate, userName]);

  return <></>;
};

export default Home;
