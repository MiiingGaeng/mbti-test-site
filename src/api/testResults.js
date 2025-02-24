import { jsonApi } from "./axios";

export const getTestResults = async () => {
  const response = await jsonApi.get("/testResults");
  return response.data;
};

export const createTestResult = async (resultData) => {
  const response = await jsonApi.post("/testResults", resultData);
  return response.data;
};

export const deleteTestResult = async (id) => {
  const response = await jsonApi.delete(`"/testResults"/${id}`);
  return response.data;
};

export const changeResultVisibility = async (id, visibility) => {
  const response = await jsonApi.patch(`"/testResults"/${id}`, { visibility });
  return response.data;
};
