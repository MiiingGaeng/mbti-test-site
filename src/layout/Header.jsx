import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/auth";
import useLoginStore from "../zustand/loginStore";
import { toast } from "react-toastify";

const Header = () => {
  //-----zustand-----
  const { isAuthenticated, removeTokenInLocal } = useLoginStore(
    (state) => state
  );
  //-----navigate-----
  const navigate = useNavigate();

  //logout 로직
  const handleLogOut = () => {
    //로그아웃 알람
    toast.success("로그아웃 되었습니다.");
    //accessToken 삭제
    removeTokenInLocal();
    //홈 화면으로 리다이렉션
    navigate("/");
  };

  const handleMoveToMyPage = async () => {
    const currentToken = localStorage.getItem("accessToken");
    const userData = await getUserProfile(currentToken);
    const { id } = userData.data;

    navigate(`/mypage?user_id=${id}`);
  };

  return (
    <div className="w-screen min-h-[60px] flex justify-between items-center p-4 md:p-8 bg-indigo-400">
      <Link to="/">
        <h1 className="text-white text-2xl md:text-3xl font-bold transition-all ease-in cursor-pointer hover:text-indigo-800">
          MBTI
        </h1>
      </Link>
      <div className="flex gap-8">
        {isAuthenticated ? (
          <button
            type="button"
            onClick={handleMoveToMyPage}
            className="text-white text-sm md:text-lg font-normal cursor-pointer transition-all ease-in hover:text-indigo-800"
          >
            PROFILE
          </button>
        ) : (
          <Link to="/signup">
            <button
              type="button"
              className="text-white text-sm md:text-lg font-normal transition-all ease-in cursor-pointer hover:text-indigo-800"
            >
              JOIN
            </button>
          </Link>
        )}
        {/* 로그인 상태면 로그아웃 버튼, 아니면 로그인 버튼 */}
        {isAuthenticated ? (
          <button
            type="button"
            onClick={handleLogOut}
            className="text-white text-sm md:text-lg font-normal transition-all ease-in cursor-pointer hover:text-indigo-800"
          >
            LOGOUT
          </button>
        ) : (
          <Link to="/login">
            <button
              type="button"
              className="text-white text-sm md:text-lg font-normal transition-all ease-in cursor-pointer hover:text-indigo-800"
            >
              LOGIN
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
