import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { changeResultVisibility, deleteTestResult } from "../api/testResults";
import { QUERY_KEYS } from "../constants/queryKeys";
import useLoginStore from "../zustand/loginStore";
import { useEffect } from "react";
import Button from "./Button";

const ResultCard = ({ item }) => {
  //-----props-----
  const { result, nickname, userId, id } = item;
  //-----zustand-----
  const { user, fetchUserData } = useLoginStore((state) => state);

  //최초렌더링시 유저정보 불러오기
  useEffect(() => {
    fetchUserData();
  }, []);

  //-----tanstack query : queryClient-----
  const queryClient = useQueryClient();

  //-----tanstack query : useMutation-----
  //숨기기 기능
  const changeVisibilityMutaion = useMutation({
    mutationFn: changeResultVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RESULTS]
      });
    }
  });

  //삭제 기능
  const deleteResultMutation = useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RESULTS]
      });
    }
  });

  return (
    <div className="w-5/6 lg:w-1/2 bg-indigo-100 flex flex-col justify-center items-center rounded-3xl p-10 gap-5">
      <h4 className="text-base">{nickname}님의 결과</h4>
      <h4 className="text-xl font-bold text-indigo-800">{result}</h4>
      <p className="text-sm">{mbtiDescriptions[result]}</p>
      {user?.id === userId && (
        <div className="flex gap-4">
          <Button
            onClick={() => {
              changeVisibilityMutaion.mutate(item);
            }}
          >
            숨기기
          </Button>
          <Button
            onClick={() => {
              deleteResultMutation.mutate(id);
            }}
          >
            삭제
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
