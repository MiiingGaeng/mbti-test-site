import TestForm from "../components/TestForm";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { QUERY_KEYS } from "../constants/queryKeys";
import useLoginStore from "../zustand/loginStore.js";

const TestPage = () => {
  //-----zustand-----
  const { user, fetchUserData } = useLoginStore((state) => state);

  //최초렌더링시 로그인된 유저 정보 가져오기
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
  };

  return (
    <div className="w-full flex items-center justify-center bg-white p-10">
      <div className="bg-indigo-100 rounded-3xl p-10 max-w-3xl w-full h-full overflow-y-auto flex flex-col justify-center gap-8">
        <h1 className="text-3xl font-bold text-indigo-800 text-center">
          MBTI 테스트
        </h1>
        <TestForm onSubmit={handleTestSubmit} />
      </div>
    </div>
  );
};

export default TestPage;
