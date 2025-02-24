import { getTestResults } from "../api/testResults";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import ResultCard from "../components/ResultCard";

const TestResult = () => {
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
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
      {!resultList ? (
        <p>loading...</p>
      ) : (
        resultList
          .filter((item) => item.visibility)
          .map((item) => {
            return <ResultCard key={item.id} item={item} />;
          })
      )}
    </div>
  );
};

export default TestResult;
