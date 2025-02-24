import { useState } from "react";
import { useEffect } from "react";
import {
  deleteTestResult,
  getTestResults,
  updateTestResultVisibility
} from "../api/testResults";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { getUserProfile } from "../api/auth";

const TestResult = () => {
  //-----state-----
  const [resultList, setResultList] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    //-----결과목록 정보 가져오기-----
    const fetchResultsData = async () => {
      const data = await getTestResults();
      const visibleData = data.filter((result) => result.visibility);
      setResultList(visibleData);
    };

    //-----유저 정보 가져오기-----
    const fetchUserData = async () => {
      const currentToken = localStorage.getItem("accessToken");
      const userData = await getUserProfile(currentToken);

      setUser(userData.data);
    };

    fetchResultsData();
    fetchUserData();
  }, []);

  const handleDeleteMyResult = async () => {
    const myResult = resultList.find((result) => result.userId === user?.id);

    try {
      await deleteTestResult(myResult.id);
      setResultList((prevResults) =>
        prevResults.filter((result) => result.id !== myResult.id)
      );
    } catch (error) {
      console.error("결과 삭제 실패:", error);
    }
  };

  const handleHideMyResult = async () => {
    const myResult = resultList.find((result) => result.userId === user?.id);

    try {
      await updateTestResultVisibility(myResult.id, !myResult.visibility);
      setResultList((prevResults) =>
        prevResults.map((result) => result.visibility)
      );
    } catch (error) {
      console.error("결과 숨기기 실패 : ", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
      {!resultList ? (
        <p>loading...</p>
      ) : (
        resultList.map((result) => {
          return (
            <div
              key={result.userId}
              className=" bg-white rounded-lg p-8 max-w-lg w-200 h-auto overflow-y-auto border border-indigo-400 flex flex-col justify-center items-center"
            >
              <h4>{result.nickname} 님의 결과</h4>
              <h4>{result.result}</h4>
              <p>
                {mbtiDescriptions[result.result] ||
                  "해당 성격 유형에 대한 설명이 없습니다."}
              </p>
              {result.userId === user?.id && (
                <div>
                  <button
                    onClick={handleDeleteMyResult}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    삭제
                  </button>
                  <button
                    onClick={handleHideMyResult}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    숨기기
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default TestResult;
