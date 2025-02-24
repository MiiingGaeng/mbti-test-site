import { Link, useNavigate } from "react-router-dom";
import useLoginStore from "../zustand/loginStore";

const Home = () => {
  //-----zustand-----
  const { isAuthenticated } = useLoginStore((state) => state);
  //-----navigate-----
  const navigate = useNavigate();

  //TEST 이동 전 로그인 여부 판단
  const handleMoveToTest = () => {
    //로그인 되어있을 때 => Test Page로 이동
    if (isAuthenticated) {
      navigate("/test");
    }
    //로그인 안되어있을 때 => Login Page로 이동
    else {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  };

  return (
    <div>
      <Link to="/results">
        <button>결과 보러가기</button>
      </Link>
      <button type="button" onClick={handleMoveToTest}>
        TEST 하러 가기
      </button>
    </div>
  );
};

export default Home;
