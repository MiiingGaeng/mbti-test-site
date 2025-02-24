import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

const Signup = () => {
  //-----input state-----
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  //-----navigate-----
  const navigate = useNavigate();

  //회원가입 로직
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUserData = {
      id,
      password,
      nickname
    };

    try {
      const data = await register(newUserData);
      console.log("data", data);
      if (data.success) {
        //회원가입 성공 => 로그인 페이지로 이동
        navigate("/login");
      } else {
        alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원가입 실패 : ", error.response.data.message);
      alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <p>NICKNAME</p>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
