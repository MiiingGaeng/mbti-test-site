const Signup = () => {
  return (
    <div>
      <form>
        <p>ID</p>
        <input type="text" placeholder="아이디를 입력해주세요" />
        <p>PW</p>
        <input type="text" placeholder="비밀번호를 입력해주세요" />
        <p>NICKNAME</p>
        <input type="text" placeholder="닉네임을 입력해주세요" />

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
