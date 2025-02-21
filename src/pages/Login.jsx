const Login = () => {
  return (
    <div>
      <form>
        <p>ID</p>
        <input type="text" placeholder="아이디를 입력해주세요" />
        <p>PW</p>
        <input type="text" placeholder="비밀번호를 입력해주세요" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
