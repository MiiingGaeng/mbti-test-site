import { useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { QUERY_KEYS } from "../constants/queryKeys";
import useLoginStore from "../zustand/loginStore.js";
import Button from "../components/Button.jsx";

const TestPage = () => {
  //-----navigate-----
  const navigate = useNavigate();
  //-----state-----
  const [result, setResult] = useState(null);

  //-----zustand-----
  const { user, fetchUserData } = useLoginStore((state) => state);

  //최초렌더링시 로그인된 유저 정보 가져오기 + query string 값 있으면 렌더링
  useEffect(() => {
    //유저 정보 가져오기
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

  //테스트 결과 제출
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

  //결과 페이지로 이동
  const handleNavigateToResults = () => {
    navigate(`/results`);
  };

  return (
    <div className="w-full flex items-center justify-center bg-white p-10">
      <div className="bg-indigo-100 rounded-3xl p-10 max-w-3xl w-full h-full overflow-y-auto flex flex-col justify-center gap-8">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-indigo-800 text-center">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-indigo-800">{result}</h3>
            <p className="text-base text-gray-700 mb-6">
              {mbtiDescriptions[result] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleNavigateToResults}>
                다른 결과 보러가기
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
