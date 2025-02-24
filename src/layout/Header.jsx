import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/auth";
import useLoginStore from "../zustand/loginStore";

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
    alert("로그아웃 되었습니다.");
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
    <div className="flex justify-between p-4 bg-indigo-400">
      <Link to="/">
        <h1>MBTI</h1>
      </Link>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <button type="button" onClick={handleMoveToMyPage}>
            MyPage
          </button>
        ) : (
          <Link to="/signup">
            <button type="button">Sign Up</button>
          </Link>
        )}
        {/* 로그인 상태면 로그아웃 버튼, 아니면 로그인 버튼 */}
        {isAuthenticated ? (
          <button type="button" onClick={handleLogOut}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
