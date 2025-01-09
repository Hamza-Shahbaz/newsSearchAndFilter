import React, { createContext, useContext, useState } from "react";
import Guardian from "guardian-js";

const GuardianAPIContext = createContext();

export const GuardianAPIProvider = ({ apiKey, children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const guardian = new Guardian(apiKey, true);

  const fetchContent = async (query, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await guardian.content.search(query, params);
      return response;
    } catch (err) {
      setError(err);
      console.error("Error fetching content:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async (query, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await guardian.tags.search(query, params);
      return response;
    } catch (err) {
      setError(err);
      console.error("Error fetching tags:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchSections = async (query, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await guardian.sections.search(query, params);
      return response;
    } catch (err) {
      setError(err);
      console.error("Error fetching sections:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuardianAPIContext.Provider
      value={{
        fetchContent,
        fetchTags,
        fetchSections,
        loading,
        error,
      }}
    >
      {children}
    </GuardianAPIContext.Provider>
  );
};

export const useGuardianAPI = () => {
  return useContext(GuardianAPIContext);
};
