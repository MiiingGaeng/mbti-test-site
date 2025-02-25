import { useEffect } from "react";
import useLoginStore from "../zustand/loginStore";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useState } from "react";
import { updateProfile } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { getTestResults } from "../api/testResults";
import ResultCard from "../components/ResultCard";
import { toast } from "react-toastify";

const MyPage = () => {
  //-----zustand-----
  const { user, fetchUserData } = useLoginStore((state) => state);
  //-----state-----
  const [newNickname, setNewNickname] = useState(user?.nickname);

  //최초렌더링시 유저정보 불러오기
  useEffect(() => {
    fetchUserData();
  }, []);

  //닉네임 변경 로직(submit 이벤트)
  const handleNicknameSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nickname", newNickname);

    try {
      //닉네임 변경 알림
      toast.success("닉네임이 변경되었습니다.");
      //서버 반영
      updateProfile(formData);
      //데이터 다시 불러오기
      fetchUserData();
    } catch (error) {
      console.error("닉네임 변경 실패 : ", error);
      toast.error("닉네임 변경에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  //-----tanstack query : useQuery-----
  const {
    data: resultList,
    isPending: isResultListPending,
    isError: isResultListError
  } = useQuery({
    queryKey: [QUERY_KEYS.RESULTS],
    queryFn: getTestResults
  });

  if (isResultListPending) {
    return <p>is Loading...</p>;
  }
  if (isResultListError) {
    return <p>There is an error</p>;
  }

  return (
    <div
      className="w-screen flex flex-col items-center gap-8 md:justify-center pt-10"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      {/* 프로필 수정 부분 */}
      <form
        className="w-5/6 lg:w-1/2 h-72 bg-indigo-100 flex flex-col justify-center items-center rounded-3xl p-8 gap-4"
        onSubmit={handleNicknameSubmit}
      >
        <h3 className="text-2xl text-indigo-800 font-bold">PROFILE</h3>
        <p className="w-5/6 lg:w-1/2 flex gap-4 justify-between">
          <span className="text-lg text-indigo-800 font-bold">ID</span>
          {user?.id}
        </p>

        <label className="w-5/6 lg:w-1/2 flex gap-4 justify-between">
          <p className="text-lg text-indigo-800 font-bold">NICKNAME</p>
          <Input
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
        </label>
        <Button type="submit">EDIT</Button>
      </form>
      {/* 유저 테스트 결과 부분 */}
      <div className="w-full flex flex-col items-center gap-8 border-t-2 border-t-indigo-400">
        <h3 className="text-2xl text-indigo-800 font-bold mt-8">RESULTS</h3>
        {!resultList ? (
          <p>loading...</p>
        ) : (
          resultList
            .filter((item) => item.userId === user?.id)
            .map((item) => {
              return <ResultCard key={item.id} item={item} />;
            })
        )}
      </div>
    </div>
  );
};

export default MyPage;
