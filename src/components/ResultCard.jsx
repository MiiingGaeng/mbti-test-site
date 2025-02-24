import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { changeResultVisibility, deleteTestResult } from "../api/testResults";
import { QUERY_KEYS } from "../constants/queryKeys";

const ResultCard = ({ item }) => {
  //-----props-----
  const { result, nickname, userId, id } = item;
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
    <div>
      <h4>{nickname}님의 결과</h4>
      <h4>{result}</h4>
      <p>{mbtiDescriptions[result]}</p>
      {!!result && (
        <div>
          <button
            onClick={() => {
              changeVisibilityMutaion.mutate(item);
            }}
          >
            숨기기
          </button>
          <button
            onClick={() => {
              deleteResultMutation.mutate(id);
            }}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
