import { useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { QUERY_KEYS } from "../constants/queryKeys";
import useLoginStore from "../zustand/loginStore.js";

const TestPage = () => {
  //-----navigate-----
  const navigate = useNavigate();
  //-----state-----
  const [result, setResult] = useState(null);
  // const [user, setUser] = useState(null);
  //-----zustand-----
  const { user, fetchUserData } = useLoginStore((state) => state);

  //최초렌더링시 로그인된 유저 정보 가져오기
  useEffect(() => {
    fetchUserData();
  }, []);

  //-----tanstack query : queryClient-----
  const queryClient = useQueryClient();

  //-----tanstack query : useMutation-----
  //테스트 결과 추가 기능
  const addResultMutation = useMutation({
    mutationFn: createTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RESULTS]
      });
    }
  });

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);

    addResultMutation.mutate({
      nickname: user.nickname,
      result: mbtiResult,
      visibility: true,
      date: new Date().toString(),
      userId: user.id
    });

    //UI 바꾸기 위한 setter
    setResult(mbtiResult);
  };

  //결과페이지로 이동
  const handleNavigateToResults = () => {
    navigate(`/results`);
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
