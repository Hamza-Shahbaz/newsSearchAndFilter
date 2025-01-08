import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useApi = () => {
  // Axios instance with default base URL and headers (optional)
  const apiClient = axios.create({
    baseURL: "https://your-api-base-url.com", // Replace with your base URL
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // Example token from localStorage
    },
  });

  // Fetch function to get data
  const fetchData = async (endpoint, params = {}) => {
    if(!endpoint.includes("http")) return;
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  };

  // Fetch function to get data with headers
  const fetchDataWithHeaders = async (endpoint, params = {}) => {
    const response = await apiClient.get(endpoint, { params });
    return { data: response.data, headers: response.headers };
  };

  return {
    // Hook for GET requests
    useGetQuery: (queryKey, endpoint, params = {}, options = {}) =>
      useQuery({
        queryKey,
        queryFn: () => fetchData(endpoint, params),
        retry : 1,
        staleTime: 60 * 60 * 1000, // 1 hour in milliseconds
        cacheTime: 60 * 60 * 1000, // 1 hour in milliseconds
        ...options,
      }),

    // Hook for GET requests with headers
    useGetQueryWithHeaders: (queryKey, endpoint, params = {}, options = {}) =>
      useQuery({
        queryKey,
        queryFn: () => fetchDataWithHeaders(endpoint, params),
        retry : 1,
        staleTime: 60 * 60 * 1000, // 1 hour in milliseconds
        cacheTime: 60 * 60 * 1000, // 1 hour in milliseconds
        ...options,
      }),
  };
};
