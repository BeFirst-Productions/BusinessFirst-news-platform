import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export function useArticles(params: any) {
  return useQuery({
    queryKey: ['articles-mock', params],
    queryFn: async () => {
      const response = await apiClient.get('/articles', { params });
      return response.data;
    },
  });
}
