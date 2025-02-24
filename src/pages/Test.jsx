import { useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult, getTestResults } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/auth";
import { useEffect } from "react";

const TestPage = () => {
  //-----navigate-----
  const navigate = useNavigate();
  //-----state-----
  const [result, setResult] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    //-----유저 정보 가져오기-----
    const fetchUserData = async () => {
      const currentToken = localStorage.getItem("accessToken");
      const userData = await getUserProfile(currentToken);

      setUser(userData.data);
    };

    fetchUserData();
  }, []);

  //-----test 결과 submit 함수-----
  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);

    const newTestResult = {
      id: crypto.randomUUID(),
      nickname: user?.nickname,
      result: mbtiResult,
      visibility: true,
      date: Date.now(),
      userId: user.id
    };

    //예외처리
    const testResults = await getTestResults();
    if (testResults.some((result) => result.userId === user.id)) {
      alert(
        "이미 테스트 결과가 존재합니다. 결과는 마이페이지에서 확인해주세요!"
      );
      return navigate(`/mypage?user_id=${user.id}`);
    }

    try {
      const data = await createTestResult(newTestResult);
      if (data) {
        setResult(data.result);
      }
    } catch (error) {
      console.error("테스트 전송 실패 : ", error);
      alert("테스트 결과 전송에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  const handleNavigateToResults = () => {
    navigate(`/results?user_id=${user.id}`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full h-full overflow-y-auto">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              테스트 결과: {result}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[result] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </p>
            <button
              onClick={handleNavigateToResults}
              className="w-full bg-primary-color text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#FF5A5F]"
            >
              결과 페이지로 이동하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
