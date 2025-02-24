import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //-----input state-----
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  //-----context-----
  const { addTokenInLocal } = useContext(AuthContext);
  //-----navigate-----
  const navigate = useNavigate();

  //로그인 확인 로직
  const handleLogIn = async (e) => {
    e.preventDefault();

    const userData = {
      id,
      password
    };

    try {
      const data = await login(userData);
      if (data.success) {
        const { accessToken } = data;
        addTokenInLocal(accessToken);
        //로그인 성공 후 Home으로 이동
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 실패 : ", error);
      alert("로그인에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogIn}>
        <p>ID</p>
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <p>PW</p>
        <input
          type="text"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
