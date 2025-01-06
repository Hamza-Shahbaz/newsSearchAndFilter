import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Fetcher function
const fetchUsers = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
  return data;
};

// Custom hook
export const useUsers = () => {
  return useQuery(['users'], fetchUsers, {
    onError: (error) => {
      console.error('Error fetching users:', error.message);
    },
  });
};
