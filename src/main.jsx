import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { GuardianAPIProvider } from "./context/GuardianApiContext";

const apiKey = "7b5e4773-4c40-491a-a536-d47af50fa520";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry failed queries twice
      refetchOnWindowFocus: false, // Disable refetch on window focus
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GuardianAPIProvider apiKey={apiKey}>
          <App />
        </GuardianAPIProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
