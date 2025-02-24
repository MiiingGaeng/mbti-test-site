import { useState } from "react";
import { useEffect } from "react";
import { getUserProfile } from "../api/auth";

const MyPage = () => {
  //-----state-----
  const [user, setUser] = useState(null);
  const [newNickname, setNewNickname] = useState(user?.nickname);

  useEffect(() => {
    //-----유저 정보 가져오기-----
    const fetchUserData = async () => {
      const currentToken = localStorage.getItem("accessToken");
      const userData = await getUserProfile(currentToken);

      setUser(userData.data);
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <form>
        <h3>프로필 수정</h3>
        <p>{user?.id}</p>
        <input
          type="text"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
        />
      </form>
    </div>
  );
};

export default MyPage;
