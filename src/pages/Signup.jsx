import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

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
        //회원가입 성공 알람
        alert("가입해주셔서 감사합니다!");
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
    <div
      className="w-screen flex flex-col items-center gap-8 md:flex-row md:justify-center pt-10"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-5/6 lg:w-1/2 h-96 bg-indigo-100 flex flex-col justify-center items-center rounded-3xl p-8 gap-4"
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

        <label className="w-5/6 lg:w-1/2 flex gap-4 justify-between">
          <p className="text-lg text-indigo-800 font-bold">NICKNAME</p>
          <Input
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>

        <Button type="submit">JOIN</Button>
      </form>
    </div>
  );
};

export default Signup;
