import { Link, useNavigate } from "react-router-dom";
import useLoginStore from "../zustand/loginStore";
import Button from "../components/common/Button";
import { toast } from "react-toastify";

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
      toast.warn("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  };

  return (
    <div
      className="w-screen flex flex-col items-center gap-8 md:flex-row md:justify-center pt-10"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      <div className="w-72 h-96 bg-indigo-100 flex flex-col justify-center items-center rounded-3xl gap-10">
        <h2 className="text-8xl">🥰</h2>
        <p className="text-center text-sm">
          요새 MBTI가 유행이라던데
          <br />내 테스트 결과가 궁금하다면...
        </p>
        <Button type="button" onClick={handleMoveToTest}>
          TEST 하러가기
        </Button>
      </div>

      <div className="w-72 h-96 bg-indigo-100 flex flex-col justify-center items-center rounded-3xl gap-10">
        <h2 className="text-8xl">🥳</h2>
        <p className="text-center text-sm">
          내 친구들은 어떤 성격일까?
          <br />
          다른 사람들의 결과가 궁금하다면...
        </p>
        <Link to="/results">
          <Button>결과 보러가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
