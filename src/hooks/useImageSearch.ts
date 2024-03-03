import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchImages = async ({ pageParam = 1, queryKey }: QueryFunctionContext) => {
  const [query] = queryKey as [string];
  const API = query ? 'https://api.unsplash.com/search/photos' : 'https://api.unsplash.com/photos';
  const response = await axios({
    method: 'GET',
    url: API,
    params: {
      query: query || undefined,
      order_by: query ? 'relevant' : 'popular',
      page: pageParam,
      per_page: 20,
      client_id: import.meta.env.VITE_ACCESS_KEY,
    },
  });
  return response.data;
};

export default function useImageSearch(query: string) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [query],
    queryFn: fetchImages,
    getNextPageParam: (lastPage, pages) => {
        if (lastPage.results && lastPage.results.length > 0) {
            return pages.length + 1;
        }
        if (lastPage.results && lastPage.results.length === 0) {
            return undefined;
        }
        return pages.length + 1;
    }
  });

  const allImages = data?.pages.flatMap(page => query ? page.results : page);
  const uniqueImageIds = new Set();
  const images = allImages?.filter(image => {
    const isDuplicate = uniqueImageIds.has(image.id);
    uniqueImageIds.add(image.id);
    return !isDuplicate;
  });

  return {
    images,
    error: status === 'error',
    isLoading: isFetching && !isFetchingNextPage,
    hasMore: !!hasNextPage,
    fetchNextPage,
  };
}
