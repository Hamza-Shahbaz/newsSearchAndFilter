import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    },
    mutations: {
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    },
  },
});
