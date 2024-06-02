import { useQuery } from 'react-query';

export const useGetUsersByIdsQuery = (ids) => {
  return useQuery(['users', ids], async () => {
    const responses = await Promise.all(ids.map(id => fetch(`https://www.ecommercetech.software/users/${id}`)));
    const data = await Promise.all(responses.map(response => response.json()));
    return data;
  });
}