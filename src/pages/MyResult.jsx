import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/common/Button";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { getTestResults } from "../api/testResults";
import { toast } from "react-toastify";
import useLoginStore from "../zustand/loginStore";
import { useEffect } from "react";

const MyResult = () => {
  //-----zustand-----
  const { user, isAuthenticated, fetchUserData } = useLoginStore(
    (state) => state
  );
  //-----query params-----
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  //-----navigate-----
  const navigate = useNavigate();

  //최초 렌더링시 로그인된 유저 정보 가져오기
  useEffect(() => {
    fetchUserData();
  }, []);

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
    return <p className="text-lg text-indigo-800 text-center">is Loading...</p>;
  }

  if (isResultListError) {
    return (
      <p className="text-lg text-indigo-800 text-center">There is an error</p>
    );
  }

  const myResult = resultList.findLast((item) => item.userId === userId);

  //결과 페이지로 이동
  const handleNavigateToResults = () => {
    navigate(`/results`);
  };

  //결과 공유하기
  const handleShare = async () => {
    try {
      const currentUrl = window.location.href;
      // 현재 URL 복사
      await navigator.clipboard.writeText(currentUrl);
      toast.success("링크가 복사되었습니다!");
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
      toast.error("링크 복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleNavigateToTest = () => {
    if (isAuthenticated) navigate("/test");
    if (!isAuthenticated) {
      toast.warn("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-white p-10">
      <div className="w-5/6 lg:w-1/2 bg-indigo-100 flex flex-col justify-center items-center rounded-3xl p-10 gap-5">
        <h4 className="text-base">{myResult.nickname}님의 결과</h4>
        <h4 className="text-xl font-bold text-indigo-800">{myResult.result}</h4>
        <p className="text-sm">
          {mbtiDescriptions[myResult.result] ||
            "해당 성격 유형에 대한 설명이 없습니다."}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={handleNavigateToResults}>다른 결과 보러가기</Button>
          {user?.id !== userId || !isAuthenticated ? (
            <Button onClick={handleNavigateToTest}>테스트 하기</Button>
          ) : (
            <Button onClick={handleShare}>공유하기</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyResult;
