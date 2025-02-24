import { useState } from "react";
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import useLoginStore from "../zustand/loginStore.js";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";

const Login = () => {
  //-----input state-----
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  //-----zustand : 토큰 추가 로직-----
  const { addTokenInLocal } = useLoginStore();
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
        //로그인 알람
        alert("로그인에 성공하였습니다.");
        //로그인 성공 후 Home으로 이동
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 실패 : ", error);
      alert("로그인에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div
      className="w-screen flex flex-col items-center gap-8 md:flex-row md:justify-center pt-10"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      <form
        className="w-5/6 lg:w-1/2 h-96 bg-indigo-100 flex flex-col justify-center items-center rounded-3xl p-8 gap-4"
        onSubmit={handleLogIn}
      >
        <label className="w-5/6 lg:w-1/2 flex gap-4 justify-between">
          <p className="text-lg text-indigo-800 font-bold">ID</p>
          <Input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>

        <label className="w-5/6 lg:w-1/2 flex gap-4 justify-between">
          <p className="text-lg text-indigo-800 font-bold">PW</p>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="flex gap-4 mt-4">
          <Link to="/signup">
            <Button type="button">JOIN</Button>
          </Link>
          <Button type="submit">LOGIN</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
