import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  //-----context-----
  const { isAuthenticated, removeTokenInLocal } = useContext(AuthContext);
  //-----navigate-----
  const navigate = useNavigate();

  //logout 로직
  const handleLogOut = () => {
    //accessToken 삭제
    removeTokenInLocal();
    //홈 화면으로 리다이렉션
    navigate("/");
  };

  return (
    <div className="flex justify-between p-4 bg-indigo-400">
      <Link to="/">
        <h1>MBTI</h1>
      </Link>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <Link to="/MyPage">
            <button type="button">MyPage</button>
          </Link>
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
