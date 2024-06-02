import { useQuery } from 'react-query';

export const useGetProductsQuery = (ids) => {
    return useQuery(['products', ids], async () => {
      const responses = await Promise.all(ids.map(id => fetch(`http://localhost:3001/products/index/${id}`)));
      const data = await Promise.all(responses.map(response => response.json()));
      return data;
    });
  }